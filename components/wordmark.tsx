"use client";

import { motion, useAnimationControls } from "motion/react";
import { DURATION, EASE_OUT, WORDMARK } from "@/components/motion/timing";

const LETTERS = ["n", "o", "d", "e"];

function Node() {
  return (
    <span className="absolute top-[58%] left-1/2 size-[0.13em] -translate-1/2">
      <motion.span
        className="absolute inset-0 rounded-full bg-primary"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: DURATION.enter,
          ease: EASE_OUT,
          delay: WORDMARK.start + LETTERS.length * WORDMARK.letter,
        }}
      />
      <motion.span
        className="absolute top-1/2 left-1/2 -translate-1/2 rounded-full border-[1.5px] border-primary motion-reduce:hidden"
        initial={{ width: "0.13em", height: "0.13em", opacity: 0 }}
        animate={{
          width: ["0.13em", "1.3em"],
          height: ["0.13em", "1.3em"],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: WORDMARK.ping,
          ease: EASE_OUT,
          repeat: Infinity,
          repeatDelay: WORDMARK.rest,
          delay:
            WORDMARK.start + DURATION.enter + LETTERS.length * WORDMARK.letter,
        }}
      />
    </span>
  );
}

export function Wordmark() {
  const wave = useAnimationControls();

  return (
    <motion.span
      className="font-display flex text-[1.6rem] leading-none font-bold tracking-[-0.04em] text-primary lowercase"
      onHoverStart={() =>
        wave.start((index: number) => ({
          y: [0, "-0.12em", 0],
          transition: {
            duration: WORDMARK.wave,
            ease: EASE_OUT,
            delay: index * WORDMARK.letter * 0.6,
          },
        }))
      }
    >
      {LETTERS.map((letter, index) => (
        <motion.span
          key={index}
          className="relative inline-block"
          initial={{ opacity: 0, y: "0.5em", filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: DURATION.enter,
            ease: EASE_OUT,
            delay: WORDMARK.start + index * WORDMARK.letter,
          }}
        >
          <motion.span className="inline-block" custom={index} animate={wave}>
            {letter}
          </motion.span>
          {letter === "o" && <Node />}
        </motion.span>
      ))}
    </motion.span>
  );
}
