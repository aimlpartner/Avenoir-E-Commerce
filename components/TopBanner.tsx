'use client';

import React from 'react';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';
import { Sparkles, Megaphone, ShieldCheck } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

export default function TopBanner() {
  const { activeTicker } = useAdmin();

  const displayText = activeTicker?.text || 'Free gift wrap over $75 · Harvested at Madisonville Apiary, Basking Ridge, NJ';
  const linkLabel = activeTicker?.linkText || 'Build a Box';
  const linkUrl = activeTicker?.linkHref || '/gifting';

  return (
    <aside aria-label="Announcement" className="bg-[#141F18] text-stone-200 text-xs py-2 border-b border-[#233529]">
      <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 flex items-center justify-between gap-2 text-center md:text-left">
        <div className="flex items-center gap-2.5 mx-auto md:mx-0">
          <span className="w-6 h-6 rounded-full bg-white/95 p-0.5 border border-[#FB5601] flex items-center justify-center shrink-0">
            <BrandLogo variant="mark" className="w-5 h-5" />
          </span>
          {activeTicker?.type === 'seasonal' && <Sparkles size={13} className="text-[#FB5601] shrink-0" />}
          {activeTicker?.type === 'urgent' && <Megaphone size={13} className="text-[#FB5601] shrink-0" />}
          {activeTicker?.type === 'announcement' && <ShieldCheck size={13} className="text-[#FB5601] shrink-0" />}
          <p className="font-serif tracking-wide text-xs text-stone-200">
            {displayText}
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-stone-300 tracking-wider uppercase font-medium">
          <Link href={linkUrl} prefetch={true} className="text-[#FB5601] hover:text-white transition underline underline-offset-2 font-semibold">
            {linkLabel}
          </Link>
          <span className="text-stone-600">&bull;</span>
          <Link href="/admin" prefetch={true} className="hover:text-stone-100 transition text-stone-400 font-medium">
            Portal
          </Link>
        </div>
      </div>
    </aside>
  );
}
