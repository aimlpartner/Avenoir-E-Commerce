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

export default function HomeClient() {
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
      
      {/* 1. VISUAL-FIRST LUXURY SINGLE-VIEWPORT HERO */}
      <section className="relative bg-[#FAFBF9] border-b border-slate-200/80 px-4 sm:px-8 xl:px-12 2xl:px-16 flex flex-col justify-between overflow-hidden lg:h-[calc(100vh-105px)] lg:max-h-[calc(100vh-105px)] py-3 sm:py-5">
        
        {/* Relatable Sussex Apiary Background Image - Rich, Crisp & Properly Visible */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <Image
            src="/images/hero-apiary-landscape.jpg"
            alt="Authentic Sussex Countryside Apiary with Wooden Beehives"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] opacity-95"
          />
          {/* Subtle Typographic Scrim Gradient: High contrast for left copy while keeping countryside panoramic & vivid */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAFBF9]/95 via-[#FAFBF9]/80 to-transparent sm:from-[#FAFBF9]/90 sm:via-[#FAFBF9]/60 sm:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAFBF9] via-[#FAFBF9]/40 to-transparent" />
        </div>

        <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto flex flex-col justify-between h-full relative z-10 gap-3 sm:gap-4">
          
          {/* Top Trust & Live Harvest Bar */}
          <div className="flex items-center justify-between gap-2 text-xs border-b border-slate-300/60 pb-2 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill="currentColor" />
                ))}
              </div>
              <span className="font-bold text-slate-900 text-[11px] sm:text-xs">4.9 / 5</span>
              <span className="text-slate-500 text-[11px] hidden sm:inline">&bull; First Harvest Reviews</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-slate-700">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>New Jersey Hives &bull; Active Seasonal Harvest</span>
              </span>
              <span className="hidden md:inline text-slate-300">|</span>
              <span className="hidden md:inline">Free Shipping Over $60 &bull; Local Pickup Available</span>
            </div>
          </div>

          {/* Main 2-Column Split: Editorial Copy & Compact Interactive Spotlight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 xl:gap-14 items-center text-left my-auto">
            
            {/* Left Column: Refined, Finished Editorial Typography with 3 Direct Actions */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-3.5 sm:space-y-4">
              
              <div className="space-y-1.5 sm:space-y-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-emerald-900 uppercase block">
                  Maison Avenoir Honey &bull; New Jersey Harvested
                </span>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.08] tracking-tight">
                  The taste of a <br className="hidden sm:inline" />
                  <span className="text-amber-800">New Jersey season.</span>
                </h1>

                <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-xl pt-0.5">
                  Small-batch honey harvested from our New Jersey hives, bottled with the story of the season still inside.
                </p>
              </div>

              {/* 3 Unified Quick-Shop Action Buttons */}
              <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5 pt-0.5">
                <Link
                  href="/honey"
                  prefetch={true}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 sm:px-5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider transition cursor-pointer shadow-sm hover:shadow-md group text-center"
                >
                  <Droplets size={14} strokeWidth={2.4} className="text-amber-400 shrink-0" />
                  <span>Shop the Harvest</span>
                  <ArrowRight size={13} strokeWidth={2.4} className="hidden sm:inline group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>

                <Link
                  href="/beekeeping"
                  prefetch={true}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 sm:px-5 rounded-xl bg-white/95 hover:bg-white text-slate-900 border border-slate-300 hover:border-emerald-800 font-bold text-[11px] sm:text-xs uppercase tracking-wider transition cursor-pointer shadow-2xs text-center"
                >
                  <Shield size={14} strokeWidth={2.4} className="text-emerald-800 shrink-0" />
                  <span>Beekeeping Gear</span>
                </Link>

                <Link
                  href="/corporate"
                  prefetch={true}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 sm:px-5 rounded-xl bg-amber-50/90 hover:bg-amber-100 text-amber-950 border border-amber-300 hover:border-amber-400 font-bold text-[11px] sm:text-xs uppercase tracking-wider transition cursor-pointer shadow-2xs text-center"
                >
                  <Gift size={14} strokeWidth={2.4} className="text-amber-800 shrink-0" />
                  <span>Send a Gift</span>
                </Link>
              </div>

            </div>

            {/* Right Column: Single-Viewport Compact Atelier Spotlight Card */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end w-full">
              <div className="w-full max-w-md lg:max-w-sm xl:max-w-md bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-lg p-3 sm:p-4 space-y-2.5 relative">
                
                {/* Visual Category Switcher Tabs */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                    Atelier Preview
                  </span>
                  
                  <div className="flex items-center gap-1 p-0.5 bg-slate-100/90 rounded-lg text-xs font-semibold">
                    <button
                      onClick={() => setActiveSpotlight('honey')}
                      className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] sm:text-[11px] ${
                        activeSpotlight === 'honey'
                          ? 'bg-white text-emerald-950 font-bold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Droplets size={12} strokeWidth={2.4} className="text-amber-600" />
                      <span>Honey</span>
                    </button>

                    <button
                      onClick={() => setActiveSpotlight('gear')}
                      className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] sm:text-[11px] ${
                        activeSpotlight === 'gear'
                          ? 'bg-white text-emerald-950 font-bold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Shield size={12} strokeWidth={2.4} className="text-emerald-700" />
                      <span>Gear</span>
                    </button>

                    <button
                      onClick={() => setActiveSpotlight('gifts')}
                      className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] sm:text-[11px] ${
                        activeSpotlight === 'gifts'
                          ? 'bg-white text-emerald-950 font-bold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Gift size={12} strokeWidth={2.4} className="text-amber-700" />
                      <span>Gifts</span>
                    </button>
                  </div>
                </div>

                {/* Compact Product Photo */}
                <Link 
                  href={activeSpotlight === 'gifts' ? '/corporate' : `/products/${currentSpotlight.product.id}`}
                  prefetch={true}
                  className="block relative aspect-[16/10] max-h-44 sm:max-h-48 w-full rounded-xl overflow-hidden bg-slate-100 group cursor-pointer"
                >
                  <Image
                    key={currentSpotlight.product.id}
                    src={currentSpotlight.product.imageUrl}
                    alt={currentSpotlight.product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    priority
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-emerald-950/90 text-amber-300 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-xs shadow-xs">
                      {currentSpotlight.tag}
                    </span>
                  </div>

                  {/* Stock Tag */}
                  <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono text-emerald-800 font-semibold shadow-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>Ready to Ship</span>
                  </div>
                </Link>

                {/* Product Meta */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-[11px] text-amber-500">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} fill="currentColor" />
                      ))}
                    </div>
                    <span className="font-semibold text-slate-800 text-[10px]">{currentSpotlight.product.rating}</span>
                    <span className="text-slate-400 text-[10px]">({currentSpotlight.product.reviewsCount})</span>
                  </div>

                  <Link
                    href={activeSpotlight === 'gifts' ? '/corporate' : `/products/${currentSpotlight.product.id}`}
                    prefetch={true}
                    className="block font-serif text-sm sm:text-base font-bold text-slate-900 hover:text-emerald-900 transition leading-tight cursor-pointer truncate"
                  >
                    {currentSpotlight.product.name}
                  </Link>
                  
                  <p className="text-[11px] text-slate-500 truncate leading-snug">
                    {currentSpotlight.product.subtitle}
                  </p>
                </div>

                {/* Single Direct Action Button */}
                <button
                  onClick={handleQuickAdd}
                  disabled={justAdded}
                  className={`w-full py-2 px-3 rounded-xl font-bold text-[11px] sm:text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs ${
                    justAdded
                      ? 'bg-emerald-800 text-white'
                      : 'bg-emerald-900 hover:bg-emerald-800 text-white hover:shadow-md'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check size={14} className="text-emerald-300" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} className="text-amber-400" />
                      <span>Add to Bag &bull; ${currentSpotlight.product.price.toFixed(2)}</span>
                    </>
                  )}
                </button>

              </div>
            </div>

          </div>

          {/* Integrated Bottom 3-Point Guarantee Ribbon */}
          <div className="grid grid-cols-3 divide-x divide-slate-200/90 bg-white/90 backdrop-blur-xs rounded-xl border border-slate-200/80 py-1.5 sm:py-2 px-2 text-center shadow-2xs shrink-0 max-w-2xl mx-auto w-full">
            <div className="px-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-semibold text-slate-700">
              <Check size={11} className="text-emerald-700 shrink-0" />
              <span className="truncate">Free Shipping Over $60</span>
            </div>
            <div className="px-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-semibold text-slate-700">
              <Check size={11} className="text-emerald-700 shrink-0" />
              <span className="truncate">Raw &amp; Minimally Handled</span>
            </div>
            <div className="px-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-semibold text-slate-700">
              <Check size={11} className="text-emerald-700 shrink-0" />
              <span className="truncate">Traceable Hive Passport</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. IMAGE-DOMINATED 3 DEPARTMENTS BENTO (Zero Fluff, Instant Visuals) */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-1.5 sm:space-y-2">
          <span className="text-[11px] sm:text-sm font-bold tracking-widest text-emerald-800 uppercase block">
            Maison Avenoir Collections
          </span>
          <h2 className="font-serif text-2xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Honey, Gifts &amp; Apiary Supplies
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Honey for everyday rituals, thoughtful gifts, and tables worth gathering around.
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
                src="/images/dept-honey-comb.jpg"
                alt="Raw Honey Terroirs & Comb"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                  New Jersey Raw Honey
                </h3>
                <span className="text-xs text-slate-500">Seasonal small-batch jars from $24</span>
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
                src="/images/dept-beekeeping-gear.jpg"
                alt="Beekeeping Supplies & Hardware"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                <span className="text-xs text-slate-500">Ventilated suits &amp; apiary tools</span>
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
                src="/images/dept-gift-vaults.jpg"
                alt="Office & Corporate Gifting Heirloom Presentation Trunks"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-emerald-950/90 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                  Office &amp; Host Gifts
                </span>
              </div>
            </div>

            {/* Clean, Low-Text Footer */}
            <div className="p-4 sm:p-6 flex items-center justify-between gap-3 bg-white">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-900 transition">
                  Thoughtful Gift Boxes
                </h3>
                <span className="text-xs text-slate-500">Curated honey sets, tea pairings &amp; custom boxes</span>
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
              Seasonal Harvests
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              New Jersey Honey &amp; Samplers
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

      {/* 5. TERROIR & MICROCLIMATE SPOTLIGHT - PROPERLY VISIBLE EDITORIAL PHOTOGRAPHY */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <div className="bg-[#091117] text-white rounded-3xl border border-slate-800/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden text-left">
          
          {/* Left Column: Terroir Narrative & Purity Specs */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-amber-400 uppercase block">
                The Hive Passport &bull; Sussex &amp; Morris County, NJ
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
                Not all honey tells you where it came from. <span className="text-amber-300">Ours does.</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl">
                We keep our hives in New Jersey and bottle honey in small seasonal batches. Every jar carries a Hive Passport, so you can see the harvest story, the season, the floral forage, and the beekeepers behind it.
              </p>
            </div>

            {/* 4 Purity Badges */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 pt-1">
              <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-amber-400">Origin</span>
                <span className="font-serif text-sm sm:text-lg font-bold block text-white">New Jersey Hives</span>
                <p className="text-[10px] sm:text-xs text-slate-400">Sussex, Morris &amp; Hunterdon</p>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-amber-400">Handling</span>
                <span className="font-serif text-sm sm:text-lg font-bold block text-white">Raw &amp; Minimally Handled</span>
                <p className="text-[10px] sm:text-xs text-slate-400">Bottled unheated to protect enzymes</p>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-amber-400">Traceability</span>
                <span className="font-serif text-sm sm:text-lg font-bold block text-white">Jar Hive Passport</span>
                <p className="text-[10px] sm:text-xs text-slate-400">Scan QR code for harvest story</p>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-amber-400">Gifting</span>
                <span className="font-serif text-sm sm:text-lg font-bold block text-white">Gift-Ready Packaging</span>
                <p className="text-[10px] sm:text-xs text-slate-400">Custom handwritten notes included</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/terroir"
                prefetch={true}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider transition shadow-sm"
              >
                <span>Explore the Hive Story</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: 100% Clearly Visible High-Resolution Photography */}
          <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[360px] lg:min-h-full w-full overflow-hidden bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800">
            <Image
              src="/images/spotlight-terroir.jpg"
              alt="Authentic Kittatinny Ridge Elevation Terroir Microclimate Study Site"
              fill
              sizes="(max-width: 1024px) 100vw, 650px"
              className="object-cover object-center hover:scale-103 transition-transform duration-700 opacity-100"
            />
            {/* Elegant Photographic Badge */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
              <div className="bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-[11px] text-white font-mono shadow-md inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>New Jersey Hives &bull; Late Summer Harvest NJ-26-08</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TRUST & VERIFIED PATRON TESTIMONIALS */}
      <TrustTestimonials />

      {/* 7. CORPORATE CONCIERGE BANNER - PROPERLY VISIBLE EDITORIAL WALNUT TRUNK */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <div className="bg-gradient-to-br from-[#FCFBF8] via-white to-amber-50/70 rounded-3xl border border-amber-200/90 shadow-lg grid grid-cols-1 lg:grid-cols-12 overflow-hidden text-left">
          
          {/* Left Column: Bespoke Gifting Concierge Copy */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-amber-900 uppercase block">
                Corporate &amp; Event Gifting &bull; Maison Avenoir
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                Gifts your clients will actually remember.
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-xl">
                Locally harvested New Jersey honey and beautifully packed gift boxes for client appreciation, employee recognition, events, closings, and seasonal giving.
              </p>
            </div>

            {/* 3 Luxury Perks */}
            <div className="space-y-2 py-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <Check size={14} className="text-amber-600 shrink-0" />
                <span>Custom Branded Tags, Sleeves &amp; Wax Seals</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <Check size={14} className="text-amber-600 shrink-0" />
                <span>Tiered Corporate Volume Discounts &amp; Curated Tiers</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <Check size={14} className="text-amber-600 shrink-0" />
                <span>Direct Multi-Address Recipient Courier Dispatch</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/corporate"
                prefetch={true}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-sm"
              >
                <span>Request a Gift Proposal</span>
                <ArrowRight size={14} className="text-amber-400" />
              </Link>
            </div>
          </div>

          {/* Right Column: 100% Clearly Visible High-Resolution Photography */}
          <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] lg:min-h-full w-full overflow-hidden bg-amber-100 border-t lg:border-t-0 lg:border-l border-amber-200/80">
            <Image
              src="/images/banner-corporate-trunks.jpg"
              alt="Bespoke Heirloom American Walnut Corporate Honey Presentation Trunks"
              fill
              sizes="(max-width: 1024px) 100vw, 650px"
              className="object-cover object-center hover:scale-103 transition-transform duration-700 opacity-100"
            />
            {/* Elegant Photographic Badge */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
              <div className="bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-[11px] text-amber-200 font-mono shadow-md inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Maison Avenoir &bull; Gift-Ready Presentation</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
