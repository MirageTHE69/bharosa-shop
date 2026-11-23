'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, ShieldCheck, Menu, X, ChevronRight, Store, User, LogOut, LayoutDashboard } from 'lucide-react';
import { signOut } from '@/lib/actions/auth';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { SearchBox } from '@/components/SearchBox';
import type { ProfileRole } from '@/types/database';

interface NavbarUser {
  fullName: string | null;
  email: string | null;
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
  const [scrolled, setScrolled] = useState(false);

  // Compact the header once the user scrolls past the top of the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('nav.shop'), href: '/#categories' },
    { label: t('nav.howItWorks'), href: '/#trust-process' },
    { label: t('nav.farmers'), href: '/#vendors' },
    { label: t('nav.whyBharosa'), href: '/#why-us' },
  ];

  const panelHref = user?.role === 'admin' ? '/admin/dashboard' : '/vendor/dashboard';

  // Shown in the header so a signed-in visitor can see they're logged in.
  const displayName =
    user?.fullName?.trim().split(/\s+/)[0] || user?.email?.split('@')[0] || t('nav.myAccount');

  return (
    <header className={`sticky top-0 z-40 w-full border-b border-black/30 transition-all duration-300 ${scrolled ? 'bg-[#24291F]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-[#24291F] shadow-sm'}`}>
      <div className={`max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300 ${scrolled ? 'h-16 sm:h-20' : 'h-20 sm:h-32'}`}>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center rounded-lg py-1 transition-opacity hover:opacity-90 shrink-0"
          aria-label="Bharosa Shop Home"
        >
          {/* === NAVBAR LOGO SIZE: change 'h-16 sm:h-28' below to adjust size === */}
          <img
            src="/logo.png"
            alt="Bharosa Shop"
            className={`w-auto object-contain shrink-0 transition-all duration-300 ${scrolled ? 'h-12 sm:h-16' : 'h-16 sm:h-28'}`}
          />
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden xl:block flex-1 max-w-md mx-4">
          <Suspense fallback={<SearchBoxFallback placeholder={t('nav.searchPlaceholder')} />}>
            <SearchBox placeholder={t('nav.searchPlaceholder')} />
          </Suspense>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-white/90">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 hover:text-[#FFD08A] transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[#F9BD5E] after:transition-transform after:duration-300 hover:after:scale-x-100"
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
            className="hidden lg:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-white font-medium text-sm hover:bg-white/15 transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t('nav.verifyBatch')}</span>
          </button>

          {(!user || user.role === 'customer') && (
            <button
              onClick={onOpenSellerModal}
              className="hidden lg:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/35 text-white font-medium text-sm hover:bg-white/15 hover:border-white/60 transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>{t('nav.sellWithUs')}</span>
            </button>
          )}

          {user && (user.role === 'vendor' || user.role === 'admin') && (
            <Link
              href={panelHref}
              className="hidden lg:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/35 text-white font-medium text-sm hover:bg-white/15 hover:border-white/60 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{user.role === 'admin' ? t('nav.admin') : t('nav.myPanel')}</span>
            </Link>
          )}

          {user ? (
            <div className="hidden lg:flex items-center gap-1">
              <span
                className="inline-flex items-center gap-1.5 pl-1 pr-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium max-w-[11rem]"
                title={user.email ?? undefined}
              >
                <span className="w-6 h-6 rounded-full bg-[#F9BD5E] text-[#24291F] text-xs font-bold flex items-center justify-center shrink-0 uppercase">
                  {displayName.charAt(0)}
                </span>
                <span className="truncate">{displayName}</span>
              </span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-white/90 font-medium text-sm hover:bg-white/15 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t('nav.signOut')}</span>
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/auth/sign-in"
              className="hidden lg:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-white font-medium text-sm hover:bg-white/15 transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t('nav.signIn')}</span>
            </Link>
          )}

          {user && (
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-8 h-8 rounded-full bg-[#F9BD5E] text-[#24291F] text-sm font-bold flex items-center justify-center uppercase"
              aria-label={`${t('nav.signedInAs')} ${displayName}`}
            >
              {displayName.charAt(0)}
            </button>
          )}

          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-lg hover:bg-white/15 text-white transition-colors"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span key={cartCount} className="animate-pop absolute top-0.5 right-0.5 bg-[#C4611E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/15 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Search Bar (shown until the desktop search bar takes over at xl:) */}
      <div className="xl:hidden px-4 pb-3">
        <Suspense fallback={<SearchBoxFallback placeholder={t('nav.searchPlaceholderMobile')} />}>
          <SearchBox placeholder={t('nav.searchPlaceholderMobile')} onNavigate={() => setMobileMenuOpen(false)} />
        </Suspense>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF9F4] border-t border-[#E7E0CE] px-4 py-5">
          {user && (
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-white border border-[#E7E0CE] px-3 py-2.5">
              <span className="w-9 h-9 rounded-full bg-[#F9BD5E] text-[#24291F] font-bold flex items-center justify-center uppercase shrink-0">
                {displayName.charAt(0)}
              </span>
              <div className="min-w-0">
                <div className="text-xs text-[#6B7263]">{t('nav.signedInAs')}</div>
                <div className="text-sm font-semibold text-[#24291F] truncate">{user.fullName || user.email}</div>
              </div>
            </div>
          )}
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

            {(!user || user.role === 'customer') && (
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

// Static stand-in shown while the search box hydrates (it reads the URL).
function SearchBoxFallback({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7263]" />
      <input
        type="search"
        disabled
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full pl-9 pr-20 py-2 rounded-lg bg-white border border-transparent text-sm"
      />
    </div>
  );
}
