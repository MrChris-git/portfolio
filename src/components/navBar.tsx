"use client";
import { navLink } from "@/types/navLink";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Label from "./label";
import ThemeTogglebtn from "./themeTogglebtn";

const navbar = () => {
  const pathname = usePathname();

  const links: navLink[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Me" },
    { href: "/about", label: "Projects" },
    { href: "/about", label: "Skills" },
    { href: "/about", label: "Resume" },
    { href: "/about", label: "Contact" },
  ];

  return (
    <div className="flex justify-center">
      <nav
        className={`flex flex-1 m-2 p-2 max-w-5xl border border-gray-500 items-center justify-around bg-[#FFFFFF] dark:bg-[#121212]`}
      >
        <Label>Mr. Chris</Label>
        {links.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              className={`text-black dark:text-white`}
              href={href}
              key={label}
            >
              {label}
            </Link>
          );
        })}
        <div id="btn-group">
          <ThemeTogglebtn />
        </div>
      </nav>
    </div>
  );
};

export default navbar;
