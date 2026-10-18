"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiBookmark, FiChevronLeft, FiMoreVertical } from "react-icons/fi";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";

export default function NewsDetailsActions() {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  function goBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  return (
    <nav aria-label="عملیات خبر" className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        {/* Menu behavior will be added when its actions are defined. */}
        <Button variant="overlay" size="icon-lg" disabled aria-label="منوی خبر (به‌زودی)">
          <FiMoreVertical className="size-5" aria-hidden="true" />
        </Button>
        <Button
          variant="overlay"
          size="icon-lg"
          onClick={() => setIsSaved((saved) => !saved)}
          aria-label={isSaved ? "حذف خبر از ذخیره‌ها" : "ذخیره خبر"}
          aria-pressed={isSaved}
          className={cn(isSaved && "bg-white/30")}
        >
          <FiBookmark className={cn("size-5", isSaved && "fill-white")} aria-hidden="true" />
        </Button>
      </div>
      <Button variant="overlay" size="icon-lg" onClick={goBack} aria-label="بازگشت">
        <FiChevronLeft className="size-5" aria-hidden="true" />
      </Button>

      <span role="status" className="sr-only">
        {isSaved ? "خبر در این صفحه ذخیره شد" : ""}
      </span>
    </nav>
  );
}
