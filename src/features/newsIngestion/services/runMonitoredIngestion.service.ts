import { NewsSource } from "../types/ingestNewsType";
import { failIngestionMonitoring, finishIngestionMonitoring, startIngestionMonitoring } from "./ingestionMonitor.service";
import { ingestNews } from "./ingestNews.service";

export async function runMonitoredIngestion(source: NewsSource, limit = 10) {
  const monitor = await startIngestionMonitoring(source.name);

  try {
    const result = await ingestNews(source, limit);

    await finishIngestionMonitoring({
      id: monitor.id,
      startedAt: monitor.startedAt,

      totalFetched: result.totalFetched,
      createdCount: result.createdCount,
      skippedCount: result.skippedCount,
      failedCount: result.failedCount,
    });

    return result;
  } catch (error) {
    await failIngestionMonitoring({
      id: monitor.id,
      startedAt: monitor.startedAt,
      error,
    });

    throw error;
  }
}
