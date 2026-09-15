'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className="py-20 sm:py-32 px-4 sm:px-8 max-w-xl mx-auto text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mx-auto border border-rose-200 shadow-xs">
        <AlertTriangle size={32} />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-rose-800 uppercase block">
          Telemetry Alert &bull; Atelier Exception
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          An Unexpected Interruption Occurred
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          The atelier interface encountered a temporary exception. Our diagnostic sensors have logged this incident.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition shadow-xs cursor-pointer"
        >
          <RotateCcw size={14} />
          <span>Retry Session</span>
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold uppercase tracking-wider transition shadow-2xs"
        >
          <Home size={14} />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
