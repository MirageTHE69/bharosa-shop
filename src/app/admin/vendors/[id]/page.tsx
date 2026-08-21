import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ArrowLeft } from 'lucide-react';
import { getVendorById } from '@/lib/data/vendors';
import { TrustSealBadge } from '@/components/TrustSealBadge';
import { VendorApprovalActions } from '@/components/admin/VendorApprovalActions';
import { DEFAULT_VENDOR_AVATAR } from '@/lib/constants';
import type { VendorStatus } from '@/types/database';

const STATUS_STYLES: Record<VendorStatus, string> = {
  pending: 'bg-amber-50 text-amber-700',
  verified: 'bg-green-50 text-[#3F7D46]',
  rejected: 'bg-red-50 text-red-700',
};

interface AdminVendorDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminVendorDetailPage({ params }: AdminVendorDetailPageProps) {
  const { id } = await params;
  const vendor = await getVendorById(id);
  if (!vendor) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/vendors" className="text-sm text-[#6B7263] hover:text-[#24291F] flex items-center space-x-1.5">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Vendors</span>
      </Link>

      <div className="bg-white border border-[#E7E0CE] rounded-2xl p-6 space-y-5">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={vendor.avatar_url ?? DEFAULT_VENDOR_AVATAR}
              alt={vendor.name}
              className="w-16 h-16 rounded-2xl object-cover"
            />
            <div>
              <h1 className="font-serif-display text-xl font-bold text-[#24291F]">{vendor.name}</h1>
              {vendor.hindi_name && (
                <p className="font-devanagari text-sm text-[#6B7263]">{vendor.hindi_name}</p>
              )}
              <div className="text-xs text-[#6B7263] flex items-center space-x-1 mt-1">
                <MapPin className="w-3 h-3" />
                <span>{vendor.location}, {vendor.state}</span>
              </div>
            </div>
          </div>
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${STATUS_STYLES[vendor.status]}`}>
            {vendor.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm bg-[#F4EEE1] rounded-xl p-4">
          <div className="flex justify-between">
            <span className="text-[#6B7263]">Certification Type</span>
            <span className="text-[#24291F] font-medium">{vendor.certification_type ?? '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B7263]">Certification ID</span>
            <span className="text-[#24291F] font-mono font-medium">{vendor.certification_id ?? '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B7263]">Phone</span>
            <span className="text-[#24291F] font-medium">{vendor.phone ?? '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B7263]">Specialty</span>
            <span className="text-[#24291F] font-medium">{vendor.specialty ?? '—'}</span>
          </div>
        </div>

        {vendor.story && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7263] mb-1.5">Story</h2>
            <p className="text-sm text-[#24291F] leading-relaxed">{vendor.story}</p>
          </div>
        )}

        {vendor.rejection_reason && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-800">
            <strong>Previous rejection reason:</strong> {vendor.rejection_reason}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-[#E7E0CE]">
          <TrustSealBadge size="sm" />
        </div>

        {vendor.status !== 'verified' && (
          <div className="pt-4 border-t border-[#E7E0CE]">
            <VendorApprovalActions vendorId={vendor.id} />
          </div>
        )}
      </div>
    </div>
  );
}
