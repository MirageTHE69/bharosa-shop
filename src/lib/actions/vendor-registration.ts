'use server';

import bcrypt from 'bcryptjs';
import { auth, signIn as nextAuthSignIn, updateSession } from '@/lib/auth';
import { connectDB } from '@/lib/db/connect';
import { User } from '@/lib/db/models/User';
import { Vendor } from '@/lib/db/models/Vendor';
import { slugify } from '@/lib/slugify';
import type { ActionResult } from '@/lib/actions/auth';

export interface RegisterVendorResult extends ActionResult {
  success?: boolean;
  farmerName?: string;
  phone?: string;
}

export async function registerVendor(
  _prevState: RegisterVendorResult,
  formData: FormData
): Promise<RegisterVendorResult> {
  const farmerName = String(formData.get('farmerName') ?? '').trim();
  const farmLocation = String(formData.get('farmLocation') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const cropTypes = String(formData.get('cropTypes') ?? '').trim();
  const certificationType = String(formData.get('certificationType') ?? 'NPOP Organic');
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!farmerName || !farmLocation || !phone || !cropTypes) {
    return { error: 'Please fill in all required fields.' };
  }

  await connectDB();

  const session = await auth();
  let userId = session?.user?.id;

  if (!userId) {
    if (!email || !password) {
      return { error: 'Email and password are required to register as a seller.' };
    }
    if (password.length < 6) {
      return { error: 'Password must be at least 6 characters.' };
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return { error: 'An account with this email already exists. Please sign in first.' };
    }

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password_hash, full_name: farmerName, role: 'vendor' });
    userId = newUser._id.toString();

    await nextAuthSignIn('credentials', { email, password, redirect: false });
  } else {
    const existingVendor = await Vendor.findOne({ user_id: userId });
    if (existingVendor) {
      return { error: 'You already have a seller application on file.' };
    }
    await User.findByIdAndUpdate(userId, { role: 'vendor' });
    await updateSession({ user: { role: 'vendor' } });
  }

  const [location, state] = farmLocation.includes(',')
    ? farmLocation.split(',').map((s) => s.trim())
    : [farmLocation, null];

  let slug = slugify(farmerName);
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await Vendor.create({
        user_id: userId,
        slug,
        name: farmerName,
        location,
        state,
        certification_type: certificationType,
        specialty: cropTypes,
        phone,
        status: 'pending',
      });
      return { success: true, farmerName, phone };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.code === 11000) {
        if (err.message?.includes('user_id')) {
          return { error: 'You already have a seller application on file.' };
        }
        slug = `${slugify(farmerName)}-${Math.random().toString(36).slice(2, 6)}`;
        continue;
      }
      return { error: 'Something went wrong. Please try again.' };
    }
  }

  return { error: 'Something went wrong. Please try again.' };
}
