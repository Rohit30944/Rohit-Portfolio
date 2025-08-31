import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";

const Layout = () => {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Outlet /> {/* Renders the active route page */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
