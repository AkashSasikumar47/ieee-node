import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header
      id="header"
      className="mx-auto flex max-w-screen-sm items-center justify-between bg-white px-4 pt-4"
      aria-label="Header"
    >
      <Image
        src="/Logo/node-logo.svg"
        alt="Node Logo"
        width={72}
        height={72}
        className="h-18 w-18"
        unoptimized
      />

      <Link href="/login">
        <Image
          src="/Logo/ieee-logo.svg"
          alt="IEEE Logo"
          width={48}
          height={48}
          className="h-12 w-12 cursor-pointer"
          unoptimized
        />
      </Link>
    </header>
  );
};

export default Header;
