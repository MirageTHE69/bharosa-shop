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
