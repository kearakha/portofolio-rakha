import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateSelectedWork } from "@/app/admin/actions";
import { s } from "@/app/admin/ui";
import Link from "next/link";

export default async function EditSelectedWork({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const w = await prisma.selectedWork.findUnique({ where: { id } });
  if (!w) notFound();

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
          href="/admin/selected-work"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 13,
            color: "var(--muted)",
            textDecoration: "none",
          }}
        >
          ← Selected Work
        </Link>
        <h1 style={{ ...s.h1, marginBottom: 0 }}>Edit</h1>
      </div>
      <form action={updateSelectedWork.bind(null, w.id)}>
        <div style={s.grid2}>
          {(
            [
              ["title", "Title", w.title],
              ["partner", "Partner", w.partner],
              ["period", "Period", w.period],
              ["href", "URL", w.href],
              ["gradientFrom", "Gradient From", w.gradientFrom],
              ["gradientTo", "Gradient To", w.gradientTo],
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
          <input name="tags" defaultValue={w.tags.join(", ")} style={s.input} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Image URL (optional)</label>
          <input name="image" defaultValue={w.image ?? ""} style={s.input} />
        </div>
        <div style={s.grid2}>
          <div style={s.field}>
            <label style={s.label}>Description (EN)</label>
            <textarea
              name="descEn"
              defaultValue={w.descEn}
              style={s.textarea}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Description (ID)</label>
            <textarea
              name="descId"
              defaultValue={w.descId}
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
