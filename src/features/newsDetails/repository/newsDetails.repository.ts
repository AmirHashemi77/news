import { prisma } from "@/shared/lib/prisma";
import { RecordNewsViewInput } from "../types/newsDetails.type";

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
export async function getNewsComments(newsId: string) {
  const news = await prisma.news.findUnique({
    where: {
      id: newsId,
    },

    select: {
      comments: {
        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          commentText: true,
          createdAt: true,

          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  if (!news) {
    return null;
  }

  return {
    comments: news.comments,
  };
}

export async function recordNewsView({ newsId, userId }: RecordNewsViewInput) {
  return await prisma.userNewsView.upsert({
    where: {
      userId_newsId: {
        userId,
        newsId,
      },
    },
    create: {
      userId,
      newsId,
    },
    update: {
      viewedAt: new Date(),
    },
    select: {
      id: true,
      userId: true,
      newsId: true,
      viewedAt: true,
    },
  });
}

export async function savedNewsHandler({ newsId, userId }: RecordNewsViewInput) {
  return await prisma.userSavedNews.upsert({
    where: {
      userId_newsId: {
        userId,
        newsId,
      },
    },
    create: {
      userId,
      newsId,
    },
    update: {
      savedAt: new Date(),
    },
    select: {
      id: true,
      userId: true,
      newsId: true,
      savedAt: true,
    },
  });
}
export async function unSavedNewsHandler({ newsId, userId }: RecordNewsViewInput) {
  return prisma.userSavedNews.deleteMany({
    where: {
      userId,
      newsId,
    },
  });
}

export async function checkSaveNews({ newsId, userId }: RecordNewsViewInput) {
  const savedNews = await prisma.userSavedNews.findUnique({
    where: {
      userId_newsId: {
        userId,
        newsId,
      },
    },
    select: {
      id: true,
    },
  });
  return savedNews !== null;
}
