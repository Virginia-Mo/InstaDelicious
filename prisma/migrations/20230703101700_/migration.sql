/*
  Warnings:

  - The `following_user_id` column on the `Follower` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `follower_user_id` column on the `Follower` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Follower" DROP COLUMN "following_user_id",
ADD COLUMN     "following_user_id" INTEGER[],
DROP COLUMN "follower_user_id",
ADD COLUMN     "follower_user_id" INTEGER[];
