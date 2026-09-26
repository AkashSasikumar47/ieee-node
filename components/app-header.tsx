import Link from "next/link";

export function AppHeader({ subtitle = "IEEE SRMIST" }: { subtitle?: string }) {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-md items-center px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            N
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold">NODE</span>
            <span className="text-xs text-muted-foreground">{subtitle}</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
