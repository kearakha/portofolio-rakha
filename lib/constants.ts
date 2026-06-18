export const SITE = {
  name: "Muhammad Rakha Keanura",
  shortName: "Rakha Keanura",
  initials: "MR",
  avatar: "/images/avatar/foto-bengkod-kecil.jpeg",
  logo: "MRK.",
  role: "Backend Developer",
  institution: "UDINUS",
  email: "keanuraka14@gmail.com",
  github: "https://github.com/kearakha",
  linkedin: "https://linkedin.com/in/rakha-keanura-62613929b",
};

export const HERO_TITLE = {
  line1: "Muhammad",
  line2: "Rakha",
  accent: "Keanura.",
};

export const FOCUS_ACTIVITIES = [
  { label: "Backend Developer", org: "Bengkel Koding UDINUS" },
  { label: "Mahasiswa Informatika", org: "Semester 6 · UDINUS" },
  { label: "Alumni Student Mobility", org: "Universitas Gadjah Mada" },
];

export const MARQUEE_TECH = [
  "Laravel",
  "MySQL",
  "PHP",
  "REST API",
  "Next.js",
  "TypeScript",
  "Python",
  "Machine Learning",
  "Git",
  "Linux",
  "Figma",
  "Docker",
];

export const EXPERIENCE_STATIC = [
  {
    period: "Mar 2026 – Present",
    org: "Bengkel Koding · UDINUS",
    role: "Full Stack Developer",
    division: "Web Developer Division",
    tags: ["Laravel", "Next.js", "MySQL", "REST API", "Multi-tenant"],
    logoInitials: "BK",
    logoColor: "#2563EB",
  },
  {
    period: "Mar 2026 – Present",
    org: "Bengkel Koding · UDINUS",
    role: "Lead of Web Developer Division",
    division: "Web Developer Division",
    tags: ["Leadership", "Mentoring", "Laravel"],
    logoInitials: "BK",
    logoColor: "#2563EB",
  },
  {
    period: "Jan 2026 – Present",
    org: "Bengkel Koding · UDINUS",
    role: "Back End Developer",
    division: "Web Developer Division",
    tags: ["Laravel", "MySQL", "REST API", "Multi-tenant"],
    logoInitials: "BK",
    logoColor: "#2563EB",
  },
  {
    period: "Jan – Mar 2026",
    org: "Bengkel Koding · UDINUS",
    role: "Teaching Assistant",
    division: "Web Developer Division",
    tags: ["Teaching", "Mentoring", "Laravel", "PHP"],
    logoInitials: "BK",
    logoColor: "#2563EB",
  },
];

export const SKILLS = {
  primary: [
    { name: "Laravel", level: "Expert" },
    { name: "MySQL", level: "Expert" },
    { name: "GitHub", level: "Proficient" },
  ],
  exploring: [
    { name: "Next.js", level: "Learning" },
    { name: "Python", level: "Research" },
    { name: "Machine Learning", level: "Research" },
  ],
};

export const SMALL_PROJECTS = [
  {
    title: "STI Apps",
    desc: "Versi awal FIK Apps — sistem informasi akademik tingkat prodi sebelum naik ke level fakultas.",
    tags: ["Laravel", "MySQL"],
    year: "2023",
    href: "#",
  },
  {
    title: "Fake News Classifier",
    desc: "Implementasi model dari research paper — XGBoost + TF-IDF untuk klasifikasi berita palsu.",
    tags: ["Python", "ML"],
    year: "2024",
    href: "#",
  },
  {
    title: "EWS Prototype",
    desc: "Proof of concept dashboard Early Warning System sebelum masuk ke production.",
    tags: ["Laravel", "Chart.js"],
    year: "2023",
    href: "#",
  },
  {
    title: "API Wrapper FIK",
    desc: "Package PHP ringan sebagai wrapper REST API FIK Apps untuk konsumsi internal.",
    tags: ["PHP", "Laravel"],
    year: "2024",
    href: "#",
  },
  {
    title: "Absensi Automation",
    desc: "Script CLI Python untuk otomasi presensi berbasis terminal — proof of concept.",
    tags: ["Python"],
    year: "2023",
    href: "#",
  },
  {
    title: "NLP Preprocessing Kit",
    desc: "Toolkit preprocessing teks Bahasa Indonesia — tokenisasi, stopword removal, stemming.",
    tags: ["Python", "NLP"],
    year: "2024",
    href: "#",
  },
];

export const SELECTED_WORK = [
  {
    title: "FIK Apps + Sistem TA",
    partner: "Bengkel Koding UDINUS",
    period: "2023 – Present",
    description:
      "Multi-tenant academic information system for the Faculty of Computer Science — covering student data, thesis management, and academic workflows at scale.",
    tags: ["Laravel", "MySQL", "Multi-tenant", "REST API"],
    badges: ["Multi-tenant", "Faculty-scale", "861 endpoints"],
    gradientFrom: "#1E40AF",
    gradientTo: "#3B82F6",
    image: null as string | null,
    href: "#",
  },
  {
    title: "EWS — Early Warning System",
    partner: "Bengkel Koding UDINUS",
    period: "2023 – Present",
    description:
      "Student monitoring dashboard that detects academic risk patterns early — enabling timely intervention before issues escalate.",
    tags: ["Laravel", "MySQL", "Data Logic", "Chart.js"],
    badges: ["Real-time", "Faculty-scale", "Risk detection"],
    gradientFrom: "#92400E",
    gradientTo: "#F59E0B",
    image: null as string | null,
    href: "#",
  },
];

export const EDUCATION = [
  {
    institution: "Universitas Dian Nuswantoro",
    short: "UDINUS",
    degree: "S.Kom · Teknik Informatika",
    period: "2022 – Present",
    gpa: undefined as string | undefined,
    description:
      "Member of Bengkel Koding — a selective student community with Web Developer and Data Scientist divisions. Focused on backend engineering and building faculty-scale systems.",
    tags: ["Laravel", "MySQL", "PHP", "Python"],
  },
  {
    institution: "Universitas Gadjah Mada",
    short: "UGM",
    degree: "BS Computer Science (Student Mobility)",
    period: "Aug 2025 – Dec 2025",
    gpa: "3.83 / 4.00",
    description:
      "Student Mobility Program. Attended: Software Engineering Projects, Frontend & UI/UX, Blockchain, Deep Learning, Information Retrieval, and Artificial Intelligence.",
    tags: ["Software Engineering", "Deep Learning", "AI", "Frontend"],
  },
];

export const CONTACT_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/kearakha",
    variant: "outline" as const,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/rakha-keanura-62613929b",
    variant: "outline" as const,
  },
  {
    label: "Email →",
    href: "mailto:keanuraka14@gmail.com",
    variant: "filled" as const,
  },
];

export const FOOTER_LEFT = "Muhammad Rakha Keanura · 2026";
