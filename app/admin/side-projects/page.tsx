import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  createSmallProject,
  deleteSmallProject,
  moveSmallProject,
  toggleSmallProjectActive,
} from "@/app/admin/actions";
import { s } from "@/app/admin/ui";

export default async function SideProjectsPage() {
  const items = await prisma.smallProject.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <h1 style={s.h1}>Side Projects</h1>

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
                {p.tags.join(", ")} · {p.year}
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
                <form action={moveSmallProject.bind(null, p.id, "up")}>
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
                <form action={moveSmallProject.bind(null, p.id, "down")}>
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
              <form
                action={toggleSmallProjectActive.bind(null, p.id, !p.isActive)}
              >
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
              <Link href={`/admin/side-projects/${p.id}`} style={s.btnOutline}>
                Edit
              </Link>
              <form action={deleteSmallProject.bind(null, p.id)}>
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
      <form action={createSmallProject}>
        <div style={s.grid2}>
          {[
            ["title", "Title"],
            ["year", "Year"],
            ["href", "URL (or #)"],
            ["badge", "Badge (e.g. ongoing, or leave empty)"],
          ].map(([n, l]) => (
            <div key={n} style={s.field}>
              <label style={s.label}>{l}</label>
              <input name={n} style={s.input} />
            </div>
          ))}
          <div style={s.field}>
            <label style={s.label}>Tags (comma-separated)</label>
            <input name="tags" style={s.input} />
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
