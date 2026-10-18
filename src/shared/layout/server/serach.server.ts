import "server-only";
import { getSearchNews } from "../repository/search.repository";
import { searchQuerySchema, searchTextSchema, type SearchQueryInput } from "../schemas/search.schema";

export function getSearchPathService(searchText: unknown) {
  const parsed = searchTextSchema.safeParse(searchText);

  if (!parsed.success) {
    return {
      status: "validation-error" as const,
      message: parsed.error.issues[0].message,
    };
  }

  return {
    status: "success" as const,
    path: `/search?${new URLSearchParams({ searchQuery: parsed.data }).toString()}`,
  };
}

export async function getSearchNewsService(input: SearchQueryInput) {
  const parsed = searchQuerySchema.safeParse(input);

  if (!parsed.success) {
    return null;
  }

  const { searchText, pageNumber, pageSize } = parsed.data;
  const result = await getSearchNews({ searchText, pageNumber, pageSize });

  return {
    searchText,
    category: {
      id: "search",
      slug: "search",
      name: "خبرهای پیدا شده",
    },
    pagination: {
      pageNumber,
      pageSize,
      totalCount: result.totalCount,
      totalPages: Math.ceil(result.totalCount / pageSize),
    },
    newsList: result.newsList,
  };
}
