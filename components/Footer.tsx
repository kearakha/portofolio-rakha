"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/context/LanguageContext";
import type { SiteData, FooterData } from "@/lib/queries";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  site: SiteData | null;
  footer: FooterData | null;
};

export default function Footer({ site, footer }: Props) {
  const { lang, t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const footerLeft = footer?.left ?? site?.name ?? "";
  const footerRight = footer?.right
    ? lang === "en"
      ? footer.right.en
      : footer.right.id
    : "";
  const email = site?.email ?? "";
  const github = site?.github ?? "#";
  const linkedin = site?.linkedin ?? "#";

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

  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      xTo((e.clientX - rect.left - rect.width / 2) * 0.4);
      yTo((e.clientY - rect.top - rect.height / 2) * 0.4);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="px-[7vw] pt-[160px] pb-12 overflow-hidden border-t border-gray-100"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="relative text-center mb-[120px]">
          <p
            data-reveal
            className="text-[13px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-5"
          >
            {t.footer.eyebrow}
          </p>

          <div className="relative inline-block">
            <svg
              width="140"
              height="140"
              viewBox="0 0 140 140"
              aria-hidden="true"
              className="absolute -left-[100px] top-1/2 -translate-y-1/2 opacity-35 hidden md:block"
            >
              <path
                d="M70 5 A65 65 0 0 0 70 135"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M50 25 A45 45 0 0 0 50 115"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>

            <h2
              data-reveal
              className="font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(48px,9vw,128px)] uppercase m-0"
            >
              {t.footer.talkPrefix}{" "}
              <span className="text-[#9c9691]">{t.footer.talkAccent}</span>
            </h2>

            <svg
              width="140"
              height="140"
              viewBox="0 0 140 140"
              aria-hidden="true"
              className="absolute -right-[100px] top-1/2 -translate-y-1/2 -scale-x-100 opacity-35 hidden md:block"
            >
              <path
                d="M70 5 A65 65 0 0 0 70 135"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M50 25 A45 45 0 0 0 50 115"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div
            data-reveal
            className="mt-11 flex items-center justify-center gap-[18px] flex-wrap"
          >
            <a
              ref={ctaRef}
              href={`mailto:${email}`}
              data-cursor
              className="inline-flex items-center gap-2.5 bg-gray-900 text-white text-[15px] font-semibold px-7 py-[15px] rounded-full will-change-transform"
            >
              {email} →
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="text-[15px] font-semibold text-gray-900 border-b-[1.5px] border-gray-300 pb-0.5 hover:text-gray-500 transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="text-[15px] font-semibold text-gray-900 border-b-[1.5px] border-gray-300 pb-0.5 hover:text-gray-500 transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap border-t border-gray-200 pt-[26px]">
          <span className="text-[13px] text-gray-400">{footerLeft}</span>
          <span className="text-[13px] text-gray-400">{footerRight}</span>
        </div>
      </div>
    </footer>
  );
}
