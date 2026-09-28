-- Multiplayer: two players join a shared session via a 5-digit code.
CREATE TABLE IF NOT EXISTS game_sessions (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  join_code varchar NOT NULL UNIQUE,
  host_player_id varchar,
  turn_increment integer NOT NULL DEFAULT 100,
  current_year integer NOT NULL DEFAULT -10000,
  turn_number integer NOT NULL DEFAULT 0,
  phase text NOT NULL DEFAULT 'lobby',
  status text NOT NULL DEFAULT 'open',
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS session_players (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id varchar NOT NULL REFERENCES game_sessions(id) ON DELETE CASCADE,
  user_id varchar NOT NULL,
  slot integer NOT NULL,
  player_name text,
  kingdom_name text,
  location text,
  goals text,
  summary text,
  ready boolean NOT NULL DEFAULT false,
  joined_at timestamp NOT NULL DEFAULT now()
);
