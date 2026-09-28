import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Trash2, Eye, Swords, Loader2 } from "lucide-react";
import type { Battle } from "@shared/schema";
import { formatMarkdown } from "@/lib/formatMarkdown";

interface BattleHistoryProps {
  civilizationId: string;
  playerAName: string;
  playerBName: string;
}

export function BattleHistory({
  civilizationId,
  playerAName,
  playerBName,
}: BattleHistoryProps) {
  const { toast } = useToast();
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);

  const { data: battles = [], isLoading } = useQuery<Battle[]>({
    queryKey: ["/api/civilizations", civilizationId, "competitive", "battles"],
    queryFn: async () => {
      const response = await fetch(
        `/api/civilizations/${civilizationId}/competitive/battles`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch battles");
      return response.json();
    },
  });

  const deleteBattleMutation = useMutation({
    mutationFn: async (battleId: string) => {
      await apiRequest(
        "DELETE",
        `/api/civilizations/${civilizationId}/competitive/battles/${battleId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilizationId, "competitive", "battles"],
      });
      toast({
        title: "Battle Deleted",
        description: "The what-if battle has been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete battle.",
        variant: "destructive",
      });
    },
  });

  const getWinnerText = (winner: string | null) => {
    if (!winner) return "Undetermined";
    if (winner === "player_a") return playerAName;
    if (winner === "player_b") return playerBName;
    if (winner === "draw") return "Draw";
    return "Unknown";
  };

  const getBattleTypeName = (type: string) => {
    switch (type) {
      case "trade_war":
        return "Trade War";
      case "limited_war":
        return "Limited War";
      case "extermination_war":
        return "Extermination War";
      default:
        return type;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (battles.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <Swords className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No what-if battles yet.</p>
        <p className="text-sm">Click "Battle Now" to simulate a scenario.</p>
      </div>
    );
  }

  return (
    <>
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Swords className="w-4 h-4" />
            Battle History
          </h3>
          <p className="text-xs text-muted-foreground">
            These are "what-if" scenarios that don't affect your main game.
          </p>

          <div className="space-y-3">
            {battles.map((battle) => (
              <Card key={battle.id} className="p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">Turn {battle.turnNumber}</Badge>
                      <Badge
                        variant={
                          battle.battleType === "extermination_war"
                            ? "destructive"
                            : battle.battleType === "limited_war"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {getBattleTypeName(battle.battleType)}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">
                      Winner: {getWinnerText(battle.winner)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(battle.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedBattle(battle)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Battle?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this what-if battle scenario.
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteBattleMutation.mutate(battle.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Battle Detail Dialog */}
      <Dialog open={!!selectedBattle} onOpenChange={() => setSelectedBattle(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Swords className="w-5 h-5" />
              {selectedBattle && getBattleTypeName(selectedBattle.battleType)} - Turn{" "}
              {selectedBattle?.turnNumber}
            </DialogTitle>
          </DialogHeader>
          {selectedBattle && (
            <>
              <div className="flex items-center justify-center gap-4 py-2">
                <Badge
                  variant={
                    selectedBattle.winner === "player_a"
                      ? "default"
                      : "secondary"
                  }
                >
                  {playerAName}
                </Badge>
                <span className="text-muted-foreground">vs</span>
                <Badge
                  variant={
                    selectedBattle.winner === "player_b"
                      ? "default"
                      : "secondary"
                  }
                >
                  {playerBName}
                </Badge>
              </div>
              {selectedBattle.winner && (
                <div className="text-center">
                  <Badge className="text-lg py-1 px-3">
                    Winner: {getWinnerText(selectedBattle.winner)}
                  </Badge>
                </div>
              )}
              <ScrollArea className="h-[400px]">
                <div
                  className="prose prose-sm max-w-none dark:prose-invert p-4"
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdown(selectedBattle.battleResult),
                  }}
                />
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
