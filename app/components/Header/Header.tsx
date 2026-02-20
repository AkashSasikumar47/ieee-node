import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header
      id="header"
      className="max-w-screen-sm bg-white mx-auto px-4 pt-4 flex justify-between items-center"
      aria-label="Header"
    >
      <Image
        src="/Logo/node-logo.svg"
        alt="Node Logo"
        width={72}
        height={72}
        className="w-18 h-18"
        unoptimized
      />

      <Link href="/login">
        <Image
          src="/Logo/ieee-logo.svg"
          alt="IEEE Logo"
          width={48}
          height={48}
          className="w-12 h-12 cursor-pointer"
          unoptimized
        />
      </Link>
    </header>
  );
};

export default Header;
