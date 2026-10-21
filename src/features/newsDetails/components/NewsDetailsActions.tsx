"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiBookmark, FiChevronLeft, FiMoreVertical } from "react-icons/fi";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";
import { fetchData } from "@/shared/api/fetchData";
import { toast } from "sonner";

export default function NewsDetailsActions({ newsId }: { newsId: string }) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [hasCheckSaveError, setHasCheckSaveError] = useState<boolean>(false);

  useEffect(() => {
    const checkSaveHandler = async () => {
      try {
        const result = await fetchData<{ data: boolean; status: string }, unknown, undefined>(`/api/news/${newsId}/save`, {
          method: "GET",
        });

        if (result.ok) {
          setIsSaved(result.data.data);
        }
      } catch {
        setHasCheckSaveError(true);
      }
    };
    checkSaveHandler();
  }, [newsId]);

  const saveNewsHandler = async () => {
    if (!isSaved) {
      try {
        const result = await fetchData(`/api/news/${newsId}/save`, {
          method: "POST",
        });
        if (!result.ok) {
          toast.error("عملیات با خطا مواجه شد.");
        }
        if (result.ok) {
          toast.success("عملیات با موفقیت انجام شد.");
          setIsSaved(true);
        }
      } catch {
        toast.error("عملیات با موفقیت انجام شد.");
      }
    } else {
      try {
        const result = await fetchData(`/api/news/${newsId}/save`, {
          method: "DELETE",
          body: {},
        });
        if (!result.ok) {
          toast.error("عملیات با خطا مواجه شد.");
        }
        if (result.ok) {
          toast.success("عملیات با موفقیت انجام شد.");
          setIsSaved(false);
        }
      } catch {
        toast.error("عملیات با موفقیت انجام شد.");
      }
    }
  };

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
        {!hasCheckSaveError && (
          <Button
            variant="overlay"
            size="icon-lg"
            onClick={() => saveNewsHandler()}
            aria-label={isSaved ? "حذف خبر از ذخیره‌ها" : "ذخیره خبر"}
            aria-pressed={isSaved}
            className={cn(isSaved && "bg-white/30")}
          >
            <FiBookmark className={cn("size-5", isSaved && "fill-white")} aria-hidden="true" />
          </Button>
        )}
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
