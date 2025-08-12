import { linearGradient } from "@/constants/css.c";
import React, { FC, ReactNode } from "react";

export type cardProps = {
  className?: string;
  children?: ReactNode;
};

const Card: FC<cardProps> = ({ className, children }) => {
  return (
    <div
      className={`flex border border-gray-500 rounded-2xl bg-gradient-to-br 
      ${linearGradient} backdrop-blur-2xl transition-all duration-300 shadow-xl ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
