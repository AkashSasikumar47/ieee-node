import React from "react";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="max-w-screen-sm bg-white mx-auto px-8 py-4 text-center flex flex-col gap-8"
      aria-label="Site Footer"
    >
      <p className="font-normal text-xs text-neutral-400">
        INNOVATE . EDIFY . EXPERIENCE . EXCEL
      </p>

      <p className="font-light text-xs text-neutral-400">
        © {new Date().getFullYear()} WAD — IEEE SRMIST
      </p>
    </footer>
  );
};

export default Footer;
