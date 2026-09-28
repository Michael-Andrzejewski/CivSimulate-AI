-- Multiplayer prompt parity with singleplayer: a host-editable shared world
-- system prompt, plus per-player simulation settings carried from the
-- create-civilization screen. Apply on Replit Postgres.
ALTER TABLE "game_sessions" ADD COLUMN IF NOT EXISTS "system_prompt" text;
ALTER TABLE "session_players" ADD COLUMN IF NOT EXISTS "optimistic_mode" boolean NOT NULL DEFAULT false;
ALTER TABLE "session_players" ADD COLUMN IF NOT EXISTS "altruism_stats" boolean NOT NULL DEFAULT false;
ALTER TABLE "session_players" ADD COLUMN IF NOT EXISTS "goal_questions" text NOT NULL DEFAULT 'one';
ALTER TABLE "session_players" ADD COLUMN IF NOT EXISTS "custom_prompt" text;
