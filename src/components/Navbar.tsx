'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, ShieldCheck, Menu, X, ChevronRight, Store, User, LogOut, LayoutDashboard } from 'lucide-react';
import { signOut } from '@/lib/actions/auth';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import type { ProfileRole } from '@/types/database';

interface NavbarUser {
  fullName: string | null;
  role: ProfileRole;
}

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenVerifyModal: () => void;
  onOpenSellerModal: () => void;
  user?: NavbarUser | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenVerifyModal,
  onOpenSellerModal,
  user = null,
}) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: t('nav.shop'), href: '/#categories' },
    { label: t('nav.howItWorks'), href: '/#trust-process' },
    { label: t('nav.farmers'), href: '/#vendors' },
    { label: t('nav.whyBharosa'), href: '/#why-us' },
  ];

  const panelHref = user?.role === 'admin' ? '/admin/dashboard' : '/vendor/dashboard';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#24291F] border-b border-black/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-28 sm:h-32 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center rounded-lg py-1 transition-opacity hover:opacity-90 shrink-0"
          aria-label="Bharosa Shop Home"
        >
          {/* === NAVBAR LOGO SIZE: change 'h-24 sm:h-28' below to adjust size === */}
          <img
            src="/logo.png"
            alt="Bharosa Shop"
            className="h-24 sm:h-28 w-auto object-contain shrink-0"
          />
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7263]" />
            <input
              type="text"
              placeholder={t('nav.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-transparent text-[#24291F] placeholder-[#6B7263] text-sm focus:outline-none focus:border-[#C4611E] transition-colors"
            />
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-white/90">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#FFD08A] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center space-x-1">
          <LanguageToggle />

          <button
            onClick={onOpenVerifyModal}
            className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-white font-medium text-sm hover:bg-white/15 transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t('nav.verifyBatch')}</span>
          </button>

          {!user && (
            <button
              onClick={onOpenSellerModal}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/35 text-white font-medium text-sm hover:bg-white/15 hover:border-white/60 transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>{t('nav.sellWithUs')}</span>
            </button>
          )}

          {user && (user.role === 'vendor' || user.role === 'admin') && (
            <Link
              href={panelHref}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/35 text-white font-medium text-sm hover:bg-white/15 hover:border-white/60 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{user.role === 'admin' ? t('nav.admin') : t('nav.myPanel')}</span>
            </Link>
          )}

          {user ? (
            <form action={signOut} className="hidden sm:block">
              <button
                type="submit"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-white font-medium text-sm hover:bg-white/15 transition-colors"
                aria-label={t('nav.signOut')}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <Link
              href="/auth/sign-in"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-white font-medium text-sm hover:bg-white/15 transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t('nav.signIn')}</span>
            </Link>
          )}

          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-lg hover:bg-white/15 text-white transition-colors"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#C4611E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/15 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7263]" />
          <input
            type="text"
            placeholder={t('nav.searchPlaceholderMobile')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-transparent text-sm text-[#24291F] focus:outline-none focus:border-[#C4611E]"
          />
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF9F4] border-t border-[#E7E0CE] px-4 py-5">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-medium text-[#24291F] hover:text-[#C4611E] py-2.5 border-b border-[#E7E0CE]"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#6B7263]" />
              </Link>
            ))}
          </nav>

          <div className="pt-4 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVerifyModal();
              }}
              className="w-full py-2.5 bg-[#F4EEE1] text-[#24291F] font-medium text-sm rounded-lg flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#3F7D46]" />
              <span>{t('nav.verifyBatchFull')}</span>
            </button>

            {user && (user.role === 'vendor' || user.role === 'admin') && (
              <Link
                href={panelHref}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 bg-[#F4EEE1] text-[#24291F] font-medium text-sm rounded-lg flex items-center justify-center space-x-2"
              >
                <LayoutDashboard className="w-4 h-4 text-[#3F7D46]" />
                <span>{user.role === 'admin' ? t('nav.adminDashboard') : t('nav.myVendorPanel')}</span>
              </Link>
            )}

            {!user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSellerModal();
                }}
                className="w-full py-2.5 bg-[#3F7D46] text-white font-medium text-sm rounded-lg flex items-center justify-center space-x-2"
              >
                <Store className="w-4 h-4" />
                <span>{t('nav.becomeSeller')}</span>
              </button>
            )}

            {user ? (
              <form action={signOut}>
                <button
                  type="submit"
                  className="w-full py-2.5 border border-[#E7E0CE] text-[#24291F] font-medium text-sm rounded-lg flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('nav.signOut')}</span>
                </button>
              </form>
            ) : (
              <Link
                href="/auth/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 border border-[#E7E0CE] text-[#24291F] font-medium text-sm rounded-lg flex items-center justify-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>{t('nav.signIn')}</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
