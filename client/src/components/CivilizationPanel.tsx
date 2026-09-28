import { useRef, useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Loader2, Bot, User } from "lucide-react";
import { formatMarkdown } from "@/lib/formatMarkdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  messageType?: string;
  createdAt: Date;
}

interface CivilizationPanelProps {
  playerType: "player_a" | "player_b";
  playerName: string;
  civilizationName: string;
  location: string;
  currentCentury: number;
  strengthPercentile?: number | null;
  messages: Message[];
  streamingMessage?: string;
  isStreaming?: boolean;
  isHuman?: boolean;
  userInput?: string;
  onUserInputChange?: (value: string) => void;
  onSubmit?: () => void;
  isPending?: boolean;
  latestSummary?: string;
}

function formatCentury(century: number): string {
  if (century < 0) {
    return `${Math.abs(century).toLocaleString()} BCE`;
  }
  return `${century.toLocaleString()} CE`;
}

export function CivilizationPanel({
  playerType,
  playerName,
  civilizationName,
  location,
  currentCentury,
  strengthPercentile,
  messages,
  streamingMessage,
  isStreaming,
  isHuman = false,
  userInput = "",
  onUserInputChange,
  onSubmit,
  isPending,
  latestSummary,
}: CivilizationPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [userHasScrolled, setUserHasScrolled] = useState(false);

  // Check if user is near the bottom of the scroll container
  const isNearBottom = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return true;
    const threshold = 100; // pixels from bottom
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
  }, []);

  // Handle user scroll - detect when they scroll away from bottom
  const handleScroll = useCallback(() => {
    if (!isNearBottom()) {
      setUserHasScrolled(true);
    } else {
      setUserHasScrolled(false);
    }
  }, [isNearBottom]);

  // Reset scroll lock when streaming STARTS (not stops) so user follows new content
  // When streaming stops, user keeps their scroll position to read at their own pace
  useEffect(() => {
    if (isStreaming) {
      setUserHasScrolled(false);
    }
  }, [isStreaming]);

  // Auto-scroll to bottom only if user hasn't scrolled away
  useEffect(() => {
    if (!userHasScrolled) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, streamingMessage, userHasScrolled]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onUserInputChange) {
      onUserInputChange(e.target.value);
      e.target.style.height = "auto";
      e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isHuman ? (
              <User className="w-5 h-5 text-blue-500" />
            ) : (
              <Bot className="w-5 h-5 text-purple-500" />
            )}
            <div>
              <h3 className="font-semibold">{civilizationName}</h3>
              <p className="text-xs text-muted-foreground">
                {playerName} • {location}
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant={playerType === "player_a" ? "default" : "secondary"}>
              {formatCentury(currentCentury)}
            </Badge>
            {strengthPercentile != null && (
              <p className="text-xs text-muted-foreground mt-1">
                Strength: {strengthPercentile}th percentile
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area - scrollable with visible scrollbar */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 overflow-y-auto civilization-panel-scroll p-4"
      >
        <div className="space-y-4">
          {messages.length === 0 && !latestSummary && !isStreaming && !streamingMessage ? (
            <div className="text-center py-8 text-muted-foreground">
              {isHuman ? (
                <>
                  <p className="text-lg">Ready to compete!</p>
                  <p className="text-sm">Enter your goals to begin.</p>
                </>
              ) : (
                <>
                  <p className="text-lg">AI Opponent</p>
                  <p className="text-sm">Waiting for game to start...</p>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Show latest summary preview if available */}
              {latestSummary && messages.length === 0 && (
                <Card className="p-3 bg-muted/50">
                  <p className="text-xs font-medium mb-1 text-muted-foreground">
                    Current State
                  </p>
                  <p className="text-sm line-clamp-6">{latestSummary}</p>
                </Card>
              )}

              {/* Messages */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <Card
                    className={`max-w-[90%] ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card"
                    }`}
                  >
                    <div className="p-3">
                      <p
                        className={`text-xs font-bold mb-1 ${
                          message.role === "user"
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.messageType === "player_b_goals"
                          ? "AI Goals"
                          : message.messageType === "player_b_simulation"
                          ? "AI Simulation"
                          : message.messageType === "player_b_summary"
                          ? "AI Summary"
                          : message.messageType === "civilization_summary"
                          ? "Summary"
                          : message.messageType === "user_goals"
                          ? "Goals"
                          : message.messageType === "simulation_result"
                          ? "Simulation"
                          : message.role === "user"
                          ? "Goals"
                          : "Simulation"}
                      </p>
                      <div
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{
                          __html: formatMarkdown(message.content),
                        }}
                      />
                    </div>
                  </Card>
                </div>
              ))}

              {/* Streaming message */}
              {(isStreaming || streamingMessage) && (
                <div className="flex justify-start">
                  <Card className="max-w-[90%] bg-card">
                    <div className="p-3">
                      <p className="text-xs font-bold mb-1 text-muted-foreground">
                        {isHuman ? "Simulating..." : "AI Turn..."}
                      </p>
                      <div
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{
                          __html: formatMarkdown(streamingMessage || ""),
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
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area (only for human player) */}
      {isHuman && onUserInputChange && onSubmit && (
        <div className="p-4 border-t flex-shrink-0">
          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={userInput}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your goals for this turn..."
              className="resize-none min-h-[60px] max-h-[150px]"
              disabled={isPending || isStreaming}
            />
            <Button
              onClick={onSubmit}
              disabled={!userInput.trim() || isPending || isStreaming}
              size="icon"
              className="h-auto"
            >
              {isPending || isStreaming ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      )}

      {/* AI indicator (for AI player) */}
      {!isHuman && (
        <div className="p-4 border-t bg-muted/50 flex-shrink-0">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Bot className="w-4 h-4" />
            <span className="text-sm">
              {isStreaming ? "AI is thinking..." : "AI Controlled"}
            </span>
            {isStreaming && <Loader2 className="w-4 h-4 animate-spin" />}
          </div>
        </div>
      )}
    </Card>
  );
}
