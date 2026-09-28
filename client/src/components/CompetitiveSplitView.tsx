import { CivilizationPanel } from "@/components/CivilizationPanel";
import { TurnProgressBar } from "@/components/TurnProgressBar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  messageType?: string;
  createdAt: Date;
}

interface CompetitiveSplitViewProps {
  // Player A props
  playerAName: string;
  playerACivilizationName: string;
  playerALocation: string;
  playerACurrentCentury: number;
  playerAStrengthPercentile?: number | null;
  playerAMessages: Message[];
  playerAStreamingMessage?: string;
  playerAIsStreaming?: boolean;
  playerALatestSummary?: string;
  playerAUserInput: string;
  onPlayerAUserInputChange: (value: string) => void;
  onPlayerASubmit: () => void;
  playerAIsPending: boolean;
  isPlayerAHuman: boolean;

  // Player B props
  playerBName: string;
  playerBCivilizationName: string;
  playerBLocation: string;
  playerBCurrentCentury: number;
  playerBStrengthPercentile?: number | null;
  playerBMessages: Message[];
  playerBStreamingMessage?: string;
  playerBIsStreaming?: boolean;
  playerBLatestSummary?: string;

  // Turn progress
  turnCount: number;
  totalTurns: number;
}

export function CompetitiveSplitView({
  playerAName,
  playerACivilizationName,
  playerALocation,
  playerACurrentCentury,
  playerAStrengthPercentile,
  playerAMessages,
  playerAStreamingMessage,
  playerAIsStreaming,
  playerALatestSummary,
  playerAUserInput,
  onPlayerAUserInputChange,
  onPlayerASubmit,
  playerAIsPending,
  isPlayerAHuman,
  playerBName,
  playerBCivilizationName,
  playerBLocation,
  playerBCurrentCentury,
  playerBStrengthPercentile,
  playerBMessages,
  playerBStreamingMessage,
  playerBIsStreaming,
  playerBLatestSummary,
  turnCount,
  totalTurns,
}: CompetitiveSplitViewProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Turn Progress */}
      <div className="p-4 border-b bg-card">
        <TurnProgressBar
          currentTurn={turnCount}
          totalTurns={totalTurns}
          showBattleIcon={true}
        />
      </div>

      {/* Split View */}
      <div className="flex-1 grid grid-cols-2 gap-4 p-4 overflow-hidden min-h-0 relative">
        {/* Player A Panel */}
        <CivilizationPanel
          playerType="player_a"
          playerName={playerAName}
          civilizationName={playerACivilizationName}
          location={playerALocation}
          currentCentury={playerACurrentCentury}
          strengthPercentile={playerAStrengthPercentile}
          messages={playerAMessages}
          streamingMessage={playerAStreamingMessage}
          isStreaming={playerAIsStreaming}
          isHuman={isPlayerAHuman}
          userInput={playerAUserInput}
          onUserInputChange={onPlayerAUserInputChange}
          onSubmit={onPlayerASubmit}
          isPending={playerAIsPending}
          latestSummary={playerALatestSummary}
        />

        {/* Divider with VS indicator */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex">
          <div className="bg-card border rounded-full p-3 shadow-lg">
            <span className="font-bold text-lg">VS</span>
          </div>
        </div>

        {/* Player B Panel */}
        <CivilizationPanel
          playerType="player_b"
          playerName={playerBName}
          civilizationName={playerBCivilizationName}
          location={playerBLocation}
          currentCentury={playerBCurrentCentury}
          strengthPercentile={playerBStrengthPercentile}
          messages={playerBMessages}
          streamingMessage={playerBStreamingMessage}
          isStreaming={playerBIsStreaming}
          isHuman={false}
          latestSummary={playerBLatestSummary}
        />
      </div>
    </div>
  );
}
