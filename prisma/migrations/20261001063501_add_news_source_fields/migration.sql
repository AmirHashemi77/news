/*
  Warnings:

  - A unique constraint covering the columns `[sourceUrl]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sourceUrl` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "sourceUrl" TEXT NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "News_sourceUrl_key" ON "News"("sourceUrl");
