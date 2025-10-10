import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header
      id="header"
      className="max-w-screen-sm bg-white mx-auto px-4 pt-4 flex justify-between items-center"
      aria-label="Header"
    >
      <img src="/Logo/node-logo.svg" alt="Node Logo" className="w-18 h-18" />

      <Link href="/login">
        <img
          src="/Logo/ieee-logo.svg"
          alt="IEEE Logo"
          className="w-12 h-12 cursor-pointer"
        />
      </Link>
    </header>
  );
};

export default Header;
