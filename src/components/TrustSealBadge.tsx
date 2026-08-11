'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface TrustSealBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  label?: string;
}

export const TrustSealBadge: React.FC<TrustSealBadgeProps> = ({
  size = 'md',
  showLabel = true,
  className = '',
  label = 'Bharosa Verified',
}) => {
  const sizeClasses = {
    sm: 'h-6 text-xs px-2 py-0.5 space-x-1',
    md: 'h-8 text-sm px-3 py-1 space-x-1.5',
    lg: 'h-10 text-base px-4 py-1.5 space-x-2',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div
      className={`inline-flex items-center rounded-full bg-[#EFE6D0] border-2 border-[#E07A2E] text-[#1E2C1B] font-medium shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#3F7D46] group cursor-default select-none ${sizeClasses[size]} ${className}`}
      title="Verified 100% Organic & Lab Vetted by Bharosa Standards"
      role="img"
      aria-label="Bharosa Verified Organic Seal"
    >
      {/* Signature Icon: Saffron + Green Hands with Checkmark */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-110`}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Saffron Sunburst Circle */}
          <circle cx="16" cy="16" r="14" fill="#E07A2E" fillOpacity="0.15" stroke="#E07A2E" strokeWidth="1.5" />
          
          {/* Supportive Leaf Green Hands Motif framing center */}
          <path
            d="M8 20C8 16 11 12 16 12C21 12 24 16 24 20C21 22 18 23.5 16 23.5C14 23.5 11 22 8 20Z"
            fill="#3F7D46"
            fillOpacity="0.85"
          />
          <path
            d="M6 17C8 14 12 11 16 11C20 11 24 14 26 17C23 18.5 19 19.5 16 19.5C13 19.5 9 18.5 6 17Z"
            fill="#2A5C31"
          />
          {/* Golden Lotus Center */}
          <circle cx="16" cy="16" r="7" fill="#F6F1E4" stroke="#C79A3E" strokeWidth="1" />
        </svg>

        {/* Animated Checkmark Pop Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-[#2A5C31] group-hover:scale-125 transition-transform duration-300">
          <Check className={`${iconSizes[size]} stroke-[3.5] text-[#2A5C31]`} />
        </div>
      </div>

      {showLabel && (
        <span className="font-semibold tracking-tight text-[#1E2C1B] whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
};
