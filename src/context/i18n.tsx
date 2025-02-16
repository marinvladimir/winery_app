import React, { createContext, useContext, useState } from "react";
import { IntlProvider } from "react-intl";
import en from "../locales/en.json";
import hr from "../locales/hr.json";

const messages = { en, hr };

type Locale = "en" | "hr";

interface LanguageContextType {
  locale: Locale;
  switchLanguage: (lang: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storedLocale = localStorage.getItem("locale") as Locale || "hr"; 
  const [locale, setLocale] = useState<Locale>(storedLocale);

  const switchLanguage = (lang: Locale) => {
    setLocale(lang);
    localStorage.setItem("locale", lang);
  };

  return (
    <LanguageContext.Provider value={{ locale, switchLanguage }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
