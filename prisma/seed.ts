import "dotenv/config";

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { newsCategories } from "../src/shared/constants/newsCategories";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  for (const category of newsCategories) {
    await prisma.category.upsert({
      where: {
        slug: category.slug,
      },

      update: {
        name: category.title,
        imageUrl: category.imageUrl,
      },

      create: {
        name: category.title,
        slug: category.slug,
        imageUrl: category.imageUrl,
      },
    });
  }

  console.log(`${newsCategories.length} categories seeded successfully`);
}

main()
  .catch((error) => {
    console.error("Category seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
