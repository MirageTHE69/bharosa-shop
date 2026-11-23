'use client';

import { startTransition, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';

// Shown inside the shop chrome when a page fails to load — most often because
// the database couldn't be reached (see DatabaseUnavailableError).
export default function ShopError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const retry = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#24291F]">
        We couldn&apos;t load this page
      </h1>
      <p className="mt-3 text-sm text-[#6B7263]">
        Our servers are taking longer than usual to respond. This is usually temporary, so please try again.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={retry}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2A5C31] hover:bg-[#1F4725] text-white font-semibold text-sm transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
        <Link href="/" className="text-sm font-semibold text-[#2A5C31] hover:underline">
          Go to homepage
        </Link>
      </div>
      {error.digest && <p className="mt-6 text-[11px] text-[#9AA093]">Reference: {error.digest}</p>}
    </div>
  );
}
