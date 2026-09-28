ALTER TABLE "civilizations" ALTER COLUMN "random_number_eval" SET DEFAULT 'random';--> statement-breakpoint
ALTER TABLE "civilizations" ADD COLUMN "custom_random_number" text;