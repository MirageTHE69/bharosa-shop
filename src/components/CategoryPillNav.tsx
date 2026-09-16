'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import type { Category } from '@/types/database';

interface CategoryPillNavProps {
  categories: Category[];
}

export function CategoryPillNav({ categories }: CategoryPillNavProps) {
  const { t, fontClass } = useLanguage();

  return (
    <div className="bg-[#FBF9F4] border-b border-[#E7E0CE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Link
            href="#categories"
            className="shrink-0 px-4 py-2 rounded-full bg-[#24291F] text-white text-sm font-semibold whitespace-nowrap"
          >
            {t('pillnav.all')}
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={`shrink-0 px-4 py-2 rounded-full bg-white border border-[#E7E0CE] hover:border-[#3F7D46]/50 hover:text-[#3F7D46] text-[#24291F] text-sm font-medium whitespace-nowrap transition-colors ${fontClass}`}
            >
              {cat.name_en}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
