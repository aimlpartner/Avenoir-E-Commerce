'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="py-20 sm:py-28 px-4 sm:px-8 max-w-xl mx-auto text-center space-y-6">
      <div className="flex justify-center">
        <BrandLogo variant="seal" />
      </div>

      <div className="space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900">
          Something went wrong.
        </h1>
        <p className="text-sm text-stone-500 font-serif">
          Please try again or return to the homepage.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#FB5601] hover:bg-[#D64500] text-white text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
        >
          <RotateCcw size={14} />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white text-xs font-semibold uppercase tracking-wider transition"
        >
          <Home size={14} className="text-[#FB5601]" />
          <span>Home</span>
        </Link>
      </div>
    </div>
  );
}
