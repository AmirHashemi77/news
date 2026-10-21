import { z } from "zod";

export const editProfileSchema = z.object({
  firstName: z.string().trim().min(2, "نام باید حداقل ۲ کاراکتر باشد").max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),
  lastName: z.string().trim().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد").max(50, "نام خانوادگی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),
  userName: z.string().trim().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد").max(30, "نام کاربری نمی‌تواند بیشتر از ۳۰ کاراکتر باشد"),
  email: z.string().trim().toLowerCase().pipe(z.email("ایمیل معتبر نیست")),
});

export type EditProfileInput = z.infer<typeof editProfileSchema>;
