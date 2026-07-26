"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLang } from "@/context/LanguageContext";
import { useIntro } from "@/context/IntroContext";
import type { SiteData, HeroData, MarqueeData, AboutData } from "@/lib/queries";

type Props = {
  site: SiteData | null;
  hero: HeroData | null;
  about: AboutData | null;
  marquee: MarqueeData | null;
};

function splitChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.textContent = "";
  const inners: HTMLElement[] = [];
  [...text].forEach((ch) => {
    const wrap = document.createElement("span");
    wrap.className =
      "inline-block overflow-hidden align-bottom whitespace-nowrap";
    const inner = document.createElement("span");
    inner.className = "hero-char inline-block will-change-transform";
    inner.textContent = ch === " " ? " " : ch;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    inners.push(inner);
  });
  return inners;
}

export default function Hero({ site, hero, about }: Props) {
  const { lang } = useLang();
  const { introComplete } = useIntro();

  const bgRef = useRef<HTMLImageElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const body = about ? (lang === "en" ? about.body.en : about.body.id) : "";
  const [nameLine1, ...nameRest] = (site?.shortName ?? site?.name ?? "").split(
    " ",
  );
  const nameLine2 = nameRest.join(" ");
  const available = hero
    ? lang === "en"
      ? hero.available.en
      : hero.available.id
    : "";
  const email = site?.email ?? "";
  const avatar = site?.avatar ?? "/images/avatar/foto-bengkod-kecil.png";
  const role = site?.role ?? "";
  const institution = site?.institution ?? "";

  // Reveal timeline — gated on intro completion, replays on language switch.
  useEffect(() => {
    const bgEl = bgRef.current;
    const eyebrowEl = eyebrowRef.current;
    const nameEl = nameRef.current;
    const fadeEl = fadeRef.current;
    if (!bgEl || !eyebrowEl || !nameEl || !fadeEl) return;

    const lines = nameEl.querySelectorAll<HTMLElement>("[data-hero-line]");
    const chars = [...lines].flatMap((line) => splitChars(line));

    gsap.set(bgEl, { opacity: 0, scale: 1.04 });
    gsap.set(eyebrowEl, { opacity: 0, y: 22, filter: "blur(8px)" });
    gsap.set(chars, { yPercent: 115 });
    gsap.set(fadeEl, { opacity: 0, y: 22, filter: "blur(8px)" });

    if (!introComplete) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(bgEl, { opacity: 0.22, scale: 1, duration: 1.4 }, 0)
      .to(
        eyebrowEl,
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
        0.1,
      )
      .to(chars, { yPercent: 0, duration: 1.1, stagger: 0.022 }, "-=0.5")
      .to(
        fadeEl,
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
        "-=0.8",
      );

    return () => {
      tl.kill();
    };
  }, [introComplete, nameLine1, nameLine2]);

  // Magnetic pull on the "available" pill.
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
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center px-[7vw] pt-[140px] pb-[100px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={bgRef}
        src={avatar}
        alt=""
        className="absolute bottom-[-2%] left-1/2 -translate-x-1/2 h-[96%] w-auto object-contain grayscale contrast-[1.05] pointer-events-none will-change-transform"
      />

      <div className="relative z-[1] w-full">
        <div
          ref={eyebrowRef}
          className="flex items-center justify-between gap-6 flex-wrap mb-14"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-gray-900/50" />
            <span className="text-[13px] font-semibold tracking-[0.18em] uppercase text-gray-500">
              {role} · {institution}
            </span>
          </div>
          <a
            ref={ctaRef}
            href={`mailto:${email}`}
            data-cursor
            className="inline-flex items-center gap-2.5 bg-gray-900 text-white text-sm font-semibold px-[22px] py-[13px] rounded-full will-change-transform"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {available}
          </a>
        </div>

        <h1
          ref={nameRef}
          className="font-black tracking-[-0.045em] leading-[0.86] text-[clamp(64px,11.2vw,190px)] text-gray-900 uppercase text-center"
        >
          <span data-hero-line className="block whitespace-nowrap">
            {nameLine1}
          </span>
          <span
            data-hero-line
            className="block whitespace-nowrap text-[#b0aca4]"
          >
            {nameLine2}
          </span>
        </h1>

        <div ref={fadeRef}>
          <p className="mt-8 mx-auto max-w-[480px] text-center text-base leading-relaxed text-gray-400">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
