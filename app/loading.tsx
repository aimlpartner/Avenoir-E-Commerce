import React from 'react';

export default function Loading() {
  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto animate-pulse space-y-8">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-36 bg-slate-200/80 rounded-md" />
        <div className="h-10 w-72 sm:w-96 bg-slate-200/80 rounded-lg" />
        <div className="h-4 w-full max-w-lg bg-slate-200/60 rounded-md" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="aspect-square w-full rounded-xl bg-slate-200/70" />
            <div className="h-4 w-24 bg-slate-200/80 rounded-md" />
            <div className="h-6 w-3/4 bg-slate-200/80 rounded-md" />
            <div className="h-4 w-full bg-slate-200/60 rounded-md" />
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <div className="h-6 w-16 bg-slate-200/80 rounded-md" />
              <div className="h-9 w-20 bg-slate-200/80 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
