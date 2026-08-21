import type { Types } from 'mongoose';
import type { Category, Product, ProductWithVendor, Profile, Vendor } from '@/types/database';

type Id = Types.ObjectId | string | null | undefined;

function idStr(id: Id): string {
  return id ? id.toString() : '';
}

function idStrOrNull(id: Id): string | null {
  return id ? id.toString() : null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeUser(doc: any): Profile {
  return {
    id: idStr(doc._id),
    role: doc.role,
    full_name: doc.full_name ?? null,
    phone: doc.phone ?? null,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeCategory(doc: any): Category {
  return {
    id: idStr(doc._id),
    slug: doc.slug,
    name_en: doc.name_en,
    name_hi: doc.name_hi ?? null,
    description: doc.description ?? null,
    image_url: doc.image_url ?? null,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeVendor(doc: any): Vendor {
  return {
    id: idStr(doc._id),
    user_id: idStr(doc.user_id),
    slug: doc.slug,
    name: doc.name,
    hindi_name: doc.hindi_name ?? null,
    location: doc.location ?? null,
    state: doc.state ?? null,
    certification: doc.certification ?? null,
    certification_id: doc.certification_id ?? null,
    certification_type: doc.certification_type ?? null,
    specialty: doc.specialty ?? null,
    story: doc.story ?? null,
    phone: doc.phone ?? null,
    avatar_url: doc.avatar_url ?? null,
    farm_image_url: doc.farm_image_url ?? null,
    certification_doc_url: doc.certification_doc_url ?? null,
    pesticide_free_score: doc.pesticide_free_score ?? null,
    rating: doc.rating ?? 0,
    review_count: doc.review_count ?? 0,
    status: doc.status,
    rejection_reason: doc.rejection_reason ?? null,
    verified_at: doc.verified_at ? new Date(doc.verified_at).toISOString() : null,
    verified_by: idStrOrNull(doc.verified_by),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeProduct(doc: any): Product {
  return {
    id: idStr(doc._id),
    vendor_id: idStr(doc.vendor_id?._id ?? doc.vendor_id),
    category_id: idStr(doc.category_id?._id ?? doc.category_id),
    slug: doc.slug,
    title: doc.title,
    hindi_title: doc.hindi_title ?? null,
    description: doc.description ?? null,
    price: doc.price,
    original_price: doc.original_price ?? null,
    weight: doc.weight ?? null,
    image_url: doc.image_url ?? null,
    badge: doc.badge ?? null,
    batch_code: doc.batch_code ?? null,
    lab_pesticide_ppm: doc.lab_pesticide_ppm ?? null,
    lab_purity_score: doc.lab_purity_score ?? null,
    harvest_date: doc.harvest_date ?? null,
    farm_origin: doc.farm_origin ?? null,
    rating: doc.rating ?? 0,
    reviews: doc.reviews ?? 0,
    status: doc.status,
    rejection_reason: doc.rejection_reason ?? null,
    reviewed_at: doc.reviewed_at ? new Date(doc.reviewed_at).toISOString() : null,
    reviewed_by: idStrOrNull(doc.reviewed_by),
  };
}

// Expects vendor_id/category_id to be populated (not just ObjectId refs).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeProductWithVendor(doc: any): ProductWithVendor {
  return {
    ...serializeProduct(doc),
    vendor: {
      id: idStr(doc.vendor_id?._id),
      slug: doc.vendor_id?.slug,
      name: doc.vendor_id?.name,
      status: doc.vendor_id?.status,
    },
    category: {
      id: idStr(doc.category_id?._id),
      slug: doc.category_id?.slug,
      name_en: doc.category_id?.name_en,
    },
  };
}
