import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Loader2, Swords, ChevronDown, ChevronUp, Settings, Users, Copy } from "lucide-react";
import { Link } from "wouter";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const civilizationSchema = z.object({
  userName: z.string().min(1, "Your name is required").max(100),
  name: z.string().min(1, "Civilization name is required").max(100),
  location: z.string().min(1, "Starting location is required").max(200),
  startingCentury: z.number().min(-10000).max(2000),
  timescale: z.string(),
  customTimescale: z.string().optional(),
  randomNumberEval: z.string(),
  // Must be declared here: zodResolver strips unknown keys on submit, so a
  // missing field silently never reaches the server
  customRandomNumber: z.string().optional(),
  goalQuestions: z.string(),
  enemyCivilization: z.string(),
  catastropheTimer: z.string(),
  altruismStats: z.boolean(),
  optimisticMode: z.boolean(),
  simulatorModel: z.string().optional(),
});

type CivilizationFormData = z.infer<typeof civilizationSchema>;

export default function CreateCivilization() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [showCustomTimescale, setShowCustomTimescale] = useState(false);

  // Competitive mode state
  const [competitiveMode, setCompetitiveMode] = useState(false);
  const [competitiveGameMode, setCompetitiveGameMode] = useState<"human_vs_ai" | "ai_vs_ai" | "human_vs_human">("human_vs_human");
  // Online (human-vs-human) lobby state
  const [lobbyCode, setLobbyCode] = useState<string | null>(null);
  const [lobbyCreating, setLobbyCreating] = useState(false);
  const [lobbyJoining, setLobbyJoining] = useState(false);
  const [joinCodeInput, setJoinCodeInput] = useState("");
  const [competitiveTotalTurns, setCompetitiveTotalTurns] = useState(10);
  const [competitiveAutoPlay, setCompetitiveAutoPlay] = useState(false);
  const [opponentName, setOpponentName] = useState("");
  const [opponentCivName, setOpponentCivName] = useState("");
  const [opponentLocation, setOpponentLocation] = useState("");

  // Advanced settings state
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [playerACustomPrompt, setPlayerACustomPrompt] = useState("");
  const [playerBCustomPrompt, setPlayerBCustomPrompt] = useState("");
  const [maxSimulationTokens, setMaxSimulationTokens] = useState(20000);
  const [maxGoalTokens, setMaxGoalTokens] = useState(1024);
  const [playerATurnsPerRound, setPlayerATurnsPerRound] = useState(1);
  const [playerBTurnsPerRound, setPlayerBTurnsPerRound] = useState(1);

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

  const form = useForm<CivilizationFormData>({
    resolver: zodResolver(civilizationSchema),
    defaultValues: {
      userName: "",
      name: "",
      location: "",
      startingCentury: 0,
      timescale: "100 years",
      customTimescale: "",
      randomNumberEval: "custom",
      customRandomNumber: "5",
      goalQuestions: "one",
      enemyCivilization: "no",
      catastropheTimer: "none",
      altruismStats: false,
      optimisticMode: false,
      simulatorModel: "sonnet",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: CivilizationFormData) => {
      const payload = {
        ...data,
        currentCentury: data.startingCentury,
        // Include advanced settings
        playerACustomPrompt: playerACustomPrompt || undefined,
        playerBCustomPrompt: playerBCustomPrompt || undefined,
        maxSimulationTokens,
        maxGoalTokens,
        playerATurnsPerRound,
        playerBTurnsPerRound,
      };
      const result = await apiRequest("POST", "/api/civilizations", payload);
      const civilization = await result.json();

      // If competitive mode is enabled, start it immediately
      if (competitiveMode) {
        await apiRequest("POST", `/api/civilizations/${civilization.id}/competitive/start`, {
          mode: competitiveGameMode,
          totalTurns: competitiveTotalTurns,
          autoPlay: competitiveGameMode === "ai_vs_ai" ? competitiveAutoPlay : false,
          playerBName: opponentName || undefined,
          playerBCivilizationName: opponentCivName || undefined,
          playerBLocation: opponentLocation || undefined,
        });
      }

      return { civilization, isCompetitive: competitiveMode };
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/civilizations"] });
      toast({
        title: "Civilization Created",
        description: data.isCompetitive
          ? "Your competitive game begins now!"
          : "Your journey through time begins now!",
      });
      // Redirect to competitive page if competitive mode, otherwise regular simulation
      if (data.isCompetitive) {
        setLocation(`/civilization/${data.civilization.id}/competitive`);
      } else {
        setLocation(`/civilization/${data.civilization.id}`);
      }
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
        description: "Failed to create civilization. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CivilizationFormData) => {
    createMutation.mutate(data);
  };

  // ---- Online (human-vs-human) lobby ----
  const parseTurnIncrement = (): number => {
    const ts = form.getValues("timescale");
    if (ts === "custom") return Math.max(1, parseInt(form.getValues("customTimescale") || "") || 100);
    const n = parseInt(ts); // "100 years" -> 100
    return Number.isFinite(n) && n > 0 ? n : 100;
  };

  // The player's seat fields seeded from the create-civilization form — personal
  // details plus the simulation settings, so multiplayer honors them like singleplayer.
  const mpSeatFromForm = () => ({
    playerName: form.getValues("userName"),
    kingdomName: form.getValues("name"),
    location: form.getValues("location"),
    optimisticMode: form.getValues("optimisticMode"),
    altruismStats: form.getValues("altruismStats"),
    goalQuestions: form.getValues("goalQuestions"),
    customPrompt: playerACustomPrompt || undefined,
  });

  const createLobby = async () => {
    setLobbyCreating(true);
    try {
      const res = await apiRequest("POST", "/api/sessions", {
        turnIncrement: parseTurnIncrement(),
        currentYear: form.getValues("startingCentury"),
      });
      const { session, playerId } = await res.json();
      // Seed the host's seat from what they already filled in above, including
      // the per-player simulation settings (mirrors singleplayer).
      await apiRequest("PATCH", `/api/sessions/${session.id}/player`, { playerId, ...mpSeatFromForm() });
      sessionStorage.setItem("mp_seat", JSON.stringify({ sessionId: session.id, playerId }));
      setLobbyCode(session.joinCode);
    } catch (e: any) {
      if (isUnauthorizedError(e)) {
        setTimeout(() => (window.location.href = "/api/login"), 500);
        return;
      }
      toast({ title: "Couldn't create lobby", description: e.message, variant: "destructive" });
    } finally {
      setLobbyCreating(false);
    }
  };

  const joinLobby = async () => {
    if (!/^\d{5}$/.test(joinCodeInput)) {
      toast({ title: "Enter a 5-digit code", variant: "destructive" });
      return;
    }
    setLobbyJoining(true);
    try {
      const res = await apiRequest("POST", "/api/sessions/join", { code: joinCodeInput });
      const { session, playerId } = await res.json();
      // Seed the joiner's seat (incl. their sim settings), same as the host. The
      // shared timeline (year/turn) is host-controlled, so it isn't sent here.
      await apiRequest("PATCH", `/api/sessions/${session.id}/player`, { playerId, ...mpSeatFromForm() });
      sessionStorage.setItem("mp_seat", JSON.stringify({ sessionId: session.id, playerId }));
      setLocation("/multiplayer");
    } catch (e: any) {
      if (isUnauthorizedError(e)) {
        setTimeout(() => (window.location.href = "/api/login"), 500);
        return;
      }
      toast({ title: "Couldn't join lobby", description: e.message, variant: "destructive" });
    } finally {
      setLobbyJoining(false);
    }
  };

  const timescale = form.watch("timescale");

  useEffect(() => {
    setShowCustomTimescale(timescale === "custom");
  }, [timescale]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const centuries = [];
  for (let i = 2000; i >= -10000; i -= 100) {
    centuries.push(i);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold">Create New Civilization</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose your starting location and time period. Configure the parameters of your civilization's journey through history.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Required Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Essential Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Name</Label>
                    <Input
                      id="userName"
                      placeholder="Your name"
                      {...form.register("userName")}
                      data-testid="input-user-name"
                    />
                    {form.formState.errors.userName && (
                      <p className="text-sm text-destructive">{form.formState.errors.userName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Civilization Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Kingdom of Mesopotamia"
                      {...form.register("name")}
                      data-testid="input-civilization-name"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Starting Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Mesopotamia, Nile Valley, Indus River..."
                    {...form.register("location")}
                    data-testid="input-location"
                  />
                  {form.formState.errors.location && (
                    <p className="text-sm text-destructive">{form.formState.errors.location.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startingCentury">Starting Century</Label>
                    <Select
                      value={form.watch("startingCentury").toString()}
                      onValueChange={(value) => form.setValue("startingCentury", parseInt(value))}
                    >
                      <SelectTrigger id="startingCentury" data-testid="select-starting-century">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {centuries.map((century) => (
                          <SelectItem key={century} value={century.toString()}>
                            {century < 0 ? `${Math.abs(century)} BCE` : `${century} CE`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timescale">Timescale</Label>
                    <Select
                      value={form.watch("timescale")}
                      onValueChange={(value) => form.setValue("timescale", value)}
                    >
                      <SelectTrigger id="timescale" data-testid="select-timescale">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 day">1 day</SelectItem>
                        <SelectItem value="1 week">1 week</SelectItem>
                        <SelectItem value="1 month">1 month</SelectItem>
                        <SelectItem value="1 year">1 year</SelectItem>
                        <SelectItem value="10 years">10 years</SelectItem>
                        <SelectItem value="100 years">100 years (default)</SelectItem>
                        <SelectItem value="1000 years">1000 years</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {showCustomTimescale && (
                  <div className="space-y-2">
                    <Label htmlFor="customTimescale">Custom Timescale</Label>
                    <Input
                      id="customTimescale"
                      placeholder="e.g., 50 years, 2 decades..."
                      {...form.register("customTimescale")}
                      data-testid="input-custom-timescale"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Optional Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Optional Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="randomNumberEval">Random Number Evaluation</Label>
                    <Select
                      value={form.watch("randomNumberEval")}
                      onValueChange={(value) => form.setValue("randomNumberEval", value)}
                    >
                      <SelectTrigger id="randomNumberEval" data-testid="select-random-eval">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="+2">Always +2</SelectItem>
                        <SelectItem value="+1">Always +1</SelectItem>
                        <SelectItem value="random">Default</SelectItem>
                        <SelectItem value="-1">Always -1</SelectItem>
                        <SelectItem value="custom">Always # (1-9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {form.watch("randomNumberEval") === "custom" && (
                    <div className="space-y-2">
                      <Label htmlFor="customRandomNumber">Custom Number (1-9)</Label>
                      <Select
                        value={form.watch("customRandomNumber") || "5"}
                        onValueChange={(value) => form.setValue("customRandomNumber", value)}
                      >
                        <SelectTrigger id="customRandomNumber">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="goalQuestions">Goal Questions</Label>
                    <Select
                      value={form.watch("goalQuestions")}
                      onValueChange={(value) => form.setValue("goalQuestions", value)}
                    >
                      <SelectTrigger id="goalQuestions" data-testid="select-goal-questions">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="one">One</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="enemyCivilization">Enemy Civilization</Label>
                    <Select
                      value={form.watch("enemyCivilization")}
                      onValueChange={(value) => form.setValue("enemyCivilization", value)}
                    >
                      <SelectTrigger id="enemyCivilization" data-testid="select-enemy-civilization">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Only takes effect when a catastrophe triggers — set a Catastrophe Timer to use this.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="catastropheTimer">Catastrophe Timer</Label>
                    <Select
                      value={form.watch("catastropheTimer")}
                      onValueChange={(value) => form.setValue("catastropheTimer", value)}
                    >
                      <SelectTrigger id="catastropheTimer" data-testid="select-catastrophe-timer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="4 centuries">4 centuries</SelectItem>
                        <SelectItem value="5 centuries">5 centuries</SelectItem>
                        <SelectItem value="random 1/4th">Random 1/4th chance</SelectItem>
                        <SelectItem value="random 1/5th">Random 1/5th chance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="simulatorModel">Simulator Model</Label>
                    <Select
                      value={form.watch("simulatorModel") || "sonnet"}
                      onValueChange={(value) => form.setValue("simulatorModel", value)}
                    >
                      <SelectTrigger id="simulatorModel" data-testid="select-simulator-model">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="haiku">Haiku 4.5 (Fast)</SelectItem>
                        <SelectItem value="sonnet">Sonnet 4.5 (Default)</SelectItem>
                        <SelectItem value="opus">Opus 5.5 (Advanced)</SelectItem>
                        <SelectItem value="gpt-4.1">GPT-4.1 (OpenAI)</SelectItem>
                        <SelectItem value="gpt-4.1-mini">GPT-4.1 Mini (OpenAI)</SelectItem>
                        <SelectItem value="gpt-5.2">GPT-5.2 (OpenAI)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="altruism-stats"
                  checked={form.watch("altruismStats")}
                  onCheckedChange={(checked) => form.setValue("altruismStats", checked === true)}
                />
                <Label htmlFor="altruism-stats" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Altruism Stats (Track lives saved and lost)
                </Label>
              </div>
            </div>

            {/* Optimistic Mode Checkbox */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="optimistic-mode"
                  checked={form.watch("optimisticMode") ?? false}
                  onCheckedChange={(checked) => form.setValue("optimisticMode", checked === true)}
                />
                <Label htmlFor="optimistic-mode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Optimistic Mode
                </Label>
              </div>
              {form.watch("optimisticMode") && (
                <p className="text-sm text-muted-foreground">
                  The simulation will be charitable and kind: pessimistic chances are capped at 30%, and setbacks become minor (often humorous) delays with opportunities for learning instead of deaths, famines, or collapses. Your character is almost supernaturally capable, with luck on their side.
                </p>
              )}
            </div>

            {/* Advanced Settings */}
            <Collapsible open={showAdvancedSettings} onOpenChange={setShowAdvancedSettings}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        <CardTitle>Advanced Settings</CardTitle>
                      </div>
                      {showAdvancedSettings ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Custom prompts and token limits
                    </p>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-6">
                    {/* Token Limits */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Token Limits</h4>

                      <div className="space-y-2">
                        <Label>Simulation Max Tokens: {maxSimulationTokens.toLocaleString()}</Label>
                        <Slider
                          value={[maxSimulationTokens]}
                          onValueChange={(value) => setMaxSimulationTokens(value[0])}
                          min={2000}
                          max={30000}
                          step={1000}
                          className="w-full"
                        />
                        <p className="text-xs text-muted-foreground">
                          Maximum tokens for simulation responses. Higher values allow longer, more detailed simulations.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Goal Max Tokens: {maxGoalTokens.toLocaleString()}</Label>
                        <Slider
                          value={[maxGoalTokens]}
                          onValueChange={(value) => setMaxGoalTokens(value[0])}
                          min={256}
                          max={4096}
                          step={128}
                          className="w-full"
                        />
                        <p className="text-xs text-muted-foreground">
                          Maximum tokens for AI-generated goals in competitive mode.
                        </p>
                      </div>
                    </div>

                    {/* Custom System Prompt for Player A */}
                    <div className="space-y-4 border-t pt-4">
                      <h4 className="font-medium text-sm">Custom System Prompt (Player A)</h4>
                      <p className="text-xs text-muted-foreground">
                        Replace the default system prompt with a custom one. Leave empty to use the default prompt.
                      </p>
                      <Textarea
                        placeholder="Enter custom system prompt... (leave empty for default)"
                        value={playerACustomPrompt}
                        onChange={(e) => setPlayerACustomPrompt(e.target.value)}
                        className="min-h-[150px] font-mono text-xs"
                      />
                      <p className="text-xs text-muted-foreground">
                        {playerACustomPrompt ? `${playerACustomPrompt.length} characters` : "Using default prompt"}
                      </p>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Competitive Mode */}
            <Card className={competitiveMode ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Swords className="w-5 h-5" />
                    <CardTitle>Competitive Mode</CardTitle>
                  </div>
                  <Switch
                    checked={competitiveMode}
                    onCheckedChange={setCompetitiveMode}
                    data-testid="switch-competitive-mode"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Start a two-player competitive game — live against a friend, or against an AI opponent
                </p>
              </CardHeader>
              {competitiveMode && (
                <CardContent className="space-y-6">
                  {/* Game Mode */}
                  <div className="space-y-2">
                    <Label>Game Mode</Label>
                    <Select
                      value={competitiveGameMode}
                      onValueChange={(value: "human_vs_ai" | "ai_vs_ai" | "human_vs_human") => setCompetitiveGameMode(value)}
                    >
                      <SelectTrigger data-testid="select-competitive-mode">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="human_vs_human">Human vs Human - Play live against a friend (online)</SelectItem>
                        <SelectItem value="human_vs_ai">Human vs AI - You control one civilization</SelectItem>
                        <SelectItem value="ai_vs_ai">AI vs AI - Watch two AIs compete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Online lobby (Human vs Human) */}
                  {competitiveGameMode === "human_vs_human" && (
                    <div className="space-y-4 border-t pt-4">
                      {!lobbyCode ? (
                        <>
                          <p className="text-sm text-muted-foreground">
                            Play live against a friend. Create a lobby and share the 5-digit code, or join theirs. Your
                            name, civilization and location above become your starting setup — you can adjust everything in
                            the lobby.
                          </p>
                          <Button
                            type="button"
                            className="w-full"
                            onClick={createLobby}
                            disabled={lobbyCreating}
                            data-testid="button-create-lobby"
                          >
                            {lobbyCreating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Users className="w-4 h-4 mr-2" />}
                            Create lobby & invite a friend
                          </Button>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex-1 border-t border-border" /> or join a friend's lobby <span className="flex-1 border-t border-border" />
                          </div>
                          <div className="flex gap-2">
                            <Input
                              value={joinCodeInput}
                              onChange={(e) => setJoinCodeInput(e.target.value.replace(/\D/g, "").slice(0, 5))}
                              placeholder="00000"
                              inputMode="numeric"
                              className="font-mono text-lg tracking-[0.3em]"
                              data-testid="input-join-lobby"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={joinLobby}
                              disabled={lobbyJoining || joinCodeInput.length !== 5}
                              data-testid="button-join-lobby"
                            >
                              {lobbyJoining ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join"}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">Your lobby code — share it with your friend</p>
                          <div className="flex items-center gap-3">
                            <p className="text-3xl font-mono tracking-[0.3em]" data-testid="text-lobby-code">{lobbyCode}</p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText(lobbyCode);
                                toast({ title: "Copied" });
                              }}
                            >
                              <Copy className="w-4 h-4 mr-1" /> Copy
                            </Button>
                          </div>
                          <Button type="button" className="w-full" onClick={() => setLocation("/multiplayer")} data-testid="button-enter-lobby">
                            Enter lobby →
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            Waiting for your friend to join with the code. Set the shared timeline and start the game from
                            the lobby.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Total Turns (AI modes only) */}
                  {competitiveGameMode !== "human_vs_human" && (
                  <>
                  <div className="space-y-2">
                    <Label>Total Turns: {competitiveTotalTurns}</Label>
                    <Slider
                      value={[competitiveTotalTurns]}
                      onValueChange={(value) => setCompetitiveTotalTurns(value[0])}
                      min={5}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Game ends after {competitiveTotalTurns} turns with a final battle option
                    </p>
                  </div>

                  {/* Auto-play for AI vs AI */}
                  {competitiveGameMode === "ai_vs_ai" && (
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="autoplay">Auto-play Mode</Label>
                        <p className="text-xs text-muted-foreground">
                          Automatically advance turns without manual input
                        </p>
                      </div>
                      <Switch
                        id="autoplay"
                        checked={competitiveAutoPlay}
                        onCheckedChange={setCompetitiveAutoPlay}
                      />
                    </div>
                  )}

                  {/* Turns per round */}
                  <div className="space-y-4 border-t pt-4">
                    <h4 className="font-medium text-sm">Turns Per Round</h4>
                    <p className="text-xs text-muted-foreground">
                      Give one player extra turns per round. Each sub-turn generates goals, runs simulation, and advances time independently.
                    </p>

                    {competitiveGameMode === "ai_vs_ai" && (
                      <div className="space-y-2">
                        <Label>Player A Turns: {playerATurnsPerRound}</Label>
                        <Slider
                          value={[playerATurnsPerRound]}
                          onValueChange={(value) => setPlayerATurnsPerRound(value[0])}
                          min={1}
                          max={5}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Player B (AI) Turns: {playerBTurnsPerRound}</Label>
                      <Slider
                        value={[playerBTurnsPerRound]}
                        onValueChange={(value) => setPlayerBTurnsPerRound(value[0])}
                        min={1}
                        max={5}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    {(playerATurnsPerRound > 1 || playerBTurnsPerRound > 1) && (
                      <p className="text-xs text-amber-600">
                        Note: Civilizations may end up in different time periods when turns per round differ.
                      </p>
                    )}
                  </div>

                  {/* Opponent Configuration */}
                  <div className="space-y-4 border-t pt-4">
                    <h4 className="font-medium text-sm">Opponent Configuration (Optional)</h4>
                    <p className="text-xs text-muted-foreground">
                      Leave blank to auto-generate a balanced opponent based on your civilization
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="opponentName">Opponent Leader</Label>
                        <Input
                          id="opponentName"
                          placeholder="e.g., Emperor Augustus"
                          value={opponentName}
                          onChange={(e) => setOpponentName(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="opponentCivName">Opponent Civilization</Label>
                        <Input
                          id="opponentCivName"
                          placeholder="e.g., Roman Empire"
                          value={opponentCivName}
                          onChange={(e) => setOpponentCivName(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="opponentLocation">Opponent Location</Label>
                        <Input
                          id="opponentLocation"
                          placeholder="e.g., Italian Peninsula"
                          value={opponentLocation}
                          onChange={(e) => setOpponentLocation(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Player B Custom Prompt */}
                    <div className="space-y-2 mt-4">
                      <Label>Custom System Prompt (Player B - Optional)</Label>
                      <Textarea
                        placeholder="Enter custom system prompt for AI opponent... (leave empty for default)"
                        value={playerBCustomPrompt}
                        onChange={(e) => setPlayerBCustomPrompt(e.target.value)}
                        className="min-h-[100px] font-mono text-xs"
                      />
                      <p className="text-xs text-muted-foreground">
                        {playerBCustomPrompt ? `${playerBCustomPrompt.length} characters` : "Using default prompt"}
                      </p>
                    </div>
                  </div>
                  </>
                  )}
                </CardContent>
              )}
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Link href="/">
                <Button variant="outline" type="button" data-testid="button-cancel">
                  Cancel
                </Button>
              </Link>
              {/* Online lobby is driven by its own Create/Join buttons above */}
              {!(competitiveMode && competitiveGameMode === "human_vs_human") && (
                <Button
                  type="submit"
                  disabled={createMutation.isPending}
                  data-testid="button-create-civilization"
                >
                  {createMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : competitiveMode ? (
                    <>
                      <Swords className="w-4 h-4 mr-2" />
                      Start Competitive Game
                    </>
                  ) : (
                    "Begin Civilization"
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}