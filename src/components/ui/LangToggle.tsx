"use client";

import { useCallback, useState } from "react";

const STORAGE_KEY = "deepocean-locale";

type Locale = "en" | "vi";

function readLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "vi") return stored;
  return (navigator.language || "").toLowerCase().startsWith("vi") ? "vi" : "en";
}

export function LangToggle() {
  const [locale, setLocale] = useState<Locale>(readLocale);

  const toggle = useCallback(() => {
    const next: Locale = locale === "en" ? "vi" : "en";
    setLocale(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute("data-locale", next);
    document.documentElement.lang = next;
  }, [locale]);

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggle}
      aria-label="Switch language"
    >
      <span className={locale === "en" ? "active" : undefined}>EN</span>
      <span className={locale === "vi" ? "active" : undefined}>VI</span>
    </button>
  );
}
