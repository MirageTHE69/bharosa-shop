import { connectDB } from '@/lib/db/connect';
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
  await connectDB();

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
}

export async function getProductBySlug(slug: string): Promise<ProductWithVendor | null> {
  await connectDB();
  const doc = await ProductModel.findOne({ slug, status: 'approved' })
    .populate(VENDOR_POPULATE)
    .populate(CATEGORY_POPULATE)
    .lean();
  if (!doc) return null;
  if ((doc.vendor_id as unknown as { status: string } | null)?.status !== 'verified') return null;
  return serializeProductWithVendor(doc);
}

export async function getProductById(id: string): Promise<Product | null> {
  await connectDB();
  const doc = await ProductModel.findById(id).lean().catch(() => null);
  return doc ? serializeProduct(doc) : null;
}

export async function getOwnProducts(vendorId: string): Promise<Product[]> {
  await connectDB();
  const docs = await ProductModel.find({ vendor_id: vendorId }).sort({ createdAt: -1 }).lean();
  return docs.map(serializeProduct);
}

// Admin-only reads — no status/ownership restriction.
export async function getAllProductsForAdmin(status?: ProductStatus): Promise<ProductWithVendor[]> {
  await connectDB();
  const filter = status ? { status } : {};
  const docs = await ProductModel.find(filter)
    .populate(VENDOR_POPULATE)
    .populate(CATEGORY_POPULATE)
    .sort({ createdAt: -1 })
    .lean();
  return docs.map(serializeProductWithVendor);
}

export async function getProductByIdForAdmin(id: string): Promise<ProductWithVendor | null> {
  await connectDB();
  const doc = await ProductModel.findById(id)
    .populate(VENDOR_POPULATE)
    .populate(CATEGORY_POPULATE)
    .lean()
    .catch(() => null);
  return doc ? serializeProductWithVendor(doc) : null;
}
