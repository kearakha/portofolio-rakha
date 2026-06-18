"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/context/LanguageContext";
import type { SiteData, MarqueeData, FooterData } from "@/lib/queries";

type Props = {
  site: SiteData | null;
  marquee: MarqueeData | null;
  footer: FooterData | null;
};

export default function Footer({ site, marquee, footer }: Props) {
  const { lang } = useLang();
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const techList = marquee?.tech ?? [];
  const footerLeft = footer?.left ?? site?.name ?? "";
  const footerRight = footer?.right
    ? lang === "en"
      ? footer.right.en
      : footer.right.id
    : "All rights reserved.";
  const linkedin = site?.linkedin ?? "#";
  const email = site?.email ?? "";
  const github = site?.github ?? "#";
  const cv = site?.cv ?? "#";

  useEffect(() => {
    const fit = () => {
      const el = textRef.current;
      const container = containerRef.current;
      if (!el || !container) return;
      el.style.fontSize = "175px";
      const ratio = container.offsetWidth / el.scrollWidth;
      el.style.fontSize = `${175 * ratio}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [footerLeft]);

  return (
    <footer className="pt-0 pb-24 overflow-hidden">
      {/* Tech stack marquee */}
      <div className="overflow-hidden border-t border-b border-gray-100 py-4 mb-0">
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "marquee 30s linear infinite",
            flexWrap: "nowrap",
          }}
        >
          {[...techList, ...techList, ...techList].map((tech, i) => (
            <span
              key={i}
              style={{ whiteSpace: "nowrap" }}
              className="inline-flex items-center gap-2 mx-6 text-sm text-gray-400"
            >
              {tech}
              <span className="text-gray-200 mx-2">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Giant name */}
      <div ref={containerRef} className="pt-16 pb-4 w-full">
        <h2
          ref={textRef}
          className="font-semibold text-gray-900 leading-none select-none whitespace-nowrap"
          style={{ letterSpacing: "-0.02em", display: "block" }}
        >
          {footerLeft}
        </h2>
      </div>

      {/* Bottom bar */}
      <div className="px-2 flex items-center justify-between">
        <p className="text-xs text-gray-500">{footerRight}</p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 transition-colors"
          >
            LinkedIn
          </a>
          <span>·</span>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 transition-colors"
          >
            GitHub
          </a>
          <span>·</span>
          <a
            href={cv}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 transition-colors"
          >
            CV
          </a>
          <span>·</span>
          <a
            href={`mailto:${email}`}
            className="hover:text-gray-800 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
