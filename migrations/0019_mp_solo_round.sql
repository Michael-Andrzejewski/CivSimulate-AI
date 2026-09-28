-- Host-granted "time bubble" extra round: marks which player is taking a solo
-- bonus round (null = none). Apply on Replit Postgres.
ALTER TABLE "game_sessions" ADD COLUMN IF NOT EXISTS "solo_player_id" varchar;
