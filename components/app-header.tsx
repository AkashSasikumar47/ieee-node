"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { DURATION, EASE_OUT, OFFSET } from "@/components/motion/timing";
import { Wordmark } from "@/components/wordmark";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur-sm">
      <motion.div
        className="mx-auto flex max-w-md items-center justify-between px-4 py-3"
        initial={{ opacity: 0, y: -OFFSET.header }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.header, ease: EASE_OUT }}
      >
        <Link href="/" aria-label="NODE feed">
          <Wordmark />
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
      </motion.div>
    </header>
  );
}
