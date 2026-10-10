import { prisma } from "@/shared/lib/prisma";

export async function getNewsDetails(newsId: string) {
  const news = await prisma.news.findUnique({
    where: {
      id: newsId,
    },
    select: {
      id: true,
      title: true,
      subtitle: true,
      imageUrl: true,
      content: true,
      publishDate: true,
      newsAgency: true,
      viewCount: true,
      categories: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!news) {
    return null;
  }
  return {
    id: news.id,
    title: news.title,
    subtitle: news.subtitle,
    publishDate: news.publishDate,
    imageUrl: news.imageUrl,
    content: news.content,
    newsAgency: news.newsAgency,
    categories: news.categories,
    viewCount: news.viewCount,
  };
}
export async function incrementNewsViewCount(newsId: string) {
  const result = await prisma.news.updateMany({
    where: {
      id: newsId,
    },

    data: {
      viewCount: {
        increment: 1,
      },
    },
  });

  return result.count > 0;
}
