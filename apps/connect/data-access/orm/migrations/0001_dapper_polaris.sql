DO $$ BEGIN
 CREATE TYPE "public"."account_type" AS ENUM('email', 'google', 'strava');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"account_type" "account_type" NOT NULL,
	"google_id" text,
	"strava_id" text,
	"hashed_password" text,
	"salt" text,
	CONSTRAINT "accounts_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "accounts_google_id_unique" UNIQUE("google_id"),
	CONSTRAINT "accounts_strava_id_unique" UNIQUE("strava_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"display_name" text,
	"user_role" "user_role" DEFAULT 'public',
	"image_url" text,
	"bio" text DEFAULT '' NOT NULL,
	CONSTRAINT "profile_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "email_verified" timestamp with time zone;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "hashed_password";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "user_role";