import { loginInputSchema } from "@/features/user/logIn/schema/loginInput.schema";
import { loginUserServices } from "@/features/user/logIn/services/login.services";
import { createSessionToken } from "@/features/user/session/server/session.server";
import { SESSION_COOKIE_NAME } from "@/features/user/session/session.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "بدنه درخواست معتبر نیست." }, { status: 400 });
  }

  const parse = loginInputSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json(
      {
        message: "اطلاعات وارد شده نامعتبر هستند.",
      },
      {
        status: 400,
      },
    );
  }
  try {
    const result = await loginUserServices({ identifier: parse.data.identifier, password: parse.data.password });

    if (result.status === "invalid-identifier" || result.status === "invalid-password") {
      return NextResponse.json(result, {
        status: 401,
      });
    }

    const session = await createSessionToken(result.user?.id as string);

    const response = NextResponse.json(
      {
        data: result,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: session.token,
      expires: session.expiresAt,
    });
    return response;
  } catch (error) {
    console.error(error, "Login Faild .");
    return NextResponse.json(
      {
        message: "Login Faild",
      },
      {
        status: 500,
      },
    );
  }
}
