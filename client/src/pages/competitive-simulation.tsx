import { useState, useEffect, useCallback, useRef } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { readSSEStream } from "@/lib/sse";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Settings, Loader2 } from "lucide-react";
import type { Civilization, Message } from "@shared/schema";
import { CompetitiveSplitView } from "@/components/CompetitiveSplitView";
import { CompetitiveTabs } from "@/components/CompetitiveTabs";
import { CompetitiveControls } from "@/components/CompetitiveControls";
import { BattleDialog } from "@/components/BattleDialog";
import { BattleHistory } from "@/components/BattleHistory";
import { TurnProgressBar } from "@/components/TurnProgressBar";
import { CivilizationPanel } from "@/components/CivilizationPanel";

type AIModelType = "haiku" | "sonnet" | "opus" | "gpt-4.1" | "gpt-4.1-mini" | "gpt-5.2";

export default function CompetitiveSimulation() {
  const { toast } = useToast();
  const [, params] = useRoute("/civilization/:id/competitive");
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // UI state
  const [activeTab, setActiveTab] = useState<"player_a" | "player_b" | "battle">("player_a");
  const [isMobile, setIsMobile] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isBattleDialogOpen, setIsBattleDialogOpen] = useState(false);
  // Battle type pre-selected when the dialog opens (set by "Final Battle")
  const [battlePreselectedType, setBattlePreselectedType] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // System prompt editing state
  const [playerAPrompt, setPlayerAPrompt] = useState("");
  const [playerBPrompt, setPlayerBPrompt] = useState("");
  const [promptsInitialized, setPromptsInitialized] = useState(false);

  // Streaming state
  const [playerAStreamingMessage, setPlayerAStreamingMessage] = useState("");
  const [playerAIsStreaming, setPlayerAIsStreaming] = useState(false);
  const [playerBStreamingMessage, setPlayerBStreamingMessage] = useState("");
  const [playerBIsStreaming, setPlayerBIsStreaming] = useState(false);
  const [battleStreamingResult, setBattleStreamingResult] = useState("");
  const [battleResult, setBattleResult] = useState<{ battleId: string; winner: string | null } | null>(null);

  // Turn state
  const [isPlayerATurnComplete, setIsPlayerATurnComplete] = useState(false);
  const [isPlayerBTurnComplete, setIsPlayerBTurnComplete] = useState(false);

  // Auto-play (AI vs AI): set after any failed turn so the loop stops until
  // the user re-enables the toggle
  const autoPlayHaltedRef = useRef(false);
  // Mirrors the toggle synchronously so a pending timeout can't fire during
  // the PATCH/refetch round-trip after the user switches auto-play off
  const autoPlayDesiredRef = useRef<boolean | null>(null);

  const civilizationId = params?.id;

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    }
  }, [isAuthenticated, authLoading, toast]);

  // Fetch civilization data
  const { data: civilization, isLoading: civLoading } = useQuery<Civilization>({
    queryKey: ["/api/civilizations", civilizationId],
    enabled: isAuthenticated && !!civilizationId,
  });

  // Fetch competitive status
  const { data: competitiveStatus, isLoading: statusLoading } = useQuery({
    queryKey: ["/api/civilizations", civilizationId, "competitive", "status"],
    queryFn: async () => {
      const response = await fetch(
        `/api/civilizations/${civilizationId}/competitive/status`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch competitive status");
      return response.json();
    },
    enabled: isAuthenticated && !!civilizationId && !!civilization?.competitiveMode,
  });

  // Fetch messages
  const { data: messages = [], isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/civilizations", civilizationId, "messages"],
    enabled: isAuthenticated && !!civilizationId,
  });

  // Fetch default prompts for reference
  const { data: defaultPrompts } = useQuery<{ playerADefaultPrompt: string; playerBDefaultPrompt: string | null }>({
    queryKey: ["/api/civilizations", civilizationId, "default-prompts"],
    queryFn: async () => {
      const response = await fetch(
        `/api/civilizations/${civilizationId}/default-prompts`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch default prompts");
      return response.json();
    },
    enabled: isAuthenticated && !!civilizationId,
  });

  // Initialize prompt state: use custom prompt if set, otherwise prefill with the default
  useEffect(() => {
    if (civilization && defaultPrompts && !promptsInitialized) {
      setPlayerAPrompt(civilization.playerACustomPrompt || defaultPrompts.playerADefaultPrompt || "");
      setPlayerBPrompt(civilization.playerBCustomPrompt || defaultPrompts.playerBDefaultPrompt || "");
      setPromptsInitialized(true);
    }
  }, [civilization, defaultPrompts, promptsInitialized]);

  // Save custom prompts mutation
  // If the prompt matches the default exactly, store null (use built-in default path)
  const updatePromptsMutation = useMutation({
    mutationFn: async ({ playerACustomPrompt, playerBCustomPrompt }: { playerACustomPrompt: string; playerBCustomPrompt: string }) => {
      const aIsDefault = !playerACustomPrompt || playerACustomPrompt === defaultPrompts?.playerADefaultPrompt;
      const bIsDefault = !playerBCustomPrompt || playerBCustomPrompt === defaultPrompts?.playerBDefaultPrompt;
      const result = await apiRequest(
        "PATCH",
        `/api/civilizations/${civilizationId}`,
        {
          playerACustomPrompt: aIsDefault ? null : playerACustomPrompt,
          playerBCustomPrompt: bIsDefault ? null : playerBCustomPrompt,
        }
      );
      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId],
      });
      toast({
        title: "Prompts Saved",
        description: "Custom system prompts updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save custom prompts.",
        variant: "destructive",
      });
    },
  });

  // Filter messages by player - include summaries so they're visible in the message stream
  const playerAMessages = messages.filter(
    (msg) =>
      (msg.playerRole !== "player_b" &&
      msg.messageType !== "player_b_goals" &&
      msg.messageType !== "player_b_simulation" &&
      msg.messageType !== "player_b_summary") ||
      (msg.messageType === "civilization_summary" && msg.playerRole !== "player_b")
  );
  const playerBMessages = messages.filter(
    (msg) =>
      msg.playerRole === "player_b" ||
      msg.messageType === "player_b_goals" ||
      msg.messageType === "player_b_simulation" ||
      msg.messageType === "player_b_summary"
  );

  // Get latest summaries
  const playerASummaries = messages.filter(
    (msg) => msg.messageType === "civilization_summary" && msg.playerRole !== "player_b"
  );
  const playerALatestSummary =
    playerASummaries.length > 0 ? playerASummaries[playerASummaries.length - 1].content : undefined;

  const playerBLatestSummary = competitiveStatus?.playerB?.latestSummary;

  // Reconstruct per-round turn flags after a page refresh. They are plain
  // useState and used to reset to false on reload, which disabled the "Run
  // AI Turn" button (human mode) or let a player's turn be run twice.
  // Reconstruction rules:
  // - human_vs_ai: next-century clears all non-summary chat messages, so any
  //   non-summary player-A turn message in the current chat means A already
  //   played this round; likewise player_b_goals/player_b_simulation mean
  //   B's turn ran. Summaries can't be used — they survive the clear.
  // - ai_vs_ai: messages are kept for the whole game, so per-round presence
  //   can't be derived; flags stay false (Run Turn is safe — the server
  //   rejects double-processing with 409).
  // - either mode: if all configured turns are played, mark the round
  //   complete so the "Final Battle" button appears.
  const roundFlagsInitialized = useRef(false);
  useEffect(() => {
    if (roundFlagsInitialized.current) return;
    if (!civilization || messagesLoading) return;
    roundFlagsInitialized.current = true;

    const gameOver =
      (civilization.competitiveTurnCount || 0) >= (civilization.competitiveTotalTurns || 10);
    if (civilization.competitiveMode === "human_vs_ai") {
      const playerAPlayed = messages.some(
        (msg) =>
          msg.playerRole !== "player_b" &&
          (msg.messageType === "user_goals" ||
            msg.messageType === "user_answer" ||
            msg.messageType === "assistant_simulation")
      );
      const playerBPlayed = messages.some(
        (msg) =>
          msg.messageType === "player_b_goals" ||
          msg.messageType === "player_b_simulation"
      );
      setIsPlayerATurnComplete(playerAPlayed || gameOver);
      setIsPlayerBTurnComplete(playerBPlayed || gameOver);
    } else if (gameOver) {
      setIsPlayerATurnComplete(true);
      setIsPlayerBTurnComplete(true);
    }
  }, [civilization, messages, messagesLoading]);

  // Handle player A's turn submission
  const handlePlayerASubmit = useCallback(async () => {
    if (!userInput.trim() || playerAIsStreaming) return;

    const message = userInput.trim();
    setUserInput("");
    setPlayerAIsStreaming(true);
    setPlayerAStreamingMessage("");

    try {
      const response = await fetch(`/api/civilizations/${civilizationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: message, discussionMode: false }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      let fatalError: string | null = null;
      await readSSEStream(response, (parsed) => {
        if (parsed.type === "error") {
          fatalError = parsed.message || "Failed to submit turn.";
          return;
        }
        if (parsed.text) {
          setPlayerAStreamingMessage((prev) => prev + parsed.text);
        }
      });
      if (fatalError) throw new Error(fatalError);

      setIsPlayerATurnComplete(true);
      // Refresh data
      await queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId, "messages"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId],
      });
      // The turn now renders from the refetched message list, so clear the
      // streamed copy to avoid showing it twice
      setPlayerAStreamingMessage("");
    } catch (error) {
      console.error("Error submitting player A turn:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to submit turn. Please try again.",
        variant: "destructive",
      });
      setUserInput(message); // Restore input on error
      setPlayerAStreamingMessage("");
      // Resync with whatever the server actually persisted
      queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId, "messages"],
      });
      queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId],
      });
    } finally {
      setPlayerAIsStreaming(false);
    }
  }, [userInput, civilizationId, playerAIsStreaming, toast]);

  // Handle AI turn (runs both AIs in AI vs AI mode)
  const handleRunAITurn = useCallback(async () => {
    if (playerAIsStreaming || playerBIsStreaming) return;

    const isAIvsAI = civilization?.competitiveMode === "ai_vs_ai";

    // In AI vs AI mode, both players run; a fresh turn also resets the
    // per-round flags (auto-play starts the next round without the user
    // clicking "Next Century")
    if (isAIvsAI) {
      setPlayerAIsStreaming(true);
      setPlayerAStreamingMessage("");
      setIsPlayerATurnComplete(false);
      setIsPlayerBTurnComplete(false);
    }
    setPlayerBIsStreaming(true);
    setPlayerBStreamingMessage("");

    try {
      const response = await fetch(
        `/api/civilizations/${civilizationId}/competitive/ai-turn`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      // Non-fatal rejections: a turn is already processing (409) or all
      // configured turns have been played (400)
      if (response.status === 409) {
        toast({
          title: "Turn In Progress",
          description: "A turn is already being processed for this civilization.",
        });
        queryClient.invalidateQueries({
          queryKey: ["/api/civilizations", civilizationId],
        });
        queryClient.invalidateQueries({
          queryKey: ["/api/civilizations", civilizationId, "competitive", "status"],
        });
        return;
      }
      if (response.status === 400) {
        // The server distinguishes rejections via `code`: only exhausted
        // turns mean game-over — turn-order rejections (play your turn
        // first / AI already played) just need a toast.
        let body: any = null;
        try {
          body = await response.json();
        } catch {
          // non-JSON body — fall through to the generic toast
        }
        if (body?.code === "TURNS_EXHAUSTED" || !body?.code) {
          autoPlayHaltedRef.current = true;
          toast({
            title: "Game Complete",
            description: "All configured turns have been played.",
          });
          // Game over: mark the round complete so the Final Battle button shows
          setIsPlayerATurnComplete(true);
          setIsPlayerBTurnComplete(true);
        } else {
          toast({
            title: "Can't Run AI Turn",
            description: body.message || "The AI turn was rejected.",
            variant: "destructive",
          });
        }
        queryClient.invalidateQueries({
          queryKey: ["/api/civilizations", civilizationId],
        });
        queryClient.invalidateQueries({
          queryKey: ["/api/civilizations", civilizationId, "competitive", "status"],
        });
        return;
      }
      if (!response.ok) throw new Error("Failed to run AI turn");

      let fatalError: string | null = null;
      await readSSEStream(response, (parsed) => {
        if (parsed.type === "error") {
          fatalError = parsed.message || "Failed to run AI turn.";
          return;
        }
        if (parsed.type === "subTurnStart") {
          // A new sub-turn starts; mark the participating panels as streaming
          if (parsed.runPlayerA) setPlayerAIsStreaming(true);
          if (parsed.runPlayerB) setPlayerBIsStreaming(true);
          return;
        }

        const player = parsed.player || "player_b"; // Default to player_b for backwards compatibility

        if (player === "player_a") {
          // Handle Player A messages
          if (parsed.type === "simulation" && parsed.text) {
            setPlayerAStreamingMessage((prev) => prev + parsed.text);
          } else if (parsed.type === "goals" && parsed.content) {
            setPlayerAStreamingMessage(parsed.content + "\n\n---\n\n");
          } else if (parsed.type === "summary" && parsed.content) {
            // Append summary to streaming message with separator
            setPlayerAStreamingMessage((prev) => prev + "\n\n---\n\n**Summary:**\n\n" + parsed.content);
          } else if (parsed.type === "turnComplete") {
            setPlayerAIsStreaming(false);
            setIsPlayerATurnComplete(true);
          }
        } else {
          // Handle Player B messages
          if (parsed.type === "simulation" && parsed.text) {
            setPlayerBStreamingMessage((prev) => prev + parsed.text);
          } else if (parsed.type === "goals" && parsed.content) {
            setPlayerBStreamingMessage(parsed.content + "\n\n---\n\n");
          } else if (parsed.type === "summary" && parsed.content) {
            // Append summary to streaming message with separator
            setPlayerBStreamingMessage((prev) => prev + "\n\n---\n\n**Summary:**\n\n" + parsed.content);
          } else if (parsed.type === "turnComplete") {
            setPlayerBIsStreaming(false);
            setIsPlayerBTurnComplete(true);
          }
        }
      });
      if (fatalError) throw new Error(fatalError);

      setIsPlayerATurnComplete(true);
      setIsPlayerBTurnComplete(true);
      // Refresh data
      await queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId, "messages"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId, "competitive", "status"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId],
      });
      // The turn now renders from the refetched message list, so clear the
      // streamed copies to avoid showing every message twice
      setPlayerAStreamingMessage("");
      setPlayerBStreamingMessage("");
    } catch (error) {
      console.error("Error running AI turn:", error);
      autoPlayHaltedRef.current = true; // stop the auto-play loop on any error
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to run AI turn. Please try again.",
        variant: "destructive",
      });
      setPlayerAStreamingMessage("");
      setPlayerBStreamingMessage("");
      // Resync with whatever the server actually persisted
      queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId, "messages"],
      });
      queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId, "competitive", "status"],
      });
      queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId],
      });
    } finally {
      setPlayerAIsStreaming(false);
      setPlayerBIsStreaming(false);
    }
  }, [civilizationId, civilization?.competitiveMode, playerAIsStreaming, playerBIsStreaming, toast]);

  // Auto-play loop (AI vs AI only): when a round finishes successfully and
  // the toggle is on, schedule the next turn after a short delay. The timeout
  // is cancelled on unmount, toggle-off, or any dependency change; the loop
  // stops when all turns are played, after any error (autoPlayHaltedRef), or
  // when the user switches the toggle off. handleRunAITurn guards against
  // starting while a turn is in flight (the server also rejects with 409).
  useEffect(() => {
    if (!civilization || civilization.competitiveMode !== "ai_vs_ai") return;
    if (!civilization.competitiveAutoPlay) {
      autoPlayHaltedRef.current = false; // re-arm for the next enable
      return;
    }
    if (autoPlayHaltedRef.current) return;
    if (playerAIsStreaming || playerBIsStreaming) return;
    if (!isPlayerATurnComplete || !isPlayerBTurnComplete) return;
    if ((civilization.competitiveTurnCount || 0) >= (civilization.competitiveTotalTurns || 10)) return;

    const timeout = setTimeout(() => {
      if (autoPlayDesiredRef.current === false) return; // toggled off before the refetch landed
      handleRunAITurn();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [
    civilization,
    playerAIsStreaming,
    playerBIsStreaming,
    isPlayerATurnComplete,
    isPlayerBTurnComplete,
    handleRunAITurn,
  ]);

  // Handle proceeding to the next turn in competitive mode
  // - human_vs_ai: the human player's century is NOT advanced during the AI
  //   turn, so we must call the real next-century endpoint. It advances the
  //   century and clears chat messages (preserving summaries, including
  //   player_b_summary).
  // - ai_vs_ai: both centuries already advanced server-side during the AI
  //   turn, so no backend call - just reset the per-round UI state and keep
  //   all messages for full game history.
  const nextCenturyMutation = useMutation({
    mutationFn: async () => {
      if (civilization?.competitiveMode === "human_vs_ai") {
        const result = await apiRequest(
          "POST",
          `/api/civilizations/${civilizationId}/next-century`
        );
        return result.json();
      }
      return { success: true };
    },
    onSuccess: async () => {
      setIsPlayerATurnComplete(false);
      setIsPlayerBTurnComplete(false);
      setPlayerAStreamingMessage("");
      setPlayerBStreamingMessage("");
      // Refresh data to ensure we have latest state
      await queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId, "messages"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId, "competitive", "status"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId],
      });
      toast({
        title: "Ready for Next Turn",
        description: "Proceeding to the next turn.",
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
        description: "Failed to proceed to next century.",
        variant: "destructive",
      });
    },
  });

  // Handle battle. Resolves on both success and failure (errors are surfaced
  // via toast) - BattleDialog awaits this to re-enable its Start button.
  const handleStartBattle = useCallback(async (battleType: string) => {
    setBattleStreamingResult("");
    setBattleResult(null);

    try {
      const response = await fetch(
        `/api/civilizations/${civilizationId}/competitive/battle`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ battleType }),
        }
      );

      if (!response.ok) throw new Error("Failed to start battle");

      let fatalError: string | null = null;
      let gotBattleId = false;
      await readSSEStream(response, (parsed) => {
        if (parsed.type === "error") {
          fatalError = parsed.message || "Failed to start battle.";
          return;
        }
        if (parsed.text) {
          setBattleStreamingResult((prev) => prev + parsed.text);
        }
        if (parsed.battleId) {
          gotBattleId = true;
          setBattleResult({ battleId: parsed.battleId, winner: parsed.winner });
        }
      });
      if (fatalError) throw new Error(fatalError);
      if (!gotBattleId) {
        throw new Error("The battle stream ended before a result was recorded.");
      }

      await queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId, "competitive", "battles"],
      });
    } catch (error) {
      console.error("Error starting battle:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to start battle.",
        variant: "destructive",
      });
      // Return the dialog to the selection view so the battle can be retried
      // (otherwise it stalls on a partial result with no battleId)
      setBattleStreamingResult("");
      setBattleResult(null);
    }
  }, [civilizationId, toast]);

  // Toggle auto-play
  const toggleAutoPlayMutation = useMutation({
    mutationFn: async (enabled: boolean) => {
      const result = await apiRequest(
        "PATCH",
        `/api/civilizations/${civilizationId}`,
        { competitiveAutoPlay: enabled }
      );
      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId],
      });
    },
  });

  // Update model preferences
  const updateModelMutation = useMutation({
    mutationFn: async ({ player, model }: { player: "a" | "b"; model: AIModelType }) => {
      const update = player === "a"
        ? { playerAModel: model }
        : { playerBModel: model };
      const result = await apiRequest(
        "PATCH",
        `/api/civilizations/${civilizationId}`,
        update
      );
      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId],
      });
      toast({
        title: "Model Updated",
        description: "AI model preference saved.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update model preference.",
        variant: "destructive",
      });
    },
  });

  // Loading state
  if (authLoading || civLoading || messagesLoading || statusLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading competitive mode...</p>
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

  if (!civilization.competitiveMode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            This civilization is not in competitive mode.
          </p>
          <Link href={`/civilization/${civilizationId}`}>
            <Button>Return to Simulation</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isHumanVsAI = civilization.competitiveMode === "human_vs_ai";
  const turnCount = civilization.competitiveTurnCount || 0;
  const totalTurns = civilization.competitiveTotalTurns || 10;

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card flex-shrink-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/civilization/${civilizationId}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold">
                {isHumanVsAI ? "Human vs AI" : "AI vs AI"} - Competitive Mode
              </h1>
              <p className="text-xs text-muted-foreground">
                {civilization.name} vs {civilization.playerBCivilizationName || "Opponent"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Competitive Mode Settings</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="models">
                  <TabsList className="w-full">
                    <TabsTrigger value="models" className="flex-1">Models</TabsTrigger>
                    <TabsTrigger value="prompts" className="flex-1">System Prompts</TabsTrigger>
                  </TabsList>

                  {/* Models Tab */}
                  <TabsContent value="models" className="space-y-4 mt-4">
                    <p className="text-xs text-muted-foreground">
                      Select which model powers each AI player. OpenAI models require an OPENAI_API_KEY in your .env.
                    </p>

                    {!isHumanVsAI && (
                      <div className="space-y-2">
                        <Label className="text-sm">Player A (Left) Model</Label>
                        <Select
                          value={civilization.playerAModel || "haiku"}
                          onValueChange={(value) =>
                            updateModelMutation.mutate({ player: "a", model: value as AIModelType })
                          }
                          disabled={updateModelMutation.isPending}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="haiku">Claude 4.5 Haiku (Fast)</SelectItem>
                            <SelectItem value="sonnet">Claude 4.5 Sonnet (Balanced)</SelectItem>
                            <SelectItem value="opus">Claude Opus 5.5 (Advanced)</SelectItem>
                            <SelectItem value="gpt-4.1">GPT-4.1 (OpenAI)</SelectItem>
                            <SelectItem value="gpt-4.1-mini">GPT-4.1 Mini (OpenAI)</SelectItem>
                            <SelectItem value="gpt-5.2">GPT-5.2 (OpenAI)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label className="text-sm">
                        {isHumanVsAI ? "AI Opponent Model" : "Player B (Right) Model"}
                      </Label>
                      <Select
                        value={civilization.playerBModel || "haiku"}
                        onValueChange={(value) =>
                          updateModelMutation.mutate({ player: "b", model: value as AIModelType })
                        }
                        disabled={updateModelMutation.isPending}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="haiku">Claude 4.5 Haiku (Fast)</SelectItem>
                          <SelectItem value="sonnet">Claude 4.5 Sonnet (Balanced)</SelectItem>
                          <SelectItem value="opus">Claude Opus 5.5 (Advanced)</SelectItem>
                          <SelectItem value="gpt-4.1">GPT-4.1 (OpenAI)</SelectItem>
                          <SelectItem value="gpt-4.1-mini">GPT-4.1 Mini (OpenAI)</SelectItem>
                          <SelectItem value="gpt-5.2">GPT-5.2 (OpenAI)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <p className="text-xs text-muted-foreground border-t pt-3">
                      Haiku is fastest and most cost-effective. Sonnet provides better reasoning.
                      Opus is the most capable but slowest.
                    </p>
                  </TabsContent>

                  {/* System Prompts Tab */}
                  <TabsContent value="prompts" className="space-y-4 mt-4">
                    <p className="text-xs text-muted-foreground">
                      Edit the system prompts directly. They are prefilled with the current defaults. Changes apply on the next turn.
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Player A System Prompt</Label>
                        {defaultPrompts?.playerADefaultPrompt && playerAPrompt !== defaultPrompts.playerADefaultPrompt && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setPlayerAPrompt(defaultPrompts.playerADefaultPrompt)}
                          >
                            Reset to Default
                          </Button>
                        )}
                      </div>
                      <Textarea
                        value={playerAPrompt}
                        onChange={(e) => setPlayerAPrompt(e.target.value)}
                        className="min-h-[200px] font-mono text-xs"
                      />
                      <p className="text-xs text-muted-foreground">
                        {playerAPrompt.length} chars
                        {defaultPrompts?.playerADefaultPrompt && playerAPrompt !== defaultPrompts.playerADefaultPrompt
                          ? " (modified)"
                          : " (default)"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Player B System Prompt</Label>
                        {defaultPrompts?.playerBDefaultPrompt && playerBPrompt !== defaultPrompts.playerBDefaultPrompt && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setPlayerBPrompt(defaultPrompts.playerBDefaultPrompt!)}
                          >
                            Reset to Default
                          </Button>
                        )}
                      </div>
                      <Textarea
                        value={playerBPrompt}
                        onChange={(e) => setPlayerBPrompt(e.target.value)}
                        className="min-h-[200px] font-mono text-xs"
                      />
                      <p className="text-xs text-muted-foreground">
                        {playerBPrompt.length} chars
                        {defaultPrompts?.playerBDefaultPrompt && playerBPrompt !== defaultPrompts.playerBDefaultPrompt
                          ? " (modified)"
                          : " (default)"}
                      </p>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => updatePromptsMutation.mutate({
                        playerACustomPrompt: playerAPrompt,
                        playerBCustomPrompt: playerBPrompt,
                      })}
                      disabled={updatePromptsMutation.isPending}
                    >
                      {updatePromptsMutation.isPending ? "Saving..." : "Save Prompts"}
                    </Button>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {isMobile ? (
          // Mobile: Tabbed layout
          <div className="h-full flex flex-col">
            {/* Turn Progress in mobile */}
            <div className="p-3 border-b bg-card">
              <TurnProgressBar currentTurn={turnCount} totalTurns={totalTurns} />
            </div>

            <CompetitiveTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              playerAName={civilization.userName}
              playerBName={civilization.playerBName || "AI"}
            >
              {{
                playerA: (
                  <div className="h-full">
                    <CivilizationPanel
                      playerType="player_a"
                      playerName={civilization.userName}
                      civilizationName={civilization.name}
                      location={civilization.location}
                      currentCentury={civilization.currentCentury}
                      strengthPercentile={civilization.civilizationStrengthPercentile}
                      messages={playerAMessages}
                      streamingMessage={playerAStreamingMessage}
                      isStreaming={playerAIsStreaming}
                      isHuman={isHumanVsAI}
                      userInput={userInput}
                      onUserInputChange={setUserInput}
                      onSubmit={handlePlayerASubmit}
                      isPending={playerAIsStreaming}
                      latestSummary={playerALatestSummary}
                    />
                  </div>
                ),
                playerB: (
                  <div className="h-full">
                    <CivilizationPanel
                      playerType="player_b"
                      playerName={civilization.playerBName || "AI Opponent"}
                      civilizationName={civilization.playerBCivilizationName || "Rival"}
                      location={civilization.playerBLocation || "Unknown"}
                      currentCentury={civilization.playerBCurrentCentury || civilization.currentCentury}
                      strengthPercentile={civilization.playerBStrengthPercentile}
                      messages={playerBMessages}
                      streamingMessage={playerBStreamingMessage}
                      isStreaming={playerBIsStreaming}
                      isHuman={false}
                      latestSummary={playerBLatestSummary}
                    />
                  </div>
                ),
                battle: (
                  <BattleHistory
                    civilizationId={civilizationId!}
                    playerAName={civilization.name}
                    playerBName={civilization.playerBCivilizationName || "Opponent"}
                  />
                ),
              }}
            </CompetitiveTabs>
          </div>
        ) : (
          // Desktop: Split view
          <CompetitiveSplitView
            playerAName={civilization.userName}
            playerACivilizationName={civilization.name}
            playerALocation={civilization.location}
            playerACurrentCentury={civilization.currentCentury}
            playerAStrengthPercentile={civilization.civilizationStrengthPercentile}
            playerAMessages={playerAMessages}
            playerAStreamingMessage={playerAStreamingMessage}
            playerAIsStreaming={playerAIsStreaming}
            playerALatestSummary={playerALatestSummary}
            playerAUserInput={userInput}
            onPlayerAUserInputChange={setUserInput}
            onPlayerASubmit={handlePlayerASubmit}
            playerAIsPending={playerAIsStreaming}
            isPlayerAHuman={isHumanVsAI}
            playerBName={civilization.playerBName || "AI Opponent"}
            playerBCivilizationName={civilization.playerBCivilizationName || "Rival"}
            playerBLocation={civilization.playerBLocation || "Unknown"}
            playerBCurrentCentury={civilization.playerBCurrentCentury || civilization.currentCentury}
            playerBStrengthPercentile={civilization.playerBStrengthPercentile}
            playerBMessages={playerBMessages}
            playerBStreamingMessage={playerBStreamingMessage}
            playerBIsStreaming={playerBIsStreaming}
            playerBLatestSummary={playerBLatestSummary}
            turnCount={turnCount}
            totalTurns={totalTurns}
          />
        )}
      </div>

      {/* Controls */}
      <CompetitiveControls
        mode={civilization.competitiveMode as "human_vs_ai" | "ai_vs_ai"}
        isPlayerATurnComplete={isPlayerATurnComplete}
        isPlayerBTurnComplete={isPlayerBTurnComplete}
        isPending={playerAIsStreaming || playerBIsStreaming || nextCenturyMutation.isPending}
        isAutoPlay={civilization.competitiveAutoPlay || false}
        onRunAITurn={handleRunAITurn}
        onProceedToNextCentury={() => {
          if (turnCount >= totalTurns) {
            // Last turn: the button reads "Final Battle" - open the battle
            // dialog (pre-selecting the climactic extermination war) instead
            // of advancing the century
            setBattlePreselectedType("extermination_war");
            setIsBattleDialogOpen(true);
          } else {
            nextCenturyMutation.mutate();
          }
        }}
        onBattleNow={() => {
          setBattlePreselectedType(null);
          setIsBattleDialogOpen(true);
        }}
        onToggleAutoPlay={(enabled) => {
          autoPlayDesiredRef.current = enabled;
          if (enabled) autoPlayHaltedRef.current = false; // re-arm after a prior error
          toggleAutoPlayMutation.mutate(enabled);
        }}
        turnCount={turnCount}
        totalTurns={totalTurns}
      />

      {/* Battle Dialog */}
      <BattleDialog
        isOpen={isBattleDialogOpen}
        onClose={() => {
          setIsBattleDialogOpen(false);
          setBattlePreselectedType(null);
          setBattleStreamingResult("");
          setBattleResult(null);
        }}
        onStartBattle={handleStartBattle}
        isPending={!!battleStreamingResult && !battleResult}
        initialBattleType={battlePreselectedType}
        streamingResult={battleStreamingResult}
        battleResult={battleResult}
        playerAName={civilization.name}
        playerBName={civilization.playerBCivilizationName || "Opponent"}
      />
    </div>
  );
}
