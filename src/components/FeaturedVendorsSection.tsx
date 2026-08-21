'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Award, ArrowRight, Star, X } from 'lucide-react';
import { TrustSealBadge } from './TrustSealBadge';
import { useAppShell } from '@/context/AppShellContext';
import type { Vendor } from '@/types/database';
import { DEFAULT_VENDOR_AVATAR, DEFAULT_FARM_IMAGE } from '@/lib/constants';

interface FeaturedVendorsSectionProps {
  vendors: Vendor[];
}

export const FeaturedVendorsSection: React.FC<FeaturedVendorsSectionProps> = ({ vendors }) => {
  const { openVerifyModal } = useAppShell();
  const [selectedVendorModal, setSelectedVendorModal] = useState<Vendor | null>(null);

  return (
    <section id="vendors" className="py-16 sm:py-24 bg-[#F4EEE1]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3F7D46]">
              Direct Producer Marketplace
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#24291F]">
              Our Verified Farmers & Artisans
            </h2>
          </div>

          <p className="text-sm text-[#6B7263] max-w-md">
            Meet the real families behind your daily food. Every seller passes on-site farm
            inspections and holds verified organic credentials.
          </p>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-2xl border border-[#E7E0CE] hover:border-[#24291F]/30 transition-colors overflow-hidden flex flex-col justify-between group"
            >
              <Link href={`/farmer/${vendor.slug}`} className="relative h-32 overflow-hidden bg-[#F4EEE1] block">
                <img
                  src={vendor.farm_image_url ?? DEFAULT_FARM_IMAGE}
                  alt={`${vendor.name} farm land`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 right-4 w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-[#F4EEE1]">
                  <img
                    src={vendor.avatar_url ?? DEFAULT_VENDOR_AVATAR}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              <div className="p-4 pt-6 space-y-3 flex-1">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs text-[#6B7263]">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{vendor.location}, {vendor.state}</span>
                  </div>

                  <Link href={`/farmer/${vendor.slug}`}>
                    <h3 className="font-serif-display text-base font-bold text-[#24291F] leading-snug hover:text-[#3F7D46] transition-colors">
                      {vendor.name}
                    </h3>
                  </Link>

                  <div className="font-devanagari text-xs text-[#6B7263]">
                    {vendor.hindi_name}
                  </div>
                </div>

                <div className="text-xs space-y-1 text-[#6B7263]">
                  <div className="flex items-center justify-between">
                    <span>Specialty</span>
                    <span className="text-[#24291F] font-medium truncate max-w-[120px]">{vendor.specialty}</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <TrustSealBadge size="sm" showLabel={false} />
                  <div className="flex items-center space-x-1 text-xs font-semibold text-[#24291F]">
                    <Star className="w-3.5 h-3.5 text-[#C4611E] fill-current" />
                    <span>{vendor.rating}</span>
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4 space-y-2">
                <button
                  onClick={() => setSelectedVendorModal(vendor)}
                  className="w-full py-2 bg-[#F4EEE1] hover:bg-[#3F7D46] text-[#24291F] hover:text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Quick View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  href={`/farmer/${vendor.slug}`}
                  className="w-full py-2 border border-[#E7E0CE] hover:border-[#24291F]/40 text-[#24291F] font-medium text-xs rounded-lg transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>View Full Profile</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Vendor Credential Inspection Modal */}
      {selectedVendorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#24291F]/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">

            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedVendorModal.avatar_url ?? DEFAULT_VENDOR_AVATAR}
                  alt={selectedVendorModal.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-[#24291F]">
                    {selectedVendorModal.name}
                  </h3>
                  <div className="font-devanagari text-xs text-[#6B7263]">
                    {selectedVendorModal.hindi_name}
                  </div>
                  <div className="text-xs text-[#6B7263] flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedVendorModal.location}, {selectedVendorModal.state}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedVendorModal(null)}
                className="p-1.5 rounded-full hover:bg-[#F4EEE1] text-[#24291F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#F4EEE1] p-4 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between text-xs text-[#24291F]">
                <span className="text-[#6B7263]">Government Certification ID</span>
                <span className="font-mono font-semibold">{selectedVendorModal.certification_id}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#24291F]">
                <span className="text-[#6B7263]">Bharosa Partner Since</span>
                <span className="font-semibold">
                  {selectedVendorModal.verified_at
                    ? new Date(selectedVendorModal.verified_at).getFullYear()
                    : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#24291F]">
                <span className="text-[#6B7263]">Pesticide Screening</span>
                <span className="font-semibold text-[#3F7D46]">{selectedVendorModal.pesticide_free_score}</span>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7263]">Farmer Story & Land Audit</h4>
              <p className="text-sm text-[#24291F] leading-relaxed">
                {selectedVendorModal.story}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <TrustSealBadge size="md" />

              <button
                onClick={() => {
                  setSelectedVendorModal(null);
                  openVerifyModal();
                }}
                className="px-4 py-2 bg-[#C4611E] hover:bg-[#A84E15] text-white font-semibold text-xs rounded-lg transition-colors flex items-center space-x-1.5"
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
