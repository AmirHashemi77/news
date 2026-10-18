"use client";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "./Sidebar";
import type { CurrentUser } from "@/features/user/session/types/session.type";
import { Button } from "@/shared/ui/button";

interface MobileMenuProps {
  currentUser: CurrentUser | null;
}

export default function MobileMenu({ currentUser }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setIsOpen(true)}
        aria-label="باز کردن منو"
        className="lg:hidden"
      >
        <FiMenu className="size-6 text-icon hover:text-icon-hover" />
      </Button>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} currentUser={currentUser} logo={<span className="text-xl font-bold">LOGO</span>} />
    </>
  );
}
