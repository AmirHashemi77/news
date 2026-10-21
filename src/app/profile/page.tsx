import type { Metadata } from "next";
import ProfileOverview from "@/features/user/profile/components/ProfileOverview";

export const metadata: Metadata = {
  title: "پروفایل کاربری",
  description: "حساب کاربری، خبرهای ذخیره‌شده و دیدگاه‌های شما؛ نسخهٔ نمایشی رابط پروفایل.",
};

export default function ProfilePage() {
  return <ProfileOverview />;
}
