import { revokeSession } from "@/features/user/session/server/session.server";
import { SESSION_COOKIE_NAME, sessionCookieOptions } from "@/features/user/session/session.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (token) {
      await revokeSession(token);
    }
    const response = NextResponse.json(
      {
        status: "success",
        message: "با موفقیت خارج شدید.",
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );

    response.cookies.set({
      ...sessionCookieOptions,
      name: SESSION_COOKIE_NAME,
      value: "",
      maxAge: 0,
    });
    return response;
  } catch (error) {
    console.error("Logout failed:", error);

    return NextResponse.json(
      {
        message: "خروج از حساب کاربری انجام نشد.",
      },
      { status: 500 },
    );
  }
}
