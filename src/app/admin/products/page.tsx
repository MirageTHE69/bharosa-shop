import Link from 'next/link';
import { getAllProductsForAdmin } from '@/lib/data/products';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';
import type { ProductStatus } from '@/types/database';

const STATUS_STYLES: Record<ProductStatus, string> = {
  draft: 'bg-[#F4EEE1] text-[#6B7263]',
  pending_review: 'bg-amber-50 text-amber-700',
  approved: 'bg-green-50 text-[#3F7D46]',
  rejected: 'bg-red-50 text-red-700',
};

const FILTERS: { label: string; value: ProductStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending Review', value: 'pending_review' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Draft', value: 'draft' },
];

interface AdminProductsPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  const { status } = await searchParams;
  const activeStatus = (status as ProductStatus | undefined) ?? undefined;

  const products = await getAllProductsForAdmin(activeStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-serif-display text-2xl font-bold text-[#24291F]">Products</h1>
        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <Link
              key={f.value}
              href={f.value === 'all' ? '/admin/products' : `/admin/products?status=${f.value}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                (activeStatus ?? 'all') === f.value
                  ? 'bg-[#24291F] text-white'
                  : 'bg-white border border-[#E7E0CE] text-[#24291F] hover:border-[#24291F]/40'
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="bg-white border border-[#E7E0CE] rounded-2xl p-10 text-center text-sm text-[#6B7263]">
          No products found.
        </div>
      ) : (
        <div className="bg-white border border-[#E7E0CE] rounded-2xl divide-y divide-[#E7E0CE]">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/admin/products/${product.id}`}
              className="p-4 flex items-center gap-4 hover:bg-[#F4EEE1]/50 transition-colors"
            >
              <img
                src={product.image_url ?? DEFAULT_PRODUCT_IMAGE}
                alt={product.title}
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#24291F] truncate">{product.title}</div>
                <div className="text-xs text-[#6B7263]">{product.vendor?.name} · ₹{product.price}</div>
              </div>
              <span className={`text-[11px] font-semibold px-2 py-1 rounded-full shrink-0 ${STATUS_STYLES[product.status]}`}>
                {product.status.replace('_', ' ')}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
