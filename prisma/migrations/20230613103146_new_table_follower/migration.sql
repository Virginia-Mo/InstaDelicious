/*
  Warnings:

  - You are about to drop the column `followersId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "followersId";

-- CreateTable
CREATE TABLE "Follower" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "following_user_id" INTEGER NOT NULL,
    "follower_user_id" INTEGER NOT NULL,

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("id")
);
