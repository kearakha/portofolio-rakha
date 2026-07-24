"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function FocusAreasStack() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const els = section.querySelectorAll<HTMLElement>("[data-reveal]");
      gsap.set(els, { opacity: 0, y: 28, filter: "blur(8px)" });
      ScrollTrigger.batch(els, {
        start: "top 86%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.85,
            stagger: 0.1,
            ease: "expo.out",
          }),
      });
    }, section);

    return () => ctx.revert();
  }, [t]);

  return (
    <section ref={sectionRef} className="px-[7vw] py-[140px] overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <p
          data-reveal
          className="text-[13px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2"
        >
          {t.focusAreas.label}
        </p>
        <h2
          data-reveal
          className="italic font-medium text-[clamp(40px,6vw,84px)] tracking-[-0.02em] mb-[70px]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {t.focusAreas.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_2fr] gap-[60px]">
          <div
            data-reveal
            className="flex flex-col gap-[18px] text-[15px] font-semibold uppercase tracking-[0.02em] border-t border-gray-200 pt-6"
          >
            {t.focusAreas.categories.map((cat, i) => (
              <div
                key={cat.label}
                className={`flex justify-between ${
                  i < t.focusAreas.categories.length - 1
                    ? "border-b border-gray-200 pb-3.5"
                    : ""
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className="text-gray-400 normal-case italic"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  ({cat.count})
                </span>
              </div>
            ))}
          </div>

          <div
            data-reveal
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-[14.5px] text-gray-600 leading-[2.1] border-t border-gray-200 pt-6"
          >
            {t.focusAreas.stack.map((col, i) => (
              <div key={i}>
                {col.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
