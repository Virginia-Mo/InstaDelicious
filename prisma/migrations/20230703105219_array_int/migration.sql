-- AlterTable
ALTER TABLE "Follower" ALTER COLUMN "following_user_id" SET DEFAULT ARRAY[]::INTEGER[],
ALTER COLUMN "follower_user_id" SET DEFAULT ARRAY[]::INTEGER[];
