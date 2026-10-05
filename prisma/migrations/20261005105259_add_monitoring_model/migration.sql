-- CreateEnum
CREATE TYPE "IngestionStatus" AS ENUM ('RUNNING', 'SUCCESS', 'PARTIAL_FAILED', 'FAILED');

-- CreateTable
CREATE TABLE "IngestionLog" (
    "id" UUID NOT NULL,
    "sourceName" TEXT NOT NULL,
    "status" "IngestionStatus" NOT NULL DEFAULT 'RUNNING',
    "totalFetched" INTEGER NOT NULL DEFAULT 0,
    "createdCount" INTEGER NOT NULL DEFAULT 0,
    "skippedCount" INTEGER NOT NULL DEFAULT 0,
    "failedCount" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "durationMs" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IngestionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IngestionLog_sourceName_startedAt_idx" ON "IngestionLog"("sourceName", "startedAt");

-- CreateIndex
CREATE INDEX "IngestionLog_status_idx" ON "IngestionLog"("status");

-- CreateIndex
CREATE INDEX "IngestionLog_startedAt_idx" ON "IngestionLog"("startedAt");
