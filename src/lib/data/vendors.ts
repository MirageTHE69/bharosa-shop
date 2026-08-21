import { connectDB } from '@/lib/db/connect';
import { Vendor as VendorModel } from '@/lib/db/models/Vendor';
import { serializeVendor } from '@/lib/db/serialize';
import type { Vendor, VendorStatus } from '@/types/database';

export async function getVerifiedVendors(limit?: number): Promise<Vendor[]> {
  await connectDB();
  let query = VendorModel.find({ status: 'verified' }).sort({ rating: -1 });
  if (limit) query = query.limit(limit);
  const docs = await query.lean();
  return docs.map(serializeVendor);
}

export async function getVendorBySlug(slug: string): Promise<Vendor | null> {
  await connectDB();
  const doc = await VendorModel.findOne({ slug, status: 'verified' }).lean();
  return doc ? serializeVendor(doc) : null;
}

export async function getOwnVendor(userId: string): Promise<Vendor | null> {
  await connectDB();
  const doc = await VendorModel.findOne({ user_id: userId }).lean();
  return doc ? serializeVendor(doc) : null;
}

// Admin-only reads.
export async function getAllVendors(status?: VendorStatus): Promise<Vendor[]> {
  await connectDB();
  const filter = status ? { status } : {};
  const docs = await VendorModel.find(filter).sort({ createdAt: -1 }).lean();
  return docs.map(serializeVendor);
}

export async function getVendorById(id: string): Promise<Vendor | null> {
  await connectDB();
  const doc = await VendorModel.findById(id).lean().catch(() => null);
  return doc ? serializeVendor(doc) : null;
}
