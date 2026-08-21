import Link from 'next/link';
import { PlusCircle, ShieldCheck, Package, Clock, XCircle } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { getOwnVendor } from '@/lib/data/vendors';
import { getOwnProducts } from '@/lib/data/products';

export default async function VendorDashboardPage() {
  const currentUser = await getCurrentUser();
  const vendor = currentUser ? await getOwnVendor(currentUser.id) : null;
  const products = vendor ? await getOwnProducts(vendor.id) : [];

  const counts = {
    approved: products.filter((p) => p.status === 'approved').length,
    pending: products.filter((p) => p.status === 'pending_review').length,
    draft: products.filter((p) => p.status === 'draft').length,
    rejected: products.filter((p) => p.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif-display text-2xl font-bold text-[#24291F]">Dashboard</h1>
        <p className="text-sm text-[#6B7263] mt-1">
          {vendor ? `Welcome back, ${vendor.name}.` : 'Complete your seller application to get started.'}
        </p>
      </div>

      {vendor && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Live Products" value={counts.approved} icon={ShieldCheck} tone="green" />
          <StatCard label="Pending Review" value={counts.pending} icon={Clock} tone="amber" />
          <StatCard label="Drafts" value={counts.draft} icon={Package} tone="neutral" />
          <StatCard label="Rejected" value={counts.rejected} icon={XCircle} tone="red" />
        </div>
      )}

      {vendor?.status === 'verified' && (
        <Link
          href="/vendor/products/new"
          className="inline-flex items-center space-x-2 px-5 py-3 bg-[#C4611E] hover:bg-[#A84E15] text-white font-semibold text-sm rounded-xl transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add a New Product</span>
        </Link>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  tone: 'green' | 'amber' | 'neutral' | 'red';
}) {
  const toneClasses = {
    green: 'text-[#3F7D46]',
    amber: 'text-amber-600',
    neutral: 'text-[#6B7263]',
    red: 'text-red-600',
  }[tone];

  return (
    <div className="bg-white border border-[#E7E0CE] rounded-2xl p-4">
      <Icon className={`w-5 h-5 mb-2 ${toneClasses}`} />
      <div className="text-2xl font-bold text-[#24291F]">{value}</div>
      <div className="text-xs text-[#6B7263]">{label}</div>
    </div>
  );
}
