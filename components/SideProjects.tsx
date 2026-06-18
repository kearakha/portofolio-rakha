"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

type SmallProjectItem = {
  id: string;
  title: string;
  descEn: string;
  descId: string;
  tags: string[];
  year: string;
  href: string;
  badge: string | null;
  image: string | null;
};

type Props = {
  items: SmallProjectItem[];
};

const NavBtn = ({
  onClick,
  dir,
}: {
  onClick: () => void;
  dir: "left" | "right";
}) => (
  <button
    onClick={onClick}
    className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
    aria-label={dir === "left" ? "Previous" : "Next"}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {dir === "left" ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 18 15 12 9 6" />
      )}
    </svg>
  </button>
);

export default function SideProjects({ items }: Props) {
  const { t, lang } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: dir === "right" ? 400 : -400,
      behavior: "smooth",
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft || 0));
    setScrollLeft(trackRef.current?.scrollLeft || 0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current.offsetLeft || 0);
    trackRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };

  const onMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let isDown = false;
    let startTouchX = 0;
    let scrollStart = 0;

    const touchStart = (e: TouchEvent) => {
      isDown = true;
      startTouchX = e.touches[0].clientX;
      scrollStart = el.scrollLeft;
    };
    const touchMove = (e: TouchEvent) => {
      if (!isDown) return;
      el.scrollLeft = scrollStart - (e.touches[0].clientX - startTouchX);
    };
    const touchEnd = () => {
      isDown = false;
    };

    el.addEventListener("touchstart", touchStart, { passive: true });
    el.addEventListener("touchmove", touchMove, { passive: true });
    el.addEventListener("touchend", touchEnd);
    return () => {
      el.removeEventListener("touchstart", touchStart);
      el.removeEventListener("touchmove", touchMove);
      el.removeEventListener("touchend", touchEnd);
    };
  }, []);

  return (
    <section id="side-projects" className="py-16">
      {/* Header */}
      <div className="flex items-center justify-between px-8 md:px-16 lg:px-24 mb-8">
        <h2 className="text-4xl font-bold text-gray-900">
          {t.sideProjects.sectionLabel}
        </h2>
        <div className="flex items-center gap-2">
          <NavBtn onClick={() => scroll("left")} dir="left" />
          <NavBtn onClick={() => scroll("right")} dir="right" />
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden scrollbar-none pl-8 md:pl-16 lg:pl-24 pr-8 pt-4 pb-12 -my-2 select-none"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {items.map((project, i) => {
          const desc = lang === "en" ? project.descEn : project.descId;
          const hasLink = project.href !== "#";
          const badge =
            lang === "id" && project.badge === "ongoing"
              ? "Sedang berjalan"
              : project.badge;
          return (
            <motion.div
              key={project.id}
              className="shrink-0 bg-white rounded-2xl border border-gray-200 flex flex-col card-lift shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              style={{ width: "clamp(280px, 38vw, 500px)", height: 640 }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{
                scale: 1.03,
                y: -6,
                transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
            >
              {/* Top */}
              <div className="p-6 pb-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                    {project.year}
                  </span>
                  {badge && (
                    <span className="inline-block text-xs font-medium text-gray-700 bg-gray-200 rounded-full px-3 py-1">
                      {badge}
                    </span>
                  )}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mt-2 leading-tight">
                  {project.title}
                </h3>
              </div>

              {/* Image or gradient placeholder */}
              <div className="px-6 mt-4 flex-1 min-h-0">
                <div
                  className="rounded-2xl overflow-hidden w-full h-full flex items-center justify-center"
                  style={{ background: "#f3f4f6" }}
                >
                  {project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-[90%] h-[100%] object-contain object-center drop-shadow-lg"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{
                        background: `linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)`,
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Bottom */}
              <div className="p-6 pt-4">
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {desc}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                  {hasLink && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 border border-gray-200 rounded-full px-4 py-1.5 hover:bg-gray-50 transition-colors"
                    >
                      {t.sideProjects.visitLabel}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
