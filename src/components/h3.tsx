import React from "react";
import Label, { labelProps } from "./label";

const H3: React.FC<labelProps> = ({ id, className, children }) => {
  return (
    <Label id={id} className={`text-xl  ${className || ""}`}>
      {children}
    </Label>
  );
};

export default H3;
