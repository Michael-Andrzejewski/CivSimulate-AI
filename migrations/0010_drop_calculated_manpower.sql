-- Remove the unused "Calculated Manpower" option (stored but never read by any prompt or game logic)
ALTER TABLE civilizations DROP COLUMN IF EXISTS "calculated_manpower";
