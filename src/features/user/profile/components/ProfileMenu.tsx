import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { profileSections } from "../config/profileSections";

export default function ProfileMenu() {
  return (
    <nav aria-labelledby="profile-menu-title">
      <h2 id="profile-menu-title" className="mb-3 px-1 text-sm font-semibold text-foreground">حساب کاربری</h2>
      <ul className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white px-3 shadow-sm sm:px-4">
        {Object.values(profileSections).map((section) => {
          const Icon = section.icon;

          return (
            <li key={section.href}>
              <Link
                href={section.href}
                className="group flex min-h-16 items-center gap-3 rounded-xl px-2 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-400 motion-reduce:transition-none sm:min-h-18"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-700 transition-colors group-hover:bg-gray-100 motion-reduce:transition-none">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 text-sm font-medium leading-6">{section.title}</span>
                <FiChevronLeft className="size-4 shrink-0 text-gray-400" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
