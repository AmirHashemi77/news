import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import NewsList from "@/features/newsList/components/NewsList";
import { getSearchNewsService } from "@/shared/layout/server/serach.server";

export const metadata: Metadata = {
  title: "جستجوی اخبار",
  description: "جستجو در عنوان و خلاصهٔ خبرها و مشاهدهٔ تازه‌ترین نتایج.",
};

interface PropsType {
  searchParams: Promise<{ searchQuery?: string | string[]; pageNumber?: string | string[] }>;
}

export default async function SearchPage({ searchParams }: PropsType) {
  const { searchQuery, pageNumber } = await searchParams;

  if (typeof searchQuery !== "string") {
    notFound();
  }

  const newsData = await getSearchNewsService({ searchText: searchQuery, pageNumber, pageSize: 10 });

  if (!newsData) {
    notFound();
  }

  if (newsData.pagination.totalPages > 0 && newsData.pagination.pageNumber > newsData.pagination.totalPages) {
    const query = new URLSearchParams({
      searchQuery: newsData.searchText,
      pageNumber: String(newsData.pagination.totalPages),
    });
    redirect(`/search?${query.toString()}`);
  }

  return (
    <main dir="rtl" className="mx-auto flex w-full max-w-4xl flex-col gap-5 py-6">
      <header className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
        <h1 className="flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
          <FiSearch className="size-5 shrink-0 text-icon" aria-hidden="true" />
          نتایج جستجو
        </h1>
        <p className="mt-3 break-words text-sm leading-7 text-gray-600">
          جستجو برای «{newsData.searchText}»؛ {newsData.pagination.totalCount.toLocaleString("fa-IR")} خبر پیدا شد.
        </p>
      </header>

      {newsData.pagination.totalCount > 0 ? (
        <NewsList newsData={newsData} pagination={true} moreUrl={null} />
      ) : (
        <section aria-label="نتیجهٔ جستجو" className="rounded-2xl border border-gray-200 bg-white px-5 py-12 text-center">
          <p className="font-medium text-foreground">خبری با این عبارت پیدا نشد.</p>
          <p className="mt-2 text-sm leading-7 text-gray-500">با یک عبارت دیگر یا کلمه‌های کوتاه‌تر دوباره جستجو کنید.</p>
        </section>
      )}
    </main>
  );
}
