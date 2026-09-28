/**
 * SQLite storage implementation for local development
 * Provides persistent storage using SQLite database
 */
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
import type { IStorage } from "./storage";
import { sqlite, initializeSqliteSchema } from "./sqliteDb";

// Generate unique IDs
function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 11)}`;
}

// Convert Unix timestamp to Date
function timestampToDate(ts: number | null): Date | null {
  return ts ? new Date(ts * 1000) : null;
}

// Convert Date to Unix timestamp
function dateToTimestamp(date: Date | null): number | null {
  return date ? Math.floor(date.getTime() / 1000) : null;
}

export class SqliteStorage implements IStorage {
  private forcedCatastrophes: Set<string> = new Set();

  constructor() {
    // Initialize the database schema
    initializeSqliteSchema();
    console.log("[SQLite Storage] Persistent storage initialized");
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const stmt = sqlite.prepare(`
      SELECT id, email, first_name, last_name, profile_image_url, created_at, updated_at
      FROM users WHERE id = ?
    `);
    const row = stmt.get(id) as any;
    if (!row) return undefined;

    return {
      id: row.id,
      email: row.email,
      firstName: row.first_name,
      lastName: row.last_name,
      profileImageUrl: row.profile_image_url,
      createdAt: timestampToDate(row.created_at),
      updatedAt: timestampToDate(row.updated_at),
    };
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const now = Math.floor(Date.now() / 1000);
    const id = userData.id || generateId();

    const stmt = sqlite.prepare(`
      INSERT INTO users (id, email, first_name, last_name, profile_image_url, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        email = excluded.email,
        first_name = excluded.first_name,
        last_name = excluded.last_name,
        profile_image_url = excluded.profile_image_url,
        updated_at = ?
      RETURNING id, email, first_name, last_name, profile_image_url, created_at, updated_at
    `);

    let row: any;
    try {
      row = stmt.get(
        id,
        userData.email ?? null,
        userData.firstName ?? null,
        userData.lastName ?? null,
        userData.profileImageUrl ?? null,
        now,
        now,
        now
      ) as any;
    } catch (error: any) {
      // A different user id with an already-registered email violates the
      // UNIQUE(email) constraint — update the existing row by email instead
      if (String(error?.message || "").includes("UNIQUE") && userData.email) {
        const updateStmt = sqlite.prepare(`
          UPDATE users SET
            first_name = ?,
            last_name = ?,
            profile_image_url = ?,
            updated_at = ?
          WHERE email = ?
          RETURNING id, email, first_name, last_name, profile_image_url, created_at, updated_at
        `);
        row = updateStmt.get(
          userData.firstName ?? null,
          userData.lastName ?? null,
          userData.profileImageUrl ?? null,
          now,
          userData.email
        ) as any;
      }
      if (!row) throw error;
    }

    return {
      id: row.id,
      email: row.email,
      firstName: row.first_name,
      lastName: row.last_name,
      profileImageUrl: row.profile_image_url,
      createdAt: timestampToDate(row.created_at),
      updatedAt: timestampToDate(row.updated_at),
    };
  }

  // Civilization operations
  async getCivilizations(userId: string): Promise<Civilization[]> {
    const stmt = sqlite.prepare(`
      SELECT * FROM civilizations
      WHERE user_id = ?
      ORDER BY last_played_at DESC
    `);
    const rows = stmt.all(userId) as any[];

    return rows.map((row) => this.rowToCivilization(row));
  }

  async getCivilization(id: string, userId: string): Promise<Civilization | null> {
    const stmt = sqlite.prepare(`
      SELECT * FROM civilizations
      WHERE id = ? AND user_id = ?
    `);
    const row = stmt.get(id, userId) as any;
    if (!row) return null;

    return this.rowToCivilization(row);
  }

  async getCivilizationByBattleCode(code: string): Promise<Civilization | undefined> {
    const stmt = sqlite.prepare(`
      SELECT * FROM civilizations WHERE battle_code = ?
    `);
    const row = stmt.get(code) as any;
    if (!row) return undefined;
    return this.rowToCivilization(row);
  }

  async createCivilization(userId: string, civData: InsertCivilization): Promise<Civilization> {
    const id = generateId();
    const now = Math.floor(Date.now() / 1000);

    const stmt = sqlite.prepare(`
      INSERT INTO civilizations (
        id, user_id, user_name, name, location, starting_century, current_century,
        timescale, custom_timescale, random_number_eval, custom_random_number,
        goal_questions, enemy_civilization, catastrophe_timer,
        altruism_stats, optimistic_mode, enemy_tech_advancements, civilization_strength_percentile,
        multiplayer_mode, player_b_name, player_b_civilization_name, player_b_location,
        competitive_mode, player_b_current_century, player_b_summary, player_b_strength_percentile,
        competitive_turn_count, competitive_total_turns, competitive_auto_play,
        player_a_model, player_b_model, simulator_model,
        player_a_custom_prompt, player_b_custom_prompt,
        max_simulation_tokens, max_goal_tokens,
        player_a_turns_per_round, player_b_turns_per_round,
        created_at, last_played_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `);

    const row = stmt.get(
      id,
      userId,
      civData.userName,
      civData.name,
      civData.location,
      civData.startingCentury,
      civData.currentCentury,
      civData.timescale,
      civData.customTimescale ?? null,
      civData.randomNumberEval ?? "custom",
      civData.customRandomNumber ?? "5",
      civData.goalQuestions ?? "none",
      civData.enemyCivilization ?? "no",
      civData.catastropheTimer ?? "none",
      civData.altruismStats ? 1 : 0,
      civData.optimisticMode ? 1 : 0,
      civData.enemyTechAdvancements ?? null,
      civData.civilizationStrengthPercentile ?? null,
      civData.multiplayerMode ? 1 : 0,
      civData.playerBName ?? null,
      civData.playerBCivilizationName ?? null,
      civData.playerBLocation ?? null,
      (civData as any).competitiveMode ?? null,
      (civData as any).playerBCurrentCentury ?? null,
      (civData as any).playerBSummary ?? null,
      (civData as any).playerBStrengthPercentile ?? null,
      (civData as any).competitiveTurnCount ?? 0,
      (civData as any).competitiveTotalTurns ?? 10,
      (civData as any).competitiveAutoPlay ? 1 : 0,
      (civData as any).playerAModel ?? "haiku",
      (civData as any).playerBModel ?? "haiku",
      (civData as any).simulatorModel ?? "sonnet",
      (civData as any).playerACustomPrompt ?? null,
      (civData as any).playerBCustomPrompt ?? null,
      (civData as any).maxSimulationTokens ?? 20000,
      (civData as any).maxGoalTokens ?? 1024,
      (civData as any).playerATurnsPerRound ?? 1,
      (civData as any).playerBTurnsPerRound ?? 1,
      now,
      now
    ) as any;

    return this.rowToCivilization(row);
  }

  async updateCivilization(id: string, userId: string, data: Partial<Civilization>): Promise<Civilization | undefined> {
    // Build dynamic update query
    const updates: string[] = [];
    const values: any[] = [];

    if (data.userName !== undefined) { updates.push("user_name = ?"); values.push(data.userName); }
    if (data.name !== undefined) { updates.push("name = ?"); values.push(data.name); }
    if (data.location !== undefined) { updates.push("location = ?"); values.push(data.location); }
    if (data.currentCentury !== undefined) { updates.push("current_century = ?"); values.push(data.currentCentury); }
    if (data.timescale !== undefined) { updates.push("timescale = ?"); values.push(data.timescale); }
    if (data.customTimescale !== undefined) { updates.push("custom_timescale = ?"); values.push(data.customTimescale); }
    if (data.randomNumberEval !== undefined) { updates.push("random_number_eval = ?"); values.push(data.randomNumberEval); }
    if (data.customRandomNumber !== undefined) { updates.push("custom_random_number = ?"); values.push(data.customRandomNumber); }
    if (data.goalQuestions !== undefined) { updates.push("goal_questions = ?"); values.push(data.goalQuestions); }
    if (data.enemyCivilization !== undefined) { updates.push("enemy_civilization = ?"); values.push(data.enemyCivilization); }
    if (data.catastropheTimer !== undefined) { updates.push("catastrophe_timer = ?"); values.push(data.catastropheTimer); }
    if (data.altruismStats !== undefined) { updates.push("altruism_stats = ?"); values.push(data.altruismStats ? 1 : 0); }
    if (data.optimisticMode !== undefined) { updates.push("optimistic_mode = ?"); values.push(data.optimisticMode ? 1 : 0); }
    if (data.enemyTechAdvancements !== undefined) { updates.push("enemy_tech_advancements = ?"); values.push(data.enemyTechAdvancements); }
    if (data.civilizationStrengthPercentile !== undefined) { updates.push("civilization_strength_percentile = ?"); values.push(data.civilizationStrengthPercentile); }
    // Competitive mode fields
    if ((data as any).competitiveMode !== undefined) { updates.push("competitive_mode = ?"); values.push((data as any).competitiveMode); }
    if ((data as any).playerBCurrentCentury !== undefined) { updates.push("player_b_current_century = ?"); values.push((data as any).playerBCurrentCentury); }
    if ((data as any).playerBSummary !== undefined) { updates.push("player_b_summary = ?"); values.push((data as any).playerBSummary); }
    if ((data as any).playerBStrengthPercentile !== undefined) { updates.push("player_b_strength_percentile = ?"); values.push((data as any).playerBStrengthPercentile); }
    if ((data as any).competitiveTurnCount !== undefined) { updates.push("competitive_turn_count = ?"); values.push((data as any).competitiveTurnCount); }
    if ((data as any).competitiveTotalTurns !== undefined) { updates.push("competitive_total_turns = ?"); values.push((data as any).competitiveTotalTurns); }
    if ((data as any).competitiveAutoPlay !== undefined) { updates.push("competitive_auto_play = ?"); values.push((data as any).competitiveAutoPlay ? 1 : 0); }
    if ((data as any).playerBName !== undefined) { updates.push("player_b_name = ?"); values.push((data as any).playerBName); }
    if ((data as any).playerBCivilizationName !== undefined) { updates.push("player_b_civilization_name = ?"); values.push((data as any).playerBCivilizationName); }
    if ((data as any).playerBLocation !== undefined) { updates.push("player_b_location = ?"); values.push((data as any).playerBLocation); }
    // Model selection fields
    if ((data as any).playerAModel !== undefined) { updates.push("player_a_model = ?"); values.push((data as any).playerAModel); }
    if ((data as any).playerBModel !== undefined) { updates.push("player_b_model = ?"); values.push((data as any).playerBModel); }
    if ((data as any).simulatorModel !== undefined) { updates.push("simulator_model = ?"); values.push((data as any).simulatorModel); }
    // Advanced settings
    if ((data as any).playerACustomPrompt !== undefined) { updates.push("player_a_custom_prompt = ?"); values.push((data as any).playerACustomPrompt); }
    if ((data as any).playerBCustomPrompt !== undefined) { updates.push("player_b_custom_prompt = ?"); values.push((data as any).playerBCustomPrompt); }
    if ((data as any).maxSimulationTokens !== undefined) { updates.push("max_simulation_tokens = ?"); values.push((data as any).maxSimulationTokens); }
    if ((data as any).maxGoalTokens !== undefined) { updates.push("max_goal_tokens = ?"); values.push((data as any).maxGoalTokens); }
    if ((data as any).playerATurnsPerRound !== undefined) { updates.push("player_a_turns_per_round = ?"); values.push((data as any).playerATurnsPerRound); }
    if ((data as any).playerBTurnsPerRound !== undefined) { updates.push("player_b_turns_per_round = ?"); values.push((data as any).playerBTurnsPerRound); }
    if ((data as any).battleCode !== undefined) { updates.push("battle_code = ?"); values.push((data as any).battleCode); }

    // Always update last_played_at
    updates.push("last_played_at = ?");
    values.push(Math.floor(Date.now() / 1000));

    // Add WHERE clause values
    values.push(id, userId);

    const stmt = sqlite.prepare(`
      UPDATE civilizations
      SET ${updates.join(", ")}
      WHERE id = ? AND user_id = ?
      RETURNING *
    `);

    const row = stmt.get(...values) as any;
    if (!row) return undefined;

    return this.rowToCivilization(row);
  }

  async deleteCivilization(id: string, userId: string): Promise<void> {
    const stmt = sqlite.prepare(`DELETE FROM civilizations WHERE id = ? AND user_id = ?`);
    stmt.run(id, userId);
  }

  // Message operations
  async getMessages(civilizationId: string): Promise<Message[]> {
    // rowid tiebreaker: timestamps have second resolution, so message pairs
    // saved within the same second (goals + simulation) could swap order
    const stmt = sqlite.prepare(`
      SELECT * FROM messages
      WHERE civilization_id = ?
      ORDER BY created_at ASC, rowid ASC
    `);
    const rows = stmt.all(civilizationId) as any[];

    return rows.map((row) => this.rowToMessage(row));
  }

  async createMessage(msgData: InsertMessage): Promise<Message> {
    const id = generateId();
    const now = Math.floor(Date.now() / 1000);

    const stmt = sqlite.prepare(`
      INSERT INTO messages (id, civilization_id, role, message_type, content, random_number, player_role, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `);

    const row = stmt.get(
      id,
      msgData.civilizationId,
      msgData.role,
      msgData.messageType ?? "user_answer",
      msgData.content,
      msgData.randomNumber ?? null,
      msgData.playerRole ?? null,
      now
    ) as any;

    return this.rowToMessage(row);
  }

  async clearChatMessages(civilizationId: string): Promise<void> {
    // Preserve both Player A and Player B summaries (for competitive mode)
    const stmt = sqlite.prepare(`
      DELETE FROM messages
      WHERE civilization_id = ?
        AND message_type != 'civilization_summary'
        AND message_type != 'player_b_summary'
    `);
    stmt.run(civilizationId);
  }

  async clearAllMessages(civilizationId: string): Promise<void> {
    const stmt = sqlite.prepare(`DELETE FROM messages WHERE civilization_id = ?`);
    stmt.run(civilizationId);
  }

  async clearPlayerBMessages(civilizationId: string): Promise<void> {
    const stmt = sqlite.prepare(`
      DELETE FROM messages
      WHERE civilization_id = ?
        AND (player_role = 'player_b'
             OR message_type IN ('player_b_goals', 'player_b_simulation', 'player_b_summary'))
    `);
    stmt.run(civilizationId);
  }

  async deleteMessage(messageId: string): Promise<void> {
    const stmt = sqlite.prepare(`DELETE FROM messages WHERE id = ?`);
    stmt.run(messageId);
  }

  async updateMessage(messageId: string, civilizationId: string, content: string): Promise<Message> {
    const stmt = sqlite.prepare(`
      UPDATE messages SET content = ? WHERE id = ? AND civilization_id = ? RETURNING *
    `);
    const row = stmt.get(content, messageId, civilizationId) as any;
    if (!row) throw new Error("Message not found");
    return this.rowToMessage(row);
  }

  // Catastrophe operations (in-memory, doesn't need persistence)
  async setForceCatastrophe(civilizationId: string): Promise<void> {
    this.forcedCatastrophes.add(civilizationId);
  }

  async checkForceCatastrophe(civilizationId: string): Promise<boolean> {
    return this.forcedCatastrophes.has(civilizationId);
  }

  async clearForceCatastrophe(civilizationId: string): Promise<void> {
    this.forcedCatastrophes.delete(civilizationId);
  }

  // Helper methods
  private rowToCivilization(row: any): Civilization {
    return {
      id: row.id,
      userId: row.user_id,
      userName: row.user_name,
      name: row.name,
      location: row.location,
      startingCentury: row.starting_century,
      currentCentury: row.current_century,
      timescale: row.timescale,
      customTimescale: row.custom_timescale,
      randomNumberEval: row.random_number_eval,
      customRandomNumber: row.custom_random_number,
      goalQuestions: row.goal_questions,
      enemyCivilization: row.enemy_civilization,
      enemyTechAdvancements: row.enemy_tech_advancements,
      civilizationStrengthPercentile: row.civilization_strength_percentile,
      catastropheTimer: row.catastrophe_timer,
      altruismStats: Boolean(row.altruism_stats),
      optimisticMode: Boolean(row.optimistic_mode),
      multiplayerMode: Boolean(row.multiplayer_mode),
      playerBName: row.player_b_name,
      playerBCivilizationName: row.player_b_civilization_name,
      playerBLocation: row.player_b_location,
      // Competitive mode fields
      competitiveMode: row.competitive_mode,
      playerBCurrentCentury: row.player_b_current_century,
      playerBSummary: row.player_b_summary,
      playerBStrengthPercentile: row.player_b_strength_percentile,
      competitiveTurnCount: row.competitive_turn_count,
      competitiveTotalTurns: row.competitive_total_turns,
      competitiveAutoPlay: Boolean(row.competitive_auto_play),
      playerAModel: row.player_a_model || "haiku",
      playerBModel: row.player_b_model || "haiku",
      simulatorModel: row.simulator_model || "sonnet",
      playerACustomPrompt: row.player_a_custom_prompt ?? null,
      playerBCustomPrompt: row.player_b_custom_prompt ?? null,
      maxSimulationTokens: row.max_simulation_tokens ?? 20000,
      maxGoalTokens: row.max_goal_tokens ?? 1024,
      playerATurnsPerRound: row.player_a_turns_per_round ?? 1,
      playerBTurnsPerRound: row.player_b_turns_per_round ?? 1,
      battleCode: row.battle_code ?? null,
      createdAt: new Date(row.created_at * 1000),
      lastPlayedAt: new Date(row.last_played_at * 1000),
    };
  }

  private rowToMessage(row: any): Message {
    return {
      id: row.id,
      civilizationId: row.civilization_id,
      role: row.role,
      messageType: row.message_type,
      content: row.content,
      randomNumber: row.random_number,
      playerRole: row.player_role,
      createdAt: new Date(row.created_at * 1000),
    };
  }

  private rowToBattle(row: any): Battle {
    return {
      id: row.id,
      civilizationId: row.civilization_id,
      turnNumber: row.turn_number,
      playerASummary: row.player_a_summary,
      playerBSummary: row.player_b_summary,
      battleType: row.battle_type,
      battleResult: row.battle_result,
      winner: row.winner,
      createdAt: new Date(row.created_at * 1000),
    };
  }

  // Battle operations
  async saveBattle(battleData: InsertBattle): Promise<Battle> {
    const id = generateId();
    const now = Math.floor(Date.now() / 1000);

    const stmt = sqlite.prepare(`
      INSERT INTO battles (
        id, civilization_id, turn_number, player_a_summary, player_b_summary,
        battle_type, battle_result, winner, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `);

    const row = stmt.get(
      id,
      battleData.civilizationId,
      battleData.turnNumber,
      battleData.playerASummary,
      battleData.playerBSummary,
      battleData.battleType,
      battleData.battleResult,
      battleData.winner ?? null,
      now
    ) as any;

    return this.rowToBattle(row);
  }

  async getBattles(civilizationId: string): Promise<Battle[]> {
    const stmt = sqlite.prepare(`
      SELECT * FROM battles
      WHERE civilization_id = ?
      ORDER BY created_at DESC
    `);
    const rows = stmt.all(civilizationId) as any[];
    return rows.map((row) => this.rowToBattle(row));
  }

  async getBattle(battleId: string): Promise<Battle | undefined> {
    const stmt = sqlite.prepare(`
      SELECT * FROM battles WHERE id = ?
    `);
    const row = stmt.get(battleId) as any;
    if (!row) return undefined;
    return this.rowToBattle(row);
  }

  async deleteBattle(battleId: string): Promise<void> {
    const stmt = sqlite.prepare(`DELETE FROM battles WHERE id = ?`);
    stmt.run(battleId);
  }
}
