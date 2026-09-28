-- Multiplayer round state: deterministic map log + last shared simulation.
ALTER TABLE game_sessions ADD COLUMN IF NOT EXISTS map_log text NOT NULL DEFAULT '[]';
ALTER TABLE game_sessions ADD COLUMN IF NOT EXISTS map_seed integer NOT NULL DEFAULT 0;
ALTER TABLE game_sessions ADD COLUMN IF NOT EXISTS last_simulation text;
