import { FC } from "react";
import NewsList from "../NewsList";
import { getNewsByCategoryService } from "../../server/newsList.server";

const SportNewsListSection: FC = async () => {
  const newsData = await getNewsByCategoryService({ pageNumber: 1, pageSize: 10, categorySlug: "sports" });

  return <>{newsData && <NewsList newsData={newsData} title="خبرهای ورزشی" moreUrl="/newsList/sports" pagination={false} />}</>;
};
export default SportNewsListSection;
