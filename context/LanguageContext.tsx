"use client";

import { createContext, useContext, useState } from "react";
import { translations, type Lang } from "@/lib/i18n";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof translations)[Lang];
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
