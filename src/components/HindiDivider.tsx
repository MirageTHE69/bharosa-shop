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
    <div className={`w-full py-8 bg-[#EFE6D0]/40 border-y border-[#EFE6D0] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-4 sm:space-x-8">
        
        {/* Left Decorative Line */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C79A3E]/50 to-[#C79A3E]" />

        {/* Center Lotus Flower Icon */}
        <div className="flex items-center space-x-3 text-[#1E2C1B] shrink-0">
          <svg className="w-5 h-5 text-[#E07A2E]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.5 7.5L20 8.5L16 12.5L17 18L12 15L7 18L8 12.5L4 8.5L9.5 7.5L12 2Z" />
          </svg>
          
          <div className="text-center">
            <span className="font-devanagari text-xl sm:text-2xl font-bold text-[#1E2C1B] tracking-wide block">
              {phraseHi}
            </span>
            {translationEn && (
              <span className="text-xs font-semibold text-[#3F7D46] tracking-widest uppercase block mt-0.5">
                {translationEn}
              </span>
            )}
          </div>

          <svg className="w-5 h-5 text-[#E07A2E]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.5 7.5L20 8.5L16 12.5L17 18L12 15L7 18L8 12.5L4 8.5L9.5 7.5L12 2Z" />
          </svg>
        </div>

        {/* Right Decorative Line */}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C79A3E]/50 to-[#C79A3E]" />

      </div>
    </div>
  );
};
