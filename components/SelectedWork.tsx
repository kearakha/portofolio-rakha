"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

type SelectedWorkItem = {
  id: string;
  title: string;
  partner: string;
  period: string;
  descEn: string;
  descId: string;
  tags: string[];
  gradientFrom: string;
  gradientTo: string;
  image: string | null;
  href: string;
};

type Props = {
  items: SelectedWorkItem[];
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

export default function SelectedWork({ items }: Props) {
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
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => setIsDragging(false);

  return (
    <section id="work" className="py-16">
      {/* Header */}
      <div className="flex items-center justify-between px-8 md:px-16 lg:px-24 mb-8">
        <h2 className="text-4xl font-bold text-gray-900">
          {t.selectedWork.sectionLabel}
        </h2>
        <div className="flex items-center gap-2">
          <NavBtn onClick={() => scroll("left")} dir="left" />
          <NavBtn onClick={() => scroll("right")} dir="right" />
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto pl-8 md:pl-16 lg:pl-24 pr-8 pt-4 pb-12 -my-2 [&::-webkit-scrollbar]:hidden scrollbar-none select-none"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {items.map((card, i) => {
          const desc = lang === "en" ? card.descEn : card.descId;
          return (
            <motion.div
              key={card.id}
              className="shrink-0 bg-white rounded-2xl border border-gray-200 card-lift shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              style={{ width: "clamp(300px, 45vw, 560px)", minHeight: 600 }}
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
              {/* Pill */}
              <div className="p-6 pb-0">
                <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1 mb-3">
                  {t.selectedWork.caseStudyLabel}
                </span>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block text-xs font-semibold text-gray-600 bg-gray-100 rounded-full px-3 py-1 mb-3">
                      {card.period}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{card.partner}</p>
                  </div>
                </div>
              </div>

              {/* Gradient or image */}
              <div className="px-6 mt-4">
                <div
                  className="rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ height: 280 }}
                >
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div
                      className="w-full h-full rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${card.gradientFrom} 0%, ${card.gradientTo} 100%)`,
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 pt-4">
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
