import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createSkill, deleteSkill } from "@/app/admin/actions";
import { s } from "@/app/admin/ui";

export default async function SkillsPage() {
  const items = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  const primary = items.filter((sk) => sk.category === "primary");
  const exploring = items.filter((sk) => sk.category === "exploring");

  return (
    <div>
      <h1 style={s.h1}>Skills</h1>

      {[
        { label: "Primary", items: primary },
        { label: "Exploring / Research", items: exploring },
      ].map((group) => (
        <div key={group.label}>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 12,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 10,
            }}
          >
            {group.label}
          </p>
          {group.items.map((skill) => (
            <div key={skill.id} style={{ ...s.card, padding: "14px 20px" }}>
              <div style={s.row}>
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "var(--foreground)",
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 12,
                      color: "var(--muted)",
                      marginLeft: 10,
                    }}
                  >
                    {skill.level}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Link href={`/admin/skills/${skill.id}`} style={s.btnOutline}>
                    Edit
                  </Link>
                  <form action={deleteSkill.bind(null, skill.id)}>
                    <button type="submit" style={s.btnDanger}>
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
          <div style={{ marginBottom: 24 }} />
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
      <form action={createSkill}>
        <div style={s.grid2}>
          <div style={s.field}>
            <label style={s.label}>Name</label>
            <input name="name" style={s.input} required />
          </div>
          <div style={s.field}>
            <label style={s.label}>Level</label>
            <input
              name="level"
              style={s.input}
              placeholder="Expert / Proficient / Learning / Research"
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Category</label>
            <select name="category" style={{ ...s.input, cursor: "pointer" }}>
              <option value="primary">Primary</option>
              <option value="exploring">Exploring</option>
            </select>
          </div>
        </div>
        <button type="submit" style={s.btn}>
          Add Skill
        </button>
      </form>
    </div>
  );
}
