import { FC } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import NewsCard from "./NewsCard";
import { cn } from "@/shared/lib/cn";
export const newsListData = [
  {
    id: "1",
    title: "تحولات جدید در حوزه هوش مصنوعی",
    description: "توسعه فناوری‌های هوش مصنوعی با سرعت زیادی ادامه دارد و شرکت‌ها در حال سرمایه‌گذاری روی زیرساخت‌های جدید هستند.",
    commentCount: 24,
    image: "https://media.mehrnews.com/d/2025/06/01/3/5530651.jpg?ts=1748777839185",
    url: "/news/ai-development",
    tags: ["هوش مصنوعی", "تکنولوژی"],
    publishDate: "۳۰ شهریور ۱۴۰۵",
  },

  {
    id: "2",
    title: "توسعه زیرساخت‌های هوش مصنوعی در ایران",
    description: "زیرساخت‌های جدید برای توسعه خدمات مبتنی بر هوش مصنوعی و فناوری‌های نوین در حال گسترش هستند.",
    commentCount: 16,
    image: "https://media.mehrnews.com/d/2025/03/08/3/5412677.jpg?ts=1741435500914",
    url: "/news/ai-infrastructure",
    tags: ["فناوری", "ایران"],
    publishDate: "۲۹ شهریور ۱۴۰۵",
  },

  {
    id: "3",
    title: "هوش مصنوعی و آینده رسانه‌ها",
    description: "کاربرد ابزارهای هوش مصنوعی در رسانه‌ها و تولید محتوا در سال‌های اخیر افزایش قابل توجهی داشته است.",
    commentCount: 34,
    image: "https://media.mehrnews.com/d/2022/12/04/3/4350048.jpg?ts=1670133985388",
    url: "/news/ai-media",
    tags: ["رسانه", "هوش مصنوعی"],
    publishDate: "۲۸ شهریور ۱۴۰۵",
  },

  {
    id: "4",
    title: "رشد استفاده از انرژی خورشیدی",
    description: "سرمایه‌گذاری در نیروگاه‌های خورشیدی و انرژی‌های پاک در نقاط مختلف کشور در حال افزایش است.",
    commentCount: 19,
    image: "https://media.mehrnews.com/d/2025/07/16/3/5602147.jpg?ts=1752658651337",
    url: "/news/solar-energy",
    tags: ["انرژی", "محیط زیست"],
    publishDate: "۲۷ شهریور ۱۴۰۵",
  },

  {
    id: "5",
    title: "آخرین تحولات بازار سرمایه",
    description: "بازار سرمایه در معاملات اخیر با تغییرات و نوسانات مختلفی همراه بوده است.",
    commentCount: 41,
    image: "https://media.mehrnews.com/d/2025/03/23/3/5433981.jpg?ts=1742723269061",
    url: "/news/stock-market",
    tags: ["اقتصاد", "بورس"],
    publishDate: "۲۶ شهریور ۱۴۰۵",
  },

  {
    id: "6",
    title: "رقابت‌های فوتبال با هیجان دنبال می‌شود",
    description: "رقابت تیم‌های فوتبال در لیگ با استقبال هواداران و مسابقات نزدیک و جذاب ادامه دارد.",
    commentCount: 67,
    image: "https://media.mehrnews.com/d/2024/09/25/3/5177100.jpg?ts=1727283196322",
    url: "/news/football",
    tags: ["ورزش", "فوتبال"],
    publishDate: "۲۵ شهریور ۱۴۰۵",
  },

  {
    id: "7",
    title: "کاربرد فناوری‌های جدید در مراکز علمی",
    description: "استفاده از فناوری‌های دیجیتال و هوشمند در مراکز علمی و پژوهشی در حال گسترش است.",
    commentCount: 12,
    image: "https://media.mehrnews.com/d/2024/12/26/3/5304947.jpg?ts=1735221936173",
    url: "/news/new-technologies",
    tags: ["علم", "تکنولوژی"],
    publishDate: "۲۴ شهریور ۱۴۰۵",
  },
];

type NewsListProps = {
  className?: string;
  maxlenth?: number;
  title: string;
  moreUrl: string;
};

const NewsList: FC<NewsListProps> = ({ className, maxlenth, title, moreUrl }) => {
  return (
    <section className={cn("flex w-full flex-col items-center gap-3", className)}>
      <div className="flex w-full items-center border-b border-gray-200 pb-2" dir="rtl">
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

      <div className="flex w-full justify-end border-t border-gray-200 pt-3" dir="rtl">
        <Link href={moreUrl} className="group inline-flex items-center gap-1 text-sm font-medium text-foborder-foreground transition-colors hover:text-blue-800">
          <span>مشاهده بیشتر</span>
          <FiArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};
export default NewsList;
