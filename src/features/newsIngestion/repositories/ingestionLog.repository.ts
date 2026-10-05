import { prisma } from "@/shared/lib/prisma";

export enum IngestionStatus {
  RUNNING = "RUNNING",
  SUCCESS = "SUCCESS",
  PARTIAL_FAILED = "PARTIAL_FAILED",
  FAILED = "FAILED",
}

type FinishIngestionLogInput = {
  id: string;

  status: IngestionStatus.SUCCESS | IngestionStatus.PARTIAL_FAILED;

  totalFetched: number;
  createdCount: number;
  skippedCount: number;
  failedCount: number;

  startedAt: Date;
};

type FailIngestionLogInput = {
  id: string;
  startedAt: Date;
  errorMessage: string;

  totalFetched?: number;
  createdCount?: number;
  skippedCount?: number;
  failedCount?: number;
};

export async function createIngestionLog(sourceName: string) {
  return prisma.ingestionLog.create({
    data: {
      sourceName,
      status: IngestionStatus.RUNNING,
    },
    select: {
      id: true,
      sourceName: true,
      status: true,
      startedAt: true,
    },
  });
}

export async function finishIngestionLog(input: FinishIngestionLogInput) {
  const finishedAt = new Date();

  const durationMs = finishedAt.getTime() - input.startedAt.getTime();

  return prisma.ingestionLog.update({
    where: {
      id: input.id,
    },

    data: {
      status: input.status,

      totalFetched: input.totalFetched,
      createdCount: input.createdCount,
      skippedCount: input.skippedCount,
      failedCount: input.failedCount,

      finishedAt,
      durationMs,
    },
  });
}

export async function failIngestionLog(input: FailIngestionLogInput) {
  const finishedAt = new Date();

  const durationMs = finishedAt.getTime() - input.startedAt.getTime();

  return prisma.ingestionLog.update({
    where: {
      id: input.id,
    },

    data: {
      status: IngestionStatus.FAILED,

      totalFetched: input.totalFetched ?? 0,
      createdCount: input.createdCount ?? 0,
      skippedCount: input.skippedCount ?? 0,
      failedCount: input.failedCount ?? 1,

      errorMessage: input.errorMessage,

      finishedAt,
      durationMs,
    },
  });
}
