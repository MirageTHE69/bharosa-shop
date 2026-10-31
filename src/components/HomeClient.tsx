'use client';

import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { HindiDivider } from '@/components/HindiDivider';
import { TrustProcessSection } from '@/components/TrustProcessSection';
import { CategoryGridSection } from '@/components/CategoryGridSection';
import { FeaturedVendorsSection } from '@/components/FeaturedVendorsSection';
import { WhyBharosaSection } from '@/components/WhyBharosaSection';
import { VendorCalloutSection } from '@/components/VendorCalloutSection';
import { FarmerAgreementSection } from '@/components/FarmerAgreementSection';
import { FAQSection } from '@/components/FAQSection';
import { CategoryProductTabs } from '@/components/CategoryProductTabs';
import { TrustStrip } from '@/components/TrustStrip';
import { Reveal } from '@/components/Reveal';
import { useAppShell } from '@/context/AppShellContext';
import { useLanguage } from '@/context/LanguageContext';
import type { Category, Vendor, ProductWithVendor } from '@/types/database';
import { Star, Quote } from 'lucide-react';

interface HomeClientProps {
  categories: Category[];
  vendors: Vendor[];
  products: ProductWithVendor[];
}

export function HomeClient({ categories, vendors, products }: HomeClientProps) {
  const { openVerifyModal } = useAppShell();
  const { t, fontClass } = useLanguage();

  const scrollToCategories = () => {
    const el = document.getElementById('categories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection onShopClick={scrollToCategories} onVerifyClick={openVerifyModal} />

      {/* 1b. Trust strip overlapping the hero */}
      <TrustStrip />

      {/* 2. Shop by Category — grouped tiles */}
      <CategoryGridSection categories={categories} />

      {/* 3. Category-wise product showcase (tabbed) */}
      <CategoryProductTabs categories={categories} products={products} />

      {/* 4. Hindi Slogan Divider */}
      <HindiDivider
        phraseHi="मिट्टी से मेज़ तक"
        translationEn="From Soil to Table • Farm Traceability"
      />

      {/* 5. Trust & Verification Process */}
      <Reveal>
        <TrustProcessSection onOpenVerifyModal={openVerifyModal} />
      </Reveal>

      {/* 6. Hindi Slogan Divider */}
      <HindiDivider
        phraseHi="शुद्ध, सुरक्षित और गुणवत्तापूर्ण"
        translationEn="Best Organic Products • Zero Chemical Residue"
      />

      {/* 7. Featured Farmers & Artisans */}
      <Reveal>
        <FeaturedVendorsSection vendors={vendors} />
      </Reveal>

      {/* 8. Why Bharosa (Value Propositions) */}
      <Reveal>
        <WhyBharosaSection />
      </Reveal>

      {/* 9. Become a Vendor Section */}
      <Reveal>
        <VendorCalloutSection />
      </Reveal>

      {/* 9b. Farmer Agreement Summary */}
      <Reveal>
        <FarmerAgreementSection />
      </Reveal>

      {/* 10. FAQ */}
      <Reveal>
        <FAQSection />
      </Reveal>

      {/* 11. Verified Customer Testimonials */}
      <section className="py-16 sm:py-24 bg-[#F4EEE1]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className={`text-xs font-bold uppercase tracking-widest text-[#3F7D46] ${fontClass}`}>
              {t('home.storiesEyebrow')}
            </span>
            <h2 className={`font-serif-display text-3xl sm:text-4xl font-bold text-[#24291F] ${fontClass}`}>
              {t('home.storiesTitle')}
            </h2>
            <div className="mx-auto w-12 h-1 rounded-full bg-[#F9BD5E]" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: 'Ananya Deshmukh',
                city: 'Mumbai',
                quote: 'The Bilona A2 Gir Ghee smells exactly like the ghee my grandmother used to make in Kolhapur. Scanning the batch code gave us total peace of mind!',
                product: 'A2 Vedic Bilona Ghee',
              },
              {
                name: 'Dr. Vikramaditya Sharma',
                city: 'New Delhi',
                quote: 'As a nutritionist, zero-pesticide verification is crucial for my family. Bharosa Shop Lakadong Turmeric has over 7.5% curcumin verified by lab report.',
                product: 'Lakadong High-Curcumin Turmeric',
              },
              {
                name: 'Meera & Rajesh Nair',
                city: 'Bengaluru',
                quote: 'Directly supporting Wayanad tribal honey gatherers while receiving pure raw unheated forest honey. Best organic platform in India!',
                product: 'Wild Forest Raw Honey',
              },
            ].map((rev, i) => (
              <Reveal key={i} delay={i * 100} className="flex">
                <div className="relative w-full bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3">
                  <Quote className="absolute top-5 right-5 w-8 h-8 text-[#F9BD5E]/40" />
                  <div className="flex text-[#F2A93B]">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-[#24291F] leading-relaxed">
                    &quot;{rev.quote}&quot;
                  </p>
                  <div className="pt-3 border-t border-[#E7E0CE] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-[#24291F]">{rev.name}</span>
                      <span className="text-[#6B7263]"> ({rev.city})</span>
                    </div>
                    <span className="font-medium text-[#3F7D46]">{rev.product}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
