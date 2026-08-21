import { ShopChrome } from '@/components/ShopChrome';
import { getCurrentUser } from '@/lib/auth';
import { getApprovedProducts } from '@/lib/data/products';

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  const verifyProducts = await getApprovedProducts({ limit: 8 }).catch(() => []);

  return (
    <ShopChrome
      user={currentUser ? { fullName: currentUser.profile.full_name, role: currentUser.profile.role } : null}
      verifyProducts={verifyProducts}
    >
      {children}
    </ShopChrome>
  );
}
