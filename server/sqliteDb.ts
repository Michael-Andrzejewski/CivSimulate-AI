/**
 * SQLite database configuration for local development
 * Uses better-sqlite3 with Drizzle ORM for persistent local storage
 */
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { sql } from "drizzle-orm";
import path from "path";
import fs from "fs";

// Database file location - in the project's data directory
const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "civsimulate.db");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log("[SQLite] Created data directory:", DATA_DIR);
}

// Create SQLite connection
const sqlite = new Database(DB_PATH);
sqlite.pragma("journal_mode = WAL"); // Better performance for concurrent access
// SQLite ignores ON DELETE CASCADE (and all FK enforcement) unless this is
// enabled per-connection — without it, deleting a civilization orphaned all
// of its messages and battles
sqlite.pragma("foreign_keys = ON");

export const sqliteDb = drizzle(sqlite);

// Initialize database schema
export function initializeSqliteSchema() {
  console.log("[SQLite] Initializing database schema...");

  // Create sessions table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      sid TEXT PRIMARY KEY,
      sess TEXT NOT NULL,
      expire INTEGER NOT NULL
    )
  `);
  sqlite.exec(`CREATE INDEX IF NOT EXISTS idx_session_expire ON sessions(expire)`);

  // Create users table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      email TEXT UNIQUE,
      first_name TEXT,
      last_name TEXT,
      profile_image_url TEXT,
      created_at INTEGER DEFAULT (unixepoch()),
      updated_at INTEGER DEFAULT (unixepoch())
    )
  `);

  // Create civilizations table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS civilizations (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      user_name TEXT NOT NULL,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      starting_century INTEGER NOT NULL,
      current_century INTEGER NOT NULL,
      timescale TEXT NOT NULL,
      custom_timescale TEXT,
      random_number_eval TEXT NOT NULL DEFAULT 'custom',
      custom_random_number TEXT DEFAULT '5',
      goal_questions TEXT NOT NULL DEFAULT 'none',
      enemy_civilization TEXT NOT NULL DEFAULT 'no',
      catastrophe_timer TEXT NOT NULL DEFAULT 'none',
      altruism_stats INTEGER NOT NULL DEFAULT 0,
      optimistic_mode INTEGER NOT NULL DEFAULT 0,
      enemy_tech_advancements TEXT,
      civilization_strength_percentile INTEGER,
      multiplayer_mode INTEGER NOT NULL DEFAULT 0,
      player_b_name TEXT,
      player_b_civilization_name TEXT,
      player_b_location TEXT,
      competitive_mode TEXT,
      player_b_current_century INTEGER,
      player_b_summary TEXT,
      player_b_strength_percentile INTEGER,
      competitive_turn_count INTEGER DEFAULT 0,
      competitive_total_turns INTEGER DEFAULT 10,
      competitive_auto_play INTEGER DEFAULT 0,
      player_a_model TEXT DEFAULT 'haiku',
      player_b_model TEXT DEFAULT 'haiku',
      simulator_model TEXT DEFAULT 'sonnet',
      player_a_custom_prompt TEXT,
      player_b_custom_prompt TEXT,
      max_simulation_tokens INTEGER DEFAULT 20000,
      max_goal_tokens INTEGER DEFAULT 1024,
      player_a_turns_per_round INTEGER DEFAULT 1,
      player_b_turns_per_round INTEGER DEFAULT 1,
      battle_code TEXT,
      created_at INTEGER DEFAULT (unixepoch()),
      last_played_at INTEGER DEFAULT (unixepoch())
    )
  `);

  // Migrations: add columns for existing databases (ALTER fails harmlessly if
  // the column already exists)
  const columnMigrations = [
    `ALTER TABLE civilizations ADD COLUMN simulator_model TEXT DEFAULT 'sonnet'`,
    `ALTER TABLE civilizations ADD COLUMN player_a_custom_prompt TEXT`,
    `ALTER TABLE civilizations ADD COLUMN player_b_custom_prompt TEXT`,
    `ALTER TABLE civilizations ADD COLUMN max_simulation_tokens INTEGER DEFAULT 20000`,
    `ALTER TABLE civilizations ADD COLUMN max_goal_tokens INTEGER DEFAULT 1024`,
    `ALTER TABLE civilizations ADD COLUMN player_a_turns_per_round INTEGER DEFAULT 1`,
    `ALTER TABLE civilizations ADD COLUMN player_b_turns_per_round INTEGER DEFAULT 1`,
    `ALTER TABLE civilizations ADD COLUMN battle_code TEXT`,
  ];
  for (const migration of columnMigrations) {
    try {
      sqlite.exec(migration);
    } catch (e: any) {
      // Column already exists — ignore
    }
  }

  // SQLite can't add a UNIQUE constraint via ALTER TABLE — enforce battle-code
  // uniqueness with an index instead
  sqlite.exec(
    `CREATE UNIQUE INDEX IF NOT EXISTS idx_civilizations_battle_code ON civilizations(battle_code)`,
  );

  // Create messages table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      civilization_id TEXT NOT NULL REFERENCES civilizations(id) ON DELETE CASCADE,
      role TEXT NOT NULL,
      message_type TEXT NOT NULL DEFAULT 'user_answer',
      content TEXT NOT NULL,
      random_number TEXT,
      player_role TEXT,
      created_at INTEGER DEFAULT (unixepoch())
    )
  `);

  // Multiplayer sessions
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS game_sessions (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      join_code TEXT UNIQUE NOT NULL,
      host_player_id TEXT,
      turn_increment INTEGER NOT NULL DEFAULT 100,
      current_year INTEGER NOT NULL DEFAULT -10000,
      turn_number INTEGER NOT NULL DEFAULT 0,
      phase TEXT NOT NULL DEFAULT 'lobby',
      status TEXT NOT NULL DEFAULT 'open',
      map_log TEXT NOT NULL DEFAULT '[]',
      map_seed INTEGER NOT NULL DEFAULT 0,
      last_simulation TEXT,
      system_prompt TEXT,
      random_digit INTEGER NOT NULL DEFAULT 0,
      history TEXT NOT NULL DEFAULT '[]',
      solo_player_id TEXT,
      add_to_canon INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER DEFAULT (unixepoch()),
      updated_at INTEGER DEFAULT (unixepoch())
    )
  `);
  for (const m of [
    `ALTER TABLE game_sessions ADD COLUMN map_log TEXT NOT NULL DEFAULT '[]'`,
    `ALTER TABLE game_sessions ADD COLUMN map_seed INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE game_sessions ADD COLUMN last_simulation TEXT`,
    `ALTER TABLE game_sessions ADD COLUMN system_prompt TEXT`,
    `ALTER TABLE game_sessions ADD COLUMN random_digit INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE game_sessions ADD COLUMN history TEXT NOT NULL DEFAULT '[]'`,
    `ALTER TABLE game_sessions ADD COLUMN solo_player_id TEXT`,
    `ALTER TABLE game_sessions ADD COLUMN add_to_canon INTEGER NOT NULL DEFAULT 1`,
  ]) {
    try { sqlite.exec(m); } catch { /* column exists */ }
  }
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS session_players (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      session_id TEXT NOT NULL REFERENCES game_sessions(id) ON DELETE CASCADE,
      user_id TEXT NOT NULL,
      slot INTEGER NOT NULL,
      player_name TEXT,
      kingdom_name TEXT,
      location TEXT,
      goals TEXT,
      questions TEXT NOT NULL DEFAULT '[]',
      answers TEXT NOT NULL DEFAULT '[]',
      summary TEXT,
      ready INTEGER NOT NULL DEFAULT 0,
      optimistic_mode INTEGER NOT NULL DEFAULT 0,
      altruism_stats INTEGER NOT NULL DEFAULT 0,
      goal_questions TEXT NOT NULL DEFAULT 'one',
      custom_prompt TEXT,
      joined_at INTEGER DEFAULT (unixepoch())
    )
  `);
  for (const m of [
    `ALTER TABLE session_players ADD COLUMN questions TEXT NOT NULL DEFAULT '[]'`,
    `ALTER TABLE session_players ADD COLUMN answers TEXT NOT NULL DEFAULT '[]'`,
    `ALTER TABLE session_players ADD COLUMN optimistic_mode INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE session_players ADD COLUMN altruism_stats INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE session_players ADD COLUMN goal_questions TEXT NOT NULL DEFAULT 'one'`,
    `ALTER TABLE session_players ADD COLUMN custom_prompt TEXT`,
  ]) {
    try { sqlite.exec(m); } catch { /* column exists */ }
  }

  // Create battles table for competitive mode "what-if" scenarios
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS battles (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      civilization_id TEXT NOT NULL REFERENCES civilizations(id) ON DELETE CASCADE,
      turn_number INTEGER NOT NULL,
      player_a_summary TEXT NOT NULL,
      player_b_summary TEXT NOT NULL,
      battle_type TEXT NOT NULL,
      battle_result TEXT NOT NULL,
      winner TEXT,
      created_at INTEGER DEFAULT (unixepoch())
    )
  `);

  console.log("[SQLite] Database schema initialized at:", DB_PATH);
}

// Export the raw sqlite instance for session store
export { sqlite, DB_PATH };
