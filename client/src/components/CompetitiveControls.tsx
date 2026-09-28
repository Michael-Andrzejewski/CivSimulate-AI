import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Play, Swords, ArrowRight, Pause } from "lucide-react";

interface CompetitiveControlsProps {
  mode: "human_vs_ai" | "ai_vs_ai";
  isPlayerATurnComplete: boolean;
  isPlayerBTurnComplete: boolean;
  isPending: boolean;
  isAutoPlay: boolean;
  onRunAITurn: () => void;
  onProceedToNextCentury: () => void;
  onBattleNow: () => void;
  onToggleAutoPlay: (enabled: boolean) => void;
  turnCount: number;
  totalTurns: number;
}

export function CompetitiveControls({
  mode,
  isPlayerATurnComplete,
  isPlayerBTurnComplete,
  isPending,
  isAutoPlay,
  onRunAITurn,
  onProceedToNextCentury,
  onBattleNow,
  onToggleAutoPlay,
  turnCount,
  totalTurns,
}: CompetitiveControlsProps) {
  const bothTurnsComplete = isPlayerATurnComplete && isPlayerBTurnComplete;
  const isLastTurn = turnCount >= totalTurns;

  return (
    <div className="border-t bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left side: AI controls */}
        <div className="flex items-center gap-4">
          {mode === "ai_vs_ai" ? (
            <>
              <Button
                onClick={onRunAITurn}
                disabled={isPending || bothTurnsComplete}
                variant="outline"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Running Turn...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Turn
                  </>
                )}
              </Button>

              <div className="flex items-center gap-2">
                <Switch
                  id="autoplay-control"
                  checked={isAutoPlay}
                  onCheckedChange={onToggleAutoPlay}
                  disabled={isPending}
                />
                <Label htmlFor="autoplay-control" className="text-sm">
                  {isAutoPlay ? (
                    <>
                      <Pause className="w-3 h-3 inline mr-1" />
                      Auto-play On
                    </>
                  ) : (
                    "Auto-play"
                  )}
                </Label>
              </div>
            </>
          ) : (
            // Human vs AI mode
            <Button
              onClick={onRunAITurn}
              disabled={isPending || !isPlayerATurnComplete || isPlayerBTurnComplete}
              variant="outline"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  AI Thinking...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run AI Turn
                </>
              )}
            </Button>
          )}
        </div>

        {/* Right side: Battle and Next Century */}
        <div className="flex items-center gap-2">
          <Button
            onClick={onBattleNow}
            variant="destructive"
            disabled={isPending}
          >
            <Swords className="w-4 h-4 mr-2" />
            Battle Now
          </Button>

          {bothTurnsComplete && (
            <Button
              onClick={onProceedToNextCentury}
              disabled={isPending}
            >
              {isLastTurn ? (
                <>
                  <Swords className="w-4 h-4 mr-2" />
                  Final Battle
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Next Century
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Status message */}
      <div className="mt-2 text-xs text-muted-foreground text-center">
        {isPending ? (
          "Processing turn..."
        ) : bothTurnsComplete ? (
          isLastTurn ? (
            "Both turns complete! Ready for final battle or end game."
          ) : (
            "Both turns complete! Ready to proceed to next century."
          )
        ) : !isPlayerATurnComplete && !isPlayerBTurnComplete ? (
          mode === "human_vs_ai" ? "Enter your goals to begin your turn." : "Click 'Run Turn' to start."
        ) : isPlayerATurnComplete ? (
          "Player A turn complete. Running AI turn..."
        ) : (
          "Player B turn complete. Waiting for Player A."
        )}
      </div>
    </div>
  );
}
