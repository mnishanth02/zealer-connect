ALTER TABLE "user" ADD COLUMN "user_role" "user_role" DEFAULT 'public';--> statement-breakpoint
ALTER TABLE "profile" DROP COLUMN IF EXISTS "user_role";