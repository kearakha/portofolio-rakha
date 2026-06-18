import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createExperience, deleteExperience } from "@/app/admin/actions";
import { s } from "@/app/admin/ui";

export default async function ExperiencePage() {
  const items = await prisma.experience.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 style={s.h1}>Experience</h1>

      {items.map((exp) => (
        <div key={exp.id} style={s.card}>
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
                {exp.role}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  color: "var(--muted)",
                  marginTop: 2,
                }}
              >
                {exp.org} · {exp.period}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 12,
                  color: "var(--muted)",
                  marginTop: 4,
                }}
              >
                {exp.tags.join(", ")}
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <Link href={`/admin/experience/${exp.id}`} style={s.btnOutline}>
                Edit
              </Link>
              <form action={deleteExperience.bind(null, exp.id)}>
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
      <form
        action={createExperience}
        style={{ display: "flex", flexDirection: "column", gap: 0 }}
      >
        <div style={s.grid2}>
          {[
            ["role", "Role / Title"],
            ["org", "Organization"],
            ["division", "Division"],
            ["period", "Period"],
            ["logoInitials", "Logo Initials"],
            ["logoColor", "Logo Color (hex)"],
          ].map(([name, label]) => (
            <div key={name} style={s.field}>
              <label style={s.label}>{label}</label>
              <input
                name={name}
                style={s.input}
                placeholder={name === "logoColor" ? "#2563EB" : undefined}
              />
            </div>
          ))}
        </div>
        <div style={s.field}>
          <label style={s.label}>Tags (comma-separated)</label>
          <input name="tags" style={s.input} />
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
        <div>
          <button type="submit" style={s.btn}>
            Add Experience
          </button>
        </div>
      </form>
    </div>
  );
}
