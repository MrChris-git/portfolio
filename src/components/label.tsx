import React from "react";

export type labelProps = {
  className?: string;
  children?: string;
};

const label: React.FC<labelProps> = ({ className, children }) => {
  return (
    <label className={`text-black dark:text-white ${children}`}>
      {children}
    </label>
  );
};

export default label;
