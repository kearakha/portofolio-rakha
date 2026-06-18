import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateSkill } from "@/app/admin/actions";
import { s } from "@/app/admin/ui";
import Link from "next/link";

export default async function EditSkill({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await prisma.skill.findUnique({ where: { id } });
  if (!skill) notFound();

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
          href="/admin/skills"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 13,
            color: "var(--muted)",
            textDecoration: "none",
          }}
        >
          ← Skills
        </Link>
        <h1 style={{ ...s.h1, marginBottom: 0 }}>Edit</h1>
      </div>
      <form action={updateSkill.bind(null, skill.id)}>
        <div style={s.grid2}>
          <div style={s.field}>
            <label style={s.label}>Name</label>
            <input name="name" defaultValue={skill.name} style={s.input} />
          </div>
          <div style={s.field}>
            <label style={s.label}>Level</label>
            <input name="level" defaultValue={skill.level} style={s.input} />
          </div>
          <div style={s.field}>
            <label style={s.label}>Category</label>
            <select
              name="category"
              defaultValue={skill.category}
              style={{ ...s.input, cursor: "pointer" }}
            >
              <option value="primary">Primary</option>
              <option value="exploring">Exploring</option>
            </select>
          </div>
        </div>
        <button type="submit" style={s.btn}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
