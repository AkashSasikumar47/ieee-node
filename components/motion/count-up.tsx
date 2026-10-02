"use client";

import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "motion/react";
import { DURATION, EASE_OUT } from "./timing";

export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const from = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const start = from.current;
    from.current = value;
    if (reduced || start === value) return;
    const controls = animate(start, value, {
      duration: DURATION.count,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = `${Math.round(latest)}`;
      },
    });
    return () => controls.stop();
  }, [reduced, value]);

  return <span ref={ref}>{value}</span>;
}
