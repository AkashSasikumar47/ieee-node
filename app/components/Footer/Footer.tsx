const Footer = () => {
  return (
    <footer
      id="footer"
      className="mx-auto flex max-w-screen-sm flex-col gap-8 bg-white px-8 py-4 text-center"
      aria-label="Site Footer"
    >
      <p className="text-xs font-normal text-neutral-400">
        INNOVATE . EDIFY . EXPERIENCE . EXCEL
      </p>

      <p className="text-xs font-light text-neutral-400">
        © {new Date().getFullYear()} WAD — IEEE SRMIST
      </p>
    </footer>
  );
};

export default Footer;
