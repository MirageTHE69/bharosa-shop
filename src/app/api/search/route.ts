import { NextResponse } from 'next/server';
import { searchApprovedProducts } from '@/lib/data/products';
import { getAllCategories } from '@/lib/data/categories';

export const dynamic = 'force-dynamic';

const SUGGESTION_LIMIT = 6;

// Instant-search suggestions for the header search box. The full results page
// (/search) uses the same matching rules via searchApprovedProducts.
export async function GET(request: Request) {
  const q = (new URL(request.url).searchParams.get('q') ?? '').trim().slice(0, 80);
  if (q.length < 2) {
    return NextResponse.json({ products: [], categories: [] });
  }

  try {
    const lower = q.toLowerCase();
    const [products, categories] = await Promise.all([
      searchApprovedProducts(q, SUGGESTION_LIMIT),
      getAllCategories(),
    ]);

    return NextResponse.json(
      {
        products: products.map((p) => ({
          slug: p.slug,
          title: p.title,
          hindiTitle: p.hindi_title,
          imageUrl: p.image_url,
          price: p.price,
          weight: p.weight,
          vendor: p.vendor.name,
        })),
        categories: categories
          .filter((c) => c.name_en.toLowerCase().includes(lower) || (c.name_hi ?? '').includes(q) || c.slug.includes(lower))
          .slice(0, 3)
          .map((c) => ({ slug: c.slug, name: c.name_en })),
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('Search suggestions failed:', err);
    return NextResponse.json({ error: 'unavailable', products: [], categories: [] }, { status: 503 });
  }
}
