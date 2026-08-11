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
        return <ShieldCheck className="w-8 h-8 text-[#3F7D46]" />;
      case 'Microscope':
        return <Microscope className="w-8 h-8 text-[#E07A2E]" />;
      case 'Award':
        return <Award className="w-8 h-8 text-[#C79A3E]" />;
      default:
        return <FileCheck2 className="w-8 h-8 text-[#3F7D46]" />;
    }
  };

  return (
    <section id="trust-process" className="py-16 sm:py-24 bg-[#EFE6D0]/60 relative border-b border-[#D6C8A6]/60">
      
      {/* Background Watermark Seal */}
      <div className="absolute right-12 bottom-6 opacity-5 pointer-events-none">
        <svg className="w-96 h-96 text-[#1E2C1B]" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M50 15 L60 35 L82 38 L66 54 L70 76 L50 65 L30 76 L34 54 L18 38 L40 35 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 bg-[#F6F1E4] border border-[#D6C8A6] rounded-full px-4 py-1">
            <ShieldCheck className="w-4 h-4 text-[#3F7D46]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#3F7D46]">
              100% Vetting Standard
            </span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2C1B]">
            How Bharosa Works
          </h2>

          <div className="font-devanagari text-xl font-medium text-[#C4611E]">
            “हर एक चीज़ की जांच, आपके परिवार के भरोसे के लिए”
          </div>

          <p className="text-base sm:text-lg text-[#1E2C1B]/80 font-sans-body">
            We check every farmer, test every batch in accredited labs, and seal approved products with QR-traceable purity guarantees. Plain and simple.
          </p>
        </div>

        {/* 3 Step Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {TRUST_STEPS.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <div
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative border-2 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#F6F1E4] border-[#E07A2E] shadow-xl scale-[1.02]'
                    : 'bg-[#F6F1E4]/70 border-[#D6C8A6] hover:bg-[#F6F1E4] hover:border-[#3F7D46] shadow-sm'
                }`}
              >
                {/* Step Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-full bg-[#EFE6D0] border border-[#D6C8A6] flex items-center justify-center font-serif-display font-bold text-xl text-[#E07A2E]">
                      {step.stepNumber}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#EFE6D0]/60">
                      {getStepIcon(step.iconName)}
                    </div>
                  </div>

                  <h3 className="font-serif-display text-xl font-bold text-[#1E2C1B] mb-1">
                    {step.titleEn}
                  </h3>
                  <div className="font-devanagari text-sm font-semibold text-[#2A5C31] mb-3">
                    {step.titleHi}
                  </div>

                  <p className="text-sm text-[#1E2C1B]/85 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Step Footer Badge */}
                <div className="pt-4 border-t border-[#EFE6D0] flex items-center justify-between">
                  {idx === 2 ? (
                    <div className="flex items-center space-x-2">
                      <TrustSealBadge size="sm" showLabel={true} />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-xs font-semibold text-[#3F7D46]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Rigorous Protocol</span>
                    </div>
                  )}

                  <span className="text-xs font-bold text-[#E07A2E]">
                    Step {idx + 1} of 3
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Lab Verification Callout Banner */}
        <div className="bg-[#1E2C1B] text-[#F6F1E4] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-[#E07A2E] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Transparent Lab Metrics</span>
            </div>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F6F1E4]">
              Want to see real batch chemical test results?
            </h3>
            <p className="text-sm sm:text-base text-[#F6F1E4]/80 max-w-2xl font-sans-body">
              Enter any product batch code (e.g. <code className="bg-[#2A5C31] text-[#F6F1E4] px-2 py-0.5 rounded font-mono text-xs">BHAROSA-2026-GHEE-14</code>) to inspect pesticide, heavy metal, and purity scores in real time.
            </p>
          </div>

          <button
            onClick={onOpenVerifyModal}
            className="px-6 py-3.5 bg-[#E07A2E] hover:bg-[#C4611E] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 shrink-0 flex items-center space-x-2 focus-visible:ring-4 focus-visible:ring-white"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Launch Batch Verifier Tool</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
