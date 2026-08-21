import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { getAllVendors } from '@/lib/data/vendors';
import { DEFAULT_VENDOR_AVATAR } from '@/lib/constants';
import type { VendorStatus } from '@/types/database';

const STATUS_STYLES: Record<VendorStatus, string> = {
  pending: 'bg-amber-50 text-amber-700',
  verified: 'bg-green-50 text-[#3F7D46]',
  rejected: 'bg-red-50 text-red-700',
};

const FILTERS: { label: string; value: VendorStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Verified', value: 'verified' },
  { label: 'Rejected', value: 'rejected' },
];

interface AdminVendorsPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminVendorsPage({ searchParams }: AdminVendorsPageProps) {
  const { status } = await searchParams;
  const activeStatus = (status as VendorStatus | undefined) ?? undefined;

  const vendors = await getAllVendors(activeStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-serif-display text-2xl font-bold text-[#24291F]">Vendors</h1>
        <div className="flex items-center gap-1.5">
          {FILTERS.map((f) => (
            <Link
              key={f.value}
              href={f.value === 'all' ? '/admin/vendors' : `/admin/vendors?status=${f.value}`}
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

      {vendors.length === 0 ? (
        <div className="bg-white border border-[#E7E0CE] rounded-2xl p-10 text-center text-sm text-[#6B7263]">
          No vendors found.
        </div>
      ) : (
        <div className="bg-white border border-[#E7E0CE] rounded-2xl divide-y divide-[#E7E0CE]">
          {vendors.map((vendor) => (
            <Link
              key={vendor.id}
              href={`/admin/vendors/${vendor.id}`}
              className="p-4 flex items-center gap-4 hover:bg-[#F4EEE1]/50 transition-colors"
            >
              <img
                src={vendor.avatar_url ?? DEFAULT_VENDOR_AVATAR}
                alt={vendor.name}
                className="w-12 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#24291F] truncate">{vendor.name}</div>
                <div className="text-xs text-[#6B7263] flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{vendor.location}, {vendor.state}</span>
                </div>
              </div>
              <span className={`text-[11px] font-semibold px-2 py-1 rounded-full shrink-0 ${STATUS_STYLES[vendor.status]}`}>
                {vendor.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
