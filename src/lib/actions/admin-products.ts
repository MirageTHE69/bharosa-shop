'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db/connect';
import { Product } from '@/lib/db/models/Product';
import { readProductFields } from '@/lib/actions/product-fields';
import type { ActionResult } from '@/lib/actions/auth';

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== 'admin') return { error: 'Admin access required.' as const };
  return { adminId: session.user.id };
}

// Admin can edit or remove any vendor's product — no ownership check, unlike
// the vendor-facing actions in vendor-products.ts.
export async function adminUpdateProduct(
  productId: string,
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const check = await requireAdmin();
  if ('error' in check) return { error: check.error };

  const fields = readProductFields(formData);
  if (!fields.title || !fields.category_id || !fields.price) {
    return { error: 'Title, category, and price are required.' };
  }

  await connectDB();
  const product = await Product.findByIdAndUpdate(productId, fields);
  if (!product) return { error: 'Product not found.' };

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/${productId}`);
  revalidatePath('/');
  revalidatePath(`/product/${product.slug}`);
  return {};
}

export async function adminDeleteProduct(productId: string): Promise<ActionResult> {
  const check = await requireAdmin();
  if ('error' in check) return { error: check.error };

  await connectDB();
  const product = await Product.findByIdAndDelete(productId);
  if (!product) return { error: 'Product not found.' };

  revalidatePath('/admin/products');
  revalidatePath('/');
  redirect('/admin/products');
}

export async function approveProduct(productId: string): Promise<ActionResult> {
  const check = await requireAdmin();
  if ('error' in check) return { error: check.error };

  await connectDB();
  const product = await Product.findByIdAndUpdate(productId, {
    status: 'approved',
    reviewed_at: new Date(),
    reviewed_by: check.adminId,
  });

  if (!product) return { error: 'Product not found.' };

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/${productId}`);
  return {};
}

export async function rejectProduct(
  productId: string,
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const check = await requireAdmin();
  if ('error' in check) return { error: check.error };

  const reason = String(formData.get('reason') ?? '').trim();
  if (!reason) return { error: 'Please provide a rejection reason.' };

  await connectDB();
  const product = await Product.findByIdAndUpdate(productId, {
    status: 'rejected',
    rejection_reason: reason,
    reviewed_at: new Date(),
    reviewed_by: check.adminId,
  });

  if (!product) return { error: 'Product not found.' };

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/${productId}`);
  return {};
}
