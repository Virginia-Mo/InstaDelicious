/*
  Warnings:

  - The primary key for the `PostToTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tagId` on the `PostToTag` table. All the data in the column will be lost.
  - Added the required column `tagName` to the `PostToTag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostToTag" DROP CONSTRAINT "PostToTag_tagId_fkey";

-- AlterTable
ALTER TABLE "PostToTag" DROP CONSTRAINT "PostToTag_pkey",
DROP COLUMN "tagId",
ADD COLUMN     "tagName" TEXT NOT NULL,
ADD CONSTRAINT "PostToTag_pkey" PRIMARY KEY ("postId", "tagName");

-- AddForeignKey
ALTER TABLE "PostToTag" ADD CONSTRAINT "PostToTag_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag"("name") ON DELETE CASCADE ON UPDATE CASCADE;
