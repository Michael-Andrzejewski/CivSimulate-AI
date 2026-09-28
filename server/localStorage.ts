/**
 * In-memory storage for local development
 * This provides a simple storage implementation that doesn't require PostgreSQL.
 */
import {
  type User,
  type UpsertUser,
  type Civilization,
  type InsertCivilization,
  type Message,
  type InsertMessage,
} from "@shared/schema";
import type { IStorage } from "./storage";
import { LOCAL_USER } from "./localAuth";

// Generate unique IDs
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

export class InMemoryStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private civilizations: Map<string, Civilization> = new Map();
  private messages: Map<string, Message> = new Map();
  private forcedCatastrophes: Set<string> = new Set();

  constructor() {
    // Pre-populate with local dev user
    this.users.set(LOCAL_USER.id, LOCAL_USER);
    console.log("[Local Storage] In-memory storage initialized");
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existing = this.users.get(userData.id!);
    const user: User = {
      id: userData.id!,
      email: userData.email ?? null,
      firstName: userData.firstName ?? null,
      lastName: userData.lastName ?? null,
      profileImageUrl: userData.profileImageUrl ?? null,
      createdAt: existing?.createdAt ?? new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  // Civilization operations
  async getCivilizations(userId: string): Promise<Civilization[]> {
    const civs: Civilization[] = [];
    this.civilizations.forEach((civ) => {
      if (civ.userId === userId) {
        civs.push(civ);
      }
    });
    return civs.sort((a, b) =>
      new Date(b.lastPlayedAt).getTime() - new Date(a.lastPlayedAt).getTime()
    );
  }

  async getCivilization(id: string, userId: string): Promise<Civilization | null> {
    const civ = this.civilizations.get(id);
    if (civ && civ.userId === userId) {
      return civ;
    }
    return null;
  }

  async getCivilizationByBattleCode(code: string): Promise<Civilization | undefined> {
    for (const civ of Array.from(this.civilizations.values())) {
      if ((civ as any).battleCode === code) return civ;
    }
    return undefined;
  }

  async createCivilization(userId: string, civData: InsertCivilization): Promise<Civilization> {
    const id = generateId();
    const now = new Date();
    const civilization: Civilization = {
      id,
      userId,
      userName: civData.userName,
      name: civData.name,
      location: civData.location,
      startingCentury: civData.startingCentury,
      currentCentury: civData.currentCentury,
      timescale: civData.timescale,
      customTimescale: civData.customTimescale ?? null,
      randomNumberEval: civData.randomNumberEval ?? "custom",
      customRandomNumber: civData.customRandomNumber ?? "5",
      goalQuestions: civData.goalQuestions ?? "none",
      enemyCivilization: civData.enemyCivilization ?? "no",
      catastropheTimer: civData.catastropheTimer ?? "none",
      altruismStats: civData.altruismStats ?? false,
      optimisticMode: civData.optimisticMode ?? false,
      enemyTechAdvancements: civData.enemyTechAdvancements ?? null,
      civilizationStrengthPercentile: civData.civilizationStrengthPercentile ?? null,
      multiplayerMode: civData.multiplayerMode ?? false,
      playerBName: civData.playerBName ?? null,
      playerBCivilizationName: civData.playerBCivilizationName ?? null,
      playerBLocation: civData.playerBLocation ?? null,
      createdAt: now,
      lastPlayedAt: now,
    };
    this.civilizations.set(id, civilization);
    return civilization;
  }

  async updateCivilization(id: string, userId: string, data: Partial<Civilization>): Promise<Civilization | undefined> {
    const civ = this.civilizations.get(id);
    if (!civ || civ.userId !== userId) {
      return undefined;
    }
    const updated: Civilization = {
      ...civ,
      ...data,
      lastPlayedAt: new Date(),
    };
    this.civilizations.set(id, updated);
    return updated;
  }

  async deleteCivilization(id: string, userId: string): Promise<void> {
    const civ = this.civilizations.get(id);
    if (civ && civ.userId === userId) {
      this.civilizations.delete(id);
      // Also delete associated messages
      this.messages.forEach((msg, msgId) => {
        if (msg.civilizationId === id) {
          this.messages.delete(msgId);
        }
      });
    }
  }

  // Message operations
  async getMessages(civilizationId: string): Promise<Message[]> {
    const msgs: Message[] = [];
    this.messages.forEach((msg) => {
      if (msg.civilizationId === civilizationId) {
        msgs.push(msg);
      }
    });
    return msgs.sort((a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  async createMessage(msgData: InsertMessage): Promise<Message> {
    const id = generateId();
    const message: Message = {
      id,
      civilizationId: msgData.civilizationId,
      role: msgData.role,
      messageType: msgData.messageType ?? "user_answer",
      content: msgData.content,
      randomNumber: msgData.randomNumber ?? null,
      playerRole: msgData.playerRole ?? null,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async clearChatMessages(civilizationId: string): Promise<void> {
    // Preserve both Player A and Player B summaries (for competitive mode)
    this.messages.forEach((msg, msgId) => {
      if (msg.civilizationId === civilizationId &&
          msg.messageType !== 'civilization_summary' &&
          msg.messageType !== 'player_b_summary') {
        this.messages.delete(msgId);
      }
    });
  }

  async clearAllMessages(civilizationId: string): Promise<void> {
    this.messages.forEach((msg, msgId) => {
      if (msg.civilizationId === civilizationId) {
        this.messages.delete(msgId);
      }
    });
  }

  async clearPlayerBMessages(civilizationId: string): Promise<void> {
    this.messages.forEach((msg, msgId) => {
      if (msg.civilizationId === civilizationId &&
          (msg.playerRole === 'player_b' ||
           ['player_b_goals', 'player_b_simulation', 'player_b_summary'].includes(msg.messageType ?? ''))) {
        this.messages.delete(msgId);
      }
    });
  }

  async deleteMessage(messageId: string): Promise<void> {
    this.messages.delete(messageId);
  }

  async updateMessage(messageId: string, civilizationId: string, content: string): Promise<Message> {
    const msg = this.messages.get(messageId);
    if (!msg || msg.civilizationId !== civilizationId) {
      throw new Error("Message not found");
    }
    msg.content = content;
    this.messages.set(messageId, msg);
    return msg;
  }

  // Catastrophe operations
  async setForceCatastrophe(civilizationId: string): Promise<void> {
    this.forcedCatastrophes.add(civilizationId);
  }

  async checkForceCatastrophe(civilizationId: string): Promise<boolean> {
    return this.forcedCatastrophes.has(civilizationId);
  }

  async clearForceCatastrophe(civilizationId: string): Promise<void> {
    this.forcedCatastrophes.delete(civilizationId);
  }
}
