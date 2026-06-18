import {
  getSite,
  getHero,
  getAbout,
  getContact,
  getFooter,
  getMarquee,
} from "@/lib/queries";
import { updateSingleton } from "@/app/admin/actions";
import { s } from "@/app/admin/ui";

const sectionHead = {
  fontFamily: "var(--font-inter)",
  fontWeight: 700 as const,
  fontSize: 16,
  marginBottom: 20,
  color: "var(--foreground)",
};

export default async function SettingsPage() {
  const [site, hero, about, contact, footer, marquee] = await Promise.all([
    getSite(),
    getHero(),
    getAbout(),
    getContact(),
    getFooter(),
    getMarquee(),
  ]);

  return (
    <div>
      <h1 style={s.h1}>Settings</h1>

      {/* ── Site Info ── */}
      <section style={s.card}>
        <h2 style={sectionHead}>Site Info</h2>
        <form
          action={async (fd) => {
            "use server";
            await updateSingleton("site", {
              name: fd.get("name"),
              shortName: fd.get("shortName"),
              initials: fd.get("initials"),
              avatar: fd.get("avatar"),
              logo: fd.get("logo"),
              role: fd.get("role"),
              institution: fd.get("institution"),
              email: fd.get("email"),
              github: fd.get("github"),
              linkedin: fd.get("linkedin"),
              cv: fd.get("cv"),
            });
          }}
        >
          <div style={s.grid2}>
            {[
              ["name", "Full Name", site?.name],
              ["shortName", "Short Name", site?.shortName],
              ["initials", "Initials", site?.initials],
              ["logo", "Logo Text", site?.logo],
              ["role", "Role", site?.role],
              ["institution", "Institution", site?.institution],
              ["email", "Email", site?.email],
              ["github", "GitHub URL", site?.github],
              ["linkedin", "LinkedIn URL", site?.linkedin],
              ["avatar", "Avatar Path", site?.avatar],
              [
                "cv",
                "CV Link",
                (site as Record<string, unknown>)?.cv as string,
              ],
            ].map(([name, label, val]) => (
              <div key={name as string} style={s.field}>
                <label style={s.label}>{label as string}</label>
                <input
                  name={name as string}
                  defaultValue={val as string}
                  style={s.input}
                />
              </div>
            ))}
          </div>
          <button type="submit" style={s.btn}>
            Save Site Info
          </button>
        </form>
      </section>

      {/* ── Marquee Tech ── */}
      <section style={s.card}>
        <h2 style={sectionHead}>Marquee Tech Stack</h2>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 12,
            color: "var(--muted)",
            marginBottom: 16,
          }}
        >
          Comma-separated
        </p>
        <form
          action={async (fd) => {
            "use server";
            const tech = (fd.get("tech") as string)
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean);
            const existing = await import("@/lib/queries").then((m) =>
              m.getMarquee(),
            );
            await updateSingleton("marquee", { ...existing, tech });
          }}
        >
          <div style={s.field}>
            <textarea
              name="tech"
              defaultValue={marquee?.tech.join(", ")}
              style={{ ...s.textarea, minHeight: 60 }}
            />
          </div>
          <button type="submit" style={s.btn}>
            Save Tech Stack
          </button>
        </form>
      </section>

      {/* ── About ── */}
      <section style={s.card}>
        <h2 style={sectionHead}>About Section</h2>
        <form
          action={async (fd) => {
            "use server";
            await updateSingleton("about", {
              headingMain: {
                en: fd.get("headingMainEn"),
                id: fd.get("headingMainId"),
              },
              headingAccent: {
                en: fd.get("headingAccentEn"),
                id: fd.get("headingAccentId"),
              },
              body: { en: fd.get("bodyEn"), id: fd.get("bodyId") },
              stats: {
                en: (fd.get("statsEn") as string)
                  .replace(/\r/g, "")
                  .split("\n")
                  .filter(Boolean),
                id: (fd.get("statsId") as string)
                  .replace(/\r/g, "")
                  .split("\n")
                  .filter(Boolean),
              },
            });
          }}
        >
          <div style={s.grid2}>
            {[
              ["headingMainEn", "Heading Main (EN)", about?.headingMain.en],
              ["headingMainId", "Heading Main (ID)", about?.headingMain.id],
              [
                "headingAccentEn",
                "Heading Accent (EN)",
                about?.headingAccent.en,
              ],
              [
                "headingAccentId",
                "Heading Accent (ID)",
                about?.headingAccent.id,
              ],
            ].map(([name, label, val]) => (
              <div key={name as string} style={s.field}>
                <label style={s.label}>{label as string}</label>
                <input
                  name={name as string}
                  defaultValue={val as string}
                  style={s.input}
                />
              </div>
            ))}
          </div>
          <div style={s.grid2}>
            <div style={s.field}>
              <label style={s.label}>Body (EN)</label>
              <textarea
                name="bodyEn"
                defaultValue={about?.body.en}
                style={s.textarea}
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>Body (ID)</label>
              <textarea
                name="bodyId"
                defaultValue={about?.body.id}
                style={s.textarea}
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>Stats (EN) — one per line</label>
              <textarea
                name="statsEn"
                defaultValue={about?.stats.en.join("\n")}
                style={{ ...s.textarea, minHeight: 72 }}
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>Stats (ID) — one per line</label>
              <textarea
                name="statsId"
                defaultValue={about?.stats.id.join("\n")}
                style={{ ...s.textarea, minHeight: 72 }}
              />
            </div>
          </div>
          <button type="submit" style={s.btn}>
            Save About
          </button>
        </form>
      </section>

      {/* ── Contact ── */}
      <section style={s.card}>
        <h2 style={sectionHead}>Contact Section</h2>
        <form
          action={async (fd) => {
            "use server";
            await updateSingleton("contact", {
              headingMain: {
                en: fd.get("headingMainEn"),
                id: fd.get("headingMainId"),
              },
              headingLine2: {
                en: fd.get("headingLine2En"),
                id: fd.get("headingLine2Id"),
              },
              headingAccent: {
                en: fd.get("headingAccentEn"),
                id: fd.get("headingAccentId"),
              },
            });
          }}
        >
          <div style={s.grid2}>
            {[
              ["headingMainEn", "Line 1 (EN)", contact?.headingMain.en],
              ["headingMainId", "Line 1 (ID)", contact?.headingMain.id],
              ["headingLine2En", "Line 2 (EN)", contact?.headingLine2.en],
              ["headingLine2Id", "Line 2 (ID)", contact?.headingLine2.id],
              ["headingAccentEn", "Accent (EN)", contact?.headingAccent.en],
              ["headingAccentId", "Accent (ID)", contact?.headingAccent.id],
            ].map(([name, label, val]) => (
              <div key={name as string} style={s.field}>
                <label style={s.label}>{label as string}</label>
                <input
                  name={name as string}
                  defaultValue={val as string}
                  style={s.input}
                />
              </div>
            ))}
          </div>
          <button type="submit" style={s.btn}>
            Save Contact
          </button>
        </form>
      </section>

      {/* ── Footer ── */}
      <section style={s.card}>
        <h2 style={sectionHead}>Footer</h2>
        <form
          action={async (fd) => {
            "use server";
            await updateSingleton("footer", {
              left: fd.get("left"),
              right: { en: fd.get("rightEn"), id: fd.get("rightId") },
            });
          }}
        >
          <div style={s.grid2}>
            {[
              ["left", "Left Text", footer?.left],
              ["rightEn", "Right Text (EN)", footer?.right.en],
              ["rightId", "Right Text (ID)", footer?.right.id],
            ].map(([name, label, val]) => (
              <div key={name as string} style={s.field}>
                <label style={s.label}>{label as string}</label>
                <input
                  name={name as string}
                  defaultValue={val as string}
                  style={s.input}
                />
              </div>
            ))}
          </div>
          <button type="submit" style={s.btn}>
            Save Footer
          </button>
        </form>
      </section>

      {/* ── Hero ── */}
      <section style={s.card}>
        <h2 style={sectionHead}>Hero Section</h2>
        <form
          action={async (fd) => {
            "use server";
            await updateSingleton("hero", {
              title: {
                line1: fd.get("titleLine1"),
                line2: fd.get("titleLine2"),
                accent: fd.get("titleAccent"),
              },
              focusActivities: (fd.get("focusActivities") as string)
                .split("\n")
                .filter(Boolean)
                .map((line) => {
                  const [label, org] = line.split("|").map((s) => s.trim());
                  return { label: label ?? "", org: org ?? "" };
                }),
              focusLabel: {
                en: fd.get("focusLabelEn"),
                id: fd.get("focusLabelId"),
              },
              available: {
                en: fd.get("availableEn"),
                id: fd.get("availableId"),
              },
              subtitle: {
                en: fd.get("subtitleEn"),
                id: fd.get("subtitleId"),
              },
              tagline: {
                en: fd.get("taglineEn"),
                id: fd.get("taglineId"),
              },
              viewProjects: {
                en: fd.get("viewProjectsEn"),
                id: fd.get("viewProjectsId"),
              },
              downloadCV: {
                en: fd.get("downloadCVEn"),
                id: fd.get("downloadCVId"),
              },
            });
          }}
        >
          <div style={s.grid2}>
            {[
              [
                "titleLine1",
                "Title Line 1",
                (hero?.title as { line1?: string })?.line1,
              ],
              [
                "titleLine2",
                "Title Line 2",
                (hero?.title as { line2?: string })?.line2,
              ],
              [
                "titleAccent",
                "Title Accent",
                (hero?.title as { accent?: string })?.accent,
              ],
              ["availableEn", "Available (EN)", hero?.available.en],
              ["availableId", "Available (ID)", hero?.available.id],
              ["subtitleEn", "Subtitle (EN)", hero?.subtitle.en],
              ["subtitleId", "Subtitle (ID)", hero?.subtitle.id],
              ["taglineEn", "Tagline (EN)", hero?.tagline.en],
              ["taglineId", "Tagline (ID)", hero?.tagline.id],
              ["focusLabelEn", "Focus Label (EN)", hero?.focusLabel.en],
              ["focusLabelId", "Focus Label (ID)", hero?.focusLabel.id],
              ["viewProjectsEn", "View Projects (EN)", hero?.viewProjects.en],
              ["viewProjectsId", "View Projects (ID)", hero?.viewProjects.id],
              ["downloadCVEn", "Download CV (EN)", hero?.downloadCV.en],
              ["downloadCVId", "Download CV (ID)", hero?.downloadCV.id],
            ].map(([name, label, val]) => (
              <div key={name as string} style={s.field}>
                <label style={s.label}>{label as string}</label>
                <input
                  name={name as string}
                  defaultValue={val as string}
                  style={s.input}
                />
              </div>
            ))}
          </div>
          <div style={s.field}>
            <label style={s.label}>
              Focus Activities — one per line, format: Label | Org
            </label>
            <textarea
              name="focusActivities"
              defaultValue={hero?.focusActivities
                .map((a) => `${a.label} | ${a.org}`)
                .join("\n")}
              style={{ ...s.textarea, minHeight: 80 }}
            />
          </div>
          <button type="submit" style={s.btn}>
            Save Hero
          </button>
        </form>
      </section>
    </div>
  );
}
