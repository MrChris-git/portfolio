import React from "react";

export type labelProps = {
  id?: string;
  className?: string;
  children?: string;
};

const Span: React.FC<labelProps> = ({ id, className, children }) => {
  return (
    <span id={id} className={`text-black dark:text-white ${className || ""}`}>
      {children}
    </span>
  );
};

export default Span;
