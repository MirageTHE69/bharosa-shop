'use client';

import React, { useState } from 'react';
import { MapPin, Award, CheckCircle2, ArrowRight, Store, Star, ExternalLink, X } from 'lucide-react';
import { TrustSealBadge } from './TrustSealBadge';
import { VENDORS, Vendor } from '../data/bharosaData';

interface FeaturedVendorsSectionProps {
  onOpenVerifyModal: () => void;
}

export const FeaturedVendorsSection: React.FC<FeaturedVendorsSectionProps> = ({
  onOpenVerifyModal,
}) => {
  const [selectedVendorModal, setSelectedVendorModal] = useState<Vendor | null>(null);

  return (
    <section id="vendors" className="py-16 sm:py-24 bg-[#EFE6D0]/40 border-b border-[#EFE6D0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-[#F6F1E4] border border-[#D6C8A6] rounded-full px-3.5 py-1">
              <Store className="w-3.5 h-3.5 text-[#3F7D46]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#3F7D46]">
                Direct Producer Marketplace
              </span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2C1B]">
              Our Verified Farmers & Artisans
            </h2>

            <div className="font-devanagari text-lg sm:text-xl font-semibold text-[#C4611E]">
              “सच्चे किसान, शुद्ध उपज और आपका विश्वास”
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#1E2C1B]/80 max-w-md font-sans-body">
            Meet the real families behind your daily food. Every seller passes on-site farm inspections and holds verified organic credentials.
          </p>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VENDORS.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-[#F6F1E4] rounded-2xl border-2 border-[#D6C8A6] hover:border-[#3F7D46] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col justify-between group"
            >
              
              {/* Card Header Farm Image */}
              <div className="relative h-40 overflow-hidden bg-[#1E2C1B]">
                <img
                  src={vendor.farmImage}
                  alt={`${vendor.name} farm land`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E2C1B]/80 via-transparent to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-[#3F7D46] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-2xs">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{vendor.certification.split(' ')[0]}</span>
                  </span>
                </div>

                {/* Avatar Overlay */}
                <div className="absolute -bottom-4 right-4 w-14 h-14 rounded-full border-4 border-[#F6F1E4] overflow-hidden bg-[#EFE6D0] shadow-md z-10">
                  <img
                    src={vendor.avatar}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Vendor Information */}
              <div className="p-5 pt-6 space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs text-[#E07A2E] font-bold">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{vendor.location}, {vendor.state}</span>
                  </div>

                  <h3 className="font-serif-display text-lg font-bold text-[#1E2C1B] leading-snug group-hover:text-[#3F7D46] transition-colors">
                    {vendor.name}
                  </h3>

                  <div className="font-devanagari text-xs font-semibold text-[#2A5C31]">
                    {vendor.hindiName}
                  </div>
                </div>

                <div className="bg-[#EFE6D0]/60 p-2.5 rounded-xl border border-[#D6C8A6]/60 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[#1E2C1B]">
                    <span className="font-bold">Specialty:</span>
                    <span className="text-[#3F7D46] font-medium truncate max-w-[120px]">
                      {vendor.specialty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#1E2C1B]">
                    <span className="font-bold">Products:</span>
                    <span className="bg-[#E07A2E]/20 text-[#C4611E] font-bold px-1.5 py-0.5 rounded">
                      {vendor.productCount} Verified Items
                    </span>
                  </div>
                </div>

                {/* Bharosa Trust Seal Line */}
                <div className="pt-2 flex items-center justify-between">
                  <TrustSealBadge size="sm" showLabel={true} label="Verified Farmer" />

                  <div className="flex items-center space-x-1 text-xs font-bold text-[#1E2C1B]">
                    <Star className="w-3.5 h-3.5 text-[#C79A3E] fill-current" />
                    <span>{vendor.rating}</span>
                  </div>
                </div>
              </div>

              {/* Action Button Footer */}
              <div className="px-5 pb-5 pt-1">
                <button
                  onClick={() => setSelectedVendorModal(vendor)}
                  className="w-full py-2.5 bg-[#EFE6D0] hover:bg-[#3F7D46] text-[#1E2C1B] hover:text-white font-bold text-xs rounded-xl border border-[#D6C8A6] transition-all flex items-center justify-center space-x-1.5 shadow-2xs group/btn"
                >
                  <span>Inspect Farm Credentials</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Vendor Credential Inspection Modal */}
      {selectedVendorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E2C1B]/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#F6F1E4] rounded-3xl border-2 border-[#3F7D46] shadow-2xl p-6 space-y-5 overflow-hidden">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedVendorModal.avatar}
                  alt={selectedVendorModal.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#E07A2E]"
                />
                <div>
                  <h3 className="font-serif-display text-xl font-bold text-[#1E2C1B]">
                    {selectedVendorModal.name}
                  </h3>
                  <div className="font-devanagari text-xs text-[#2A5C31] font-semibold">
                    {selectedVendorModal.hindiName}
                  </div>
                  <div className="text-xs text-[#E07A2E] font-medium flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedVendorModal.location}, {selectedVendorModal.state}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedVendorModal(null)}
                className="p-1.5 rounded-full hover:bg-[#EFE6D0] text-[#1E2C1B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#EFE6D0] p-4 rounded-2xl border border-[#D6C8A6] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#1E2C1B]">
                <span>Government Certification ID:</span>
                <span className="font-mono bg-[#3F7D46] text-white px-2 py-0.5 rounded">
                  {selectedVendorModal.certificationId}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#1E2C1B]">
                <span>Bharosa Partner Since:</span>
                <span className="font-bold">{selectedVendorModal.verifiedYear}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#1E2C1B]">
                <span>Pesticide Screening:</span>
                <span className="font-bold text-[#3F7D46]">{selectedVendorModal.pesticideFreeScore}</span>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E2C1B]">Farmer Story & Land Audit:</h4>
              <p className="text-sm text-[#1E2C1B]/85 leading-relaxed font-sans-body">
                {selectedVendorModal.story}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <TrustSealBadge size="md" />

              <button
                onClick={() => {
                  setSelectedVendorModal(null);
                  onOpenVerifyModal();
                }}
                className="px-4 py-2 bg-[#E07A2E] hover:bg-[#C4611E] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1"
              >
                <Award className="w-4 h-4" />
                <span>Verify NABL Lab Test</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
