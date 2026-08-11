'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, FileText, MapPin, Calendar, Award, ExternalLink, Search } from 'lucide-react';
import { TrustSealBadge } from './TrustSealBadge';
import { FEATURED_PRODUCTS } from '../data/bharosaData';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedBatchCode, setSelectedBatchCode] = useState(FEATURED_PRODUCTS[0].batchCode);
  const [customInputCode, setCustomInputCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const currentProduct =
    FEATURED_PRODUCTS.find((p) => p.batchCode === selectedBatchCode) || FEATURED_PRODUCTS[0];

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputCode.trim()) return;
    
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      // Fallback to current or first product for demonstration
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#1E2C1B]/70 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Card Box */}
      <div className="relative w-full max-w-3xl bg-[#F6F1E4] border-2 border-[#E07A2E] rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top Banner Header */}
        <div className="bg-[#1E2C1B] text-[#F6F1E4] p-6 flex items-center justify-between border-b border-[#E07A2E]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#E07A2E] flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-display text-xl font-bold text-white">
                Bharosa Batch Verifier Tool
              </h3>
              <div className="font-devanagari text-xs text-[#C79A3E]">
                प्रयोगशाला परीक्षण प्रमाण-पत्र ऑनलाइन जांच
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#F6F1E4]/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close Verification Window"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Quick Select Preset Batch Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1E2C1B]/70">
              Select Sample Verified Batch Code to Test:
            </label>
            <div className="flex flex-wrap gap-2">
              {FEATURED_PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedBatchCode(prod.batchCode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    selectedBatchCode === prod.batchCode
                      ? 'bg-[#E07A2E] text-white border-[#E07A2E] shadow-xs'
                      : 'bg-[#EFE6D0] text-[#1E2C1B] border-[#D6C8A6] hover:border-[#3F7D46]'
                  }`}
                >
                  {prod.title.split(' ')[0]} ({prod.batchCode})
                </button>
              ))}
            </div>
          </div>

          {/* Search Input Bar */}
          <form onSubmit={handleLookup} className="relative">
            <input
              type="text"
              placeholder="Enter batch code e.g. BHAROSA-2026-GHEE-14"
              value={customInputCode}
              onChange={(e) => setCustomInputCode(e.target.value)}
              className="w-full pl-10 pr-28 py-3 rounded-2xl bg-[#EFE6D0] border-2 border-[#D6C8A6] text-sm text-[#1E2C1B] font-medium focus:ring-2 focus:ring-[#3F7D46] focus:bg-[#F6F1E4] focus:outline-none"
            />
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#1E2C1B]/60" />
            <button
              type="submit"
              disabled={isVerifying}
              className="absolute right-1.5 top-1.5 px-4 py-1.5 bg-[#3F7D46] hover:bg-[#2A5C31] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1"
            >
              {isVerifying ? 'Scanning...' : 'Verify Code'}
            </button>
          </form>

          {/* Verified Certificate Card Result */}
          <div className="bg-[#EFE6D0]/80 rounded-2xl p-6 border-2 border-[#3F7D46] relative overflow-hidden shadow-md">
            
            {/* Stamp Overlay */}
            <div className="absolute top-4 right-4 z-10">
              <TrustSealBadge size="lg" showLabel={true} />
            </div>

            <div className="space-y-4 max-w-xl">
              
              <div className="flex items-center space-x-2">
                <span className="bg-[#3F7D46] text-white text-[11px] font-bold uppercase px-2.5 py-0.5 rounded">
                  Official NABL Lab Certificate Verified
                </span>
                <span className="text-xs font-mono font-bold text-[#1E2C1B]">
                  ID: {currentProduct.batchCode}
                </span>
              </div>

              <div>
                <h4 className="font-serif-display text-2xl font-bold text-[#1E2C1B]">
                  {currentProduct.title}
                </h4>
                <p className="text-sm font-devanagari text-[#2A5C31] font-semibold">
                  {currentProduct.hindiTitle}
                </p>
              </div>

              {/* Lab Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-[#F6F1E4] p-3 rounded-xl border border-[#D6C8A6]">
                  <div className="text-xs font-bold text-[#1E2C1B]/60 uppercase tracking-wider">
                    Chemical Residue Test (230 Pesticides)
                  </div>
                  <div className="text-sm font-bold text-[#3F7D46] flex items-center space-x-1 mt-1">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{currentProduct.labPesticidePpm}</span>
                  </div>
                </div>

                <div className="bg-[#F6F1E4] p-3 rounded-xl border border-[#D6C8A6]">
                  <div className="text-xs font-bold text-[#1E2C1B]/60 uppercase tracking-wider">
                    Purity & Active Potency
                  </div>
                  <div className="text-sm font-bold text-[#E07A2E] flex items-center space-x-1 mt-1">
                    <Award className="w-4 h-4 shrink-0" />
                    <span>{currentProduct.labPurityScore}</span>
                  </div>
                </div>
              </div>

              {/* Vendor & Harvest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-2 border-t border-[#D6C8A6]/60">
                <div className="flex items-center space-x-1.5 text-[#1E2C1B]">
                  <MapPin className="w-3.5 h-3.5 text-[#E07A2E]" />
                  <span><strong>Farm Origin:</strong> {currentProduct.farmOrigin}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[#1E2C1B]">
                  <Calendar className="w-3.5 h-3.5 text-[#3F7D46]" />
                  <span><strong>Harvest Date:</strong> {currentProduct.harvestDate}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[#1E2C1B]">
                  <FileText className="w-3.5 h-3.5 text-[#C79A3E]" />
                  <span><strong>Seller:</strong> {currentProduct.vendorName}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-[#1E2C1B]/70 font-sans-body">
              🔒 All Bharosa lab reports are cryptographically signed by accredited third-party NABL testing centers.
            </p>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#1E2C1B] hover:bg-[#3F7D46] text-white font-bold text-sm rounded-xl transition-colors w-full sm:w-auto"
            >
              Done / Close Window
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
