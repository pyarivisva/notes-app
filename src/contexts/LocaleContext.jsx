import React from "react";

const LocaleContext = React.createContext();

export function LocaleProvider({ children }) {
  const [locale, setLocale] = React.useState(() => {
    return localStorage.getItem("locale") || "id";
  });

  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prev) => {
      const newLocale = prev === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export default LocaleContext;
