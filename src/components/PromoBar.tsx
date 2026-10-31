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
    <div className="w-full bg-[#2A5C31] text-white text-xs overflow-hidden">
      <div className="h-9 flex items-center">
        <div className="flex items-center gap-10 pr-10 animate-marquee whitespace-nowrap">
          {[...items, ...items].map(({ icon: Icon, label }, i) => (
            <span key={i} className={`flex items-center space-x-1.5 ${fontClass}`}>
              <Icon className="w-3.5 h-3.5 text-[#F9BD5E] shrink-0" />
              <span>{label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
