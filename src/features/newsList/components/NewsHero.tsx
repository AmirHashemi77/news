import { FC } from "react";
import NewsHeroCard from "./NewsHeroCard";
import { newsListData } from "../data/newsListData";


const NewsHero: FC = () => {
  return (
    <div className="grid grid-cols-6 grid-rows-6 gap-4 w-full">
      {newsListData.map((item, indx) => {
        if (indx > 3) {
          return;
        }
        if (indx === 0) {
          return (
            <div key={item.id} className="col-span-6 row-span-4">
              <NewsHeroCard
                commentCount={item.commentCount}
                description={item.description}
                id={item.id}
                image={item.image}
                publishDate={item.publishDate}
                tags={item.tags}
                title={item.title}
                url={item.url}
              />
            </div>
          );
        }
        if (indx === 1) {
          return (
            <div key={item.id} className="col-span-3 row-span-2 row-start-5">
              <NewsHeroCard
                commentCount={item.commentCount}
                description={item.description}
                id={item.id}
                image={item.image}
                publishDate={item.publishDate}
                tags={item.tags}
                title={item.title}
                url={item.url}
              />
            </div>
          );
        }
        if (indx === 2) {
          return (
            <div key={item.id} className="col-span-3 row-span-2 col-start-4 row-start-5">
              <NewsHeroCard
                commentCount={item.commentCount}
                description={item.description}
                id={item.id}
                image={item.image}
                publishDate={item.publishDate}
                tags={item.tags}
                title={item.title}
                url={item.url}
              />
            </div>
          );
        }
      })}
    </div>
  );
};
export default NewsHero;
