import { FC } from "react";
import NewsHeroCard from "../NewsHeroCard";
import { getPosterNewsService } from "../../server/newsList.server";

const NewsHero: FC = async () => {
  const news = await getPosterNewsService();

  return (
    <div className="grid grid-cols-6 grid-rows-6 gap-4 w-full">
      {news.newsList.map((item, indx) => {
        if (indx > 3) {
          return;
        }
        if (indx === 0) {
          return (
            <div key={item.id} className="col-span-6 row-span-4">
              <NewsHeroCard
                commentCount={item.commentCount}
                subtitle={item.title}
                id={item.id}
                image={item.imageUrl ? item.imageUrl : ""}
                publishDate={item.publishDate}
                categories={item.categories}
                title={item.title}
                url={`news/${item.id}`}
              />
            </div>
          );
        }
        if (indx === 1) {
          return (
            <div key={item.id} className="col-span-3 row-span-2 row-start-5">
              <NewsHeroCard
                commentCount={item.commentCount}
                subtitle={item.title}
                id={item.id}
                image={item.imageUrl ? item.imageUrl : ""}
                publishDate={item.publishDate}
                categories={item.categories}
                title={item.title}
                url={`news/${item.id}`}
              />
            </div>
          );
        }
        if (indx === 2) {
          return (
            <div key={item.id} className="col-span-3 row-span-2 col-start-4 row-start-5">
              <NewsHeroCard
                commentCount={item.commentCount}
                subtitle={item.title}
                id={item.id}
                image={item.imageUrl ? item.imageUrl : ""}
                publishDate={item.publishDate}
                categories={item.categories}
                title={item.title}
                url={`news/${item.id}`}
              />
            </div>
          );
        }
      })}
    </div>
  );
};
export default NewsHero;
