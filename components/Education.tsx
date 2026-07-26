"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

type EducationItem = {
  id: string;
  institution: string;
  short: string;
  degree: string;
  period: string;
  gpa: string | null;
  descEn: string;
  descId: string;
  tags: string[];
};

type Props = {
  items: EducationItem[];
};

const LOGO_MAP: Record<string, string> = {
  UDINUS: "/images/udinus.png",
  UGM: "/images/ugm.png",
};

export default function Education({ items }: Props) {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const rows = section.querySelectorAll<HTMLElement>("[data-reveal]");
      gsap.set(rows, { opacity: 0, y: 28, filter: "blur(8px)" });
      ScrollTrigger.batch(rows, {
        start: "top 90%",
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
  }, [items, t]);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="bg-[#fafafa] px-[7vw] py-[120px] overflow-hidden"
    >
      <div className="max-w-[1000px] mx-auto">
        <div className="relative mb-14">
          <div className="absolute -top-[72px] -left-[10px] text-[210px] font-black tracking-[-0.05em] text-gray-100 pointer-events-none select-none leading-none">
            03
          </div>
          <h2
            data-reveal
            className="relative text-[clamp(30px,4.4vw,56px)] font-extrabold tracking-[-0.03em] m-0"
          >
            {t.education.sectionLabel}
          </h2>
        </div>

        {items.map((edu, i) => {
          const desc = lang === "en" ? edu.descEn : edu.descId;
          const logoSrc = LOGO_MAP[edu.short];
          const period =
            lang === "id"
              ? edu.period.replace(/\bPresent\b/g, "Sekarang")
              : edu.period;
          return (
            <div
              key={edu.id}
              data-reveal
              className={`grid grid-cols-[64px_1fr_auto] items-start gap-[22px] py-7 ${
                i > 0 ? "border-t border-gray-200" : "border-t border-gray-200"
              }`}
            >
              {logoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoSrc}
                  alt={edu.short}
                  className="w-16 h-16 rounded-2xl object-contain bg-white border border-gray-100 p-2"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-100 text-gray-600 font-bold text-xs">
                  {edu.short}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-xl font-bold tracking-[-0.01em]">
                    {edu.institution}
                  </h3>
                  {edu.gpa && (
                    <span className="text-xs font-bold text-gray-900 bg-[#eafaf0] border border-[#bfead0] rounded-full px-2.5 py-0.5">
                      GPA {edu.gpa}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[15px] text-gray-500">{edu.degree}</p>
                <p className="mt-3.5 text-sm leading-relaxed text-gray-500 max-w-[560px]">
                  {desc}
                </p>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {edu.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <span className="text-[13px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-full px-3.5 py-1.5 whitespace-nowrap">
                {period}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
