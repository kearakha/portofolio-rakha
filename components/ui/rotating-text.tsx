"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const GREETING_TEXTS = [
  "Hello",
  "Halo",
  "Bonjour",
  "こんにちは",
  "안녕",
  "Ciao",
  "Hola",
];

export function RotatingText({
  className,
  interval = 2000,
  active = true,
}: {
  className?: string;
  interval?: number;
  active?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // transition = 30% of interval, capped between 0.15s and 0.4s
  const transitionDuration = Math.min(
    0.4,
    Math.max(0.15, (interval * 0.3) / 1000),
  );

  useEffect(() => {
    if (!active) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setIndex((prev) => {
        // stop at last index — no wrap
        if (prev >= GREETING_TEXTS.length - 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [interval, active]);

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: transitionDuration,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {GREETING_TEXTS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
