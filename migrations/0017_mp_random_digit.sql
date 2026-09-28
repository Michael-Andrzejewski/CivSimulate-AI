-- Host-controlled luck: 0 = random per civ; 1-9 = a fixed digit (e.g. all 5's)
-- so outcomes ride on answer quality alone. Editable mid-game by the host.
ALTER TABLE "game_sessions" ADD COLUMN IF NOT EXISTS "random_digit" integer NOT NULL DEFAULT 0;
