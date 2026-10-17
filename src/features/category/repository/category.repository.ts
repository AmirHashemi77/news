import { prisma } from "@/shared/lib/prisma";

export async function getCategories() {
  const category = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      slug: true,
      name: true,
      imageUrl: true,
    },
  });

  return category;
}

export async function categoryExistsBySlug(slug: string) {
  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      slug: true,
      name: true,
    },
  });

  return category;
}
