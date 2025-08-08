"use client";
import React from "react";
import Navbar from "./navBar";

const background = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`min-h-screen w-full m-0 p-0 bg-white dark:bg-black`}>
      <Navbar />
      {children}
    </div>
  );
};

export default background;
