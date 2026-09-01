'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { adminDeleteProduct } from '@/lib/actions/admin-products';

export function AdminDeleteProductButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (!confirm('Permanently delete this product? This cannot be undone.')) return;
        startTransition(() => {
          adminDeleteProduct(productId);
        });
      }}
      disabled={isPending}
      className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 border border-red-200 text-xs font-semibold transition-colors disabled:opacity-50"
    >
      <Trash2 className="w-3.5 h-3.5" />
      <span>{isPending ? 'Deleting…' : 'Delete Product'}</span>
    </button>
  );
}
