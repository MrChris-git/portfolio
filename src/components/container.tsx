import React, { FC, ReactNode } from "react";

export type ContainerPorps = {
  className?: string;
  children?: ReactNode;
};

const Container: FC<ContainerPorps> = ({ className, children }) => {
  return (
    <div
      id="container"
      className={`flex grow justify-center ${className || ""}`}
    >
      <div className="max-w-6xl w-5/6">{children}</div>
    </div>
  );
};

export default Container;
