import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { searchApprovedProducts } from '@/lib/data/products';
import { getAllCategories } from '@/lib/data/categories';
import { ProductCard } from '@/components/ProductCard';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const q = (await searchParams).q?.trim();
  return {
    title: q ? `Search: ${q}` : 'Search',
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const q = ((await searchParams).q ?? '').trim().slice(0, 80);
  const [results, categories] = await Promise.all([
    q ? searchApprovedProducts(q) : Promise.resolve([]),
    getAllCategories(),
  ]);

  return (
    <div className="bg-[#FBF9F4] min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form action="/search" method="get" role="search" className="max-w-2xl">
          <label htmlFor="search-page-input" className="sr-only">Search products</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7263]" />
            <input
              id="search-page-input"
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search ghee, honey, turmeric, millets…"
              className="w-full pl-12 pr-28 py-3.5 rounded-full bg-white border border-[#E7E0CE] text-[#24291F] placeholder-[#6B7263] focus:outline-none focus:border-[#3F7D46]"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2 rounded-full bg-[#2A5C31] hover:bg-[#1F4725] text-white text-sm font-semibold transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-8 mb-6">
          {q ? (
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#24291F]">
              {results.length > 0
                ? `${results.length} ${results.length === 1 ? 'result' : 'results'} for “${q}”`
                : `No results for “${q}”`}
            </h1>
          ) : (
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#24291F]">Search our products</h1>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E7E0CE] rounded-2xl p-6 sm:p-8">
            <p className="text-sm text-[#6B7263]">
              {q
                ? 'Try a different word, check the spelling, or browse a category:'
                : 'Type a product, ingredient or farm name above, or browse a category:'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/category/${c.slug}`}
                  className="px-4 py-2 rounded-full bg-[#F4EEE1] hover:bg-[#2A5C31] hover:text-white text-sm font-medium text-[#24291F] transition-colors"
                >
                  {c.name_en}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
