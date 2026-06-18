export type Lang = "en" | "id";

export const translations = {
  en: {
    nav: {
      work: "Work",
      sideProjects: "Side Projects",
      experience: "Experience",
      education: "Education",
      linkedin: "LinkedIn",
      cv: "CV",
    },
    hero: {
      available: "Available for opportunities",
      subtitle: "Backend Developer · Semarang 🇮🇩",
      tagline: "Building systems that actually work.",
      blurb:
        "At Bengkel Koding (a selective student dev community at UDINUS), I own the Thesis domain in a multi-tenant academic system serving an entire faculty (98 models, 861 endpoints). I lead the Web Developer Division (19 devs) and taught Laravel to 30+ students. Spent a semester at UGM widening how I think about systems. Now looking for a backend or fullstack internship on a team building something real.",
    },
    marquee: {
      label: "TECH STACK",
    },
    selectedWork: {
      sectionLabel: "Selected Work",
      caseStudyLabel: "Reach out for full case study",
      items: [
        {
          title: "FIK Apps + Sistem TA",
          description:
            "Multi-tenant academic information system for the Faculty of Computer Science — covering student data, thesis management, and academic workflows at scale.",
        },
        {
          title: "EWS — Early Warning System",
          description:
            "Student monitoring dashboard that detects academic risk patterns early — enabling timely intervention before issues escalate.",
        },
      ],
    },
    sideProjects: {
      sectionLabel: "Side Projects & Prototypes",
      visitLabel: "Visit →",
      items: [
        {
          title: "STI Apps",
          desc: "Early version of FIK Apps — a program-level academic information system before it scaled to the faculty level.",
        },
        {
          title: "Fake News Classifier",
          desc: "Research paper implementation — XGBoost + TF-IDF for fake news classification.",
        },
        {
          title: "EWS Prototype",
          desc: "Proof of concept dashboard for an Early Warning System before production.",
        },
        {
          title: "API Wrapper FIK",
          desc: "Lightweight PHP package as a REST API wrapper for FIK Apps for internal consumption.",
        },
        {
          title: "Absensi Automation",
          desc: "Python CLI script for terminal-based attendance automation — proof of concept.",
        },
        {
          title: "NLP Preprocessing Kit",
          desc: "Indonesian text preprocessing toolkit — tokenization, stopword removal, stemming.",
        },
      ],
    },
    experience: {
      sectionLabel: "Experience",
      items: [
        {
          title: "Full Stack Developer",
          description:
            "Ships complete features end-to-end — backend APIs in Laravel and frontend in Next.js. Handles the full cycle: schema design, API, and UI delivery.",
        },
        {
          title: "Lead of Web Developer Division",
          description:
            "Leading 19 web developers across ongoing faculty-scale projects. Manages task distribution, code reviews, and delivery for the Web Developer Division at Bengkel Koding.",
        },
        {
          title: "Back End Developer",
          description:
            "Owned the Tugas Akhir (thesis) domain end-to-end in a multi-tenant academic system serving the Faculty of Computer Science — 78 commits across 46 controllers, 98 models, 861 REST endpoints.",
        },
        {
          title: "Teaching Assistant",
          description:
            "Coordinated and taught 30+ students in Web Developer Class — mentoring on Laravel, PHP fundamentals, and hands-on code review.",
        },
      ],
    },
    education: {
      sectionLabel: "Education",
      items: [
        {
          degree: "S.Kom · Informatics Engineering",
          description:
            "Member of Bengkel Koding — a selective student community with Web Developer and Data Scientist divisions. Focused on backend engineering and building faculty-scale systems.",
        },
        {
          degree: "BS Computer Science (Student Mobility)",
          description:
            "Student Mobility Program. Attended: Software Engineering Projects, Frontend & UI/UX, Blockchain, Deep Learning, Information Retrieval, and Artificial Intelligence.",
        },
      ],
    },
    footer: {
      byline: "All rights reserved.",
      right: "All rights reserved.",
    },
  },
  id: {
    nav: {
      work: "Karya",
      sideProjects: "Proyek Sampingan",
      experience: "Pengalaman",
      education: "Pendidikan",
      linkedin: "LinkedIn",
      cv: "CV",
    },
    hero: {
      available: "Tersedia untuk peluang",
      subtitle: "Backend Developer · Semarang 🇮🇩",
      tagline: "Membangun sistem yang benar-benar bekerja.",
      blurb:
        "Di Bengkel Koding (komunitas dev mahasiswa terpilih UDINUS), aku pegang domain Tugas Akhir di sistem akademik multi-tenant skala fakultas (98 model, 861 endpoint). Mimpin Web Developer Division (19 dev) dan ngajar Laravel ke 30+ mahasiswa. Sempat satu semester di UGM memperluas cara mikir tentang sistem. Sekarang nyari magang backend atau fullstack di tim yang bangun sesuatu yang nyata.",
    },
    marquee: {
      label: "TEKNOLOGI",
    },
    selectedWork: {
      sectionLabel: "Karya Pilihan",
      caseStudyLabel: "Hubungi untuk case study lengkap",
      items: [
        {
          title: "FIK Apps + Sistem TA",
          description:
            "Sistem informasi akademik multi-tenant untuk Fakultas Ilmu Komputer — mencakup data mahasiswa, manajemen tugas akhir, dan alur akademik skala penuh.",
        },
        {
          title: "EWS — Early Warning System",
          description:
            "Dashboard pemantauan mahasiswa yang mendeteksi pola risiko akademik lebih awal — memungkinkan intervensi tepat waktu sebelum masalah memburuk.",
        },
      ],
    },
    sideProjects: {
      sectionLabel: "Proyek Sampingan & Prototipe",
      visitLabel: "Kunjungi →",
      items: [
        {
          title: "STI Apps",
          desc: "Versi awal FIK Apps — sistem informasi akademik tingkat prodi sebelum naik ke level fakultas.",
        },
        {
          title: "Fake News Classifier",
          desc: "Implementasi model dari research paper — XGBoost + TF-IDF untuk klasifikasi berita palsu.",
        },
        {
          title: "EWS Prototype",
          desc: "Proof of concept dashboard Early Warning System sebelum masuk ke production.",
        },
        {
          title: "API Wrapper FIK",
          desc: "Package PHP ringan sebagai wrapper REST API FIK Apps untuk konsumsi internal.",
        },
        {
          title: "Absensi Automation",
          desc: "Script CLI Python untuk otomasi presensi berbasis terminal — proof of concept.",
        },
        {
          title: "NLP Preprocessing Kit",
          desc: "Toolkit preprocessing teks Bahasa Indonesia — tokenisasi, stopword removal, stemming.",
        },
      ],
    },
    experience: {
      sectionLabel: "Pengalaman",
      items: [
        {
          title: "Full Stack Developer",
          description:
            "Mengerjakan fitur end-to-end — backend API di Laravel dan frontend di Next.js. Menangani siklus penuh: desain schema, API, hingga tampilan UI.",
        },
        {
          title: "Lead of Web Developer Division",
          description:
            "Memimpin 19 web developer di proyek-proyek skala fakultas. Mengelola distribusi task, code review, dan delivery di Web Developer Division Bengkel Koding.",
        },
        {
          title: "Back End Developer",
          description:
            "Memiliki domain Tugas Akhir secara penuh di sistem akademik multi-tenant Fakultas Ilmu Komputer — 78 commit di 46 controller, 98 model, 861 REST endpoint.",
        },
        {
          title: "Teaching Assistant",
          description:
            "Mengkoordinasi dan mengajar 30+ mahasiswa di Web Developer Class — mentoring Laravel, dasar PHP, dan code review langsung.",
        },
      ],
    },
    education: {
      sectionLabel: "Pendidikan",
      items: [
        {
          degree: "S.Kom · Teknik Informatika",
          description:
            "Anggota Bengkel Koding — komunitas dev mahasiswa terpilih dengan divisi Web Developer dan Data Scientist. Fokus pada backend engineering dan membangun sistem skala fakultas.",
        },
        {
          degree: "BS Computer Science (Student Mobility)",
          description:
            "Program Student Mobility. Mengikuti: Software Engineering Projects, Frontend & UI/UX, Blockchain, Deep Learning, Information Retrieval, dan Kecerdasan Buatan.",
        },
      ],
    },
    footer: {
      byline: "All rights reserved.",
      right: "Hak cipta dilindungi.",
    },
  },
} as const;

export type Translations = (typeof translations)[Lang];
