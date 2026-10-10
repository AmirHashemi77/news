import { newsDetailsSchema } from "@/features/newsDetails/schema/newsDetails.schema";
import { incrementNewsViewService } from "@/features/newsDetails/server/newsDetails.server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest, { params }: { params: Promise<{ newsId: string }> }) {
  const { newsId } = await params;

  const parsed = newsDetailsSchema.safeParse({ newsId });

  if (!parsed.success) {
    return NextResponse.json({ message: "invalid newId" }, { status: 400 });
  }

  try {
    const result = await incrementNewsViewService(parsed.data.newsId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("faild send view log", error);

    return NextResponse.json(
      {
        message: "faild send view log",
      },
      { status: 500 },
    );
  }
}
