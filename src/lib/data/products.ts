import { connectDB, rethrowIfDatabaseDown } from '@/lib/db/connect';
import { Product as ProductModel } from '@/lib/db/models/Product';
import { Category as CategoryModel } from '@/lib/db/models/Category';
import { Vendor as VendorModel } from '@/lib/db/models/Vendor';
import { serializeProduct, serializeProductWithVendor } from '@/lib/db/serialize';
import type { Product, ProductWithVendor, ProductStatus } from '@/types/database';

const VENDOR_POPULATE = { path: 'vendor_id', select: 'slug name status' };
const CATEGORY_POPULATE = { path: 'category_id', select: 'slug name_en' };

interface GetApprovedProductsOptions {
  categorySlug?: string;
  vendorSlug?: string;
  limit?: number;
}

// NOTE: this app has no DB-level row security (unlike the earlier Postgres/RLS
// version) — every read/write here must explicitly filter by status/ownership
// in code. This function always filters to approved products of verified
// vendors for the public storefront.
export async function getApprovedProducts(
  options: GetApprovedProductsOptions = {}
): Promise<ProductWithVendor[]> {
  try {
    const conn = await connectDB();
    if (!conn) return [];

    const filter: Record<string, unknown> = { status: 'approved' };

    if (options.categorySlug) {
      const category = await CategoryModel.findOne({ slug: options.categorySlug }).select('_id').lean();
      if (!category) return [];
      filter.category_id = category._id;
    }

    if (options.vendorSlug) {
      const vendor = await VendorModel.findOne({ slug: options.vendorSlug, status: 'verified' })
        .select('_id')
        .lean();
      if (!vendor) return [];
      filter.vendor_id = vendor._id;
    }

    let query = ProductModel.find(filter)
      .populate(VENDOR_POPULATE)
      .populate(CATEGORY_POPULATE)
      .sort({ createdAt: -1 });
    if (options.limit) query = query.limit(options.limit);

    const docs = await query.lean();
    // Public storefront must only ever show products whose vendor is verified.
    return docs
      .filter((d) => (d.vendor_id as unknown as { status: string } | null)?.status === 'verified')
      .map(serializeProductWithVendor);
  } catch (err) {
    rethrowIfDatabaseDown(err);
    console.error('Error fetching approved products:', err);
    return [];
  }
}

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Storefront search: matches every word of the query (in any order) against the
// product's titles, description and farm origin, or its category / farmer name.
// Same visibility rules as getApprovedProducts.
export async function searchApprovedProducts(query: string, limit = 48): Promise<ProductWithVendor[]> {
  const words = query.trim().split(/\s+/).filter(Boolean).slice(0, 6);
  if (words.length === 0) return [];

  try {
    const conn = await connectDB();
    if (!conn) return [];

    const wordClauses = await Promise.all(
      words.map(async (word) => {
        // Also match the singular, so "oils" finds "Mustard Oil".
        const forms = [word];
        if (word.length > 3 && /s$/i.test(word)) forms.push(word.slice(0, -1));
        const rx = new RegExp(forms.map(escapeRegex).join('|'), 'i');
        const [categoryIds, vendorIds] = await Promise.all([
          CategoryModel.find({ $or: [{ name_en: rx }, { name_hi: rx }, { slug: rx }] }).distinct('_id'),
          VendorModel.find({ status: 'verified', $or: [{ name: rx }, { hindi_name: rx }] }).distinct('_id'),
        ]);
        return {
          $or: [
            { title: rx },
            { hindi_title: rx },
            { description: rx },
            { farm_origin: rx },
            { category_id: { $in: categoryIds } },
            { vendor_id: { $in: vendorIds } },
          ],
        };
      })
    );

    const docs = await ProductModel.find({ status: 'approved', $and: wordClauses })
      .populate(VENDOR_POPULATE)
      .populate(CATEGORY_POPULATE)
      .sort({ rating: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    return docs
      .filter((d) => (d.vendor_id as unknown as { status: string } | null)?.status === 'verified')
      .map(serializeProductWithVendor);
  } catch (err) {
    rethrowIfDatabaseDown(err);
    console.error(`Error searching products for "${query}":`, err);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<ProductWithVendor | null> {
  try {
    const conn = await connectDB();
    if (!conn) return null;
    const doc = await ProductModel.findOne({ slug, status: 'approved' })
      .populate(VENDOR_POPULATE)
      .populate(CATEGORY_POPULATE)
      .lean();
    if (!doc) return null;
    if ((doc.vendor_id as unknown as { status: string } | null)?.status !== 'verified') return null;
    return serializeProductWithVendor(doc);
  } catch (err) {
    rethrowIfDatabaseDown(err);
    console.error(`Error fetching product by slug "${slug}":`, err);
    return null;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const conn = await connectDB();
    if (!conn) return null;
    const doc = await ProductModel.findById(id).lean().catch(() => null);
    return doc ? serializeProduct(doc) : null;
  } catch (err) {
    rethrowIfDatabaseDown(err);
    console.error(`Error fetching product by id "${id}":`, err);
    return null;
  }
}

export async function getOwnProducts(vendorId: string): Promise<Product[]> {
  try {
    const conn = await connectDB();
    if (!conn) return [];
    const docs = await ProductModel.find({ vendor_id: vendorId }).sort({ createdAt: -1 }).lean();
    return docs.map(serializeProduct);
  } catch (err) {
    rethrowIfDatabaseDown(err);
    console.error(`Error fetching own products for vendor "${vendorId}":`, err);
    return [];
  }
}

// Admin-only reads — no status/ownership restriction.
export async function getAllProductsForAdmin(status?: ProductStatus): Promise<ProductWithVendor[]> {
  try {
    const conn = await connectDB();
    if (!conn) return [];
    const filter = status ? { status } : {};
    const docs = await ProductModel.find(filter)
      .populate(VENDOR_POPULATE)
      .populate(CATEGORY_POPULATE)
      .sort({ createdAt: -1 })
      .lean();
    return docs.map(serializeProductWithVendor);
  } catch (err) {
    rethrowIfDatabaseDown(err);
    console.error('Error fetching admin products:', err);
    return [];
  }
}

export async function getProductByIdForAdmin(id: string): Promise<ProductWithVendor | null> {
  try {
    const conn = await connectDB();
    if (!conn) return null;
    const doc = await ProductModel.findById(id)
      .populate(VENDOR_POPULATE)
      .populate(CATEGORY_POPULATE)
      .lean()
      .catch(() => null);
    return doc ? serializeProductWithVendor(doc) : null;
  } catch (err) {
    rethrowIfDatabaseDown(err);
    console.error(`Error fetching admin product by id "${id}":`, err);
    return null;
  }
}
