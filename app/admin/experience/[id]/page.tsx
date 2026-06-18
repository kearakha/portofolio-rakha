import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateExperience } from "@/app/admin/actions";
import { s } from "@/app/admin/ui";
import Link from "next/link";

export default async function EditExperience({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exp = await prisma.experience.findUnique({ where: { id } });
  if (!exp) notFound();

  const update = updateExperience.bind(null, exp.id);

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
          href="/admin/experience"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 13,
            color: "var(--muted)",
            textDecoration: "none",
          }}
        >
          ← Experience
        </Link>
        <h1 style={{ ...s.h1, marginBottom: 0 }}>Edit</h1>
      </div>

      <form
        action={update}
        style={{ display: "flex", flexDirection: "column", gap: 0 }}
      >
        <div style={s.grid2}>
          {(
            [
              ["role", "Role / Title", exp.role],
              ["org", "Organization", exp.org],
              ["division", "Division", exp.division],
              ["period", "Period", exp.period],
              ["logoInitials", "Logo Initials", exp.logoInitials],
              ["logoColor", "Logo Color", exp.logoColor],
              ["logoImage", "Logo Image Path (optional)", exp.logoImage ?? ""],
            ] as [string, string, string][]
          ).map(([name, label, val]) => (
            <div key={name} style={s.field}>
              <label style={s.label}>{label}</label>
              <input name={name} defaultValue={val} style={s.input} />
            </div>
          ))}
        </div>
        <div style={s.field}>
          <label style={s.label}>Tags (comma-separated)</label>
          <input
            name="tags"
            defaultValue={exp.tags.join(", ")}
            style={s.input}
          />
        </div>
        <div style={s.grid2}>
          <div style={s.field}>
            <label style={s.label}>Description (EN)</label>
            <textarea
              name="descEn"
              defaultValue={exp.descEn}
              style={s.textarea}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Description (ID)</label>
            <textarea
              name="descId"
              defaultValue={exp.descId}
              style={s.textarea}
            />
          </div>
        </div>
        <div>
          <button type="submit" style={s.btn}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
