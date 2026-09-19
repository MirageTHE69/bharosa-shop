'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Banknote, FlaskConical, Landmark, Leaf, PackageX, Scale } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const POINTS = [
  { key: 'p1', icon: Leaf },
  { key: 'p2', icon: FlaskConical },
  { key: 'p3', icon: Banknote },
  { key: 'p4', icon: Scale },
  { key: 'p5', icon: PackageX },
  { key: 'p6', icon: Landmark },
] as const;

export const FarmerAgreementSection: React.FC = () => {
  const { t, fontClass } = useLanguage();

  return (
    <section id="farmer-agreement" className="py-16 sm:py-24 bg-[#F4EEE1]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-36">
            <span className={`text-xs font-bold uppercase tracking-widest text-[#3F7D46] ${fontClass}`}>
              {t('agrSection.eyebrow')}
            </span>

            <h2 className={`font-serif-display text-3xl sm:text-4xl font-bold text-[#24291F] leading-tight ${fontClass}`}>
              {t('agrSection.title')}
            </h2>

            <p className={`text-base text-[#6B7263] leading-relaxed ${fontClass}`}>
              {t('agrSection.desc')}
            </p>

            <div className="pt-2 space-y-3">
              <Link
                href="/farmer-agreement"
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 bg-[#C4611E] hover:bg-[#A84E15] text-white font-semibold text-base rounded-full shadow-sm hover:shadow-md transition-all focus-visible:ring-2 focus-visible:ring-[#3F7D46]"
              >
                <span className={fontClass}>{t('agrSection.cta')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className={`text-xs text-[#6B7263] ${fontClass}`}>{t('agrSection.note')}</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {POINTS.map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F4EEE1] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#3F7D46]" />
                  </div>
                  <h3 className={`font-serif-display text-base font-bold text-[#24291F] ${fontClass}`}>
                    {t(`agrSection.${key}.title`)}
                  </h3>
                  <p className={`text-sm text-[#6B7263] leading-relaxed ${fontClass}`}>
                    {t(`agrSection.${key}.desc`)}
                  </p>
                </div>
              ))}
            </div>

            <p className={`text-xs text-[#6B7263] ${fontClass}`}>{t('agrSection.disclaimer')}</p>
          </div>

        </div>
      </div>
    </section>
  );
};
