import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, MapPin, Calendar, Award } from 'lucide-react';
import { getProductBySlug } from '@/lib/data/products';
import { TrustSealBadge } from '@/components/TrustSealBadge';
import { AddToCartButton } from '@/components/AddToCartButton';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-xs text-[#6B7263] mb-6">
        <Link href="/" className="hover:text-[#24291F]">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/category/${product.category.slug}`} className="hover:text-[#24291F]">
          {product.category.name_en}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[#24291F]">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden bg-[#F4EEE1] aspect-square">
            <img
              src={product.image_url ?? DEFAULT_PRODUCT_IMAGE}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <TrustSealBadge size="sm" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs text-[#6B7263] mb-2">
              <span>{product.weight}</span>
              <Link href={`/farmer/${product.vendor.slug}`} className="font-medium text-[#3F7D46] hover:underline">
                {product.vendor.name}
              </Link>
            </div>

            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#24291F]">
              {product.title}
            </h1>
            {product.hindi_title && (
              <p className="font-devanagari text-base text-[#6B7263] mt-1">{product.hindi_title}</p>
            )}
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-[#24291F]">₹{product.price}</span>
            {product.original_price && (
              <span className="text-sm text-[#6B7263] line-through">₹{product.original_price}</span>
            )}
          </div>

          {product.description && (
            <p className="text-sm text-[#24291F] leading-relaxed">{product.description}</p>
          )}

          <AddToCartButton product={product} />

          <div className="bg-[#F4EEE1] rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-sm font-semibold text-[#24291F]">
              <CheckCircle2 className="w-4 h-4 text-[#3F7D46]" />
              <span>Lab Verification</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.lab_pesticide_ppm && (
                <div className="bg-white p-3 rounded-xl">
                  <div className="text-xs font-semibold text-[#6B7263]">Chemical Residue</div>
                  <div className="text-sm font-semibold text-[#3F7D46] flex items-center space-x-1 mt-1">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{product.lab_pesticide_ppm}</span>
                  </div>
                </div>
              )}
              {product.lab_purity_score && (
                <div className="bg-white p-3 rounded-xl">
                  <div className="text-xs font-semibold text-[#6B7263]">Purity Score</div>
                  <div className="text-sm font-semibold text-[#24291F] flex items-center space-x-1 mt-1">
                    <Award className="w-4 h-4 shrink-0 text-[#3F7D46]" />
                    <span>{product.lab_purity_score}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-[#E7E0CE]">
              {product.farm_origin && (
                <div className="flex items-center space-x-1.5 text-[#24291F]">
                  <MapPin className="w-3.5 h-3.5 text-[#6B7263]" />
                  <span><strong>Farm Origin:</strong> {product.farm_origin}</span>
                </div>
              )}
              {product.harvest_date && (
                <div className="flex items-center space-x-1.5 text-[#24291F]">
                  <Calendar className="w-3.5 h-3.5 text-[#6B7263]" />
                  <span><strong>Harvest Date:</strong> {product.harvest_date}</span>
                </div>
              )}
            </div>
            {product.batch_code && (
              <div className="text-xs font-mono text-[#6B7263] pt-1">Batch: {product.batch_code}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
