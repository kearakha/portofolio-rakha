import type { Metadata } from "next";
import GradualBlur from "@/components/GradualBlur";
import WowChrome from "@/components/WowChrome";
import { LanguageProvider } from "@/context/LanguageContext";
import { IntroProvider } from "@/context/IntroContext";
import { getSite } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  if (!site) return { title: "Portfolio", description: "Portfolio" };
  return {
    title: `${site.name} · ${site.role}`,
    description: `Portfolio of ${site.name} — ${site.role} at ${site.institution}. Building backend systems and fullstack apps with Laravel and Next.js.`,
  };
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <IntroProvider>
        <WowChrome />
        <GradualBlur
          target="page"
          position="top"
          height="6rem"
          strength={5}
          divCount={5}
          curve="bezier"
          opacity={1}
          zIndex={40}
        />
        {children}
      </IntroProvider>
    </LanguageProvider>
  );
}
