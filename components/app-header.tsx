import Image from "next/image";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <Link href="/" aria-label="NODE feed">
          <Image
            src="/logos/node-logo.png"
            alt="NODE"
            width={80}
            height={28}
            priority
          />
        </Link>
        <Link href="/admin" aria-label="Admin" prefetch={false}>
          <Image
            src="/logos/ieee-srmist-logo.png"
            alt="IEEE SRMIST"
            width={36}
            height={36}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
