'use client';

import Link from 'next/link';
import { ShoppingBag, Star, ShieldCheck } from 'lucide-react';
import { useAppShell } from '@/context/AppShellContext';
import type { ProductWithVendor } from '@/types/database';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';

export function ProductCard({ product }: { product: ProductWithVendor }) {
  const { addToCart } = useAppShell();

  const discountPct =
    product.original_price && product.original_price > product.price
      ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
      : null;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="w-full bg-white rounded-2xl border border-[#E7E0CE] hover:border-[#3F7D46]/40 hover:shadow-xl hover:shadow-[#2A5C31]/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group"
    >
      <div className="relative aspect-square bg-[#F4EEE1] overflow-hidden">
        <img
          src={product.image_url ?? DEFAULT_PRODUCT_IMAGE}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {discountPct && (
          <div className="absolute top-2 left-2 bg-[#F9BD5E] text-[#24291F] text-[11px] font-bold px-2 py-1 rounded-md">
            Save {discountPct}%
          </div>
        )}

        <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 text-[#3F7D46] flex items-center justify-center shadow-sm" title="Bharosa Verified">
          <ShieldCheck className="w-4 h-4" strokeWidth={2.5} />
        </div>

        {product.badge && (
          <div className="absolute bottom-2 left-2 bg-[#2A5C31] text-white text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded">
            {product.badge}
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="font-serif-display text-sm sm:text-base font-bold text-[#24291F] leading-snug line-clamp-2 min-h-[2.5em]">
          {product.title}
        </h3>

        <p className="mt-1 text-[11px] sm:text-xs text-[#6B7263] line-clamp-1">
          {[product.weight, product.vendor.name].filter(Boolean).join(' · ')}
        </p>

        {product.rating > 0 && (
          <div className="mt-1.5 flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 text-[#F2A93B] fill-current" />
            <span className="font-semibold text-[#24291F]">{product.rating.toFixed(1)}</span>
            {product.reviews > 0 && (
              <span className="text-[#6B7263]">| {product.reviews} Reviews</span>
            )}
          </div>
        )}

        <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-base sm:text-lg font-bold text-[#24291F]">₹{product.price}</span>
          {discountPct && (
            <span className="text-xs text-[#6B7263] line-through">₹{product.original_price}</span>
          )}
        </div>

        <div className="mt-auto pt-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-full py-2 sm:py-2.5 bg-[#2A5C31] hover:bg-[#1F4725] text-white font-semibold text-xs sm:text-sm rounded-lg transition-all active:scale-95 hover:shadow-md flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4 transition-transform group-hover:-rotate-12" />
            Add To Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
