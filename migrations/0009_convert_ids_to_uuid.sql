
-- Drop foreign key constraints first
ALTER TABLE "messages" DROP CONSTRAINT IF EXISTS "messages_civilization_id_civilizations_id_fk";
ALTER TABLE "civilizations" DROP CONSTRAINT IF EXISTS "civilizations_user_id_users_id_fk";

-- Clear existing data (cannot convert varchar IDs to UUIDs)
TRUNCATE TABLE "messages" CASCADE;
TRUNCATE TABLE "civilizations" CASCADE;
TRUNCATE TABLE "users" CASCADE;

-- Drop and recreate ID columns with UUID type
ALTER TABLE "messages" DROP COLUMN "id";
ALTER TABLE "messages" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid();

ALTER TABLE "messages" DROP COLUMN "civilization_id";
ALTER TABLE "messages" ADD COLUMN "civilization_id" uuid NOT NULL;

ALTER TABLE "civilizations" DROP COLUMN "id";
ALTER TABLE "civilizations" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid();

ALTER TABLE "civilizations" DROP COLUMN "user_id";
ALTER TABLE "civilizations" ADD COLUMN "user_id" uuid NOT NULL;

ALTER TABLE "users" DROP COLUMN "id";
ALTER TABLE "users" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid();

-- Recreate foreign key constraints
ALTER TABLE "messages" ADD CONSTRAINT "messages_civilization_id_civilizations_id_fk" 
  FOREIGN KEY ("civilization_id") REFERENCES "civilizations"("id") ON DELETE CASCADE;

ALTER TABLE "civilizations" ADD CONSTRAINT "civilizations_user_id_users_id_fk" 
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

-- Add new columns for multiplayer
ALTER TABLE "messages" ADD COLUMN IF NOT EXISTS "player_role" text;
ALTER TABLE "civilizations" ADD COLUMN IF NOT EXISTS "civilization_strength_percentile" integer;
ALTER TABLE "civilizations" ADD COLUMN IF NOT EXISTS "optimistic_mode" boolean DEFAULT false NOT NULL;
ALTER TABLE "civilizations" ADD COLUMN IF NOT EXISTS "multiplayer_mode" boolean DEFAULT false NOT NULL;
ALTER TABLE "civilizations" ADD COLUMN IF NOT EXISTS "player_b_name" text;
ALTER TABLE "civilizations" ADD COLUMN IF NOT EXISTS "player_b_civilization_name" text;
ALTER TABLE "civilizations" ADD COLUMN IF NOT EXISTS "player_b_location" text;
