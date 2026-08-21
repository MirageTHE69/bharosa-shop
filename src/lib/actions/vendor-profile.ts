'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db/connect';
import { Vendor } from '@/lib/db/models/Vendor';
import type { ActionResult } from '@/lib/actions/auth';

export async function updateVendorProfile(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { error: 'You must be signed in.' };

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
  };

  if (!updates.name) return { error: 'Name is required.' };

  await connectDB();
  const result = await Vendor.findOneAndUpdate({ user_id: session.user.id }, updates);
  if (!result) return { error: 'No vendor profile found.' };

  revalidatePath('/vendor/profile');
  return {};
}
