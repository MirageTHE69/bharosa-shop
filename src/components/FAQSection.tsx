'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/lib/i18n/translations';

const FAQ_KEYS = [
  { q: 'faq.q1', a: 'faq.a1' },
  { q: 'faq.q2', a: 'faq.a2' },
  { q: 'faq.q3', a: 'faq.a3' },
  { q: 'faq.q4', a: 'faq.a4' },
];

export const FAQSection: React.FC = () => {
  const { t, fontClass } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Schema.org markup always uses the English copy — that's what search
  // engines index regardless of the viewer's selected UI language.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_KEYS.map(({ q, a }) => ({
      '@type': 'Question',
      name: translate('en', q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: translate('en', a),
      },
    })),
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FBF9F4]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className={`text-xs font-bold uppercase tracking-widest text-[#3F7D46] ${fontClass}`}>
            {t('faq.eyebrow')}
          </span>
          <h2 className={`font-serif-display text-3xl sm:text-4xl font-bold text-[#24291F] ${fontClass}`}>
            {t('faq.title')}
          </h2>
        </div>

        <div className="divide-y divide-[#E7E0CE] border-t border-b border-[#E7E0CE]">
          {FAQ_KEYS.map(({ q, a }, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className={`font-semibold text-[#24291F] ${fontClass}`}>{t(q)}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-[#6B7263] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className={`text-sm text-[#6B7263] leading-relaxed pb-5 pr-8 ${fontClass}`}>
                    {t(a)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
