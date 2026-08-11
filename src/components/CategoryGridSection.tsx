'use client';

import React, { useState } from 'react';
import { ArrowRight, ShoppingBag, Sparkles, Filter } from 'lucide-react';
import { TrustSealBadge } from './TrustSealBadge';
import { CATEGORIES, Category } from '../data/bharosaData';

interface CategoryGridSectionProps {
  onSelectCategory: (category: Category) => void;
  onAddToCart: (categoryName: string) => void;
}

export const CategoryGridSection: React.FC<CategoryGridSectionProps> = ({
  onSelectCategory,
  onAddToCart,
}) => {
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);

  return (
    <section id="categories" className="py-16 sm:py-24 bg-[#F6F1E4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-[#EFE6D0] border border-[#D6C8A6] rounded-full px-3.5 py-1">
              <Filter className="w-3.5 h-3.5 text-[#E07A2E]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#1E2C1B]">
                Curated Organic Collections
              </span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2C1B]">
              Shop by Organic Category
            </h2>

            <div className="font-devanagari text-lg sm:text-xl font-semibold text-[#3F7D46]">
              “शुद्धता और परंपरा से भरपूर जैविक उत्पाद”
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#1E2C1B]/80 max-w-md font-sans-body">
            All categories carry the <span className="font-bold text-[#E07A2E]">Bharosa Verified Seal</span>. Every harvest batch is tested for 230+ chemical residues before packaging.
          </p>
        </div>

        {/* 3 to 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const isHovered = hoveredCategoryId === cat.id;

            return (
              <div
                key={cat.id}
                onMouseEnter={() => setHoveredCategoryId(cat.id)}
                onMouseLeave={() => setHoveredCategoryId(null)}
                className="group relative bg-[#EFE6D0] rounded-2xl overflow-hidden border border-[#D6C8A6] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
              >
                
                {/* Category Card Header & Image */}
                <div>
                  <div className="relative h-48 overflow-hidden bg-[#1E2C1B]">
                    <img
                      src={cat.image}
                      alt={`Fresh ${cat.nameEn} organic produce`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E2C1B]/80 via-transparent to-transparent" />

                    {/* Top Right Trust Seal */}
                    <div className="absolute top-3 right-3 z-10">
                      <TrustSealBadge size="sm" showLabel={false} />
                    </div>

                    {/* Bottom Left Hindi Tag */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
                      <span className="font-devanagari text-sm font-bold text-[#F6F1E4] drop-shadow-sm">
                        {cat.nameHi}
                      </span>
                      <span className="bg-[#3F7D46] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                        {cat.itemCount} Items
                      </span>
                    </div>
                  </div>

                  {/* Card Info Body */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif-display text-xl font-bold text-[#1E2C1B] group-hover:text-[#E07A2E] transition-colors">
                      {cat.nameEn}
                    </h3>
                    <p className="text-xs text-[#1E2C1B]/80 leading-relaxed font-sans-body line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Card Micro-Interaction & Action Footer */}
                <div className="px-5 pb-5 pt-1">
                  
                  {/* Microinteraction: On Hover Show Featured Item Preview */}
                  <div className={`transition-all duration-300 overflow-hidden ${isHovered ? 'max-h-16 opacity-100 mb-3' : 'max-h-0 opacity-0 mb-0'}`}>
                    <div className="bg-[#F6F1E4] p-2 rounded-xl border border-[#D6C8A6] text-xs flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 overflow-hidden">
                        <Sparkles className="w-3.5 h-3.5 text-[#E07A2E] shrink-0" />
                        <span className="truncate font-semibold text-[#1E2C1B]">
                          {cat.featuredProduct}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#3F7D46] uppercase shrink-0">
                        Top Rated
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-[#D6C8A6]/60 pt-3">
                    <button
                      onClick={() => onSelectCategory(cat)}
                      className="text-xs font-bold text-[#3F7D46] hover:text-[#2A5C31] flex items-center space-x-1 group/btn"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => onAddToCart(cat.nameEn)}
                      className="p-2 rounded-xl bg-[#E07A2E] text-white hover:bg-[#C4611E] transition-colors shadow-2xs"
                      aria-label={`Quick add ${cat.nameEn} to cart`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
