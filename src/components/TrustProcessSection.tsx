'use client';

import React, { useState } from 'react';
import { ShieldCheck, Microscope, Award, FileCheck2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TrustSealBadge } from './TrustSealBadge';
import { TRUST_STEPS } from '../data/bharosaData';

interface TrustProcessSectionProps {
  onOpenVerifyModal: () => void;
}

export const TrustProcessSection: React.FC<TrustProcessSectionProps> = ({
  onOpenVerifyModal,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#3F7D46]" />;
      case 'Microscope':
        return <Microscope className="w-5 h-5 text-[#3F7D46]" />;
      case 'Award':
        return <Award className="w-5 h-5 text-[#3F7D46]" />;
      default:
        return <FileCheck2 className="w-5 h-5 text-[#3F7D46]" />;
    }
  };

  return (
    <section id="trust-process" className="py-16 sm:py-24 bg-[#F4EEE1]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3F7D46]">
            Our Standard
          </span>

          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#24291F]">
            How Bharosa Works
          </h2>

          <p className="text-base text-[#6B7263]">
            We check every farmer, test every batch in accredited labs, and seal approved
            products with QR-traceable purity guarantees.
          </p>
        </div>

        {/* 3 Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {TRUST_STEPS.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`text-left rounded-2xl p-6 transition-colors border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#3F7D46]'
                    : 'bg-white/60 border-[#E7E0CE] hover:border-[#3F7D46]/50'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#F4EEE1] flex items-center justify-center font-serif-display font-bold text-sm text-[#24291F]">
                      {step.stepNumber}
                    </span>
                    {getStepIcon(step.iconName)}
                  </div>

                  <h3 className="font-serif-display text-lg font-bold text-[#24291F] mb-1">
                    {step.titleEn}
                  </h3>
                  <div className="font-devanagari text-sm text-[#6B7263] mb-3">
                    {step.titleHi}
                  </div>

                  <p className="text-sm text-[#6B7263] leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7E0CE]">
                  {idx === 2 ? (
                    <TrustSealBadge size="sm" showLabel={true} />
                  ) : (
                    <div className="flex items-center space-x-1.5 text-xs font-medium text-[#3F7D46]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Rigorous protocol</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Lab Verification Callout Banner */}
        <div className="bg-[#24291F] text-white rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="font-serif-display text-2xl font-bold">
              Want to see real batch lab results?
            </h3>
            <p className="text-sm text-white/70 max-w-2xl">
              Enter any product batch code (e.g. <code className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-xs">BHAROSA-2026-GHEE-14</code>) to inspect pesticide, heavy metal, and purity scores in real time.
            </p>
          </div>

          <button
            onClick={onOpenVerifyModal}
            className="px-5 py-3 bg-[#C4611E] hover:bg-[#A84E15] text-white font-semibold rounded-xl transition-colors shrink-0 flex items-center space-x-2 focus-visible:ring-2 focus-visible:ring-white"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Launch Batch Verifier</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
