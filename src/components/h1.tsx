import React from "react";
import Label from "./label";

export type H1Props = {
  className?: string;
  children?: string;
};

const H1: React.FC<H1Props> = ({ className, children }) => {
  return <Label className={`text-4xl  ${className || ""}`}>{children}</Label>;
};

export default H1;
