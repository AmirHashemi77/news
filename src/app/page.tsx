import NewsHero from "@/features/newsList/components/sections/NewsHero";
import NewsHeroCard from "@/features/newsList/components/NewsHeroCard";
import LatestNewsListSection from "@/features/newsList/components/sections/LatestNewsListSection";
import PopularNewsListSection from "@/features/newsList/components/sections/PopularNewsListSection";
import SportNewsListSection from "@/features/newsList/components/sections/SportNewsListSection";
import NewsPosterSection from "@/features/newsList/components/sections/NewsPosterSection";
const test = {
  id: "1",
  title: "تحولات جدید در حوزه هوش مصنوعی",
  description: "توسعه فناوری‌های هوش مصنوعی با سرعت زیادی ادامه دارد و شرکت‌ها در حال سرمایه‌گذاری روی زیرساخت‌های جدید هستند.",
  commentCount: 24,
  image: "https://media.mehrnews.com/d/2025/06/01/3/5530651.jpg?ts=1748777839185",
  url: "/news/ai-development",
  tags: ["هوش مصنوعی", "تکنولوژی"],
  publishDate: new Date(),
};

interface PropsType {
  params: Promise<{
    categorySlug: string;
  }>;
  searchParams: Promise<{
    pageNumber?: string;
    pageSize?: string;
  }>;
}

const Home = async ({ params, searchParams }: PropsType) => {
  return (
    <div className="flex flex-col w-full lg:flex-row gap-2 ">
      <div className="flex flex-col items-center gap-2  ">
        <NewsHero />
        <PopularNewsListSection />
      </div>
      <div className=" flex flex-col items-center gap-2  ">
        <SportNewsListSection />
        <NewsPosterSection />
        <LatestNewsListSection />
      </div>
    </div>
  );
};
export default Home;
