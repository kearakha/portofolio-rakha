"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const { t } = useLang();
  const pinRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const pinEl = pinRef.current;
    const wordsEl = wordsRef.current;
    if (!pinEl || !wordsEl) return;

    const ctx = gsap.context(() => {
      const spans = wordsEl.querySelectorAll<HTMLElement>("span");
      gsap.to(spans, {
        color: "#111111",
        stagger: 1,
        ease: "none",
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: "+=120%",
          scrub: true,
          pin: true,
        },
      });
    });

    return () => ctx.revert();
  }, [t]);

  const words = t.statement.text.split(" ");

  return (
    <section className="overflow-hidden">
      <div
        ref={pinRef}
        className="min-h-screen flex items-center px-[7vw] py-[120px]"
      >
        <div className="max-w-[1280px] mx-auto w-full flex justify-between items-end gap-10 flex-wrap">
          <div className="flex-[1_1_560px]">
            <p className="text-[13px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-10">
              {t.statement.label}
            </p>
            <h2
              ref={wordsRef}
              className="font-extrabold tracking-[-0.035em] leading-[1.16] text-[clamp(34px,5.4vw,76px)] uppercase text-gray-300"
            >
              {words.flatMap((w, i) =>
                i === 0
                  ? [
                      <span key={i} className="inline-block">
                        {w}
                      </span>,
                    ]
                  : [
                      " ",
                      <span key={i} className="inline-block">
                        {w}
                      </span>,
                    ],
              )}
            </h2>
          </div>
          <div className="text-right text-[13px] font-semibold tracking-[0.1em] uppercase text-gray-400 leading-[1.9] whitespace-nowrap">
            {t.statement.side.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
