import FilteringNews from "@/features/newsList/components/FilteringNews";
import NewsList from "@/features/newsList/components/NewsList";

import { FC } from "react";

interface PropsType {
  params: {
    category: string;
  };
}

const NewsListByCategory: FC<PropsType> = async (props) => {
  const params = await props.params;
  return (
    <div className="flex flex-col items-start gap-5">
      <FilteringNews />
      <NewsList title="آخرین خبر" pagination={true} moreUrl={null} />
    </div>
  );
};
export default NewsListByCategory;
