import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import type { Civilization } from "@shared/schema";

interface CompetitiveSetupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  civilization: Civilization;
}

export function CompetitiveSetupDialog({
  isOpen,
  onClose,
  civilization,
}: CompetitiveSetupDialogProps) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<"human_vs_ai" | "ai_vs_ai">("human_vs_ai");
  const [totalTurns, setTotalTurns] = useState(10);
  const [autoPlay, setAutoPlay] = useState(false);
  const [playerBName, setPlayerBName] = useState("");
  const [playerBCivilizationName, setPlayerBCivilizationName] = useState("");
  const [playerBLocation, setPlayerBLocation] = useState("");

  const startCompetitiveMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest(
        "POST",
        `/api/civilizations/${civilization.id}/competitive/start`,
        {
          mode,
          totalTurns,
          autoPlay: mode === "ai_vs_ai" ? autoPlay : false,
          playerBName: playerBName || undefined,
          playerBCivilizationName: playerBCivilizationName || undefined,
          playerBLocation: playerBLocation || undefined,
        }
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilization.id],
      });
      toast({
        title: "Competitive Mode Started",
        description: `${mode === "human_vs_ai" ? "Human vs AI" : "AI vs AI"} game with ${totalTurns} turns.`,
      });
      onClose();
      setLocation(`/civilization/${civilization.id}/competitive`);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to start competitive mode.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    startCompetitiveMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Start Competitive Mode</DialogTitle>
          <DialogDescription>
            Set up a two-player competitive game. Play against an AI opponent or
            watch two AIs compete.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Mode Selection */}
          <div className="space-y-2">
            <Label htmlFor="mode">Game Mode</Label>
            <Select
              value={mode}
              onValueChange={(value: "human_vs_ai" | "ai_vs_ai") =>
                setMode(value)
              }
            >
              <SelectTrigger id="mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="human_vs_ai">
                  Human vs AI - You control one civilization
                </SelectItem>
                <SelectItem value="ai_vs_ai">
                  AI vs AI - Watch two AIs compete
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Total Turns */}
          <div className="space-y-2">
            <Label>Total Turns: {totalTurns}</Label>
            <Slider
              value={[totalTurns]}
              onValueChange={(value) => setTotalTurns(value[0])}
              min={5}
              max={20}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Game ends after {totalTurns} turns with a final battle option
            </p>
          </div>

          {/* Auto-play for AI vs AI */}
          {mode === "ai_vs_ai" && (
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoplay">Auto-play Mode</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically advance turns without manual input
                </p>
              </div>
              <Switch
                id="autoplay"
                checked={autoPlay}
                onCheckedChange={setAutoPlay}
              />
            </div>
          )}

          {/* Player B Configuration */}
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium">Opponent Configuration (Optional)</h4>
            <p className="text-xs text-muted-foreground">
              Leave blank to auto-generate a balanced opponent
            </p>

            <div className="space-y-2">
              <Label htmlFor="playerBName">Opponent Leader Name</Label>
              <Input
                id="playerBName"
                placeholder="e.g., Emperor Augustus"
                value={playerBName}
                onChange={(e) => setPlayerBName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="playerBCivName">Opponent Civilization Name</Label>
              <Input
                id="playerBCivName"
                placeholder="e.g., Roman Empire"
                value={playerBCivilizationName}
                onChange={(e) => setPlayerBCivilizationName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="playerBLocation">Opponent Location</Label>
              <Input
                id="playerBLocation"
                placeholder="e.g., Italian Peninsula"
                value={playerBLocation}
                onChange={(e) => setPlayerBLocation(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={startCompetitiveMutation.isPending}
          >
            {startCompetitiveMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Starting...
              </>
            ) : (
              "Start Game"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
