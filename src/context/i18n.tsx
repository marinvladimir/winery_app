import React, { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import en from "../locales/en.json";
import hr from "../locales/hr.json";
import { isLocale, LanguageContext, Locale } from "./languageContext";

const messages = { en, hr };
const STORAGE_KEY = "locale";
const DEFAULT_LOCALE: Locale = "hr";

// localStorage can throw (private mode, blocked storage) or hold a stale value.
const readStoredLocale = (): Locale => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(readStoredLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const switchLanguage = (lang: Locale) => {
    setLocale(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore – the choice still applies for this visit.
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, switchLanguage }}>
      <IntlProvider locale={locale} defaultLocale={DEFAULT_LOCALE} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};
