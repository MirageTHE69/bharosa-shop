import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getOwnVendor } from '@/lib/data/vendors';
import { VendorProfileForm } from '@/components/vendor/VendorProfileForm';

export default async function VendorProfilePage() {
  const currentUser = await getCurrentUser();
  const vendor = currentUser ? await getOwnVendor(currentUser.id) : null;

  if (!vendor) redirect('/vendor/dashboard');

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-serif-display text-2xl font-bold text-[#24291F]">Vendor Profile</h1>
      <VendorProfileForm vendor={vendor} />
    </div>
  );
}
