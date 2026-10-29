import { createContext, useContext } from "react";

export type Locale = "en" | "hr";

export const LOCALES: Locale[] = ["hr", "en"];

export const isLocale = (value: unknown): value is Locale =>
  LOCALES.includes(value as Locale);

interface LanguageContextType {
  locale: Locale;
  switchLanguage: (lang: Locale) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
