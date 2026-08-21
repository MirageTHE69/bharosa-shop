'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, FileText, MapPin, Calendar, Award, Search } from 'lucide-react';
import { TrustSealBadge } from './TrustSealBadge';
import type { ProductWithVendor } from '@/types/database';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  products?: ProductWithVendor[];
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  products = [],
}) => {
  const [selectedBatchCode, setSelectedBatchCode] = useState(products[0]?.batch_code ?? '');
  const [customInputCode, setCustomInputCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const currentProduct = products.find((p) => p.batch_code === selectedBatchCode) ?? products[0];

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputCode.trim()) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const match = products.find(
        (p) => p.batch_code?.toLowerCase() === customInputCode.trim().toLowerCase()
      );
      if (match?.batch_code) setSelectedBatchCode(match.batch_code);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#24291F]/60 backdrop-blur-sm">

      {/* Modal Card Box */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden my-8">

        {/* Modal Top Banner Header */}
        <div className="bg-[#24291F] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display text-lg font-bold">
                Bharosa Batch Verifier
              </h3>
              <div className="font-devanagari text-xs text-white/60">
                प्रयोगशाला परीक्षण प्रमाण-पत्र ऑनलाइन जांच
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close Verification Window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {products.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#6B7263]">
                Select a sample verified batch code to test:
              </label>
              <div className="flex flex-wrap gap-2">
                {products.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedBatchCode(prod.batch_code ?? '')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      selectedBatchCode === prod.batch_code
                        ? 'bg-[#24291F] text-white border-[#24291F]'
                        : 'bg-[#F4EEE1] text-[#24291F] border-transparent hover:border-[#3F7D46]/40'
                    }`}
                  >
                    {prod.title.split(' ')[0]} ({prod.batch_code})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Input Bar */}
          <form onSubmit={handleLookup} className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7263]" />
            <input
              type="text"
              placeholder="Enter batch code e.g. BHAROSA-2026-GHEE-14"
              value={customInputCode}
              onChange={(e) => setCustomInputCode(e.target.value)}
              className="w-full pl-10 pr-28 py-3 rounded-xl bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] font-medium focus:ring-2 focus:ring-[#3F7D46] focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              disabled={isVerifying}
              className="absolute right-1.5 top-1.5 px-4 py-1.5 bg-[#3F7D46] hover:bg-[#2A5C31] text-white font-semibold text-xs rounded-lg transition-colors"
            >
              {isVerifying ? 'Scanning...' : 'Verify Code'}
            </button>
          </form>

          {/* Verified Certificate Card Result */}
          {currentProduct ? (
            <div className="bg-[#F4EEE1] rounded-2xl p-6 relative overflow-hidden">

              <div className="absolute top-4 right-4 z-10">
                <TrustSealBadge size="md" showLabel={true} />
              </div>

              <div className="space-y-4 max-w-xl">

                <div className="flex items-center flex-wrap gap-2">
                  <span className="bg-[#3F7D46] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                    NABL Lab Certificate Verified
                  </span>
                  <span className="text-xs font-mono text-[#6B7263]">
                    ID: {currentProduct.batch_code}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif-display text-xl font-bold text-[#24291F]">
                    {currentProduct.title}
                  </h4>
                  <p className="text-sm font-devanagari text-[#6B7263]">
                    {currentProduct.hindi_title}
                  </p>
                </div>

                {/* Lab Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-3 rounded-xl">
                    <div className="text-xs font-semibold text-[#6B7263]">
                      Chemical Residue (230 Pesticides)
                    </div>
                    <div className="text-sm font-semibold text-[#3F7D46] flex items-center space-x-1 mt-1">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{currentProduct.lab_pesticide_ppm}</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl">
                    <div className="text-xs font-semibold text-[#6B7263]">
                      Purity & Active Potency
                    </div>
                    <div className="text-sm font-semibold text-[#24291F] flex items-center space-x-1 mt-1">
                      <Award className="w-4 h-4 shrink-0 text-[#3F7D46]" />
                      <span>{currentProduct.lab_purity_score}</span>
                    </div>
                  </div>
                </div>

                {/* Vendor & Harvest Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-2 border-t border-[#E7E0CE]">
                  <div className="flex items-center space-x-1.5 text-[#24291F]">
                    <MapPin className="w-3.5 h-3.5 text-[#6B7263]" />
                    <span><strong>Farm Origin:</strong> {currentProduct.farm_origin}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[#24291F]">
                    <Calendar className="w-3.5 h-3.5 text-[#6B7263]" />
                    <span><strong>Harvest Date:</strong> {currentProduct.harvest_date}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[#24291F]">
                    <FileText className="w-3.5 h-3.5 text-[#6B7263]" />
                    <span><strong>Seller:</strong> {currentProduct.vendor.name}</span>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="bg-[#F4EEE1] rounded-2xl p-8 text-center text-sm text-[#6B7263]">
              No batch code matched. Try one of the sample codes above.
            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-[#6B7263]">
              All Bharosa lab reports are cryptographically signed by accredited third-party NABL testing centers.
            </p>

            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#24291F] hover:bg-[#3F7D46] text-white font-semibold text-sm rounded-lg transition-colors w-full sm:w-auto shrink-0"
            >
              Done
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
