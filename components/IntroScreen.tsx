"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { RotatingText, GREETING_TEXTS } from "@/components/ui/rotating-text";
import { useIntro } from "@/context/IntroContext";

// Atur total durasi intro dalam milidetik.
// Semua bahasa akan muncul rata-rata di dalam waktu ini.
const INTRO_DURATION_MS = 3500;

const interval = Math.floor(INTRO_DURATION_MS / GREETING_TEXTS.length);

export default function IntroScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const { introComplete, setIntroComplete } = useIntro();

  useEffect(() => {
    const t = setTimeout(() => setIntroComplete(true), INTRO_DURATION_MS);
    return () => clearTimeout(t);
  }, [setIntroComplete]);

  return (
    <>
      <AnimatePresence>
        {!introComplete && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[999] flex items-center justify-center bg-white"
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <RotatingText
              interval={interval}
              active={!introComplete}
              className="text-6xl md:text-8xl font-bold text-gray-900 tracking-tight"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: introComplete ? 1 : 0,
          y: introComplete ? 0 : 16,
        }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
          delay: introComplete ? 0.25 : 0,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
