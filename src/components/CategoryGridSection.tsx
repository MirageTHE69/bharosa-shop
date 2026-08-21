import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/types/database';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';

interface CategoryGridSectionProps {
  categories: Category[];
}

export function CategoryGridSection({ categories }: CategoryGridSectionProps) {
  return (
    <section id="categories" className="py-16 sm:py-24 bg-[#FBF9F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3F7D46]">
              Curated Collections
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#24291F]">
              Shop by Category
            </h2>
          </div>

          <p className="text-sm text-[#6B7263] max-w-md">
            Every category carries the Bharosa Verified Seal — each batch is tested for
            230+ chemical residues before packaging.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E7E0CE] hover:border-[#24291F]/30 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 overflow-hidden bg-[#F4EEE1]">
                  <img
                    src={cat.image_url ?? DEFAULT_PRODUCT_IMAGE}
                    alt={`Fresh ${cat.name_en} organic produce`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="font-serif-display text-lg font-bold text-[#24291F]">
                    {cat.name_en}
                  </h3>
                  <div className="font-devanagari text-xs text-[#6B7263]">
                    {cat.name_hi}
                  </div>
                  <p className="text-xs text-[#6B7263] leading-relaxed line-clamp-2 pt-1">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-1 flex items-center gap-2 border-t border-[#E7E0CE] mt-2">
                <span className="text-xs font-semibold text-[#3F7D46] flex items-center space-x-1 pt-3">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
