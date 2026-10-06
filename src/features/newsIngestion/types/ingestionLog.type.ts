export enum IngestionStatus {
  RUNNING = "RUNNING",
  SUCCESS = "SUCCESS",
  PARTIAL_FAILED = "PARTIAL_FAILED",
  FAILED = "FAILED",
}

export type FinishIngestionLogInput = {
  id: string;

  status: IngestionStatus.SUCCESS | IngestionStatus.PARTIAL_FAILED;

  totalFetched: number;
  createdCount: number;
  skippedCount: number;
  failedCount: number;

  startedAt: Date;
};

export type FailIngestionLogInput = {
  id: string;
  startedAt: Date;
  errorMessage: string;

  totalFetched?: number;
  createdCount?: number;
  skippedCount?: number;
  failedCount?: number;
};
