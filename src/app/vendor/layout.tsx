import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, PlusCircle, UserCircle, Home } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { getOwnVendor } from '@/lib/data/vendors';

const navItems = [
  { href: '/vendor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/vendor/products', label: 'My Products', icon: Package },
  { href: '/vendor/products/new', label: 'Add Product', icon: PlusCircle },
  { href: '/vendor/profile', label: 'Profile', icon: UserCircle },
];

export default async function VendorLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/auth/sign-in?redirect=/vendor/dashboard');
  if (currentUser.profile.role !== 'vendor' && currentUser.profile.role !== 'admin') {
    redirect('/');
  }

  const vendor = await getOwnVendor(currentUser.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4]">
      <header className="border-b border-[#E7E0CE] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5">
            <img src="/logo-icon.png" alt="" className="w-9 h-9 shrink-0" />
            <span className="font-serif-display text-lg font-bold text-[#24291F]">
              Bharosa <span className="text-[#6B7263] font-sans-body text-sm font-normal">Vendor Panel</span>
            </span>
          </Link>
          <Link href="/" className="text-sm text-[#6B7263] hover:text-[#24291F] flex items-center space-x-1.5">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Store</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3">
          <nav className="bg-white border border-[#E7E0CE] rounded-2xl p-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-[#24291F] hover:bg-[#F4EEE1] transition-colors"
              >
                <item.icon className="w-4 h-4 text-[#6B7263]" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <div className="lg:col-span-9 space-y-6">
          {!vendor && (
            <div className="bg-[#F4EEE1] border border-[#E7E0CE] rounded-2xl p-5 text-sm text-[#24291F]">
              You haven&apos;t submitted a seller application yet. Use the &quot;Sell With Us&quot; button
              in the main navigation to register as a vendor.
            </div>
          )}

          {vendor && vendor.status === 'pending' && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800">
              <strong>Pending Verification.</strong> Our team is reviewing your application. You&apos;ll
              be able to add products once an admin verifies your account.
            </div>
          )}

          {vendor && vendor.status === 'rejected' && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-sm text-red-800">
              <strong>Application Rejected.</strong>{' '}
              {vendor.rejection_reason || 'Please contact support for details.'}
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}
