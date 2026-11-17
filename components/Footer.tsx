'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';

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
    <footer className="bg-[#100F0D] text-stone-400 text-xs border-t border-stone-800/80">
      <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3 max-w-sm">
            <Link href="/" prefetch={true} className="inline-block group">
              <BrandLogo variant="pill" theme="dark" />
            </Link>
            <p className="text-stone-400 font-serif leading-relaxed text-xs">
              Raw wildflower honey from Madisonville Apiary, Basking Ridge, NJ.
            </p>
            <p className="text-stone-500 font-serif text-xs">
              <a href="mailto:hello@singingbeehoney.com" className="text-stone-300 hover:text-[#FB5601] transition">hello@singingbeehoney.com</a>
            </p>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-stone-300 block">
              Shop
            </span>
            <ul className="space-y-2 font-serif text-xs">
              <li><Link href="/honey" prefetch={true} className="hover:text-[#FB5601] transition">Honey Reserves</Link></li>
              <li><Link href="/gifting" prefetch={true} className="hover:text-[#FB5601] transition">Gift Boxes</Link></li>
              <li><Link href="/beekeeping" prefetch={true} className="hover:text-[#FB5601] transition">Beekeeping Gear</Link></li>
              <li><Link href="/terroir" prefetch={true} className="hover:text-[#FB5601] transition">Botanical Terroir</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-stone-300 block">
              Services
            </span>
            <ul className="space-y-2 font-serif text-xs">
              <li><Link href="/gifting" prefetch={true} className="hover:text-[#FB5601] transition">Build a Box</Link></li>
              <li><Link href="/corporate" prefetch={true} className="hover:text-[#FB5601] transition">Corporate Gifting</Link></li>
              <li><Link href="/services/bee-removal" prefetch={true} className="hover:text-[#FB5601] transition">Bee Removal</Link></li>
              <li><Link href="/services/educate" prefetch={true} className="hover:text-[#FB5601] transition">Apiary Academy</Link></li>
              <li><Link href="/admin" prefetch={true} className="text-stone-500 hover:text-stone-300 transition">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Harvest Club */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-stone-300 block">
              Harvest Club
            </span>
            {newsletterSubscribed ? (
              <p className="text-[#FB5601] text-xs font-serif font-medium">You&apos;re on the list.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-[#FB5601] transition"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#FB5601] hover:bg-[#D64500] text-white text-xs font-semibold uppercase tracking-wider rounded transition cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800/80 py-5 px-4 sm:px-8 xl:px-12">
        <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500 font-serif">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-white/95 p-0.5 border border-[#FB5601]/60 flex items-center justify-center shrink-0">
              <BrandLogo variant="mark" className="w-5 h-5" />
            </span>
            <p>&copy; {new Date().getFullYear()} Singing Bee Wildflower Honey &bull; Basking Ridge, NJ.</p>
          </div>
          <div className="flex gap-6">
            <span className="hover:text-[#FB5601] cursor-pointer transition">Privacy</span>
            <span className="hover:text-[#FB5601] cursor-pointer transition">Terms</span>
            <span className="hover:text-[#FB5601] cursor-pointer transition">Provenance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
