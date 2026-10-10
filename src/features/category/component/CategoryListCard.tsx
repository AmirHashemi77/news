import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface PropsType {
  id: string;
  name: string;
  imageUrl: string;
  slug: string;
}

const CategoryListCard: FC<PropsType> = ({ slug, imageUrl, name }) => {
  return (
    <Link
      href={`newsList/${slug}`}
      className="flex items-center justify-center relative w-full basis-[calc(50%-1.25rem)] h-20 cursor-pointer hover:scale-105 transition-[scale] duration-300 rounded-2xl"
    >
      <span className="text-background z-20 text-2xl">{name}</span>
      <div className="w-full h-full absolute inset-0 z-10 bg-gray-500 opacity-60 rounded-2xl"></div>
      <Image src={imageUrl} alt="" fill className="object-cover rounded-2xl" />
    </Link>
  );
};
export default CategoryListCard;
