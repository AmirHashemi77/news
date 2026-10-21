import { ButtonLink } from "@/shared/ui/button";
import ProfileBackButton from "./ProfileBackButton";
import { ReactNode } from "react";
import { IconType } from "react-icons";
interface ProfileSectionPageProps {
  title: string;
  children: ReactNode;
  icon: IconType;
}

export default function ProfileSectionPage({ children, title, icon }: ProfileSectionPageProps) {
  const Icon = icon;

  return (
    <main dir="rtl" aria-labelledby="profile-section-title" className="mx-auto my-2 w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:my-6">
      <header className="flex items-center gap-2 border-b border-gray-100 px-3 py-4 sm:px-6">
        <ProfileBackButton />
        <h1 id="profile-section-title" className="text-lg font-bold leading-8 text-foreground sm:text-xl">
          {title}
        </h1>
      </header>

      <section className="flex flex-col items-center px-5 py-10 text-center sm:px-8 sm:py-12">
        <span className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-gray-50 text-icon">
          <Icon className="size-7" aria-hidden="true" />
        </span>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>

        {children}

        <ButtonLink href="/profile" variant="outline" className="mt-8">
          بازگشت به پروفایل
        </ButtonLink>
      </section>
    </main>
  );
}
