"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { Wordmark } from "@/components/wordmark";
import { EASE_IN_OUT, INTRO } from "./timing";

type Phase = "intro" | "flying" | "reveal" | "done";

const IntroContext = createContext<Phase>("done");

export const useIntroPhase = () => useContext(IntroContext);

export const useIntroReady = () => {
  const phase = useIntroPhase();
  return phase === "reveal" || phase === "done";
};

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const reduced = useReducedMotion();
  const mark = useRef<HTMLDivElement>(null);
  const fly = useAnimationControls();

  useEffect(() => {
    if (reduced) {
      setPhase("done");
      return;
    }
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    let cancelled = false;
    let reveal: ReturnType<typeof setTimeout> | undefined;
    const timer = setTimeout(async () => {
      const from = mark.current?.firstElementChild?.getBoundingClientRect();
      const to = document
        .querySelector("[data-wordmark] > *")
        ?.getBoundingClientRect();
      setPhase("flying");
      reveal = setTimeout(
        () => setPhase("reveal"),
        INTRO.fly * (1 - INTRO.fade) * 1000,
      );
      if (from && to) {
        await fly.start({
          x: to.left - from.left,
          y: to.top - from.top,
          scale: to.width / from.width,
          transition: { duration: INTRO.fly, ease: EASE_IN_OUT },
        });
      }
      if (!cancelled) setPhase("done");
    }, INTRO.hold * 1000);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      clearTimeout(reveal);
      document.documentElement.style.overflow = "";
    };
  }, [fly, reduced]);

  useEffect(() => {
    if (phase === "done") document.documentElement.style.overflow = "";
  }, [phase]);

  return (
    <IntroContext.Provider value={phase}>
      {children}
      {phase !== "done" && (
        <div aria-hidden="true" className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-background"
            animate={{ opacity: phase === "reveal" ? 0 : 1 }}
            transition={{ duration: INTRO.fly * INTRO.fade, ease: EASE_IN_OUT }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <motion.div ref={mark} className="origin-top-left" animate={fly}>
              <Wordmark className="text-[min(22vw,7rem)]" pace={INTRO.pace} />
            </motion.div>
          </div>
        </div>
      )}
    </IntroContext.Provider>
  );
}
