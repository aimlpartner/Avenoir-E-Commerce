'use client';

import React from 'react';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';
import { Sparkles, Megaphone, ShieldCheck } from 'lucide-react';

export default function TopBanner() {
  const { activeTicker } = useAdmin();

  const displayText = activeTicker?.text || 'Founding Harvest Club: Complimentary tasting card & seasonal recipe with your first order · Free gift wrap over $75';
  const highlight = activeTicker?.highlightText || 'Value-Add Welcome';
  const linkLabel = activeTicker?.linkText || 'Join the Club';
  const linkUrl = activeTicker?.linkHref || '/gifting';

  return (
    <aside aria-label="Announcement" className="bg-[#064E3B] text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900/60 transition-colors">
      <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        <div className="flex items-center gap-2">
          {activeTicker?.type === 'seasonal' && <Sparkles size={14} className="text-amber-400 shrink-0" />}
          {activeTicker?.type === 'urgent' && <Megaphone size={14} className="text-amber-300 shrink-0" />}
          {activeTicker?.type === 'announcement' && <ShieldCheck size={14} className="text-emerald-300 shrink-0" />}
          <p className="font-serif tracking-wide text-xs">
            {displayText}
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-emerald-200 tracking-wider uppercase font-medium">
          <span>{highlight}</span>
          <span className="text-emerald-700/60">&bull;</span>
          <Link href={linkUrl} prefetch={true} className="hover:text-white transition underline underline-offset-2">
            {linkLabel}
          </Link>
          <span className="text-emerald-700/60">&bull;</span>
          <Link href="/admin" prefetch={true} className="hover:text-amber-300 transition text-amber-200/90 font-bold">
            Atelier Portal
          </Link>
        </div>
      </div>
    </aside>
  );
}
