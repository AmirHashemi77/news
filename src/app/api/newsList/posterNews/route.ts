import { getPosterNewsService } from "@/features/newsList/server/newsList.server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await getPosterNewsService();

    return NextResponse.json({
      newsList: result.newsList.map((news) => ({
        ...news,
        publishDate: news.publishDate.toISOString(),
      })),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to fetch poster news",
      },
      {
        status: 500,
      },
    );
  }
}
