'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2 } from 'lucide-react';
import { HONEY_SUBCATEGORIES, BEEKEEPING_SUBCATEGORIES } from '@/lib/products';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Brand & Newsletter Highlight */}
      <div className="border-b border-slate-800/80 py-8 sm:py-12 px-4 sm:px-8 xl:px-12">
        <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="text-center md:text-left max-w-md">
            <div className="mb-2">
              <span className="font-serif text-2xl font-bold tracking-[0.18em] text-white block">
                AVENOIR
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Cold-extracted Sussex County raw honeys preserved in solid timber keepsake vaults, alongside master apiary gear and protective equipment.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/60 px-4 sm:px-5 py-3 rounded-xl border border-emerald-800">
                <CheckCircle2 size={16} />
                <span className="font-medium text-xs">You have been subscribed to our Seasonal Terroir Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md">
                <div className="relative w-full sm:w-72">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email for private reserves..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer shrink-0"
                >
                  Join Dispatch
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Directory Columns */}
      <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto py-8 sm:py-12 px-4 sm:px-8 xl:px-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 text-left">
        
        {/* Col 1: Honey Products */}
        <div className="space-y-3 col-span-1">
          <span className="text-xs uppercase tracking-wider text-slate-200 font-bold block">
            Honey Products
          </span>
          <ul className="space-y-2">
            <li>
              <Link href="/honey" prefetch={true} className="hover:text-amber-300 transition block">
                All Honey Reserves
              </Link>
            </li>
            {HONEY_SUBCATEGORIES.map((sub) => (
              <li key={sub.id}>
                <Link href={`/honey?sub=${sub.id}`} prefetch={true} className="hover:text-amber-300 transition block">
                  {sub.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2: Beekeeping Gear */}
        <div className="space-y-3 col-span-1">
          <span className="text-xs uppercase tracking-wider text-slate-200 font-bold block">
            Beekeeping Gear
          </span>
          <ul className="space-y-2">
            <li>
              <Link href="/beekeeping" prefetch={true} className="hover:text-amber-300 transition block">
                All Apiary Equipment
              </Link>
            </li>
            {BEEKEEPING_SUBCATEGORIES.map((sub) => (
              <li key={sub.id}>
                <Link href={`/beekeeping?sub=${sub.id}`} prefetch={true} className="hover:text-amber-300 transition block">
                  {sub.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Apiary Services */}
        <div className="space-y-3 col-span-1">
          <span className="text-xs uppercase tracking-wider text-slate-200 font-bold block">
            Apiary Services
          </span>
          <ul className="space-y-2">
            <li>
              <Link href="/services" prefetch={true} className="hover:text-amber-300 transition block">
                All Services Overview
              </Link>
            </li>
            <li>
              <Link href="/services/educate" prefetch={true} className="hover:text-amber-300 transition block">
                Educate & Academy
              </Link>
            </li>
            <li>
              <Link href="/services/bee-removal" prefetch={true} className="hover:text-amber-300 transition block">
                Humane Bee Removal
              </Link>
            </li>
            <li>
              <Link href="/services/beekeeping" prefetch={true} className="hover:text-amber-300 transition block">
                Estate Bee Keeping
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Atelier & Terroir Pages */}
        <div className="space-y-3 col-span-1">
          <span className="text-xs uppercase tracking-wider text-slate-200 font-bold block">
            The Atelier
          </span>
          <ul className="space-y-2">
            <li>
              <Link href="/terroir" prefetch={true} className="hover:text-amber-300 transition block">
                Botanical Terroir
              </Link>
            </li>
            <li>
              <Link href="/corporate" prefetch={true} className="hover:text-amber-300 transition block">
                Corporate Gifting
              </Link>
            </li>
            <li>
              <Link href="/cart" prefetch={true} className="hover:text-amber-300 transition block">
                Shopping Bag
              </Link>
            </li>
            <li>
              <Link href="/admin" prefetch={true} className="text-amber-400 hover:text-amber-200 transition font-semibold block flex items-center gap-1">
                <span>Atelier Admin Portal</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 5: Apiary Standards */}
        <div className="space-y-3 col-span-1">
          <span className="text-xs uppercase tracking-wider text-slate-200 font-bold block">
            Purity Standards
          </span>
          <ul className="space-y-2 text-slate-400">
            <li>Cold-Extracted ≤ 95°F</li>
            <li>Diastase Index Tested</li>
            <li>Zero Antibiotics or Syrups</li>
            <li>Sussex County Terroir</li>
            <li>FSC Sustainable Walnut</li>
          </ul>
        </div>

        {/* Col 6: Support & Atelier Location */}
        <div className="space-y-3 col-span-2 sm:col-span-1">
          <span className="text-xs uppercase tracking-wider text-slate-200 font-bold block">
            Atelier Headquarters
          </span>
          <p className="text-slate-400 leading-relaxed">
            Avenoir Estate & Honey Apiary<br />
            Kittatinny Ridge Trailways<br />
            Sussex County, NJ 07860
          </p>
          <div className="pt-2">
            <span className="block text-slate-200 font-medium">Bespoke Concierge</span>
            <span className="text-amber-400">concierge@avenoirhoney.com</span>
          </div>
        </div>

      </div>

      {/* Massive Editorial Brand Wordmark (Modern Luxury Aesthetic) */}
      <div className="w-full overflow-hidden border-t border-slate-800/80 pt-8 sm:pt-14 pb-2 sm:pb-6 select-none text-center relative">
        <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.35em] uppercase text-emerald-400/70 block mb-2 sm:mb-3">
            Sussex County Apiary &bull; Kittatinny Ridge Reserve
          </span>
          <span className="font-heading font-black tracking-[0.06em] sm:tracking-[0.12em] text-[15vw] 2xl:text-[235px] leading-[0.8] block bg-gradient-to-b from-slate-700/90 via-slate-800/60 to-slate-900/20 bg-clip-text text-transparent hover:from-amber-400/90 hover:via-amber-300/50 hover:to-slate-900/20 transition-all duration-700 cursor-default">
            AVENOIR
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/90 py-6 px-4 sm:px-8 xl:px-12 text-center sm:flex sm:justify-between sm:items-center w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} Avenoir Luxury Gifting LLC. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-3 sm:mt-0">
          <span className="hover:text-slate-400 cursor-pointer">Privacy Charter</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms of Gifting</span>
          <span className="hover:text-slate-400 cursor-pointer">Apiary Certification</span>
        </div>
      </div>

    </footer>
  );
}
