'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db/connect';
import { Vendor } from '@/lib/db/models/Vendor';
import type { ActionResult } from '@/lib/actions/auth';

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== 'admin') return { error: 'Admin access required.' as const };
  return { adminId: session.user.id };
}

// Admin can edit any vendor's full profile — including media and
// certification fields that vendors themselves cannot set.
export async function adminUpdateVendor(
  vendorId: string,
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const check = await requireAdmin();
  if ('error' in check) return { error: check.error };

  const updates = {
    name: String(formData.get('name') ?? '').trim(),
    hindi_name: String(formData.get('hindiName') ?? '').trim() || null,
    location: String(formData.get('location') ?? '').trim() || null,
    state: String(formData.get('state') ?? '').trim() || null,
    specialty: String(formData.get('specialty') ?? '').trim() || null,
    story: String(formData.get('story') ?? '').trim() || null,
    phone: String(formData.get('phone') ?? '').trim() || null,
    avatar_url: String(formData.get('avatarUrl') ?? '').trim() || null,
    farm_image_url: String(formData.get('farmImageUrl') ?? '').trim() || null,
    certification_type: String(formData.get('certificationType') ?? '').trim() || null,
    certification_id: String(formData.get('certificationId') ?? '').trim() || null,
  };

  if (!updates.name) return { error: 'Name is required.' };

  await connectDB();
  const vendor = await Vendor.findByIdAndUpdate(vendorId, updates);
  if (!vendor) return { error: 'Vendor not found.' };

  revalidatePath('/admin/vendors');
  revalidatePath(`/admin/vendors/${vendorId}`);
  revalidatePath('/');
  revalidatePath(`/farmer/${vendor.slug}`);
  return {};
}

export async function approveVendor(
  vendorId: string,
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const check = await requireAdmin();
  if ('error' in check) return { error: check.error };

  const certificationId = String(formData.get('certificationId') ?? '').trim();

  await connectDB();
  const vendor = await Vendor.findByIdAndUpdate(vendorId, {
    status: 'verified',
    verified_at: new Date(),
    verified_by: check.adminId,
    ...(certificationId ? { certification_id: certificationId } : {}),
  });

  if (!vendor) return { error: 'Vendor not found.' };

  revalidatePath('/admin/vendors');
  revalidatePath(`/admin/vendors/${vendorId}`);
  return {};
}

export async function rejectVendor(
  vendorId: string,
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const check = await requireAdmin();
  if ('error' in check) return { error: check.error };

  const reason = String(formData.get('reason') ?? '').trim();
  if (!reason) return { error: 'Please provide a rejection reason.' };

  await connectDB();
  const vendor = await Vendor.findByIdAndUpdate(vendorId, {
    status: 'rejected',
    rejection_reason: reason,
  });

  if (!vendor) return { error: 'Vendor not found.' };

  revalidatePath('/admin/vendors');
  revalidatePath(`/admin/vendors/${vendorId}`);
  return {};
}
