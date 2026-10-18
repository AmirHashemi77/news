import Link from "next/link";
import { FC } from "react";

const menuList = [
  {
    id: "Home",
    title: "خانه",
    href: "/",
  },
  {
    id: "lastNews",
    title: "آخرین اخبار",
    href: "/newsList/latestNews",
  },
  {
    id: "sdastebandt",
    title: "دسته بندی",
    href: "/categoryList",
  },
  // {
  //   id: "short",
  //   title: "خبر های کوتاه",
  //   href: "/",
  // },
  // {
  //   id: "weather",
  //   title: "آب و هوا",
  //   href: "/",
  // },
  {
    id: "contactUs",
    title: "درباره ما",
    href: "/aboutus",
  },
];

const HeaderMenu: FC = () => {
  return (
    <nav className=" hidden lg:block p-3 bg-foreground w-full">
      <ul className="flex items-center justify-center gap-5 w-full">
        {menuList.map((item) => (
          <li className="cursor-pointer" key={item.id}>
            <Link className="text-background" href={item.href}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default HeaderMenu;
