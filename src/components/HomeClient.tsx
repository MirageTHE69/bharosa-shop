'use client';

import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { HindiDivider } from '@/components/HindiDivider';
import { TrustProcessSection } from '@/components/TrustProcessSection';
import { CategoryGridSection } from '@/components/CategoryGridSection';
import { FeaturedVendorsSection } from '@/components/FeaturedVendorsSection';
import { WhyBharosaSection } from '@/components/WhyBharosaSection';
import { VendorCalloutSection } from '@/components/VendorCalloutSection';
import { FAQSection } from '@/components/FAQSection';
import { ProductCard } from '@/components/ProductCard';
import { useAppShell } from '@/context/AppShellContext';
import type { Category, Vendor, ProductWithVendor } from '@/types/database';
import { Star } from 'lucide-react';

interface HomeClientProps {
  categories: Category[];
  vendors: Vendor[];
  featuredProducts: ProductWithVendor[];
}

export function HomeClient({ categories, vendors, featuredProducts }: HomeClientProps) {
  const { openVerifyModal } = useAppShell();

  const scrollToCategories = () => {
    const el = document.getElementById('categories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection onShopClick={scrollToCategories} onVerifyClick={openVerifyModal} />

      {/* 2. Hindi Slogan Divider */}
      <HindiDivider
        phraseHi="मिट्टी से मेज़ तक"
        translationEn="From Soil to Table • Farm Traceability"
      />

      {/* 3. Trust & Verification Process */}
      <TrustProcessSection onOpenVerifyModal={openVerifyModal} />

      {/* 4. Featured Verified Products Spotlight */}
      <section className="py-16 bg-[#FBF9F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3F7D46]">
                Batch-Screened Specials
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#24291F]">
                Featured Verified Harvests
              </h2>
            </div>

            <button
              onClick={scrollToCategories}
              className="text-sm font-semibold text-[#3F7D46] hover:underline flex items-center space-x-1"
            >
              <span>View All Categories</span>
              <span>→</span>
            </button>
          </div>

          {featuredProducts.length === 0 ? (
            <p className="text-sm text-[#6B7263] bg-[#F4EEE1] rounded-2xl p-8 text-center">
              No verified products yet — check back soon as our farmers get approved.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Shop by Category Grid */}
      <CategoryGridSection categories={categories} />

      {/* 6. Hindi Slogan Divider */}
      <HindiDivider
        phraseHi="शुद्ध, सुरक्षित और गुणवत्तापूर्ण"
        translationEn="Best Organic Products • Zero Chemical Residue"
      />

      {/* 7. Featured Farmers & Artisans */}
      <FeaturedVendorsSection vendors={vendors} />

      {/* 8. Why Bharosa (Value Propositions) */}
      <WhyBharosaSection />

      {/* 9. Become a Vendor Section */}
      <VendorCalloutSection />

      {/* 10. FAQ */}
      <FAQSection />

      {/* 11. Verified Customer Testimonials */}
      <section className="py-16 sm:py-24 bg-[#F4EEE1]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3F7D46]">
              Customer Stories
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#24291F]">
              Trusted by 45,000+ Kitchens Across India
            </h2>
          </div>

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
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#E7E0CE] space-y-3">
                <div className="flex text-[#C4611E]">
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
