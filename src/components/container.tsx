import React, { FC, ReactNode } from "react";

export type ContainerPorps = {
  className?: string;
  children?: ReactNode;
};

const Container: FC<ContainerPorps> = ({ className, children }) => {
  return (
    <div id="container" className={`${className || ""}`}>
      {children}
    </div>
  );
};

export default Container;
