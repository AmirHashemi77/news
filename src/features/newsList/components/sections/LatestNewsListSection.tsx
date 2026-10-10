import { FC } from "react";
import NewsList from "../NewsList";
import { getLatestNewsService } from "../../server/newsList.server";

const LatestNewsListSection: FC = async () => {
  const newsData = await getLatestNewsService({ pageNumber: 1, pageSize: 10 });

  return (
    <>
      <NewsList newsData={newsData} title="آخرین اخبار" moreUrl="/newsList/latestNews" pagination={false} />
    </>
  );
};
export default LatestNewsListSection;
