import React from "react";
import Label, { labelProps } from "./label";

const H1: React.FC<labelProps> = ({ id, className, children }) => {
  return (
    <Label id={id} className={`text-4xl  ${className || ""}`}>
      {children}
    </Label>
  );
};

export default H1;
