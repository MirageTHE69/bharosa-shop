import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { getAllCategories } from '@/lib/data/categories';
import { getApprovedProducts } from '@/lib/data/products';
import { getVerifiedVendors } from '@/lib/data/vendors';

// Rebuilt at most once an hour so newly approved products appear without a deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/farmer-agreement`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];

  // If the database is unreachable, still serve the static pages rather than a 500.
  const [categories, products, vendors] = await Promise.all([
    getAllCategories().catch(() => []),
    getApprovedProducts().catch(() => []),
    getVerifiedVendors().catch(() => []),
  ]);

  return [
    ...staticPages,
    ...categories.map((c) => ({
      url: `${SITE_URL}/category/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: `${SITE_URL}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...vendors.map((v) => ({
      url: `${SITE_URL}/farmer/${v.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
