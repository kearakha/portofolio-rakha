import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Marquee from "@/components/Marquee";
import WhatIDo from "@/components/WhatIDo";
import SelectedCases from "@/components/SelectedCases";
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
        <WhatIDo />
        <SelectedCases />
        <Experience items={data.experience} />
        <Education items={data.education} />
        <Footer site={data.site} marquee={data.marquee} footer={data.footer} />
      </main>
    </IntroScreen>
  );
}
