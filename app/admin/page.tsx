import Link from "next/link";
import { prisma } from "@/lib/prisma";

const SECTIONS = [
  {
    href: "/admin/settings",
    label: "Settings",
    desc: "Site info, hero, about, contact",
  },
  {
    href: "/admin/experience",
    label: "Experience",
    desc: "Work & research timeline",
  },
  {
    href: "/admin/projects",
    label: "Projects",
    desc: "All projects — tag which sections they show up in",
  },
  { href: "/admin/education", label: "Education", desc: "Academic history" },
  {
    href: "/admin/skills",
    label: "Skills",
    desc: "Primary & exploring skills",
  },
];

export default async function AdminDashboard() {
  const [expCount, projCount, eduCount, skillCount] = await Promise.all([
    prisma.experience.count(),
    prisma.project.count(),
    prisma.education.count(),
    prisma.skill.count(),
  ]);

  const counts: Record<string, number> = {
    "/admin/experience": expCount,
    "/admin/projects": projCount,
    "/admin/education": eduCount,
    "/admin/skills": skillCount,
  };

  return (
    <div>
      <h1
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 800,
          fontSize: 28,
          color: "var(--foreground)",
          marginBottom: 8,
          letterSpacing: "-0.02em",
        }}
      >
        Dashboard
      </h1>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 14,
          color: "var(--muted)",
          marginBottom: 36,
        }}
      >
        Portfolio CMS — edit content langsung dari sini.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 14,
        }}
      >
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            style={{
              display: "block",
              padding: "20px 22px",
              borderRadius: 14,
              border: "1px solid var(--border)",
              background: "var(--surface)",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "var(--foreground)",
                  marginBottom: 4,
                }}
              >
                {s.label}
              </h2>
              {counts[s.href] !== undefined && (
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 12,
                    color: "var(--muted)",
                    background: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: 100,
                    padding: "2px 10px",
                  }}
                >
                  {counts[s.href]}
                </span>
              )}
            </div>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: "var(--muted)",
              }}
            >
              {s.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
