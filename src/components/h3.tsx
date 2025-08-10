import React from "react";
import Label from "./label";

export type H3Props = {
  className?: string;
  children?: string;
};

const H3: React.FC<H3Props> = ({ className, children }) => {
  return <Label className={`text-xl  ${className || ""}`}>{children}</Label>;
};

export default H3;
