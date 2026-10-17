import { getCurrentUser } from "@/features/user/session/server/session.server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "کاربر وارد حساب خود نشده است.",
        },
        {
          status: 401,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    return NextResponse.json(
      {
        user,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Get current user failed:", error);

    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}
