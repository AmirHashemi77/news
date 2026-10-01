"use client";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "./Sidebar";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="باز کردن منو"
        className="
          flex size-10
          items-center justify-center
          rounded-lg
          transition-colors
          bg-white shadow-sm
          hover:bg-gray-100
          lg:hidden
        "
      >
        <FiMenu className="size-6 text-icon hover:text-icon-hover" />
      </button>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} logo={<span className="text-xl font-bold">LOGO</span>} />
    </>
  );
}
