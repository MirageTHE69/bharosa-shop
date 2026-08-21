import { HomeClient } from '@/components/HomeClient';
import { getAllCategories } from '@/lib/data/categories';
import { getVerifiedVendors } from '@/lib/data/vendors';
import { getApprovedProducts } from '@/lib/data/products';

export default async function Home() {
  const [categories, vendors, featuredProducts] = await Promise.all([
    getAllCategories(),
    getVerifiedVendors(8),
    getApprovedProducts({ limit: 8 }),
  ]);

  return (
    <HomeClient categories={categories} vendors={vendors} featuredProducts={featuredProducts} />
  );
}
