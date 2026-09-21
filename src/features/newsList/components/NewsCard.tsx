import { cn } from "@/shared/lib/cn";
import Image from "next/image";
import Link from "next/link";

import { FiCalendar, FiMessageCircle } from "react-icons/fi";
import { type NewsCardProps } from "../types/NewsList.type";

export default function NewsCard({ id, title, description, commentCount, image, url, tags, publishDate, className }: NewsCardProps) {
  return (
    <Link
      href={url}
      data-id={id}
      className={cn(
        `
          group
          flex
          w-full
          gap-4
          rounded-xl
          bg-white
          p-3
          transition-transform
          duration-300
          ease-in-out
          hover:scale-[1.015]
        `,
        className,
      )}
    >
      {/* Image */}
      <div
        className="
          relative
          h-[110px]
          w-[150px]
          shrink-0
          overflow-hidden
          rounded-lg
        "
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="150px"
          className="
            object-cover
            transition-transform
            duration-500
            ease-in-out
            group-hover:scale-105
          "
        />
      </div>

      {/* Content */}
      <div
        dir="rtl"
        className="
          flex
          min-w-0
          flex-1
          flex-col
        "
      >
        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-1.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="
                  rounded
                  bg-gray-100
                  px-2
                  py-0.5
                  text-[10px]
                  font-medium
                  text-gray-600
                "
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2
          className="
            line-clamp-1
            text-sm
            font-bold
            leading-6
            text-gray-900
            transition-colors
            duration-200
            group-hover:text-blue-600
          "
        >
          {title}
        </h2>

        {/* Description */}
        <p
          className="
            mt-1
            line-clamp-2
            text-xs
            leading-5
            text-gray-500
          "
        >
          {description}
        </p>

        {/* Meta */}
        <div
          className="
            mt-auto
            flex
            items-center
            gap-4
            pt-2
            text-[11px]
            text-gray-400
          "
        >
          <div className="flex items-center gap-1">
            <FiCalendar className="size-3.5" />

            <span>{publishDate}</span>
          </div>

          <div className="flex items-center gap-1">
            <FiMessageCircle className="size-3.5" />

            <span>{commentCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
