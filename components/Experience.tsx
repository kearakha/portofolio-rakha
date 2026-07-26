"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

type ExperienceItem = {
  id: string;
  period: string;
  org: string;
  role: string;
  division: string;
  tags: string[];
  logoInitials: string;
  logoColor: string;
  logoImage: string | null;
  descEn: string;
  descId: string;
};

type Props = {
  items: ExperienceItem[];
};

const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function localizePeriod(period: string, lang: "en" | "id"): string {
  if (lang === "en") return period;
  return period.replace(/\bPresent\b/g, "Sekarang");
}

function isOngoing(period: string): boolean {
  const end = period.split(/[–-]/).pop()?.trim() ?? "";
  if (/present|now|current/i.test(end)) return true;
  const m = end.match(/([A-Za-z]{3})[a-z]*\s+(\d{4})/);
  const now = new Date();
  if (m) {
    const month = MONTHS[m[1].toLowerCase()];
    const year = parseInt(m[2], 10);
    if (month === undefined) return false;
    return new Date(year, month + 1, 0) >= now;
  }
  const y = end.match(/^\d{4}$/);
  if (y) return parseInt(y[0], 10) >= now.getFullYear();
  return false;
}

export default function Experience({ items }: Props) {
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

      const line = section.querySelector<HTMLElement>("[data-line-fill]");
      const list = section.querySelector<HTMLElement>("[data-timeline]");
      if (line && list) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 70%",
              end: "bottom 75%",
              scrub: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, [items, t]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="px-[7vw] py-[140px] overflow-hidden"
    >
      <div className="max-w-[1000px] mx-auto">
        <div className="relative mb-20">
          <div className="absolute -top-[72px] -right-[10px] text-[210px] font-black tracking-[-0.05em] text-gray-100 pointer-events-none select-none leading-none">
            02
          </div>
          <h2
            data-reveal
            className="relative text-[clamp(30px,4.4vw,56px)] font-extrabold tracking-[-0.03em] m-0"
          >
            {t.experience.sectionLabel}
          </h2>
        </div>

        <div data-timeline className="relative pl-10">
          <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-gray-200 overflow-hidden">
            <div
              data-line-fill
              className="absolute inset-0 bg-gray-900 origin-top"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {items.map((exp, i) => {
            const desc = lang === "en" ? exp.descEn : exp.descId;
            const period = localizePeriod(exp.period, lang);
            const ongoing = isOngoing(exp.period);
            return (
              <div
                key={exp.id}
                data-reveal
                className={`relative pb-11 ${i > 0 ? "pt-8 border-t border-gray-100" : ""}`}
              >
                <span
                  className={`absolute -left-10 top-1.5 w-3 h-3 rounded-full border-2 ${
                    ongoing
                      ? "bg-gray-900 border-gray-900"
                      : "bg-white border-gray-300"
                  }`}
                />

                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <h3 className="text-xl font-bold tracking-[-0.01em]">
                    {exp.role}
                  </h3>
                  <span className="text-[13px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-full px-3 py-1">
                    {period}
                  </span>
                </div>
                <p className="mt-1 text-[15px] text-gray-500">
                  {exp.org} · {exp.division}
                </p>

                <p className="mt-3.5 text-sm text-gray-600 leading-relaxed">
                  {desc}
                </p>

                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-700 bg-gray-100 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
