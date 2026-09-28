import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { ArrowLeft, Loader2, Copy, LogOut, Lock, Check, Play, Swords, Map, ScrollText, History } from "lucide-react";
import { WorldMapPanel } from "@/components/WorldMapPanel";
import { replayMapLog } from "@/lib/mpMap";
import { formatMarkdown } from "@/lib/formatMarkdown";

/** AI-generated text (simulation, memory, history) rendered with the same
 *  lightweight markdown formatting as singleplayer, instead of raw `**`/`#`. */
function RichText({ text, testId }: { text: string; testId?: string }) {
  return (
    <div
      className="prose prose-sm max-w-none dark:prose-invert prose-headings:mt-3 prose-headings:mb-1 prose-headings:text-base prose-p:my-1.5 prose-ul:my-1.5 prose-ul:ml-5 prose-li:my-0.5 prose-hr:my-3 text-sm"
      data-testid={testId}
      dangerouslySetInnerHTML={{ __html: formatMarkdown(text) }}
    />
  );
}

interface Player {
  id: string;
  slot: number;
  playerName: string | null;
  kingdomName: string | null;
  location: string | null;
  goals?: string | null;
  questions?: string | null;
  answers?: string | null;
  summary?: string | null;
  ready: boolean;
}
interface Session {
  id: string;
  joinCode: string;
  hostPlayerId: string | null;
  turnIncrement: number;
  currentYear: number;
  turnNumber: number;
  phase: string;
  mapLog: string;
  mapSeed: number;
  lastSimulation: string | null;
  randomDigit: number;
  soloPlayerId: string | null;
  addToCanon: boolean;
}
interface Seat {
  sessionId: string;
  playerId: string;
}

const SEAT_KEY = "mp_seat";
const MAX_PLAYERS = 8;
interface MySession {
  sessionId: string;
  joinCode: string;
  phase: string;
  turnNumber: number;
  currentYear: number;
  playerId: string;
  kingdomName: string | null;
  playerCount: number;
  isHost: boolean;
}
const readSeat = (): Seat | null => {
  try {
    const s = sessionStorage.getItem(SEAT_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
};
const formatYear = (y: number): string => (y < 0 ? `${Math.abs(y).toLocaleString()} BCE` : `${y.toLocaleString()} CE`);
const parseArr = (s?: string | null): string[] => {
  try {
    const v = JSON.parse(s || "[]");
    return Array.isArray(v) ? v.map((x) => String(x)) : [];
  } catch {
    return [];
  }
};

function authGuard(e: any, toast: any): boolean {
  if (isUnauthorizedError(e)) {
    toast({ title: "Please log in", description: "Redirecting…", variant: "destructive" });
    setTimeout(() => (window.location.href = "/api/login"), 600);
    return true;
  }
  return false;
}

export default function Multiplayer() {
  const { toast } = useToast();
  const [seat, setSeat] = useState<Seat | null>(() => readSeat());

  // create form
  const [turnInc, setTurnInc] = useState(100);
  const [yearAbs, setYearAbs] = useState(10000);
  const [era, setEra] = useState<"BCE" | "CE">("BCE");
  const [creating, setCreating] = useState(false);
  // join form
  const [joinCode, setJoinCode] = useState("");
  const [joining, setJoining] = useState(false);

  // my editable fields (kept local so polling doesn't clobber typing)
  const [myName, setMyName] = useState("");
  const [myKingdom, setMyKingdom] = useState("");
  const [myLoc, setMyLoc] = useState("");
  // host settings local
  const [hostInc, setHostInc] = useState(100);
  const [hostYearAbs, setHostYearAbs] = useState(10000);
  const [hostEra, setHostEra] = useState<"BCE" | "CE">("BCE");
  const inited = useRef(false);
  // game round
  const [goalsInput, setGoalsInput] = useState("");
  const [answerText, setAnswerText] = useState("");
  const restoredDraftRef = useRef("");
  // Streaming simulation panel — kept pinned to the bottom as text arrives.
  const simStreamRef = useRef<HTMLDivElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [warType, setWarType] = useState("Limited War");
  const [warScenario, setWarScenario] = useState("");
  // Map is collapsed by default (like singleplayer); auto-revealed for the
  // shared simulation/results, auto-hidden again at the start of a new turn.
  const [mapOpen, setMapOpen] = useState(false);
  // Your civilization's running memory (summary) — visible + editable, like singleplayer
  const [memoryOpen, setMemoryOpen] = useState(true);
  const [editingMemory, setEditingMemory] = useState(false);
  const [memoryDraft, setMemoryDraft] = useState("");
  const [savingMemory, setSavingMemory] = useState(false);
  // Full game transcript (fetched on demand so it stays out of the 1.5s poll)
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);
  // Host-editable shared world rules (the simulation system prompt)
  const [worldPrompt, setWorldPrompt] = useState("");
  const [worldPromptOpen, setWorldPromptOpen] = useState(false);
  const [worldPromptDirty, setWorldPromptDirty] = useState(false);
  const [savingPrompt, setSavingPrompt] = useState(false);

  const sessionQuery = useQuery<{ session: Session; players: Player[] }>({
    queryKey: ["/api/sessions", seat?.sessionId],
    enabled: !!seat,
    // Poll faster while the shared simulation streams in so both players read it
    // as it arrives; back off to 1.5s otherwise.
    refetchInterval: (query) => (query.state.data?.session.phase === "simulating" ? 500 : 1500),
    // Keep polling even when the tab is backgrounded — a player may tab away
    // during the ~30s simulation, and the round resolves server-side regardless.
    refetchIntervalInBackground: true,
    queryFn: async () => (await apiRequest("GET", `/api/sessions/${seat!.sessionId}`)).json(),
  });
  const data = sessionQuery.data;
  const me = data?.players.find((p) => p.id === seat?.playerId) || null;
  const isHost = !!(data && me && data.session.hostPlayerId === me.id);

  // The current user's joined games, for one-click rejoin (shown on the
  // create/join screen so you never have to re-enter a code).
  const mySessionsQuery = useQuery<{ sessions: MySession[] }>({
    queryKey: ["/api/sessions/mine"],
    enabled: !seat,
    queryFn: async () => (await apiRequest("GET", "/api/sessions/mine")).json(),
  });

  useEffect(() => {
    if (data && me && !inited.current) {
      inited.current = true;
      setMyName(me.playerName || "");
      setMyKingdom(me.kingdomName || "");
      setMyLoc(me.location || "");
      const y = data.session.currentYear;
      setHostEra(y < 0 ? "BCE" : "CE");
      setHostYearAbs(Math.abs(y));
      setHostInc(data.session.turnIncrement);
    }
  }, [data, me]);

  // Restore in-progress goals/answer drafts from localStorage for the current
  // turn — survives Replit's forced reloads. Keyed by session+player+turn, so it
  // re-runs on a new turn and resets to "" (or that turn's own saved draft).
  useEffect(() => {
    if (!seat || !data) return;
    const tag = `${seat.sessionId}_${seat.playerId}_${data.session.turnNumber}`;
    if (restoredDraftRef.current === tag) return;
    restoredDraftRef.current = tag;
    try {
      setGoalsInput(localStorage.getItem(`mp_draft_goals_${tag}`) || "");
      setAnswerText(localStorage.getItem(`mp_draft_answer_${tag}`) || "");
    } catch {
      /* localStorage unavailable */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seat, data?.session.turnNumber]);

  // Follow the streaming simulation: keep the panel scrolled to the newest text
  // (only while simulating, so results stay scrolled to the top for reading).
  useEffect(() => {
    if (data?.session.phase === "simulating" && simStreamRef.current) {
      simStreamRef.current.scrollTop = simStreamRef.current.scrollHeight;
    }
  }, [data?.session.phase, data?.session.lastSimulation]);

  // Reveal the map for the shared simulation/results; hide it again when a new
  // turn opens (so goals/questions stay full-width like singleplayer).
  useEffect(() => {
    const ph = data?.session.phase;
    if (ph === "simulating" || ph === "results") setMapOpen(true);
    else if (ph === "goals") setMapOpen(false);
  }, [data?.session.phase]);

  // Load the transcript when the History panel is open, and refresh it whenever
  // a new turn completes (turnNumber changes) while it's open.
  useEffect(() => {
    if (!historyOpen || !seat) return;
    let alive = true;
    setHistoryLoading(true);
    setHistoryError(null);
    apiRequest("GET", `/api/sessions/${seat.sessionId}/history`)
      .then((r) => r.json())
      .then((d) => { if (alive) setHistoryData(Array.isArray(d.history) ? d.history : []); })
      .catch((e) => { if (alive) setHistoryError(e?.message || "Couldn't load history"); })
      .finally(() => { if (alive) setHistoryLoading(false); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyOpen, data?.session.turnNumber, historyRefreshKey]);

  // If the seat 404s (session gone), drop back to the create/join screen.
  useEffect(() => {
    if (seat && sessionQuery.isError && (sessionQuery.error as any)?.message?.includes("404")) {
      sessionStorage.removeItem(SEAT_KEY);
      setSeat(null);
      inited.current = false;
    }
  }, [seat, sessionQuery.isError, sessionQuery.error]);

  const enterSeat = (sessionId: string, playerId: string) => {
    const s = { sessionId, playerId };
    sessionStorage.setItem(SEAT_KEY, JSON.stringify(s));
    inited.current = false;
    setSeat(s);
  };

  const create = async () => {
    setCreating(true);
    try {
      const res = await apiRequest("POST", "/api/sessions", {
        turnIncrement: turnInc,
        currentYear: era === "BCE" ? -Math.abs(yearAbs) : Math.abs(yearAbs),
      });
      const { session, playerId } = await res.json();
      enterSeat(session.id, playerId);
    } catch (e: any) {
      if (!authGuard(e, toast)) toast({ title: "Couldn't create session", description: e.message, variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  const join = async () => {
    if (!/^\d{5}$/.test(joinCode)) {
      toast({ title: "Enter a 5-digit code", variant: "destructive" });
      return;
    }
    setJoining(true);
    try {
      const res = await apiRequest("POST", "/api/sessions/join", { code: joinCode });
      const { session, playerId } = await res.json();
      enterSeat(session.id, playerId);
    } catch (e: any) {
      if (!authGuard(e, toast)) toast({ title: "Couldn't join", description: e.message, variant: "destructive" });
    } finally {
      setJoining(false);
    }
  };

  const leave = async () => {
    try {
      if (seat) await apiRequest("POST", `/api/sessions/${seat.sessionId}/leave`, { playerId: seat.playerId });
    } catch {
      // best effort
    }
    sessionStorage.removeItem(SEAT_KEY);
    inited.current = false;
    setSeat(null);
  };

  const saveMine = async (fields: Record<string, any>) => {
    if (!seat) return;
    try {
      await apiRequest("PATCH", `/api/sessions/${seat.sessionId}/player`, { playerId: seat.playerId, ...fields });
      sessionQuery.refetch();
    } catch (e: any) {
      if (!authGuard(e, toast)) toast({ title: "Update failed", description: e.message, variant: "destructive" });
    }
  };

  const saveHostSettings = async () => {
    if (!seat) return;
    try {
      await apiRequest("PATCH", `/api/sessions/${seat.sessionId}/settings`, {
        playerId: seat.playerId,
        turnIncrement: Math.max(1, hostInc),
        currentYear: hostEra === "BCE" ? -Math.abs(hostYearAbs) : Math.abs(hostYearAbs),
      });
      sessionQuery.refetch();
      toast({ title: "Settings updated" });
    } catch (e: any) {
      if (!authGuard(e, toast)) toast({ title: "Update failed", description: e.message, variant: "destructive" });
    }
  };

  const loadWorldPrompt = async () => {
    if (!seat) return;
    try {
      const r = await apiRequest("GET", `/api/sessions/${seat.sessionId}/default-prompt`);
      const { prompt } = await r.json();
      setWorldPrompt(prompt);
      setWorldPromptDirty(false);
    } catch {
      // best effort
    }
  };
  const toggleWorldPrompt = () => {
    const opening = !worldPromptOpen;
    setWorldPromptOpen(opening);
    if (opening && !worldPrompt) loadWorldPrompt();
  };
  const saveWorldPrompt = async () => {
    if (!seat) return;
    setSavingPrompt(true);
    try {
      await apiRequest("PATCH", `/api/sessions/${seat.sessionId}/settings`, { playerId: seat.playerId, systemPrompt: worldPrompt });
      setWorldPromptDirty(false);
      toast({ title: "Shared world rules saved" });
    } catch (e: any) {
      if (!authGuard(e, toast)) toast({ title: "Save failed", description: e.message, variant: "destructive" });
    } finally {
      setSavingPrompt(false);
    }
  };
  const resetWorldPrompt = async () => {
    if (!seat) return;
    setSavingPrompt(true);
    try {
      await apiRequest("PATCH", `/api/sessions/${seat.sessionId}/settings`, { playerId: seat.playerId, systemPrompt: "" });
      await loadWorldPrompt();
      toast({ title: "Reset to the default rules" });
    } catch (e: any) {
      if (!authGuard(e, toast)) toast({ title: "Reset failed", description: e.message, variant: "destructive" });
    } finally {
      setSavingPrompt(false);
    }
  };

  const post = async (path: string, body: Record<string, any>, errTitle: string) => {
    if (!seat) return;
    setBusy(true);
    try {
      await apiRequest("POST", `/api/sessions/${seat.sessionId}${path}`, { playerId: seat.playerId, ...body });
      await sessionQuery.refetch();
    } catch (e: any) {
      if (!authGuard(e, toast)) toast({ title: errTitle, description: e.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };
  const startGame = () => post("/start", {}, "Couldn't start");
  const submitGoals = () => {
    if (!goalsInput.trim()) {
      toast({ title: "Enter your goals first", variant: "destructive" });
      return;
    }
    post("/submit-goals", { goals: goalsInput }, "Couldn't submit goals");
  };
  const setLuck = async (digit: number) => {
    if (!seat) return;
    try {
      await apiRequest("PATCH", `/api/sessions/${seat.sessionId}/settings`, { playerId: seat.playerId, randomDigit: digit });
      await sessionQuery.refetch();
    } catch (e: any) {
      if (!authGuard(e, toast)) toast({ title: "Couldn't update luck", description: e.message, variant: "destructive" });
    }
  };
  const setCanon = async (on: boolean) => {
    if (!seat) return;
    try {
      await apiRequest("PATCH", `/api/sessions/${seat.sessionId}/settings`, { playerId: seat.playerId, addToCanon: on });
      await sessionQuery.refetch();
    } catch (e: any) {
      if (!authGuard(e, toast)) toast({ title: "Couldn't update canon setting", description: e.message, variant: "destructive" });
    }
  };

  const startEditMemory = () => {
    setMemoryDraft(me?.summary || "");
    setEditingMemory(true);
  };
  const saveMemory = async () => {
    if (!seat) return;
    setSavingMemory(true);
    try {
      await apiRequest("PATCH", `/api/sessions/${seat.sessionId}/player`, { playerId: seat.playerId, summary: memoryDraft });
      setEditingMemory(false);
      await sessionQuery.refetch();
    } catch (e: any) {
      if (!authGuard(e, toast)) toast({ title: "Couldn't save memory", description: e.message, variant: "destructive" });
    } finally {
      setSavingMemory(false);
    }
  };

  // Step back to re-edit goals or answer for the current (not-yet-simulated) turn.
  const stepBack = (to: "goals" | "questions") => post("/step-back", { to }, "Couldn't go back");
  const submitAnswers = () => {
    if (!answerText.trim()) {
      toast({ title: "Write your answer first", variant: "destructive" });
      return;
    }
    post("/submit-answers", { answer: answerText.trim() }, "Couldn't submit answers");
  };
  const runRound = () => post("/run-round", {}, "Couldn't run the round");
  // Host-only: start the simulation without waiting for the remaining players.
  const runWithoutWaiting = (stragglers: string[]) => {
    const who = stragglers.join(", ") || "the remaining players";
    if (!window.confirm(`Start the simulation without waiting for ${who}?\n\nAny goals they already submitted are used as-is (even with unanswered questions), and anyone who hasn't set goals simply carries on as before this turn.`)) return;
    post("/run-now", {}, "Couldn't start the turn");
  };
  const rerunTurn = () => post("/rerun", {}, "Couldn't re-run the turn");
  const startWar = () => {
    const canon = data?.session?.addToCanon !== false;
    const scope = warScenario.trim() ? "the civilizations (per your scenario)" : "all civilizations (free-for-all)";
    const msg = canon
      ? `Simulate a ${warType} among ${scope}? It updates every player's memory and the map, and is recorded in History (revertable).`
      : `Run a ${warType} among ${scope} as a PREVIEW? Everyone reads it, but it will NOT change memory, the map, or history.`;
    if (!window.confirm(msg)) return;
    post("/war", { battleType: warType, scenario: warScenario.trim() }, "Couldn't start the war");
  };
  const grantExtra = (targetPlayerId: string, kingdom: string) => {
    if (!window.confirm(`Give ${kingdom} an extra "time bubble" round? They develop one more round at the current era; the other empires and the clock stay frozen.`)) return;
    post("/grant-extra", { targetPlayerId }, "Couldn't grant extra round");
  };
  const revertTo = (index: number, label: string) => {
    if (!window.confirm(`Revert the ENTIRE game back to "${label}"?\n\nEvery player's memory, the timeline, and the map roll back to that point, and every later turn is permanently discarded. This cannot be undone.`)) return;
    post("/revert", { index }, "Couldn't revert");
    setHistoryRefreshKey((k) => k + 1);
  };
  const advanceRound = () => {
    setGoalsInput("");
    setAnswerText("");
    post("/next-round", {}, "Couldn't advance");
  };

  // ---------- Create / Join screen ----------
  if (!seat) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Multiplayer</h1>
              <p className="text-sm text-muted-foreground">Host a session or join one with a 5-digit code.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 space-y-3">
              <h2 className="font-medium">Host a new session</h2>
              <div className="space-y-1">
                <Label>Turn length (years per turn)</Label>
                <Input type="number" min={1} value={turnInc} onChange={(e) => setTurnInc(parseInt(e.target.value) || 0)} data-testid="input-turn-increment" />
              </div>
              <div className="space-y-1">
                <Label>Starting year</Label>
                <div className="flex gap-2">
                  <Input type="number" min={0} value={yearAbs} onChange={(e) => setYearAbs(parseInt(e.target.value) || 0)} data-testid="input-start-year" />
                  <Button type="button" variant="outline" onClick={() => setEra(era === "BCE" ? "CE" : "BCE")} className="w-20">
                    {era}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">{formatYear(era === "BCE" ? -Math.abs(yearAbs) : Math.abs(yearAbs))}</p>
              </div>
              <Button className="w-full" onClick={create} disabled={creating} data-testid="button-create-session">
                {creating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Create Session
              </Button>
            </Card>
            <Card className="p-4 space-y-3">
              <h2 className="font-medium">Join with a code</h2>
              <div className="space-y-1">
                <Label>5-digit join code</Label>
                <Input
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  placeholder="00000"
                  inputMode="numeric"
                  className="font-mono text-lg tracking-[0.3em]"
                  data-testid="input-join-code"
                />
              </div>
              <Button className="w-full" onClick={join} disabled={joining || joinCode.length !== 5} data-testid="button-join-session">
                {joining ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Join Session
              </Button>
            </Card>
          </div>

          {/* Your games — one-click rejoin without re-entering a code */}
          {(mySessionsQuery.data?.sessions?.length ?? 0) > 0 && (
            <Card className="p-4 space-y-2">
              <h2 className="font-medium">Your games</h2>
              <div className="space-y-2">
                {mySessionsQuery.data!.sessions.map((s) => (
                  <div key={s.sessionId} className="flex items-center justify-between gap-3 rounded-md border border-border p-2" data-testid={`rejoin-${s.joinCode}`}>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {s.kingdomName || "Unnamed civilization"} {s.isHost && <span className="text-xs text-amber-500">· Host</span>}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        Code {s.joinCode} · {s.playerCount} {s.playerCount === 1 ? "player" : "players"} · {s.phase === "lobby" ? "in lobby" : `${formatYear(s.currentYear)} (turn ${s.turnNumber + 1})`}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => enterSeat(s.sessionId, s.playerId)} data-testid={`button-rejoin-${s.joinCode}`}>
                      Rejoin
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // ---------- Lobby ----------
  if (!data) {
    // Don't hang forever on the spinner: surface auth expiry / load errors with
    // a way out. The seat stays in sessionStorage, so logging back in and
    // returning to /multiplayer reconnects you to the same game.
    if (sessionQuery.isError) {
      const authExpired = isUnauthorizedError(sessionQuery.error as Error);
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-center p-6">
          <p className="text-sm text-muted-foreground max-w-sm">
            {authExpired
              ? "Your login expired. Log in again — you'll come right back to this game."
              : "Couldn't load the session. It may have ended, or the connection dropped."}
          </p>
          <div className="flex gap-2">
            {authExpired ? (
              <Button onClick={() => (window.location.href = "/api/login")} data-testid="button-relogin">Log in again</Button>
            ) : (
              <Button onClick={() => sessionQuery.refetch()} data-testid="button-retry">Retry</Button>
            )}
            <Button
              variant="outline"
              onClick={() => { sessionStorage.removeItem(SEAT_KEY); inited.current = false; setSeat(null); }}
              data-testid="button-back-to-start"
            >
              Back to start
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Loading session…
      </div>
    );
  }
  const { session, players } = data;

  // Persist an in-progress draft so a forced reload doesn't wipe it.
  const saveDraft = (kind: "goals" | "answer", val: string) => {
    if (!seat) return;
    try {
      localStorage.setItem(`mp_draft_${kind}_${seat.sessionId}_${seat.playerId}_${session.turnNumber}`, val);
    } catch {
      /* localStorage unavailable */
    }
  };

  // Host-controlled luck (random number). 0 = random per civ; 1-9 = fixed digit
  // (e.g. "Always 5"), so outcomes ride on answer quality. Editable mid-game.
  const luckControl = isHost ? (
    <div className="flex items-center gap-2 text-xs" data-testid="luck-control">
      <span className="text-muted-foreground">Luck (random number)</span>
      <select
        value={session.randomDigit}
        onChange={(e) => setLuck(parseInt(e.target.value))}
        className="bg-background border border-border rounded px-2 py-1 text-sm"
        data-testid="select-luck"
      >
        <option value={0}>Random</option>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <option key={d} value={d}>Always {d}</option>
        ))}
      </select>
    </div>
  ) : session.randomDigit >= 1 ? (
    <span className="text-xs text-muted-foreground">Luck: always {session.randomDigit} (set by host)</span>
  ) : null;

  // Host can grant a "time bubble" extra round to either empire at ANY point
  // (not just between turns) — hidden while a sim runs or a bonus round is active.
  const hostTools = isHost && session.phase !== "simulating" && !session.soloPlayerId ? (
    <div className="rounded-md border border-border p-2 space-y-2 text-xs">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground">Host — extra round:</span>
        {players.map((p) => (
          <Button key={p.id} variant="outline" size="sm" className="h-7" onClick={() => grantExtra(p.id, p.kingdomName || `Player ${p.slot}`)} disabled={busy} data-testid={`button-grant-extra-${p.slot}`}>
            + {p.kingdomName || `Player ${p.slot}`}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground">War:</span>
        <select value={warType} onChange={(e) => setWarType(e.target.value)} className="bg-background border border-border rounded px-2 py-1 text-sm" data-testid="select-war-type">
          <option>Trade War</option>
          <option>Limited War</option>
          <option>Extermination War</option>
        </select>
        <Button variant="outline" size="sm" className="h-7" onClick={startWar} disabled={busy} data-testid="button-war">
          <Swords className="w-3.5 h-3.5 mr-1" /> Simulate war
        </Button>
        <Button variant={session.addToCanon ? "default" : "outline"} size="sm" className="h-7" onClick={() => setCanon(!session.addToCanon)} disabled={busy} data-testid="button-toggle-canon">
          {session.addToCanon ? "Add to canon: ON" : "Preview only (off)"}
        </Button>
      </div>
      <Textarea
        value={warScenario}
        onChange={(e) => setWarScenario(e.target.value)}
        placeholder="Optional war scenario & alliances (e.g. 'Rome and Carthage ally against Egypt; the others stay neutral'). Leave blank for a free-for-all among all civilizations."
        className="min-h-[56px] text-xs"
        data-testid="textarea-war-scenario"
      />
    </div>
  ) : null;

  // ---------- In-game (round) view ----------
  if (session.phase !== "lobby") {
    const bothReady = players.length >= 2 && players.every((p) => p.ready);
    const others = players.filter((p) => p.id !== me?.id);
    const waitingOn = others.filter((p) => !p.ready).length;
    const myGoals = (me?.goals || "").trim();
    const myQuestions = parseArr(me?.questions);
    // Each player advances independently: goals -> questions -> answered. Only
    // the shared simulation (and its results) is a global, synchronized step.
    // A host-granted "time bubble": only the solo player acts; the other waits.
    const soloId = session.soloPlayerId;
    const iAmSolo = !!soloId && soloId === me?.id;
    const soloKingdom = soloId ? players.find((p) => p.id === soloId)?.kingdomName || "The other player" : "";
    const step =
      session.phase === "results" ? "results"
      : session.phase === "simulating" ? "simulating"
      : soloId && !iAmSolo ? "solo-waiting"
      : !myGoals ? "goals"
      : !me?.ready ? "questions"
      : "waiting";
    const STEP_LABELS = ["Goals", "Questions", "Simulation", "Results"];
    const stepIdx = step === "goals" ? 0 : step === "questions" ? 1 : step === "results" ? 3 : 2;
    return (
      <div className="min-h-screen bg-background text-foreground p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Turn {session.turnNumber + 1} · {formatYear(session.currentYear)}</h1>
                <p className="text-sm text-muted-foreground">{session.turnIncrement} years per turn · {me?.kingdomName || "your civilization"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setMemoryOpen((o) => !o)} data-testid="button-toggle-memory">
                <ScrollText className="w-4 h-4 mr-1" /> {memoryOpen ? "Hide memory" : "Memory"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setHistoryOpen((o) => !o)} data-testid="button-toggle-history">
                <History className="w-4 h-4 mr-1" /> {historyOpen ? "Hide history" : "History"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setMapOpen((o) => !o)} data-testid="button-toggle-map">
                <Map className="w-4 h-4 mr-1" /> {mapOpen ? "Hide map" : "Map"}
              </Button>
              <Button variant="outline" size="sm" onClick={leave}><LogOut className="w-4 h-4 mr-1" /> Leave</Button>
            </div>
          </div>

          {/* Your progress this turn */}
          <div className="flex items-center gap-1 text-xs flex-wrap">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex items-center gap-1">
                <span className={`px-2 py-0.5 rounded-full ${i === stepIdx ? "bg-primary text-primary-foreground font-medium" : i < stepIdx ? "bg-muted text-foreground" : "text-muted-foreground"}`}>{label}</span>
                {i < STEP_LABELS.length - 1 && <span className="text-muted-foreground">→</span>}
              </div>
            ))}
          </div>

          {luckControl && <div>{luckControl}</div>}
          {hostTools}

          {/* Collapsible shared map — hidden by default, like singleplayer */}
          {mapOpen && (
            <div className="rounded-lg border border-border overflow-hidden h-[420px]">
              <WorldMapPanel
                stateBuilder={(grid) => replayMapLog(grid, session.mapLog, session.mapSeed)}
                rebuildKey={session.mapLog}
              />
            </div>
          )}

          {/* Your civilization's memory (running summary) — visible + editable */}
          {memoryOpen && (
            <Card className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <ScrollText className="w-4 h-4 text-muted-foreground" /> {me?.kingdomName || "Your civilization"} — memory
                </span>
                {!editingMemory && (
                  <Button size="sm" variant="ghost" onClick={startEditMemory} disabled={!me} data-testid="button-edit-memory">Edit</Button>
                )}
              </div>
              {editingMemory ? (
                <>
                  <Textarea
                    value={memoryDraft}
                    onChange={(e) => setMemoryDraft(e.target.value)}
                    className="min-h-[220px] text-sm"
                    data-testid="textarea-edit-memory"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveMemory} disabled={savingMemory} data-testid="button-save-memory">
                      {savingMemory ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null} Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingMemory(false)}>Cancel</Button>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Edits to your memory feed into the next simulation — fix anything wrong before you run the turn.</p>
                </>
              ) : me?.summary ? (
                <div className="max-h-[280px] overflow-y-auto">
                  <RichText text={me.summary} testId="text-memory" />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Your civilization's history appears here after your first turn — what you've researched, your cities, population, and standing.</p>
              )}
            </Card>
          )}

          {/* Full game transcript — all civilizations, every past turn */}
          {historyOpen && (
            <Card className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <History className="w-4 h-4 text-muted-foreground" /> Game history
                </span>
                <Button size="sm" variant="ghost" onClick={() => setHistoryRefreshKey((k) => k + 1)} disabled={historyLoading} data-testid="button-refresh-history">
                  {historyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
                </Button>
              </div>
              {historyError ? (
                <p className="text-sm text-destructive">Couldn't load history: {historyError}</p>
              ) : historyLoading && historyData.length === 0 ? (
                <p className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading…</p>
              ) : historyData.length === 0 ? (
                <p className="text-sm text-muted-foreground">No completed turns recorded yet. Each turn's goals, questions, answers, and the shared simulation will appear here (for turns played after this update).</p>
              ) : (
                historyData.map((t: any, i: number) => ({ t, i })).reverse().map(({ t, i }: any) => (
                  <div key={i} className="border border-border rounded-md p-3 space-y-3" data-testid={`history-turn-${t.turn}`}>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.type === "war" ? "War" : `Turn ${t.turn}`} · {t.yearLabel}</p>
                      {isHost && (
                        <Button size="sm" variant="ghost" className="h-6 text-xs" onClick={() => revertTo(i, t.yearLabel || `Turn ${t.turn}`)} disabled={busy} data-testid={`button-revert-${i}`}>
                          Revert to here
                        </Button>
                      )}
                    </div>
                    {(t.players || []).map((pl: any) => (
                      <div key={pl.slot} className="text-sm space-y-0.5">
                        <p className="font-medium">{pl.kingdom} <span className="text-xs text-muted-foreground">· {pl.leader}</span></p>
                        {pl.goals && <p><span className="text-muted-foreground">Goals:</span> {pl.goals}</p>}
                        {(pl.questions || []).map((q: string, i: number) => (
                          <p key={i} className="text-xs"><span className="text-muted-foreground">Q{i + 1}:</span> {q}</p>
                        ))}
                        {pl.answer && <p className="text-xs"><span className="text-muted-foreground">Answer:</span> {pl.answer}</p>}
                      </div>
                    ))}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Shared simulation</p>
                      <RichText text={t.simulation || ""} />
                    </div>
                  </div>
                ))
              )}
            </Card>
          )}

          {/* Every player's progress (wraps for larger lobbies) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {players.map((p) => {
              const pg = (p.goals || "").trim();
              const mine = p.id === me?.id;
              return (
                <div key={p.id} className={`rounded-md border p-2 text-sm ${mine ? "border-primary" : "border-border"}`}>
                  <div className="font-medium truncate">{p.kingdomName || `Player ${p.slot}`}{mine && <span className="text-xs text-primary"> · You</span>}</div>
                  <div className="text-xs text-muted-foreground truncate">{p.playerName || "—"} · {p.location || "—"}</div>
                  <div className="text-xs mt-1">{p.ready ? <span className="text-green-500">ready</span> : <span className="text-muted-foreground">{!pg ? "deciding goals…" : "answering…"}</span>}</div>
                </div>
              );
            })}
          </div>

          {/* Turn content — single column, like singleplayer */}
          <Card className="p-4 space-y-3">
              {/* Your submitted goals stay pinned here (compact, always visible)
                  so you can refer back to them while answering questions. */}
              {(step === "questions" || step === "waiting") && myGoals && (
                <div className="rounded-md border border-border bg-muted/40 px-3 py-2 flex items-start gap-2" data-testid="goals-bar">
                  <span className="text-xs font-medium text-muted-foreground shrink-0 mt-0.5 flex items-center gap-1">
                    <ScrollText className="w-3.5 h-3.5" /> Your goals
                  </span>
                  <span className="text-sm whitespace-pre-wrap max-h-28 overflow-y-auto flex-1">{myGoals}</span>
                </div>
              )}
              {/* While waiting, keep your submitted answer visible too — so you can
                  review what you sent before deciding to edit it. */}
              {step === "waiting" && (me?.answers || "").trim() && me?.answers !== "[]" && (
                <div className="rounded-md border border-border bg-muted/40 px-3 py-2 flex items-start gap-2" data-testid="answer-bar">
                  <span className="text-xs font-medium text-muted-foreground shrink-0 mt-0.5">Your answer</span>
                  <span className="text-sm whitespace-pre-wrap max-h-28 overflow-y-auto flex-1">{me!.answers}</span>
                </div>
              )}

              {step === "goals" && (
                <>
                  <Label>Your goals for this turn</Label>
                  <Textarea
                    value={goalsInput}
                    onChange={(e) => { setGoalsInput(e.target.value); saveDraft("goals", e.target.value); }}
                    placeholder={`What does ${me?.kingdomName || "your civilization"} attempt over the next ${session.turnIncrement} years?`}
                    className="min-h-[140px]"
                    data-testid="textarea-goals"
                  />
                  <Button className="w-full" onClick={submitGoals} disabled={busy} data-testid="button-submit-goals">
                    {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null} Submit goals
                  </Button>
                </>
              )}

              {step === "questions" && (
                myQuestions.length === 0 ? (
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Preparing your strategy questions…
                  </p>
                ) : (
                  <>
                    <Label>Consider these as you decide your approach</Label>
                    <div className="rounded-md border border-border bg-muted/30 p-3 space-y-1">
                      {myQuestions.map((q, i) => (
                        <p key={i} className="text-sm">{i + 1}. {q}</p>
                      ))}
                    </div>
                    <Textarea
                      value={answerText}
                      onChange={(e) => { setAnswerText(e.target.value); saveDraft("answer", e.target.value); }}
                      placeholder="Answer in your own words — how does your civilization approach this turn?"
                      className="min-h-[140px]"
                      data-testid="textarea-answer"
                    />
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => stepBack("goals")} disabled={busy} data-testid="button-back-to-goals">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Edit goals
                      </Button>
                      <Button className="flex-1" onClick={submitAnswers} disabled={busy} data-testid="button-submit-answers">
                        {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null} Submit answer
                      </Button>
                    </div>
                  </>
                )
              )}

              {step === "waiting" && (
                <div className="text-center py-4 space-y-2">
                  {iAmSolo ? (
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Starting your bonus round…
                    </p>
                  ) : bothReady ? (
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Starting the shared simulation…
                    </p>
                  ) : (
                    <>
                      <p className="text-sm">You're ready. Waiting on {waitingOn} other {waitingOn === 1 ? "player" : "players"} to finish…</p>
                      <p className="text-xs text-muted-foreground">The simulation runs automatically once everyone is done. You can still go back and change your mind.</p>
                      <div className="flex gap-2 justify-center pt-1">
                        {myQuestions.length > 0 && (
                          <Button variant="outline" size="sm" onClick={() => stepBack("questions")} disabled={busy} data-testid="button-back-to-questions">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Edit my answer
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => stepBack("goals")} disabled={busy} data-testid="button-back-to-goals-waiting">
                          <ArrowLeft className="w-4 h-4 mr-1" /> Edit goals
                        </Button>
                      </div>
                      {isHost && (
                        <div className="pt-2 space-y-1">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => runWithoutWaiting(others.filter((p) => !p.ready).map((p) => p.kingdomName || `Player ${p.slot}`))}
                            disabled={busy}
                            data-testid="button-run-without-waiting"
                          >
                            {busy ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Play className="w-4 h-4 mr-1" />} Start without waiting
                          </Button>
                          <p className="text-[11px] text-muted-foreground">Host only — anyone still deciding is skipped; their civilization carries on as before this turn.</p>
                        </div>
                      )}
                    </>
                  )}
                  {bothReady && !iAmSolo && (
                    <Button variant="outline" size="sm" onClick={runRound} disabled={busy} data-testid="button-run-round">
                      {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Swords className="w-4 h-4 mr-2" />} Run now
                    </Button>
                  )}
                </div>
              )}

              {step === "solo-waiting" && (
                <div className="text-center py-4 space-y-1">
                  <p className="text-sm">{soloKingdom} is taking an extra development round — a time bubble.</p>
                  <p className="text-xs text-muted-foreground">The world is paused for everyone else until it resolves. Your civilization is untouched.</p>
                </div>
              )}

              {step === "simulating" && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {session.lastSimulation ? "Simulating the shared outcome…" : "Starting the simulation…"}
                  </div>
                  {session.lastSimulation && (
                    <div ref={simStreamRef} className="rounded-md border border-border p-3 max-h-[320px] overflow-y-auto">
                      <RichText text={session.lastSimulation} />
                      <span className="inline-block w-1.5 h-4 bg-foreground/70 animate-pulse" />
                    </div>
                  )}
                </div>
              )}

              {step === "results" && (
                <div className="space-y-3">
                  <div className="rounded-md border border-border p-3 max-h-[340px] overflow-y-auto">
                    <p className="text-xs font-medium text-muted-foreground mb-1">This turn</p>
                    <RichText text={session.lastSimulation || "(no simulation)"} />
                  </div>
                  {me?.summary && (
                    <div className="rounded-md border border-border p-3 max-h-[200px] overflow-y-auto">
                      <p className="text-xs font-medium text-muted-foreground mb-1">{me.kingdomName} — your summary</p>
                      <RichText text={me.summary} />
                    </div>
                  )}
                  {isHost ? (
                    <div className="space-y-2">
                      <Button className="w-full" onClick={advanceRound} disabled={busy} data-testid="button-next-round">
                        {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null} Next turn
                      </Button>
                      <Button className="w-full" variant="outline" onClick={rerunTurn} disabled={busy} data-testid="button-rerun">
                        {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null} Re-run this turn
                      </Button>
                      <p className="text-[11px] text-muted-foreground text-center">Re-run keeps every player's goals and answers but generates a fresh simulation (e.g. if it came out wrong). Edit your memory above first to steer it. (War & extra-round controls are at the top.)</p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center">Waiting for the host to start the next turn…</p>
                  )}
                </div>
              )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Session Lobby</h1>
              <p className="text-sm text-muted-foreground">{isHost ? "You are the host." : "You joined this session."}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={leave} data-testid="button-leave">
            <LogOut className="w-4 h-4 mr-1" /> Leave
          </Button>
        </div>

        {/* Join code */}
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Share this code</p>
            <p className="text-3xl font-mono tracking-[0.3em]" data-testid="text-join-code">{session.joinCode}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(session.joinCode);
              toast({ title: "Copied" });
            }}
          >
            <Copy className="w-4 h-4 mr-1" /> Copy
          </Button>
        </Card>

        {/* Host-locked settings */}
        <Card className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-medium">Game settings</h2>
            <span className="text-xs text-muted-foreground">{isHost ? "(host controls)" : "(set by host)"}</span>
          </div>
          {isHost ? (
            <div className="flex flex-wrap items-end gap-3">
              <div className="space-y-1">
                <Label>Years per turn</Label>
                <Input type="number" min={1} className="w-28" value={hostInc} onChange={(e) => setHostInc(parseInt(e.target.value) || 0)} data-testid="input-host-turn" />
              </div>
              <div className="space-y-1">
                <Label>Current year</Label>
                <div className="flex gap-2">
                  <Input type="number" min={0} className="w-28" value={hostYearAbs} onChange={(e) => setHostYearAbs(parseInt(e.target.value) || 0)} data-testid="input-host-year" />
                  <Button type="button" variant="outline" onClick={() => setHostEra(hostEra === "BCE" ? "CE" : "BCE")} className="w-20">
                    {hostEra}
                  </Button>
                </div>
              </div>
              <Button onClick={saveHostSettings} data-testid="button-save-settings">Save</Button>
            </div>
          ) : (
            <div className="flex gap-8 text-sm">
              <div>
                <p className="text-muted-foreground">Years per turn</p>
                <p className="font-medium" data-testid="text-turn-increment">{session.turnIncrement}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Current year</p>
                <p className="font-medium" data-testid="text-current-year">{formatYear(session.currentYear)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Turn</p>
                <p className="font-medium">{session.turnNumber + 1}</p>
              </div>
            </div>
          )}
          {luckControl && <div className="pt-1 border-t border-border">{luckControl}</div>}
        </Card>

        {/* Host-editable shared world rules (the simulation prompt) */}
        {isHost && (
          <Card className="p-4 space-y-3">
            <button type="button" onClick={toggleWorldPrompt} className="flex items-center justify-between w-full" data-testid="button-toggle-world-prompt">
              <span className="font-medium flex items-center gap-2"><Lock className="w-4 h-4 text-muted-foreground" /> Shared world rules (advanced)</span>
              <span className="text-xs text-muted-foreground">{worldPromptOpen ? "Hide" : "Edit"}</span>
            </button>
            {worldPromptOpen && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  The rules that govern the shared simulation — reused from singleplayer (strict realism, the
                  optimistic/pessimistic evaluation against the random number, scope discipline, output format). Edit to taste,
                  or leave as the default. Per-player Optimistic Mode, altruism, question mode and custom prompts come from each
                  player's create-civilization settings.
                </p>
                <Textarea
                  value={worldPrompt}
                  onChange={(e) => { setWorldPrompt(e.target.value); setWorldPromptDirty(true); }}
                  className="min-h-[260px] font-mono text-xs"
                  data-testid="textarea-world-prompt"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={saveWorldPrompt} disabled={savingPrompt || !worldPromptDirty} data-testid="button-save-world-prompt">
                    {savingPrompt ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null} Save rules
                  </Button>
                  <Button size="sm" variant="outline" onClick={resetWorldPrompt} disabled={savingPrompt} data-testid="button-reset-world-prompt">
                    Reset to default
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Players (up to MAX_PLAYERS) */}
        <div className="grid md:grid-cols-2 gap-4">
          {players.map((p) => {
            const mine = me && p.id === me.id;
            return (
              <Card key={p.id} className={`p-4 space-y-3 ${mine ? "border-primary" : ""}`} data-testid={`player-card-${p.slot}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">
                    Player {p.slot} {p.id === session.hostPlayerId && <span className="text-xs text-amber-500">· Host</span>} {mine && <span className="text-xs text-primary">· You</span>}
                  </h3>
                  {p.ready ? (
                    <span className="text-xs text-green-500 flex items-center gap-1"><Check className="w-3 h-3" /> Ready</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Not ready</span>
                  )}
                </div>
                {mine ? (
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Your name</Label>
                      <Input value={myName} onChange={(e) => setMyName(e.target.value)} onBlur={() => saveMine({ playerName: myName })} data-testid="input-my-name" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Kingdom name</Label>
                      <Input value={myKingdom} onChange={(e) => setMyKingdom(e.target.value)} onBlur={() => saveMine({ kingdomName: myKingdom })} data-testid="input-my-kingdom" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Location</Label>
                      <Input value={myLoc} onChange={(e) => setMyLoc(e.target.value)} onBlur={() => saveMine({ location: myLoc })} placeholder="e.g. Nile Delta" data-testid="input-my-location" />
                    </div>
                    <Button
                      className="w-full"
                      variant={p.ready ? "outline" : "default"}
                      onClick={() => saveMine({ playerName: myName, kingdomName: myKingdom, location: myLoc, ready: !p.ready })}
                      data-testid="button-ready"
                    >
                      {p.ready ? "Cancel ready" : "I'm ready"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Leader:</span> {p.playerName || "—"}</p>
                    <p><span className="text-muted-foreground">Kingdom:</span> {p.kingdomName || "—"}</p>
                    <p><span className="text-muted-foreground">Location:</span> {p.location || "—"}</p>
                  </div>
                )}
              </Card>
            );
          })}
          {players.length < MAX_PLAYERS && (
            <Card className="p-4 border-dashed text-muted-foreground flex items-center justify-center text-center text-sm min-h-[160px]">
              Waiting for players… share the code above to invite more. ({players.length}/{MAX_PLAYERS})
            </Card>
          )}
        </div>

        {isHost && (
          <Button
            className="w-full"
            onClick={startGame}
            disabled={busy || players.length < 2}
            data-testid="button-start-game"
          >
            {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
            {players.length < 2 ? "Waiting for a second player…" : `Start Game (${players.length} ${players.length === 1 ? "player" : "players"})`}
          </Button>
        )}
        <p className="text-xs text-muted-foreground text-center">
          Each player sets their own leader, kingdom and location. The host controls the shared timeline and starts the game. Up to {MAX_PLAYERS} can join.
        </p>
      </div>
    </div>
  );
}
