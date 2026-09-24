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
    <aside aria-label="Announcement" className="bg-[#141F18] text-stone-200 text-xs py-2 px-4 border-b border-[#233529] transition-colors">
      <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        <div className="flex items-center gap-2">
          {activeTicker?.type === 'seasonal' && <Sparkles size={13} className="text-[#C5A265] shrink-0" />}
          {activeTicker?.type === 'urgent' && <Megaphone size={13} className="text-[#D4B57A] shrink-0" />}
          {activeTicker?.type === 'announcement' && <ShieldCheck size={13} className="text-[#9DB8A1] shrink-0" />}
          <p className="font-serif tracking-wide text-xs text-stone-200">
            {displayText}
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-stone-300 tracking-wider uppercase font-medium">
          <span className="text-stone-300">{highlight}</span>
          <span className="text-stone-600">&bull;</span>
          <Link href={linkUrl} prefetch={true} className="text-[#D4B57A] hover:text-[#F4EEDF] transition underline underline-offset-2">
            {linkLabel}
          </Link>
          <span className="text-stone-600">&bull;</span>
          <Link href="/admin" prefetch={true} className="hover:text-stone-100 transition text-stone-400 font-medium">
            Atelier Portal
          </Link>
        </div>
      </div>
    </aside>
  );
}
