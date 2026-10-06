import Parser from "rss-parser";
import * as cheerio from "cheerio";
import { ArticleDetails } from "../types/ingestNewsType";
import { fetchWithRetry } from "@/shared/lib/retry";

const parser = new Parser();

const MEHR_RSS_URL = "https://www.mehrnews.com/rss";

export async function fetchMehrNewsLinks() {
  const feed = await parser.parseURL(MEHR_RSS_URL);

  return feed.items.map((item) => ({
    title: item.title ?? "",
    sourceUrl: item.link ?? "",
    publishDate: item.isoDate ?? item.pubDate ?? null,
  }));
}

function cleanMehrContent(content: string, title: string): string {
  let cleaned = content.replace(/\s+/g, " ").trim();

  if (cleaned.startsWith(title)) {
    cleaned = cleaned.slice(title.length).trim();
  }

  cleaned = cleaned.replace(/انتهای پیام\/.*$/u, "").trim();

  return cleaned;
}

export async function fetchMehrArticleDetails(sourceUrl: string, title: string): Promise<ArticleDetails> {
  const response = await fetchWithRetry(sourceUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",

      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",

      "Accept-Language": "fa-IR,fa;q=0.9,en;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Mehr article: ${response.status}`);
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

  content = cleanMehrContent(content, title);

  return {
    content,
    imageUrl,
  };
}
