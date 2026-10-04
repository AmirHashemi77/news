import { prisma } from "@/shared/lib/prisma";
import { Prisma as prismaClient } from "@/generated/prisma/client";
export async function newsExistsBySourceUrl(sourceUrl: string): Promise<boolean> {
  const news = await prisma.news.findUnique({
    where: {
      sourceUrl,
    },
    select: {
      id: true,
    },
  });

  return news !== null;
}
export type SaveProcessedNewsInput = {
  title: string;
  subtitle: string;
  content: string[];

  sourceUrl: string;
  imageUrl?: string;
  publishDate: Date;

  agencyName: string;
  categorySlugs: string[];
};
export async function saveProcessedNews(input: SaveProcessedNewsInput) {
  try {
    const news = await prisma.news.create({
      data: {
        title: input.title,
        subtitle: input.subtitle,
        content: input.content,

        sourceUrl: input.sourceUrl,
        imageUrl: input.imageUrl ?? null,
        publishDate: input.publishDate,

        // Find or create the news agency
        newsAgency: {
          connectOrCreate: {
            where: {
              name: input.agencyName,
            },
            create: {
              name: input.agencyName,
            },
          },
        },

        // Connect existing categories
        categories: {
          connect: input.categorySlugs.map((slug) => ({
            slug,
          })),
        },
      },

      select: {
        id: true,
        title: true,
        sourceUrl: true,
        content: true,
        subtitle: true,
        imageUrl: true,
        newsAgency: {
          select: {
            id: true,
            name: true,
          },
        },

        categories: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return {
      status: "created" as const,
      news,
    };
  } catch (error) {
    if (error instanceof prismaClient.PrismaClientKnownRequestError && error.code === "P2002") {
      const exists = await newsExistsBySourceUrl(input.sourceUrl);

      if (exists) {
        return {
          status: "skipped" as const,
          sourceUrl: input.sourceUrl,
        };
      }
    }

    throw error;
  }
}
