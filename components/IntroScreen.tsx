"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { GREETING_TEXTS } from "@/components/ui/rotating-text";
import { useIntro } from "@/context/IntroContext";
import { lenisInstance } from "@/lib/lenis";

export default function IntroScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const { introComplete, setIntroComplete } = useIntro();
  const introRef = useRef<HTMLDivElement>(null);
  const greetRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intro = introRef.current;
    const greet = greetRef.current;
    const countEl = countRef.current;
    const bar = barRef.current;
    if (!intro || !greet || !countEl || !bar) return;

    if (lenisInstance) lenisInstance.stop();
    else document.documentElement.style.overflow = "hidden";

    const each = 0.36;
    const tl = gsap.timeline();

    GREETING_TEXTS.forEach((text) => {
      tl.set(greet, { textContent: text })
        .fromTo(
          greet,
          { yPercent: 70, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: each * 0.5, ease: "power3.out" },
        )
        .to(
          greet,
          {
            yPercent: -70,
            opacity: 0,
            duration: each * 0.45,
            ease: "power3.in",
          },
          `+=${each * 0.25}`,
        );
    });

    tl.to(
      { v: 0 },
      {
        v: 100,
        duration: tl.duration(),
        ease: "none",
        onUpdate: function () {
          const v = Math.round(this.targets()[0].v);
          countEl.textContent = String(v);
          bar.style.transform = `scaleX(${v / 100})`;
        },
      },
      0,
    );

    tl.to(
      intro,
      {
        yPercent: -100,
        duration: 0.9,
        ease: "expo.inOut",
        onStart: () => {
          if (lenisInstance) lenisInstance.start();
          else document.documentElement.style.overflow = "";
          setIntroComplete(true);
        },
      },
      "+=0.15",
    ).set(intro, { display: "none" });

    return () => {
      tl.kill();
    };
  }, [setIntroComplete]);

  return (
    <>
      <div
        ref={introRef}
        className="fixed inset-0 z-[999] flex items-center justify-center bg-white"
      >
        <div className="overflow-hidden px-[0.1em]">
          <span
            ref={greetRef}
            className="inline-block text-6xl md:text-8xl font-bold text-gray-900 tracking-tight"
            style={{ willChange: "transform, opacity" }}
          >
            {GREETING_TEXTS[0]}
          </span>
        </div>
        <div
          ref={countRef}
          className="absolute bottom-[6vh] right-[7vw] text-sm font-semibold tracking-wide text-gray-400 tabular-nums"
        >
          0
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200">
          <div
            ref={barRef}
            className="h-full origin-left scale-x-0 bg-gray-900"
          />
        </div>
      </div>

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
