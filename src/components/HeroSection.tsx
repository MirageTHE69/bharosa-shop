'use client';

import React from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, Award, Sparkles, Sprout } from 'lucide-react';
import { TrustSealBadge } from './TrustSealBadge';

interface HeroSectionProps {
  onShopClick: () => void;
  onVerifyClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onVerifyClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#F6F1E4] pt-6 pb-16 lg:py-20 border-b border-[#EFE6D0]">
      {/* Background Subtle Organic Warm Accent Gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#E07A2E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#3F7D46]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Column (Desktop: 7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Brand Tagline Eyebrow */}
            <div className="inline-flex items-center space-x-2 bg-[#EFE6D0] border border-[#D6C8A6] rounded-full px-4 py-1.5 shadow-2xs">
              <Sprout className="w-4 h-4 text-[#3F7D46]" />
              <span className="font-devanagari font-bold text-sm text-[#C4611E] tracking-wide">
                शुद्धता का वादा (Purity&apos;s Promise)
              </span>
              <span className="text-[#1E2C1B]/40">•</span>
              <span className="text-xs font-semibold text-[#1E2C1B]">Direct Farm Sourcing</span>
            </div>

            {/* Main Headline & Hindi Subheadline */}
            <div className="space-y-3">
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E2C1B] leading-[1.15] tracking-tight">
                Fresh Organic Goodness, <br className="hidden sm:inline" />
                <span className="text-[#E07A2E] underline decoration-[#C79A3E]/40 decoration-wavy underline-offset-8">
                  Verified for You
                </span>
              </h1>
              
              <h2 className="font-devanagari text-2xl sm:text-3xl font-medium text-[#2A5C31] leading-snug pt-1">
                “प्रकृति से सीधे आपके घर तक”
              </h2>
            </div>

            {/* Clear Plain Language Body Text */}
            <p className="text-lg sm:text-xl text-[#1E2C1B]/90 font-sans-body max-w-2xl leading-relaxed">
              Every spice, oil, ghee, and grain on Bharosa Shop undergoes independent lab testing for 230+ chemical pesticides before reaching your kitchen. Sourced directly from local Indian organic farmers.
            </p>

            {/* CTAs Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Primary CTA (Turmeric Button) */}
              <button
                onClick={onShopClick}
                className="px-8 py-4 bg-[#E07A2E] hover:bg-[#C4611E] text-white font-bold text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-3 group focus-visible:ring-4 focus-visible:ring-[#3F7D46]"
              >
                <span>Shop Verified Organic</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onVerifyClick}
                className="px-6 py-4 bg-[#EFE6D0] hover:bg-[#D6C8A6]/60 text-[#1E2C1B] font-bold text-base rounded-2xl border-2 border-[#D6C8A6] transition-all duration-200 flex items-center justify-center space-x-2 focus-visible:ring-4 focus-visible:ring-[#3F7D46]"
              >
                <ShieldCheck className="w-5 h-5 text-[#3F7D46]" />
                <span>Verify Lab Report Batch</span>
              </button>
            </div>

            {/* Value Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#EFE6D0]">
              <div className="flex items-center space-x-2 text-sm font-semibold text-[#1E2C1B]">
                <CheckCircle2 className="w-4 h-4 text-[#3F7D46] shrink-0" />
                <span>100% Zero Chemical</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-semibold text-[#1E2C1B]">
                <CheckCircle2 className="w-4 h-4 text-[#3F7D46] shrink-0" />
                <span>Fair Price to Farmers</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-semibold text-[#1E2C1B]">
                <CheckCircle2 className="w-4 h-4 text-[#3F7D46] shrink-0" />
                <span>QR Farm Traceability</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card Column (Desktop: 5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Appetizing Visual Container */}
            <div className="relative rounded-3xl overflow-hidden bg-[#EFE6D0] border-4 border-[#F6F1E4] shadow-2xl group">
              {/* Background Image of Authentic Indian Produce & Spices */}
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80"
                alt="Fresh organic Indian turmeric, spices, and natural grains"
                className="w-full h-[420px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              
              {/* Gentle Contrast Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E2C1B]/85 via-[#1E2C1B]/20 to-transparent" />

              {/* Top Right Signature Trust Badge */}
              <div className="absolute top-4 right-4 z-20">
                <TrustSealBadge size="md" className="shadow-lg animate-trust-pulse" />
              </div>

              {/* Bottom Floating Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-3 z-10">
                <div className="flex items-center space-x-2">
                  <span className="bg-[#E07A2E] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Featured Farm Batch
                  </span>
                  <span className="bg-[#3F7D46] text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Lab Score: 100% Pure</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#F6F1E4]">
                    Lakadong High-Curcumin Turmeric
                  </h3>
                  <p className="text-xs text-[#F6F1E4]/90 font-medium">
                    Sourced from Jaintia Hills Farmers Co-op • Batch #BHAROSA-2026-TURM-88
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/20">
                  <div className="text-xs">
                    <span className="text-[#C79A3E] font-bold">Lab Certificate:</span> NABL-2026-PASS
                  </div>
                  <button
                    onClick={onVerifyClick}
                    className="text-xs font-bold text-white bg-white/20 hover:bg-white/30 backdrop-blur-xs px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <span>Inspect Certificate</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Floating Stat Badge */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center space-x-3 bg-[#F6F1E4] border-2 border-[#EFE6D0] p-4 rounded-2xl shadow-xl z-20">
              <div className="w-12 h-12 rounded-xl bg-[#3F7D46]/15 text-[#3F7D46] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl font-bold text-[#1E2C1B]">500+ Organic</div>
                <div className="text-xs font-medium text-[#3F7D46]">Verified Farmers Partnered</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
