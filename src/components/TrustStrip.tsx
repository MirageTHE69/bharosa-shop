'use client';

import { FlaskConical, Sprout, Truck, Banknote } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { useLanguage } from '@/context/LanguageContext';

export function TrustStrip() {
  const { t, fontClass } = useLanguage();

  const items = [
    { icon: FlaskConical, title: t('strip.labTitle'), desc: t('strip.labDesc') },
    { icon: Sprout, title: t('strip.farmTitle'), desc: t('strip.farmDesc') },
    { icon: Truck, title: t('strip.deliveryTitle'), desc: t('strip.deliveryDesc') },
    { icon: Banknote, title: t('strip.codTitle'), desc: t('strip.codDesc') },
  ];

  return (
    <section className="relative z-10 -mt-10 sm:-mt-12 px-4 sm:px-6 lg:px-8 bg-[linear-gradient(to_bottom,transparent_2.5rem,#fff_2.5rem)] sm:bg-[linear-gradient(to_bottom,transparent_3rem,#fff_3rem)]">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl shadow-black/5 border border-[#E7E0CE] grid grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, desc }, i) => (
          <Reveal
            key={title}
            delay={i * 80}
            className={`group flex items-center gap-3 p-4 sm:p-5 ${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''} border-[#E7E0CE]`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-[#EEF5EA] text-[#2A5C31] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className={`font-serif-display text-sm sm:text-base font-bold text-[#24291F] leading-tight ${fontClass}`}>{title}</div>
              <div className={`text-[11px] sm:text-xs text-[#6B7263] mt-0.5 ${fontClass}`}>{desc}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
