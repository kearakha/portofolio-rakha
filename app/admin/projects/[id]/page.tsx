import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProject } from "@/app/admin/actions";
import { s } from "@/app/admin/ui";
import Link from "next/link";

const SECTIONS = [
  { value: "selected-cases", label: "Selected Cases" },
  { value: "side-projects", label: "Side Projects" },
];

export default async function EditProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await prisma.project.findUnique({ where: { id } });
  if (!p) notFound();

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 24,
        }}
      >
        <Link
          href="/admin/projects"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 13,
            color: "var(--muted)",
            textDecoration: "none",
          }}
        >
          ← Projects
        </Link>
        <h1 style={{ ...s.h1, marginBottom: 0 }}>Edit</h1>
      </div>
      <form action={updateProject.bind(null, p.id)}>
        <div style={s.grid2}>
          {(
            [
              ["title", "Title", p.title],
              ["category", "Category", p.category],
              ["year", "Year", p.year],
              ["href", "URL", p.href],
              ["badge", "Badge", p.badge ?? ""],
              ["image", "Image URL", p.image ?? ""],
              ["initials", "Initials (placeholder)", p.initials ?? ""],
              ["bg", "Placeholder BG color", p.bg ?? ""],
            ] as [string, string, string][]
          ).map(([n, l, v]) => (
            <div key={n} style={s.field}>
              <label style={s.label}>{l}</label>
              <input name={n} defaultValue={v} style={s.input} />
            </div>
          ))}
        </div>
        <div style={s.field}>
          <label style={s.label}>Tags (comma-separated)</label>
          <input name="tags" defaultValue={p.tags.join(", ")} style={s.input} />
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
                <input
                  type="checkbox"
                  name="sections"
                  value={sec.value}
                  defaultChecked={p.sections.includes(sec.value)}
                />
                {sec.label}
              </label>
            ))}
          </div>
        </div>
        <div style={s.grid2}>
          <div style={s.field}>
            <label style={s.label}>Description (EN)</label>
            <textarea
              name="descEn"
              defaultValue={p.descEn}
              style={s.textarea}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Description (ID)</label>
            <textarea
              name="descId"
              defaultValue={p.descId}
              style={s.textarea}
            />
          </div>
        </div>
        <button type="submit" style={s.btn}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
