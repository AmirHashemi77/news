import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/shared/lib/prisma";
import type { SearchQuery } from "../schemas/search.schema";

export async function getSearchNews({ searchText, pageNumber, pageSize }: SearchQuery) {
  const skip = (pageNumber - 1) * pageSize;
  const text = searchText.replace(/[\\%_]/g, "\\$&");
  console.log(searchText);

  const where: Prisma.NewsWhereInput = {
    OR: [{ title: { contains: text, mode: "insensitive" } }, { subtitle: { contains: text, mode: "insensitive" } }],
  };

  const [totalCount, news] = await Promise.all([
    prisma.news.count({ where }),
    prisma.news.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: [{ publishDate: "desc" }, { id: "desc" }],
      select: {
        id: true,
        title: true,
        subtitle: true,
        publishDate: true,
        imageUrl: true,
        viewCount: true,
        _count: { select: { comments: true } },
        categories: { select: { id: true, slug: true, name: true } },
      },
    }),
  ]);

  return {
    totalCount,
    newsList: news.map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      publishDate: item.publishDate,
      imageUrl: item.imageUrl,
      viewCount: item.viewCount,
      commentCount: item._count.comments,
      categories: item.categories,
    })),
  };
}
