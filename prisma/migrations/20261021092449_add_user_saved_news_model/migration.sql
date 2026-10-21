/*
  Warnings:

  - You are about to drop the `_SavedNews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SavedNews" DROP CONSTRAINT "_SavedNews_A_fkey";

-- DropForeignKey
ALTER TABLE "_SavedNews" DROP CONSTRAINT "_SavedNews_B_fkey";

-- DropTable
DROP TABLE "_SavedNews";

-- CreateTable
CREATE TABLE "UserSavedNews" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "newsId" UUID NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSavedNews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserSavedNews_userId_savedAt_idx" ON "UserSavedNews"("userId", "savedAt");

-- CreateIndex
CREATE INDEX "UserSavedNews_newsId_idx" ON "UserSavedNews"("newsId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSavedNews_userId_newsId_key" ON "UserSavedNews"("userId", "newsId");

-- AddForeignKey
ALTER TABLE "UserSavedNews" ADD CONSTRAINT "UserSavedNews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSavedNews" ADD CONSTRAINT "UserSavedNews_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;
