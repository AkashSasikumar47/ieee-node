import Link from "next/link";
import { Button } from "@ieee/ui/components/button";
import { AppHeader } from "@/components/app-header";
import { FadeUp } from "@/components/motion/fade-up";

export default function NotFound() {
  return (
    <div className="flex-1">
      <AppHeader />
      <FadeUp
        as="main"
        className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-16 text-center"
      >
        <p className="text-sm text-muted-foreground">
          That page doesn&apos;t exist.
        </p>
        <Button variant="outline" asChild>
          <Link href="/">Back to the feed</Link>
        </Button>
      </FadeUp>
    </div>
  );
}
