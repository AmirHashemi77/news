import Link from "next/link";
import { FC } from "react";
import { FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa";
import { SearchInput } from "./SearchInput";
import SearchAction from "@/shared/action/SearchAction";
import HeaderMenu from "./HeaderMenu";
import MobileMenu from "./MobileHeaderMenu";
import Image from "next/image";

const socialMedia = [
  {
    id: "instagram",
    icon: <FaInstagram className="" />,
    href: "#",
  },
  {
    id: "linkedin",
    icon: <FaLinkedin />,
    href: "#",
  },
  {
    id: "telegram",
    icon: <FaTelegram />,
    href: "#",
  },
];

const Header: FC = () => {
  return (
    <header className="flex flex-col items-start w-full border-b border-gray-400 shadow-lg lg:border-0 lg:shadow-none">
      <div className="p-4 mx-auto max-w-7xl w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col items-start gap-2">
            {/* <h1 className="text-3xl md:text-5xl font-bold">تیتر</h1> */}
            <Image src="/Untitled-2.png" alt="logo" width={80} height={50} preload />
            <span className="text-md text-gray-500">مهم‌ترین‌ها، بدون حاشیه ...</span>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="hidden flex-row items-center gap-3 lg:flex">
              {socialMedia.map((item) => (
                <Link key={item.id} href={item.href}>
                  {item.icon}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <SearchInput minLength={4} action={SearchAction} />
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
      <HeaderMenu />
    </header>
  );
};
export default Header;
