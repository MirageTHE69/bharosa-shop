'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

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
    sm: 'h-6 text-[11px] px-2 space-x-1',
    md: 'h-7 text-xs px-2.5 space-x-1.5',
    lg: 'h-9 text-sm px-3.5 space-x-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <div
      className={`inline-flex items-center rounded-full bg-white text-[#2A5C31] border border-[#3F7D46]/30 font-semibold select-none ${sizeClasses[size]} ${className}`}
      title="Verified Best Organic Product & Lab Vetted by Bharosa Standards"
      role="img"
      aria-label="Bharosa Verified Organic Seal"
    >
      <ShieldCheck className={`${iconSizes[size]} shrink-0`} strokeWidth={2.5} />
      {showLabel && <span className="tracking-tight whitespace-nowrap">{label}</span>}
    </div>
  );
};
