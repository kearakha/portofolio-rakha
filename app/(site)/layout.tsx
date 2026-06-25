import type { Metadata } from "next";
import BottomNav from "@/components/BottomNav";
import GradualBlur from "@/components/GradualBlur";
import HeaderText from "@/components/HeaderText";
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
  const site = await getSite();

  return (
    <LanguageProvider>
      <IntroProvider>
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
        <div className="fixed top-0 left-0 right-0 z-200 flex justify-center items-center pt-12 pb-6 pointer-events-none">
          <HeaderText />
        </div>
        {children}
        <BottomNav cvLink={site?.cv ?? "#"} />
      </IntroProvider>
    </LanguageProvider>
  );
}
