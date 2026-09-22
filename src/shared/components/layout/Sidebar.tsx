"use client";

import Link from "next/link";

import type { Dispatch, ReactNode, SetStateAction } from "react";

import { FiHome, FiClock, FiGrid, FiZap, FiCloud, FiMail, FiX } from "react-icons/fi";

import { FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  logo?: ReactNode;
}

const menuList = [
  {
    id: "home",
    title: "خانه",
    href: "/",
    icon: FiHome,
  },
  {
    id: "lastNews",
    title: "آخرین اخبار",
    href: "/",
    icon: FiClock,
  },
  {
    id: "category",
    title: "دسته بندی",
    href: "/categoryList",
    icon: FiGrid,
  },
  {
    id: "short",
    title: "خبر های کوتاه",
    href: "/",
    icon: FiZap,
  },
  {
    id: "weather",
    title: "آب و هوا",
    href: "/",
    icon: FiCloud,
  },
  {
    id: "contactUs",
    title: "ارتباط با ما",
    href: "/",
    icon: FiMail,
  },
];

const socialMedia = [
  {
    id: "instagram",
    icon: FaInstagram,
    href: "#",
  },
  {
    id: "linkedin",
    icon: FaLinkedin,
    href: "#",
  },
  {
    id: "telegram",
    icon: FaTelegram,
    href: "#",
  },
];

export default function Sidebar({ isOpen, setIsOpen, logo }: SidebarProps) {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close button"
        onClick={handleClose}
        className={`
          fixed inset-0 z-50
          bg-black/40
          transition-opacity
          duration-300
          ease-in-out

          ${isOpen ? "visible opacity-100" : "invisible opacity-0"}
        `}
      />

      {/* Sidebar */}
      <aside
        dir="rtl"
        className={`
          fixed right-0 top-0 z-50
          flex h-dvh
          w-[280px] max-w-[85vw]
          flex-col
          bg-white
          shadow-xl
          transition-transform
          duration-300
          ease-in-out

          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div
          className="
            flex h-20 shrink-0
            items-center
            justify-between
            border-b
            border-gray-100
            px-5
          "
        >
          {/* Logo */}
          <div className="flex items-center">{logo ?? <span className="text-xl font-bold">LOGO</span>}</div>

          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="بستن منو"
            className="
              flex size-10
              items-center
              justify-center
              rounded-full
              text-gray-600
              transition-colors
              hover:bg-gray-100
              hover:text-gray-950
            "
          >
            <FiX className="size-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-1">
            {menuList.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={handleClose}
                    className="
                      flex items-center
                      gap-3
                      rounded-lg
                      px-4 py-3
                      text-sm
                      font-medium
                      text-gray-700
                      transition-colors
                      hover:bg-gray-100
                      hover:text-gray-950
                    "
                  >
                    <Icon className="size-5 shrink-0" />

                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Social media */}
        <div
          className="
            shrink-0
            border-t
            border-gray-100
            px-5 py-5
          "
        >
          <div className="flex items-center justify-center gap-3">
            {socialMedia.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.id}
                  className="
                    flex size-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                    text-gray-600
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-gray-900
                    hover:text-white
                  "
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
