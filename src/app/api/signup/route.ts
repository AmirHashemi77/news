import { signupInputSchema } from "@/features/user/signup/schema/signupInput.schema";
import { signupUserServices } from "@/features/user/signup/server/signup.server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "بدنه درخواست معتبر نیست." }, { status: 400 });
  }

  const parse = signupInputSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json(
      {
        message: "اطلاعات وارد شده معتبر نیست",
        errors: parse.error.flatten().fieldErrors,
      },
      {
        status: 400,
      },
    );
  }

  try {
    const result = await signupUserServices({
      firstName: parse.data.firstName,
      email: parse.data.email,
      gender: parse.data.gender,
      lastName: parse.data.lastName,
      password: parse.data.password,
      phoneNumber: parse.data.phoneNumber,
      userName: parse.data.userName,
    });
    if (result.status === "email-already-exists" || result.status === "username-already-exists" || result.status === "phone-number-already-exists") {
      return NextResponse.json(
        {
          message: result.message,
          status: result.status,
        },
        { status: 409 },
      );
    }
    return NextResponse.json(
      {
        message: "حساب کاربری با موفقیت ایجاد شد",
        user: result.data,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error, "SignUp faild.");
    return NextResponse.json(
      {
        message: "SignUp faild.",
      },
      {
        status: 500,
      },
    );
  }
}
