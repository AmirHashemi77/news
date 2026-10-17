import FilteringNews from "@/features/newsList/components/FilteringNews";
import NewsList from "@/features/newsList/components/NewsList";
import { getLatestNewsService } from "@/features/newsList/server/newsList.server";

import { FC } from "react";

interface PropsType {
  searchParams: Promise<{
    pageNumber: string;
    pageSize: string;
    title: string;
    toDate: string;
    fromDate: string;
  }>;
}

const LatestNewsListPage: FC<PropsType> = async (props) => {
  const { pageNumber, title } = await props.searchParams;

  const newsData = await getLatestNewsService({ pageNumber: pageNumber ? +pageNumber : 1, pageSize: 10, title });

  return (
    <div className="flex flex-col items-start gap-5">
      <FilteringNews />
      {newsData && <NewsList newsData={newsData} pagination={true} moreUrl={null} />}
    </div>
  );
};
export default LatestNewsListPage;
