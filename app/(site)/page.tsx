import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import SideProjects from "@/components/SideProjects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import { getPortfolio } from "@/lib/queries";

export default async function Home() {
  const data = await getPortfolio();

  return (
    <main className="pt-16">
      <Hero
        site={data.site}
        hero={data.hero}
        about={data.about}
        marquee={data.marquee}
      />
      <SelectedWork items={data.selectedWork} />
      <SideProjects items={data.smallProjects} />
      <Experience items={data.experience} />
      <Education items={data.education} />
      <Footer site={data.site} marquee={data.marquee} footer={data.footer} />
    </main>
  );
}
