import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, Package, Home } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/vendors', label: 'Vendors', icon: Users },
  { href: '/admin/products', label: 'Products', icon: Package },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/auth/sign-in?redirect=/admin/dashboard');
  if (currentUser.profile.role !== 'admin') redirect('/');

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4]">
      <header className="border-b border-[#E7E0CE] bg-[#24291F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FBF9F4] p-0.5 shrink-0">
              <img src="/logo-icon.png" alt="" className="w-full h-full" />
            </div>
            <span className="font-serif-display text-lg font-bold text-white">
              Bharosa <span className="text-white/60 font-sans-body text-sm font-normal">Admin</span>
            </span>
          </Link>
          <Link href="/" className="text-sm text-white/70 hover:text-white flex items-center space-x-1.5">
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

        <div className="lg:col-span-9 space-y-6">{children}</div>
      </div>
    </div>
  );
}
