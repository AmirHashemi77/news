import "server-only";
import { categoryExistsBySlug } from "@/features/category/repository/category.repository";
import { getLatestNews, getNewsByCategory, getPopularNews, getPosterNews } from "../repository/newsList.repository";

export type GetNewsInput = {
  pageNumber: number;
  pageSize: number;
};

export async function getNewsByCategoryService({ pageNumber, pageSize, categorySlug }: GetNewsInput & { categorySlug: string }) {
  const existCategory = await categoryExistsBySlug(categorySlug);

  if (!existCategory) {
    return null;
  }
  const result = await getNewsByCategory({ pageNumber: pageNumber, pageSize: pageSize, categorySlug: categorySlug });

  return {
    pagination: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      totalCount: result.totalCount,
      totalPages: Math.ceil(result.totalCount / pageSize),
    },

    newsList: result.newsList,
  };
}

export async function getLatestNewsService({ pageNumber, pageSize }: GetNewsInput) {
  const result = await getLatestNews({
    pageNumber: pageNumber,
    pageSize: pageSize,
  });
  return {
    pagination: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      totalCount: result.totalCount,
      totalPages: Math.ceil(result.totalCount / pageSize),
    },

    newsList: result.newsList,
  };
}
export async function getPopularNewsService({ pageNumber, pageSize }: GetNewsInput) {
  const result = await getPopularNews({
    pageNumber: pageNumber,
    pageSize: pageSize,
  });
  return {
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
