import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createSelectedWork, deleteSelectedWork } from "@/app/admin/actions";
import { s } from "@/app/admin/ui";

export default async function SelectedWorkPage() {
  const items = await prisma.selectedWork.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <h1 style={s.h1}>Selected Work</h1>

      {items.map((w) => (
        <div key={w.id} style={s.card}>
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
                {w.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  color: "var(--muted)",
                  marginTop: 2,
                }}
              >
                {w.partner} · {w.period}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 12,
                  color: "var(--muted)",
                  marginTop: 4,
                }}
              >
                {w.tags.join(", ")}
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <Link href={`/admin/selected-work/${w.id}`} style={s.btnOutline}>
                Edit
              </Link>
              <form action={deleteSelectedWork.bind(null, w.id)}>
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
      <form action={createSelectedWork}>
        <div style={s.grid2}>
          {[
            ["title", "Title"],
            ["partner", "Partner / Org"],
            ["period", "Period"],
            ["href", "URL (or #)"],
            ["gradientFrom", "Gradient From (hex)"],
            ["gradientTo", "Gradient To (hex)"],
          ].map(([n, l]) => (
            <div key={n} style={s.field}>
              <label style={s.label}>{l}</label>
              <input name={n} style={s.input} />
            </div>
          ))}
        </div>
        <div style={s.field}>
          <label style={s.label}>Tags (comma-separated)</label>
          <input name="tags" style={s.input} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Image URL (optional)</label>
          <input name="image" style={s.input} placeholder="https://..." />
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
          Add Work
        </button>
      </form>
    </div>
  );
}
