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
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll<HTMLElement>(".exp-item");
    if (!rows || rows.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(rows, { opacity: 0, y: 20 });
      rows.forEach((row, i) => {
        gsap.to(row, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: i * 0.08,
          scrollTrigger: { trigger: row, start: "top 90%", once: true },
        });
      });
    });

    return () => ctx.revert();
  }, [items]);

  return (
    <section id="experience" className="py-16 px-8 md:px-16 lg:px-24">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">
        {t.experience.sectionLabel}
      </h2>

      <div ref={listRef} className="relative">
        {/* vertical timeline line */}
        <div className="absolute left-[27px] top-8 bottom-8 w-px bg-gray-200" />

        {items.map((exp, i) => {
          const desc = lang === "en" ? exp.descEn : exp.descId;
          const period = localizePeriod(exp.period, lang);
          return (
            <div
              key={exp.id}
              className={`exp-item relative pl-20 ${i > 0 ? "border-t border-gray-200" : ""}`}
            >
              {/* timeline bullet */}
              <span
                className={`absolute left-5.25 top-13.5 w-3 h-3 rounded-full border-2 ${
                  isOngoing(exp.period)
                    ? "bg-gray-900 border-gray-900"
                    : "bg-white border-gray-300"
                }`}
              />

              <div className="py-8">
                {/* Header: logo badge + name/role + period */}
                <div className="grid grid-cols-[56px_1fr_auto] items-start gap-4 mb-5">
                  {/* Logo */}
                  {exp.logoImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={exp.logoImage}
                      alt={exp.org}
                      className="w-14 h-14 rounded-2xl object-cover bg-white shrink-0"
                    />
                  ) : (
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-white font-bold text-sm"
                      style={{ background: exp.logoColor }}
                    >
                      {exp.logoInitials}
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {exp.org}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">{exp.role}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {exp.division}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap bg-gray-100 rounded-full px-3 py-1">
                    {period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  {desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-600 bg-gray-100 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
