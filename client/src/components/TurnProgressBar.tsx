import { Progress } from "@/components/ui/progress";
import { Swords } from "lucide-react";

interface TurnProgressBarProps {
  currentTurn: number;
  totalTurns: number;
  showBattleIcon?: boolean;
}

export function TurnProgressBar({
  currentTurn,
  totalTurns,
  showBattleIcon = true,
}: TurnProgressBarProps) {
  const progress = (currentTurn / totalTurns) * 100;
  const isLastTurn = currentTurn >= totalTurns;

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Turn {currentTurn} of {totalTurns}
        </span>
        {showBattleIcon && (
          <div className="flex items-center gap-1">
            <Swords
              className={`w-4 h-4 ${
                isLastTurn ? "text-red-500 animate-pulse" : "text-muted-foreground"
              }`}
            />
            <span
              className={`text-xs ${
                isLastTurn ? "text-red-500 font-medium" : "text-muted-foreground"
              }`}
            >
              {isLastTurn ? "Final Battle!" : "Battle"}
            </span>
          </div>
        )}
      </div>
      <div className="relative">
        <Progress value={progress} className="h-2" />
        {/* Turn markers */}
        <div className="absolute inset-0 flex justify-between px-0.5">
          {Array.from({ length: totalTurns }).map((_, i) => (
            <div
              key={i}
              className={`w-0.5 h-2 ${
                i < currentTurn ? "bg-primary" : "bg-muted-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
