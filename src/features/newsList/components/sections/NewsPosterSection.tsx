import { FC } from "react";
import { getPosterNewsService } from "../../server/newsList.server";
import NewsHeroCard from "../NewsHeroCard";

const NewsPosterSection: FC = async () => {
  const newsList = await getPosterNewsService();
  if (!newsList?.newsList?.length) {
    console.error("Poster news list is empty or undefined");
    return null;
  }
  const newsItem = newsList.newsList[newsList.newsList.length - 1];
  return (
    <NewsHeroCard
      commentCount={newsItem.commentCount}
      subtitle={newsItem.title}
      id={newsItem.id}
      image={newsItem.imageUrl ? newsItem.imageUrl : ""}
      publishDate={newsItem.publishDate}
      categories={[]}
      title={newsItem.title}
      url={`news/${newsItem.id}`}
      className="lg:flex-1 lg:max-h-64"
    />
  );
};
export default NewsPosterSection;
