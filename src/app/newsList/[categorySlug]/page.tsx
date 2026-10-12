import FilteringNews from "@/features/newsList/components/FilteringNews";
import NewsList from "@/features/newsList/components/NewsList";
import { getNewsByCategoryService } from "@/features/newsList/server/newsList.server";
import { notFound } from "next/navigation";

import { FC } from "react";

interface PropsType {
  params: Promise<{
    categorySlug: string;
  }>;
  searchParams: Promise<{
    pageNumber: string;
    pageSize: string;
    title: string;
    toDate: string;
    fromDate: string;
  }>;
}

const NewsListByCategory: FC<PropsType> = async (props) => {
  const { categorySlug } = await props.params;
  const { pageNumber, fromDate, title, toDate } = await props.searchParams;

  const newsData = await getNewsByCategoryService({ pageNumber: pageNumber ? +pageNumber : 1, pageSize: 10, categorySlug: categorySlug, title, fromDate, toDate });

  if (!newsData) {
    notFound();
  }

  return (
    <div className="flex flex-col items-start gap-5">
      <FilteringNews />
      {newsData && <NewsList newsData={newsData} title="آخرین خبر" pagination={true} moreUrl={null} />}
    </div>
  );
};
export default NewsListByCategory;
