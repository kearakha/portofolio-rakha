import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  createProject,
  deleteProject,
  moveProject,
  toggleProjectActive,
} from "@/app/admin/actions";
import { s } from "@/app/admin/ui";

const SECTIONS = [
  { value: "selected-cases", label: "Selected Cases" },
  { value: "side-projects", label: "Side Projects" },
];

export default async function ProjectsPage() {
  const items = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 style={s.h1}>Projects</h1>

      {items.map((p, i) => (
        <div
          key={p.id}
          style={{
            ...s.card,
            opacity: p.isActive ? 1 : 0.5,
            borderColor: p.isActive ? "var(--border)" : "var(--muted)",
          }}
        >
          <div style={s.row}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: 15,
                    color: p.isActive ? "var(--foreground)" : "var(--muted)",
                  }}
                >
                  {p.title}
                </p>
                {!p.isActive && (
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 11,
                      color: "var(--muted)",
                      background: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: 100,
                      padding: "1px 8px",
                    }}
                  >
                    Inactive
                  </span>
                )}
                {p.badge && p.isActive && (
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 11,
                      color: "var(--foreground)",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 100,
                      padding: "1px 8px",
                    }}
                  >
                    {p.badge}
                  </span>
                )}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  color: "var(--muted)",
                  marginTop: 2,
                }}
              >
                {p.category || "no category"} · {p.year} ·{" "}
                {p.sections.length ? p.sections.join(", ") : "no section"}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 12,
                  color: "var(--muted)",
                  marginTop: 2,
                }}
              >
                {p.tags.join(", ")}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                flexShrink: 0,
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <form action={moveProject.bind(null, p.id, "up")}>
                  <button
                    type="submit"
                    disabled={i === 0}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 11,
                      padding: "2px 8px",
                      borderRadius: 6,
                      border: "1px solid var(--border)",
                      background: "var(--surface)",
                      color: i === 0 ? "var(--muted)" : "var(--foreground)",
                      cursor: i === 0 ? "default" : "pointer",
                      lineHeight: 1,
                    }}
                  >
                    ↑
                  </button>
                </form>
                <form action={moveProject.bind(null, p.id, "down")}>
                  <button
                    type="submit"
                    disabled={i === items.length - 1}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 11,
                      padding: "2px 8px",
                      borderRadius: 6,
                      border: "1px solid var(--border)",
                      background: "var(--surface)",
                      color:
                        i === items.length - 1
                          ? "var(--muted)"
                          : "var(--foreground)",
                      cursor: i === items.length - 1 ? "default" : "pointer",
                      lineHeight: 1,
                    }}
                  >
                    ↓
                  </button>
                </form>
              </div>
              <form action={toggleProjectActive.bind(null, p.id, !p.isActive)}>
                <button
                  type="submit"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 12,
                    padding: "4px 12px",
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: p.isActive ? "#22c55e22" : "var(--surface)",
                    color: p.isActive ? "#16a34a" : "var(--muted)",
                    cursor: "pointer",
                    fontWeight: 600,
                    minWidth: 72,
                  }}
                >
                  {p.isActive ? "Active" : "Inactive"}
                </button>
              </form>
              <Link href={`/admin/projects/${p.id}`} style={s.btnOutline}>
                Edit
              </Link>
              <form action={deleteProject.bind(null, p.id)}>
                <button type="submit" style={s.btnDanger}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      ))}

      <div style={s.divider} />
      <h2
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 700,
          fontSize: 18,
          color: "var(--foreground)",
          marginBottom: 20,
        }}
      >
        Add New
      </h2>
      <form action={createProject}>
        <div style={s.grid2}>
          {[
            ["title", "Title"],
            ["category", "Category (free text, e.g. academic, ml, tooling)"],
            ["year", "Year"],
            ["href", "URL (or #)"],
            ["badge", "Badge (e.g. ongoing, or leave empty)"],
            ["image", "Image URL (optional)"],
            ["initials", "Initials (placeholder, if no image)"],
            ["bg", "Placeholder BG color (hex, if no image)"],
          ].map(([n, l]) => (
            <div key={n} style={s.field}>
              <label style={s.label}>{l}</label>
              <input name={n} style={s.input} />
            </div>
          ))}
        </div>
        <div style={s.field}>
          <label style={s.label}>Tags (comma-separated)</label>
          <input name="tags" style={s.input} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Sections (where this shows up)</label>
          <div style={{ display: "flex", gap: 16 }}>
            {SECTIONS.map((sec) => (
              <label
                key={sec.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  color: "var(--foreground)",
                }}
              >
                <input type="checkbox" name="sections" value={sec.value} />
                {sec.label}
              </label>
            ))}
          </div>
        </div>
        <div style={s.grid2}>
          <div style={s.field}>
            <label style={s.label}>Description (EN)</label>
            <textarea name="descEn" style={s.textarea} />
          </div>
          <div style={s.field}>
            <label style={s.label}>Description (ID)</label>
            <textarea name="descId" style={s.textarea} />
          </div>
        </div>
        <button type="submit" style={s.btn}>
          Add Project
        </button>
      </form>
    </div>
  );
}
