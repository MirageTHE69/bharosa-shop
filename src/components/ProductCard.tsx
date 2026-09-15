'use client';

import Link from 'next/link';
import { ShoppingBag, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
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
      className="bg-white rounded-2xl border border-[#E7E0CE] hover:border-[#24291F]/20 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col justify-between group"
    >
      <div>
        <div className="relative h-44 bg-[#F4EEE1] overflow-hidden">
          <img
            src={product.image_url ?? DEFAULT_PRODUCT_IMAGE}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {discountPct && (
            <div className="absolute top-2 left-2 bg-[#C4611E] text-white text-[11px] font-bold px-2 py-1 rounded-lg shadow-sm">
              {discountPct}% OFF
            </div>
          )}

          <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 text-[#3F7D46] flex items-center justify-center shadow-sm" title="Bharosa Verified">
            <ShieldCheck className="w-4 h-4" strokeWidth={2.5} />
          </div>

          {product.batch_code && (
            <div className="absolute bottom-2 right-2 bg-[#24291F]/70 text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
              {product.batch_code}
            </div>
          )}
        </div>

        <div className="p-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#6B7263]">
            <span>{product.weight}</span>
            <span className="font-medium text-[#3F7D46]">{product.vendor.name}</span>
          </div>

          <h3 className="font-serif-display text-base font-bold text-[#24291F] line-clamp-1">
            {product.title}
          </h3>

          {product.hindi_title && (
            <div className="font-devanagari text-xs text-[#6B7263]">{product.hindi_title}</div>
          )}

          {product.rating > 0 && (
            <div className="flex items-center space-x-1 text-xs pt-0.5">
              <Star className="w-3.5 h-3.5 text-[#C4611E] fill-current" />
              <span className="font-semibold text-[#24291F]">{product.rating.toFixed(1)}</span>
              {product.reviews > 0 && (
                <span className="text-[#6B7263]">({product.reviews})</span>
              )}
            </div>
          )}

          {product.lab_pesticide_ppm && (
            <div className="flex items-center space-x-1 text-[#3F7D46] text-[11px] font-medium pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Pesticide Score: {product.lab_pesticide_ppm.split(' ')[0]}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 pt-2 flex items-center justify-between border-t border-[#E7E0CE] mt-2">
        <div>
          <span className="text-base font-bold text-[#24291F]">₹{product.price}</span>
          {product.original_price && (
            <span className="text-xs text-[#6B7263] line-through ml-1.5">₹{product.original_price}</span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="px-3 py-1.5 bg-[#F4EEE1] hover:bg-[#C4611E] text-[#24291F] hover:text-white font-medium text-xs rounded-lg transition-colors flex items-center space-x-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>
    </Link>
  );
}
