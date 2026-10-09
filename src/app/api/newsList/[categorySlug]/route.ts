import { newsQuerySchema } from "@/features/newsList/schemas/newsQuery.schema";
import { getNewsByCategoryService } from "@/features/newsList/server/newsList.server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ categorySlug: string }> }) {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsed = newsQuerySchema.safeParse(searchParams);
  const { categorySlug } = await params;

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid query parameters",

        errors: parsed.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  try {
    const result = await getNewsByCategoryService({ pageNumber: parsed.data.pageNumber, pageSize: parsed.data.pageSize, categorySlug: categorySlug });

    if (result === null) {
      return NextResponse.json(
        {
          message: "Category Not Found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ...result,
      newsList: result.newsList.map((news) => ({
        ...news,
        publishDate: news.publishDate.toISOString(),
      })),
    });
  } catch (error) {
    console.error(`Failed to fetch ${categorySlug} news`, error);
    return NextResponse.json(
      {
        message: `Failed to fetch ${categorySlug} news`,
      },
      { status: 500 },
    );
  }
}
