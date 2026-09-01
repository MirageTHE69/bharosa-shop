'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Languages, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LANGUAGES } from '@/lib/i18n/translations';

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const active = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={t('nav.language')}
        aria-expanded={isOpen}
        className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[#24291F] font-medium text-sm hover:bg-[#F4EEE1] transition-colors"
      >
        <Languages className="w-3.5 h-3.5 text-[#6B7263]" />
        <span>{active.nativeLabel}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-40 bg-white border border-[#E7E0CE] rounded-xl shadow-lg py-1.5 z-50">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-[#24291F] hover:bg-[#F4EEE1] transition-colors"
            >
              <span className={l.code === 'hi' ? 'font-devanagari' : l.code === 'gu' ? 'font-gujarati' : ''}>
                {l.label}
              </span>
              {lang === l.code && <Check className="w-3.5 h-3.5 text-[#3F7D46]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
