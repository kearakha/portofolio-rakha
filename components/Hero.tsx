"use client";

import { motion, type Variants } from "framer-motion";
import TiltedCard from "./TiltedCard";
import { useLang } from "@/context/LanguageContext";
import type { SiteData, HeroData, MarqueeData, AboutData } from "@/lib/queries";

const wordVariant: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(12px)",
    y: 8,
  },
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

type Props = {
  site: SiteData | null;
  hero: HeroData | null;
  about: AboutData | null;
  marquee: MarqueeData | null;
};

export default function Hero({ site, hero, about }: Props) {
  const { lang } = useLang();

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
  const words = heading.split(" ").map((word) => ({ text: word }));

  const shortName = site?.shortName ?? "";
  const email = site?.email ?? "";
  const avatar = site?.avatar ?? "/images/avatar/foto-bengkod-kecil.png";
  const role = site?.role ?? "Backend Developer";

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16 px-8 md:px-16 lg:px-24 pt-24 pb-32"
    >
      <div className="max-w-4xl flex-1">
        <motion.p
          className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gray-900"
          initial="hidden"
          animate="visible"
        >
          {words.map((word, i) => (
            <span key={i}>
              <motion.span
                className="inline-block"
                custom={i}
                variants={wordVariant}
              >
                {word.text}
              </motion.span>
              <span className="inline-block w-[0.3em]" aria-hidden />
            </span>
          ))}
        </motion.p>

        <motion.p
          className="mt-4 text-base md:text-lg text-gray-500 font-medium"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: words.length * 0.06 + 0.1, duration: 0.5 }}
        >
          {body}
        </motion.p>

        <motion.a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-2 mt-6 text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: words.length * 0.06 + 0.2, duration: 0.5 }}
        >
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          {available}
        </motion.a>
      </div>

      <motion.div
        className="shrink-0 flex justify-center lg:justify-end"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
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
      </motion.div>
    </section>
  );
}
