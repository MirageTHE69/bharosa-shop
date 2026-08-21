'use client';

import { ShoppingBag } from 'lucide-react';
import { useAppShell } from '@/context/AppShellContext';
import type { Product } from '@/types/database';

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useAppShell();

  return (
    <button
      onClick={() => addToCart(product)}
      className="px-6 py-3 bg-[#C4611E] hover:bg-[#A84E15] text-white font-semibold text-sm rounded-xl transition-colors flex items-center space-x-2"
    >
      <ShoppingBag className="w-4 h-4" />
      <span>Add to Basket</span>
    </button>
  );
}
