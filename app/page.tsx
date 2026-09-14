'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Droplets, 
  Shield, 
  ArrowRight, 
  Star, 
  ShoppingBag,
  Check,
  Gift
} from 'lucide-react';
import { PRODUCTS, ProductItem } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import TrustTestimonials from '@/components/TrustTestimonials';
import { useCart } from '@/context/CartContext';

export default function HomePage() {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState<boolean>(false);

  // 3 Core Spotlight Offerings
  const spotlightProducts: Record<'honey' | 'gear' | 'gifts', { product: ProductItem; tag: string }> = {
    honey: {
      product: PRODUCTS.find((p) => p.id === 'AV-JAR-APOTH') || PRODUCTS[2],
      tag: 'Raw Honey Reserve',
    },
    gear: {
      product: PRODUCTS.find((p) => p.id === 'AV-BEE-SUIT') || PRODUCTS[8],
      tag: 'Field-Tested Apparel',
    },
    gifts: {
      product: PRODUCTS.find((p) => p.id === 'AV-BOX-WALNUT') || PRODUCTS[0],
      tag: 'Executive Gift Trunk',
    },
  };

  const [activeSpotlight, setActiveSpotlight] = useState<'honey' | 'gear' | 'gifts'>('honey');
  const currentSpotlight = spotlightProducts[activeSpotlight];

  const handleQuickAdd = () => {
    addToCart(currentSpotlight.product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const honeyBestsellers = PRODUCTS.filter((p) => p.department === 'honey').slice(0, 4);
  const beeBestsellers = PRODUCTS.filter((p) => p.department === 'beekeeping').slice(0, 4);

  return (
    <div className="space-y-14 sm:space-y-20 pb-16">
      
      {/* 1. VISUAL-FIRST E-COMMERCE HERO */}
      <section className="relative bg-[#FAFBF9] border-b border-slate-200/80 px-4 sm:px-8 xl:px-12 2xl:px-16 pt-4 sm:pt-10 pb-10 sm:pb-16 overflow-hidden">
        
        {/* Relatable Sussex Apiary Background Image - Clearly Visible */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <Image
            src="https://images.unsplash.com/photo-1527334919515-b8dee906a34b?auto=format&fit=crop&q=85&w=2400"
            alt="Authentic Sussex Countryside Apiary with Wooden Beehives"
            fill
            priority
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="object-cover object-[center_35%] opacity-80 sm:opacity-85"
          />
          {/* Typographic Scrim Gradient: Clean contrast on left for copy, wide-open visibility on center and right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/20 sm:from-white/90 sm:via-white/55 sm:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/30 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FAFBF9]/80 to-transparent" />
        </div>

        <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-6 sm:space-y-8 relative z-10">
          
          {/* Top Trust Bar */}
          <div className="flex items-center justify-between gap-2 text-xs border-b border-slate-200/60 pb-2.5">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill="currentColor" />
                ))}
              </div>
              <span className="font-semibold text-slate-800 text-[11px] sm:text-xs">4.9 / 5</span>
              <span className="text-slate-400 text-[11px] hidden sm:inline">&bull; 800+ Verified Patrons</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Sussex County &bull; Active Harvest</span>
              </span>
              <span className="hidden md:inline text-slate-300">|</span>
              <span className="hidden md:inline">Same-Day Dispatch before 2 PM EST</span>
            </div>
          </div>

          {/* Main 2-Column Split: Short Punchy Copy & 3-Way Visual Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center text-left">
            
            {/* Left Column: Minimal, High-Impact Text with 3 Direct Actions */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-4 sm:space-y-6">
              
              <div className="space-y-2 sm:space-y-3">
                <span className="text-[11px] sm:text-sm font-bold tracking-widest text-emerald-800 uppercase block">
                  Artisanal Sussex Apiary
                </span>

                <h1 className="font-serif text-[28px] xs:text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-[1.12] sm:leading-[1.06] tracking-tight">
                  Raw Honey. Apiary Gear. <span className="text-amber-700 block sm:inline">Office Gifts.</span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl pt-0.5">
                  Cold-spun unheated honeys, commercial-grade beekeeping supplies, and handcrafted corporate presentation trunks.
                </p>
              </div>

              {/* 3 Quick-Shop Primary Buttons: Responsive 3-Column Grid on Mobile, Full Row on Tablet/Desktop */}
              <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3 pt-1">
                <Link
                  href="/honey"
                  prefetch={true}
                  className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 py-2.5 sm:py-3.5 px-2 sm:px-6 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider transition cursor-pointer shadow-sm hover:shadow-md group text-center min-h-[46px]"
                >
                  <Droplets size={16} strokeWidth={2.4} className="text-amber-400 shrink-0" />
                  <span>Shop Honey</span>
                  <ArrowRight size={14} strokeWidth={2.4} className="hidden sm:inline group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>

                <Link
                  href="/beekeeping"
                  prefetch={true}
                  className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 py-2.5 sm:py-3.5 px-2 sm:px-6 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 hover:border-emerald-700 font-bold text-[11px] sm:text-xs uppercase tracking-wider transition cursor-pointer shadow-2xs text-center min-h-[46px]"
                >
                  <Shield size={16} strokeWidth={2.4} className="text-emerald-800 shrink-0" />
                  <span>Shop Gear</span>
                </Link>

                <Link
                  href="/corporate"
                  prefetch={true}
                  className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 py-2.5 sm:py-3.5 px-2 sm:px-6 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 hover:border-amber-400 font-bold text-[11px] sm:text-xs uppercase tracking-wider transition cursor-pointer shadow-2xs text-center min-h-[46px]"
                >
                  <Gift size={16} strokeWidth={2.4} className="text-amber-800 shrink-0" />
                  <span>Office Gifts</span>
                </Link>
              </div>

              {/* Compact 3-Point Guarantee Ribbon */}
              <div className="grid grid-cols-3 divide-x divide-slate-200/90 bg-white/80 backdrop-blur-xs rounded-xl border border-slate-200/80 py-2 sm:py-2.5 px-1 sm:px-3 text-center shadow-2xs">
                <div className="px-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-semibold text-slate-700">
                  <Check size={12} className="text-emerald-700 shrink-0" />
                  <span className="truncate">Free ship $150+</span>
                </div>
                <div className="px-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-semibold text-slate-700">
                  <Check size={12} className="text-emerald-700 shrink-0" />
                  <span className="truncate">Cold-spun &le; 95&deg;F</span>
                </div>
                <div className="px-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-semibold text-slate-700">
                  <Check size={12} className="text-emerald-700 shrink-0" />
                  <span className="truncate">Volume tiers</span>
                </div>
              </div>

            </div>

            {/* Right Column: Image-First 3-Pillar Spotlight Card (Optimized for Mobile Viewports) */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end w-full">
              <div className="w-full max-w-lg lg:max-w-md xl:max-w-lg bg-white rounded-2xl border border-slate-200/90 shadow-md p-3.5 sm:p-5 space-y-3 sm:space-y-4 relative hover:shadow-lg transition-shadow">
                
                {/* Visual Category Switcher Tabs */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 sm:pb-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Quick Preview
                  </span>
                  
                  <div className="flex items-center gap-1 p-0.5 sm:p-1 bg-slate-100 rounded-lg text-xs font-semibold">
                    <button
                      onClick={() => setActiveSpotlight('honey')}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md transition cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs ${
                        activeSpotlight === 'honey'
                          ? 'bg-white text-emerald-950 font-bold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Droplets size={13} strokeWidth={2.4} className="text-amber-600" />
                      <span>Honey</span>
                    </button>

                    <button
                      onClick={() => setActiveSpotlight('gear')}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md transition cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs ${
                        activeSpotlight === 'gear'
                          ? 'bg-white text-emerald-950 font-bold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Shield size={13} strokeWidth={2.4} className="text-emerald-700" />
                      <span>Gear</span>
                    </button>

                    <button
                      onClick={() => setActiveSpotlight('gifts')}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md transition cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs ${
                        activeSpotlight === 'gifts'
                          ? 'bg-white text-emerald-950 font-bold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Gift size={13} strokeWidth={2.4} className="text-amber-700" />
                      <span>Gifts</span>
                    </button>
                  </div>
                </div>

                {/* Instant Product Photo - Unmistakable Visual Understanding */}
                <Link 
                  href={activeSpotlight === 'gifts' ? '/corporate' : `/products/${currentSpotlight.product.id}`}
                  prefetch={true}
                  className="block relative aspect-[16/10] sm:aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-100 group cursor-pointer"
                >
                  <Image
                    key={currentSpotlight.product.id}
                    src={currentSpotlight.product.imageUrl}
                    alt={currentSpotlight.product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    priority
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                    <span className="bg-emerald-950/90 text-amber-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md backdrop-blur-xs shadow-xs">
                      {currentSpotlight.tag}
                    </span>
                  </div>

                  {/* Stock Tag */}
                  <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-white/95 backdrop-blur-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-mono text-emerald-800 font-semibold shadow-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-600"></span>
                    <span>Ready to Ship</span>
                  </div>
                </Link>

                {/* Product Meta */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-amber-500">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                    <span className="font-semibold text-slate-800 text-[11px] sm:text-xs">{currentSpotlight.product.rating}</span>
                    <span className="text-slate-400 text-[11px] sm:text-xs">({currentSpotlight.product.reviewsCount} reviews)</span>
                  </div>

                  <Link
                    href={activeSpotlight === 'gifts' ? '/corporate' : `/products/${currentSpotlight.product.id}`}
                    prefetch={true}
                    className="block font-serif text-base sm:text-xl font-bold text-slate-900 hover:text-emerald-900 transition leading-snug cursor-pointer pt-0.5 truncate"
                  >
                    {currentSpotlight.product.name}
                  </Link>
                  
                  <p className="text-xs sm:text-sm text-slate-500 line-clamp-1 leading-relaxed">
                    {currentSpotlight.product.subtitle}
                  </p>
                </div>

                {/* Single Direct Action Button */}
                <div className="pt-0.5">
                  <button
                    onClick={handleQuickAdd}
                    disabled={justAdded}
                    className={`w-full py-2.5 sm:py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-xs min-h-[44px] ${
                      justAdded
                        ? 'bg-emerald-800 text-white'
                        : 'bg-emerald-900 hover:bg-emerald-800 text-white hover:shadow-md'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check size={15} className="text-emerald-300" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={15} className="text-amber-400" />
                        <span>Add to Bag &bull; ${currentSpotlight.product.price.toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. IMAGE-DOMINATED 3 DEPARTMENTS BENTO (Zero Fluff, Instant Visuals) */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-1.5 sm:space-y-2">
          <span className="text-[11px] sm:text-sm font-bold tracking-widest text-emerald-800 uppercase block">
            Sussex County Apiary
          </span>
          <h2 className="font-serif text-2xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Shop By Department
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Choose a collection to view full assortments, field testing, and availability.
          </p>
        </div>

        {/* 3 Large Visual Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-left">
          
          {/* 1. Honey Department Card */}
          <Link
            href="/honey"
            prefetch={true}
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
          >
            {/* Visual Photo (Clear, Unmistakable Honey) */}
            <div className="relative aspect-[16/10] sm:aspect-4/3 w-full bg-slate-100 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=800"
                alt="Raw Honey Terroirs"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-emerald-950/90 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                  Raw Honey &amp; Comb
                </span>
              </div>
            </div>

            {/* Clean, Low-Text Footer */}
            <div className="p-4 sm:p-6 flex items-center justify-between gap-3 bg-white">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-900 transition">
                  Raw Honey Products
                </h3>
                <span className="text-xs text-slate-500">Single-origin jars from $42</span>
              </div>
              <span className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition shrink-0">
                <ArrowRight size={18} />
              </span>
            </div>
          </Link>

          {/* 2. Beekeeping Department Card */}
          <Link
            href="/beekeeping"
            prefetch={true}
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
          >
            {/* Visual Photo (Clear, Unmistakable Beekeeping Gear) */}
            <div className="relative aspect-[16/10] sm:aspect-4/3 w-full bg-slate-100 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1535914254981-b5012eebbd15?auto=format&fit=crop&q=80&w=800"
                alt="Beekeeping Supplies"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-emerald-950/90 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                  Apiary Hardware
                </span>
              </div>
            </div>

            {/* Clean, Low-Text Footer */}
            <div className="p-4 sm:p-6 flex items-center justify-between gap-3 bg-white">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-900 transition">
                  Beekeeping Supplies
                </h3>
                <span className="text-xs text-slate-500">Ventilated suits &amp; tools from $34</span>
              </div>
              <span className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition shrink-0">
                <ArrowRight size={18} />
              </span>
            </div>
          </Link>

          {/* 3. Office Gifts Department Card */}
          <Link
            href="/corporate"
            prefetch={true}
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
          >
            {/* Visual Photo (Clear, Unmistakable Luxury Wooden Gift Box) */}
            <div className="relative aspect-[16/10] sm:aspect-4/3 w-full bg-slate-100 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
                alt="Office & Corporate Gifting"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-emerald-950/90 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                  Office &amp; Client Gifts
                </span>
              </div>
            </div>

            {/* Clean, Low-Text Footer */}
            <div className="p-4 sm:p-6 flex items-center justify-between gap-3 bg-white">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-900 transition">
                  Executive Gift Vaults
                </h3>
                <span className="text-xs text-slate-500">Custom brass engraving &bull; Volume tiers</span>
              </div>
              <span className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition shrink-0">
                <ArrowRight size={18} />
              </span>
            </div>
          </Link>

        </div>
      </section>

      {/* 3. FEATURED HONEY PRODUCTS */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 space-y-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-emerald-800 uppercase block mb-1">
              From The Honey Apiary
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Curated Honey Bestsellers
            </h2>
          </div>
          <Link
            href="/honey"
            prefetch={true}
            className="text-xs font-bold text-emerald-900 hover:text-emerald-700 flex items-center gap-1 transition"
          >
            <span>View All Honey Products</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {honeyBestsellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. FEATURED BEEKEEPING SUPPLIES */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 space-y-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-emerald-800 uppercase block mb-1">
              Field-Tested Hardware
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Apiary Essentials &amp; Gear
            </h2>
          </div>
          <Link
            href="/beekeeping"
            prefetch={true}
            className="text-xs font-bold text-emerald-900 hover:text-emerald-700 flex items-center gap-1 transition"
          >
            <span>View All Beekeeping Gear</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {beeBestsellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. TERROIR & MICROCLIMATE SPOTLIGHT */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-10 lg:p-14 border border-slate-800 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center text-left relative overflow-hidden">
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 relative z-10">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-amber-400 uppercase">
              Terroir Guide &bull; Sussex County
            </p>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              The Chemistry of Elevation &amp; <span className="text-amber-300">Wild Terroirs</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-2xl">
              From the 1,400-foot Kittatinny Ridge where colonies gather honeydew and mountain aster, to acidic Pine Barrens cranberry bogs. Explore our interactive botanical flavor profiles and 2026 harvest calendar.
            </p>
            <div className="pt-2">
              <Link
                href="/terroir"
                prefetch={true}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider transition shadow-sm"
              >
                <span>Explore Terroir Profiles</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-4 relative z-10">
            <div className="p-3.5 sm:p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400">Purity Standard</span>
              <span className="font-serif text-base sm:text-xl font-bold block text-white">&le; 95&deg;F Hive Temp</span>
              <p className="text-[11px] sm:text-xs text-slate-400">Zero enzyme loss</p>
            </div>
            <div className="p-3.5 sm:p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400">Lab Analysis</span>
              <span className="font-serif text-base sm:text-xl font-bold block text-white">&gt; 28 DN Diastase</span>
              <p className="text-[11px] sm:text-xs text-slate-400">Certified active</p>
            </div>
            <div className="p-3.5 sm:p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400">Joinery</span>
              <span className="font-serif text-base sm:text-xl font-bold block text-white">American Walnut</span>
              <p className="text-[11px] sm:text-xs text-slate-400">Beeswax buffed</p>
            </div>
            <div className="p-3.5 sm:p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400">Protection</span>
              <span className="font-serif text-base sm:text-xl font-bold block text-white">3-Layer Air Mesh</span>
              <p className="text-[11px] sm:text-xs text-slate-400">Zero sting penetration</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRUST & VERIFIED PATRON TESTIMONIALS */}
      <TrustTestimonials />

      {/* 7. CORPORATE CONCIERGE BANNER */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <div className="bg-gradient-to-r from-amber-50 via-emerald-50/50 to-amber-50 rounded-2xl p-5 sm:p-10 lg:p-14 border border-amber-200/80 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-left">
          <div className="space-y-2 sm:space-y-3 max-w-2xl">
            <p className="text-[11px] font-bold text-amber-900 uppercase tracking-[0.2em]">
              Executive Gifting Concierge
            </p>
            <h3 className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Heirloom Corporate Presentation Trunks
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Order customized timber honey chests engraved with your company&apos;s custom brass plaque. Save up to 25% on volume tiers with automated multi-address CSV recipient dispatch.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/corporate"
              prefetch={true}
              className="px-6 py-3.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition text-center shadow-xs"
            >
              Calculate Volume Savings →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
