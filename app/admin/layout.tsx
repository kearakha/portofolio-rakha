import Link from "next/link";
import { signOut } from "@/auth";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/selected-work", label: "Selected Work" },
  { href: "/admin/side-projects", label: "Side Projects" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/skills", label: "Skills" },
];

const s = {
  sidebar: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: 220,
    height: "100vh",
    background: "#111",
    display: "flex",
    flexDirection: "column" as const,
    padding: "28px 16px 20px",
    gap: 2,
    zIndex: 50,
  },
  logo: {
    fontFamily: "var(--font-inter)",
    fontWeight: 800,
    fontSize: 16,
    color: "#fff",
    marginBottom: 24,
    letterSpacing: "-0.01em",
  },
  link: {
    display: "block",
    padding: "7px 12px",
    borderRadius: 8,
    fontFamily: "var(--font-inter)",
    fontSize: 13,
    color: "#aaa",
    textDecoration: "none",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--background)",
      }}
    >
      <aside style={s.sidebar}>
        <div style={s.logo}>MRK Admin</div>

        <nav
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
        >
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} style={s.link}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ borderTop: "1px solid #222", paddingTop: 14 }}>
          <Link
            href="/"
            target="_blank"
            style={{
              ...s.link,
              fontSize: 12,
              marginBottom: 4,
              display: "block",
            }}
          >
            ↗ View site
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "7px 12px",
                borderRadius: 8,
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: "#666",
                textAlign: "left",
                width: "100%",
              }}
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main
        style={{
          marginLeft: 220,
          flex: 1,
          padding: "40px 48px",
          maxWidth: 900,
        }}
      >
        {children}
      </main>
    </div>
  );
}
