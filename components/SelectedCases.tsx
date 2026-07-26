"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

type Case = {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string | null;
  bg: string;
  initials: string;
  href: string;
};

type Props = {
  items: {
    id: string;
    title: string;
    category: string;
    year: string;
    image: string | null;
    bg: string | null;
    initials: string | null;
    href: string;
  }[];
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function SelectedCases({ items }: Props) {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>("all");

  const CASES: Case[] = items.map((c) => ({
    id: c.id,
    title: c.title,
    category: c.category || "uncategorized",
    year: c.year,
    image: c.image,
    bg: c.bg || "#1c1c1c",
    initials: c.initials || "",
    href: c.href,
  }));

  const categories = Array.from(new Set(CASES.map((c) => c.category)));
  const FILTERS = ["all", ...categories];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const reveals = section.querySelectorAll<HTMLElement>("[data-reveal]");
      gsap.set(reveals, { opacity: 0, y: 28, filter: "blur(8px)" });
      ScrollTrigger.batch(reveals, {
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

      section.querySelectorAll<HTMLElement>("[data-frame]").forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: frame, start: "top 85%" },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, [t]);

  const filterCount = (f: string) =>
    f === "all" ? CASES.length : CASES.filter((c) => c.category === f).length;

  return (
    <section
      id="work"
      ref={sectionRef}
      className="px-[7vw] py-[140px] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-14">
          <div>
            <h2
              data-reveal
              className="text-[clamp(30px,4.4vw,56px)] font-extrabold tracking-[-0.03em] m-0"
            >
              {t.selectedCases.sectionLabel}
            </h2>
            <p data-reveal className="mt-3 text-gray-500 text-base">
              {t.selectedCases.subtitle}
            </p>
          </div>
          <div data-reveal className="flex gap-2.5 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                data-cursor
                onClick={() => setFilter(f)}
                className={`cursor-pointer text-[13px] font-semibold tracking-[0.04em] px-4 py-[9px] rounded-full border transition-colors ${
                  filter === f
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-transparent text-gray-700 border-gray-300"
                }`}
              >
                {f === "all" ? t.selectedCases.filters.all : capitalize(f)} (
                {filterCount(f)})
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
          {CASES.filter((c) => filter === "all" || c.category === filter).map(
            (c) => (
              <div key={c.id} data-reveal>
                <div
                  data-frame
                  data-cursor
                  className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_20px_50px_-26px_rgba(0,0,0,0.25)] flex items-center justify-center"
                  style={{ background: c.image ? "#ffffff" : c.bg }}
                >
                  {c.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <>
                      <span className="absolute top-4 left-[18px] text-[11px] font-semibold tracking-[0.14em] uppercase text-gray-500">
                        {c.category}
                      </span>
                      <span className="text-[34px] font-extrabold tracking-[-0.02em] text-gray-600">
                        {c.initials}
                      </span>
                    </>
                  )}
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="text-[15px] font-bold tracking-[-0.01em] text-gray-900">
                    {c.title}
                  </span>
                  <span className="text-xs font-semibold text-gray-400">
                    {c.year}
                  </span>
                </div>
                <div className="mt-3 flex justify-end gap-2.5">
                  <Link
                    href={`/work/${c.id}`}
                    data-cursor
                    className="cursor-pointer text-[13px] font-semibold tracking-[0.02em] px-4 py-[9px] rounded-full border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
                  >
                    {t.selectedCases.seeLabel}
                  </Link>
                  {c.href && c.href !== "#" && (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor
                      className="cursor-pointer text-[13px] font-semibold tracking-[0.02em] px-4 py-[9px] rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                    >
                      {t.selectedCases.visitLabel}
                    </a>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
