import React from "react";

const Header = () => {
  return (
    <header
      id="header"
      className="max-w-screen-sm bg-white mx-auto px-4 pt-4 flex justify-between items-center"
      aria-label="Header"
    >
      <img src="/Logo/node-logo.svg" alt="Node Logo" className="w-18 h-18" />
      <img src="/Logo/ieee-logo.svg" alt="IEEE Logo" className="w-12 h-12" />
    </header>
  );
};

export default Header;
