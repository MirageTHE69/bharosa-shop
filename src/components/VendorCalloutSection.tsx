'use client';

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAppShell } from '@/context/AppShellContext';

export const VendorCalloutSection: React.FC = () => {
  const { openSellerModal } = useAppShell();

  return (
    <section className="py-16 sm:py-24 bg-[#24291F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Callout Text */}
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C79A3E]">
              Producer Partnership Network
            </span>

            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold">
              Sell Your Organic Products on Bharosa Shop
            </h2>

            <p className="text-base text-white/70 max-w-2xl leading-relaxed">
              Join 500+ verified organic farmers already selling on India&apos;s most
              trusted lab-verified marketplace. We handle lab testing logistics and
              marketing while you get direct access to 45,000+ conscious households.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {[
                '0% Listing Commission (First 90 Days)',
                'Free NABL Lab Testing Assistance',
                'Direct Bi-weekly Bank Payouts',
                'Bharosa Organic Verified Stamp',
              ].map((benefit) => (
                <div key={benefit} className="flex items-center space-x-2 text-sm text-white/85">
                  <CheckCircle2 className="w-4 h-4 text-[#3F7D46] shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Callout Action */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
            <button
              onClick={openSellerModal}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#C4611E] hover:bg-[#A84E15] text-white font-semibold text-base rounded-xl transition-colors flex items-center justify-center space-x-2 focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Become a Verified Seller</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-xs text-white/50 mt-3 text-center lg:text-right">
              Over 500+ organic farmers onboarded across 12 states.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
