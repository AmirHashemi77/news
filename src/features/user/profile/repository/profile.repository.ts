import { prisma } from "@/shared/lib/prisma";
import { UserViewListInput } from "../types/profile.type";
import type { EditProfileInput } from "../schema/editProfile.schema";

export async function findProfileConflicts(userId: string, input: EditProfileInput) {
  return prisma.user.findMany({
    where: {
      id: { not: userId },
      OR: [{ email: input.email }, { userName: input.userName }],
    },
    select: { email: true, userName: true },
  });
}

export async function updateProfile(userId: string, input: EditProfileInput) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      userName: input.userName,
      email: input.email,
    },
    select: { firstName: true, lastName: true, userName: true, email: true },
  });
}

export async function userNewsView({ userId, pageSize, pageNumber }: UserViewListInput) {
  const skip = (pageNumber - 1) * pageSize;

  const [count, views] = await Promise.all([
    prisma.userNewsView.count({
      where: {
        userId,
      },
    }),
    prisma.userNewsView.findMany({
      where: {
        userId,
      },
      orderBy: {
        viewedAt: "desc",
      },
      skip: skip,
      take: pageSize,

      select: {
        news: {
          select: {
            id: true,
            title: true,
            subtitle: true,
            imageUrl: true,
            publishDate: true,
            _count: {
              select: {
                comments: true,
              },
            },
            viewCount: true,
            categories: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    }),
  ]);

  return {
    totalCount: count,
    newsList: views.map((item) => ({
      id: item.news.id,
      title: item.news.title,
      subtitle: item.news.subtitle,
      viewCount: item.news.viewCount,
      commentCount: item.news._count.comments,
      imageUrl: item.news.imageUrl,
      publishDate: item.news.publishDate,
      categories: item.news.categories.map((category) => ({
        id: category.id,
        slug: category.slug,
        name: category.name,
      })),
    })),
  };
}

export async function userNewsSaved({ userId, pageSize, pageNumber }: UserViewListInput) {
  const skip = (pageNumber - 1) * pageSize;
  const [count, news] = await Promise.all([
    prisma.userSavedNews.count({
      where: {
        userId: userId,
      },
    }),
    prisma.userSavedNews.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        savedAt: "desc",
      },
      skip,
      take: pageSize,
      select: {
        news: {
          select: {
            id: true,
            title: true,
            subtitle: true,
            imageUrl: true,
            publishDate: true,
            _count: {
              select: {
                comments: true,
              },
            },
            viewCount: true,
            categories: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    }),
  ]);

  return {
    totalCount: count,
    newsList: news.map((item) => ({
      id: item.news.id,
      title: item.news.title,
      subtitle: item.news.subtitle,
      viewCount: item.news.viewCount,
      commentCount: item.news._count.comments,
      imageUrl: item.news.imageUrl,
      publishDate: item.news.publishDate,
      categories: item.news.categories.map((category) => ({
        id: category.id,
        slug: category.slug,
        name: category.name,
      })),
    })),
  };
}

export async function getUserComments({ userId, pageSize, pageNumber }: UserViewListInput) {
  const skip = (pageNumber - 1) * pageSize;

  const [count, comments] = await Promise.all([
    prisma.comment.count({
      where: {
        authorId: userId,
      },
    }),
    prisma.comment.findMany({
      where: {
        authorId: userId,
      },

      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      skip,
      take: pageSize,

      select: {
        id: true,
        commentText: true,
        createdAt: true,

        news: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
            publishDate: true,
          },
        },
      },
    }),
  ]);

  return {
    totalCount: count,
    commentsList: comments,
  };
}
