import "server-only";
import { categoryExistsBySlug } from "@/features/category/repository/category.repository";
import { getLatestNews, getNewsByCategory, getPopularNews, getPosterNews } from "../repository/newsList.repository";
import { GetNewsInput } from "../types/NewsList.type";

export async function getNewsByCategoryService({ pageNumber, pageSize, categorySlug, fromDate, title, toDate }: GetNewsInput & { categorySlug: string }) {
  const existCategory = await categoryExistsBySlug(categorySlug);

  if (!existCategory) {
    return null;
  }
  const result = await getNewsByCategory({ pageNumber: pageNumber, pageSize: pageSize, categorySlug: categorySlug, fromDate: fromDate, title: title, toDate: toDate });
  return {
    category: existCategory,
    pagination: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      totalCount: result.totalCount,
      totalPages: Math.ceil(result.totalCount / pageSize),
    },

    newsList: result.newsList,
  };
}

export async function getLatestNewsService({ pageNumber, pageSize, title }: GetNewsInput) {
  const result = await getLatestNews({
    pageNumber: pageNumber,
    pageSize: pageSize,
    title,
  });
  return {
    category: {
      id: "latestNews",
      slug: "/latestNews",
      name: "آخرین خبر",
    },
    pagination: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      totalCount: result.totalCount,
      totalPages: Math.ceil(result.totalCount / pageSize),
    },

    newsList: result.newsList,
  };
}
export async function getPopularNewsService({ pageNumber, pageSize, title }: GetNewsInput) {
  const result = await getPopularNews({
    pageNumber: pageNumber,
    pageSize: pageSize,
    title,
  });
  return {
    category: {
      id: "popularNews",
      slug: "/popularNews",
      name: "اخبار منتخب",
    },
    pagination: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      totalCount: result.totalCount,
      totalPages: Math.ceil(result.totalCount / pageSize),
    },

    newsList: result.newsList,
  };
}
export async function getPosterNewsService() {
  const result = await getPosterNews();

  return {
    newsList: result.newsList,
  };
}
