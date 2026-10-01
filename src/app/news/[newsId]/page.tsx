import NewsDetailsActions from "@/features/newsDetails/components/NewsDetailsActions";
import { getNewsDetails } from "@/features/newsDetails/data/newsDetailsData";
import CommentsList from "@/shared/components/comments/commentsList";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FC } from "react";
import { FiCalendar, FiEye } from "react-icons/fi";

interface PropsType {
  params: Promise<{ newsId: string }>;
}

const NewsDetails: FC<PropsType> = async ({ params }) => {
  const { newsId } = await params;
  const news = getNewsDetails(newsId);

  if (!news) notFound();

  return (
    <article dir="rtl" aria-labelledby="news-title" className="mx-auto min-h-dvh w-full max-w-3xl bg-white sm:min-h-0 sm:overflow-hidden rounded-t-2xl">
      <div className="relative isolate flex min-h-88 flex-col justify-between gap-16 overflow-hidden bg-gray-900 px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-12 sm:min-h-112 sm:px-8 sm:pt-6 rounded-t-2xl">
        <Image src={news.image} alt={news.title} fill preload sizes="(max-width: 640px) 100vw, 768px" className="-z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-black/20 to-black/20" />

        <NewsDetailsActions key={news.id} />

        <div className="text-white">
          <h1 id="news-title" className="text-2xl font-bold leading-9 sm:text-3xl sm:leading-11">
            {news.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs leading-5 text-white/90 sm:text-sm">
            <span>{news.category}</span>
            <span aria-hidden="true" className="text-white/60">
              /
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiCalendar className="size-3.5" aria-hidden="true" />
              <span>
                <span className="sr-only">تاریخ انتشار: </span>
                {news.publishDate}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-5 rounded-t-3xl bg-white px-5 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="text-sm font-bold text-gray-900">
            <span className="sr-only">منتشرکننده: </span>
            {news.publisher}
          </p>
          <span className="text-xs text-gray-500">{news.publishDate}</span>
        </div>
        <div className="space-y-5 wrap-break-word text-[15px] leading-8 text-gray-700 sm:text-base sm:leading-9">
          {news.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
          <FiEye className="size-4" aria-hidden="true" />
          <span>تعداد بازدید: {news.viewCount.toLocaleString("fa-IR")}</span>
        </div>
      </div>
      <CommentsList key={news.id} articleId={news.id} />
    </article>
  );
};
export default NewsDetails;
