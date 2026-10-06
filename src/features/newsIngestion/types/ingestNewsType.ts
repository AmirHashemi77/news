export type RawNewsItem = {
  title: string;
  content: string;

  sourceUrl: string;
  imageUrl?: string;

  publishDate: Date;

  agencyName: string;
  language: "fa" | "en";
};
export type NewsLink = {
  title: string;
  sourceUrl: string;
  publishDate: string | null;
};

export type ArticleDetails = {
  content: string;
  imageUrl?: string;
};

export type NewsSource = {
  name: string;

  fetchNewsLinks: () => Promise<NewsLink[]>;

  fetchArticleDetails: (sourceUrl: string, title: string) => Promise<ArticleDetails>;
};

export type IngestNewsResult = {
  agency: string;

  totalFetched: number;
  createdCount: number;
  skippedCount: number;
  failedCount: number;

  errors: {
    sourceUrl: string;
    message: string;
  }[];
};
