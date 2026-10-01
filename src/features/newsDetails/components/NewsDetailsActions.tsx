"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiBookmark, FiChevronLeft, FiMoreVertical } from "react-icons/fi";
import { cn } from "@/shared/lib/cn";

const buttonClassName =
  "flex size-11 shrink-0 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-md transition-colors hover:bg-black/45 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

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
        <button type="button" disabled aria-label="منوی خبر (به‌زودی)" className={cn(buttonClassName, "cursor-default disabled:hover:bg-black/25")}>
          <FiMoreVertical className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setIsSaved((saved) => !saved)}
          aria-label={isSaved ? "حذف خبر از ذخیره‌ها" : "ذخیره خبر"}
          aria-pressed={isSaved}
          className={cn(buttonClassName, isSaved && "bg-white/30")}
        >
          <FiBookmark className={cn("size-5", isSaved && "fill-white")} aria-hidden="true" />
        </button>
      </div>
      <button type="button" onClick={goBack} aria-label="بازگشت" className={buttonClassName}>
        <FiChevronLeft className="size-5" aria-hidden="true" />
      </button>

      <span role="status" className="sr-only">
        {isSaved ? "خبر در این صفحه ذخیره شد" : ""}
      </span>
    </nav>
  );
}
