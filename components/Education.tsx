"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

type EducationItem = {
  id: string;
  institution: string;
  short: string;
  degree: string;
  period: string;
  gpa: string | null;
  descEn: string;
  descId: string;
  tags: string[];
};

type Props = {
  items: EducationItem[];
};

const LOGO_MAP: Record<string, string> = {
  UDINUS: "/images/udinus.png",
  UGM: "/images/ugm.png",
};

export default function Education({ items }: Props) {
  const { t, lang } = useLang();

  return (
    <section id="education" className="py-16 px-8 md:px-16 lg:px-24">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">
        {t.education.sectionLabel}
      </h2>

      <div className="relative">
        {/* vertical timeline line */}
        <div className="absolute left-[27px] top-8 bottom-8 w-px bg-gray-200" />

        {items.map((edu, i) => {
          const desc = lang === "en" ? edu.descEn : edu.descId;
          const logoSrc = LOGO_MAP[edu.short];
          const period =
            lang === "id"
              ? edu.period.replace(/\bPresent\b/g, "Sekarang")
              : edu.period;
          return (
            <motion.div
              key={edu.id}
              className={`relative pl-20 ${i > 0 ? "border-t border-gray-200" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {/* timeline bullet */}
              <span className="absolute left-5.25 top-13.5 w-3 h-3 rounded-full border-2 bg-white border-gray-300" />

              <div className="py-8">
                {/* Header: logo + institution + period */}
                <div className="grid grid-cols-[56px_1fr_auto] items-start gap-4 mb-5">
                  {logoSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logoSrc}
                      alt={edu.short}
                      className="w-14 h-14 rounded-2xl object-contain bg-white shrink-0 border border-gray-100"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-gray-100 text-gray-600 font-bold text-xs">
                      {edu.short}
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {edu.institution}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">{edu.degree}</p>
                    {edu.gpa && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        GPA {edu.gpa}
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap bg-gray-100 rounded-full px-3 py-1">
                    {period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  {desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {edu.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-600 bg-gray-100 rounded-full px-3 py-1"
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
