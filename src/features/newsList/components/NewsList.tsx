import { FC } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import NewsCard from "./NewsCard";
import { cn } from "@/shared/lib/cn";
import { Pagination } from "./NewsListPagination";
import { newsListData } from "../data/newsListData";


type NewsListProps =
  | {
      pagination: false;
      className?: string;
      maxlenth?: number;
      title: string;
      moreUrl: string;
    }
  | {
      pagination: true;
      className?: string;
      maxlenth?: number;
      title: string;
      moreUrl: null;
    };

const NewsList: FC<NewsListProps> = ({ className, maxlenth, title, moreUrl, pagination }) => {
  return (
    <section className={cn("flex w-full flex-col items-center gap-3", className)}>
      <div className="flex w-full items-center border-b border-gray-200 mt-3" dir="rtl">
        <h2 className="border-r-4 border-foreground pr-3 text-lg font-bold text-gray-900 md:text-xl">{title}</h2>
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        {newsListData.map((item, indx) => {
          if (maxlenth && indx > maxlenth) {
            return;
          }

          return (
            <NewsCard
              commentCount={item.commentCount}
              description={item.description}
              id={item.id}
              image={item.image}
              title={item.title}
              tags={item.tags}
              publishDate={item.publishDate}
              url={item.url}
              key={item.id}
            />
          );
        })}
      </div>

      {!pagination && moreUrl && (
        <div className="flex w-full justify-end border-t border-gray-200 pt-3" dir="rtl">
          <Link href={moreUrl} className="group inline-flex items-center gap-1 text-sm font-medium text-foborder-foreground transition-colors hover:text-blue-800 ml-4">
            <span>مشاهده بیشتر</span>
            <FiArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      )}

      {pagination && !moreUrl && <Pagination totalPages={10} />}
    </section>
  );
};
export default NewsList;
