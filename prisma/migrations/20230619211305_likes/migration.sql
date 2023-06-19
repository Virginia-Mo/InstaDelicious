/*
  Warnings:

  - You are about to drop the column `number` on the `Likes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Likes" DROP COLUMN "number",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0;
