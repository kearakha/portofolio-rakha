"use client";

import { useLang } from "@/context/LanguageContext";
import { SITE } from "@/lib/constants";

export default function HeaderText() {
  const { t } = useLang();
  return (
    <p className="text-lg text-gray-900 font-bold tracking-tight">
      {SITE.name} &nbsp;-&nbsp; {t.hero.subtitle}
    </p>
  );
}
