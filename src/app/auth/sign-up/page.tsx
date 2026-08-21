'use client';

import React, { useActionState } from 'react';
import Link from 'next/link';
import { signUp, type ActionResult } from '@/lib/actions/auth';

const initialState: ActionResult = {};

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h1 className="font-serif-display text-2xl font-bold text-[#24291F]">Create Account</h1>
        <p className="text-sm text-[#6B7263]">Join Bharosa Shop.</p>
      </div>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#6B7263] mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            required
            placeholder="Your name"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
          />
        </div>

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
            minLength={6}
            placeholder="At least 6 characters"
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
          {isPending ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-sm text-[#6B7263]">
        Already have an account?{' '}
        <Link href="/auth/sign-in" className="text-[#3F7D46] font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
