import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateEducation } from "@/app/admin/actions";
import { s } from "@/app/admin/ui";
import Link from "next/link";

export default async function EditEducation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const edu = await prisma.education.findUnique({ where: { id } });
  if (!edu) notFound();

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
          href="/admin/education"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 13,
            color: "var(--muted)",
            textDecoration: "none",
          }}
        >
          ← Education
        </Link>
        <h1 style={{ ...s.h1, marginBottom: 0 }}>Edit</h1>
      </div>
      <form action={updateEducation.bind(null, edu.id)}>
        <div style={s.grid2}>
          {(
            [
              ["institution", "Institution", edu.institution],
              ["short", "Short Name", edu.short],
              ["degree", "Degree", edu.degree],
              ["period", "Period", edu.period],
              ["gpa", "GPA (optional)", edu.gpa ?? ""],
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
              defaultValue={edu.tags.join(", ")}
              style={s.input}
            />
          </div>
        </div>
        <div style={s.grid2}>
          <div style={s.field}>
            <label style={s.label}>Description (EN)</label>
            <textarea
              name="descEn"
              defaultValue={edu.descEn}
              style={s.textarea}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Description (ID)</label>
            <textarea
              name="descId"
              defaultValue={edu.descId}
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
