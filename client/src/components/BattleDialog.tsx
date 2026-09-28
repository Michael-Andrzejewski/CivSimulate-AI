import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Swords, Info } from "lucide-react";
import { formatMarkdown } from "@/lib/formatMarkdown";

interface BattleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStartBattle: (battleType: string) => void | Promise<void>;
  isPending: boolean;
  /** Pre-selects a battle type when the dialog opens (e.g. Final Battle). */
  initialBattleType?: string | null;
  streamingResult?: string;
  battleResult?: {
    battleId: string;
    winner: string | null;
  } | null;
  playerAName: string;
  playerBName: string;
}

const battleTypes = [
  {
    id: "trade_war",
    name: "Trade War",
    description:
      "Economic competition. Both civilizations survive but may gain or lose status, population, technology, and morale.",
    severity: "low",
  },
  {
    id: "limited_war",
    name: "Limited War",
    description:
      "Temporary war with surrender concessions, technological changes, and population changes. Both survive but may be significantly impacted.",
    severity: "medium",
  },
  {
    id: "extermination_war",
    name: "Extermination War",
    description:
      "Total war where neither side will submit. One civilization will be destroyed while the other survives or ascends.",
    severity: "high",
  },
];

export function BattleDialog({
  isOpen,
  onClose,
  onStartBattle,
  isPending,
  initialBattleType,
  streamingResult,
  battleResult,
  playerAName,
  playerBName,
}: BattleDialogProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  // Disables the Start button synchronously on the first click. isPending
  // only flips once the first streamed token arrives, so without this every
  // extra click during LLM startup created a duplicate battle.
  const [isStarting, setIsStarting] = useState(false);
  const startingRef = useRef(false);

  // Apply the pre-selected battle type whenever the dialog opens
  useEffect(() => {
    if (isOpen) {
      setSelectedType(initialBattleType ?? null);
    }
  }, [isOpen, initialBattleType]);

  const handleStartBattle = async () => {
    if (!selectedType || startingRef.current) return;
    startingRef.current = true;
    setIsStarting(true);
    try {
      // Awaiting lets us re-enable the button if the battle errors out or
      // the stream ends before a battleId arrives (parent resets its
      // streaming state and surfaces a toast in those cases).
      await onStartBattle(selectedType);
    } finally {
      startingRef.current = false;
      setIsStarting(false);
    }
  };

  const handleClose = () => {
    setSelectedType(null);
    onClose();
  };

  const getWinnerText = () => {
    if (!battleResult?.winner) return null;
    if (battleResult.winner === "player_a") return `${playerAName} Wins!`;
    if (battleResult.winner === "player_b") return `${playerBName} Wins!`;
    if (battleResult.winner === "draw") return "Draw!";
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Swords className="w-5 h-5" />
            What-If Battle Scenario
          </DialogTitle>
          <DialogDescription>
            Simulate a hypothetical battle between the two civilizations. This does
            NOT affect the main game - it's a "what-if" scenario.
          </DialogDescription>
        </DialogHeader>

        <Alert className="border-amber-500 bg-amber-50 dark:bg-amber-950">
          <Info className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            This battle is a hypothetical scenario and will not affect your main
            game progress. The simulation is stored separately and can be deleted.
          </AlertDescription>
        </Alert>

        {!isPending && !streamingResult && !battleResult ? (
          // Battle type selection
          <div className="space-y-4 py-4">
            <p className="text-sm font-medium">Select Battle Type:</p>
            <div className="grid gap-3">
              {battleTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedType === type.id
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {type.description}
                      </p>
                    </div>
                    <Badge
                      variant={
                        type.severity === "high"
                          ? "destructive"
                          : type.severity === "medium"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {type.severity === "high"
                        ? "Total War"
                        : type.severity === "medium"
                        ? "Military"
                        : "Economic"}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Battle result display
          <ScrollArea className="h-[400px] py-4">
            {battleResult?.winner && (
              <div className="mb-4 text-center">
                <Badge
                  variant={
                    battleResult.winner === "draw" ? "secondary" : "default"
                  }
                  className="text-lg py-2 px-4"
                >
                  {getWinnerText()}
                </Badge>
              </div>
            )}
            <div
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html: formatMarkdown(streamingResult || ""),
              }}
            />
            {isPending && (
              <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse" />
            )}
          </ScrollArea>
        )}

        <DialogFooter>
          {!isPending && !streamingResult && !battleResult ? (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleStartBattle}
                disabled={!selectedType || isStarting}
                variant="destructive"
              >
                {isStarting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Starting Battle...
                  </>
                ) : (
                  <>
                    <Swords className="w-4 h-4 mr-2" />
                    Start Battle
                  </>
                )}
              </Button>
            </>
          ) : isPending ? (
            <Button disabled>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Simulating Battle...
            </Button>
          ) : (
            <Button onClick={handleClose}>Close</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
