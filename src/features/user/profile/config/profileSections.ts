import { FiBookmark, FiClock, FiEdit3, FiLock, FiMessageSquare } from "react-icons/fi";
import type { ProfileSection } from "../types/profile.type";

export const profileSections = {
  edit: {
    title: "ویرایش اطلاعات",
    href: "/profile/edit",
    description: "نام، نام خانوادگی، نام کاربری و ایمیل حساب خود را ویرایش کنید.",
    icon: FiEdit3,
  },
  password: {
    title: "تغییر رمز عبور",
    href: "/profile/change-password",
    description: "این بخش برای تغییر رمز عبور حساب در نظر گرفته شده است. در نسخهٔ فعلی، هیچ رمز عبوری دریافت یا تغییر داده نمی‌شود.",
    icon: FiLock,
  },
  saved: {
    title: "خبرهای ذخیره‌شده",
    href: "/profile/saved-news",
    description: "خبرهایی که برای خواندن در فرصت دیگر ذخیره می‌کنید، در این بخش قرار می‌گیرند. این فهرست فعلاً نمایشی است.",
    icon: FiBookmark,
  },
  recent: {
    title: "آخرین خبرهای دیده‌شده",
    href: "/profile/recent-news",
    description: "از اینجا می‌توانید دوباره به خبرهایی که پیش‌تر خوانده‌اید سر بزنید. در این مرحله، سابقهٔ بازدیدی دریافت یا ثبت نمی‌شود.",
    icon: FiClock,
  },
  comments: {
    title: "نظرهای شما",
    href: "/profile/comments",
    description: "این بخش برای مرور نظرهای شما دربارهٔ خبرها آماده شده است. دیدگاه‌های واقعی در مرحلهٔ اتصال به سرویس‌ها نمایش داده می‌شوند.",
    icon: FiMessageSquare,
  },
} satisfies Record<string, ProfileSection>;
