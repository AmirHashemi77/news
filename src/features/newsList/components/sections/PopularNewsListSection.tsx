import { FC } from "react";
import NewsList from "../NewsList";
import { getPopularNewsService } from "../../server/newsList.server";

const PopularNewsListSection: FC = async () => {
  const newsData = await getPopularNewsService({ pageNumber: 1, pageSize: 10 });

  return <NewsList newsData={newsData} moreUrl="/newsList/popularNews" pagination={false} />;
};
export default PopularNewsListSection;
