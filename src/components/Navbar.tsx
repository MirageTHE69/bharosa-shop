'use client';

import React, { useState } from 'react';
import { ShoppingBag, Search, ShieldCheck, Menu, X, ChevronRight, Store } from 'lucide-react';
import { TrustSealBadge } from './TrustSealBadge';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenVerifyModal: () => void;
  onOpenSellerModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenVerifyModal,
  onOpenSellerModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Shop Categories', href: '#categories' },
    { label: 'How Bharosa Works', href: '#trust-process' },
    { label: 'Verified Farmers', href: '#vendors' },
    { label: 'Why Bharosa', href: '#why-us' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Banner Notice - Vernacular & Trust Focus */}
      <div className="bg-[#1E2C1B] text-[#F6F1E4] py-1.5 px-4 text-xs sm:text-sm font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-[#E07A2E] text-white px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shrink-0">
              100% Organic Guarantee
            </span>
            <span className="truncate">
              🌾 Direct Sourcing from 500+ Organic Indian Farmers | <span className="font-devanagari text-[#C79A3E]">शुद्धता का वादा</span>
            </span>
          </div>

          <button
            onClick={onOpenVerifyModal}
            className="hidden md:inline-flex items-center space-x-1 text-[#E07A2E] hover:text-[#C79A3E] font-semibold underline underline-offset-2 transition-colors shrink-0"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verify Batch # / Lab Report</span>
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="bg-[#F6F1E4]/95 backdrop-blur-md border-b border-[#EFE6D0] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Tagline */}
          <a
            href="#"
            className="flex items-center space-x-3 group focus-visible:ring-[#3F7D46] rounded-xl p-1"
            aria-label="Bharosa Shop Home"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#EFE6D0] border-2 border-[#E07A2E] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" fill="#E07A2E" fillOpacity="0.18" />
                <path d="M8 20C8 16 11 12 16 12C21 12 24 16 24 20C21 22 18 23.5 16 23.5C14 23.5 11 22 8 20Z" fill="#3F7D46" />
                <path d="M16 8L18 13L23 14L19 18L20 23L16 20L12 23L13 18L9 14L14 13L16 8Z" fill="#C79A3E" />
              </svg>
            </div>
            <div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-serif-display text-2xl font-bold text-[#1E2C1B] tracking-tight">
                  Bharosa<span className="text-[#E07A2E]">.</span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#3F7D46] bg-[#EFE6D0] px-1.5 py-0.5 rounded">
                  Shop
                </span>
              </div>
              {/* Mandatory Tagline near logo */}
              <div className="font-devanagari text-xs font-semibold text-[#C4611E] -mt-0.5">
                शुद्धता का वादा
              </div>
            </div>
          </a>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search verified spices, A2 ghee, honey..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 rounded-full bg-[#EFE6D0]/80 border border-[#D6C8A6] text-[#1E2C1B] placeholder-[#1E2C1B]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#3F7D46] focus:bg-[#F6F1E4] transition-all"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#1E2C1B]/70" />
              <button
                onClick={onOpenVerifyModal}
                className="absolute right-1.5 top-1.5 px-3 py-1 bg-[#3F7D46] text-white rounded-full text-xs font-medium hover:bg-[#2A5C31] transition-colors flex items-center space-x-1"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Verify</span>
              </button>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-[#1E2C1B]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#E07A2E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E07A2E] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            {/* Quick Seller CTA */}
            <button
              onClick={onOpenSellerModal}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full border-2 border-[#3F7D46] text-[#3F7D46] font-semibold text-xs hover:bg-[#3F7D46] hover:text-white transition-all shadow-xs"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Join as Seller</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#EFE6D0] hover:bg-[#E07A2E] hover:text-white text-[#1E2C1B] transition-all shadow-xs group focus-visible:ring-2 focus-visible:ring-[#3F7D46]"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E07A2E] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#F6F1E4] shadow-xs animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#1E2C1B] hover:bg-[#EFE6D0] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden px-4 pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search verified organic items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-20 py-2 rounded-full bg-[#EFE6D0] border border-[#D6C8A6] text-sm text-[#1E2C1B]"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#1E2C1B]/70" />
            <button
              onClick={onOpenVerifyModal}
              className="absolute right-1 top-1 px-2.5 py-1 bg-[#3F7D46] text-white rounded-full text-xs"
            >
              Verify
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F6F1E4] border-b border-[#EFE6D0] px-4 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE6D0]">
              <TrustSealBadge size="sm" />
              <span className="font-devanagari text-sm font-bold text-[#C4611E]">
                शुद्धता का वादा
              </span>
            </div>

            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-semibold text-[#1E2C1B] hover:text-[#E07A2E] py-2 border-b border-[#EFE6D0]/50"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#3F7D46]" />
                </a>
              ))}
            </nav>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVerifyModal();
                }}
                className="w-full py-3 bg-[#EFE6D0] text-[#1E2C1B] font-bold rounded-xl flex items-center justify-center space-x-2 border border-[#D6C8A6]"
              >
                <ShieldCheck className="w-5 h-5 text-[#3F7D46]" />
                <span>Verify Batch Lab Certificate</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSellerModal();
                }}
                className="w-full py-3 bg-[#3F7D46] text-white font-bold rounded-xl flex items-center justify-center space-x-2 shadow-sm"
              >
                <Store className="w-5 h-5" />
                <span>Become a Verified Seller</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
