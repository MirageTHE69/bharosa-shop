// Domain types returned by src/lib/data/*.ts and src/lib/actions/*.ts.
// Backed by MongoDB/Mongoose (see src/lib/db/models/*.ts) — kept at this file
// path/name so the many existing `@/types/database` imports don't need to change.

export type ProfileRole = 'customer' | 'vendor' | 'admin';
export type VendorStatus = 'pending' | 'verified' | 'rejected';
export type ProductStatus = 'draft' | 'pending_review' | 'approved' | 'rejected';

export interface Profile {
  id: string;
  role: ProfileRole;
  full_name: string | null;
  phone: string | null;
}

export interface Category {
  id: string;
  slug: string;
  name_en: string;
  name_hi: string | null;
  description: string | null;
  image_url: string | null;
}

export interface Vendor {
  id: string;
  user_id: string;
  slug: string;
  name: string;
  hindi_name: string | null;
  location: string | null;
  state: string | null;
  certification: string | null;
  certification_id: string | null;
  certification_type: string | null;
  specialty: string | null;
  story: string | null;
  phone: string | null;
  avatar_url: string | null;
  farm_image_url: string | null;
  certification_doc_url: string | null;
  pesticide_free_score: string | null;
  rating: number;
  review_count: number;
  status: VendorStatus;
  rejection_reason: string | null;
  verified_at: string | null;
  verified_by: string | null;
}

export interface Product {
  id: string;
  vendor_id: string;
  category_id: string;
  slug: string;
  title: string;
  hindi_title: string | null;
  description: string | null;
  price: number;
  original_price: number | null;
  weight: string | null;
  image_url: string | null;
  badge: string | null;
  batch_code: string | null;
  lab_pesticide_ppm: string | null;
  lab_purity_score: string | null;
  harvest_date: string | null;
  farm_origin: string | null;
  rating: number;
  reviews: number;
  status: ProductStatus;
  rejection_reason: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
}

export interface ProductWithVendor extends Product {
  vendor: Pick<Vendor, 'id' | 'slug' | 'name' | 'status'>;
  category: Pick<Category, 'id' | 'slug' | 'name_en'>;
}
