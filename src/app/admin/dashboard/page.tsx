import Link from 'next/link';
import { Users, Package, Clock } from 'lucide-react';
import { getAllVendors } from '@/lib/data/vendors';
import { getAllProductsForAdmin } from '@/lib/data/products';

export default async function AdminDashboardPage() {
  const [vendors, products] = await Promise.all([getAllVendors(), getAllProductsForAdmin()]);

  const pendingVendors = vendors.filter((v) => v.status === 'pending').length;
  const pendingProducts = products.filter((p) => p.status === 'pending_review').length;

  return (
    <div className="space-y-6">
      <h1 className="font-serif-display text-2xl font-bold text-[#24291F]">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Vendors" value={vendors.length} icon={Users} href="/admin/vendors" />
        <StatCard
          label="Pending Vendor Approvals"
          value={pendingVendors}
          icon={Clock}
          href="/admin/vendors?status=pending"
          highlight={pendingVendors > 0}
        />
        <StatCard
          label="Pending Product Reviews"
          value={pendingProducts}
          icon={Package}
          href="/admin/products?status=pending_review"
          highlight={pendingProducts > 0}
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  href,
  highlight,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  href: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block bg-white border rounded-2xl p-5 transition-colors ${
        highlight ? 'border-[#C4611E]' : 'border-[#E7E0CE] hover:border-[#24291F]/30'
      }`}
    >
      <Icon className={`w-5 h-5 mb-2 ${highlight ? 'text-[#C4611E]' : 'text-[#6B7263]'}`} />
      <div className="text-2xl font-bold text-[#24291F]">{value}</div>
      <div className="text-xs text-[#6B7263]">{label}</div>
    </Link>
  );
}
