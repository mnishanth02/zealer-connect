"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@ui/components/common/theme-toggle";
import { ChevronDown } from "lucide-react";

interface SideNavProps {}

export type SideNavItem = {
  title: string;
  path: string;
  iconName?: string;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/a/dashboard",
    iconName: "Home",
  },

  {
    title: "Circles",
    path: "/a/circles",
    iconName: "Compass",
  },
  {
    title: "Members",
    path: "/a/members",
    iconName: "Media",
  },
  {
    title: "Events",
    path: "/a/events",
    iconName: "Library",
  },
  {
    title: "Articles",
    path: "/a/articles",
    iconName: "Media",
  },

  {
    title: "Settings",
    path: "/a/settings",
    iconName: "Settings",
  },
  //   {
  //     title: "Projects",
  //     path: "/a/projects",
  //     iconName: "BriefCase",
  //     submenu: true,
  //     subMenuItems: [
  //       { title: "All", path: "/projects" },
  //       { title: "Web Design", path: "/projects/web-design" },
  //       { title: "Graphic Design", path: "/projects/graphic-design" },
  //     ],
  //   },
  //   {
  //     title: "Help",
  //     path: "/a/help",
  //     iconName: "Help",
  //   },
];

const SideNav: FC<SideNavProps> = () => {
  return (
    <div className="flex h-screen min-w-56 flex-col lg:min-w-64">
      <nav className="group z-10 flex h-full flex-col justify-between overflow-y-auto border-r py-1">
        <ul className="flex flex-col justify-start gap-y-2 px-2">
          <div className="mb-10 flex h-[40px]">
            <ThemeToggle />
            <Image src="/logo.png" alt="logo" width={40} height={0} />
          </div>
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`hover:bg-secondary flex w-full flex-row items-center justify-between rounded-full p-2 pl-3 transition-all ${
              pathname.includes(item.path) ? "bg-secondary" : ""
            }`}
          >
            <div className="flex flex-row items-center space-x-4">
              {/* {item.icon} */}
              <span className="flex font-semibold">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <ChevronDown />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path.includes(pathname) ? "text-secondary font-bold underline underline-offset-2" : ""
                    } hover:underline hover:underline-offset-2`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`hover:bg-accent flex flex-row items-center space-x-4 rounded-r-lg p-1.5 pl-4 ${
            item.path.includes(pathname) ? "bg-accent border-primary border-l-4 pl-[12px]" : ""
          }`}
        >
          {/* {item.icon} */}
          <span className="flex font-semibold">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
