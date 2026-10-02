"use client";

import { motion } from "motion/react";
import { DURATION, EASE_OUT, OFFSET } from "./timing";

const TAGS = {
  div: motion.div,
  main: motion.main,
  section: motion.section,
  p: motion.p,
};

export function FadeUp({
  as = "div",
  trigger = "mount",
  delay = 0,
  className,
  children,
}: {
  as?: keyof typeof TAGS;
  trigger?: "mount" | "view";
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = TAGS[as];
  const shown = { opacity: 1, y: 0 };
  const play =
    trigger === "mount"
      ? { animate: shown }
      : { whileInView: shown, viewport: { once: true, amount: 0.2 } };

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: OFFSET.rise }}
      {...play}
      transition={{ duration: DURATION.enter, ease: EASE_OUT, delay }}
    >
      {children}
    </Tag>
  );
}
