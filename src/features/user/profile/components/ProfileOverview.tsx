import Image from "next/image";
import { FiAward, FiEdit3 } from "react-icons/fi";
import { ButtonLink } from "@/shared/ui/button";
import { profileSections } from "../config/profileSections";
import ProfileMenu from "./ProfileMenu";
import { getCurrentUser } from "../../session/server/session.server";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function ProfileOverview() {
  const user = await getCurrentUser();

  if (!user) {
    toast.info("برای دسترسی به این بخش ، با حساب کاربری خود وارد شوید .");
    redirect("/login");
  }

  return (
    <main
      dir="rtl"
      aria-labelledby="profile-title"
      className="mx-auto my-2 w-full max-w-2xl rounded-2xl border border-gray-100 bg-linear-to-b from-white via-white to-gray-50 p-4 shadow-sm sm:my-6 sm:p-8"
    >
      <header className="flex items-center justify-between gap-3">
        <h1 id="profile-title" className="text-xl font-bold text-foreground">
          پروفایل
        </h1>
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-500">تیتر</span>
      </header>

      <section aria-label="اطلاعات کاربر نمونه" className="flex flex-col items-center px-2 pb-9 pt-8 text-center">
        <div className="relative mb-5">
          <Image
            src={""}
            alt="تصویر نمایشی پروفایل"
            width={112}
            height={112}
            sizes="(min-width: 640px) 112px, 96px"
            className="size-24 rounded-full border-4 border-white object-cover shadow-sm ring-1 ring-gray-100 sm:size-28"
          />
          <ButtonLink
            href={profileSections.edit.href}
            variant="outline"
            size="sm"
            aria-label="ویرایش اطلاعات پروفایل"
            className="absolute -bottom-2 left-1/2 min-h-7 -translate-x-1/2 gap-1 rounded-full px-2.5 py-1 text-[11px]"
          >
            <FiEdit3 className="size-3" aria-hidden="true" />
            ویرایش
          </ButtonLink>
        </div>
        <h2 className="max-w-full break-words text-xl font-semibold leading-8 text-foreground">{`${user.firstName} ${user.lastName}`}</h2>
        <p className="mt-1 text-xs leading-6 text-gray-500">
          شناسهٔ کاربری: <bdi>{user.userName}</bdi>
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
          <FiAward className="size-3.5" aria-hidden="true" />
          عضو همراه
        </span>
      </section>

      <ProfileMenu />
    </main>
  );
}
