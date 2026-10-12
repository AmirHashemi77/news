import { prisma } from "@/shared/lib/prisma";

export type GetNewsInput = {
  pageNumber: number;
  pageSize: number;
  title?: string;
  fromDate?: string;
  toDate?: string;
};

export async function getLatestNews({ pageNumber = 1, pageSize = 10, title }: GetNewsInput) {
  const skip = (pageNumber - 1) * pageSize;

  const [totalCount, news] = await Promise.all([
    prisma.news.count({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    }),

    prisma.news.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
      skip,
      take: pageSize,

      orderBy: {
        publishDate: "desc",
      },

      select: {
        id: true,
        title: true,
        subtitle: true,
        publishDate: true,
        imageUrl: true,
        viewCount: true,

        _count: {
          select: {
            comments: true,
          },
        },

        categories: {
          select: {
            id: true,
            slug: true,
            name: true,
          },
        },
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

      commentCount: item._count.comments,
      viewCount: item.viewCount,

      categories: item.categories.map((category) => ({
        id: category.id,
        slug: category.slug,
        name: category.name,
      })),
    })),
  };
}

export async function getPopularNews({ pageNumber = 1, pageSize = 10, title }: GetNewsInput) {
  const skip = (pageNumber - 1) * pageSize;

  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
  const [totalCount, news] = await Promise.all([
    prisma.news.count({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
        publishDate: {
          gte: tenDaysAgo,
        },
      },
    }),

    prisma.news.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
        publishDate: {
          gte: tenDaysAgo,
        },
      },
      orderBy: [
        {
          viewCount: "desc",
        },
        {
          publishDate: "desc",
        },
      ],
      take: pageSize,
      skip,
      select: {
        id: true,
        title: true,
        subtitle: true,
        imageUrl: true,
        publishDate: true,
        viewCount: true,
        _count: {
          select: {
            comments: true,
          },
        },
        categories: {
          select: {
            id: true,
            slug: true,
            name: true,
          },
        },
      },
    }),
  ]);

  return {
    totalCount,
    newsList: news.map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      viewCount: item.viewCount,
      commentCount: item._count.comments,
      imageUrl: item.imageUrl,
      publishDate: item.publishDate,
      categories: item.categories.map((category) => ({
        id: category.id,
        slug: category.slug,
        name: category.name,
      })),
    })),
  };
}

export async function getPosterNews() {
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
  const news = await prisma.news.findMany({
    where: {
      publishDate: {
        gte: fiveDaysAgo,
      },
      imageUrl: {
        not: null,
      },
      NOT: {
        imageUrl: "",
      },
    },

    orderBy: [
      {
        viewCount: "desc",
      },
      {
        publishDate: "desc",
      },
    ],
    take: 4,
    select: {
      id: true,
      title: true,
      publishDate: true,
      viewCount: true,
      imageUrl: true,
      _count: {
        select: {
          comments: true,
        },
      },
      categories: {
        select: {
          id: true,
          slug: true,
          name: true,
        },
      },
    },
  });

  return {
    newsList: news.map((item) => ({
      id: item.id,
      title: item.title,
      viewCount: item.viewCount,
      commentCount: item._count.comments,
      imageUrl: item.imageUrl,
      publishDate: item.publishDate,
      categories: item.categories.map((category) => ({
        id: category.id,
        slug: category.slug,
        name: category.name,
      })),
    })),
  };
}

export async function getNewsByCategory({ pageNumber = 1, pageSize = 10, categorySlug, title, fromDate, toDate }: GetNewsInput & { categorySlug: string }) {
  const skip = (pageNumber - 1) * pageSize;
  const [totalCount, news] = await Promise.all([
    prisma.news.count({
      where: {
        categories: {
          some: {
            slug: categorySlug,
          },
        },
        ...(title
          ? {
              title: {
                contains: title,
                mode: "insensitive",
              },
            }
          : {}),

        ...(fromDate || toDate
          ? {
              publishDate: {
                ...(fromDate ? { gte: fromDate } : {}),
                ...(toDate ? { lte: toDate } : {}),
              },
            }
          : {}),
      },
    }),

    prisma.news.findMany({
      where: {
        categories: {
          some: {
            slug: categorySlug,
          },
        },
        ...(title
          ? {
              title: {
                contains: title,
                mode: "insensitive",
              },
            }
          : {}),

        ...(fromDate || toDate
          ? {
              publishDate: {
                ...(fromDate ? { gte: fromDate } : {}),
                ...(toDate ? { lte: toDate } : {}),
              },
            }
          : {}),
      },
      orderBy: {
        publishDate: "desc",
      },

      take: pageSize,
      skip,
      select: {
        id: true,
        title: true,
        subtitle: true,
        imageUrl: true,
        publishDate: true,
        viewCount: true,
        _count: {
          select: {
            comments: true,
          },
        },
        categories: {
          select: {
            id: true,
            slug: true,
            name: true,
          },
        },
      },
    }),
  ]);

  return {
    totalCount,
    newsList: news.map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      viewCount: item.viewCount,
      commentCount: item._count.comments,
      imageUrl: item.imageUrl,
      publishDate: item.publishDate,
      categories: item.categories.map((category) => ({
        id: category.id,
        slug: category.slug,
        name: category.name,
      })),
    })),
  };
}
