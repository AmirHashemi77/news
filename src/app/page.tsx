import NewsHero from "@/features/newsList/components/sections/NewsHero";
import LatestNewsListSection from "@/features/newsList/components/sections/LatestNewsListSection";
import PopularNewsListSection from "@/features/newsList/components/sections/PopularNewsListSection";
import SportNewsListSection from "@/features/newsList/components/sections/SportNewsListSection";
import NewsPosterSection from "@/features/newsList/components/sections/NewsPosterSection";

const Home = async () => {
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
