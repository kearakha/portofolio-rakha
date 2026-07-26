"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

type Project = {
  id: string;
  title: string;
  descEn: string;
  descId: string;
  tags: string[];
  category: string;
  year: string;
  href: string;
  badge: string | null;
  image: string | null;
  initials: string | null;
  bg: string | null;
};

export default function ProjectDetail({ project }: { project: Project }) {
  const { t, lang } = useLang();
  const desc = lang === "id" ? project.descId : project.descEn;

  return (
    <main className="pt-16 px-[7vw] py-[100px]">
      <div className="max-w-[900px] mx-auto">
        <Link
          href="/#work"
          scroll={false}
          data-cursor
          className="inline-block text-[13px] font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          ← {t.projectDetail.back}
        </Link>

        <div
          className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-[0_20px_50px_-26px_rgba(0,0,0,0.25)] flex items-center justify-center mb-10"
          style={{
            background: project.image ? "#ffffff" : project.bg || "#1c1c1c",
          }}
        >
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-[64px] font-extrabold tracking-[-0.02em] text-gray-600">
              {project.initials}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-gray-500">
            {project.category}
          </span>
          <span className="text-xs font-semibold text-gray-400">
            · {project.year}
          </span>
          {project.badge && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gray-900 text-white">
              {project.badge}
            </span>
          )}
        </div>

        <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.03em] m-0 mb-6">
          {project.title}
        </h1>

        <p className="text-base leading-relaxed text-gray-600 mb-8">{desc}</p>

        {project.tags.length > 0 && (
          <div className="mb-10">
            <h2 className="text-[13px] font-semibold tracking-[0.04em] uppercase text-gray-500 mb-3">
              {t.projectDetail.techStack}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[13px] font-semibold px-3.5 py-[7px] rounded-full border border-gray-300 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.href && project.href !== "#" && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="inline-block cursor-pointer text-[13px] font-semibold tracking-[0.02em] px-5 py-[11px] rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors"
          >
            {t.projectDetail.visit}
          </a>
        )}
      </div>
    </main>
  );
}
