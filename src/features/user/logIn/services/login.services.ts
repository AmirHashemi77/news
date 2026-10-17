import "server-only";

import bcrypt from "bcryptjs";
import { loginUser } from "../repository/login.repository";
import * as z from "zod";
import { loginInputSchema } from "../schema/loginInput.schema";

export type LoginInput = z.infer<typeof loginInputSchema>;

export async function loginUserServices(input: LoginInput) {
  const user = await loginUser(input.identifier);

  if (!user) {
    return {
      status: "invalid-identifier",
      message: "نام کاربری یا رمز عبور نادرست است.",
    } as const;
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);

  if (!isPasswordValid) {
    return {
      status: "invalid-password",
      message: "نام کاربری یا رمز عبور نادرست است.",
    } as const;
  }
  return {
    status: "success",
    message: "ورود با موفقیت انجام شد .",
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      userName: user.userName,
    } as const,
  };
}
