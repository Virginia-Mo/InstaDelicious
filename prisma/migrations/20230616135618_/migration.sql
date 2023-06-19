/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Follower` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Follower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Follower" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Follower_userId_key" ON "Follower"("userId");

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
