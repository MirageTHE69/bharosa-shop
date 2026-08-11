'use client';

import React from 'react';
import { ArrowUp, ShieldCheck, Mail, Phone, MapPin, Heart } from 'lucide-react';
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
    <footer className="bg-[#EFE6D0] text-[#1E2C1B] border-t-2 border-[#D6C8A6] pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Banner & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#D6C8A6]/80 items-center">
          
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6F1E4] border-2 border-[#E07A2E] flex items-center justify-center font-bold text-lg text-[#E07A2E]">
                🛡️
              </div>
              <span className="font-serif-display text-2xl font-bold text-[#1E2C1B]">
                Bharosa Shop
              </span>
            </div>

            <div className="font-devanagari text-base font-semibold text-[#3F7D46]">
              “भरोसा ही हमारी पहचान • प्रकृति से सीधे आपके घर तक”
            </div>

            <p className="text-sm text-[#1E2C1B]/85 font-sans-body max-w-lg leading-relaxed">
              Every vendor and product listed on Bharosa Shop is thoroughly vetted. Only 100% lab-certified organic goods earn the signature <strong>Bharosa Verified Badge</strong>.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-start lg:justify-end gap-4">
            <TrustSealBadge size="lg" />

            <button
              onClick={onOpenVerifyModal}
              className="px-5 py-2.5 bg-[#1E2C1B] hover:bg-[#3F7D46] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1.5 focus-visible:ring-2 focus-visible:ring-[#3F7D46]"
            >
              <ShieldCheck className="w-4 h-4 text-[#E07A2E]" />
              <span>Verify Lab Report Batch</span>
            </button>
          </div>

        </div>

        {/* 4 Column Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          
          {/* Column 1: Organic Categories */}
          <div className="space-y-3">
            <h4 className="font-serif-display font-bold text-base text-[#1E2C1B] border-b border-[#D6C8A6] pb-2">
              Organic Categories
            </h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#categories" className="hover:text-[#E07A2E] transition-colors">A2 Desi Cow Ghee (वैदिक घी)</a></li>
              <li><a href="#categories" className="hover:text-[#E07A2E] transition-colors">Lakadong Turmeric & Spices</a></li>
              <li><a href="#categories" className="hover:text-[#E07A2E] transition-colors">Raw Wild Forest Honey</a></li>
              <li><a href="#categories" className="hover:text-[#E07A2E] transition-colors">Wood-Pressed Kachi Ghani Oils</a></li>
              <li><a href="#categories" className="hover:text-[#E07A2E] transition-colors">Khapli Wheat & Ancient Grains</a></li>
            </ul>
          </div>

          {/* Column 2: Verification & Trust */}
          <div className="space-y-3">
            <h4 className="font-serif-display font-bold text-base text-[#1E2C1B] border-b border-[#D6C8A6] pb-2">
              Trust & Quality Protocol
            </h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#trust-process" className="hover:text-[#3F7D46] transition-colors">3-Step Farm Vetting System</a></li>
              <li><button onClick={onOpenVerifyModal} className="hover:text-[#3F7D46] transition-colors text-left">NABL Lab Testing Standard</button></li>
              <li><a href="#vendors" className="hover:text-[#3F7D46] transition-colors">Meet Our Organic Farmers</a></li>
              <li><button onClick={onOpenSellerModal} className="hover:text-[#3F7D46] transition-colors text-left">Apply for Seller Verification</button></li>
              <li><a href="#why-us" className="hover:text-[#3F7D46] transition-colors">Why Bharosa (Value Props)</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Farmer Support */}
          <div className="space-y-3">
            <h4 className="font-serif-display font-bold text-base text-[#1E2C1B] border-b border-[#D6C8A6] pb-2">
              Farmer & Consumer Helpline
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#1E2C1B]/90">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#E07A2E] shrink-0" />
                <span>+91 1800-BHAROSA (Toll Free)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#3F7D46] shrink-0" />
                <span>trust@bharosashop.in</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#C79A3E] shrink-0 mt-0.5" />
                <span>Bharosa Organic Center, MG Road, Pune, Maharashtra 411001</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Back to Top */}
          <div className="space-y-3">
            <h4 className="font-serif-display font-bold text-base text-[#1E2C1B] border-b border-[#D6C8A6] pb-2">
              Stay Connected
            </h4>
            <p className="text-xs text-[#1E2C1B]/80 leading-relaxed font-sans-body">
              Receive seasonal harvest alerts and traditional Ayurvedic organic recipes.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Bharosa Harvest Alerts!'); }} className="flex space-x-1">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="w-full px-3 py-1.5 rounded-lg bg-[#F6F1E4] border border-[#D6C8A6] text-xs focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#E07A2E] text-white text-xs font-bold rounded-lg hover:bg-[#C4611E] transition-colors shrink-0"
              >
                Join
              </button>
            </form>

            <div className="pt-2">
              {/* Back to Top Accessible Button */}
              <button
                onClick={scrollToTop}
                className="w-full py-2 bg-[#F6F1E4] hover:bg-[#3F7D46] hover:text-white border border-[#D6C8A6] text-[#1E2C1B] font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5 focus-visible:ring-2 focus-visible:ring-[#3F7D46]"
                aria-label="Scroll back to top of page"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Copyright Footer Line */}
        <div className="pt-8 border-t border-[#D6C8A6]/80 flex flex-col sm:flex-row items-center justify-between text-xs text-[#1E2C1B]/70 gap-4">
          <p>© {new Date().getFullYear()} Bharosa Shop Marketplace Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-4 font-medium">
            <span className="font-devanagari text-[#3F7D46] font-bold">शुद्धता का वादा</span>
            <span>•</span>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Lab Vetting Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
