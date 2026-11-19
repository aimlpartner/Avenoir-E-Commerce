'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, Check } from 'lucide-react';
import { MAIN_PRODUCTS, SPECIALTY_PRODUCTS } from '@/lib/products';
import { HERO_WALL_CLIPS } from '@/lib/apiaryVideos';
import ProductCard from '@/components/ProductCard';
import BrandLogo from '@/components/BrandLogo';
import ApiaryProofSection from '@/components/ApiaryProofSection';
import BeeFarmGallery from '@/components/BeeFarmGallery';
import LineupSlider from '@/components/LineupSlider';

export default function HomeClient() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* =========================================================================
          1. HERO — LIVE APIARY VIDEO BG + FULL PRODUCT RANGE MOSAIC
          ========================================================================= */}
      <section className="relative bg-[#111913] text-white border-b border-stone-800 px-4 sm:px-8 xl:px-12 2xl:px-16 overflow-hidden min-h-[560px] lg:min-h-[640px] flex items-center py-12 sm:py-16 lg:py-20">
        {/* Side-by-Side Live Apiary Video Wall */}
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 z-0"
        >
          {HERO_WALL_CLIPS.map((clip, idx) => (
            <div
              key={clip.id}
              className={`relative h-full w-full overflow-hidden border-r border-white/10 last:border-r-0 ${
                idx === 2 ? 'hidden sm:block' : idx > 2 ? 'hidden lg:block' : ''
              }`}
            >
              <video
                src={clip.videoUrl}
                poster={clip.posterUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover scale-102 opacity-75"
              />
            </div>
          ))}
        </div>

        {/* Contrast Scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-1 bg-gradient-to-r from-[#0D1711]/92 via-[#101D15]/80 to-[#0D1711]/70"
        />

        {/* Foreground Content */}
        <div className="relative z-10 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Product Range Summary & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-normal text-white tracking-tight leading-[1.06] drop-shadow-sm">
              Raw wildflower honey. <br />
              <span className="italic text-[#FB5601]">For every table &amp; occasion.</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-200 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              1/2 lb &amp; 1 lb jars, 3-jar combos, holiday editions, event favors, kids bear
              bottles, corporate glass, and monthly delivery — straight from Madisonville Apiary in
              Basking Ridge, NJ.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href="#main-products"
                className="py-3.5 px-8 rounded-md bg-[#FB5601] hover:bg-[#D64500] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition shadow-md active:scale-98"
              >
                Shop All Honey
              </a>

              <Link
                href="/products/SB-MONTHLY-SUB"
                prefetch={true}
                className="py-3.5 px-7 rounded-md bg-white/95 hover:bg-white text-stone-900 font-semibold text-xs sm:text-sm uppercase tracking-wider transition shadow-sm"
              >
                Monthly Club
              </Link>
            </div>
          </div>

          {/* Right Column: Clean 5-Photo Editorial Product Range Mosaic */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-2.5 sm:gap-3">
            {/* Left Stack: Everyday Jars + Event Favors */}
            <div className="col-span-5 flex flex-col gap-2.5 sm:gap-3">
              <Link
                href="/products/SB-JAR-SINGLE"
                prefetch={true}
                className="group relative aspect-5/6 w-full rounded-xl overflow-hidden bg-stone-900 shadow-lg"
                aria-label="Shop 1/2 lb and 1 lb Raw Wildflower Honey Jars"
              >
                <Image
                  src="/media/products/beeproduct_1lbs.jpeg"
                  alt="1 lb and 1/2 lb Singing Bee Wildflower Honey Jars"
                  fill
                  priority
                  sizes="(max-width: 1024px) 42vw, 22vw"
                  className="object-cover object-[50%_72%] group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <Link
                href="/products/SB-FAVOR-GIFTS"
                prefetch={true}
                className="group relative flex-1 min-h-[120px] sm:min-h-[150px] w-full rounded-xl overflow-hidden bg-stone-900 shadow-lg"
                aria-label="Shop Wedding, Party and Event Favor Gifts"
              >
                <Image
                  src="/media/products/beeproduct_favorgifting.jpeg"
                  alt="Mini honey favor jars for weddings and events"
                  fill
                  sizes="(max-width: 1024px) 42vw, 22vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
            </div>

            {/* Right Stack: Holiday Editions + Kids Bears + Corporate Glass */}
            <div className="col-span-7 flex flex-col gap-2.5 sm:gap-3">
              <Link
                href="/products/SB-HOLIDAY-BOX"
                prefetch={true}
                className="group relative aspect-16/11 w-full rounded-xl overflow-hidden bg-stone-900 shadow-lg"
                aria-label="Shop Holiday Special Gift Boxes"
              >
                <Image
                  src="/media/products/beeproduct_holidayedition4.jpeg"
                  alt="Thanksgiving, Christmas, and New Year honey gift jars"
                  fill
                  priority
                  sizes="(max-width: 1024px) 58vw, 30vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 flex-1">
                <Link
                  href="/products/SB-KIDS-BOTTLE"
                  prefetch={true}
                  className="group relative aspect-square lg:aspect-auto lg:min-h-[165px] w-full rounded-xl overflow-hidden bg-stone-900 shadow-lg"
                  aria-label="Shop Kids Honey Bear Bottles"
                >
                  <Image
                    src="/media/products/beeproduct_kids.jpeg"
                    alt="Kids honey bear squeeze bottles"
                    fill
                    sizes="(max-width: 1024px) 28vw, 15vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <Link
                  href="/corporate"
                  prefetch={true}
                  className="group relative aspect-square lg:aspect-auto lg:min-h-[165px] w-full rounded-xl overflow-hidden bg-stone-900 shadow-lg"
                  aria-label="Shop Personalized Corporate Gifting"
                >
                  <Image
                    src="/media/products/beeproduct_corporategifting.jpeg"
                    alt="Personalized corporate honey gift glass jar"
                    fill
                    sizes="(max-width: 1024px) 28vw, 15vw"
                    className="object-cover object-[50%_52%] group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MAIN 4 PRODUCTS (1 Jar, 3-Jar Combo, Gift Box, Monthly Subscription)
          ========================================================================= */}
      <section
        id="main-products"
        className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 scroll-mt-24 text-left"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-stone-200 pb-5">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Main Products
          </h2>
          <Link
            href="/shop"
            prefetch={true}
            className="text-xs sm:text-sm font-medium text-stone-700 hover:text-[#D64500] flex items-center gap-1.5 transition shrink-0 group font-serif"
          >
            <span>View All (7)</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MAIN_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. SPECIALTY LINEUP (Favor Gifts, Kids Bottles, Corporate Glass)
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-stone-200 pb-5">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
            Favors, Kids &amp; Corporate
          </h2>
          <Link
            href="/gifting"
            prefetch={true}
            className="text-xs sm:text-sm font-medium text-stone-700 hover:text-[#D64500] flex items-center gap-1.5 transition shrink-0 group font-serif"
          >
            <span>Gift Boxes &amp; Favors</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {SPECIALTY_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          3B. PRODUCT LINEUP SLIDER
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <LineupSlider />
      </section>

      {/* =========================================================================
          4. REAL APIARY VIDEO STRIP
          ========================================================================= */}
      <ApiaryProofSection />

      {/* =========================================================================
          5. REAL BEE FARM GALLERY (MASONRY)
          ========================================================================= */}
      <BeeFarmGallery />

      {/* =========================================================================
          6. SIMPLE HARVEST UPDATES SIGNUP
          ========================================================================= */}
      <section className="w-full bg-stone-100/80 border-t border-stone-200 py-14 sm:py-16 text-center">
        <div className="w-full max-w-xl mx-auto px-4 sm:px-8 space-y-3.5">
          <div className="flex justify-center">
            <BrandLogo variant="seal" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
            Fresh Harvest Alerts
          </h2>
          <p className="text-sm text-stone-500 font-serif">
            Get notified when new batches and holiday boxes are ready.
          </p>

          <div className="max-w-md mx-auto pt-1">
            {newsletterSuccess ? (
              <div className="p-4 rounded-md bg-[#142118] text-white flex items-center justify-center gap-2 text-xs font-semibold">
                <Check size={16} className="text-[#FB5601]" />
                <span>You&apos;re on the list!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-md border border-stone-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#FB5601] focus:border-[#FB5601]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-md bg-[#FB5601] hover:bg-[#D64500] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer whitespace-nowrap"
                >
                  Join List
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
