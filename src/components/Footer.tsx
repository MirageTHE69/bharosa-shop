'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { TrustSealBadge } from './TrustSealBadge';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
  onOpenVerifyModal: () => void;
  onOpenSellerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenVerifyModal,
  onOpenSellerModal,
}) => {
  const { t, fontClass } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#24291F] text-white pt-10 pb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">

        {/* Top Footer Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-7 border-b border-white/10 items-center">

          <div className="lg:col-span-6 space-y-2.5">
            <div className="flex items-center">
              {/* === FOOTER LOGO SIZE: change 'h-24 sm:h-28' below (e.g. h-20, h-24, h-28) to adjust size === */}
              <img
                src="/logo.png"
                alt="Bharosa Shop"
                className="h-24 sm:h-28 w-auto object-contain"
              />
            </div>

            <p className={`text-sm text-white/60 max-w-lg leading-relaxed ${fontClass}`}>
              {t('footer.desc')}
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-start lg:justify-end gap-3">
            <TrustSealBadge size="md" />

            <button
              onClick={onOpenVerifyModal}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs rounded-lg transition-colors flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className={fontClass}>{t('nav.verifyBatchFull')}</span>
            </button>
          </div>

        </div>

        {/* 4 Column Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">

          <div className="space-y-3">
            <h4 className={`font-semibold text-sm text-white ${fontClass}`}>{t('footer.categoriesHeading')}</h4>
            <ul className={`space-y-2 text-white/60 ${fontClass}`}>
              <li><Link href="/#categories" className="hover:text-white transition-colors">{t('footer.cat1')}</Link></li>
              <li><Link href="/#categories" className="hover:text-white transition-colors">{t('footer.cat2')}</Link></li>
              <li><Link href="/#categories" className="hover:text-white transition-colors">{t('footer.cat3')}</Link></li>
              <li><Link href="/#categories" className="hover:text-white transition-colors">{t('footer.cat4')}</Link></li>
              <li><Link href="/#categories" className="hover:text-white transition-colors">{t('footer.cat5')}</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className={`font-semibold text-sm text-white ${fontClass}`}>{t('footer.trustHeading')}</h4>
            <ul className={`space-y-2 text-white/60 ${fontClass}`}>
              <li><Link href="/#trust-process" className="hover:text-white transition-colors">{t('footer.trustLink1')}</Link></li>
              <li><button onClick={onOpenVerifyModal} className="hover:text-white transition-colors text-left">{t('footer.trustLink2')}</button></li>
              <li><Link href="/#vendors" className="hover:text-white transition-colors">{t('footer.trustLink3')}</Link></li>
              <li><button onClick={onOpenSellerModal} className="hover:text-white transition-colors text-left">{t('footer.trustLink4')}</button></li>
              <li><Link href="/farmer-agreement" className="hover:text-white transition-colors">{t('footer.farmerAgreement')}</Link></li>
              <li><Link href="/#why-us" className="hover:text-white transition-colors">{t('footer.trustLink5')}</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className={`font-semibold text-sm text-white ${fontClass}`}>{t('footer.helplineHeading')}</h4>
            <ul className="space-y-2 text-xs text-white/60">
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
                <span>Bharosa Organic Center, Alkapuri, Vadodara, Gujarat 390007</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className={`font-semibold text-sm text-white ${fontClass}`}>{t('footer.connectHeading')}</h4>
            <p className={`text-xs text-white/60 leading-relaxed ${fontClass}`}>
              {t('footer.connectDesc')}
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert(t('footer.subscribed')); }} className="flex space-x-1.5">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                required
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-transparent text-xs text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#C4611E] text-white text-xs font-semibold rounded-lg hover:bg-[#A84E15] transition-colors shrink-0"
              >
                <span className={fontClass}>{t('footer.join')}</span>
              </button>
            </form>

            <button
              onClick={scrollToTop}
              className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center space-x-1.5"
              aria-label="Scroll back to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className={fontClass}>{t('footer.backToTop')}</span>
            </button>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p className={fontClass}>© {new Date().getFullYear()} Bharosa Shop Marketplace Pvt Ltd. {t('footer.rightsReserved')}</p>
          <div className={`flex items-center space-x-4 ${fontClass}`}>
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacyPolicy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.labVettingTerms')}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
