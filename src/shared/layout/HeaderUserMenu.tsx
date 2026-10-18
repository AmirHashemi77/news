"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { useLogout } from "@/features/user/session/hooks/useLogout";
import type { CurrentUser } from "@/features/user/session/types/session.type";

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
      <Link
        href="/login"
        className="
          hidden h-10 shrink-0 items-center justify-center gap-2 lg:inline-flex
          rounded-lg bg-foreground px-3
          text-sm font-medium text-background
          shadow-sm transition-opacity hover:opacity-90
        "
      >
        <FiLogIn className="size-4" />
        <span>ورود</span>
      </Link>
    );
  }

  const fullName = `${currentUser.firstName} ${currentUser.lastName}`.trim() || currentUser.userName;

  return (
    <div ref={menuRef} className="relative hidden shrink-0 lg:block">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="منوی حساب کاربری"
        className="
          inline-flex h-10 max-w-44 items-center justify-center gap-2
          rounded-lg border border-gray-200 bg-white px-3
          text-sm font-medium text-foreground shadow-sm
          transition-colors hover:bg-gray-50
        "
      >
        <FiUser className="size-5 shrink-0 text-icon" />

        <span className="truncate">{fullName}</span>

        <FiChevronDown className={`size-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

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
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="
                flex items-center gap-3 rounded-lg px-3 py-2.5
                text-sm text-gray-700 transition-colors
                hover:bg-gray-100 hover:text-foreground
              "
            >
              <FiUser className="size-4" />
              <span>پروفایل کاربری</span>
            </Link>

            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="
                flex w-full items-center gap-3 rounded-lg px-3 py-2.5
                text-sm text-red-600 transition-colors
                hover:bg-red-50
                disabled:cursor-not-allowed disabled:opacity-60
              "
            >
              <FiLogOut className="size-4" />

              <span>{isLoggingOut ? "در حال خروج ..." : "خروج از حساب"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
