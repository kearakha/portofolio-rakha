"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { SITE } from "@/lib/constants";

const SECTION_IDS = ["work", "side-projects", "experience", "education"];

export default function BottomNav({ cvLink = "#" }: { cvLink?: string }) {
  const { t, lang, setLang } = useLang();
  const [active, setActive] = useState("");
  const [hoveredExternal, setHoveredExternal] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { label: t.nav.work, href: "#work", external: false },
    { label: t.nav.sideProjects, href: "#side-projects", external: false },
    { label: t.nav.experience, href: "#experience", external: false },
    { label: t.nav.education, href: "#education", external: false },
    { label: t.nav.linkedin, href: SITE.linkedin, external: true },
    { label: "GitHub", href: SITE.github, external: true },
    { label: t.nav.cv, href: cvLink, external: true },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid #E5E7EB",
        borderRadius: "9999px",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        whiteSpace: "nowrap",
      }}
    >
      {navItems.map((item, i) => (
        <span
          key={item.label}
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          {i > 0 && (
            <span
              style={{ color: "#D1D5DB", fontSize: "10px", margin: "0 4px" }}
            >
              •
            </span>
          )}
          <a
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            onMouseEnter={() =>
              item.external ? setHoveredExternal(item.label) : null
            }
            onMouseLeave={() => setHoveredExternal(null)}
            style={{
              fontSize: "13px",
              fontWeight: active === item.href.replace("#", "") ? 600 : 500,
              color:
                item.external && hoveredExternal === item.label
                  ? "#111111"
                  : active === item.href.replace("#", "")
                    ? "#111111"
                    : "#6B7280",
              textDecoration: "none",
              transition: "color 0.2s",
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
              overflow: "hidden",
            }}
          >
            {item.label}
            <AnimatePresence>
              {item.external && hoveredExternal === item.label && (
                <motion.svg
                  key="arrow"
                  initial={{ opacity: 0, x: 8, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 10 }}
                  exit={{ opacity: 0, x: 8, width: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ height: 10, flexShrink: 0 }}
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </motion.svg>
              )}
            </AnimatePresence>
          </a>
        </span>
      ))}

      {/* Lang toggle */}
      <span style={{ color: "#D1D5DB", fontSize: "10px", margin: "0 4px" }}>
        •
      </span>
      <button
        onClick={() => setLang(lang === "en" ? "id" : "en")}
        style={{
          fontSize: "13px",
          fontWeight: 500,
          color: "#6B7280",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color = "#111111")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color = "#6B7280")
        }
      >
        {lang === "en" ? "ID" : "EN"}
      </button>
    </nav>
  );
}
