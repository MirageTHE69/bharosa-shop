'use client';

import React, { useState } from 'react';
import { Store, CheckCircle2, ShieldCheck, ArrowRight, X, Sparkles, Send } from 'lucide-react';
import { TrustSealBadge } from './TrustSealBadge';

interface VendorCalloutSectionProps {
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export const VendorCalloutSection: React.FC<VendorCalloutSectionProps> = ({
  isModalOpen,
  onOpenModal,
  onCloseModal,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    farmerName: '',
    farmLocation: '',
    phone: '',
    cropTypes: '',
    certificationType: 'NPOP Organic',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // Auto close after 3 seconds or user can close manually
    }, 3000);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#1E2C1B] text-[#F6F1E4] relative overflow-hidden">
      
      {/* Background Organic Leaf Pattern */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#3F7D46]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#2A5C31]/40 border-2 border-[#3F7D46] rounded-3xl p-8 sm:p-12 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Callout Text */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-[#E07A2E] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Store className="w-3.5 h-3.5" />
                <span>Producer Partnership Network</span>
              </div>

              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Grow with Bharosa Shop
              </h2>

              <div className="font-devanagari text-xl font-medium text-[#C79A3E]">
                “अपनी फसल, सही दाम • जुड़ें हमारे जैविक किसान परिवार से”
              </div>

              <p className="text-base sm:text-lg text-[#F6F1E4]/90 font-sans-body max-w-2xl leading-relaxed">
                Join India&apos;s most trusted organic seller marketplace. We handle verification, lab testing logistics, and marketing while you get direct access to 45,000+ conscious households.
              </p>

              {/* Benefits Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center space-x-2 text-sm font-medium text-[#F6F1E4]">
                  <CheckCircle2 className="w-4 h-4 text-[#E07A2E] shrink-0" />
                  <span>0% Listing Commission (First 90 Days)</span>
                </div>
                <div className="flex items-center space-x-2 text-sm font-medium text-[#F6F1E4]">
                  <CheckCircle2 className="w-4 h-4 text-[#E07A2E] shrink-0" />
                  <span>Free NABL Lab Testing Assistance</span>
                </div>
                <div className="flex items-center space-x-2 text-sm font-medium text-[#F6F1E4]">
                  <CheckCircle2 className="w-4 h-4 text-[#E07A2E] shrink-0" />
                  <span>Direct Bi-weekly Bank Payouts</span>
                </div>
                <div className="flex items-center space-x-2 text-sm font-medium text-[#F6F1E4]">
                  <CheckCircle2 className="w-4 h-4 text-[#E07A2E] shrink-0" />
                  <span>Bharosa Organic Verified Stamp</span>
                </div>
              </div>
            </div>

            {/* Callout Action Button Column */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <button
                onClick={onOpenModal}
                className="w-full sm:w-auto px-8 py-4 bg-[#3F7D46] hover:bg-[#E07A2E] text-white font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3 border-2 border-white/20 focus-visible:ring-4 focus-visible:ring-white"
              >
                <span>Become a Verified Seller</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-[#F6F1E4]/70 mt-3 text-center lg:text-right">
                Over 500+ organic farmers onboarded across 12 states.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Seller Registration Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E2C1B]/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#F6F1E4] text-[#1E2C1B] rounded-3xl border-2 border-[#E07A2E] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#EFE6D0] pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#3F7D46] text-white flex items-center justify-center">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-display text-xl font-bold text-[#1E2C1B]">
                    Farmer / Seller Registration
                  </h3>
                  <div className="font-devanagari text-xs text-[#2A5C31] font-semibold">
                    किसान पंजीकरण फॉर्म
                  </div>
                </div>
              </div>

              <button
                onClick={onCloseModal}
                className="p-2 text-[#1E2C1B]/60 hover:text-[#1E2C1B] rounded-full hover:bg-[#EFE6D0]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {formSubmitted ? (
              <div className="bg-[#EFE6D0] p-6 rounded-2xl text-center space-y-4 border border-[#3F7D46]">
                <div className="w-16 h-16 rounded-full bg-[#3F7D46] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-serif-display text-2xl font-bold text-[#1E2C1B]">
                  Application Received!
                </h4>
                <p className="text-sm text-[#1E2C1B]/80 font-sans-body">
                  Thank you, <span className="font-bold text-[#3F7D46]">{formData.farmerName}</span>. Our agricultural onboarding team will contact you at <span className="font-bold">{formData.phone}</span> within 24 hours to schedule your farm audit.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    onCloseModal();
                  }}
                  className="px-6 py-2.5 bg-[#1E2C1B] text-white font-bold text-sm rounded-xl"
                >
                  Close Confirmation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E2C1B] mb-1">
                    Farmer / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar / Organic Farms Co-op"
                    value={formData.farmerName}
                    onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EFE6D0] border border-[#D6C8A6] text-sm text-[#1E2C1B] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1E2C1B] mb-1">
                      District & State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Wayanad, Kerala"
                      value={formData.farmLocation}
                      onChange={(e) => setFormData({ ...formData, farmLocation: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#EFE6D0] border border-[#D6C8A6] text-sm text-[#1E2C1B] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1E2C1B] mb-1">
                      Mobile Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#EFE6D0] border border-[#D6C8A6] text-sm text-[#1E2C1B] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E2C1B] mb-1">
                    Crops / Produce Offered *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. A2 Desi Ghee, Lakadong Turmeric, Wild Honey"
                    value={formData.cropTypes}
                    onChange={(e) => setFormData({ ...formData, cropTypes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EFE6D0] border border-[#D6C8A6] text-sm text-[#1E2C1B] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E2C1B] mb-1">
                    Existing Organic Certification Status
                  </label>
                  <select
                    value={formData.certificationType}
                    onChange={(e) => setFormData({ ...formData, certificationType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EFE6D0] border border-[#D6C8A6] text-sm text-[#1E2C1B] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
                  >
                    <option value="NPOP Organic">NPOP National Organic Certification</option>
                    <option value="PGS-India">PGS-India Participatory Organic System</option>
                    <option value="FSSAI Organic">FSSAI Jaivik Bharat License</option>
                    <option value="In Transition">Natural Farming (In Organic Conversion)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#3F7D46] hover:bg-[#2A5C31] text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Seller Application</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
