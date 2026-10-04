import Parser from "rss-parser";
import * as cheerio from "cheerio";
import { ArticleDetails, RawNewsItem } from "../types/ingestNewsType";

const parser = new Parser();

const TASNIM_RSS_URL = "https://www.tasnimnews.ir/fa/rss/feed/0/0/8/1/TopStories";

export async function fetchTasnimNewsLinks() {
  const feed = await parser.parseURL(TASNIM_RSS_URL);

  return feed.items.map((item) => ({
    title: item.title ?? "",
    sourceUrl: item.link ?? "",
    publishDate: item.isoDate ?? item.pubDate ?? null,
  }));
}

function cleanTasnimContent(content: string, title: string): string {
  let cleaned = content.replace(/\s+/g, " ").trim();

  if (cleaned.startsWith(title)) {
    cleaned = cleaned.slice(title.length).trim();
  }

  cleaned = cleaned.replace(/انتهای پیام\/.*$/u, "").trim();

  return cleaned;
}

export async function fetchTasnimArticleDetails(sourceUrl: string, title: string): Promise<ArticleDetails> {
  const response = await fetch(sourceUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; NewsAggregator/1.0)",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Tasnim article: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const imageUrl = $('meta[property="og:image"]').attr("content") || undefined;

  $("script, style, iframe, noscript").remove();

  const contentSelectors = ['[itemprop="articleBody"]', ".article-body", ".news-body", ".story-content", "article"];

  let content = "";

  for (const selector of contentSelectors) {
    const value = $(selector).text().replace(/\s+/g, " ").trim();

    if (value.length > content.length) {
      content = value;
    }
  }

  if (!content) {
    throw new Error(`Tasnim article content not found: ${sourceUrl}`);
  }

  content = cleanTasnimContent(content, title);

  return {
    content,
    imageUrl,
  };
}

export async function fetchTasnimLatestNews(): Promise<RawNewsItem[]> {
  const rssItems = await fetchTasnimNewsLinks();

  const item = rssItems[0];

  if (!item || !item.title || !item.sourceUrl || !item.publishDate) {
    return [];
  }

  const details = await fetchTasnimArticleDetails(item.sourceUrl, item.title);

  return [
    {
      title: item.title,
      content: details.content,

      sourceUrl: item.sourceUrl,
      imageUrl: details.imageUrl,

      publishDate: new Date(item.publishDate),

      agencyName: "Tasnim",
      language: "fa",
    },
  ];
}
