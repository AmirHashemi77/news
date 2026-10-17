import * as z from "zod";

export const loginInputSchema = z.object({
  identifier: z.string().trim().min(1, "ایمیل، شماره موبایل یا نام کاربری را وارد کنید"),

  password: z.string().min(1, "رمز عبور را وارد کنید"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
