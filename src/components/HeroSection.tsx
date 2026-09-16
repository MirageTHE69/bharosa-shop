'use client';

import React from 'react';
import { ShieldCheck, ArrowRight, Leaf, HandCoins, ScanLine, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface HeroSectionProps {
  onShopClick: () => void;
  onVerifyClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onVerifyClick,
}) => {
  const { t, fontClass } = useLanguage();

  const trustItems = [
    { icon: Leaf, label: t('hero.trustZeroChemical') },
    { icon: HandCoins, label: t('hero.trustFairPrice') },
    { icon: ScanLine, label: t('hero.trustQrTrace') },
  ];

  return (
    <section className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center overflow-hidden bg-[#24291F]">
      <img
        src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1800&q=80"
        alt="Fresh organic Indian turmeric, spices, and natural grains"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#161911]/90 via-[#161911]/60 to-[#161911]/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#161911]/70 via-transparent to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl space-y-7">
          <span className={`${fontClass} text-sm font-semibold text-[#F4A94D] tracking-wide`}>
            {t('brand.tagline')}
          </span>

          <div className="space-y-4">
            <h1 className={`font-serif-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight ${fontClass}`}>
              <span className="text-white">{t('hero.titleLine1')}</span>
              <br />
              <span className="text-[#F4A94D]">{t('hero.titleLine2')}</span>
            </h1>

            <p className={`text-lg sm:text-xl text-white/90 max-w-xl leading-snug font-medium ${fontClass}`}>
              {t('hero.subhead')}
            </p>

            <p className={`text-base text-white/65 max-w-xl leading-relaxed ${fontClass}`}>
              {t('hero.paragraph')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <button
              onClick={onShopClick}
              className="px-7 py-3.5 bg-[#C4611E] hover:bg-[#A84E15] text-white font-semibold text-base rounded-full shadow-lg shadow-black/20 hover:shadow-xl transition-all flex items-center justify-center space-x-2 focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{t('hero.ctaShop')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onVerifyClick}
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-base rounded-full border border-white/30 transition-colors flex items-center justify-center space-x-2 focus-visible:ring-2 focus-visible:ring-white"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t('hero.ctaVerify')}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#F4A94D]" />
                </div>
                <span className={`text-sm font-medium text-white/90 ${fontClass}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating batch verification card */}
      <div className="hidden lg:block absolute bottom-10 right-10 w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-5 space-y-2.5">
        <span className="inline-flex items-center space-x-1 bg-[#F4EEE1] text-[#3F7D46] text-xs font-semibold px-2.5 py-1 rounded-full">
          <Award className="w-3 h-3" />
          <span className={fontClass}>{t('hero.featuredBatch')}</span>
        </span>

        <h3 className="font-serif-display text-lg font-bold text-[#24291F]">
          Lakadong High-Curcumin Turmeric
        </h3>
        <p className="text-xs text-[#6B7263]">
          Jaintia Hills Farmers Co-op · Batch #BHAROSA-2026-TURM-88
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-[#E7E0CE]">
          <span className={`text-xs text-[#6B7263] ${fontClass}`}>{t('hero.labCert')} NABL-2026-PASS</span>
          <button
            onClick={onVerifyClick}
            className="text-xs font-semibold text-[#3F7D46] flex items-center space-x-1 shrink-0"
          >
            <span className={fontClass}>{t('hero.inspect')}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </section>
  );
};
