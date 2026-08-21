'use client';

import Link from 'next/link';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useAppShell } from '@/context/AppShellContext';
import type { ProductWithVendor } from '@/types/database';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';

export function ProductCard({ product }: { product: ProductWithVendor }) {
  const { addToCart } = useAppShell();

  return (
    <Link
      href={`/product/${product.slug}`}
      className="bg-white rounded-2xl border border-[#E7E0CE] hover:border-[#24291F]/30 transition-colors overflow-hidden flex flex-col justify-between group"
    >
      <div>
        <div className="relative h-40 bg-[#F4EEE1] overflow-hidden">
          <img
            src={product.image_url ?? DEFAULT_PRODUCT_IMAGE}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
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
