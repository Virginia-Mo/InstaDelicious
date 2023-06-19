/*
  Warnings:

  - The primary key for the `PostToTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PostToTag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PostToTag" DROP CONSTRAINT "PostToTag_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PostToTag_pkey" PRIMARY KEY ("postId", "tagId");
