import { cn } from "@/shared/lib/cn";
import Image from "next/image";
import Link from "next/link";

import { FiCalendar, FiMessageCircle } from "react-icons/fi";

interface NewsImageCardProps {
  id: string;
  title: string;
  description: string;
  commentCount: number;
  image: string;
  url: string;
  tags: string[];
  publishDate: string;
  className?: string;
}

export default function NewsHeroCard({ id, title, description, commentCount, image, url, tags, publishDate, className }: NewsImageCardProps) {
  return (
    <Link
      href={url}
      data-id={id}
      aria-label={title}
      className={cn(
        `
          group
          relative
          block
          aspect-[4/3]
          w-full
          overflow-hidden
          rounded-xl
          bg-gray-900
          transition-transform
          duration-300
          ease-in-out
          hover:scale-[1.02]
        `,
        className,
      )}
    >
      {/* Image */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className="
          object-cover
          transition-transform
          duration-500
          ease-out
          group-hover:scale-105
        "
      />

      {/* Dark Gradient */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/20
          to-black/10
          transition-colors
          duration-300
          group-hover:from-black/95
        "
      />

      {/* Content */}
      <div
        dir="rtl"
        className="
          absolute
          inset-0
          z-10
          flex
          flex-col
          justify-between
          p-4
        "
      >
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="
                rounded-sm
                bg-white/90
                px-2.5
                py-1
                text-[10px]
                font-semibold
                text-gray-900
                backdrop-blur-sm
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom Content */}
        <div>
          <h2
            className="
              line-clamp-2
              text-lg
              font-bold
              leading-7
              text-white
              transition-transform
              duration-300
              group-hover:-translate-y-1
              sm:text-xl
            "
          >
            {title}
          </h2>

          {/* Description for accessibility / semantic content */}
          <p className="sr-only">{description}</p>

          {/* Meta */}
          <div
            className="
              mt-3
              flex
              items-center
              gap-4
              text-xs
              text-white/70
            "
          >
            <div className="flex items-center gap-1.5">
              <FiCalendar className="size-3.5" />

              <span>{publishDate}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <FiMessageCircle className="size-3.5" />

              <span>{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
