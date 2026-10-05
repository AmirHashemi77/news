import { createIngestionLog, failIngestionLog, finishIngestionLog, IngestionStatus } from "../repositories/ingestionLog.repository";

type FinishMonitoringInput = {
  id: string;
  startedAt: Date;

  totalFetched: number;
  createdCount: number;
  skippedCount: number;
  failedCount: number;
};

type FailMonitoringInput = {
  id: string;
  startedAt: Date;

  error: unknown;

  totalFetched?: number;
  createdCount?: number;
  skippedCount?: number;
  failedCount?: number;
};

export async function startIngestionMonitoring(sourceName: string) {
  return createIngestionLog(sourceName);
}

export async function finishIngestionMonitoring(input: FinishMonitoringInput) {
  const status = input.failedCount > 0 ? IngestionStatus.PARTIAL_FAILED : IngestionStatus.SUCCESS;

  return finishIngestionLog({
    id: input.id,
    startedAt: input.startedAt,

    status,

    totalFetched: input.totalFetched,
    createdCount: input.createdCount,
    skippedCount: input.skippedCount,
    failedCount: input.failedCount,
  });
}

export async function failIngestionMonitoring(input: FailMonitoringInput) {
  const errorMessage = input.error instanceof Error ? input.error.message : "Unknown ingestion error";

  return failIngestionLog({
    id: input.id,
    startedAt: input.startedAt,

    errorMessage,

    totalFetched: input.totalFetched,
    createdCount: input.createdCount,
    skippedCount: input.skippedCount,
    failedCount: input.failedCount,
  });
}
