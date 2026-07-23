"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TiltedCard from "./TiltedCard";
import { useLang } from "@/context/LanguageContext";
import { useIntro } from "@/context/IntroContext";
import type { SiteData, HeroData, MarqueeData, AboutData } from "@/lib/queries";

type Props = {
  site: SiteData | null;
  hero: HeroData | null;
  about: AboutData | null;
  marquee: MarqueeData | null;
};

export default function Hero({ site, hero, about }: Props) {
  const { lang } = useLang();
  const { introComplete } = useIntro();

  const headingRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const avatarWrapRef = useRef<HTMLDivElement>(null);

  const headingMain = about
    ? lang === "en"
      ? about.headingMain.en
      : about.headingMain.id
    : "";

  const headingAccent = about
    ? lang === "en"
      ? about.headingAccent.en
      : about.headingAccent.id
    : "";

  const body = about ? (lang === "en" ? about.body.en : about.body.id) : "";

  const available = hero
    ? lang === "en"
      ? hero.available.en
      : hero.available.id
    : "";

  const heading = headingMain + (headingAccent ? " " + headingAccent : "");
  const words = heading.split(" ");

  const shortName = site?.shortName ?? "";
  const email = site?.email ?? "";
  const avatar = site?.avatar ?? "/images/avatar/foto-bengkod-kecil.png";
  const role = site?.role ?? "Backend Developer";

  // Reveal timeline — gated on intro completion so it plays in sync with
  // the intro overlay sliding away, and replays on language switch.
  useEffect(() => {
    const headingEl = headingRef.current;
    const subtitleEl = subtitleRef.current;
    const ctaEl = ctaRef.current;
    const avatarEl = avatarWrapRef.current;
    if (!headingEl || !subtitleEl || !ctaEl || !avatarEl) return;

    const chars = headingEl.querySelectorAll<HTMLElement>(".hero-char");

    gsap.set(chars, { yPercent: 115 });
    gsap.set(subtitleEl, { opacity: 0, y: 8 });
    gsap.set(ctaEl, { opacity: 0, y: 12 });
    gsap.set(avatarEl, { opacity: 0, scale: 0.9 });

    if (!introComplete) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(chars, { yPercent: 0, duration: 0.9, stagger: 0.018 })
      .to(subtitleEl, { opacity: 1, y: 0, duration: 0.6 }, "-=0.55")
      .to(ctaEl, { opacity: 1, y: 0, duration: 0.6 }, "-=0.45")
      .to(avatarEl, { opacity: 1, scale: 1, duration: 0.7 }, "-=0.6");

    return () => {
      tl.kill();
    };
  }, [introComplete, heading]);

  // Magnetic pull on the CTA button.
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
      className="min-h-screen flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16 px-8 md:px-16 lg:px-24 pt-24 pb-32"
    >
      <div className="max-w-4xl flex-1">
        <p
          ref={headingRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gray-900"
        >
          {words.map((word, wi) => (
            <span key={wi}>
              <span className="inline-block overflow-hidden align-bottom whitespace-nowrap">
                {[...word].map((ch, ci) => (
                  <span
                    key={ci}
                    className="hero-char inline-block will-change-transform"
                  >
                    {ch}
                  </span>
                ))}
              </span>
              <span className="inline-block w-[0.3em]" aria-hidden />
            </span>
          ))}
        </p>

        <p
          ref={subtitleRef}
          className="mt-4 text-base md:text-lg text-gray-500 font-medium"
        >
          {body}
        </p>

        <a
          ref={ctaRef}
          href={`mailto:${email}`}
          data-cursor
          className="inline-flex items-center gap-2 mt-6 text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors will-change-transform"
        >
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          {available}
        </a>
      </div>

      <div
        ref={avatarWrapRef}
        className="shrink-0 flex justify-center lg:justify-end"
      >
        <div className="rounded-3xl bg-gray-200 p-4 shadow-inner">
          <TiltedCard
            imageSrc={avatar}
            altText={shortName}
            captionText={role}
            containerHeight="460px"
            containerWidth="360px"
            imageHeight="460px"
            imageWidth="360px"
            rotateAmplitude={12}
            scaleOnHover={1.08}
            showMobileWarning={false}
            showTooltip
            displayOverlayContent
            overlayContent={
              <p className="m-3 rounded-md bg-black/70 px-3 py-1 text-lg font-semibold text-white backdrop-blur-sm">
                {shortName}
              </p>
            }
          />
        </div>
      </div>
    </section>
  );
}
