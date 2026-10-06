"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useIntroPhase, useIntroReady } from "@/components/motion/intro";
import { DURATION, EASE_OUT, OFFSET } from "@/components/motion/timing";
import { Wordmark } from "@/components/wordmark";

export function AppHeader() {
  const phase = useIntroPhase();
  const ready = useIntroReady();

  return (
    <header className="sticky top-0 z-10 bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <Link
          href="/"
          aria-label="NODE feed"
          data-wordmark
          className={phase === "done" ? undefined : "opacity-0"}
        >
          <Wordmark />
        </Link>
        <motion.div
          initial={{ opacity: 0, y: -OFFSET.header }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: DURATION.header, ease: EASE_OUT }}
        >
          <Link href="/admin" aria-label="Admin" prefetch={false}>
            <Image
              src="/logos/ieee-srmist-logo.png"
              alt="IEEE SRMIST"
              width={36}
              height={36}
              priority
            />
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
