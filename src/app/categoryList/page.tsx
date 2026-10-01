import CategoryListCard from "@/features/category/component/CategoryListCard";
import Image from "next/image";
import { FC } from "react";

export const newsCategories = [
  {
    id: "1",
    title: "سیاسی",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883342.jpg",
    categoryUrl: "/newsList/politics",
  },
  {
    id: "2",
    title: "اقتصادی",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883321.jpg",
    categoryUrl: "/newsList/economy",
  },
  {
    id: "3",
    title: "ورزشی",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883312.jpg",
    categoryUrl: "/newsList/sports",
  },
  {
    id: "4",
    title: "فرهنگ و هنر",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883342.jpg",
    categoryUrl: "/newsList/culture",
  },
  {
    id: "5",
    title: "علم و فناوری",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883321.jpg",
    categoryUrl: "/newsList/technology",
  },
  {
    id: "6",
    title: "اجتماعی",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883312.jpg",
    categoryUrl: "/newsList/social",
  },
  {
    id: "7",
    title: "بین‌الملل",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883342.jpg",
    categoryUrl: "/newsList/world",
  },
  {
    id: "8",
    title: "سلامت",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883321.jpg",
    categoryUrl: "/newsList/health",
  },
  {
    id: "9",
    title: "آموزش",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883312.jpg",
    categoryUrl: "/newsList/education",
  },
  {
    id: "10",
    title: "گردشگری",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883342.jpg",
    categoryUrl: "/newsList/tourism",
  },
  {
    id: "11",
    title: "محیط زیست",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883321.jpg",
    categoryUrl: "/newsList/environment",
  },
  {
    id: "12",
    title: "خودرو",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883312.jpg",
    categoryUrl: "/newsList/automotive",
  },
  {
    id: "13",
    title: "بازار و بورس",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883342.jpg",
    categoryUrl: "/newsList/market",
  },
  {
    id: "14",
    title: "رسانه",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883321.jpg",
    categoryUrl: "/newsList/media",
  },
  {
    id: "15",
    title: "استان‌ها",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883312.jpg",
    categoryUrl: "/newsList/provinces",
  },
  {
    id: "16",
    title: "حوادث",
    imageUrl: "https://media.mehrnews.com/d/2026/01/27/4/5883342.jpg",
    categoryUrl: "/newsList/incidents",
  },
];

const CategoryListPage: FC = () => {
  return (
    <div className="flex flex-col items-start gap-5 w-full">
      <div className="flex items-center justify-between gap-5 flex-wrap w-full">
        {newsCategories.map((item) => {
          return <CategoryListCard categoryUrl={item.categoryUrl} id={item.id} imageUrl={item.imageUrl} title={item.title} key={item.id} />;
        })}
      </div>
    </div>
  );
};
export default CategoryListPage;
