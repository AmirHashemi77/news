import { newsSources } from "@/features/newsIngestion/config/newsSources";

import { runMonitoredIngestion } from "@/features/newsIngestion/services/runMonitoredIngestion.service";

export const runtime = "nodejs";

export async function POST() {
  try {
    const results = await Promise.allSettled(newsSources.map((source) => runMonitoredIngestion(source, 10)));

    return Response.json({
      status: "completed",
      results,
    });
  } catch (error) {
    console.error("News ingestion execution failed:", error);

    return Response.json(
      {
        status: "error",
      },
      {
        status: 500,
      },
    );
  }
}
