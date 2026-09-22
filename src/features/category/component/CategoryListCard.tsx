import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface PropsType {
  id: string;
  title: string;
  imageUrl: string;
  categoryUrl: string;
}

const CategoryListCard: FC<PropsType> = ({ categoryUrl, imageUrl, title }) => {
  return (
    <Link href={categoryUrl} className="flex items-center justify-center relative w-full basis-[calc(50%-1.25rem)] h-20 cursor-pointer hover:scale-105 transition-[scale] duration-300 rounded-2xl">
      <span className="text-background z-20 text-2xl">{title}</span>
      <div className="w-full h-full absolute inset-0 z-10 bg-gray-500 opacity-60 rounded-2xl"></div>
      <Image src={imageUrl} alt="" fill className="object-cover rounded-2xl" />
    </Link>
  );
};
export default CategoryListCard;
