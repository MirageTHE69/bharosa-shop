'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Download, FileText, Store } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppShell } from '@/context/AppShellContext';
import { LANGUAGES, type Lang } from '@/lib/i18n/translations';
import {
  AGREEMENT_CLAUSES,
  AGREEMENT_PARTIES,
  AGREEMENT_PDF,
  AGREEMENT_SIGNATURE,
  AGREEMENT_TAGLINE,
  AGREEMENT_TITLE,
  type AgreementSegment,
} from '@/data/farmerAgreement';

const FONT: Record<Lang, string> = { en: '', hi: 'font-devanagari', gu: 'font-gujarati' };
const ALL_ORDER: Lang[] = ['en', 'gu', 'hi'];
const CHIP: Record<Lang, string> = {
  en: 'bg-blue-50 text-blue-800',
  gu: 'bg-yellow-100 text-yellow-800',
  hi: 'bg-orange-100 text-orange-800',
};

function Rich({ segments }: { segments: AgreementSegment[] }) {
  return (
    <>
      {segments.map((s, i) =>
        s.k === 'critical' ? (
          <strong key={i} className="font-semibold text-red-700">{s.t}</strong>
        ) : s.k === 'strong' ? (
          <strong key={i} className="font-semibold text-[#24291F]">{s.t}</strong>
        ) : (
          <span key={i}>{s.t}</span>
        ),
      )}
    </>
  );
}

function LangChip({ code }: { code: Lang }) {
  return (
    <span className={`inline-block shrink-0 rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide ${CHIP[code]}`}>
      {code.toUpperCase()}
    </span>
  );
}

export function FarmerAgreementView() {
  const { lang, setLang, t } = useLanguage();
  const { openSellerModal } = useAppShell();
  const [showAll, setShowAll] = useState(false);

  const activeLang: Lang = showAll ? 'en' : lang;
  const visibleLangs: Lang[] = showAll ? ALL_ORDER : [lang];
  const otherTitles = ALL_ORDER.filter((l) => l !== activeLang);

  const pillBase = 'px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap';
  const pillOn = 'bg-[#24291F] text-white';
  const pillOff = 'text-[#24291F] hover:bg-[#F4EEE1]';

  return (
    <div className="bg-[#FBF9F4]">
      {/* Header */}
      <section className="bg-[#F4EEE1]/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pt-10 sm:pb-12">
          <nav className="flex items-center flex-wrap gap-1 text-xs text-[#6B7263] mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#24291F]">{t('agr.breadcrumbHome')}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#24291F]">{t('agr.breadcrumb')}</span>
          </nav>

          <div className="space-y-3">
            <span className={`text-xs font-bold uppercase tracking-widest text-[#3F7D46] ${FONT[lang]}`}>
              {t('agr.eyebrow')}
            </span>
            <h1 className={`font-serif-display text-3xl sm:text-4xl font-bold text-[#24291F] leading-tight ${FONT[activeLang]}`}>
              {AGREEMENT_TITLE[activeLang]}
            </h1>
            <p className="text-sm text-[#6B7263] leading-relaxed">
              {otherTitles.map((l, i) => (
                <React.Fragment key={l}>
                  {i > 0 && <span className="mx-2">|</span>}
                  <span className={FONT[l]}>{AGREEMENT_TITLE[l]}</span>
                </React.Fragment>
              ))}
            </p>
            <p className="text-sm font-medium text-[#C4611E]">{AGREEMENT_TAGLINE}</p>
          </div>

          <div
            role="group"
            aria-label={t('nav.language')}
            className="mt-7 inline-flex flex-wrap items-center gap-1 rounded-full bg-white p-1 shadow-sm"
          >
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                type="button"
                aria-pressed={!showAll && lang === l.code}
                onClick={() => {
                  setLang(l.code);
                  setShowAll(false);
                }}
                className={`${pillBase} ${FONT[l.code]} ${!showAll && lang === l.code ? pillOn : pillOff}`}
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={showAll}
              onClick={() => setShowAll(true)}
              className={`${pillBase} ${showAll ? pillOn : pillOff}`}
            >
              {t('agr.langAll')}
            </button>
          </div>
        </div>
      </section>

      {/* Agreement body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-5">
        {/* Parties */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          {visibleLangs.map((l) => (
            <div key={l} className="flex items-start gap-3">
              {showAll && <LangChip code={l} />}
              <p className={`text-base leading-[1.75] text-[#24291F] ${FONT[l]}`}>
                <Rich segments={AGREEMENT_PARTIES[l]} />
              </p>
            </div>
          ))}
        </section>

        {/* Clauses */}
        {AGREEMENT_CLAUSES.map((clause, idx) => (
          <article key={clause.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="shrink-0 w-9 h-9 rounded-full bg-[#F4EEE1] text-[#3F7D46] font-serif-display font-bold flex items-center justify-center">
                {idx + 1}
              </span>

              <div className="min-w-0 flex-1 space-y-4">
                <div className="space-y-1">
                  <h2 className={`font-serif-display text-xl font-bold text-[#24291F] leading-snug ${FONT[activeLang]}`}>
                    {clause.title[activeLang]}
                  </h2>
                  {showAll && (
                    <p className="text-sm text-[#6B7263] leading-relaxed">
                      {otherTitles.map((l, i) => (
                        <React.Fragment key={l}>
                          {i > 0 && <span className="mx-2">|</span>}
                          <span className={FONT[l]}>{clause.title[l]}</span>
                        </React.Fragment>
                      ))}
                    </p>
                  )}
                </div>

                {visibleLangs.map((l) => (
                  <div key={l} className="flex items-start gap-3">
                    {showAll && <LangChip code={l} />}
                    <p className={`text-base leading-[1.75] text-[#24291F] ${FONT[l]}`}>
                      <Rich segments={clause.body[l]} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}

        {/* Signature block */}
        <section className="bg-white rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 sm:grid-cols-2 sm:divide-x divide-y sm:divide-y-0 divide-[#F4EEE1]">
          {([AGREEMENT_SIGNATURE.company, AGREEMENT_SIGNATURE.farmer] as const).map((block) => (
            <div key={block.heading.en} className="p-6 sm:p-8 space-y-4">
              <h2 className="text-sm font-bold text-[#24291F]">
                {block.heading.en} <span className="font-gujarati font-semibold text-[#6B7263]">/ {block.heading.gu}</span>
              </h2>
              <div className="space-y-3">
                {block.fields.map((f) => (
                  <div key={f.en} className="flex items-end gap-2 text-sm text-[#24291F]">
                    <span className="shrink-0">
                      {f.en}
                      {f.gu && <span className="font-gujarati text-[#6B7263]"> / {f.gu}</span>}:
                    </span>
                    <span className="flex-1 min-w-[2rem] h-5 border-b border-[#24291F]/25" aria-hidden="true" />
                  </div>
                ))}
              </div>
              <div className="pt-8">
                <div className="border-t border-[#24291F]/30 pt-2 text-sm font-semibold text-[#24291F]">
                  {block.signature.en}{' '}
                  <span className="font-gujarati font-semibold text-[#6B7263]">/ {block.signature.gu}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Download */}
        <section
          id="download"
          className="bg-[#24291F] text-white rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-[#F4A94D]" />
            </div>
            <div className="space-y-1">
              <h2 className={`font-serif-display text-xl font-bold ${FONT[lang]}`}>{t('agr.downloadTitle')}</h2>
              <p className={`text-sm text-white/65 max-w-md leading-relaxed ${FONT[lang]}`}>{t('agr.downloadDesc')}</p>
              <p className="text-xs text-white/45 pt-1">{AGREEMENT_PDF.meta}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a
              href={AGREEMENT_PDF.href}
              download={AGREEMENT_PDF.downloadName}
              className="px-6 py-3 bg-[#C4611E] hover:bg-[#A84E15] text-white font-semibold text-sm rounded-full shadow-lg shadow-black/20 hover:shadow-xl transition-all flex items-center justify-center space-x-2 focus-visible:ring-2 focus-visible:ring-white"
            >
              <Download className="w-4 h-4" />
              <span className={FONT[lang]}>{t('agr.downloadBtn')}</span>
            </a>
            <button
              type="button"
              onClick={openSellerModal}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm rounded-full transition-colors flex items-center justify-center space-x-2 focus-visible:ring-2 focus-visible:ring-white"
            >
              <Store className="w-4 h-4" />
              <span className={FONT[lang]}>{t('nav.becomeSeller')}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
