import { useState, useEffect, useRef } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Settings, Loader2, ChevronLeft, ChevronRight, Trash2, Map as MapIcon } from "lucide-react";
import { WorldMapPanel, type Placement } from "@/components/WorldMapPanel";
import { Link } from "wouter";
import type { Civilization, Message } from "@shared/schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CivilizationSettings } from "@/components/CivilizationSettings";
import { CompetitiveSetupDialog } from "@/components/CompetitiveSetupDialog";
import { formatMarkdown } from "@/lib/formatMarkdown";
import { readSSEStream } from "@/lib/sse";

export default function Simulation() {
  const { toast } = useToast();
  const [, params] = useRoute("/civilization/:id");
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [userInput, setUserInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Territory map: collapsed by default, auto-expands when a turn's simulation
  // completes (a new summary appears).
  const [mapOpen, setMapOpen] = useState(false);
  const [mapPlacement, setMapPlacement] = useState<Placement | null>(null);
  const [mapPlacing, setMapPlacing] = useState(false);
  const mapSummaryCountRef = useRef<number>(-1);
  const [selectedSummaryIndex, setSelectedSummaryIndex] = useState<number>(0);
  const [continueDiscussion, setContinueDiscussion] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [editedSummary, setEditedSummary] = useState("");
  const [battleMode, setBattleMode] = useState(false);
  const [enemySummary, setEnemySummary] = useState("");
  const [friendCode, setFriendCode] = useState("");
  // Set when the enemy was loaded via a friend's world code — the battle
  // result is then shared to their civilization (one simulation, both players)
  const [linkedEnemy, setLinkedEnemy] = useState<{ code: string; name: string } | null>(null);
  const [activeBattleType, setActiveBattleType] = useState<string | null>(null);
  const [strengthPercentile, setStrengthPercentile] = useState<number | null>(null);
  const [tempQuitDetected, setTempQuitDetected] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isEditEnemyModalOpen, setIsEditEnemyModalOpen] = useState(false);
  const [enemyDescriptionDraft, setEnemyDescriptionDraft] = useState("");
  const [isCompetitiveDialogOpen, setIsCompetitiveDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  // Abort any in-flight stream on unmount and guard setState-after-unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  const civilizationId = params?.id;
  const storageKey = `civilization-input-${civilizationId}`;

  // Load saved input from localStorage on mount
  useEffect(() => {
    if (civilizationId) {
      const savedInput = localStorage.getItem(storageKey);
      if (savedInput) {
        setUserInput(savedInput);
      }
    }
  }, [civilizationId, storageKey]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, toast]);

  const { data: civilization, isLoading: civLoading } = useQuery<Civilization>({
    queryKey: ["/api/civilizations", civilizationId],
    enabled: isAuthenticated && !!civilizationId,
  });

  // Update local strength percentile when civilization data changes
  useEffect(() => {
    if (civilization?.civilizationStrengthPercentile != null) {
      setStrengthPercentile(civilization.civilizationStrengthPercentile);
    }
  }, [civilization?.civilizationStrengthPercentile]);

  const { data: messages = [], isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/civilizations", civilizationId, "messages"],
    enabled: isAuthenticated && !!civilizationId,
  });

  // Determine discussion mode from message history (must be after messages query)
  const discussionMode = messages.some(msg =>
    msg.messageType === 'user_discussion' || msg.messageType === 'assistant_discussion'
  );

  // Player-A messages only (competitive mode stores player-B rows in the same thread)
  const playerAMessages = messages.filter(msg =>
    msg.playerRole !== 'player_b' && !msg.messageType?.startsWith('player_b')
  );
  let lastSummaryIndex = -1;
  for (let i = playerAMessages.length - 1; i >= 0; i--) {
    if (playerAMessages[i].messageType === 'civilization_summary') {
      lastSummaryIndex = i;
      break;
    }
  }
  // The latest summary belongs to the CURRENT turn only if non-summary chat messages
  // precede it (after next-century the chat is cleared, leaving only back-to-back
  // summaries, so this correctly becomes false until a new simulation completes).
  const currentTurnHasSummary =
    lastSummaryIndex > 0 &&
    playerAMessages[lastSummaryIndex - 1].messageType !== 'civilization_summary';
  // Strict form: the summary is also the most recent player-A message
  // (i.e. no discussion has happened after it yet) — gates the action buttons.
  const hasSummaryForCurrentTurn =
    currentTurnHasSummary && lastSummaryIndex === playerAMessages.length - 1;

  // Reset continue discussion flag when chat is cleared or century advances
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    console.log('[STATE] Messages changed', {
      messageCount: messages.length,
      lastMessageType: lastMsg?.messageType,
      willResetDiscussion: messages.length === 0 || lastMsg?.messageType === 'civilization_summary',
      currentContinueDiscussion: continueDiscussion
    });
    if (messages.length === 0 || lastMsg?.messageType === 'civilization_summary') {
      console.log('[STATE] Resetting continueDiscussion to false');
      setContinueDiscussion(false);
    }
  }, [messages]);

  const [optimisticMessage, setOptimisticMessage] = useState<string | null>(null);
  const [optimisticRandomNumber, setOptimisticRandomNumber] = useState<string | null>(null);
  const [streamingMessage, setStreamingMessage] = useState<string>("");
  const [streamingLabel, setStreamingLabel] = useState<string>("Simulation");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isCatastrophe, setIsCatastrophe] = useState(false);

  // Update selected summary when new summaries arrive
  // MUST be before any early returns to maintain hook order
  const summaryCount = messages.filter(msg => msg.messageType === 'civilization_summary').length;
  const prevSummaryCountRef = useRef(-1);
  useEffect(() => {
    // Don't yank the selection while the user is editing — a background refetch
    // would otherwise retarget "Save" at the newest summary mid-edit.
    if (isEditingSummary) return;
    if (summaryCount !== prevSummaryCountRef.current) {
      prevSummaryCountRef.current = summaryCount;
      if (summaryCount > 0) {
        setSelectedSummaryIndex(summaryCount - 1);
      }
    }
  }, [summaryCount, isEditingSummary]);

  // Place this civilization on the territory map from its latest summary.
  const placeCivOnMap = async () => {
    if (!civilization) return;
    const sums = messages.filter((m) => m.messageType === "civilization_summary");
    const latest = sums[sums.length - 1]?.content;
    const yr = civilization.currentCentury;
    const yearText = yr < 0 ? `${Math.abs(yr)} BCE` : `${yr} CE`;
    const summaryText = `Civilization: ${civilization.name}. Home location: ${civilization.location}. Current year: ${yearText}.\n\n${
      latest || `A young civilization just beginning in ${civilization.location}, with little territory yet.`
    }`;
    setMapPlacing(true);
    try {
      const res = await apiRequest("POST", "/api/map-sandbox/place", { summary: summaryText });
      setMapPlacement(await res.json());
    } catch {
      // best effort — leave the previous placement
    } finally {
      setMapPlacing(false);
    }
  };

  // When a new turn's summary appears, auto-open the map and re-place the civ.
  // Wait for the messages query to finish first, otherwise the initial 0→N
  // jump as data loads would be misread as a completed turn (and wrongly
  // auto-expand the map for an existing civ on page load).
  useEffect(() => {
    if (messagesLoading) return;
    if (mapSummaryCountRef.current === -1) {
      mapSummaryCountRef.current = summaryCount; // baseline; stays collapsed on load
      return;
    }
    if (summaryCount > mapSummaryCountRef.current && summaryCount > 0) {
      mapSummaryCountRef.current = summaryCount;
      setMapOpen(true);
      void placeCivOnMap();
    } else {
      mapSummaryCountRef.current = summaryCount;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryCount, messagesLoading]);

  // Opening the map by hand places the civ on first open if not done yet.
  const toggleMap = () => {
    const next = !mapOpen;
    setMapOpen(next);
    if (next && !mapPlacement && !mapPlacing && summaryCount > 0) void placeCivOnMap();
  };

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      // Default to discussion mode whenever the current turn already produced a
      // summary (survives a refresh, unlike the in-memory continueDiscussion flag)
      const sendingDiscussionMode = continueDiscussion || currentTurnHasSummary;

      console.log('[STREAM] Starting message send', {
        civilizationId,
        contentLength: content.length,
        discussionMode: sendingDiscussionMode,
        debugMode,
        timestamp: new Date().toISOString()
      });

      // Always use streaming now
      setIsStreaming(true);
      setStreamingMessage("");
      setStreamingLabel(
        sendingDiscussionMode
          ? 'Discussion'
          : civilization?.goalQuestions !== 'none' && isFirstMessage
          ? 'Questions'
          : 'Simulation'
      );

      const controller = new AbortController();
      abortControllerRef.current = controller;

      let catastrophe = false;
      let randomNumber: string | null = null;
      let receivedSummary = false;
      let tempQuitSeen = false;
      let accumulatedText = "";
      let fatalError: string | null = null;

      try {
        const response = await fetch(`/api/civilizations/${civilizationId}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            content,
            discussionMode: sendingDiscussionMode,
            debugMode
          }),
          signal: controller.signal,
        });

        console.log('[STREAM] Fetch response received', {
          ok: response.ok,
          status: response.status,
          statusText: response.statusText
        });

        if (!response.ok) {
          console.error('[STREAM] Fetch failed', {
            status: response.status,
            statusText: response.statusText
          });
          throw new Error('Failed to send message');
        }

        await readSSEStream(response, (parsed) => {
          if (parsed.text) {
            accumulatedText += parsed.text;
            setStreamingMessage(accumulatedText);
            // Check the ACCUMULATED text so a marker split across deltas is still caught
            if (!tempQuitSeen && accumulatedText.includes('[TempQuit]')) {
              tempQuitSeen = true;
              setTempQuitDetected(true);
              console.log('[STREAM] TempQuit detected - switching to discussion mode');
            }
          }
          if (parsed.randomNumber !== undefined) {
            randomNumber = parsed.randomNumber;
            setOptimisticRandomNumber(parsed.randomNumber);
            console.log('[STREAM] Random number set', { randomNumber });
          }
          if (parsed.summary !== undefined) {
            receivedSummary = true;
          }
          if (parsed.catastrophe !== undefined) {
            catastrophe = parsed.catastrophe;
            if (catastrophe) {
              setIsCatastrophe(true);
              console.log('[STREAM] Catastrophe flag set');
            }
          }
          if (parsed.strengthPercentile !== undefined) {
            setStrengthPercentile(parsed.strengthPercentile);
            console.log('[STREAM] Strength percentile updated', { strengthPercentile: parsed.strengthPercentile });
          }
          // Transient failure — the server retries on its own
          if (parsed.type === "error_retry") {
            toast({
              title: "Retrying Request",
              description: parsed.message,
              duration: 5000,
            });
          }
          // Fatal failure — the server sends [DONE] and closes after this
          if (parsed.type === "error") {
            fatalError = parsed.message || "The simulation failed. Please try again.";
          }
        });

        if (fatalError) {
          throw new Error(fatalError);
        }

        console.log('[STREAM] Returning result', { catastrophe, randomNumber });
        return { catastrophe, randomNumber, receivedSummary };
      } finally {
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
        // Stop the blinking indicator on EVERY exit path (done, error, abort)
        if (isMountedRef.current) {
          setIsStreaming(false);
        }
      }
    },
    onSuccess: async (result) => {
      if (!isMountedRef.current) return;
      console.log('[MUTATION] Success callback', {
        catastropheInResult: result?.catastrophe,
        currentCatastropheState: isCatastrophe,
        timestamp: new Date().toISOString()
      });

      await queryClient.invalidateQueries({ queryKey: ["/api/civilizations", civilizationId, "messages"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/civilizations", civilizationId] });
      if (result?.receivedSummary) {
        // A completed turn changes Current Era / Last Played on the dashboard list
        await queryClient.invalidateQueries({ queryKey: ["/api/civilizations"] });
      }
      // Force refetch to ensure UI updates with new enemyTechAdvancements and strength percentile
      await queryClient.refetchQueries({ queryKey: ["/api/civilizations", civilizationId] });
      if (!isMountedRef.current) return;

      // If TempQuit was detected, switch to discussion mode
      if (tempQuitDetected) {
        setContinueDiscussion(true);
        console.log('[MUTATION] TempQuit detected - enabling discussion mode');
      }

      console.log('[MUTATION] Queries invalidated, state cleared');
    },
    onError: (error: Error) => {
      // An abort on unmount is not a failure — no toast, no setState
      if (!isMountedRef.current || error.name === "AbortError") return;
      console.error('[MUTATION] Error callback', {
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });

      if (isUnauthorizedError(error)) {
        toast({
          title: "Session Expired",
          description: "Your session has expired. Redirecting to login...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1000);
        return;
      }

      // The user message was already saved server-side before streaming began,
      // so refetch it instead of restoring the text into the input box —
      // resending would create a duplicate user message.
      queryClient.invalidateQueries({ queryKey: ["/api/civilizations", civilizationId, "messages"] });

      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      // Runs on every exit path (after onSuccess/onError) — never leave a
      // phantom streaming bubble or stale optimistic message behind
      if (!isMountedRef.current) return;
      setOptimisticMessage(null);
      setOptimisticRandomNumber(null);
      setStreamingMessage("");
      setIsStreaming(false);
    },
  });

  const clearChatMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("DELETE", `/api/civilizations/${civilizationId}/messages/clear`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/civilizations", civilizationId, "messages"] });
      setTempQuitDetected(false);
      setContinueDiscussion(false);
      toast({
        title: "Chat Cleared",
        description: "All messages except summaries have been deleted.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to clear chat. Please try again.",
        variant: "destructive",
      });
    },
  });

  const nextCenturyMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/civilizations/${civilizationId}/next-century`, {});
    },
    onSuccess: async () => {
      setContinueDiscussion(false);
      setIsCatastrophe(false);
      await queryClient.invalidateQueries({ queryKey: ["/api/civilizations", civilizationId, "messages"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/civilizations", civilizationId] });
      // Keep the dashboard list (Current Era / Last Played) in sync
      await queryClient.invalidateQueries({ queryKey: ["/api/civilizations"] });
      // Refetch to get updated civilization data while preserving strength percentile
      const updatedCiv = await queryClient.fetchQuery<Civilization>({ queryKey: ["/api/civilizations", civilizationId] });
      if (updatedCiv && updatedCiv.civilizationStrengthPercentile != null) {
        setStrengthPercentile(updatedCiv.civilizationStrengthPercentile);
      }
      toast({
        title: "Century Advanced",
        description: "Moving to the next century. Chat has been cleared.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to proceed to next century. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetTurnMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/civilizations/${civilizationId}/reset-turn`, {});
    },
    onSuccess: async () => {
      setContinueDiscussion(false);
      setIsCatastrophe(false);
      await queryClient.invalidateQueries({ queryKey: ["/api/civilizations", civilizationId, "messages"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/civilizations", civilizationId] });
      // Keep the dashboard list (Current Era / Last Played) in sync
      await queryClient.invalidateQueries({ queryKey: ["/api/civilizations"] });
      // Force refetch to ensure UI updates immediately
      await queryClient.refetchQueries({ queryKey: ["/api/civilizations", civilizationId, "messages"] });
      await queryClient.refetchQueries({ queryKey: ["/api/civilizations", civilizationId] });
      toast({
        title: "Turn Reset",
        description: "Reverted to previous turn. Summary removed and chat cleared.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message || "Failed to reset turn. Please try again.",
        variant: "destructive",
      });
    },
  });

  const forceCatastropheMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/civilizations/${civilizationId}/force-catastrophe`, {});
    },
    onSuccess: () => {
      setIsCatastrophe(true);
      toast({
        title: "Catastrophe Forced",
        description: "Next simulation will trigger a catastrophe.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to force catastrophe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateSummaryMutation = useMutation({
    mutationFn: async ({ messageId, content }: { messageId: string; content: string }) => {
      return await apiRequest("PATCH", `/api/civilizations/${civilizationId}/messages/${messageId}`, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/civilizations", civilizationId, "messages"] });
      setIsEditingSummary(false);
      toast({
        title: "Summary Updated",
        description: "Your civilization summary has been saved.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update summary. Please try again.",
        variant: "destructive",
      });
    },
  });

  const battleMutation = useMutation({
    mutationFn: async ({ battleType, enemySummary }: { battleType: string; enemySummary: string }) => {
      console.log('[BATTLE MODE] Starting battle simulation', {
        battleType,
        enemySummaryLength: enemySummary.length,
        civilizationId
      });
      
      const userSummary = summaryMessages[summaryMessages.length - 1]?.content || "No summary available";
      
      // Set up streaming - these state updates will trigger UI display
      setIsStreaming(true);
      setStreamingMessage("");

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch(`/api/civilizations/${civilizationId}/battle`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            battleType,
            userSummary,
            enemySummary,
            // present only when the enemy was loaded via a world code —
            // tells the server to deliver the result to that civilization
            enemyBattleCode: linkedEnemy?.code,
          }),
          signal: controller.signal,
        });

        console.log('[BATTLE MODE] Fetch response received', {
          ok: response.ok,
          status: response.status,
          headers: Object.fromEntries(response.headers.entries())
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to simulate battle: ${response.status} - ${errorText}`);
        }

        let fatalError: string | null = null;
        let sharedWith: string | null = null;

        await readSSEStream(response, (parsed) => {
          if (parsed.text) {
            setStreamingMessage(prev => prev + parsed.text);
          }
          if (parsed.sharedWith) {
            sharedWith = parsed.sharedWith;
          }
          // Fatal failure — the server sends [DONE] and closes after this
          if (parsed.type === "error") {
            fatalError = parsed.message || "Failed to simulate battle.";
          }
        });

        if (fatalError) {
          throw new Error(fatalError);
        }

        console.log('[BATTLE MODE] Returning result');
        return { success: true, sharedWith };
      } finally {
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
        // Stop the blinking indicator on EVERY exit path (done, error, abort)
        if (isMountedRef.current) {
          setIsStreaming(false);
        }
      }
    },
    onSuccess: async (data) => {
      if (!isMountedRef.current) return;
      console.log('[BATTLE MODE] Battle mutation success, invalidating queries');
      await queryClient.invalidateQueries({ queryKey: ["/api/civilizations", civilizationId, "messages"] });
      console.log('[BATTLE MODE] Queries invalidated, messages should refresh');
      toast({
        title: "Battle Simulated",
        description: data?.sharedWith
          ? `The battle has been simulated and the result was shared with ${data.sharedWith}.`
          : "The battle has been simulated.",
      });
    },
    onError: (error: Error) => {
      // An abort on unmount is not a failure — no toast, no setState
      if (!isMountedRef.current || error.name === "AbortError") return;
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["/api/civilizations", civilizationId, "messages"] });
      toast({
        title: "Error",
        description: error.message || "Failed to simulate battle. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      // Runs on every exit path — never leave a phantom streaming bubble behind
      if (!isMountedRef.current) return;
      setActiveBattleType(null);
      setStreamingMessage("");
      setIsStreaming(false);
    },
  });

  // Get (or generate) this world's shareable 5-digit battle code
  const worldCodeMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/civilizations/${civilizationId}/battle-code`, {});
      return res.json() as Promise<{ battleCode: string }>;
    },
    onSuccess: () => {
      // battleCode lives on the civilization object — refetch it
      queryClient.invalidateQueries({ queryKey: ["/api/civilizations", civilizationId] });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message || "Failed to get world code.",
        variant: "destructive",
      });
    },
  });

  // Load another player's civilization (by their world code) into the enemy slot
  const loadEnemyByCodeMutation = useMutation({
    mutationFn: async (code: string) => {
      const res = await apiRequest("GET", `/api/battle-code/${code}`);
      return res.json() as Promise<{
        civilizationName: string;
        leaderName: string;
        location: string;
        summary: string;
      }>;
    },
    onSuccess: (data, code) => {
      setEnemySummary(
        `[Rival player civilization: ${data.civilizationName}, led by ${data.leaderName}, from ${data.location}]\n\n${data.summary}`,
      );
      setLinkedEnemy({ code, name: data.civilizationName });
      toast({
        title: "Enemy Loaded",
        description: `${data.civilizationName} is ready to battle. The result will be shared with them.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Code Not Found",
        description: "No civilization found for that code. Double-check it with your friend.",
        variant: "destructive",
      });
    },
  });

  const updateCivMutation = useMutation({
    mutationFn: async (data: { enemyTechAdvancements: string }) => {
      const result = await apiRequest(
        "PATCH",
        `/api/civilizations/${civilizationId}`,
        data
      );
      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId],
      });
      toast({
        title: "Enemy Civilization Updated",
        description: "The enemy civilization description has been saved.",
      });
      setIsEditEnemyModalOpen(false);
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update enemy civilization. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Scroll to bottom when messages change (but not during streaming)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || sendMessageMutation.isPending) return;
    const message = userInput.trim();
    setOptimisticMessage(message);

    // Clear textarea immediately
    setUserInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    if (civilizationId) {
      localStorage.removeItem(storageKey);
    }

    sendMessageMutation.mutate(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleStartEditingSummary = () => {
    const currentSummary = summaryMessages[selectedSummaryIndex];
    if (currentSummary) {
      setEditedSummary(currentSummary.content);
      setIsEditingSummary(true);
    }
  };

  const handleSaveSummary = () => {
    const currentSummary = summaryMessages[selectedSummaryIndex];
    if (currentSummary && editedSummary.trim()) {
      updateSummaryMutation.mutate({
        messageId: currentSummary.id,
        content: editedSummary.trim(),
      });
    }
  };

  const handleCancelEditingSummary = () => {
    setIsEditingSummary(false);
    setEditedSummary("");
  };

  const handleBattleModeToggle = () => {
    if (!battleMode) {
      // Entering battle mode no longer clears the chat — the old behavior
      // silently deleted every non-summary message with zero confirmation
      // (the trash button right next to it asks first). Battles coexist with
      // the chat; use the clear button explicitly if you want a clean slate.
      setBattleMode(true);
    } else {
      // Exiting battle mode
      setBattleMode(false);
      setEnemySummary("");
      setLinkedEnemy(null);
      setFriendCode("");
    }
  };

  const handleBattle = (battleType: string) => {
    if (!enemySummary.trim()) {
      toast({
        title: "Error",
        description: "Please enter an enemy civilization summary first.",
        variant: "destructive",
      });
      return;
    }
    setActiveBattleType(battleType);
    battleMutation.mutate({ battleType, enemySummary });
  };

  // Auto-resize textarea and save to localStorage
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUserInput(value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + "px";

    // Save to localStorage
    if (civilizationId) {
      localStorage.setItem(storageKey, value);
    }
  };

  // Log battle messages for debugging - MUST be before any early returns
  useEffect(() => {
    const battleMessages = messages.filter(msg => 
      msg.messageType === 'user_battle' || msg.messageType === 'assistant_battle'
    );
    if (battleMessages.length > 0) {
      console.log('[BATTLE MODE] Battle messages found:', battleMessages.length);
      battleMessages.forEach((msg, idx) => {
        console.log(`[BATTLE MODE] Message ${idx + 1}:`, {
          id: msg.id,
          role: msg.role,
          messageType: msg.messageType,
          contentPreview: msg.content.substring(0, 200),
          createdAt: msg.createdAt
        });
      });
    }
  }, [messages]);

  if (authLoading || civLoading || messagesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading simulation...</p>
        </div>
      </div>
    );
  }

  if (!civilization) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Civilization not found</p>
          <Link href="/">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  // All hooks must be called before any derived state or conditional logic
  const formatCentury = (century: number) => {
    if (century < 0) {
      return `${Math.abs(century).toLocaleString()} BCE`;
    }
    return `${century.toLocaleString()} CE`;
  };

  // Filter messages for display (exclude summaries from chat)
  const chatMessages = messages.filter(msg => msg.messageType !== 'civilization_summary');
  const summaryMessages = messages.filter(msg => msg.messageType === 'civilization_summary');
  const isFirstMessage = chatMessages.length === 0;
  const lastChatMessage = chatMessages[chatMessages.length - 1];
  const lastMessage = messages[messages.length - 1];

  // Show action buttons if we have a summary for the current turn and haven't continued discussion
  // The buttons should show after simulation completes (which includes a summary)
  const showActionButtons = hasSummaryForCurrentTurn && chatMessages.length > 0 && !continueDiscussion;

  // Browser logging for debugging
  console.log('[ACTION BUTTONS DEBUG]', {
    showActionButtons,
    hasSummaryForCurrentTurn,
    chatMessagesLength: chatMessages.length,
    continueDiscussion,
    lastMessageType: lastMessage?.messageType,
    summaryCount: summaryMessages.length
  });

  return (
    <div className="h-screen flex bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card flex-shrink-0 sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-to-dashboard">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold" data-testid="text-civilization-name">
                  {civilization.name}
                </h1>
                {civilization.enemyCivilization === "yes" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        title={
                          civilization.enemyTechAdvancements 
                            ? "View stored comparable enemy civilization" 
                            : strengthPercentile != null
                            ? "Enemy data being loaded..."
                            : "No enemy civilization generated yet"
                        }
                        data-testid="button-view-enemy"
                        disabled={!civilization.enemyTechAdvancements && strengthPercentile == null}
                      >
                        🎯
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Stored Comparable Enemy Civilization</AlertDialogTitle>
                        <AlertDialogDescription asChild>
                          <div className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap">
                            {civilization.enemyTechAdvancements || "No enemy civilization generated yet. Complete a turn to generate one."}
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                {civilization.enemyCivilization === "yes" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => {
                      setEnemyDescriptionDraft(civilization.enemyTechAdvancements || "");
                      setIsEditEnemyModalOpen(true);
                    }}
                    title="Edit stored comparable enemy civilization"
                    data-testid="button-edit-enemy"
                  >
                    ✏️
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground" data-testid="text-civilization-location">
                {civilization.location}
                {civilization.enemyCivilization === "yes" && (
                  <span className="ml-2 text-blue-500 font-medium">
                    • Strength: {strengthPercentile != null ? `${strengthPercentile}th percentile` : '?'}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm font-medium font-mono" data-testid="text-current-century">
                  {formatCentury(civilization.currentCentury)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Timescale: {civilization.timescale === "custom" && civilization.customTimescale
                    ? civilization.customTimescale
                    : civilization.timescale}
                </p>
                {civilization.catastropheTimer !== 'none' && (
                  <p className="text-xs text-amber-500 font-medium mt-1">
                    {(() => {
                      const summaryCount = summaryMessages.length;
                      if (civilization.catastropheTimer === '4 centuries') {
                        const turnsUntil = 4 - (summaryCount % 4);
                        return turnsUntil === 1 ? 'Catastrophe Will Occur This Turn' : `Catastrophe in ${turnsUntil} turn${turnsUntil !== 1 ? 's' : ''}`;
                      } else if (civilization.catastropheTimer === '5 centuries') {
                        const turnsUntil = 5 - (summaryCount % 5);
                        return turnsUntil === 1 ? 'Catastrophe Will Occur This Turn' : `Catastrophe in ${turnsUntil} turn${turnsUntil !== 1 ? 's' : ''}`;
                      } else if (civilization.catastropheTimer === 'random 1/4th') {
                        return 'Catastrophe: 25% chance';
                      } else if (civilization.catastropheTimer === 'random 1/5th') {
                        return 'Catastrophe: 20% chance';
                      }
                      return null;
                    })()}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant={battleMode ? "default" : "ghost"}
              size="icon"
              onClick={handleBattleModeToggle}
              disabled={summaryMessages.length === 0}
              data-testid="button-battle-mode"
              title="Battle Mode"
            >
              ⚔️
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  disabled={chatMessages.length === 0 || battleMode}
                  data-testid="button-clear-chat"
                  title="Clear chat (keep summaries)"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Chat?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete all chat messages but keep civilization summaries. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => clearChatMutation.mutate()}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Clear Chat
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDebugMode(!debugMode)}
              title={debugMode ? "Debug mode ON (AI returns '--')" : "Debug mode OFF"}
              className={debugMode ? "text-orange-500" : ""}
              data-testid="button-debug-mode"
            >
              --
            </Button>
            {civilization.catastropheTimer !== 'none' && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    data-testid="button-force-catastrophe"
                    title="Force catastrophe (debug)"
                    className="text-amber-500 hover:text-amber-400"
                  >
                    ⚠️
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Force Catastrophe? (Debug)</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will force a catastrophe to occur on the next simulation. This is a debug feature.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => forceCatastropheMutation.mutate()}
                      className="bg-amber-600 text-white hover:bg-amber-700"
                    >
                      Force Catastrophe
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost"
                  disabled={summaryMessages.length === 0}
                  data-testid="button-reset-turn"
                  title="Reset entire turn"
                >
                  Reset Turn
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset Entire Turn?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove the most recent summary, revert the timeline back one turn, and clear all chat messages. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => resetTurnMutation.mutate()}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Reset Turn
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              variant={mapOpen ? "default" : "ghost"}
              size="icon"
              onClick={toggleMap}
              title="Toggle territory map"
              data-testid="button-toggle-map"
            >
              <MapIcon className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              data-testid="button-toggle-summary"
            >
              {sidebarOpen ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCompetitiveDialogOpen(true)}
              disabled={summaryMessages.length === 0}
              title="Start competitive mode against an AI opponent"
              data-testid="button-competitive-mode"
            >
              VS
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsSettingsModalOpen(true)} data-testid="button-settings">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {battleMode && (
            <Card className="p-4 border-2 border-amber-500">
              <h3 className="text-lg font-semibold mb-3">⚔️ Battle Scenario</h3>
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2 border-b border-border pb-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Your World Code</label>
                    {civilization.battleCode ? (
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono text-lg tracking-widest"
                          data-testid="text-world-code"
                        >
                          {civilization.battleCode}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            navigator.clipboard.writeText(civilization.battleCode!);
                            toast({ title: "Copied", description: "World code copied to clipboard." });
                          }}
                          data-testid="button-copy-world-code"
                        >
                          Copy
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => worldCodeMutation.mutate()}
                        disabled={worldCodeMutation.isPending}
                        data-testid="button-get-world-code"
                      >
                        {worldCodeMutation.isPending ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : null}
                        Get Code
                      </Button>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Share it so another player can load your civilization as their battle enemy.
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Battle a Friend</label>
                    <div className="flex gap-2">
                      <Input
                        value={friendCode}
                        onChange={(e) => setFriendCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                        placeholder="5-digit code"
                        inputMode="numeric"
                        className="w-32 font-mono tracking-widest"
                        data-testid="input-friend-code"
                      />
                      <Button
                        size="sm"
                        onClick={() => loadEnemyByCodeMutation.mutate(friendCode)}
                        disabled={friendCode.length !== 5 || loadEnemyByCodeMutation.isPending}
                        data-testid="button-load-enemy-code"
                      >
                        {loadEnemyByCodeMutation.isPending ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : null}
                        Load Enemy
                      </Button>
                    </div>
                    {linkedEnemy ? (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1" data-testid="text-linked-enemy">
                        Linked to {linkedEnemy.name} (code {linkedEnemy.code}) — the battle result will appear in their game too.{" "}
                        <button
                          type="button"
                          className="underline"
                          onClick={() => setLinkedEnemy(null)}
                          data-testid="button-unlink-enemy"
                        >
                          Unlink
                        </button>
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter a friend's world code to pull their civilization into the enemy slot.
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Enemy Civilization Summary</label>
                  <Textarea
                    value={enemySummary}
                    onChange={(e) => setEnemySummary(e.target.value)}
                    placeholder="Enter the enemy civilization's summary (technology, population, military strength, etc.)"
                    className="min-h-[100px]"
                    data-testid="textarea-enemy-summary"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleBattle("Trade War/Economic Competition/Diplomatic Push")}
                    disabled={battleMutation.isPending || !enemySummary.trim()}
                    className="flex-1"
                    data-testid="button-trade-war"
                  >
                    {activeBattleType === "Trade War/Economic Competition/Diplomatic Push" && battleMutation.isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    Trade War
                  </Button>
                  <Button
                    onClick={() => handleBattle("Limited War")}
                    disabled={battleMutation.isPending || !enemySummary.trim()}
                    className="flex-1"
                    data-testid="button-limited-war"
                  >
                    {activeBattleType === "Limited War" && battleMutation.isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    Limited War
                  </Button>
                  <Button
                    onClick={() => handleBattle("Extermination War")}
                    disabled={battleMutation.isPending || !enemySummary.trim()}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    data-testid="button-extermination"
                  >
                    {activeBattleType === "Extermination War" && battleMutation.isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    Extermination
                  </Button>
                </div>
              </div>
            </Card>
          )}
          {chatMessages.length === 0 && !optimisticMessage ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-lg text-muted-foreground">
                Your civilization awaits your guidance.
              </p>
              <p className="text-sm text-muted-foreground">
                Describe your goals for the first period of time to begin the simulation.
              </p>
            </div>
          ) : (
            <>
              {chatMessages.map((message) => {
                const getMessageLabel = (messageType: string) => {
                  switch (messageType) {
                    case 'user_answer':
                      return 'User answers';
                    case 'assistant_simulation':
                      return 'Assistant simulation';
                    case 'system':
                      return 'System prompt';
                    case 'user_goals':
                      return 'User goals';
                    case 'assistant_question':
                      return 'Assistant questions';
                    case 'user_discussion':
                      return 'Discussion';
                    case 'assistant_discussion':
                      return 'Discussion';
                    case 'user_battle':
                      return 'Battle Scenario';
                    case 'assistant_battle':
                      return 'Battle Result';
                    default:
                      return 'User message';
                  }
                };

                return (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    data-testid={`message-${message.role}-${message.id}`}
                  >
                    <Card
                      className={`max-w-[80%] ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : message.role === "assistant" && 
                            message.messageType === "assistant_simulation" &&
                            (() => {
                              const msgIndex = chatMessages.indexOf(message);
                              const prevMsg = msgIndex > 0 ? chatMessages[msgIndex - 1] : null;
                              const hasCatastrophe = prevMsg?.role === "user" && (
                                prevMsg.content.includes('[System: Now it is time for a catastrophe') ||
                                prevMsg.content.includes('[System: A rival civilization has been encountered')
                              );

                              if (message === chatMessages[chatMessages.length - 1]) {
                                console.log('[CATASTROPHE DEBUG - Frontend Check]', {
                                  messageIndex: msgIndex,
                                  prevMsgRole: prevMsg?.role,
                                  prevMsgContent: prevMsg?.content.substring(0, 200),
                                  hasCatastrophe
                                });
                              }

                              return hasCatastrophe;
                            })()
                          ? "bg-red-950 border-red-800"
                          : "bg-card"
                      }`}
                    >
                      <div className="p-4">
                        <p
                          className={`text-xs font-bold mb-2 ${
                            message.role === "user" ? "text-primary-foreground/80" : "text-muted-foreground"
                          }`}
                          data-testid={`message-label-${message.id}`}
                        >
                          {getMessageLabel(message.messageType || 'user_answer')}
                        </p>
                        <div 
                          className="prose prose-sm max-w-none dark:prose-invert prose-headings:mt-4 prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-ul:ml-6 prose-li:my-1"
                          data-testid={`message-content-${message.id}`}
                          dangerouslySetInnerHTML={{ 
                            __html: formatMarkdown(message.content) 
                          }}
                        />
                        <div className="flex items-center justify-between mt-2">
                          <p
                            className={`text-xs font-mono ${
                              message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}
                            data-testid={`message-time-${message.id}`}
                          >
                            {new Date(message.createdAt).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                          {message.role === "user" && message.randomNumber && (
                            <p
                              className="text-xs font-mono text-primary-foreground/70"
                              data-testid={`message-random-${message.id}`}
                            >
                              Random: {message.randomNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
              {optimisticMessage && (
                <div className="flex justify-end">
                  <Card className="max-w-[80%] bg-primary text-primary-foreground">
                    <div className="p-4">
                      <p className="text-xs font-bold mb-2 text-primary-foreground/80">
                        {discussionMode ? 'Discussion' : chatMessages.length === 0 ? 'User goals' : 'User message'}
                      </p>
                      <div 
                        className="prose prose-sm max-w-none dark:prose-invert prose-headings:mt-4 prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-ul:ml-6 prose-li:my-1"
                        dangerouslySetInnerHTML={{ 
                          __html: formatMarkdown(optimisticMessage) 
                        }}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs font-mono text-primary-foreground/70">
                          {new Date().toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        {optimisticRandomNumber && (
                          <p className="text-xs font-mono text-primary-foreground/70">
                            Random: {optimisticRandomNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              )}
              {(isStreaming || streamingMessage) && (
                <div className="flex justify-start">
                  <Card className="max-w-[80%] bg-card">
                    <div className="p-4">
                      <p className="text-xs font-bold mb-2 text-muted-foreground">
                        {battleMode ? 'Battle Result' : streamingLabel}
                      </p>
                      <div 
                        className="prose prose-sm max-w-none dark:prose-invert prose-headings:mt-4 prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-ul:ml-6 prose-li:my-1"
                        dangerouslySetInnerHTML={{ 
                          __html: formatMarkdown(streamingMessage) 
                        }}
                      />
                      {isStreaming && (
                        <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse" />
                      )}
                    </div>
                  </Card>
                </div>
              )}
            </>
          )}
          {sendMessageMutation.isPending && !isStreaming && (
            <div className="flex justify-start">
              <Card className="bg-card">
                <div className="p-4 flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">
                    {discussionMode ? 'Responding...' : 'Simulating civilization...'}
                  </p>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card flex-shrink-0">
        <div className="max-w-4xl mx-auto px-6 py-4">
          {showActionButtons ? (
            tempQuitDetected ? (
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="destructive"
                  onClick={() => clearChatMutation.mutate()}
                  disabled={clearChatMutation.isPending}
                  data-testid="button-clear-chat-retry"
                >
                  {clearChatMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Clearing...
                    </>
                  ) : (
                    'Clear chat and retry'
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log('[USER ACTION] Continue discussion clicked');
                    setContinueDiscussion(true);
                  }}
                  className="flex-1"
                  data-testid="button-continue-discussion"
                >
                  Continue discussion without simulation
                </Button>
                <Button
                  onClick={() => nextCenturyMutation.mutate()}
                  disabled={nextCenturyMutation.isPending}
                  data-testid="button-next-century"
                >
                  {nextCenturyMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to next century'
                  )}
                </Button>
              </div>
            )
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <Textarea
                ref={textareaRef}
                value={userInput}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder={
                  discussionMode
                    ? "Continue the discussion..."
                    : isFirstMessage
                    ? "Describe your goals for the first period of time..."
                    : "Guide your civilization through the ages..."
                }
                className="resize-none min-h-[60px] max-h-[200px]"
                data-testid="textarea-user-input"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Press Enter to send, Shift+Enter for new line
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    type="submit"
                    disabled={!userInput.trim() || sendMessageMutation.isPending}
                    data-testid="button-send-message"
                  >
                    {sendMessageMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {discussionMode ? 'Sending...' : 'Simulating...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send
                      </>
                    )}
                  </Button>
                  {(hasSummaryForCurrentTurn || discussionMode) && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => nextCenturyMutation.mutate()}
                      disabled={nextCenturyMutation.isPending}
                      data-testid="button-next-century-inline"
                    >
                      {nextCenturyMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Proceed to next century'
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      </div>

      {/* Collapsible Sidebar for Summaries */}
      <div 
        className={`border-l border-border bg-card transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-96' : 'w-0'
        } overflow-hidden flex flex-col`}
      >
        {sidebarOpen && (
          <>
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Civilization Summary</h2>
                {summaryMessages.length > 0 && !isEditingSummary && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleStartEditingSummary}
                    title="Edit summary"
                    data-testid="button-edit-summary"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </Button>
                )}
              </div>
              {summaryMessages.length > 0 && (
                <Select
                  value={selectedSummaryIndex.toString()}
                  onValueChange={(value) => {
                    setSelectedSummaryIndex(parseInt(value));
                    setIsEditingSummary(false);
                  }}
                  disabled={isEditingSummary}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {summaryMessages.map((_, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        Turn {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4">
                {summaryMessages.length > 0 ? (
                  isEditingSummary ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editedSummary}
                        onChange={(e) => setEditedSummary(e.target.value)}
                        className="min-h-[300px] font-mono text-sm"
                        placeholder="Edit your civilization summary..."
                        data-testid="textarea-edit-summary"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSaveSummary}
                          disabled={updateSummaryMutation.isPending || !editedSummary.trim()}
                          className="flex-1"
                          data-testid="button-save-summary"
                        >
                          {updateSummaryMutation.isPending ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            'Save'
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancelEditingSummary}
                          disabled={updateSummaryMutation.isPending}
                          data-testid="button-cancel-edit-summary"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <p className="whitespace-pre-wrap">{summaryMessages[selectedSummaryIndex]?.content}</p>
                    </div>
                  )
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No summaries available yet. Complete a turn to generate a summary.
                  </p>
                )}
              </div>
            </ScrollArea>
          </>
        )}
      </div>

      {/* Collapsible Territory Map (collapsed by default, expands on a completed turn) */}
      {mapOpen && (
        <div className="border-l border-border bg-card w-[440px] flex-shrink-0 flex flex-col">
          <WorldMapPanel placement={mapPlacement} placing={mapPlacing} />
        </div>
      )}

      {/* Settings Modal */}
      <CivilizationSettings
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        civilization={civilization}
      />

      {/* Competitive Setup Dialog */}
      <CompetitiveSetupDialog
        isOpen={isCompetitiveDialogOpen}
        onClose={() => setIsCompetitiveDialogOpen(false)}
        civilization={civilization}
      />

      {/* Edit Enemy Civilization Modal */}
      <AlertDialog open={isEditEnemyModalOpen} onOpenChange={setIsEditEnemyModalOpen}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Enemy Civilization</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                <label htmlFor="enemy-description" className="text-sm font-medium block">
                  Enemy Civilization Description
                </label>
                <Textarea
                  id="enemy-description"
                  value={enemyDescriptionDraft}
                  onChange={(e) => setEnemyDescriptionDraft(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                  placeholder="Enter the enemy civilization's description..."
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                updateCivMutation.mutate({ enemyTechAdvancements: enemyDescriptionDraft });
              }}
              disabled={updateCivMutation.isPending}
            >
              {updateCivMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}