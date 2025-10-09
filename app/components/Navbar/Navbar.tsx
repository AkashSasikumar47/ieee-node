import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 max-w-screen-sm bg-white mx-auto px-6 pt-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-medium text-base hover:text-blue-700">
          Home
        </Link>
        <Link
          href="/events"
          className="font-medium text-base hover:text-blue-700"
        >
          Event
        </Link>
        <Link
          href="/workshops"
          className="font-medium text-base hover:text-blue-700"
        >
          Workshop
        </Link>
        <Link
          href="/meetings"
          className="font-medium text-base hover:text-blue-700"
        >
          Meeting
        </Link>
      </div>
      <hr className="border-t border-neutral-200 w-full shadow-xs" />
    </nav>
  );
};

export default Navbar;
