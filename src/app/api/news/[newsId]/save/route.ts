import { newsDetailsSchema } from "@/features/newsDetails/schema/newsDetails.schema";
import { checkSaveNewsServices, getNewsDetailsService, savedNewsHandlerServices, unSavedNewsHandlerServices } from "@/features/newsDetails/server/newsDetails.server";
import { getCurrentUser } from "@/features/user/session/server/session.server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ newsId: string }> }) {
  const { newsId } = await params;
  const parsed = newsDetailsSchema.safeParse({ newsId });

  if (!parsed.success) {
    return NextResponse.json({ message: "اطلاعات خبر معتبر نیست" }, { status: 400 });
  }

  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "کاربر وارد حساب خود نشده است." }, { status: 401 });
    }

    const news = await getNewsDetailsService(parsed.data.newsId);

    if (news.status === "not-found") {
      return NextResponse.json({ message: "خبری پیدا نشد" }, { status: 404 });
    }

    const result = await checkSaveNewsServices({ newsId: parsed.data.newsId, userId: user.id });

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Failed to check saved news", error);

    return NextResponse.json({ message: "بررسی وضعیت ذخیره خبر انجام نشد." }, { status: 500 });
  }
}

export async function POST(_request: NextRequest, { params }: { params: Promise<{ newsId: string }> }) {
  const { newsId } = await params;
  const parsed = newsDetailsSchema.safeParse({ newsId });

  if (!parsed.success) {
    return NextResponse.json({ message: "اطلاعات خبر معتبر نیست" }, { status: 400 });
  }

  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "کاربر وارد حساب خود نشده است." }, { status: 401 });
    }

    const news = await getNewsDetailsService(parsed.data.newsId);

    if (news.status === "not-found") {
      return NextResponse.json({ message: "خبری پیدا نشد" }, { status: 404 });
    }

    const result = await savedNewsHandlerServices({ newsId: parsed.data.newsId, userId: user.id });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to save news", error);

    return NextResponse.json({ message: "ذخیره خبر انجام نشد." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ newsId: string }> }) {
  const { newsId } = await params;
  const parsed = newsDetailsSchema.safeParse({ newsId });

  if (!parsed.success) {
    return NextResponse.json({ message: "اطلاعات خبر معتبر نیست ." }, { status: 400 });
  }

  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "کاربر وارد حساب خود نشده است." }, { status: 401 });
    }

    const news = await getNewsDetailsService(parsed.data.newsId);

    if (news.status === "not-found") {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    const result = await unSavedNewsHandlerServices({ newsId: parsed.data.newsId, userId: user.id });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to unsave news", error);

    return NextResponse.json({ message: "حذف خبر از ذخیره‌ها انجام نشد." }, { status: 500 });
  }
}
