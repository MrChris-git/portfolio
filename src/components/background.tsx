"use client";
import React from "react";
import Navbar from "./navBar";

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`h-screen w-screen m-0 p-0 bg-white dark:bg-black`}>
      <Navbar />
      {children}
    </div>
  );
};

export default Background;
