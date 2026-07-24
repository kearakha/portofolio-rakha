"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

type Category = "academic" | "ml" | "tooling";

type Case = {
  id: string;
  category: Category;
  year: string;
  image: string | null;
  bg: string;
  initials: string;
};

const CASES: Case[] = [
  {
    id: "fikTa",
    category: "academic",
    year: "2023→",
    image: "/images/projects/fik-ta.png",
    bg: "#e9e9e9",
    initials: "",
  },
  {
    id: "ews",
    category: "academic",
    year: "2023→",
    image: "/images/projects/ews.png",
    bg: "#e9e9e9",
    initials: "",
  },
  {
    id: "sti",
    category: "academic",
    year: "2023",
    image: null,
    bg: "#1c1c1c",
    initials: "STI",
  },
  {
    id: "ewsProto",
    category: "academic",
    year: "2023",
    image: null,
    bg: "#201f1f",
    initials: "EWS-P",
  },
  {
    id: "fnc",
    category: "ml",
    year: "2024",
    image: null,
    bg: "#181818",
    initials: "FNC",
  },
  {
    id: "nlp",
    category: "ml",
    year: "2024",
    image: null,
    bg: "#1c1c1c",
    initials: "NLP",
  },
  {
    id: "api",
    category: "tooling",
    year: "2024",
    image: null,
    bg: "#201f1f",
    initials: "API",
  },
  {
    id: "abs",
    category: "tooling",
    year: "2023",
    image: null,
    bg: "#181818",
    initials: "ABS",
  },
];

const FILTERS: (Category | "all")[] = ["all", "academic", "ml", "tooling"];

export default function SelectedCases() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Category | "all">("all");

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
        const img = frame.querySelector<HTMLElement>("[data-img-parallax]");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [t]);

  const filterCount = (f: Category | "all") =>
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
                {t.selectedCases.filters[f]} ({filterCount(f)})
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
                  style={{ background: c.bg }}
                >
                  {c.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.image}
                      alt={
                        t.selectedCases.titles[
                          c.id as keyof typeof t.selectedCases.titles
                        ]
                      }
                      data-img-parallax
                      className="w-full h-[118%] object-cover"
                    />
                  ) : (
                    <>
                      <span className="absolute top-4 left-[18px] text-[11px] font-semibold tracking-[0.14em] uppercase text-gray-500">
                        {t.selectedCases.filters[c.category]}
                      </span>
                      <span className="text-[34px] font-extrabold tracking-[-0.02em] text-gray-600">
                        {c.initials}
                      </span>
                    </>
                  )}
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="text-[15px] font-bold tracking-[-0.01em] text-gray-900">
                    {
                      t.selectedCases.titles[
                        c.id as keyof typeof t.selectedCases.titles
                      ]
                    }
                  </span>
                  <span className="text-xs font-semibold text-gray-400">
                    {c.year}
                  </span>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
