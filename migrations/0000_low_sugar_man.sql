CREATE TABLE "civilizations" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"name" text NOT NULL,
	"location" text NOT NULL,
	"starting_century" integer NOT NULL,
	"current_century" integer NOT NULL,
	"timescale" text NOT NULL,
	"custom_timescale" text,
	"random_number_eval" text DEFAULT 'default' NOT NULL,
	"goal_questions" text DEFAULT 'none' NOT NULL,
	"calculated_manpower" text DEFAULT 'no' NOT NULL,
	"enemy_civilization" text DEFAULT 'no' NOT NULL,
	"catastrophe_timer" text DEFAULT 'none' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_played_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"civilization_id" varchar NOT NULL,
	"role" text NOT NULL,
	"message_type" text DEFAULT 'user_answer' NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" jsonb NOT NULL,
	"expire" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"profile_image_url" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "civilizations" ADD CONSTRAINT "civilizations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_civilization_id_civilizations_id_fk" FOREIGN KEY ("civilization_id") REFERENCES "public"."civilizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "IDX_session_expire" ON "sessions" USING btree ("expire");