'use client';

import React, { useActionState } from 'react';
import { Store, CheckCircle2, X, Send } from 'lucide-react';
import { registerVendor, type RegisterVendorResult } from '@/lib/actions/vendor-registration';

interface SellerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSignedIn: boolean;
}

const initialState: RegisterVendorResult = {};

export const SellerRegistrationModal: React.FC<SellerRegistrationModalProps> = ({
  isOpen,
  onClose,
  isSignedIn,
}) => {
  const [state, formAction, isPending] = useActionState(registerVendor, initialState);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#24291F]/70 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-white text-[#24291F] rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between border-b border-[#E7E0CE] pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#3F7D46] text-white flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display text-lg font-bold text-[#24291F]">
                Farmer / Seller Registration
              </h3>
              <div className="font-devanagari text-xs text-[#6B7263]">
                किसान पंजीकरण फॉर्म
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#6B7263] hover:text-[#24291F] rounded-full hover:bg-[#F4EEE1]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {state.success ? (
          <div className="p-6 rounded-xl text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#3F7D46] text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif-display text-xl font-bold text-[#24291F]">
              Application Received!
            </h4>
            <p className="text-sm text-[#6B7263]">
              Thank you, <span className="font-semibold text-[#24291F]">{state.farmerName}</span>. Our
              agricultural onboarding team will contact you at{' '}
              <span className="font-semibold text-[#24291F]">{state.phone}</span> within 24 hours to
              schedule your farm audit. You can track your verification status from your{' '}
              <span className="font-semibold text-[#24291F]">Vendor Dashboard</span> anytime.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#24291F] text-white font-semibold text-sm rounded-lg"
            >
              Close
            </button>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#6B7263] mb-1">
                Farmer / Business Name *
              </label>
              <input
                type="text"
                name="farmerName"
                required
                placeholder="e.g. Ramesh Kumar / Organic Farms Co-op"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#6B7263] mb-1">
                  District & State *
                </label>
                <input
                  type="text"
                  name="farmLocation"
                  required
                  placeholder="e.g. Wayanad, Kerala"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B7263] mb-1">
                  Mobile Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7263] mb-1">
                Crops / Produce Offered *
              </label>
              <input
                type="text"
                name="cropTypes"
                required
                placeholder="e.g. A2 Desi Ghee, Lakadong Turmeric, Wild Honey"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7263] mb-1">
                Existing Organic Certification Status
              </label>
              <select
                name="certificationType"
                defaultValue="NPOP Organic"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
              >
                <option value="NPOP Organic">NPOP National Organic Certification</option>
                <option value="PGS-India">PGS-India Participatory Organic System</option>
                <option value="FSSAI Organic">FSSAI Jaivik Bharat License</option>
                <option value="In Transition">Natural Farming (In Organic Conversion)</option>
              </select>
            </div>

            {!isSignedIn && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E7E0CE]">
                <div>
                  <label className="block text-xs font-semibold text-[#6B7263] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6B7263] mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    placeholder="At least 6 characters"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {state.error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {state.error}
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 bg-[#3F7D46] hover:bg-[#2A5C31] disabled:opacity-60 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>{isPending ? 'Submitting…' : 'Submit Seller Application'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
