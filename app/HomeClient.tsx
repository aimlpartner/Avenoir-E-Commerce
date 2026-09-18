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
  Gift,
  Leaf,
  MapPin,
  QrCode,
  BookOpen,
  ChevronDown,
  Heart,
  Sparkles
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
                <span>New Jersey Hives &bull; Small-Batch Seasonal Harvest</span>
              </span>
              <span className="hidden md:inline text-slate-300">|</span>
              <span className="hidden md:inline">Free Shipping Over $60 &bull; Local Pickup &bull; Bee-Friendly Mission</span>
            </div>
          </div>

          {/* Main 2-Column Split: Editorial Copy & Compact Interactive Spotlight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 xl:gap-14 items-center text-left my-auto">
            
            {/* Left Column: Refined, Finished Editorial Typography with 3 Direct Actions */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-3.5 sm:space-y-4">
              
              <div className="space-y-1.5 sm:space-y-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-emerald-900 uppercase block">
                  Made by New Jersey Bees &bull; Sussex &amp; Morris County Hives
                </span>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.08] tracking-tight">
                  Raw New Jersey honey, <br className="hidden sm:inline" />
                  <span className="text-amber-800">harvested in small seasonal batches.</span>
                </h1>

                <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-xl pt-0.5">
                  Spring wildflower honey and late-summer harvests shaped by local field and garden blooms. Bottled in small batches for kitchens, gifts, and gatherings.
                </p>
              </div>

              {/* 2 Primary CTAs: Shop the Harvest & Send a Gift */}
              <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                <Link
                  href="/honey"
                  prefetch={true}
                  className="flex items-center justify-center gap-1.5 py-3 px-5 sm:px-7 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider transition cursor-pointer shadow-sm hover:shadow-md group text-center"
                >
                  <Droplets size={14} strokeWidth={2.4} className="text-amber-400 shrink-0" />
                  <span>Shop the Harvest</span>
                  <ArrowRight size={13} strokeWidth={2.4} className="hidden sm:inline group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>

                <Link
                  href="/corporate"
                  prefetch={true}
                  className="flex items-center justify-center gap-1.5 py-3 px-5 sm:px-7 rounded-xl bg-amber-50/90 hover:bg-amber-100 text-amber-950 border border-amber-300 hover:border-amber-400 font-bold text-[11px] sm:text-xs uppercase tracking-wider transition cursor-pointer shadow-2xs text-center"
                >
                  <Gift size={14} strokeWidth={2.4} className="text-amber-800 shrink-0" />
                  <span>Send a Gift</span>
                </Link>
              </div>

              <p className="text-[11px] sm:text-xs font-serif italic text-slate-500 pt-0.5">
                &ldquo;Good for your pantry. Better when shared.&rdquo;
              </p>

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

          {/* Integrated Bottom 5-Point Trust Bar */}
          <div className="grid grid-cols-5 divide-x divide-slate-200/90 bg-white/90 backdrop-blur-xs rounded-xl border border-slate-200/80 py-1.5 sm:py-2 px-1 text-center shadow-2xs shrink-0 max-w-3xl mx-auto w-full">
            <div className="px-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-semibold text-slate-700">
              <MapPin size={11} className="text-emerald-700 shrink-0 hidden sm:inline" />
              <span className="truncate">Harvested in New Jersey</span>
            </div>
            <div className="px-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-semibold text-slate-700">
              <Droplets size={11} className="text-emerald-700 shrink-0 hidden sm:inline" />
              <span className="truncate">Small-Batch</span>
            </div>
            <div className="px-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-semibold text-slate-700">
              <QrCode size={11} className="text-emerald-700 shrink-0 hidden sm:inline" />
              <span className="truncate">Traceable by QR</span>
            </div>
            <div className="px-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-semibold text-slate-700">
              <Check size={11} className="text-emerald-700 shrink-0 hidden sm:inline" />
              <span className="truncate">Local Pickup Available</span>
            </div>
            <div className="px-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-semibold text-slate-700">
              <Leaf size={11} className="text-emerald-700 shrink-0 hidden sm:inline" />
              <span className="truncate">Bee-Friendly Mission</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SHOP BY MOMENT — 5 Purpose-Driven Cards */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-1.5 sm:space-y-2">
          <span className="text-[11px] sm:text-sm font-bold tracking-widest text-emerald-800 uppercase block">
            Shop by Moment
          </span>
          <h2 className="font-serif text-2xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Find Your Reason to Taste
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Whether it&apos;s breakfast, a birthday, or a boardroom—there&apos;s a jar for that.
          </p>
        </div>

        {/* 5 Moment Cards — 3 large top row, 2 below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-left">
          
          {/* 1. For Your Pantry */}
          <Link
            href="/honey"
            prefetch={true}
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
          >
            <div className="relative aspect-[16/10] sm:aspect-4/3 w-full bg-slate-100 overflow-hidden">
              <Image
                src="/images/dept-honey-comb.jpg"
                alt="Raw Honey for Your Pantry"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-emerald-950/90 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                  Everyday Honey
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-6 flex items-center justify-between gap-3 bg-white">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-900 transition">
                  For Your Pantry
                </h3>
                <span className="text-xs text-slate-500">Seasonal small-batch jars for cooking, tea &amp; toast</span>
              </div>
              <span className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition shrink-0">
                <ArrowRight size={18} />
              </span>
            </div>
          </Link>

          {/* 2. For Gifting */}
          <Link
            href="/corporate"
            prefetch={true}
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
          >
            <div className="relative aspect-[16/10] sm:aspect-4/3 w-full bg-slate-100 overflow-hidden">
              <Image
                src="/images/dept-gift-vaults.jpg"
                alt="Honey Gift Boxes for Personal Gifting"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-emerald-950/90 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                  Personal Gifts
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-6 flex items-center justify-between gap-3 bg-white">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-900 transition">
                  For Gifting
                </h3>
                <span className="text-xs text-slate-500">Curated gift sets with handwritten notes</span>
              </div>
              <span className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition shrink-0">
                <ArrowRight size={18} />
              </span>
            </div>
          </Link>

          {/* 3. For Your Team or Clients */}
          <Link
            href="/corporate"
            prefetch={true}
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
          >
            <div className="relative aspect-[16/10] sm:aspect-4/3 w-full bg-slate-100 overflow-hidden">
              <Image
                src="/images/banner-corporate-trunks.jpg"
                alt="Corporate Honey Gifts for Teams and Clients"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-emerald-950/90 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                  Corporate &amp; Events
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-6 flex items-center justify-between gap-3 bg-white">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-900 transition">
                  For Your Team or Clients
                </h3>
                <span className="text-xs text-slate-500">Volume gifting with custom branding</span>
              </div>
              <span className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition shrink-0">
                <ArrowRight size={18} />
              </span>
            </div>
          </Link>

          {/* 4. For Bee Lovers */}
          <Link
            href="/beekeeping"
            prefetch={true}
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer sm:col-span-1"
          >
            <div className="relative aspect-[16/10] sm:aspect-4/3 w-full bg-slate-100 overflow-hidden">
              <Image
                src="/images/dept-beekeeping-gear.jpg"
                alt="Beekeeping Supplies for Bee Lovers"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-emerald-950/90 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                  Bee Lovers
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-6 flex items-center justify-between gap-3 bg-white">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-900 transition">
                  For Bee Lovers
                </h3>
                <span className="text-xs text-slate-500">Suits, tools &amp; apiary essentials</span>
              </div>
              <span className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition shrink-0">
                <ArrowRight size={18} />
              </span>
            </div>
          </Link>

          {/* 5. Seasonal Drops */}
          <Link
            href="/honey"
            prefetch={true}
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer sm:col-span-1"
          >
            <div className="relative aspect-[16/10] sm:aspect-4/3 w-full bg-amber-50 overflow-hidden">
              <Image
                src="/images/spotlight-terroir.jpg"
                alt="Limited Seasonal Honey Drops"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-amber-900/90 text-amber-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                  Limited Batches
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-6 flex items-center justify-between gap-3 bg-white">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-900 transition">
                  Seasonal Drops
                </h3>
                <span className="text-xs text-slate-500">Limited harvests — once they&apos;re gone, they&apos;re gone</span>
              </div>
              <span className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition shrink-0">
                <ArrowRight size={18} />
              </span>
            </div>
          </Link>

        </div>
      </section>

      {/* 2.5 SEASONAL DROP ALERT BANNER */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <div className="relative rounded-2xl bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-white p-5 sm:p-7 border border-amber-800/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-5 overflow-hidden">
          <div className="flex items-center gap-4 z-10 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-400">
              <Droplets size={24} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  Active Seasonal Drop
                </span>
                <span className="text-[11px] text-amber-200/80 hidden sm:inline">&bull; Sussex &amp; Kittatinny Ridge Apiaries</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-white">
                Fall Harvest is live &mdash; limited jars available.
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/90 max-w-xl">
                Raw, unpasteurized honey harvested from goldenrod, Japanese knotweed, and wild autumn asters across northern New Jersey. When this batch sells out, it won&apos;t return until next season.
              </p>
            </div>
          </div>

          <Link
            href="/honey"
            prefetch={true}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs uppercase tracking-wider transition shrink-0 text-center shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Shop Fall Harvest</span>
            <ArrowRight size={14} />
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

      {/* 5. THE HIVE PASSPORT & TERROIR */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <div className="bg-[#091117] text-white rounded-3xl border border-slate-800/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden text-left">
          
          {/* Left Column: Terroir Narrative & 3-Step Local Batch Story */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-amber-400 uppercase block">
                Transparent &bull; See the Harvest Behind Your Jar
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
                Not all honey tells you where it came from. <span className="text-amber-300">Ours does.</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl">
                We document every step of the journey: hive inspections, selective frame pulls, raw unheated extraction, small-batch bottling, seasonal weather and bloom updates, natural crystallization, and care for colony health. This content is not filler&mdash;it is the reason our patrons trust us more than an anonymous grocery shelf product.
              </p>
            </div>

            {/* The Local Batch Story in 3 Simple Steps */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400/90 block">
                The Local Batch Story in 3 Simple Steps:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <div className="w-6 h-6 rounded-md bg-amber-400/20 text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-white">Scan the QR Code</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Scan the tamper-evident QR code on any jar lid with your phone camera.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <div className="w-6 h-6 rounded-md bg-amber-400/20 text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-white">See the Harvest Story</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Discover harvest dates, wildflower forage breakdown, and exact apiary coordinates.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <div className="w-6 h-6 rounded-md bg-amber-400/20 text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-white">Know Who Kept the Bees</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Know exactly where your honey came from, who kept the hives, and zero blending.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Purity Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-0.5">
                <span className="text-[9px] uppercase font-bold text-amber-400">Origin</span>
                <span className="text-xs font-bold block text-white">New Jersey Hives</span>
                <p className="text-[10px] text-slate-400">Sussex &amp; Morris</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-0.5">
                <span className="text-[9px] uppercase font-bold text-amber-400">Handling</span>
                <span className="text-xs font-bold block text-white">Raw &amp; Unheated</span>
                <p className="text-[10px] text-slate-400">Live enzymes intact</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-0.5">
                <span className="text-[9px] uppercase font-bold text-amber-400">Traceability</span>
                <span className="text-xs font-bold block text-white">QR Batch Passport</span>
                <p className="text-[10px] text-slate-400">Every jar verified</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-0.5">
                <span className="text-[9px] uppercase font-bold text-amber-400">Mission</span>
                <span className="text-xs font-bold block text-white">Bee-Friendly</span>
                <p className="text-[10px] text-slate-400">Sustainable apiaries</p>
              </div>
            </div>

            <div className="pt-1">
              <Link
                href="/terroir"
                prefetch={true}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
              >
                <span>Explore the Hive Story</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual QR Scan Card & Mobile Passport Screen Preview */}
          <div className="lg:col-span-5 relative min-h-[360px] sm:min-h-[440px] lg:min-h-full w-full overflow-hidden bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 flex items-center justify-center p-6">
            <Image
              src="/images/spotlight-terroir.jpg"
              alt="Authentic Kittatinny Ridge Elevation Terroir Microclimate Study Site"
              fill
              sizes="(max-width: 1024px) 100vw, 650px"
              className="object-cover object-center opacity-30"
            />
            
            {/* Example QR Scan & Landing-Page Screen Preview */}
            <div className="relative z-10 w-full max-w-sm bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/20 p-5 space-y-3.5 shadow-2xl text-left">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
                    <QrCode size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 block font-bold">
                      Hive Passport &bull; Live Screen
                    </span>
                    <span className="text-xs font-bold text-white">Batch #NJ-26-08 (Sussex)</span>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Apiary Yard:</span>
                  <span className="font-semibold text-white">Kittatinny Ridge, Sussex County</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Harvest Season:</span>
                  <span className="font-semibold text-white">Late Summer &bull; Limited Run</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Floral Forage:</span>
                  <span className="font-semibold text-amber-300">Wild Asters, Goldenrod, Linden</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Beekeeper:</span>
                  <span className="font-semibold text-white">Maison Avenoir Apiary Team</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Handling Spec:</span>
                  <span className="font-semibold text-emerald-400">Unheated &bull; Coarse Strained</span>
                </div>
              </div>

              <div className="pt-1">
                <div className="w-full py-2 px-3 rounded-lg bg-slate-800/90 border border-slate-700 text-center text-[10px] font-mono text-slate-300">
                  QR code laser-etched on every jar seal
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5.5 MEET THE BEEKEEPER */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <div className="bg-[#FAF8F5] rounded-3xl border border-stone-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 overflow-hidden text-left">
          
          {/* Left Column: Authentic Apiary Photo */}
          <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[400px] lg:min-h-full w-full overflow-hidden bg-stone-100 border-b lg:border-b-0 lg:border-r border-stone-200">
            <Image
              src="/images/service-beekeeping-hero.jpg"
              alt="Maison Avenoir Beekeeper inspecting honey frames in Sussex County apiary"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover object-center hover:scale-102 transition-transform duration-700"
            />
            {/* Beekeeper Badge */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
              <div className="bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-[11px] text-white font-mono shadow-md inline-flex items-center gap-2">
                <MapPin size={12} className="text-amber-400" />
                <span>Sussex County Apiary Yard &bull; Maison Avenoir</span>
              </div>
            </div>
          </div>

          {/* Right Column: Philosophy, Face & Non-Corporate Story */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-emerald-900 uppercase block">
                Meet the Beekeeper &bull; Our Philosophy
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Behind every jar is a real person, real hives, and deep respect for the season.
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-xl">
                Most commercial honey is pooled across anonymous industrial drums, superheated, and stripped of its floral identity. At Maison Avenoir, we take the opposite path.
              </p>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-xl">
                We manage our own apiaries across Sussex, Morris, and Hunterdon counties. We never rush the bees, never feed sugar syrups during honey flow, and never pasteurize. When you open a jar of Maison Avenoir, you taste the exact wildflowers and trees our bees visited across a single New Jersey season.
              </p>
            </div>

            {/* Philosophy Pull-Quote */}
            <blockquote className="p-4 rounded-2xl bg-amber-50/80 border-l-4 border-amber-500 text-xs sm:text-sm font-serif italic text-amber-950 leading-relaxed">
              &ldquo;Our job isn&apos;t to manufacture honey &mdash; it&apos;s to protect what the bees created and share it honestly with our community.&rdquo;
            </blockquote>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/services/educate"
                prefetch={true}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold uppercase tracking-wider transition shadow-xs cursor-pointer"
              >
                <span>Visit the Apiary &amp; Academy</span>
                <ArrowRight size={13} className="text-amber-400" />
              </Link>
              <Link
                href="/honey"
                prefetch={true}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                <span>Taste the Current Harvest</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5.8 THE THREE-PART BRAND ANGLE: LOCAL, TRANSPARENT, SHAREABLE */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 text-left">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase block">
            Brand Identity &bull; The Avenoir Standard
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Local. Transparent. Shareable.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We avoid generic &ldquo;natural, sweet, delicious honey&rdquo; copy&mdash;every honey seller says that. Instead, Maison Avenoir is guided by an authentic three-part brand identity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10">
          
          {/* 1. LOCAL */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                  Part 1 &bull; Local
                </span>
                <MapPin size={16} className="text-emerald-700" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                &ldquo;Made by New Jersey bees&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Be specific about region, harvest period, and season&mdash;not vague claims of being &ldquo;local.&rdquo;
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-1">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                  <span>&ldquo;Spring wildflower honey from our New Jersey hives.&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                  <span>&ldquo;A late-summer harvest shaped by local field and garden blooms.&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                  <span>&ldquo;Bottled in small batches for kitchens, gifts, and gatherings.&rdquo;</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="font-serif italic text-emerald-900 font-semibold">&ldquo;From our hives to your table.&rdquo;</span>
              <Link href="/honey" prefetch={true} className="text-emerald-800 font-bold hover:text-emerald-950 flex items-center gap-1">
                <span>View Hives</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* 2. TRANSPARENT */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                  Part 2 &bull; Transparent
                </span>
                <QrCode size={16} className="text-amber-700" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                &ldquo;See the harvest behind your jar&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Show your process: This content is not filler. It is the reason people trust you more than a grocery shelf product.
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 pt-1">
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                  <span>Hive inspections</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                  <span>Frame pulls</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                  <span>Honey extraction</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                  <span>Bottling</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100 col-span-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                  <span>Seasonal weather &amp; bloom updates</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                  <span>Natural crystallization</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                  <span>Care for colony health</span>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="font-serif italic text-amber-900 font-semibold">&ldquo;See the harvest behind your jar.&rdquo;</span>
              <Link href="/terroir" prefetch={true} className="text-amber-800 font-bold hover:text-amber-950 flex items-center gap-1">
                <span>The Science</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* 3. SHAREABLE */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                  Part 3 &bull; Shareable
                </span>
                <Gift size={16} className="text-amber-700" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                &ldquo;Honey is better when it becomes a gift&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Lead with warmth, not just ingredients. Honey connects kitchens, gifts, and celebrations.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-1">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-amber-700 shrink-0 mt-0.5" />
                  <span>&ldquo;A sweeter way to say thank you.&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-amber-700 shrink-0 mt-0.5" />
                  <span>&ldquo;A little jar. A real New Jersey story.&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-amber-700 shrink-0 mt-0.5" />
                  <span>&ldquo;Send honey, not another generic gift.&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-amber-700 shrink-0 mt-0.5" />
                  <span>&ldquo;From our hives to your table.&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-amber-700 shrink-0 mt-0.5" />
                  <span>&ldquo;Good for your pantry. Better when shared.&rdquo;</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="font-serif italic text-amber-900 font-semibold">&ldquo;Good for your pantry. Better when shared.&rdquo;</span>
              <Link href="/corporate" prefetch={true} className="text-amber-800 font-bold hover:text-amber-950 flex items-center gap-1">
                <span>Gift Atelier</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TRUST & VERIFIED PATRON TESTIMONIALS */}
      <TrustTestimonials />

      {/* 6.5 EDUCATION & RECIPES (4 HONEY QUESTIONS) */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 text-left">
        <div className="max-w-2xl mb-8 space-y-2">
          <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase block">
            Honey Education &amp; Kitchen Rituals
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Honest Questions About Raw Honey
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Everything you need to know about crystallization, pantry storage, unfiltered extraction, and everyday pairings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* FAQ 1 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
              <Droplets size={14} className="text-amber-600" />
              <span>Honey Science</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Why does real honey crystallize?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Crystallization is completely natural and definitive proof of raw, unpasteurized honey. Because our honey is never superheated or ultra-filtered, natural glucose forms delicate crystals over time. It is not spoiled&mdash;it proves the live enzymes, wildflower pollen, and trace minerals are intact. To return it to a liquid state, gently place the jar in a warm water bath (under 100&deg;F).
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <Shield size={14} className="text-emerald-600" />
              <span>Pantry Care</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              How should I store my honey?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Store your jar at normal room temperature in a cabinet or on your countertop, away from direct sunlight. Never refrigerate raw honey&mdash;cold temperatures accelerate crystallization and make it firm. Pure raw honey has a very low natural moisture level (under 18%) and virtually indefinite shelf life when sealed.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
              <Leaf size={14} className="text-amber-600" />
              <span>Processing Integrity</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              What does raw and unfiltered mean in our process?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Commercial honey is often flash-heated above 160&deg;F and pressed through high-pressure diatomaceous filters that strip out pollen to prevent crystallization on supermarket shelves. We never heat our honey above natural hive temperature (~95&deg;F) and only coarse-strain it to catch wax flecks, keeping 100% of the live enzymes, wildflower pollen, and terroir aromatics inside.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <Sparkles size={14} className="text-emerald-600" />
              <span>Culinary Pairings</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Five ways to use New Jersey wildflower honey
            </h3>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>Drizzle over sharp aged cheddar, fresh ricotta, or goat cheese.</li>
              <li>Stir into warm tea or morning lemon water (let water cool slightly first).</li>
              <li>Whisk with Dijon mustard and cold-pressed olive oil for a bright vinaigrette.</li>
              <li>Spoon over warm crusty sourdough or toasted biscuits with salted butter.</li>
              <li>Pour gently over roasted figs, vanilla bean ice cream, or grilled peaches.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. GIFT BUILDER TEASER — SEND A LITTLE NEW JERSEY */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <div className="bg-gradient-to-br from-[#FCFBF8] via-white to-amber-50/70 rounded-3xl border border-amber-200/90 shadow-lg grid grid-cols-1 lg:grid-cols-12 overflow-hidden text-left">
          
          {/* Left Column: Send a Little New Jersey Copy */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-amber-900 uppercase block">
                Shareable &bull; Honey is better when it becomes a gift
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                Send a Little New Jersey
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-xl">
                A sweeter way to say thank you. A little jar, a real New Jersey story. Send honey, not another generic gift&mdash;from our hives to your table. Good for your pantry, even better when shared.
              </p>
            </div>

            {/* What's Inside & Functionality */}
            <div className="space-y-2.5 py-1">
              <span className="text-xs uppercase font-bold text-slate-800 tracking-wider block">
                Every Curated Box Includes:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-amber-600 shrink-0" />
                  <span>Seasonal Raw Honey Jar (12 oz)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-amber-600 shrink-0" />
                  <span>Hand-Poured Pure Beeswax Candle</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-amber-600 shrink-0" />
                  <span>Embossed Hive Passport Story Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-amber-600 shrink-0" />
                  <span>Botanical Taste Notes &amp; Pairing Guide</span>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-200/60 flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-semibold text-emerald-900">
                  <Gift size={13} className="text-emerald-700" />
                  <span>Complimentary Handwritten Gift Note</span>
                </span>
                <span>&bull;</span>
                <span className="font-semibold text-slate-800">
                  &ldquo;Send Later&rdquo; Scheduled Delivery Available
                </span>
                <span className="hidden sm:inline">&bull;</span>
                <span className="hidden sm:inline">Volume Corporate Discounts</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/corporate"
                prefetch={true}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
              >
                <span>Build Your Gift Box</span>
                <ArrowRight size={14} className="text-amber-400" />
              </Link>
              <Link
                href="/honey"
                prefetch={true}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-amber-50 text-amber-950 border border-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider transition cursor-pointer"
              >
                <span>Shop All Gift Sets</span>
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
                <span>Maison Avenoir &bull; Hand-Packed in Sussex County</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
