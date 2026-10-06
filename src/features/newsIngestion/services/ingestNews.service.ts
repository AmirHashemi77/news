import { newsExistsBySourceUrl, saveProcessedNews } from "../repositories/newsIngestion.repository";
import { IngestNewsResult, NewsSource } from "../types/ingestNewsType";

import { processNewsWithAi } from "./processNewsWithAi.service";

export async function ingestNews(source: NewsSource, limit = 10): Promise<IngestNewsResult> {
  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error("Invalid news ingestion limit");
  }

  const rssItems = await source.fetchNewsLinks();

  let createdCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  const errors: IngestNewsResult["errors"] = [];

  for (const item of rssItems) {
    if (createdCount >= limit) {
      break;
    }

    if (!item.title || !item.sourceUrl || !item.publishDate) {
      skippedCount++;
      continue;
    }

    try {
      const exists = await newsExistsBySourceUrl(item.sourceUrl);

      if (exists) {
        skippedCount++;
        continue;
      }

      const publishDate = new Date(item.publishDate);

      if (Number.isNaN(publishDate.getTime())) {
        skippedCount++;
        continue;
      }

      const details = await source.fetchArticleDetails(item.sourceUrl, item.title);

      const processed = await processNewsWithAi({
        title: item.title,
        content: details.content,
      });

      const result = await saveProcessedNews({
        title: item.title,

        subtitle: processed.subtitle,
        content: processed.content,

        sourceUrl: item.sourceUrl,
        imageUrl: details.imageUrl,

        publishDate,
        agencyName: source.name,

        categorySlugs: processed.categorySlugs,
      });

      if (result.status === "created") {
        createdCount++;
      } else {
        skippedCount++;
      }
    } catch (error) {
      failedCount++;

      errors.push({
        sourceUrl: item.sourceUrl,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return {
    agency: source.name,

    totalFetched: rssItems.length,

    createdCount,
    skippedCount,
    failedCount,

    errors,
  };
}
