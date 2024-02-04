import React from "react";
import { Logo } from "./_components/logo";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center space-y-6 items-center h-full">
      <Logo />
      {children}
    </div>
  );
};

export default Layout;
