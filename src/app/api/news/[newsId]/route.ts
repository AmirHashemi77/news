import { newsDetailsSchema } from "@/features/newsDetails/schema/newsDetails.schema";
import { getNewsDetailsService } from "@/features/newsDetails/server/newsDetails.server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ newsId: string }> }) {
  const { newsId } = await params;
  const parse = newsDetailsSchema.safeParse({ newsId });

  if (!parse.success) {
    return NextResponse.json(
      {
        message: "News id is invalid",
      },
      { status: 400 },
    );
  }

  try {
    const result = await getNewsDetailsService(parse.data.newsId);

    if (result.status === "not-found") {
      return NextResponse.json(
        {
          message: "News not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json({
      ...result.data,
      publishDate: result.data.publishDate.toISOString(),
    });
  } catch (error) {
    console.error("Failed to fetch News content", error);
    return NextResponse.json(
      {
        message: "Failed to fetch News content",
      },
      { status: 500 },
    );
  }
}
