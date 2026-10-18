"use client";

import Link from "next/link";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { useLogout } from "@/features/user/session/hooks/useLogout";
import type { CurrentUser } from "@/features/user/session/types/session.type";

interface SidebarUserMenuProps {
  currentUser: CurrentUser | null;
  onClose: () => void;
}

export default function SidebarUserMenu({ currentUser, onClose }: SidebarUserMenuProps) {
  const { handleLogout, isLoggingOut } = useLogout(onClose);

  if (!currentUser) {
    return (
      <div className="mb-5 border-b border-gray-100 pb-5">
        <Link
          href="/login"
          onClick={onClose}
          className="flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          <FiLogIn className="size-5 shrink-0" />
          <span>ورود</span>
        </Link>
      </div>
    );
  }

  const fullName = `${currentUser.firstName} ${currentUser.lastName}`.trim() || currentUser.userName;

  return (
    <section aria-label="حساب کاربری" className="mb-5 border-b border-gray-100 pb-5">
      <div className="mb-2 flex items-center gap-3 px-4 py-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
          <FiUser className="size-5 text-icon" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{fullName}</p>
          <p className="mt-1 truncate text-xs text-gray-500" dir="ltr">
            {currentUser.email}
          </p>
        </div>
      </div>

      <Link
        href="/profile"
        onClick={onClose}
        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-950"
      >
        <FiUser className="size-5 shrink-0" />
        <span>پروفایل کاربری</span>
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FiLogOut className="size-5 shrink-0" />
        <span>{isLoggingOut ? "در حال خروج ..." : "خروج از حساب"}</span>
      </button>
    </section>
  );
}
