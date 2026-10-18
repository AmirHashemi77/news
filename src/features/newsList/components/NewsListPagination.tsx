"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Button } from "@/shared/ui/button";
type PaginationProps = {
  totalPages: number;
};

export function Pagination({ totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("pageNumber")) || 1;

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("pageNumber", String(page));

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      {/* Next */}
      <Button
        variant="outline"
        size="icon"
        aria-label="صفحهٔ قبل"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FiChevronRight className="size-4" />
      </Button>

      {/* Pages */}
      {getPages().map((page, index) => {
        if (page === "...") {
          return (
            <span key={`dots-${index}`} className="flex size-10 items-center justify-center text-gray-400">
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <Button
            variant={isActive ? "primary" : "outline"}
            size="icon"
            key={page}
            aria-label={`صفحهٔ ${page}`}
            onClick={() => changePage(page)}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </Button>
        );
      })}

      {/* Previous */}
      <Button
        variant="outline"
        size="icon"
        aria-label="صفحهٔ بعد"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FiChevronLeft className="size-4" />
      </Button>
    </nav>
  );
}
