"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
      <button
        type="button"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="
    flex size-10 items-center justify-center rounded-lg border
    border-gray-200 bg-white text-gray-600 transition
    hover:bg-gray-100 cursor-pointer
    disabled:cursor-not-allowed disabled:opacity-40
  "
      >
        <FiChevronRight className="size-4" />
      </button>

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
          <button
            type="button"
            key={page}
            onClick={() => changePage(page)}
            aria-current={isActive ? "page" : undefined}
            className={`
              flex size-10 items-center justify-center rounded-lg border
              text-sm font-medium transition cursor-pointer
              ${isActive ? "border-black bg-black text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"}
            `}
          >
            {page}
          </button>
        );
      })}

      {/* Previous */}
      <button
        type="button"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
    flex size-10 items-center justify-center rounded-lg border
    border-gray-200 bg-white text-gray-600 transition
    hover:bg-gray-100 cursor-pointer
    disabled:cursor-not-allowed disabled:opacity-40
  "
      >
        <FiChevronLeft className="size-4" />
      </button>
    </nav>
  );
}
