import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug } from '@/lib/data/categories';
import { getApprovedProducts } from '@/lib/data/products';
import { ProductCard } from '@/components/ProductCard';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';
import { toMetaDescription } from '@/lib/site';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Deduplicates the lookup shared by generateMetadata and the page render.
const getCategory = cache(getCategoryBySlug);

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: 'Category not found' };

  const title = `${category.name_en} — Lab-Tested Organic`;
  const description = toMetaDescription(
    category.description,
    `Shop lab-tested organic ${category.name_en.toLowerCase()} direct from verified Indian farmers.`
  );
  return {
    title,
    description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title,
      description,
      url: `/category/${category.slug}`,
      images: category.image_url ? [{ url: category.image_url, alt: category.name_en }] : undefined,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = await getCategory(slug);
  if (!category) notFound();

  const products = await getApprovedProducts({ categorySlug: slug });

  return (
    <div className="bg-[#FBF9F4]">
      <div className="relative h-56 sm:h-64 bg-[#F4EEE1] overflow-hidden">
        <img
          src={category.image_url ?? DEFAULT_PRODUCT_IMAGE}
          alt={category.name_en}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24291F]/80 via-[#24291F]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 w-full">
          <Link href="/#categories" className="text-xs text-white/70 hover:text-white">
            ← All Categories
          </Link>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-white mt-1">
            {category.name_en}
          </h1>
          {category.name_hi && (
            <p className="font-devanagari text-base text-white/80 mt-1">{category.name_hi}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {category.description && (
          <p className="text-sm text-[#6B7263] max-w-2xl mb-8">{category.description}</p>
        )}

        {products.length === 0 ? (
          <p className="text-sm text-[#6B7263] bg-[#F4EEE1] rounded-3xl p-8 text-center">
            No verified products in this category yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
