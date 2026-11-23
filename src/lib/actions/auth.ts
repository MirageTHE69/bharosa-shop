'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from '@/lib/auth';
import { connectDB } from '@/lib/db/connect';
import { User } from '@/lib/db/models/User';

export interface ActionResult {
  error?: string;
}

const SERVER_TROUBLE = "We couldn't reach our servers just now. Please try again in a moment.";

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

  try {
    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return { error: 'An account with this email already exists.' };
    }

    const password_hash = await bcrypt.hash(password, 10);
    await User.create({ email, password_hash, full_name: fullName || null });
  } catch (err) {
    console.error('Sign-up failed:', err);
    return { error: SERVER_TROUBLE };
  }

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
  } catch (err) {
    // Only a rejected email/password is the user's fault; anything else
    // (e.g. the database being briefly unreachable) must not say "invalid".
    if (err instanceof AuthError && err.type === 'CredentialsSignin') {
      return { error: 'Invalid email or password.' };
    }
    console.error('Sign-in failed:', err);
    return { error: SERVER_TROUBLE };
  }

  redirect(redirectTo || '/');
}

export async function signOut() {
  await nextAuthSignOut({ redirect: false });
  redirect('/');
}
