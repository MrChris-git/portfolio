import React from "react";

export type labelProps = {
  id?: string;
  className?: string;
  children?: React.ReactNode; // <-- fix here
};

const Label: React.FC<labelProps> = ({ id, className, children }) => {
  return (
    <label id={id} className={`text-black dark:text-white ${className || ""}`}>
      {children}
    </label>
  );
};

export default Label;
