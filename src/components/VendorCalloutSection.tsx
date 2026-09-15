'use client';

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAppShell } from '@/context/AppShellContext';
import { useLanguage } from '@/context/LanguageContext';

export const VendorCalloutSection: React.FC = () => {
  const { openSellerModal } = useAppShell();
  const { t, fontClass } = useLanguage();

  const benefitKeys = [
    'vendorCallout.benefit1',
    'vendorCallout.benefit2',
    'vendorCallout.benefit3',
    'vendorCallout.benefit4',
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#24291F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Callout Text */}
          <div className="lg:col-span-8 space-y-4">
            <span className={`text-xs font-bold uppercase tracking-widest text-[#C79A3E] ${fontClass}`}>
              {t('vendorCallout.eyebrow')}
            </span>

            <h2 className={`font-serif-display text-3xl sm:text-4xl font-bold ${fontClass}`}>
              {t('vendorCallout.title')}
            </h2>

            <p className={`text-base text-white/70 max-w-2xl leading-relaxed ${fontClass}`}>
              {t('vendorCallout.desc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {benefitKeys.map((key) => (
                <div key={key} className="flex items-center space-x-2 text-sm text-white/85">
                  <CheckCircle2 className="w-4 h-4 text-[#3F7D46] shrink-0" />
                  <span className={fontClass}>{t(key)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Callout Action */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
            <button
              onClick={openSellerModal}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#C4611E] hover:bg-[#A84E15] text-white font-semibold text-base rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2 focus-visible:ring-2 focus-visible:ring-white"
            >
              <span className={fontClass}>{t('vendorCallout.cta')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className={`text-xs text-white/50 mt-3 text-center lg:text-right ${fontClass}`}>
              {t('vendorCallout.footnote')}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
