import * as z from "zod";

export const signupInputSchema = z
  .object({
    firstName: z.string().trim().min(2, "نام باید حداقل ۲ کاراکتر باشد").max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),

    lastName: z.string().trim().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد").max(50, "نام خانوادگی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),

    userName: z.string().trim().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد").max(30, "نام کاربری نمی‌تواند بیشتر از ۳۰ کاراکتر باشد"),

    phoneNumber: z
      .string()
      .trim()
      .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),

    gender: z.enum(["MALE", "FEMALE"], {
      message: "جنسیت را انتخاب کنید",
    }),

    email: z.email("ایمیل معتبر نیست").trim().toLowerCase(),

    password: z
      .string()
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
      .max(100, "رمز عبور بیش از حد طولانی است")
      .regex(/[a-z]/, "رمز عبور باید حداقل یک حرف کوچک انگلیسی داشته باشد")
      .regex(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ انگلیسی داشته باشد")
      .regex(/[0-9]/, "رمز عبور باید حداقل یک عدد داشته باشد"),

    confirmPassword: z.string().min(1, "تکرار رمز عبور را وارد کنید"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

export type SignupInput = z.infer<typeof signupInputSchema>;
