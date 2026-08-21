import { notFound } from 'next/navigation';
import { MapPin, Star } from 'lucide-react';
import { getVendorBySlug } from '@/lib/data/vendors';
import { getApprovedProducts } from '@/lib/data/products';
import { TrustSealBadge } from '@/components/TrustSealBadge';
import { ProductCard } from '@/components/ProductCard';
import { DEFAULT_FARM_IMAGE, DEFAULT_VENDOR_AVATAR } from '@/lib/constants';

interface FarmerPageProps {
  params: Promise<{ slug: string }>;
}

export default async function FarmerPage({ params }: FarmerPageProps) {
  const { slug } = await params;

  const vendor = await getVendorBySlug(slug);
  if (!vendor) notFound();

  const products = await getApprovedProducts({ vendorSlug: slug });

  return (
    <div className="bg-[#FBF9F4]">
      <div className="relative h-48 sm:h-56 bg-[#F4EEE1] overflow-hidden">
        <img
          src={vendor.farm_image_url ?? DEFAULT_FARM_IMAGE}
          alt={`${vendor.name} farm`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24291F]/80 via-[#24291F]/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 relative flex items-end space-x-4 pb-8">
          <img
            src={vendor.avatar_url ?? DEFAULT_VENDOR_AVATAR}
            alt={vendor.name}
            className="w-24 h-24 rounded-2xl border-4 border-[#FBF9F4] object-cover shadow-md"
          />
          <div className="pb-1">
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#24291F]">
              {vendor.name}
            </h1>
            {vendor.hindi_name && (
              <p className="font-devanagari text-sm text-[#6B7263]">{vendor.hindi_name}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16">
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-[#E7E0CE] rounded-2xl p-5 space-y-3">
              <TrustSealBadge size="md" />

              <div className="flex items-center space-x-1.5 text-sm text-[#6B7263]">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{vendor.location}, {vendor.state}</span>
              </div>

              <div className="flex items-center space-x-1.5 text-sm font-semibold text-[#24291F]">
                <Star className="w-4 h-4 text-[#C4611E] fill-current" />
                <span>{vendor.rating} rating · {vendor.review_count} reviews</span>
              </div>

              <div className="pt-3 border-t border-[#E7E0CE] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7263]">Specialty</span>
                  <span className="text-[#24291F] font-medium">{vendor.specialty}</span>
                </div>
                {vendor.certification && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7263]">Certification</span>
                    <span className="text-[#24291F] font-medium">{vendor.certification}</span>
                  </div>
                )}
                {vendor.certification_id && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7263]">Certificate ID</span>
                    <span className="text-[#24291F] font-mono font-medium">{vendor.certification_id}</span>
                  </div>
                )}
                {vendor.pesticide_free_score && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7263]">Pesticide Screening</span>
                    <span className="text-[#3F7D46] font-medium">{vendor.pesticide_free_score}</span>
                  </div>
                )}
              </div>
            </div>

            {vendor.story && (
              <div className="bg-white border border-[#E7E0CE] rounded-2xl p-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7263] mb-2">
                  Farmer Story
                </h2>
                <p className="text-sm text-[#24291F] leading-relaxed">{vendor.story}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            <h2 className="font-serif-display text-xl font-bold text-[#24291F] mb-5">
              Products from {vendor.name}
            </h2>

            {products.length === 0 ? (
              <p className="text-sm text-[#6B7263] bg-[#F4EEE1] rounded-2xl p-8 text-center">
                No live products yet from this farmer.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
