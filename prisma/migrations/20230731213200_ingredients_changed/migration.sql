/*
  Warnings:

  - The `ingredients` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "ingredients",
ADD COLUMN     "ingredients" TEXT[] DEFAULT ARRAY[]::TEXT[];
