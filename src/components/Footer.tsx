'use client';

import React from 'react';
import { ArrowUp, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { TrustSealBadge } from './TrustSealBadge';

interface FooterProps {
  onOpenVerifyModal: () => void;
  onOpenSellerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenVerifyModal,
  onOpenSellerModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F4EEE1] text-[#24291F] border-t border-[#E7E0CE] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Top Footer Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-[#E7E0CE] items-center">

          <div className="lg:col-span-6 space-y-2.5">
            <div className="flex items-center">
              {/* === FOOTER LOGO SIZE: change 'h-16 sm:h-20' below (e.g. h-14, h-20, h-24) to adjust size === */}
              <img
                src="/logo.png"
                alt="Bharosa Shop"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </div>

            <p className="text-sm text-[#6B7263] max-w-lg leading-relaxed">
              Every vendor and product listed on Bharosa Shop is thoroughly vetted. Only
              100% lab-certified organic goods earn the signature Bharosa Verified Badge.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-start lg:justify-end gap-3">
            <TrustSealBadge size="md" />

            <button
              onClick={onOpenVerifyModal}
              className="px-4 py-2 bg-[#24291F] hover:bg-[#3F7D46] text-white font-medium text-xs rounded-lg transition-colors flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify Lab Report Batch</span>
            </button>
          </div>

        </div>

        {/* 4 Column Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#24291F]">Organic Categories</h4>
            <ul className="space-y-2 text-[#6B7263]">
              <li><a href="#categories" className="hover:text-[#24291F] transition-colors">A2 Desi Cow Ghee</a></li>
              <li><a href="#categories" className="hover:text-[#24291F] transition-colors">Lakadong Turmeric & Spices</a></li>
              <li><a href="#categories" className="hover:text-[#24291F] transition-colors">Raw Wild Forest Honey</a></li>
              <li><a href="#categories" className="hover:text-[#24291F] transition-colors">Wood-Pressed Kachi Ghani Oils</a></li>
              <li><a href="#categories" className="hover:text-[#24291F] transition-colors">Khapli Wheat & Ancient Grains</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#24291F]">Trust & Quality</h4>
            <ul className="space-y-2 text-[#6B7263]">
              <li><a href="#trust-process" className="hover:text-[#24291F] transition-colors">3-Step Farm Vetting System</a></li>
              <li><button onClick={onOpenVerifyModal} className="hover:text-[#24291F] transition-colors text-left">NABL Lab Testing Standard</button></li>
              <li><a href="#vendors" className="hover:text-[#24291F] transition-colors">Meet Our Organic Farmers</a></li>
              <li><button onClick={onOpenSellerModal} className="hover:text-[#24291F] transition-colors text-left">Apply for Seller Verification</button></li>
              <li><a href="#why-us" className="hover:text-[#24291F] transition-colors">Why Bharosa</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#24291F]">Helpline</h4>
            <ul className="space-y-2 text-xs text-[#6B7263]">
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>+91 1800-BHAROSA (Toll Free)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>trust@bharosashop.in</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>Bharosa Organic Center, MG Road, Pune, Maharashtra 411001</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#24291F]">Stay Connected</h4>
            <p className="text-xs text-[#6B7263] leading-relaxed">
              Receive seasonal harvest alerts and traditional Ayurvedic organic recipes.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Bharosa Harvest Alerts!'); }} className="flex space-x-1.5">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E7E0CE] text-xs focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#C4611E] text-white text-xs font-semibold rounded-lg hover:bg-[#A84E15] transition-colors shrink-0"
              >
                Join
              </button>
            </form>

            <button
              onClick={scrollToTop}
              className="w-full py-2 bg-white hover:bg-[#24291F] hover:text-white border border-[#E7E0CE] text-[#24291F] font-medium text-xs rounded-lg transition-colors flex items-center justify-center space-x-1.5"
              aria-label="Scroll back to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[#E7E0CE] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7263] gap-4">
          <p>© {new Date().getFullYear()} Bharosa Shop Marketplace Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-[#24291F] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#24291F] transition-colors">Lab Vetting Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
