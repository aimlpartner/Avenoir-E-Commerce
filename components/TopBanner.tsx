'use client';

import React from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';

export default function TopBanner() {
  return (
    <aside
      aria-label="Announcement"
      className="bg-[#16220F] text-stone-200 text-xs py-2 border-b border-[#2B411D]"
    >
      <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 flex items-center justify-between gap-2 text-center md:text-left">
        <div className="flex items-center gap-2.5 mx-auto md:mx-0">
          <span className="w-6 h-6 rounded-full bg-white/95 p-0.5 border border-[#E4C024] flex items-center justify-center shrink-0">
            <BrandLogo variant="mark" className="w-5 h-5" />
          </span>
          <p className="font-serif tracking-wide text-xs text-stone-100">
            Raw Wildflower Honey &bull; Madisonville Apiary, Basking Ridge, NJ &bull; Free Shipping Over $60
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-stone-300 tracking-wider uppercase font-medium">
          <Link
            href="/products/SB-MONTHLY-SUB"
            prefetch={true}
            className="text-[#F0E454] hover:text-white transition underline underline-offset-2 font-semibold"
          >
            Monthly Club
          </Link>
          <span className="text-[#78B448]/60">&bull;</span>
          <Link
            href="/shop"
            prefetch={true}
            className="hover:text-[#F0E454] transition text-stone-200 font-medium"
          >
            Shop All
          </Link>
        </div>
      </div>
    </aside>
  );
}
