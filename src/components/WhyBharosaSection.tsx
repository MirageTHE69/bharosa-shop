'use client';

import React from 'react';
import { Sparkles, HeartHandshake, ScanLine, Leaf } from 'lucide-react';
import { VALUE_PROPOSITIONS } from '../data/bharosaData';

export const WhyBharosaSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-7 h-7 text-[#E07A2E]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-7 h-7 text-[#3F7D46]" />;
      case 'ScanLine':
        return <ScanLine className="w-7 h-7 text-[#C79A3E]" />;
      case 'Leaf':
        return <Leaf className="w-7 h-7 text-[#2A5C31]" />;
      default:
        return <Sparkles className="w-7 h-7 text-[#E07A2E]" />;
    }
  };

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-[#F6F1E4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E07A2E] bg-[#EFE6D0] px-3 py-1 rounded-full border border-[#D6C8A6]">
            The Bharosa Standard
          </span>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2C1B]">
            Why Choose Bharosa Shop?
          </h2>

          <div className="font-devanagari text-xl font-medium text-[#3F7D46]">
            “भरोसा ही हमारी पहचान • परंपरा, शुद्धता और अपनापन”
          </div>
        </div>

        {/* 4 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUE_PROPOSITIONS.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-[#EFE6D0] rounded-2xl p-6 border-2 border-[#D6C8A6] hover:border-[#E07A2E] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 space-y-4 group"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-[#F6F1E4] border border-[#D6C8A6] flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                {getIcon(pillar.icon)}
              </div>

              {/* Title En & Headline Hi */}
              <div className="space-y-1">
                <h3 className="font-serif-display text-xl font-bold text-[#1E2C1B]">
                  {pillar.titleEn}
                </h3>

                <div className="font-devanagari text-xs font-bold text-[#C4611E]">
                  {pillar.headlineHi}
                </div>
              </div>

              {/* Plain Language Body Text */}
              <p className="text-sm text-[#1E2C1B]/85 font-sans-body leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Vernacular Quote Banner */}
        <div className="mt-16 bg-[#EFE6D0] rounded-3xl p-8 border-2 border-[#D6C8A6] text-center max-w-4xl mx-auto space-y-3">
          <div className="font-devanagari text-2xl sm:text-3xl font-bold text-[#1E2C1B]">
            “भरोसे का वादा, हर बार आपके साथ।”
          </div>
          <p className="text-sm sm:text-base text-[#1E2C1B]/80 font-sans-body max-w-2xl mx-auto">
            We bridge authentic Indian farming traditions with modern laboratory verification so your family enjoys 100% pure organic nourishment.
          </p>
        </div>

      </div>
    </section>
  );
};
