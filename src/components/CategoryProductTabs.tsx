'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { useLanguage } from '@/context/LanguageContext';
import type { Category, ProductWithVendor } from '@/types/database';

interface CategoryProductTabsProps {
  categories: Category[];
  products: ProductWithVendor[];
}

const ALL_TAB = '__all__';
const MAX_PER_TAB = 8;

export function CategoryProductTabs({ categories, products }: CategoryProductTabsProps) {
  const { t, fontClass } = useLanguage();
  const [active, setActive] = useState(ALL_TAB);
  // First paint is handled by <Reveal>; only animate cards in on later tab switches.
  const [hasSwitched, setHasSwitched] = useState(false);

  // Only show tabs for categories that actually have products to display.
  const tabs = categories.filter((c) => products.some((p) => p.category?.id === c.id));
  const activeCategory = tabs.find((c) => c.id === active);

  const visible = (activeCategory
    ? products.filter((p) => p.category?.id === activeCategory.id)
    : [...products].sort((a, b) => b.rating - a.rating)
  ).slice(0, MAX_PER_TAB);

  return (
    <section id="shop" className="py-12 sm:py-16 bg-[#FBF9F4] scroll-mt-36 sm:scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal className="text-center max-w-2xl mx-auto space-y-2 mb-6">
          <span className={`text-xs font-bold uppercase tracking-widest text-[#3F7D46] ${fontClass}`}>
            {t('showcase.eyebrow')}
          </span>
          <h2 className={`font-serif-display text-3xl sm:text-4xl font-bold text-[#24291F] ${fontClass}`}>
            {t('showcase.title')}
          </h2>
          <div className="mx-auto w-12 h-1 rounded-full bg-[#F9BD5E]" />
        </Reveal>

        {/* Tabs */}
        <Reveal delay={100} className="flex sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 -mx-4 px-4">
          {[{ id: ALL_TAB, name_en: t('showcase.all') }, ...tabs].map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActive(tab.id);
                  setHasSwitched(true);
                }}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-all duration-300 active:scale-95 ${
                  isActive
                    ? 'bg-[#2A5C31] border-[#2A5C31] text-white shadow-md shadow-[#2A5C31]/25'
                    : 'bg-white border-[#E7E0CE] text-[#24291F] hover:border-[#3F7D46] hover:text-[#3F7D46] hover:-translate-y-0.5'
                }`}
              >
                {tab.name_en}
              </button>
            );
          })}
        </Reveal>

        {visible.length === 0 ? (
          <p className={`text-sm text-[#6B7263] bg-white rounded-2xl p-8 text-center ${fontClass}`}>
            {products.length === 0 ? t('home.noProducts') : t('showcase.empty')}
          </p>
        ) : (
          <div key={active} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {visible.map((prod, i) =>
              hasSwitched ? (
                <div key={prod.id} className="animate-fade-up flex" style={{ animationDelay: `${i * 60}ms` }}>
                  <ProductCard product={prod} />
                </div>
              ) : (
                <Reveal key={prod.id} delay={(i % 4) * 80} className="flex">
                  <ProductCard product={prod} />
                </Reveal>
              )
            )}
          </div>
        )}

        {activeCategory && (
          <div key={`more-${active}`} className="mt-8 flex justify-center animate-fade-up">
            <Link
              href={`/category/${activeCategory.slug}`}
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#2A5C31] text-[#2A5C31] font-semibold text-sm hover:bg-[#2A5C31] hover:text-white transition-colors"
            >
              <span className={fontClass}>{t('showcase.viewAll')} {activeCategory.name_en}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
