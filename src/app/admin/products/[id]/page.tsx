import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Award } from 'lucide-react';
import { getProductByIdForAdmin } from '@/lib/data/products';
import { ProductApprovalActions } from '@/components/admin/ProductApprovalActions';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';
import type { ProductStatus } from '@/types/database';

const STATUS_STYLES: Record<ProductStatus, string> = {
  draft: 'bg-[#F4EEE1] text-[#6B7263]',
  pending_review: 'bg-amber-50 text-amber-700',
  approved: 'bg-green-50 text-[#3F7D46]',
  rejected: 'bg-red-50 text-red-700',
};

interface AdminProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProductDetailPage({ params }: AdminProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductByIdForAdmin(id);
  if (!product) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/products" className="text-sm text-[#6B7263] hover:text-[#24291F] flex items-center space-x-1.5">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </Link>

      <div className="bg-white border border-[#E7E0CE] rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-12 gap-6">
        <div className="sm:col-span-4">
          <img
            src={product.image_url ?? DEFAULT_PRODUCT_IMAGE}
            alt={product.title}
            className="w-full aspect-square object-cover rounded-xl"
          />
        </div>

        <div className="sm:col-span-8 space-y-4">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h1 className="font-serif-display text-xl font-bold text-[#24291F]">{product.title}</h1>
              {product.hindi_title && (
                <p className="font-devanagari text-sm text-[#6B7263]">{product.hindi_title}</p>
              )}
              <p className="text-xs text-[#6B7263] mt-1">
                by <span className="font-medium text-[#24291F]">{product.vendor?.name}</span> ·{' '}
                {product.category?.name_en}
              </p>
            </div>
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${STATUS_STYLES[product.status]}`}>
              {product.status.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-[#24291F]">₹{product.price}</span>
            {product.original_price && (
              <span className="text-sm text-[#6B7263] line-through">₹{product.original_price}</span>
            )}
          </div>

          {product.description && (
            <p className="text-sm text-[#24291F] leading-relaxed">{product.description}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F4EEE1] rounded-xl p-4 text-sm">
            {product.lab_pesticide_ppm && (
              <div className="flex items-center space-x-1.5 text-[#3F7D46]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{product.lab_pesticide_ppm}</span>
              </div>
            )}
            {product.lab_purity_score && (
              <div className="flex items-center space-x-1.5 text-[#24291F]">
                <Award className="w-4 h-4 shrink-0 text-[#3F7D46]" />
                <span>{product.lab_purity_score}</span>
              </div>
            )}
            {product.batch_code && (
              <div className="text-xs font-mono text-[#6B7263] col-span-full">
                Batch: {product.batch_code}
              </div>
            )}
          </div>

          {product.rejection_reason && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-800">
              <strong>Previous rejection reason:</strong> {product.rejection_reason}
            </div>
          )}

          {product.status !== 'approved' && (
            <div className="pt-4 border-t border-[#E7E0CE]">
              <ProductApprovalActions productId={product.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
