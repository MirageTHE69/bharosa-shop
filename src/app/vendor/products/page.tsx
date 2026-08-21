import Link from 'next/link';
import { Pencil, PlusCircle } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { getOwnVendor } from '@/lib/data/vendors';
import { getOwnProducts } from '@/lib/data/products';
import { DeleteProductButton } from '@/components/vendor/DeleteProductButton';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';
import type { ProductStatus } from '@/types/database';

const STATUS_STYLES: Record<ProductStatus, string> = {
  draft: 'bg-[#F4EEE1] text-[#6B7263]',
  pending_review: 'bg-amber-50 text-amber-700',
  approved: 'bg-green-50 text-[#3F7D46]',
  rejected: 'bg-red-50 text-red-700',
};

export default async function VendorProductsPage() {
  const currentUser = await getCurrentUser();
  const vendor = currentUser ? await getOwnVendor(currentUser.id) : null;
  const products = vendor ? await getOwnProducts(vendor.id) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif-display text-2xl font-bold text-[#24291F]">My Products</h1>
        {vendor?.status === 'verified' && (
          <Link
            href="/vendor/products/new"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#C4611E] hover:bg-[#A84E15] text-white font-semibold text-sm rounded-lg transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        )}
      </div>

      {products.length === 0 ? (
        <div className="bg-white border border-[#E7E0CE] rounded-2xl p-10 text-center text-sm text-[#6B7263]">
          {vendor?.status === 'verified'
            ? "You haven't added any products yet."
            : 'Your products will appear here once you can start listing.'}
        </div>
      ) : (
        <div className="bg-white border border-[#E7E0CE] rounded-2xl divide-y divide-[#E7E0CE]">
          {products.map((product) => (
            <div key={product.id} className="p-4 flex items-center gap-4">
              <img
                src={product.image_url ?? DEFAULT_PRODUCT_IMAGE}
                alt={product.title}
                className="w-14 h-14 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#24291F] truncate">{product.title}</div>
                <div className="text-xs text-[#6B7263]">₹{product.price}</div>
                {product.status === 'rejected' && product.rejection_reason && (
                  <div className="text-xs text-red-600 mt-1">Reason: {product.rejection_reason}</div>
                )}
              </div>
              <span className={`text-[11px] font-semibold px-2 py-1 rounded-full shrink-0 ${STATUS_STYLES[product.status]}`}>
                {product.status.replace('_', ' ')}
              </span>
              <div className="flex items-center space-x-1 shrink-0">
                <Link
                  href={`/vendor/products/${product.id}/edit`}
                  className="p-2 rounded-lg text-[#6B7263] hover:text-[#24291F] hover:bg-[#F4EEE1] transition-colors"
                  aria-label="Edit product"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                {(product.status === 'draft' || product.status === 'rejected') && (
                  <DeleteProductButton productId={product.id} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
