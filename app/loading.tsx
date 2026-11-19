import React from 'react';
import BrandLogo from '@/components/BrandLogo';

export default function Loading() {
  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      {/* Branded Singing Bee Loading Pulse */}
      <div className="flex items-center gap-3 pb-2">
        <BrandLogo variant="pill" />
        <span className="text-xs font-semibold uppercase tracking-wider text-[#D64500] animate-pulse">
          Loading...
        </span>
      </div>

      {/* Header skeleton */}
      <div className="space-y-3 animate-pulse">
        <div className="h-4 w-36 bg-stone-200/80 rounded-md" />
        <div className="h-10 w-72 sm:w-96 bg-stone-200/80 rounded-lg" />
        <div className="h-4 w-full max-w-lg bg-stone-200/60 rounded-md" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 animate-pulse">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="aspect-square w-full rounded-xl bg-stone-200/70" />
            <div className="h-4 w-24 bg-stone-200/80 rounded-md" />
            <div className="h-6 w-3/4 bg-stone-200/80 rounded-md" />
            <div className="h-4 w-full bg-stone-200/60 rounded-md" />
            <div className="flex justify-between items-center pt-4 border-t border-stone-100">
              <div className="h-6 w-16 bg-stone-200/80 rounded-md" />
              <div className="h-9 w-20 bg-stone-200/80 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
