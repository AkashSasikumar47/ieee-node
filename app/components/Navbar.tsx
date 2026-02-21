"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    return `text-sm font-medium ${
      pathname === href ? "text-blue-700" : "hover:text-neutral-400"
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 mx-auto flex max-w-screen-sm flex-col gap-4 bg-white px-4 pt-4">
      <div className="flex items-center justify-between">
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
      <hr className="w-full border-t border-neutral-200 shadow-xs" />
    </nav>
  );
};

export default Navbar;
