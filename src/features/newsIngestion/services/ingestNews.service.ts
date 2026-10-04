import { newsExistsBySourceUrl, saveProcessedNews } from "../repositories/newsIngestion.repository";
import { NewsSource } from "../types/ingestNewsType";

import { processNewsWithAi } from "./processNewsWithAi.service";

export async function ingestNews(source: NewsSource, limit = 10) {
  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error("Invalid news ingestion limit");
  }

  // 1. Fetch RSS items
  const rssItems = await source.fetchNewsLinks();

  let created = 0;
  let skipped = 0;
  let failed = 0;

  // 2. Process articles
  for (const item of rssItems) {
    if (created >= limit) {
      break;
    }

    if (!item.title || !item.sourceUrl || !item.publishDate) {
      skipped++;
      continue;
    }

    try {
      // 3. Check duplicate
      const exists = await newsExistsBySourceUrl(item.sourceUrl);

      if (exists) {
        skipped++;
        continue;
      }

      // 4. Validate date
      const publishDate = new Date(item.publishDate);

      if (Number.isNaN(publishDate.getTime())) {
        skipped++;
        continue;
      }

      // 5. Fetch article details
      const details = await source.fetchArticleDetails(item.sourceUrl, item.title);

      // 6. Process with AvalAI
      const processed = await processNewsWithAi({
        title: item.title,
        content: details.content,
      });

      // 7. Save to PostgreSQL
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
        created++;
      } else {
        skipped++;
      }
    } catch (error) {
      failed++;

      console.error(`Failed to ingest news from ${source.name}:`, item.sourceUrl, error);
    }
  }

  return {
    agency: source.name,
    created,
    skipped,
    failed,
  };
}
