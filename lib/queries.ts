import { prisma } from "@/lib/prisma";

// Bilingual value shape stored inside Singleton JSON.
export type Localized = { en: string; id: string };

// ---- Singleton value shapes (mirror prisma/seed.ts) ----
export type SiteData = {
  name: string;
  shortName: string;
  initials: string;
  avatar: string;
  logo: string;
  role: string;
  institution: string;
  email: string;
  github: string;
  linkedin: string;
  cv?: string;
};

export type HeroData = {
  title: { line1: string; line2: string; accent: string };
  focusActivities: { label: string; org: string }[];
  focusLabel: Localized;
  available: Localized;
  tagline: Localized;
  viewProjects: Localized;
  downloadCV: Localized;
};

export type AboutData = {
  headingMain: Localized;
  headingAccent: Localized;
  body: Localized;
  stats: { en: string[]; id: string[] };
};

export type ContactData = {
  headingMain: Localized;
  headingLine2: Localized;
  headingAccent: Localized;
};

export type LabelsData = {
  nav: { en: Record<string, string>; id: Record<string, string> };
  about: Localized;
  experience: Localized;
  education: Localized;
  selectedWork: Localized;
  sideProjects: Localized;
  skills: { en: Record<string, string>; id: Record<string, string> };
  projects: { en: Record<string, string>; id: Record<string, string> };
  contact: Localized;
};

export type MarqueeData = { tech: string[]; label: Localized };
export type FooterData = { left: string; right: Localized };

// Generic singleton fetch, typed by caller.
async function getSingleton<T>(key: string): Promise<T | null> {
  const row = await prisma.singleton.findUnique({ where: { key } });
  return (row?.value as T) ?? null;
}

export const getSite = () => getSingleton<SiteData>("site");
export const getHero = () => getSingleton<HeroData>("hero");
export const getAbout = () => getSingleton<AboutData>("about");
export const getContact = () => getSingleton<ContactData>("contact");
export const getLabels = () => getSingleton<LabelsData>("labels");
export const getMarquee = () => getSingleton<MarqueeData>("marquee");
export const getFooter = () => getSingleton<FooterData>("footer");

// ---- Lists (ordered) ----
export const getExperience = () =>
  prisma.experience.findMany({ orderBy: { order: "asc" } });
export const getProjects = () =>
  prisma.project.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
export const getProject = (id: string) =>
  prisma.project.findUnique({ where: { id } });
export const getEducation = () =>
  prisma.education.findMany({ orderBy: { order: "asc" } });
export const getContactLinks = () =>
  prisma.contactLink.findMany({ orderBy: { order: "asc" } });

export const getSkills = async () => {
  const all = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  return {
    primary: all.filter((s) => s.category === "primary"),
    exploring: all.filter((s) => s.category === "exploring"),
  };
};

// One-shot fetch for the public page — parallel.
export async function getPortfolio() {
  const [
    site,
    hero,
    about,
    contact,
    labels,
    marquee,
    footer,
    experience,
    projects,
    education,
    contactLinks,
    skills,
  ] = await Promise.all([
    getSite(),
    getHero(),
    getAbout(),
    getContact(),
    getLabels(),
    getMarquee(),
    getFooter(),
    getExperience(),
    getProjects(),
    getEducation(),
    getContactLinks(),
    getSkills(),
  ]);

  return {
    site,
    hero,
    about,
    contact,
    labels,
    marquee,
    footer,
    experience,
    projects,
    education,
    contactLinks,
    skills,
  };
}

export type Portfolio = Awaited<ReturnType<typeof getPortfolio>>;
