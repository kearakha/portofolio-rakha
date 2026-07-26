import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Marquee from "@/components/Marquee";
import SelectedCases from "@/components/SelectedCases";
import FocusAreasStack from "@/components/FocusAreasStack";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import IntroScreen from "@/components/IntroScreen";
import { getPortfolio } from "@/lib/queries";

export default async function Home() {
  const data = await getPortfolio();

  return (
    <IntroScreen>
      <main className="pt-16">
        <Hero
          site={data.site}
          hero={data.hero}
          about={data.about}
          marquee={data.marquee}
        />
        <Statement />
        <Marquee marquee={data.marquee} />
        <SelectedCases
          items={data.projects.filter((p) =>
            p.sections.includes("selected-cases"),
          )}
        />
        <FocusAreasStack />
        <Experience items={data.experience} />
        <Education items={data.education} />
        <Footer site={data.site} footer={data.footer} />
      </main>
    </IntroScreen>
  );
}
