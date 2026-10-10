import FilteringNews from "@/features/newsList/components/FilteringNews";
import NewsList from "@/features/newsList/components/NewsList";
import { getPopularNewsService } from "@/features/newsList/server/newsList.server";

import { FC } from "react";

interface PropsType {
  searchParams: Promise<{
    pageNumber: string;
    pageSize: string;
  }>;
}

const LatestNewsListPage: FC<PropsType> = async (props) => {
  const { pageNumber } = await props.searchParams;

  const newsData = await getPopularNewsService({ pageNumber: pageNumber ? +pageNumber : 1, pageSize: 10 });

  return (
    <div className="flex flex-col items-start gap-5">
      <FilteringNews />
      {newsData && <NewsList newsData={newsData} title="آخرین خبر" pagination={true} moreUrl={null} />}
    </div>
  );
};
export default LatestNewsListPage;
