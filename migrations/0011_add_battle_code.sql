-- Shareable 5-digit battle code for PvP battles (pull a friend's civilization
-- into your battle "enemy" slot). Server-generated on demand.
ALTER TABLE civilizations ADD COLUMN IF NOT EXISTS "battle_code" text;
CREATE UNIQUE INDEX IF NOT EXISTS "idx_civilizations_battle_code" ON civilizations ("battle_code");
