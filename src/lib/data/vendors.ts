import { connectDB } from '@/lib/db/connect';
import { Vendor as VendorModel } from '@/lib/db/models/Vendor';
import { serializeVendor } from '@/lib/db/serialize';
import type { Vendor, VendorStatus } from '@/types/database';

export async function getVerifiedVendors(limit?: number): Promise<Vendor[]> {
  try {
    const conn = await connectDB();
    if (!conn) return [];
    let query = VendorModel.find({ status: 'verified' }).sort({ rating: -1 });
    if (limit) query = query.limit(limit);
    const docs = await query.lean();
    return docs.map(serializeVendor);
  } catch (err) {
    console.error('Error fetching verified vendors:', err);
    return [];
  }
}

export async function getVendorBySlug(slug: string): Promise<Vendor | null> {
  try {
    const conn = await connectDB();
    if (!conn) return null;
    const doc = await VendorModel.findOne({ slug, status: 'verified' }).lean();
    return doc ? serializeVendor(doc) : null;
  } catch (err) {
    console.error(`Error fetching vendor by slug "${slug}":`, err);
    return null;
  }
}

export async function getOwnVendor(userId: string): Promise<Vendor | null> {
  try {
    const conn = await connectDB();
    if (!conn) return null;
    const doc = await VendorModel.findOne({ user_id: userId }).lean();
    return doc ? serializeVendor(doc) : null;
  } catch (err) {
    console.error(`Error fetching own vendor for user "${userId}":`, err);
    return null;
  }
}

// Admin-only reads.
export async function getAllVendors(status?: VendorStatus): Promise<Vendor[]> {
  try {
    const conn = await connectDB();
    if (!conn) return [];
    const filter = status ? { status } : {};
    const docs = await VendorModel.find(filter).sort({ createdAt: -1 }).lean();
    return docs.map(serializeVendor);
  } catch (err) {
    console.error('Error fetching all vendors:', err);
    return [];
  }
}

export async function getVendorById(id: string): Promise<Vendor | null> {
  try {
    const conn = await connectDB();
    if (!conn) return null;
    const doc = await VendorModel.findById(id).lean().catch(() => null);
    return doc ? serializeVendor(doc) : null;
  } catch (err) {
    console.error(`Error fetching vendor by ID "${id}":`, err);
    return null;
  }
}
