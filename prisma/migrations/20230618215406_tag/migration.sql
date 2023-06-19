/*
  Warnings:

  - You are about to drop the column `tagId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_tagId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "tagId",
ADD COLUMN     "tagName" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
