"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { useLogout } from "@/features/user/session/hooks/useLogout";
import type { CurrentUser } from "@/features/user/session/types/session.type";
import { Button, ButtonLink } from "@/shared/ui/button";

interface HeaderUserMenuProps {
  currentUser: CurrentUser | null;
}

export default function HeaderUserMenu({ currentUser }: HeaderUserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout, isLoggingOut } = useLogout(() => setIsOpen(false));

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!currentUser) {
    return (
      <ButtonLink
        href="/login"
        className="hidden px-3 shadow-sm lg:inline-flex"
      >
        <FiLogIn className="size-4" />
        <span>ورود</span>
      </ButtonLink>
    );
  }

  const fullName = `${currentUser.firstName} ${currentUser.lastName}`.trim() || currentUser.userName;

  return (
    <div ref={menuRef} className="relative hidden shrink-0 lg:block">
      <Button
        variant="outline"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="منوی حساب کاربری"
        className="max-w-44 px-3"
      >
        <FiUser className="size-5 shrink-0 text-icon" />

        <span className="truncate">{fullName}</span>

        <FiChevronDown className={`size-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div
          role="menu"
          aria-label="گزینه‌های حساب کاربری"
          className="
            absolute end-0 top-full z-[60] mt-2 w-64
            overflow-hidden rounded-xl border border-gray-200
            bg-white shadow-lg
          "
        >
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="truncate text-sm font-semibold text-foreground">{fullName}</p>

            <p className="mt-1 truncate text-xs text-gray-500" dir="ltr">
              {currentUser.email}
            </p>
          </div>

          <div className="p-2">
            <ButtonLink
              variant="ghost"
              fullWidth
              href="/profile"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="justify-start gap-3 px-3 font-normal"
            >
              <FiUser className="size-4" />
              <span>پروفایل کاربری</span>
            </ButtonLink>

            <Button
              variant="danger"
              fullWidth
              role="menuitem"
              onClick={handleLogout}
              isLoading={isLoggingOut}
              loadingText="در حال خروج ..."
              className="justify-start gap-3 px-3 font-normal"
            >
              <FiLogOut className="size-4" />

              <span>خروج از حساب</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
