"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Label from "./label";
import ThemeTogglebtn from "./themeTogglebtn";
import { links } from "@/data/navBtnData";
import Span from "./span";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const context = links.map(({ href, label }) => {
    const isActive = pathname === href;
    return (
      <Link
        id={label}
        className={`text-black dark:text-white ${
          !isActive && "hover:opacity-70"
        } ${isActive && "border-b-2 cursor-default"}`}
        href={href}
        key={label}
      >
        {label}
      </Link>
    );
  });

  return (
    <div className="flex justify-center md:h-20 h-14">
      <div
        className="absolute z-50 flex flex-1 m-2 p-2 md:w-5xl min-w-76 border-b-2 border-gray-500 
          items-center justify-between bg-[#FFFFFF] dark:bg-[#121212] rounded-tl-md rounded-tr-md"
      >
        <nav
          className={`hidden md:flex grow m-1 max-w-5xl
          items-center justify-around`}
        >
          <Label className="md:ml-8">Mr. Chris</Label>
          {context}
          <ThemeTogglebtn />
        </nav>
        <Label className="md:hidden">Mr. Chris</Label>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Span className="text-xl">{isOpen ? "✕" : "☰"}</Span>
        </button>
      </div>
      <nav
        className={`md:hidden absolute pt-16 left-0 h-screen w-full bg-white dark:bg-[#121212] flex flex-col gap-4 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "p-4 opacity-100" : "max-h-0 p-0 opacity-0"
        }`}
      >
        {context}
        <ThemeTogglebtn />
      </nav>
    </div>
  );
};

export default Navbar;
