import NewsHero from "@/features/newsList/components/NewsHero";
import NewsHeroCard from "@/features/newsList/components/NewsHeroCard";
import NewsList from "@/features/newsList/components/NewsList";
import { FC } from "react";
const test = {
  id: "1",
  title: "تحولات جدید در حوزه هوش مصنوعی",
  description: "توسعه فناوری‌های هوش مصنوعی با سرعت زیادی ادامه دارد و شرکت‌ها در حال سرمایه‌گذاری روی زیرساخت‌های جدید هستند.",
  commentCount: 24,
  image: "https://media.mehrnews.com/d/2025/06/01/3/5530651.jpg?ts=1748777839185",
  url: "/news/ai-development",
  tags: ["هوش مصنوعی", "تکنولوژی"],
  publishDate: "۳۰ شهریور ۱۴۰۵",
};

const Home: FC = () => {
  return (
    <div className="flex flex-col w-full lg:flex-row gap-2 ">
      <div className="flex flex-col items-center gap-2  ">
        <NewsHero />
        <NewsList title="آخرین اخبار" moreUrl="/news" />
      </div>
      <div className=" flex flex-col items-center gap-2  ">
        <NewsList title="اخبار منتخب" moreUrl="/news" />
        <NewsHeroCard
          commentCount={test.commentCount}
          description={test.description}
          id={test.id}
          image={test.image}
          publishDate={test.publishDate}
          tags={test.tags}
          title={test.title}
          url={test.url}
          className="lg:flex-1 lg:max-h-64"
        />
        <NewsList title="جدیدترین مطالب" moreUrl="/news" />
      </div>
    </div>
  );
};
export default Home;
