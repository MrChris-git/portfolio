import React, { FC, ReactNode } from "react";

export type RowProps = {
  id: string;
  className: string;
  children: ReactNode;
};

const Row: FC<RowProps> = ({ id, className, children }) => {
  return (
    <div id={id || undefined} className={`flex ${className}`}>
      {children}
    </div>
  );
};

export default Row;
