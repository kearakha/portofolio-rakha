import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateSmallProject } from "@/app/admin/actions";
import { s } from "@/app/admin/ui";
import Link from "next/link";

export default async function EditSideProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await prisma.smallProject.findUnique({ where: { id } });
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
          href="/admin/side-projects"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 13,
            color: "var(--muted)",
            textDecoration: "none",
          }}
        >
          ← Side Projects
        </Link>
        <h1 style={{ ...s.h1, marginBottom: 0 }}>Edit</h1>
      </div>
      <form action={updateSmallProject.bind(null, p.id)}>
        <div style={s.grid2}>
          {(
            [
              ["title", "Title", p.title],
              ["year", "Year", p.year],
              ["href", "URL", p.href],
              ["badge", "Badge (e.g. ongoing, or leave empty)", p.badge ?? ""],
            ] as [string, string, string][]
          ).map(([n, l, v]) => (
            <div key={n} style={s.field}>
              <label style={s.label}>{l}</label>
              <input name={n} defaultValue={v} style={s.input} />
            </div>
          ))}
          <div style={s.field}>
            <label style={s.label}>Tags (comma-separated)</label>
            <input
              name="tags"
              defaultValue={p.tags.join(", ")}
              style={s.input}
            />
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
