import React from "react";
import Navbar from "./Navbar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="p-4">{children}</main>
    </>
  );
};

export default Layout;
