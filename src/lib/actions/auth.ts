'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from '@/lib/auth';
import { connectDB } from '@/lib/db/connect';
import { User } from '@/lib/db/models/User';

export interface ActionResult {
  error?: string;
}

export async function signUp(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');
  const fullName = String(formData.get('fullName') ?? '').trim();

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }
  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters.' };
  }

  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return { error: 'An account with this email already exists.' };
  }

  const password_hash = await bcrypt.hash(password, 10);
  await User.create({ email, password_hash, full_name: fullName || null });

  await nextAuthSignIn('credentials', { email, password, redirect: false });
  redirect('/');
}

export async function signIn(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');
  const redirectTo = String(formData.get('redirect') ?? '/');

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  try {
    await nextAuthSignIn('credentials', { email, password, redirect: false });
  } catch {
    return { error: 'Invalid email or password.' };
  }

  redirect(redirectTo || '/');
}

export async function signOut() {
  await nextAuthSignOut({ redirect: false });
  redirect('/');
}
