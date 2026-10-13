'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  Star, 
  ShoppingBag,
  Truck,
  CheckCircle2,
  Mail,
  Check
} from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function HomeClient() {
  const { addToCart, setIsCartOpen } = useCart();
  const [harvestAdded, setHarvestAdded] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Active Flagship Seasonal Harvest (12 oz Raw Wildflower Honey)
  const currentHarvest = PRODUCTS.find((p) => p.id === 'AV-JAR-APOTH') || PRODUCTS[0];

  // Curated Best Sellers for the storefront grid
  const bestSellers = [
    PRODUCTS.find((p) => p.id === 'AV-JAR-APOTH') || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === 'AV-CHEST-MAPLE') || PRODUCTS[1],
    PRODUCTS.find((p) => p.id === 'AV-BOX-GIFT') || PRODUCTS[2],
    PRODUCTS.find((p) => p.id === 'AV-INF-VANILLA') || PRODUCTS[3],
  ].filter(Boolean);

  const handleBuyCurrentHarvest = () => {
    addToCart(currentHarvest, 1);
    setHarvestAdded(true);
    setTimeout(() => {
      setHarvestAdded(false);
      setIsCartOpen(true);
    }, 600);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* =========================================================================
      {/* =========================================================================
          1. HERO — EDITORIAL 2-COLUMN LUXURY WITH TRANSPARENT PRODUCT
          ========================================================================= */}
      <section className="relative bg-[#F4EFE6] border-b border-[#E6DDD0] px-4 sm:px-8 xl:px-12 2xl:px-16 overflow-hidden min-h-[480px] lg:min-h-[580px] flex items-center py-12 sm:py-16 lg:py-20">
        
        <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal text-stone-900 tracking-tight leading-[1.06]">
              Raw honey, <br />
              <span className="italic text-[#8C6B28]">bottled by the season.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-700 font-serif leading-relaxed max-w-xl mx-auto lg:mx-0">
              Unheated, unfiltered raw honey from Sussex County apiaries.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#bestsellers"
                className="py-3.5 px-8 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition shadow-xs active:scale-98"
              >
                Shop Bestsellers
              </a>

              <Link
                href="/gifting"
                prefetch={true}
                className="py-3.5 px-8 rounded-md bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-semibold text-xs sm:text-sm uppercase tracking-wider transition shadow-2xs"
              >
                Curated Gift Boxes
              </Link>
            </div>
          </div>

          {/* Right Column: Honey Products Showcase (Glass Jar + Cut Honeycomb in Front) */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] h-[340px] sm:h-[420px] lg:h-[460px] flex items-center justify-center">
              {/* Subtle ambient warm pedestal glow */}
              <div className="absolute inset-4 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
              
              {/* Main Product: French Hexagonal Honey Jar (Standing in background) */}
              <div className="absolute right-0 sm:right-4 top-2 sm:top-4 w-[220px] sm:w-[280px] lg:w-[310px] aspect-3/4 drop-shadow-[0_20px_35px_rgba(60,35,15,0.16)] z-10 pointer-events-none select-none">
                <Image
                  src="/images/hero-honey-product-transparent.png"
                  alt="Maison Avenoir Raw Golden Honey Jar"
                  fill
                  priority
                  sizes="(max-width: 1024px) 280px, 310px"
                  className="object-contain"
                />
              </div>

              {/* Second Product in Different Form: Raw Cut Honeycomb & Carved Dipper (In front) */}
              <div className="absolute left-0 sm:left-2 bottom-2 sm:bottom-4 w-[180px] sm:w-[230px] lg:w-[260px] aspect-4/3 drop-shadow-[0_16px_28px_rgba(60,35,15,0.20)] z-20 pointer-events-none select-none">
                <Image
                  src="/images/hero-honeycomb-product-transparent.png"
                  alt="Fresh Raw Cut Honeycomb Slab with Dipper"
                  fill
                  priority
                  sizes="(max-width: 1024px) 230px, 260px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. BESTSELLERS PRODUCT GRID — THE HEART OF THE STORE
          ========================================================================= */}
      <section id="bestsellers" className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 scroll-mt-24 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12 border-b border-stone-200 pb-5">
          <div>
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] text-stone-400 uppercase block mb-1.5">
              Seasonal Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
              Our Most Loved Harvests
            </h2>
            <p className="text-sm sm:text-base text-stone-500 font-serif leading-relaxed mt-1.5">
              Handcrafted in limited runs. Ready to ship directly from our New Jersey honey house.
            </p>
          </div>
          <Link
            href="/honey"
            prefetch={true}
            className="text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1.5 transition shrink-0 group font-serif"
          >
            <span>View All Honeys</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. SHOP BY CATEGORY — ASYMMETRIC BENTO EDITORIAL (CLEAN, NO TEXT CLUTTER)
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 py-20 sm:py-28 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12 border-b border-stone-200 pb-5">
          <div>
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] text-stone-400 uppercase block mb-1.5">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            prefetch={true}
            className="text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1.5 transition shrink-0 group font-serif"
          >
            <span>View Full Catalog</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Bento Layout — Visually Distinct from Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Tile 1: Large Raw Honey Feature (Left, 6 cols, tall) */}
          <Link
            href="/honey?cat=honey-raw"
            prefetch={true}
            className="group relative lg:col-span-6 h-[400px] sm:h-[460px] lg:h-[530px] rounded-xl overflow-hidden flex flex-col justify-end p-7 sm:p-9 cursor-pointer"
          >
            <Image
              src="/images/banner-honey-terroir.jpg"
              alt="Raw Varietal Honey"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent" />
            <div className="relative z-10 flex items-end justify-between">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                Raw Varietal Honey
              </h3>
              <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-stone-900 transition-colors shrink-0">
                <ArrowRight size={16} />
              </span>
            </div>
          </Link>

          {/* Right Side: 6 cols with 1 Wide Card on top + 2 Small Cards below */}
          <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6">
            
            {/* Tile 2: Curated Gift Boxes (Wide) */}
            <Link
              href="/gifting"
              prefetch={true}
              className="group relative h-[220px] sm:h-[240px] lg:h-[250px] rounded-xl overflow-hidden flex flex-col justify-end p-6 sm:p-7 cursor-pointer"
            >
              <Image
                src="/images/dept-gift-vaults.jpg"
                alt="Curated Gift Boxes"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent" />
              <div className="relative z-10 flex items-end justify-between">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                  Curated Gift Boxes
                </h3>
                <span className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-stone-900 transition-colors shrink-0">
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>

            {/* Bottom Row: 2 Split Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 flex-1">
              
              {/* Tile 3: Cut Honeycomb */}
              <Link
                href="/honey?cat=honey-comb"
                prefetch={true}
                className="group relative h-[200px] sm:h-auto rounded-xl overflow-hidden flex flex-col justify-end p-6 cursor-pointer"
              >
                <Image
                  src="/images/dept-honey-comb.jpg"
                  alt="Cut Honeycomb Slabs"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent" />
                <div className="relative z-10 flex items-end justify-between">
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
                    Cut Honeycomb
                  </h3>
                  <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-stone-900 transition-colors shrink-0">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>

              {/* Tile 4: Whipped & Infused */}
              <Link
                href="/honey?cat=honey-infused"
                prefetch={true}
                className="group relative h-[200px] sm:h-auto rounded-xl overflow-hidden flex flex-col justify-end p-6 cursor-pointer"
              >
                <Image
                  src="https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=800"
                  alt="Whipped &amp; Infused Honey"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent" />
                <div className="relative z-10 flex items-end justify-between">
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
                    Whipped &amp; Infused
                  </h3>
                  <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-stone-900 transition-colors shrink-0">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. SPOTLIGHT: ACTIVE HARVEST — ELEGANT, NOT OVER-TECHNICAL
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 text-left">
        <div className="bg-stone-50/80 rounded-2xl overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Clean Product Photo with NO badge overlays */}
            <div className="lg:col-span-6 relative aspect-square sm:aspect-4/3 lg:aspect-square w-full rounded-xl overflow-hidden bg-white shadow-2xs group">
              <Image
                src={currentHarvest.imageUrl}
                alt={currentHarvest.name}
                fill
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-cover group-hover:scale-103 transition-transform duration-700"
              />
            </div>

            {/* Product Details & Instant Purchase */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-medium tracking-[0.2em] text-stone-400 uppercase block">
                  Current Harvest &bull; Batch #NJ-26-08
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-tight">
                  {currentHarvest.name}
                </h2>

                <p className="text-sm sm:text-base text-stone-500 leading-relaxed font-serif">
                  Bottled straight from our late summer extraction along the Kittatinny Ridge. Rich, fragrant, and golden—carrying the natural character of wild asters, goldenrod, and summer meadow blossoms.
                </p>

                {/* Appetizing Flavor & Pairing Notes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-white space-y-0.5 shadow-2xs">
                    <span className="text-[10px] font-bold uppercase text-stone-400 block">Tasting Notes</span>
                    <p className="text-xs font-bold text-stone-800">Wild Asters &amp; Caramel</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white space-y-0.5 shadow-2xs">
                    <span className="text-[10px] font-bold uppercase text-stone-400 block">Origin</span>
                    <p className="text-xs font-bold text-stone-800">Sussex County, NJ</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white space-y-0.5 shadow-2xs col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold uppercase text-stone-400 block">Best Paired With</span>
                    <p className="text-xs font-bold text-stone-800">Cheeses &amp; Morning Toast</p>
                  </div>
                </div>
              </div>

              {/* Price & Add to Bag */}
              <div className="pt-4 border-t border-stone-200 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-serif text-3xl sm:text-4xl font-normal text-stone-900">
                      ${currentHarvest.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-stone-500 ml-2 font-medium">/ 12 oz jar</span>
                  </div>
                  <span className="text-xs font-semibold text-[#1A3324] flex items-center gap-1">
                    <Truck size={14} className="text-[#1A3324]" />
                    <span>In Stock &bull; Ships in 24 hours</span>
                  </span>
                </div>

                <button
                  onClick={handleBuyCurrentHarvest}
                  disabled={harvestAdded}
                  className={`w-full py-4 px-6 rounded-md font-semibold text-xs sm:text-sm uppercase tracking-wider transition duration-150 shadow-xs cursor-pointer flex items-center justify-center gap-2.5 ${
                    harvestAdded
                      ? 'bg-[#1A3324] text-white'
                      : 'bg-[#15231A] hover:bg-[#1E3326] text-white active:scale-98'
                  }`}
                >
                  {harvestAdded ? (
                    <>
                      <CheckCircle2 size={18} className="text-[#C5A265]" />
                      <span>Added to Bag! Opening...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} className="text-[#C5A265]" />
                      <span>Add to Bag &bull; ${currentHarvest.price.toFixed(2)}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                  <span>100% Raw, Unheated &amp; Unfiltered</span>
                  <Link href="/honey" prefetch={true} className="text-stone-700 font-semibold hover:text-stone-900 hover:underline flex items-center gap-1">
                    <span>Browse all 12 reserves</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. THE AVENOIR STANDARD — MINIMALIST EDITORIAL (GENEROUS SPACE, NO ICONS)
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 py-24 sm:py-32 lg:py-36 text-left">
        <div className="max-w-xl mb-14 sm:mb-16 space-y-2.5">
          <span className="text-[11px] font-medium tracking-[0.2em] text-stone-400 uppercase block font-mono">
            The Pure Harvest Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Why It Tastes Different
          </h2>
          <p className="text-sm sm:text-base text-stone-500 font-serif leading-relaxed">
            No ultra-filtration. No anonymous industrial drums. Just pure, living honey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-14">
          
          <div className="border-t border-stone-200/80 pt-6 space-y-2">
            <h3 className="font-serif text-lg font-normal text-stone-900">Cold-Bottled Raw</h3>
            <p className="text-xs sm:text-sm text-stone-500 font-serif leading-relaxed">
              Never heated above hive warmth. Living enzymes intact.
            </p>
          </div>

          <div className="border-t border-stone-200/80 pt-6 space-y-2">
            <h3 className="font-serif text-lg font-normal text-stone-900">True Micro-Batches</h3>
            <p className="text-xs sm:text-sm text-stone-500 font-serif leading-relaxed">
              Numbered seasonal lots from individual Sussex County yards.
            </p>
          </div>

          <div className="border-t border-stone-200/80 pt-6 space-y-2">
            <h3 className="font-serif text-lg font-normal text-stone-900">Single Terroir</h3>
            <p className="text-xs sm:text-sm text-stone-500 font-serif leading-relaxed">
              Foraged exclusively across northern New Jersey flora.
            </p>
          </div>

          <div className="border-t border-stone-200/80 pt-6 space-y-2">
            <h3 className="font-serif text-lg font-normal text-stone-900">Flint Glass</h3>
            <p className="text-xs sm:text-sm text-stone-500 font-serif leading-relaxed">
              Heavy French apothecary jars finished with hand-poured wax.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. GIFTING EDITORIAL SECTION — FULL-WIDTH EDGE-TO-EDGE (NO CARDS)
          ========================================================================= */}
      <section className="w-full bg-[#142118] text-white border-y border-[#223528] py-16 sm:py-20 lg:py-24 text-left">
        <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <span className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#C5A265]/80 uppercase block">
                Artisanal Gifting Concierge
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-[1.1]">
                Good for your pantry. <br />
                <span className="text-[#C5A265] italic">Even better when shared.</span>
              </h2>
              <p className="text-sm sm:text-base text-stone-300 font-serif max-w-2xl leading-relaxed">
                Whether thanking a dinner host, celebrating a housewarming, or sending executive client gifts—our presentation boxes arrive hand-tied with botanical silk ribbon, solid brass honey wands, and wax-sealed cards.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/gifting"
                prefetch={true}
                className="w-full py-4 px-6 rounded-md bg-[#C5A265] hover:bg-[#B38E46] text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition text-center shadow-sm active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Build a Gift Box (Save 25%)</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/corporate"
                prefetch={true}
                className="w-full py-3.5 px-6 rounded-md bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition text-center border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Corporate &amp; Client Gifting</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          7. PATRON REVIEWS — HIGH TRUST SOCIAL PROOF (BORDERLESS)
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 text-left">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14 space-y-2.5">
          <div className="flex justify-center text-[#C5A265] gap-1 pb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} fill="currentColor" />
            ))}
          </div>
          <span className="text-[11px] font-mono font-medium tracking-[0.2em] text-stone-400 uppercase block">
            Patron Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Loved by Chefs &amp; Patrons
          </h2>
          <p className="text-sm text-stone-500 font-serif leading-relaxed">
            Real feedback from our New Jersey apiary subscribers and gift recipients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex text-[#C5A265]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed italic">
                &ldquo;The flavor complexity is unreal. You can taste the wildflowers immediately. It has completely ruined supermarket honey for our entire household.&rdquo;
              </p>
            </div>
            <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Sarah M.</span>
              <span className="text-stone-400">Sussex County, NJ</span>
            </div>
          </div>

          <div className="space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex text-[#C5A265]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed italic">
                &ldquo;Ordered the Host Gift Box for our holiday clients. The wax seal, packaging, and lathe-turned honey dipper made a huge impression. Exceptional luxury.&rdquo;
              </p>
            </div>
            <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">David L.</span>
              <span className="text-stone-400">Princeton, NJ</span>
            </div>
          </div>

          <div className="space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex text-[#C5A265]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed italic">
                &ldquo;The Bourbon Vanilla whipped honey on fresh sourdough has become our favorite weekend ritual. It spreads like velvet butter. We are on our third jar.&rdquo;
              </p>
            </div>
            <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Elena K.</span>
              <span className="text-stone-400">Mendham, NJ</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. NEWSLETTER / HARVEST ALERT — FULL-WIDTH EDGE-TO-EDGE
          ========================================================================= */}
      <section className="w-full bg-stone-100/70 border-t border-stone-200 py-16 sm:py-20 text-center">
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-8 space-y-3">
          <span className="text-[11px] font-mono font-medium tracking-[0.2em] text-stone-400 uppercase block">
            The Harvest Society
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Taste the Season First
          </h2>
          <p className="text-sm text-stone-500 font-serif max-w-md mx-auto leading-relaxed">
            Get notified when new seasonal micro-batches are spun, plus enjoy 10% off your first order.
          </p>

          <div className="max-w-md mx-auto pt-2">
            {newsletterSuccess ? (
              <div className="p-4 rounded-md bg-[#142118] text-white flex items-center justify-center gap-2 text-xs font-semibold">
                <Check size={16} className="text-[#C5A265]" />
                <span>You&apos;re on the priority list! Welcome to Avenoir.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email for 10% off..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-md border border-stone-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-stone-800 transition placeholder:text-stone-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer whitespace-nowrap active:scale-95"
                >
                  Claim 10% Off
                </button>
              </form>
            )}
            <p className="text-[11px] text-stone-400 mt-2">
              1&ndash;2 harvest drops per season. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
