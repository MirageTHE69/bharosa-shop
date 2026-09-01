'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { translate, type Lang } from '@/lib/i18n/translations';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  /** CSS class selecting the right script font for the active language ('' for English/Latin). */
  fontClass: string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'bharosa-lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    // Deliberately deferred to after mount: the server always renders 'en'
    // (no access to localStorage), so reading it during the initial render
    // would desync from the SSR markup and trigger a hydration mismatch
    // across every translated node on the page.
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'hi' || stored === 'gu') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLangState(stored);
      }
    } catch {
      // localStorage unavailable — fall back to default 'en'.
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Non-fatal — language just won't persist across reloads.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback((key: string) => translate(lang, key), [lang]);
  const fontClass = lang === 'hi' ? 'font-devanagari' : lang === 'gu' ? 'font-gujarati' : '';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, fontClass }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
