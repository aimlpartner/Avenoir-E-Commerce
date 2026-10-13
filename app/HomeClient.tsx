'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Droplets, 
  ArrowRight, 
  Star, 
  ShoppingBag,
  Gift,
  MapPin,
  Layers,
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
          1. HERO — CLEAN, EDITORIAL LUXURY (CENTERED)
          ========================================================================= */}
      <section className="relative bg-[#FAFAF8] border-b border-stone-200 px-4 sm:px-8 xl:px-12 2xl:px-16 overflow-hidden min-h-[500px] lg:min-h-[620px] flex items-center justify-center py-20 sm:py-28 text-center">
        
        {/* Minimalist Background Image & Editorial Softening */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <Image
            src="/images/hero-zen-minimal.jpg"
            alt="Warm morning light and linen editorial background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-80 sm:opacity-90"
          />
          <div className="absolute inset-0 bg-radial from-transparent via-[#FAFAF8]/25 to-[#FAFAF8]/60" />
        </div>

        <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto relative z-10 flex flex-col items-center justify-center">
          <div className="max-w-2xl mx-auto space-y-6 text-center">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-stone-900 tracking-tight leading-[1.06]">
              Raw honey, <br />
              <span className="italic text-[#8C6B28]">bottled by the season.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-700 font-serif leading-relaxed max-w-lg mx-auto">
              Unheated, unfiltered raw honey from Sussex County apiaries.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
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
        </div>
      </section>

      {/* =========================================================================
          2. BESTSELLERS PRODUCT GRID — THE HEART OF THE STORE
          ========================================================================= */}
      <section id="bestsellers" className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 scroll-mt-24 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#8C6B28] uppercase block mb-1">
              Seasonal Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Our Most Loved Harvests
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Handcrafted in limited runs. Ready to ship directly from our New Jersey honey house.
            </p>
          </div>
          <Link
            href="/honey"
            prefetch={true}
            className="text-xs sm:text-sm font-semibold text-stone-900 hover:text-[#8C6B28] flex items-center gap-1.5 transition shrink-0 group"
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
          3. SHOP BY CATEGORY — VISUAL TILES
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 text-left">
        <div className="mb-8">
          <span className="text-xs font-bold tracking-widest text-[#8C6B28] uppercase block mb-1">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Raw Honey Jars */}
          <Link
            href="/honey?cat=honey-raw"
            prefetch={true}
            className="group relative h-80 rounded-lg overflow-hidden transition duration-300 flex flex-col justify-end p-6"
          >
            <Image
              src="/images/banner-honey-terroir.jpg"
              alt="Raw Honey Jars"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-104 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8D7B5]">Reserve Jars</span>
              <h3 className="font-serif text-xl font-bold text-white">Raw Varietal Honey</h3>
              <p className="text-xs text-stone-300 line-clamp-1">Wildflower, black locust &amp; mountain blossom</p>
              <span className="text-xs font-semibold text-[#C5A265] flex items-center gap-1 pt-1 group-hover:underline">
                Explore Jars <ArrowRight size={12} />
              </span>
            </div>
          </Link>

          {/* Card 2: Luxury Gift Boxes */}
          <Link
            href="/gifting"
            prefetch={true}
            className="group relative h-80 rounded-lg overflow-hidden transition duration-300 flex flex-col justify-end p-6"
          >
            <Image
              src="/images/dept-gift-vaults.jpg"
              alt="Luxury Gift Boxes"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-104 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8D7B5]">Gift Vaults</span>
              <h3 className="font-serif text-xl font-bold text-white">Curated Gift Boxes</h3>
              <p className="text-xs text-stone-300 line-clamp-1">Wax seals, brass wands &amp; pairing folios</p>
              <span className="text-xs font-semibold text-[#C5A265] flex items-center gap-1 pt-1 group-hover:underline">
                Build a Gift Box <ArrowRight size={12} />
              </span>
            </div>
          </Link>

          {/* Card 3: Honeycomb */}
          <Link
            href="/honey?cat=honey-comb"
            prefetch={true}
            className="group relative h-80 rounded-lg overflow-hidden transition duration-300 flex flex-col justify-end p-6"
          >
            <Image
              src="/images/dept-honey-comb.jpg"
              alt="Raw Honeycomb"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-104 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8D7B5]">Pure Comb</span>
              <h3 className="font-serif text-xl font-bold text-white">Cut Honeycomb Slabs</h3>
              <p className="text-xs text-stone-300 line-clamp-1">100% edible virgin beeswax cells</p>
              <span className="text-xs font-semibold text-[#C5A265] flex items-center gap-1 pt-1 group-hover:underline">
                View Honeycomb <ArrowRight size={12} />
              </span>
            </div>
          </Link>

          {/* Card 4: Infused & Whipped */}
          <Link
            href="/honey?cat=honey-infused"
            prefetch={true}
            className="group relative h-80 rounded-lg overflow-hidden transition duration-300 flex flex-col justify-end p-6"
          >
            <Image
              src="https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=800"
              alt="Whipped Creamed Honey"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-104 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8D7B5]">Artisan Whips</span>
              <h3 className="font-serif text-xl font-bold text-white">Whipped &amp; Infused</h3>
              <p className="text-xs text-stone-300 line-clamp-1">Bourbon vanilla caviar &amp; wild botanicals</p>
              <span className="text-xs font-semibold text-[#C5A265] flex items-center gap-1 pt-1 group-hover:underline">
                Explore Infusions <ArrowRight size={12} />
              </span>
            </div>
          </Link>

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
                <span className="text-xs font-mono font-bold tracking-widest text-[#8C6B28] uppercase">
                  Current Harvest &bull; Batch #NJ-26-08
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
                  {currentHarvest.name}
                </h2>

                <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-serif">
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
                    <span className="font-serif text-3xl sm:text-4xl font-black text-stone-900">
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
          5. THE AVENOIR STANDARD — PUNCHY PILLARS (BORDERLESS)
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 text-left">
        <div className="max-w-2xl mb-8 space-y-1">
          <span className="text-xs font-bold tracking-widest text-[#8C6B28] uppercase block">
            The Pure Harvest Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Why It Tastes Different
          </h2>
          <p className="text-sm text-stone-600">
            No ultra-filtration. No anonymous industrial drums. Just pure, living honey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-md bg-stone-100 text-[#8C6B28] flex items-center justify-center">
              <Droplets size={20} />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">100% Raw &amp; Cold-Bottled</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Never heated above hive warmth (95&deg;F). Protects natural bio-enzymes, rich aromatics, and wild meadow pollen intact.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-md bg-stone-100 text-[#8C6B28] flex items-center justify-center">
              <Layers size={20} />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">True Micro-Batches</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Extracted yard-by-yard in numbered seasonal lots. Every jar reflects the exact 3-week bloom of that specific meadow.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-md bg-stone-100 text-[#8C6B28] flex items-center justify-center">
              <MapPin size={20} />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">New Jersey Provenance</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Foraged exclusively by our bees across northern New Jersey—from black locust ridges to Sussex wildflower bogs.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-md bg-stone-100 text-[#8C6B28] flex items-center justify-center">
              <Gift size={20} />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Gift-Ready Packaging</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Bottled in heavy French flint glass with wax seal accents, linen presentation boxes, and bespoke pairing guides.
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
              <span className="text-xs font-mono font-bold tracking-widest text-[#C5A265] uppercase block">
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
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="flex justify-center text-[#C5A265] gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Loved by Chefs &amp; Patrons
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
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
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-8 space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-[#8C6B28] uppercase block">
            The Harvest Society
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
            Taste the Season First
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
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
