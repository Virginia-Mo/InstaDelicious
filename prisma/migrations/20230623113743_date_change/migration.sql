-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "createdAt" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Follower" ALTER COLUMN "createdAt" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Likes" ALTER COLUMN "createdAt" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "createdAt" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "PostToTag" ALTER COLUMN "createdAt" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "createdAt" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DATA TYPE DATE;
