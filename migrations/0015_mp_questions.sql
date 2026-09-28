-- Multiplayer "questions" phase: per-player AI-generated strategy questions and
-- the player's answers (both stored as JSON arrays). Apply on Replit Postgres.
ALTER TABLE "session_players" ADD COLUMN IF NOT EXISTS "questions" text NOT NULL DEFAULT '[]';
ALTER TABLE "session_players" ADD COLUMN IF NOT EXISTS "answers" text NOT NULL DEFAULT '[]';
