"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, TranslationKey } from "@/lib/translations";

export type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  isArabic: boolean;
  dir: "ltr" | "rtl";
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  isArabic: false,
  dir: "ltr",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: TranslationKey) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("arizona_lang") as Language | null;
    if (savedLang === "ar" || savedLang === "en") {
      setLanguageState(savedLang);
      document.documentElement.lang = savedLang;
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("arizona_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "ar" : "en";
    setLanguage(nextLang);
  };

  const t = (key: TranslationKey): string => {
    const dict = translations[language];
    if (dict && dict[key]) {
      return dict[key];
    }
    const enDict = translations.en;
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return key;
  };

  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider
      value={{
        language,
        isArabic,
        dir,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      <div dir={dir} className={isArabic ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
