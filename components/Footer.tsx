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
    <footer className="bg-[#11100E] text-stone-400 text-xs border-t border-stone-800">
      
      {/* Brand & Newsletter Highlight */}
      <div className="border-b border-stone-800/80 py-8 sm:py-12 px-4 sm:px-8 xl:px-12">
        <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="text-center md:text-left max-w-lg space-y-1.5">
            <div>
              <span className="font-serif text-2xl font-bold tracking-[0.18em] text-white block">
                MAISON AVENOIR
              </span>
            </div>
            <p className="text-stone-300 text-xs font-semibold leading-relaxed">
              Founding Harvest Club: Receive a complimentary tasting card and seasonal Sussex kitchen recipe when you join.
            </p>
            <p className="text-[#C5A265] text-[11px] leading-relaxed">
              Plus: First access to limited single-apiary reserve drops &amp; the launch-exclusive &ldquo;Three Jars, One Harvest Story&rdquo; sampler.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 text-stone-200 bg-[#142118] px-4 sm:px-5 py-3 rounded-md border border-[#223528]">
                <CheckCircle2 size={16} className="text-[#C5A265]" />
                <span className="font-medium text-xs">Welcome to the Founding Harvest Club. Your tasting card &amp; recipe are reserved.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md">
                <div className="relative w-full sm:w-72">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email for harvest gift..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-md bg-stone-900 border border-stone-700 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#C5A265]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-[#C5A265] hover:bg-[#B38E46] text-stone-950 font-bold text-xs transition cursor-pointer shrink-0 shadow-2xs"
                >
                  Join Harvest Club
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
          <span className="text-xs uppercase tracking-wider text-stone-200 font-bold block">
            Honey Products
          </span>
          <ul className="space-y-2">
            <li>
              <Link href="/honey" prefetch={true} className="hover:text-[#C5A265] transition block">
                All Honey Reserves
              </Link>
            </li>
            {HONEY_SUBCATEGORIES.map((sub) => (
              <li key={sub.id}>
                <Link href={`/honey?sub=${sub.id}`} prefetch={true} className="hover:text-[#C5A265] transition block">
                  {sub.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2: Beekeeping Gear */}
        <div className="space-y-3 col-span-1">
          <span className="text-xs uppercase tracking-wider text-stone-200 font-bold block">
            Beekeeping Gear
          </span>
          <ul className="space-y-2">
            <li>
              <Link href="/beekeeping" prefetch={true} className="hover:text-[#C5A265] transition block">
                All Apiary Equipment
              </Link>
            </li>
            {BEEKEEPING_SUBCATEGORIES.map((sub) => (
              <li key={sub.id}>
                <Link href={`/beekeeping?sub=${sub.id}`} prefetch={true} className="hover:text-[#C5A265] transition block">
                  {sub.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Apiary Services */}
        <div className="space-y-3 col-span-1">
          <span className="text-xs uppercase tracking-wider text-stone-200 font-bold block">
            Apiary Services
          </span>
          <ul className="space-y-2">
            <li>
              <Link href="/services" prefetch={true} className="hover:text-[#C5A265] transition block">
                All Services Overview
              </Link>
            </li>
            <li>
              <Link href="/services/educate" prefetch={true} className="hover:text-[#C5A265] transition block">
                Educate & Academy
              </Link>
            </li>
            <li>
              <Link href="/services/bee-removal" prefetch={true} className="hover:text-[#C5A265] transition block">
                Humane Bee Removal
              </Link>
            </li>
            <li>
              <Link href="/services/beekeeping" prefetch={true} className="hover:text-[#C5A265] transition block">
                Estate Bee Keeping
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Gifting & Atelier */}
        <div className="space-y-3 col-span-1">
          <span className="text-xs uppercase tracking-wider text-stone-200 font-bold block">
            Gifting &amp; Atelier
          </span>
          <ul className="space-y-2">
            <li>
              <Link href="/gifting" prefetch={true} className="text-[#C5A265] hover:text-white transition font-semibold block">
                Build Your Own Box
              </Link>
            </li>
            <li>
              <Link href="/gifting" prefetch={true} className="hover:text-[#C5A265] transition block">
                Curated Gift Bundles
              </Link>
            </li>
            <li>
              <Link href="/corporate" prefetch={true} className="hover:text-[#C5A265] transition block">
                Corporate Concierge
              </Link>
            </li>
            <li>
              <Link href="/terroir" prefetch={true} className="hover:text-[#C5A265] transition block">
                Botanical Terroir
              </Link>
            </li>
            <li>
              <Link href="/cart" prefetch={true} className="hover:text-[#C5A265] transition block">
                Shopping Bag
              </Link>
            </li>
            <li>
              <Link href="/admin" prefetch={true} className="text-[#C5A265] hover:text-[#E8D7B5] transition font-semibold flex items-center gap-1">
                <span>Atelier Admin Portal</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 5: Apiary Standards */}
        <div className="space-y-3 col-span-1">
          <span className="text-xs uppercase tracking-wider text-stone-200 font-bold block">
            Purity Standards
          </span>
          <ul className="space-y-2 text-stone-400">
            <li>Raw &amp; Minimally Handled</li>
            <li>Traceable Hive Passport</li>
            <li>Seasonal Small-Batch</li>
            <li>New Jersey Hives</li>
            <li>Zero Syrups or Blending</li>
          </ul>
        </div>

        {/* Col 6: Support & Atelier Location */}
        <div className="space-y-3 col-span-2 sm:col-span-1">
          <span className="text-xs uppercase tracking-wider text-stone-200 font-bold block">
            Honey House
          </span>
          <p className="text-stone-400 leading-relaxed">
            Maison Avenoir Honey House<br />
            Harvested across Sussex &amp; Morris Counties, NJ<br />
            New Jersey, USA
          </p>
          <div className="pt-2">
            <span className="block text-stone-200 font-medium">Customer &amp; Gift Inquiries</span>
            <span className="text-[#C5A265]">hello@maisonavenoir.com</span>
          </div>
        </div>

      </div>

      {/* Massive Editorial Brand Wordmark (Modern Luxury Aesthetic) */}
      <div className="w-full overflow-hidden border-t border-stone-800/80 pt-8 sm:pt-14 pb-2 sm:pb-6 select-none text-center relative">
        <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.35em] uppercase text-[#8C6B28] block mb-2 sm:mb-3">
            Made by New Jersey Bees &bull; Good for Your Pantry. Better When Shared.
          </span>
          <span className="font-heading font-black tracking-[0.06em] sm:tracking-[0.12em] text-[15vw] 2xl:text-[235px] leading-[0.8] block bg-gradient-to-b from-stone-700/90 via-stone-800/60 to-stone-900/20 bg-clip-text text-transparent hover:from-[#C5A265]/90 hover:via-[#C5A265]/40 hover:to-stone-900/20 transition-all duration-700 cursor-default">
            MAISON AVENOIR
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800/90 py-6 px-4 sm:px-8 xl:px-12 text-center sm:flex sm:justify-between sm:items-center w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto text-[11px] text-stone-500">
        <p>© {new Date().getFullYear()} Maison Avenoir Honey. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-3 sm:mt-0">
          <span className="hover:text-stone-300 cursor-pointer">Privacy Charter</span>
          <span className="hover:text-stone-300 cursor-pointer">Terms of Gifting</span>
          <span className="hover:text-stone-300 cursor-pointer">Hive Certification</span>
        </div>
      </div>

    </footer>
  );
}
