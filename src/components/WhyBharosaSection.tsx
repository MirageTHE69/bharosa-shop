'use client';

import React from 'react';
import { Sparkles, HeartHandshake, ScanLine, Leaf } from 'lucide-react';
import { VALUE_PROPOSITIONS } from '../data/bharosaData';

export const WhyBharosaSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    const cls = 'w-6 h-6 text-[#3F7D46]';
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className={cls} />;
      case 'HeartHandshake':
        return <HeartHandshake className={cls} />;
      case 'ScanLine':
        return <ScanLine className={cls} />;
      case 'Leaf':
        return <Leaf className={cls} />;
      default:
        return <Sparkles className={cls} />;
    }
  };

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-[#FBF9F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3F7D46]">
            The Bharosa Standard
          </span>

          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#24291F]">
            Why Choose Bharosa Shop?
          </h2>
        </div>

        {/* 4 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUE_PROPOSITIONS.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-2xl p-6 border border-[#E7E0CE] hover:border-[#24291F]/30 transition-colors space-y-3"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4EEE1] flex items-center justify-center">
                {getIcon(pillar.icon)}
              </div>

              <h3 className="font-serif-display text-lg font-bold text-[#24291F]">
                {pillar.titleEn}
              </h3>

              <p className="text-sm text-[#6B7263] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Vernacular Quote Banner */}
        <div className="mt-14 bg-[#F4EEE1] rounded-2xl p-8 text-center max-w-3xl mx-auto space-y-3">
          <div className="font-devanagari text-2xl font-bold text-[#24291F]">
            “भरोसे का वादा, हर बार आपके साथ।”
          </div>
          <p className="text-sm text-[#6B7263] max-w-xl mx-auto">
            We bridge authentic Indian farming traditions with modern laboratory
            verification so your family enjoys 100% pure organic nourishment.
          </p>
        </div>

      </div>
    </section>
  );
};
