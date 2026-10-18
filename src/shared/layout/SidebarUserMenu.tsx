"use client";

import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { useLogout } from "@/features/user/session/hooks/useLogout";
import type { CurrentUser } from "@/features/user/session/types/session.type";
import { Button, ButtonLink } from "@/shared/ui/button";

interface SidebarUserMenuProps {
  currentUser: CurrentUser | null;
  onClose: () => void;
}

export default function SidebarUserMenu({ currentUser, onClose }: SidebarUserMenuProps) {
  const { handleLogout, isLoggingOut } = useLogout(onClose);

  if (!currentUser) {
    return (
      <div className="mb-5 border-b border-gray-100 pb-5">
        <ButtonLink
          href="/login"
          size="lg"
          fullWidth
          onClick={onClose}
        >
          <FiLogIn className="size-5 shrink-0" />
          <span>ورود</span>
        </ButtonLink>
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

      <ButtonLink
        variant="ghost"
        size="lg"
        fullWidth
        href="/profile"
        onClick={onClose}
        className="justify-start gap-3 px-4"
      >
        <FiUser className="size-5 shrink-0" />
        <span>پروفایل کاربری</span>
      </ButtonLink>

      <Button
        variant="danger"
        size="lg"
        fullWidth
        onClick={handleLogout}
        isLoading={isLoggingOut}
        loadingText="در حال خروج ..."
        className="justify-start gap-3 px-4"
      >
        <FiLogOut className="size-5 shrink-0" />
        <span>خروج از حساب</span>
      </Button>
    </section>
  );
}
