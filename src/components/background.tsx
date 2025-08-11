"use client";
import React from "react";
import Navbar from "./navBar";
import Footer from "./footer";
import Container from "./container";

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      id="background"
      className={`min-h-screen flex flex-col m-0 p-0 bg-white dark:bg-[#1a1a1a]`}
    >
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
};

export default Background;
