import { sql } from 'drizzle-orm';
import {
  boolean,
  doublePrecision,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`).$type<string>(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Civilizations table - stores up to 5 save files per user
export const civilizations = pgTable(
  "civilizations",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    userName: text("user_name").notNull(),
    name: text("name").notNull(),
    location: text("location").notNull(),
    startingCentury: integer("starting_century").notNull(), // e.g., -10000 for 10,000 BCE, 2000 for 2000 CE
    // double precision, NOT integer: day/week/month timescales advance by
    // fractional years (1 day = 1/365). Postgres rejects fractional values
    // for integer columns, so these timescales only ever worked on SQLite.
    currentCentury: doublePrecision("current_century").notNull(),
    timescale: text("timescale").notNull(), // "1 day", "1 week", "1 month", "1 year", "10 years", "100 years", "1000 years", "custom"
    customTimescale: text("custom_timescale"), // For custom timescale values
    randomNumberEval: text("random_number_eval").notNull().default("custom"), // "none", "random", "+1", "+2", "-1", "custom"
    customRandomNumber: text("custom_random_number").default("5"), // For custom fixed number (1-9)
    goalQuestions: text("goal_questions").notNull().default("none"), // "none", "one", "all"
    enemyCivilization: text("enemy_civilization").notNull().default("no"), // "no", "yes"
    catastropheTimer: text("catastrophe_timer").notNull().default("none"), // "none", "4 centuries", "5 centuries", "random 1/4th", "random 1/5th"
    altruismStats: boolean("altruism_stats").notNull().default(false),
    optimisticMode: boolean("optimistic_mode").notNull().default(false),
    enemyTechAdvancements: text("enemy_tech_advancements"), // Stores the generated comparable enemy civilization description
    civilizationStrengthPercentile: integer("civilization_strength_percentile"), // Stores the civilization's strength percentile (0-100)
    multiplayerMode: boolean("multiplayer_mode").notNull().default(false),
    playerBName: text("player_b_name"),
    playerBCivilizationName: text("player_b_civilization_name"),
    playerBLocation: text("player_b_location"),
    // Competitive mode fields
    competitiveMode: text("competitive_mode"), // "human_vs_ai" | "ai_vs_ai" | null
    playerBCurrentCentury: doublePrecision("player_b_current_century"),
    playerBSummary: text("player_b_summary"),
    playerBStrengthPercentile: integer("player_b_strength_percentile"),
    competitiveTurnCount: integer("competitive_turn_count").default(0),
    competitiveTotalTurns: integer("competitive_total_turns").default(10),
    competitiveAutoPlay: boolean("competitive_auto_play").default(false),
    playerAModel: text("player_a_model").default("haiku"), // Anthropic: "haiku" | "sonnet" | "opus" — OpenAI: "gpt-4.1" | "gpt-4.1-mini" | "gpt-5.2"
    playerBModel: text("player_b_model").default("haiku"), // Anthropic: "haiku" | "sonnet" | "opus" — OpenAI: "gpt-4.1" | "gpt-4.1-mini" | "gpt-5.2"
    // Custom system prompts (replace mode - if set, fully replaces default)
    playerACustomPrompt: text("player_a_custom_prompt"),
    playerBCustomPrompt: text("player_b_custom_prompt"),
    // Extra turns per round (for competitive mode)
    playerATurnsPerRound: integer("player_a_turns_per_round").default(1),
    playerBTurnsPerRound: integer("player_b_turns_per_round").default(1),
    // Configurable token limits
    maxSimulationTokens: integer("max_simulation_tokens").default(20000),
    maxGoalTokens: integer("max_goal_tokens").default(1024),
    simulatorModel: text("simulator_model").default("sonnet"),
    // Shareable 5-digit code: another player can enter it to pull this
    // civilization's latest summary into their battle "enemy" slot (PvP
    // battles). Server-managed — generated on demand, never client-writable.
    battleCode: text("battle_code").unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lastPlayedAt: timestamp("last_played_at").defaultNow().notNull(),
  },
);

export const civilizationsRelations = relations(civilizations, ({ one, many }) => ({
  user: one(users, {
    fields: [civilizations.userId],
    references: [users.id],
  }),
  messages: many(messages),
}));

export const usersRelations = relations(users, ({ many }) => ({
  civilizations: many(civilizations),
}));

export const insertCivilizationSchema = createInsertSchema(civilizations).omit({
  id: true,
  userId: true,
  createdAt: true,
  lastPlayedAt: true,
});

export type InsertCivilization = z.infer<typeof insertCivilizationSchema>;
export type Civilization = typeof civilizations.$inferSelect;

// Whitelist of fields the PATCH /api/civilizations/:id endpoint may update.
// Everything else (centuries, competitive turn counters, player B state,
// percentiles) is server-managed and writable only through dedicated
// endpoints. Unknown keys are stripped by zod, so the same request behaves
// identically on Postgres and SQLite.
export const updateCivilizationSchema = insertCivilizationSchema
  .pick({
    userName: true,
    name: true,
    location: true,
    timescale: true,
    customTimescale: true,
    randomNumberEval: true,
    customRandomNumber: true,
    goalQuestions: true,
    enemyCivilization: true,
    catastropheTimer: true,
    altruismStats: true,
    optimisticMode: true,
    enemyTechAdvancements: true,
    simulatorModel: true,
    playerAModel: true,
    playerBModel: true,
    playerACustomPrompt: true,
    playerBCustomPrompt: true,
    maxSimulationTokens: true,
    maxGoalTokens: true,
    playerATurnsPerRound: true,
    playerBTurnsPerRound: true,
    competitiveAutoPlay: true,
    competitiveTotalTurns: true,
  })
  .partial();

export type UpdateCivilization = z.infer<typeof updateCivilizationSchema>;

// Messages table - stores conversation history for each civilization
export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`).$type<string>(),
  civilizationId: varchar("civilization_id").notNull().references(() => civilizations.id, { onDelete: "cascade" }),
  role: text("role").notNull(), // "user" or "assistant"
  messageType: text("message_type").notNull().default("user_answer"), // "user_answer", "assistant_simulation", "system", "civilization_summary", "user_goals", "assistant_question"
  content: text("content").notNull(),
  randomNumber: text("random_number"), // The 10-digit random number used for evaluation
  playerRole: text("player_role"), // "player_a", "player_b", or null for single-player
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  civilization: one(civilizations, {
    fields: [messages.civilizationId],
    references: [civilizations.id],
  }),
}));

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export type Message = typeof messages.$inferSelect & {
  messageType?: string;
};
export type InsertMessage = typeof messages.$inferInsert;

export const messageTypeEnum = [
  "system",
  "user_goals",
  "user_answer",
  "user_discussion",
  "user_battle",
  "assistant_question",
  "assistant_simulation",
  "assistant_discussion",
  "assistant_battle",
  "civilization_summary",
  // Competitive mode message types
  "player_b_goals",       // AI player's generated goals
  "player_b_simulation",  // AI player's turn simulation
  "player_b_summary",     // AI player's civilization summary
] as const;

// Battles table - stored separately from main simulation for "what-if" scenarios
export const battles = pgTable("battles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  civilizationId: varchar("civilization_id").notNull().references(() => civilizations.id, { onDelete: "cascade" }),
  turnNumber: integer("turn_number").notNull(),
  playerASummary: text("player_a_summary").notNull(),
  playerBSummary: text("player_b_summary").notNull(),
  battleType: text("battle_type").notNull(), // "trade_war", "limited_war", "extermination_war"
  battleResult: text("battle_result").notNull(),
  winner: text("winner"), // "player_a", "player_b", "draw", or null if undetermined
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const battlesRelations = relations(battles, ({ one }) => ({
  civilization: one(civilizations, {
    fields: [battles.civilizationId],
    references: [civilizations.id],
  }),
}));

export const insertBattleSchema = createInsertSchema(battles).omit({
  id: true,
  createdAt: true,
});

export type Battle = typeof battles.$inferSelect;
export type InsertBattle = typeof battles.$inferInsert;

// ============================================================
// Multiplayer sessions — two players join a shared session via a 5-digit code.
// Host-locked: turn increment (years/turn) + current year. Per-player: name,
// kingdom, location, goals, summary.
// ============================================================
export const gameSessions = pgTable("game_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  joinCode: varchar("join_code").notNull().unique(),
  hostPlayerId: varchar("host_player_id"),
  turnIncrement: integer("turn_increment").notNull().default(100), // years per turn
  currentYear: integer("current_year").notNull().default(-10000), // negative = BCE
  turnNumber: integer("turn_number").notNull().default(0),
  phase: text("phase").notNull().default("lobby"), // lobby | goals | questions | simulating | results
  status: text("status").notNull().default("open"), // open | started | ended
  mapLog: text("map_log").notNull().default("[]"), // ordered ops, replayed deterministically by both clients
  mapSeed: integer("map_seed").notNull().default(0), // shared RNG seed so both clients render the same map
  lastSimulation: text("last_simulation"), // the most recent shared simulation narrative
  systemPrompt: text("system_prompt"), // host-editable shared-world rules; null = generated default
  randomDigit: integer("random_digit").notNull().default(0), // 0 = random luck per civ; 1-9 = fixed digit (e.g. all 5's)
  history: text("history").notNull().default("[]"), // full per-turn transcript (goals/questions/answers/sim per civ)
  soloPlayerId: varchar("solo_player_id"), // when set, an extra "time bubble" round is in progress for this player only
  addToCanon: boolean("add_to_canon").notNull().default(true), // when false, host-triggered wars are previews (not committed to memory/map/history)
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessionPlayers = pgTable("session_players", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`), // per-seat token
  sessionId: varchar("session_id").notNull().references(() => gameSessions.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull(),
  slot: integer("slot").notNull(), // 1 (host) or 2
  playerName: text("player_name"),
  kingdomName: text("kingdom_name"),
  location: text("location"),
  goals: text("goals"),
  questions: text("questions").notNull().default("[]"), // AI-generated questions for this player this turn
  answers: text("answers").notNull().default("[]"), // this player's free-form answer this turn
  summary: text("summary"),
  ready: boolean("ready").notNull().default(false),
  // Per-player simulation settings, carried from the create-civilization screen
  // and honored by the shared simulation (full parity with singleplayer).
  optimisticMode: boolean("optimistic_mode").notNull().default(false),
  altruismStats: boolean("altruism_stats").notNull().default(false),
  goalQuestions: text("goal_questions").notNull().default("one"), // none | one | all
  customPrompt: text("custom_prompt"), // per-player directives injected into their block
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export type GameSession = typeof gameSessions.$inferSelect;
export type SessionPlayer = typeof sessionPlayers.$inferSelect;