'use client';

import React, { Suspense, useActionState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { signIn, type ActionResult } from '@/lib/actions/auth';

const initialState: ActionResult = {};

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? '/';
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h1 className="font-serif-display text-2xl font-bold text-[#24291F]">Sign In</h1>
        <p className="text-sm text-[#6B7263]">Welcome back to Bharosa Shop.</p>
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="redirect" value={redirectTo} />

        <div>
          <label className="block text-xs font-semibold text-[#6B7263] mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#6B7263] mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
          />
        </div>

        {state.error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-[#C4611E] hover:bg-[#A84E15] disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-colors"
        >
          {isPending ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-sm text-[#6B7263]">
        New here?{' '}
        <Link href="/auth/sign-up" className="text-[#3F7D46] font-semibold hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
