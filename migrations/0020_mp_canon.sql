-- Host "add to canon" toggle: when false, host-triggered wars are previews
-- (not committed to memory/map/history). Apply on Replit Postgres.
ALTER TABLE "game_sessions" ADD COLUMN IF NOT EXISTS "add_to_canon" boolean NOT NULL DEFAULT true;
