'use client';

import React from 'react';
import { Truck, ShieldCheck, Banknote, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const PromoBar: React.FC = () => {
  const { t, fontClass } = useLanguage();

  const items = [
    { icon: Truck, label: t('promo.delivery') },
    { icon: ShieldCheck, label: t('promo.labTested') },
    { icon: Banknote, label: t('promo.cod') },
    { icon: MapPin, label: t('promo.vadodara') },
  ];

  return (
    <div className="w-full bg-[#1A1E15] text-white/85 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-center sm:justify-between overflow-x-auto no-scrollbar">
        <div className="hidden sm:flex items-center space-x-6">
          {items.map(({ icon: Icon, label }) => (
            <span key={label} className={`flex items-center space-x-1.5 whitespace-nowrap ${fontClass}`}>
              <Icon className="w-3.5 h-3.5 text-[#C79A3E] shrink-0" />
              <span>{label}</span>
            </span>
          ))}
        </div>
        <div className="flex sm:hidden items-center space-x-1.5 whitespace-nowrap">
          <Truck className="w-3.5 h-3.5 text-[#C79A3E] shrink-0" />
          <span className={fontClass}>{t('promo.delivery')}</span>
        </div>
      </div>
    </div>
  );
};
