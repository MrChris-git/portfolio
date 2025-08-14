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
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = links.map(({ href, label }) => {
    const isActive = pathname === href;
    return (
      <Link
        id={label}
        className={`text-black dark:text-white ${
          !isActive ? "hover:opacity-70" : "border-b-2 cursor-default"
        }`}
        href={href}
        key={label}
        onClick={() => setIsOpen(false)}
      >
        {label}
      </Link>
    );
  });

  return (
    <div
      id="navigation bar"
      className="flex justify-center md:min-h-20 min-h-14"
    >
      <div className="absolute z-50 flex flex-1 m-2 p-2 min-w-[80%] border-b-2 border-gray-500 items-center justify-between bg-[#FFFFFF] dark:bg-[#121212] rounded-tl-md rounded-tr-md">
        <nav className="hidden md:flex grow m-1 items-center justify-around">
          <Label className="md:ml-8">Mr. Chris</Label>
          {navLinks}
          <ThemeTogglebtn />
        </nav>
        <Label className="md:hidden">Mr. Chris</Label>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Span className="text-xl">{isOpen ? "✕" : "☰"}</Span>
        </button>
      </div>
      <nav
        className={`md:hidden fixed z-10 top-0 left-0 h-screen w-full bg-white dark:bg-[#121212] flex flex-col gap-4 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "p-4 pt-20 opacity-100 pointer-events-auto"
            : "max-h-0 p-0 opacity-0 pointer-events-none"
        }`}
      >
        {navLinks}
        <ThemeTogglebtn />
      </nav>
    </div>
  );
};

export default Navbar;
