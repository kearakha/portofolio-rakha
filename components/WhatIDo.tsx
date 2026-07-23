"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function WhatIDo() {
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
        <div className="flex justify-between items-end gap-10 flex-wrap mb-[70px]">
          <h2
            data-reveal
            className="font-black tracking-[-0.04em] leading-[0.9] text-[clamp(48px,8vw,128px)] uppercase m-0"
          >
            <span className="text-gray-900">{t.whatIDo.headingBefore}</span>{" "}
            <span className="text-transparent [-webkit-text-stroke:1.5px_#111]">
              {t.whatIDo.headingOutline}
            </span>{" "}
            <span className="text-gray-900">{t.whatIDo.headingAfter}</span>
          </h2>
          <p
            data-reveal
            className="max-w-[280px] text-[15px] leading-relaxed text-gray-500 pb-3"
          >
            {t.whatIDo.intro}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-200">
          {t.whatIDo.categories.map((cat) => (
            <div key={cat.label} data-reveal className="pt-6">
              <h3 className="text-[13px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-[18px]">
                {cat.label}
              </h3>
              <div className="flex flex-col gap-3.5 text-base font-semibold tracking-[-0.01em] text-gray-900">
                {cat.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
