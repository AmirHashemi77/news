import { newsSources } from "@/features/newsIngestion/config/newsSources";
import { ingestNews } from "@/features/newsIngestion/services/ingestNews.service";

export const runtime = "nodejs";

export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const results = [];

  for (const source of newsSources) {
    try {
      const result = await ingestNews(source, 10);

      results.push(result);
    } catch (error) {
      console.error(`Failed to ingest ${source.name}:`, error);

      results.push({
        agency: source.name,
        created: 0,
        skipped: 0,
        failed: 1,
        status: "source_error",
      });
    }
  }

  return Response.json({
    status: "completed",
    results,
  });
}
