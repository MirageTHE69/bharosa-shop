'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteProduct } from '@/lib/actions/vendor-products';

export function DeleteProductButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (!confirm('Delete this product? This cannot be undone.')) return;
        startTransition(() => {
          deleteProduct(productId);
        });
      }}
      disabled={isPending}
      className="p-2 rounded-lg text-[#6B7263] hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
      aria-label="Delete product"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
