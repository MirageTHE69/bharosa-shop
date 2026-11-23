'use client';

import { startTransition, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Fallback for routes outside the (shop) group: admin, vendor and auth pages.
export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif-display text-2xl font-bold text-[#24291F]">Something went wrong</h1>
        <p className="mt-3 text-sm text-[#6B7263]">
          This page couldn&apos;t load right now. Please try again in a moment.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => startTransition(() => { router.refresh(); reset(); })}
            className="px-5 py-2 rounded-full bg-[#2A5C31] hover:bg-[#1F4725] text-white font-semibold text-sm transition-colors"
          >
            Try again
          </button>
          <Link href="/" className="text-sm font-semibold text-[#2A5C31] hover:underline">
            Go to homepage
          </Link>
        </div>
        {error.digest && <p className="mt-6 text-[11px] text-[#9AA093]">Reference: {error.digest}</p>}
      </div>
    </div>
  );
}
