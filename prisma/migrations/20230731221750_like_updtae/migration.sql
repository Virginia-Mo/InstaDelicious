-- AlterTable
ALTER TABLE "Likes" ADD COLUMN     "userslikes" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
