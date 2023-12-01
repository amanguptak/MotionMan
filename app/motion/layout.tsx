import React from "react";
import Navbar from "./Navbar";
import Banner from "@/components/Banner";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <Banner/>
      <main className="p-4">{children}</main>
    </>
  );
};

export default Layout;
