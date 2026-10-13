'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
      <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Brand Column with Small Logo */}
          <div className="lg:col-span-2 space-y-3.5 max-w-sm">
            <Link href="/" prefetch={true} className="inline-block">
              <span className="font-serif text-2xl font-normal tracking-[0.22em] text-white hover:text-[#C5A265] transition-colors">
                AVENOIR
              </span>
            </Link>
            <p className="text-stone-400 font-serif leading-relaxed text-xs">
              Raw, unheated single-origin honey harvested in Sussex County, New Jersey. Bottled in heavy French flint glass.
            </p>
            <p className="text-stone-500 font-serif text-xs pt-1">
              Inquiries: <a href="mailto:hello@maisonavenoir.com" className="text-stone-300 hover:text-[#C5A265] transition">hello@maisonavenoir.com</a>
            </p>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-stone-300 block">
              Shop
            </span>
            <ul className="space-y-2 font-serif text-xs">
              <li>
                <Link href="/honey" prefetch={true} className="hover:text-white transition">
                  Honey Reserves
                </Link>
              </li>
              <li>
                <Link href="/gifting" prefetch={true} className="hover:text-white transition">
                  Curated Gift Boxes
                </Link>
              </li>
              <li>
                <Link href="/beekeeping" prefetch={true} className="hover:text-white transition">
                  Beekeeping Gear
                </Link>
              </li>
              <li>
                <Link href="/terroir" prefetch={true} className="hover:text-white transition">
                  Botanical Terroir
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier & Services Column */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-stone-300 block">
              Atelier &amp; Services
            </span>
            <ul className="space-y-2 font-serif text-xs">
              <li>
                <Link href="/gifting" prefetch={true} className="hover:text-white transition">
                  Build Your Own Box
                </Link>
              </li>
              <li>
                <Link href="/corporate" prefetch={true} className="hover:text-white transition">
                  Corporate Concierge
                </Link>
              </li>
              <li>
                <Link href="/services/bee-removal" prefetch={true} className="hover:text-white transition">
                  Humane Bee Removal
                </Link>
              </li>
              <li>
                <Link href="/services/educate" prefetch={true} className="hover:text-white transition">
                  Apiary Academy
                </Link>
              </li>
              <li>
                <Link href="/admin" prefetch={true} className="text-stone-500 hover:text-stone-300 transition">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Harvest Society Newsletter Column */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-stone-300 block">
              Harvest Club
            </span>
            <p className="text-stone-400 font-serif text-xs leading-relaxed">
              Seasonal reserve allocations and tasting notes.
            </p>
            {newsletterSubscribed ? (
              <p className="text-[#C5A265] text-xs font-serif">Welcome to the harvest list.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-stone-600 transition"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium uppercase tracking-wider rounded transition cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Clean Minimal Bottom Bar */}
      <div className="border-t border-stone-800/80 py-6 px-4 sm:px-8 xl:px-12">
        <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500 font-serif">
          <p>© {new Date().getFullYear()} Avenoir Honey. Sussex County, New Jersey.</p>
          <div className="flex gap-6">
            <span className="hover:text-stone-400 cursor-pointer transition">Privacy</span>
            <span className="hover:text-stone-400 cursor-pointer transition">Terms</span>
            <span className="hover:text-stone-400 cursor-pointer transition">Provenance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
