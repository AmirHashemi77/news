export interface NewsItem {
  id: string;
  title: string;
  subtitle: string;
  publishDate: Date;
  imageUrl: string | null;
  commentCount: number;
  viewCount: number;
  categories: Category[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  imageUrl?: string;
}

export interface NewsListCountData {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
export interface NewList {
  category: Category;
  pagination?: NewsListCountData;
  newsList: NewsItem[];
}
