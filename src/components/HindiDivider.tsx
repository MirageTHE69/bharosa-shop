'use client';

import React from 'react';

interface HindiDividerProps {
  phraseHi: string;
  translationEn?: string;
  className?: string;
}

export const HindiDivider: React.FC<HindiDividerProps> = ({
  phraseHi,
  translationEn,
  className = '',
}) => {
  return (
    <div className={`w-full py-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-6">
        <div className="flex-1 h-px bg-[#E7E0CE] hidden sm:block" />

        <div className="text-center shrink-0">
          <span className="font-devanagari text-lg sm:text-xl font-semibold text-[#24291F] block">
            {phraseHi}
          </span>
          {translationEn && (
            <span className="text-xs font-medium text-[#6B7263] tracking-wide block mt-0.5">
              {translationEn}
            </span>
          )}
        </div>

        <div className="flex-1 h-px bg-[#E7E0CE] hidden sm:block" />
      </div>
    </div>
  );
};
