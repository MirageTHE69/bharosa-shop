'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db/connect';
import { Vendor } from '@/lib/db/models/Vendor';
import { Product } from '@/lib/db/models/Product';
import { slugify } from '@/lib/slugify';
import type { ActionResult } from '@/lib/actions/auth';

// No RLS in this stack — every ownership/status check below is the actual
// security boundary, not just a UX convenience. Be careful editing this file.
async function getOwnVerifiedVendor(): Promise<{ vendorId?: string; error?: string }> {
  const session = await auth();
  if (!session?.user?.id) return { error: 'You must be signed in.' };

  await connectDB();
  const vendor = await Vendor.findOne({ user_id: session.user.id }).select('_id status').lean();

  if (!vendor) return { error: 'No vendor profile found.' };
  if (vendor.status !== 'verified') {
    return { error: 'Your seller account is not verified yet — you cannot add products until an admin approves you.' };
  }
  return { vendorId: vendor._id.toString() };
}

function readProductFields(formData: FormData) {
  return {
    category_id: String(formData.get('categoryId') ?? ''),
    title: String(formData.get('title') ?? '').trim(),
    hindi_title: String(formData.get('hindiTitle') ?? '').trim() || null,
    description: String(formData.get('description') ?? '').trim() || null,
    price: Number(formData.get('price') ?? 0),
    original_price: formData.get('originalPrice') ? Number(formData.get('originalPrice')) : null,
    weight: String(formData.get('weight') ?? '').trim() || null,
    image_url: String(formData.get('imageUrl') ?? '').trim() || null,
    lab_pesticide_ppm: String(formData.get('labPesticidePpm') ?? '').trim() || null,
    lab_purity_score: String(formData.get('labPurityScore') ?? '').trim() || null,
    harvest_date: String(formData.get('harvestDate') ?? '').trim() || null,
    farm_origin: String(formData.get('farmOrigin') ?? '').trim() || null,
  };
}

export async function createProduct(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const { vendorId, error } = await getOwnVerifiedVendor();
  if (error) return { error };

  const fields = readProductFields(formData);
  if (!fields.title || !fields.category_id || !fields.price) {
    return { error: 'Title, category, and price are required.' };
  }

  let slug = slugify(fields.title);

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await Product.create({
        ...fields,
        vendor_id: vendorId,
        slug,
        status: 'pending_review',
        badge: 'Bharosa Verified',
      });
      revalidatePath('/vendor/products');
      return {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.code === 11000) {
        slug = `${slugify(fields.title)}-${Math.random().toString(36).slice(2, 6)}`;
        continue;
      }
      return { error: 'Could not save product. Please try again.' };
    }
  }

  return { error: 'Could not save product. Please try again.' };
}

export async function updateProduct(
  productId: string,
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { vendorId, error } = await getOwnVerifiedVendor();
  if (error) return { error };

  const fields = readProductFields(formData);
  if (!fields.title || !fields.category_id || !fields.price) {
    return { error: 'Title, category, and price are required.' };
  }

  const existing = await Product.findById(productId).select('vendor_id status').lean();
  if (!existing || existing.vendor_id.toString() !== vendorId) {
    return { error: 'Product not found.' };
  }

  await Product.findByIdAndUpdate(productId, {
    ...fields,
    // Editing an approved product sends it back for re-review.
    status: existing.status === 'approved' ? 'pending_review' : existing.status,
  });

  revalidatePath('/vendor/products');
  return {};
}

export async function deleteProduct(productId: string): Promise<ActionResult> {
  const { vendorId, error } = await getOwnVerifiedVendor();
  if (error) return { error };

  const existing = await Product.findById(productId).select('vendor_id status').lean();
  if (!existing || existing.vendor_id.toString() !== vendorId) {
    return { error: 'Product not found.' };
  }
  if (existing.status !== 'draft' && existing.status !== 'rejected') {
    return { error: 'Only draft or rejected products can be deleted.' };
  }

  await Product.findByIdAndDelete(productId);
  revalidatePath('/vendor/products');
  return {};
}
