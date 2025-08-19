import React, { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4">
      <Suspense>{children}</Suspense>
    </div>
  );
};

export default Layout;
