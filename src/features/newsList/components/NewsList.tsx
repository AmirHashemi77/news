import { FC } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import NewsCard from "./NewsCard";
import { cn } from "@/shared/lib/cn";
import { Pagination } from "./NewsListPagination";
import { NewList } from "../types/NewsList.type";

type NewsListProps =
  | {
      pagination: false;
      className?: string;

      moreUrl: string;
      newsData: NewList;
    }
  | {
      pagination: true;
      className?: string;

      moreUrl: null;
      newsData: NewList;
    };

const NewsList: FC<NewsListProps> = async ({ className, moreUrl, pagination, newsData }) => {
  return (
    <section className={cn("flex w-full flex-col items-center gap-3", className)}>
      <div className="flex w-full items-center border-b border-gray-200 mt-3" dir="rtl">
        {newsData.pagination && newsData.pagination.totalCount > 0 && <h2 className="border-r-4 border-foreground pr-3 text-lg font-bold text-gray-900 md:text-xl">{newsData.category.name}</h2>}
      </div>

      {newsData.pagination && newsData.pagination.totalCount > 0 && (
        <div className="flex w-full flex-col items-center gap-2">
          {newsData.newsList.map((item) => {
            return (
              <NewsCard
                commentCount={item.commentCount}
                subtitle={item.subtitle}
                id={item.id}
                imageUrl={item.imageUrl}
                title={item.title}
                categories={item.categories}
                publishDate={item.publishDate}
                key={item.id}
              />
            );
          })}
        </div>
      )}
      {newsData.pagination && newsData.pagination.totalCount === 0 && <p className="text-center h-screen">خبری برای نمایش پیدا نشد</p>}

      {!pagination && moreUrl && (
        <div className="flex w-full justify-end border-t border-gray-200 pt-3" dir="rtl">
          <Link href={moreUrl} className="group inline-flex items-center gap-1 text-sm font-medium text-foborder-foreground transition-colors hover:text-blue-800 ml-4">
            <span>مشاهده بیشتر</span>
            <FiArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      )}

      {newsData.pagination && newsData.pagination?.totalPages >= 1 && pagination && !moreUrl && <Pagination totalPages={newsData.pagination?.totalPages} />}
    </section>
  );
};
export default NewsList;
