'use client';

import React from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, Award } from 'lucide-react';

interface HeroSectionProps {
  onShopClick: () => void;
  onVerifyClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onVerifyClick,
}) => {
  return (
    <section className="bg-[#FBF9F4] pt-14 pb-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-7 text-left">

            <span className="font-devanagari text-sm font-semibold text-[#C4611E] tracking-wide">
              शुद्धता का वादा — Purity&apos;s Promise
            </span>

            <div className="space-y-3">
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#24291F] leading-[1.12] tracking-tight">
                Fresh organic goodness,
                <br />
                verified for you.
              </h1>

              <h2 className="text-lg sm:text-xl font-semibold text-[#3F7D46] max-w-xl leading-snug">
                Buy NABL Lab-Tested A2 Ghee, Cold-Pressed Oils, Raw Honey &amp; Spices
                — Direct From Indian Farmers
              </h2>

              <p className="text-base text-[#6B7263] max-w-xl leading-relaxed">
                Every spice, oil, ghee, and grain undergoes independent lab testing for
                230+ chemical pesticides before reaching your kitchen — sourced directly
                from local Indian organic farmers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onShopClick}
                className="px-6 py-3.5 bg-[#C4611E] hover:bg-[#A84E15] text-white font-semibold text-base rounded-xl transition-colors flex items-center justify-center space-x-2 focus-visible:ring-2 focus-visible:ring-[#3F7D46]"
              >
                <span>Shop Verified Organic</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onVerifyClick}
                className="px-6 py-3.5 bg-transparent hover:bg-[#F4EEE1] text-[#24291F] font-semibold text-base rounded-xl border border-[#E7E0CE] transition-colors flex items-center justify-center space-x-2 focus-visible:ring-2 focus-visible:ring-[#3F7D46]"
              >
                <ShieldCheck className="w-4 h-4 text-[#3F7D46]" />
                <span>Verify Lab Report</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-[#E7E0CE]">
              <div className="flex items-center space-x-1.5 text-sm font-medium text-[#24291F]">
                <CheckCircle2 className="w-4 h-4 text-[#3F7D46] shrink-0" />
                <span>100% Zero Chemical</span>
              </div>
              <div className="flex items-center space-x-1.5 text-sm font-medium text-[#24291F]">
                <CheckCircle2 className="w-4 h-4 text-[#3F7D46] shrink-0" />
                <span>Fair Price to Farmers</span>
              </div>
              <div className="flex items-center space-x-1.5 text-sm font-medium text-[#24291F]">
                <CheckCircle2 className="w-4 h-4 text-[#3F7D46] shrink-0" />
                <span>QR Farm Traceability</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-[#F4EEE1]">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80"
                alt="Fresh organic Indian turmeric, spices, and natural grains"
                className="w-full h-[420px] sm:h-[460px] object-cover"
                loading="eager"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#24291F]/85 via-[#24291F]/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 text-white space-y-2">
                <span className="inline-flex items-center space-x-1 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  <Award className="w-3 h-3" />
                  <span>Featured Farm Batch</span>
                </span>

                <h3 className="font-serif-display text-xl font-bold">
                  Lakadong High-Curcumin Turmeric
                </h3>
                <p className="text-xs text-white/80">
                  Jaintia Hills Farmers Co-op · Batch #BHAROSA-2026-TURM-88
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-white/20">
                  <span className="text-xs text-white/80">Lab Certificate: NABL-2026-PASS</span>
                  <button
                    onClick={onVerifyClick}
                    className="text-xs font-semibold text-white flex items-center space-x-1"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-4 px-1">
              <div className="w-10 h-10 rounded-full bg-[#F4EEE1] text-[#3F7D46] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base font-bold text-[#24291F]">500+ organic farmers</div>
                <div className="text-xs text-[#6B7263]">verified and partnered</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
