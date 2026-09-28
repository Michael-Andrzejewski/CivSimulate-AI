import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bot, Swords } from "lucide-react";

interface CompetitiveTabsProps {
  activeTab: "player_a" | "player_b" | "battle";
  onTabChange: (tab: "player_a" | "player_b" | "battle") => void;
  playerAName: string;
  playerBName: string;
  children: {
    playerA: React.ReactNode;
    playerB: React.ReactNode;
    battle: React.ReactNode;
  };
}

export function CompetitiveTabs({
  activeTab,
  onTabChange,
  playerAName,
  playerBName,
  children,
}: CompetitiveTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => onTabChange(value as "player_a" | "player_b" | "battle")}
      className="flex flex-col h-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="player_a" className="flex items-center gap-1">
          <User className="w-4 h-4" />
          <span className="truncate max-w-[80px]">{playerAName}</span>
        </TabsTrigger>
        <TabsTrigger value="player_b" className="flex items-center gap-1">
          <Bot className="w-4 h-4" />
          <span className="truncate max-w-[80px]">{playerBName}</span>
        </TabsTrigger>
        <TabsTrigger value="battle" className="flex items-center gap-1">
          <Swords className="w-4 h-4" />
          Battle
        </TabsTrigger>
      </TabsList>

      <TabsContent value="player_a" className="flex-1 mt-0">
        {children.playerA}
      </TabsContent>

      <TabsContent value="player_b" className="flex-1 mt-0">
        {children.playerB}
      </TabsContent>

      <TabsContent value="battle" className="flex-1 mt-0">
        {children.battle}
      </TabsContent>
    </Tabs>
  );
}
