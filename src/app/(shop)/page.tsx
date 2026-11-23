import type { Metadata } from 'next';
import { HomeClient } from '@/components/HomeClient';
import { getAllCategories } from '@/lib/data/categories';
import { getVerifiedVendors } from '@/lib/data/vendors';
import { getApprovedProducts } from '@/lib/data/products';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default async function Home() {
  const [categories, vendors, products] = await Promise.all([
    getAllCategories(),
    getVerifiedVendors(8),
    getApprovedProducts({ limit: 60 }),
  ]);

  return (
    <HomeClient categories={categories} vendors={vendors} products={products} />
  );
}
