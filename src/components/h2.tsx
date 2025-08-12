import React, { FC } from "react";
import Label, { labelProps } from "./label";

const H2: FC<labelProps> = ({ id, className, children }) => {
  return (
    <Label id={id} className={`text-2xl  ${className || ""}`}>
      {children}
    </Label>
  );
};

export default H2;
