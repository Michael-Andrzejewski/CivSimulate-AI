
-- Reset civilizationStrengthPercentile to NULL so first catastrophe uses location-based matching
UPDATE "civilizations" SET "civilization_strength_percentile" = NULL WHERE "civilization_strength_percentile" IS NOT NULL;
