import {
  type User,
  type UpsertUser,
  type Civilization,
  type InsertCivilization,
  type Message,
  type InsertMessage,
  type Battle,
  type InsertBattle,
} from "@shared/schema";

// Check if we're in local development mode (no DATABASE_URL)
const isLocalDev = !process.env.DATABASE_URL;

// Only import database dependencies if DATABASE_URL is set
let db: any;
let users: any, civilizations: any, messages: any;
let eq: any, and: any, desc: any, ne: any, or: any, inArray: any;

let battles: any;

if (!isLocalDev) {
  // Dynamic imports for database mode
  const dbModule = await import("./db");
  const schemaModule = await import("@shared/schema");
  const drizzleOrm = await import("drizzle-orm");

  db = dbModule.db;
  users = schemaModule.users;
  civilizations = schemaModule.civilizations;
  messages = schemaModule.messages;
  battles = schemaModule.battles;
  eq = drizzleOrm.eq;
  and = drizzleOrm.and;
  desc = drizzleOrm.desc;
  ne = drizzleOrm.ne;
  or = drizzleOrm.or;
  inArray = drizzleOrm.inArray;
}

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Civilization operations
  getCivilizations(userId: string): Promise<Civilization[]>;
  getCivilization(id: string, userId: string): Promise<Civilization | undefined>;
  // Cross-user lookup by shareable battle code (PvP battles)
  getCivilizationByBattleCode(code: string): Promise<Civilization | undefined>;
  createCivilization(userId: string, civilization: InsertCivilization): Promise<Civilization>;
  updateCivilization(id: string, userId: string, data: Partial<Civilization>): Promise<Civilization | undefined>;
  deleteCivilization(id: string, userId: string): Promise<void>;

  // Message operations
  getMessages(civilizationId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  clearChatMessages(civilizationId: string): Promise<void>;
  clearAllMessages(civilizationId: string): Promise<void>;
  clearPlayerBMessages(civilizationId: string): Promise<void>;
  deleteMessage(messageId: string): Promise<void>;
  // civilizationId scopes the update: without it, any authenticated user
  // could edit any message in any civilization by guessing/knowing its id
  updateMessage(messageId: string, civilizationId: string, content: string): Promise<Message>;

  // Catastrophe operations
  setForceCatastrophe(civilizationId: string): Promise<void>;
  checkForceCatastrophe(civilizationId: string): Promise<boolean>;
  clearForceCatastrophe(civilizationId: string): Promise<void>;

  // Battle operations (for competitive mode "what-if" scenarios)
  saveBattle(battle: InsertBattle): Promise<Battle>;
  getBattles(civilizationId: string): Promise<Battle[]>;
  getBattle(battleId: string): Promise<Battle | undefined>;
  deleteBattle(battleId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    try {
      const [user] = await db
        .insert(users)
        .values(userData)
        .onConflictDoUpdate({
          target: users.id,
          set: {
            ...userData,
            updatedAt: new Date(),
          },
        })
        .returning();
      return user;
    } catch (error: any) {
      // The id-targeted upsert can't resolve a UNIQUE violation on email
      // (a second auth identity with a known email previously 500'd on login)
      if (error?.code === "23505" && userData.email) {
        const [user] = await db
          .update(users)
          .set({ ...userData, updatedAt: new Date() })
          .where(eq(users.email, userData.email))
          .returning();
        if (user) return user;
      }
      throw error;
    }
  }

  // Civilization operations
  // Select full rows: explicit column lists silently dropped fields (custom
  // prompts, token limits, competitive state) so they were never read back.
  async getCivilizations(userId: string): Promise<Civilization[]> {
    return db
      .select()
      .from(civilizations)
      .where(eq(civilizations.userId, userId))
      .orderBy(desc(civilizations.lastPlayedAt));
  }

  async getCivilization(id: string, userId: string): Promise<Civilization | null> {
    const result = await db
      .select()
      .from(civilizations)
      .where(
        and(
          eq(civilizations.id, id),
          eq(civilizations.userId, userId)
        )
      )
      .limit(1);

    return result[0] || null;
  }

  async getCivilizationByBattleCode(code: string): Promise<Civilization | undefined> {
    const result = await db
      .select()
      .from(civilizations)
      .where(eq(civilizations.battleCode, code))
      .limit(1);
    return result[0];
  }

  async createCivilization(userId: string, civilization: InsertCivilization): Promise<Civilization> {
    const [newCivilization] = await db
      .insert(civilizations)
      .values({
        ...civilization,
        userId,
      })
      .returning();
    return newCivilization;
  }

  async updateCivilization(id: string, userId: string, data: Partial<Civilization>): Promise<Civilization | undefined> {
    const [updated] = await db
      .update(civilizations)
      .set({
        ...data,
        lastPlayedAt: new Date(),
      })
      .where(and(eq(civilizations.id, id), eq(civilizations.userId, userId)))
      .returning();
    return updated;
  }

  async deleteCivilization(id: string, userId: string): Promise<void> {
    await db
      .delete(civilizations)
      .where(and(eq(civilizations.id, id), eq(civilizations.userId, userId)));
  }

  // Message operations
  async getMessages(civilizationId: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.civilizationId, civilizationId))
      .orderBy(messages.createdAt);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db
      .insert(messages)
      .values(message)
      .returning();
    return newMessage;
  }

  async clearChatMessages(civilizationId: string): Promise<void> {
    // Delete all messages for this civilization except summaries — including
    // Player B's competitive summaries (SQLite already preserved them; the
    // Postgres path was wiping competitive history on every "next century")
    await db
      .delete(messages)
      .where(
        and(
          eq(messages.civilizationId, civilizationId),
          ne(messages.messageType, 'civilization_summary'),
          ne(messages.messageType, 'player_b_summary')
        )
      );
  }

  async clearAllMessages(civilizationId: string): Promise<void> {
    await db.delete(messages)
      .where(eq(messages.civilizationId, civilizationId));
  }

  async clearPlayerBMessages(civilizationId: string): Promise<void> {
    await db
      .delete(messages)
      .where(
        and(
          eq(messages.civilizationId, civilizationId),
          or(
            eq(messages.playerRole, 'player_b'),
            inArray(messages.messageType, ['player_b_goals', 'player_b_simulation', 'player_b_summary'])
          )
        )
      );
  }

  async deleteMessage(messageId: string): Promise<void> {
    await db.delete(messages).where(eq(messages.id, messageId));
  }

  async updateMessage(messageId: string, civilizationId: string, content: string): Promise<Message> {
    const [updated] = await db
      .update(messages)
      .set({ content })
      .where(
        and(
          eq(messages.id, messageId),
          eq(messages.civilizationId, civilizationId)
        )
      )
      .returning();
    if (!updated) {
      throw new Error("Message not found");
    }
    return updated;
  }

  // In-memory storage for forced catastrophes (simple solution)
  private forcedCatastrophes: Set<string> = new Set();

  async setForceCatastrophe(civilizationId: string) {
    this.forcedCatastrophes.add(civilizationId);
  }

  async checkForceCatastrophe(civilizationId: string): Promise<boolean> {
    return this.forcedCatastrophes.has(civilizationId);
  }

  async clearForceCatastrophe(civilizationId: string) {
    this.forcedCatastrophes.delete(civilizationId);
  }

  // Battle operations
  async saveBattle(battle: InsertBattle): Promise<Battle> {
    const [newBattle] = await db
      .insert(battles)
      .values(battle)
      .returning();
    return newBattle;
  }

  async getBattles(civilizationId: string): Promise<Battle[]> {
    return await db
      .select()
      .from(battles)
      .where(eq(battles.civilizationId, civilizationId))
      .orderBy(desc(battles.createdAt));
  }

  async getBattle(battleId: string): Promise<Battle | undefined> {
    const [battle] = await db
      .select()
      .from(battles)
      .where(eq(battles.id, battleId));
    return battle;
  }

  async deleteBattle(battleId: string): Promise<void> {
    await db.delete(battles).where(eq(battles.id, battleId));
  }
}

// Export appropriate storage based on environment
let storage: IStorage;

if (isLocalDev) {
  // Use SQLite for persistent local development storage
  const { SqliteStorage } = await import("./sqliteStorage");
  storage = new SqliteStorage();
  console.log("[Storage] Using SQLite for persistent local development");
} else {
  storage = new DatabaseStorage();
  console.log("[Storage] Using PostgreSQL database storage");
}

export { storage };