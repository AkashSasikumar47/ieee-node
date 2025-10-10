"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    return `font-medium text-base ${
      pathname === href ? "text-blue-700" : "hover:text-neutral-400"
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 max-w-screen-sm bg-white mx-auto px-4 pt-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Link href="/" className={getLinkClass("/")}>
          Feed
        </Link>
        <Link href="/event" className={getLinkClass("/event")}>
          Event
        </Link>
        <Link href="/meeting" className={getLinkClass("/meeting")}>
          Meeting
        </Link>
        <Link href="/workshop" className={getLinkClass("/workshop")}>
          Workshop
        </Link>
      </div>
      <hr className="border-t border-neutral-200 w-full shadow-xs" />
    </nav>
  );
};

export default Navbar;
