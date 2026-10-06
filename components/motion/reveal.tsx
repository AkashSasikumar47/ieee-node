"use client";

import { useEffect, useRef, useState } from "react";
import { motion, stagger, useInView, type Variants } from "motion/react";
import { useIntroReady } from "./intro";
import { DURATION, EASE_OUT, OFFSET, REVEAL } from "./timing";

let lastEntry = 0;
let queue = 0;

function nextDelay() {
  const now = performance.now();
  queue = now - lastEntry < REVEAL.window ? queue + 1 : 0;
  lastEntry = now;
  return Math.min(queue, REVEAL.max) * REVEAL.card;
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: OFFSET.item },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.item, ease: EASE_OUT },
  },
};

export function Reveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const ready = useIntroReady();
  const [delay, setDelay] = useState<number | null>(null);

  useEffect(() => {
    if (inView && ready) setDelay(nextDelay());
  }, [inView, ready]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={delay === null ? "hidden" : "shown"}
      variants={{
        hidden: { opacity: 0, y: OFFSET.rise },
        shown: {
          opacity: 1,
          y: 0,
          transition: {
            duration: DURATION.enter,
            ease: EASE_OUT,
            delay: delay ?? 0,
            delayChildren: stagger(REVEAL.item, {
              startDelay: (delay ?? 0) + REVEAL.inner,
            }),
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
