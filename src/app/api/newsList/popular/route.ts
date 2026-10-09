import { newsQuerySchema } from "@/features/newsList/schemas/newsQuery.schema";
import { getPopularNewsService } from "@/features/newsList/server/newsList.server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());

  const parsed = newsQuerySchema.safeParse(searchParams);

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
    const result = await getPopularNewsService({ pageNumber: parsed.data.pageNumber, pageSize: parsed.data.pageSize });

    return NextResponse.json({
      ...result,
      newsList: result.newsList.map((news) => ({
        ...news,
        publishDate: news.publishDate.toISOString(),
      })),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to fetch popular news",
      },
      {
        status: 500,
      },
    );
  }
}
