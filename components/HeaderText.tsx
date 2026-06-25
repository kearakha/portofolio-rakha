"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { useIntro } from "@/context/IntroContext";
import { SITE } from "@/lib/constants";

export default function HeaderText() {
  const { t } = useLang();
  const { introComplete } = useIntro();

  return (
    <AnimatePresence>
      {introComplete && (
        <motion.p
          className="text-lg text-gray-900 font-bold tracking-tight"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {SITE.name} &nbsp;-&nbsp; {t.hero.subtitle}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
