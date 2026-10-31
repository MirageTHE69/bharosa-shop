'use client';

import Link from 'next/link';
import type { Category } from '@/types/database';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import { Reveal } from '@/components/Reveal';

interface CategoryGridSectionProps {
  categories: Category[];
}

// Instamart-style grouping: categories are bucketed under a few headings by slug.
// Any category not listed here falls into the "More to Explore" group.
const CATEGORY_GROUPS: { key: string; titleKey: string; slugs: string[] }[] = [
  { key: 'kitchen', titleKey: 'categories.groupKitchen', slugs: ['grains', 'pulses', 'oils', 'ghee'] },
  { key: 'wellness', titleKey: 'categories.groupWellness', slugs: ['spices', 'honey', 'teas', 'dryfruits'] },
];

export function CategoryGridSection({ categories }: CategoryGridSectionProps) {
  const { t, fontClass } = useLanguage();

  const grouped = new Set(CATEGORY_GROUPS.flatMap((g) => g.slugs));
  const groups = [
    ...CATEGORY_GROUPS.map((g) => ({
      key: g.key,
      title: t(g.titleKey),
      items: g.slugs
        .map((slug) => categories.find((c) => c.slug === slug))
        .filter((c): c is Category => !!c),
    })),
    {
      key: 'more',
      title: t('categories.groupMore'),
      items: categories.filter((c) => !grouped.has(c.slug)),
    },
  ].filter((g) => g.items.length > 0);

  return (
    <section id="categories" className="py-12 sm:py-16 bg-white scroll-mt-36 sm:scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className={`text-xs font-bold uppercase tracking-widest text-[#3F7D46] ${fontClass}`}>
            {t('categories.eyebrow')}
          </span>
          <h2 className={`font-serif-display text-3xl sm:text-4xl font-bold text-[#24291F] ${fontClass}`}>
            {t('categories.title')}
          </h2>
          <div className="mx-auto w-12 h-1 rounded-full bg-[#F9BD5E]" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
          {groups.map((group) => (
            <div key={group.key}>
              <h3 className={`font-serif-display text-xl sm:text-2xl font-bold text-[#24291F] mb-4 ${fontClass}`}>
                {group.title}
              </h3>

              <div className="grid grid-cols-4 gap-x-3 gap-y-5 sm:gap-x-4">
                {group.items.map((cat, i) => (
                  <Reveal key={cat.id} delay={i * 70}>
                    <Link href={`/category/${cat.slug}`} className="group flex flex-col items-center">
                      <div className="w-full aspect-square rounded-2xl bg-[#EEF5EA] overflow-hidden p-1.5 sm:p-2 ring-1 ring-transparent transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-[#2A5C31]/10 group-hover:ring-[#3F7D46]/30">
                        <img
                          src={cat.image_url ?? DEFAULT_PRODUCT_IMAGE}
                          alt={cat.name_en}
                          className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <span className="mt-2 text-center text-xs sm:text-sm font-semibold leading-tight text-[#24291F] line-clamp-2 transition-colors group-hover:text-[#3F7D46]">
                        {cat.name_en}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
