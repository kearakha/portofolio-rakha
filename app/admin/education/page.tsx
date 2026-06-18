import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createEducation, deleteEducation } from "@/app/admin/actions";
import { s } from "@/app/admin/ui";

export default async function EducationPage() {
  const items = await prisma.education.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 style={s.h1}>Education</h1>

      {items.map((edu) => (
        <div key={edu.id} style={s.card}>
          <div style={s.row}>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "var(--foreground)",
                }}
              >
                {edu.institution}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  color: "var(--muted)",
                  marginTop: 2,
                }}
              >
                {edu.degree} · {edu.period}
              </p>
              {edu.gpa && (
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 12,
                    color: "var(--muted)",
                    marginTop: 2,
                  }}
                >
                  GPA: {edu.gpa}
                </p>
              )}
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <Link href={`/admin/education/${edu.id}`} style={s.btnOutline}>
                Edit
              </Link>
              <form action={deleteEducation.bind(null, edu.id)}>
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
      <form action={createEducation}>
        <div style={s.grid2}>
          {[
            ["institution", "Institution"],
            ["short", "Short Name"],
            ["degree", "Degree"],
            ["period", "Period"],
            ["gpa", "GPA (optional)"],
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
          Add Education
        </button>
      </form>
    </div>
  );
}
