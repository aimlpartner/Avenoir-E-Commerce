'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  CheckCircle2,
  Mail,
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { HERO_WALL_CLIPS } from '@/lib/apiaryVideos';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import BrandLogo from '@/components/BrandLogo';
import ApiaryProofSection from '@/components/ApiaryProofSection';
import BeeFarmGallery from '@/components/BeeFarmGallery';

const TESTIMONIALS = [
  {
    quote: 'You can taste the wildflowers immediately. Completely spoiled supermarket honey for us.',
    author: 'Elena Rostova',
    role: 'Pastry Chef, Tribeca',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  },
  {
    quote: 'A staple for our kitchen and dinner hosts. Pure raw honey with nothing hidden.',
    author: 'Julian Vance',
    role: 'Creative Director, Soho',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  },
  {
    quote: 'The Bourbon Vanilla whipped honey spreads like velvet cream at weekend brunch.',
    author: 'Claire Sinclair',
    role: 'Rumson, NJ',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
  },
  {
    quote: 'Cold-extracted nectar that nothing else on a store shelf compares to.',
    author: 'Marcus Chen',
    role: 'Jersey City, NJ',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  },
  {
    quote: 'The walnut gift box presentation and beeswax seals made a lasting impression.',
    author: 'Sophie Laurent',
    role: 'Sommelier, Princeton',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  },
];

export default function HomeClient() {
  const { addToCart, setIsCartOpen } = useCart();
  const [harvestAdded, setHarvestAdded] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(true);
  const testimonialCarouselRef = useRef<HTMLDivElement>(null);
  const heroVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    heroVideoRefs.current.forEach((vid) => {
      if (!vid) return;
      if (heroVideoPlaying) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [heroVideoPlaying]);

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (testimonialCarouselRef.current) {
      const card = testimonialCarouselRef.current.querySelector<HTMLElement>('[data-testimonial-card]');
      const cardWidth = card ? card.offsetWidth + 24 : 380;
      testimonialCarouselRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const currentHarvest = PRODUCTS.find((p) => p.id === 'AV-JAR-APOTH') || PRODUCTS[0];

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
    <div className="space-y-16 sm:space-y-24">
      
      {/* =========================================================================
          1. HERO — 5 LIVE APIARY CLIPS SIDE-BY-SIDE + REAL BOTTLE CUTOUT
          ========================================================================= */}
      <section className="relative bg-[#111913] text-white border-b border-stone-800 px-4 sm:px-8 xl:px-12 2xl:px-16 overflow-hidden min-h-[540px] lg:min-h-[630px] flex items-center py-14 sm:py-18 lg:py-20">
        
        {/* Side-by-Side Live Apiary Video Background Wall */}
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
                ref={(el) => {
                  heroVideoRefs.current[idx] = el;
                }}
                src={clip.videoUrl}
                poster={clip.posterUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover scale-102 opacity-80"
              />
            </div>
          ))}
        </div>

        {/* Contrast Scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-1 bg-gradient-to-r from-[#0E1812]/90 via-[#111E16]/72 to-[#0E1812]/55"
        />

        {/* Foreground Content */}
        <div className="relative z-10 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-6">
          
          {/* Left Column: Crisp Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal text-white tracking-tight leading-[1.06] drop-shadow-sm">
              Raw wildflower honey. <br />
              <span className="italic text-[#FB5601]">Straight from our hives.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-200 font-serif max-w-md mx-auto lg:mx-0">
              Madisonville Apiary &bull; Basking Ridge, NJ
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href="#bestsellers"
                className="py-3.5 px-8 rounded-md bg-[#FB5601] hover:bg-[#D64500] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition shadow-md active:scale-98"
              >
                Shop Honey
              </a>

              <Link
                href="/gifting"
                prefetch={true}
                className="py-3.5 px-7 rounded-md bg-white/95 hover:bg-white text-stone-900 font-semibold text-xs sm:text-sm uppercase tracking-wider transition shadow-sm"
              >
                Gift Boxes
              </Link>
            </div>
          </div>

          {/* Right Column: Real Singing Bee Bottle + Cut Honeycomb */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative">
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] h-[340px] sm:h-[420px] lg:h-[460px] flex items-center justify-center">
              <div className="absolute inset-6 rounded-full bg-[#FB5601]/25 blur-3xl pointer-events-none" />

              {/* Real Singing Bee Bottle Photo */}
              <div className="relative w-[220px] sm:w-[270px] lg:w-[300px] h-full drop-shadow-[0_24px_38px_rgba(0,0,0,0.5)] z-10 pointer-events-none select-none">
                <Image
                  src="/media/products/singing-bee-bottle.png"
                  alt="Singing Bee Wildflower Honey 16 oz Bottle"
                  fill
                  priority
                  sizes="(max-width: 1024px) 270px, 300px"
                  className="object-contain"
                />
              </div>

              {/* Cut Honeycomb Accent */}
              <div className="absolute left-0 sm:left-2 bottom-2 sm:bottom-4 w-[160px] sm:w-[205px] lg:w-[225px] aspect-4/3 drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] z-20 pointer-events-none select-none">
                <Image
                  src="/media/products/hero-honeycomb-cutout.png"
                  alt="Raw Cut Honeycomb Slab"
                  fill
                  priority
                  sizes="(max-width: 1024px) 205px, 225px"
                  className="object-contain"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setHeroVideoPlaying((prev) => !prev)}
              className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/75 border border-white/20 text-[11px] font-mono text-stone-200 backdrop-blur-xs transition cursor-pointer"
              aria-label={heroVideoPlaying ? 'Pause background videos' : 'Play background videos'}
            >
              {heroVideoPlaying ? <Pause size={12} className="text-[#FB5601]" /> : <Play size={12} className="text-[#FB5601]" />}
              <span>{heroVideoPlaying ? 'Pause Hive BG' : 'Play Hive BG'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. BESTSELLERS PRODUCT GRID
          ========================================================================= */}
      <section id="bestsellers" className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 scroll-mt-24 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <BrandLogo variant="mark" className="w-5 h-5" />
              <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-[#D64500] uppercase">
                Seasonal Favorites
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
              Our Most Loved Harvests
            </h2>
          </div>
          <Link
            href="/honey"
            prefetch={true}
            className="text-xs sm:text-sm font-medium text-stone-700 hover:text-[#D64500] flex items-center gap-1.5 transition shrink-0 group font-serif"
          >
            <span>View All Honeys</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. TRUST & AUTHENTICITY — 7 REAL APIARY CLIPS SIDE-BY-SIDE
          ========================================================================= */}
      <ApiaryProofSection />

      {/* =========================================================================
          3B. REAL BEE FARM WORKPLACE GALLERY
          ========================================================================= */}
      <BeeFarmGallery />

      {/* =========================================================================
          4. SHOP BY CATEGORY — CLEAN VISUAL BENTO (REAL FARM PHOTOS)
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 py-4 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <BrandLogo variant="mark" className="w-5 h-5" />
              <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-[#D64500] uppercase">
                Collections
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            prefetch={true}
            className="text-xs sm:text-sm font-medium text-stone-700 hover:text-[#D64500] flex items-center gap-1.5 transition shrink-0 group font-serif"
          >
            <span>Full Catalog</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          <Link
            href="/honey?cat=honey-raw"
            prefetch={true}
            className="group relative lg:col-span-6 h-[380px] sm:h-[440px] lg:h-[510px] rounded-xl overflow-hidden flex flex-col justify-end p-7 sm:p-9 cursor-pointer"
          >
            <Image
              src="/media/apiary/photos/glass-top-hive.jpeg"
              alt="Raw Wildflower Honey Hives"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent" />
            <div className="absolute top-5 left-5 z-10">
              <BrandLogo variant="seal" />
            </div>
            <div className="relative z-10 flex items-end justify-between">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                Raw Wildflower Honey
              </h3>
              <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white group-hover:bg-[#FB5601] group-hover:border-[#FB5601] transition-colors shrink-0">
                <ArrowRight size={16} />
              </span>
            </div>
          </Link>

          <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6">
            <Link
              href="/beekeeping"
              prefetch={true}
              className="group relative h-[220px] sm:h-[240px] rounded-xl overflow-hidden flex flex-col justify-end p-6 sm:p-7 cursor-pointer"
            >
              <Image
                src="/media/apiary/photos/sunset-hives-row.jpeg"
                alt="Apiary Hives & Equipment"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent" />
              <div className="relative z-10 flex items-end justify-between">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                  Beekeeping &amp; Hives
                </h3>
                <span className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white group-hover:bg-[#FB5601] group-hover:border-[#FB5601] transition-colors shrink-0">
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 flex-1">
              <Link
                href="/honey?cat=honey-comb"
                prefetch={true}
                className="group relative h-[200px] sm:h-auto rounded-xl overflow-hidden flex flex-col justify-end p-6 cursor-pointer"
              >
                <Image
                  src="/media/apiary/photos/frame-inspection-closeup.jpg"
                  alt="Fresh Comb & Frames"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent" />
                <div className="relative z-10 flex items-end justify-between">
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
                    Fresh Comb &amp; Frames
                  </h3>
                  <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white group-hover:bg-[#FB5601] group-hover:border-[#FB5601] transition-colors shrink-0">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>

              <Link
                href="/gifting"
                prefetch={true}
                className="group relative h-[200px] sm:h-auto rounded-xl overflow-hidden flex flex-col justify-end p-6 cursor-pointer bg-gradient-to-br from-[#142118] to-[#0E1812]"
              >
                <Image
                  src="/media/products/singing-bee-bottle.png"
                  alt="Gift Boxes & Bottles"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-5 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent" />
                <div className="relative z-10 flex items-end justify-between">
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
                    Gift Boxes &amp; Bottles
                  </h3>
                  <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white group-hover:bg-[#FB5601] group-hover:border-[#FB5601] transition-colors shrink-0">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. SPOTLIGHT: REAL BOTTLE HARVEST
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 text-left">
        <div className="bg-[#FAF7F2] border border-stone-200/80 rounded-2xl overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Real Bottle Photo */}
            <div className="lg:col-span-6 relative aspect-square sm:aspect-4/3 lg:aspect-square w-full rounded-xl flex items-center justify-center p-4 sm:p-8 group">
              <div className="absolute top-3 left-3 z-20">
                <BrandLogo variant="seal" />
              </div>
              <Image
                src="/media/products/singing-bee-bottle.png"
                alt={currentHarvest.name}
                fill
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-contain p-4 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>

            {/* Crisp Product Specs & Instant Purchase */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-[#D64500] uppercase block">
                  Flagship Bottle &bull; 16 oz Net Wt
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-tight">
                  {currentHarvest.name}
                </h2>

                <p className="text-sm sm:text-base text-stone-600 font-serif">
                  Bee made from neighborhood flowers at Madisonville Apiary, Basking Ridge, NJ.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-white border border-stone-200/70">
                    <span className="text-[10px] font-bold uppercase text-[#D64500] block">Apiary</span>
                    <p className="text-xs font-bold text-stone-800">Madisonville</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-stone-200/70">
                    <span className="text-[10px] font-bold uppercase text-[#D64500] block">Origin</span>
                    <p className="text-xs font-bold text-stone-800">Basking Ridge, NJ</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-stone-200/70">
                    <span className="text-[10px] font-bold uppercase text-[#D64500] block">Process</span>
                    <p className="text-xs font-bold text-stone-800">Raw &amp; Unfiltered</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-serif text-3xl sm:text-4xl font-normal text-stone-900">
                      ${currentHarvest.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-stone-500 ml-2 font-medium">/ 16 oz bottle</span>
                  </div>
                  <span className="text-xs font-semibold text-[#1A3324] flex items-center gap-1">
                    <Truck size={14} className="text-[#FB5601]" />
                    <span>Ships in 24h</span>
                  </span>
                </div>

                <button
                  onClick={handleBuyCurrentHarvest}
                  disabled={harvestAdded}
                  className={`w-full py-4 px-6 rounded-md font-semibold text-xs sm:text-sm uppercase tracking-wider transition duration-150 shadow-xs cursor-pointer flex items-center justify-center gap-2.5 ${
                    harvestAdded
                      ? 'bg-[#FB5601] text-white'
                      : 'bg-[#15231A] hover:bg-[#1E3326] text-white active:scale-98'
                  }`}
                >
                  {harvestAdded ? (
                    <>
                      <CheckCircle2 size={18} className="text-white" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} className="text-[#FB5601]" />
                      <span>Add to Bag &bull; ${currentHarvest.price.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          6. THE SINGING BEE STANDARD — 4 CRISP PILLARS
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 py-6 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#D64500] uppercase block font-mono mb-1.5">
              Pure Harvest Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
              Why It Tastes Different
            </h2>
          </div>
          <BrandLogo variant="pill" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="border-t-2 border-[#FB5601] pt-5 space-y-1">
            <h3 className="font-serif text-lg font-normal text-stone-900">Cold-Bottled Raw</h3>
            <p className="text-xs text-stone-500">Never heated above hive warmth.</p>
          </div>
          <div className="border-t-2 border-[#FB5601]/65 pt-5 space-y-1">
            <h3 className="font-serif text-lg font-normal text-stone-900">Neighborhood Flora</h3>
            <p className="text-xs text-stone-500">Basking Ridge meadows &amp; ridges.</p>
          </div>
          <div className="border-t-2 border-[#FB5601]/40 pt-5 space-y-1">
            <h3 className="font-serif text-lg font-normal text-stone-900">Zero Filtration</h3>
            <p className="text-xs text-stone-500">Natural pollen &amp; enzymes intact.</p>
          </div>
          <div className="border-t-2 border-[#FB5601]/25 pt-5 space-y-1">
            <h3 className="font-serif text-lg font-normal text-stone-900">Small Batches</h3>
            <p className="text-xs text-stone-500">Spun directly from our frames.</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. GIFTING EDITORIAL BAND
          ========================================================================= */}
      <section className="w-full bg-[#142118] text-white border-y border-[#223528] py-14 sm:py-16 text-left">
        <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-2 flex justify-start lg:justify-center">
              <BrandLogo variant="card" />
            </div>

            <div className="lg:col-span-6 space-y-2.5">
              <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-[#FB5601] uppercase block">
                Gifting
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-[1.1]">
                Good for your pantry. <br />
                <span className="text-[#FB5601] italic">Even better shared.</span>
              </h2>
              <p className="text-sm text-stone-300 font-serif max-w-md">
                Wax-sealed gift boxes, brass dippers, and handwritten cards.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/gifting"
                prefetch={true}
                className="w-full py-3.5 px-6 rounded-md bg-[#FB5601] hover:bg-[#D64500] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition text-center shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Build a Gift Box</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/corporate"
                prefetch={true}
                className="w-full py-3.5 px-6 rounded-md bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition text-center border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Corporate Gifting</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          8. PATRON TESTIMONIALS
          ========================================================================= */}
      <section className="w-full text-stone-900 text-left">
        <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <BrandLogo variant="mark" className="w-5 h-5" />
                <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-[#D64500] uppercase">
                  Reviews
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
                Loved by New Jersey Tables
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => scrollTestimonials('left')}
                className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#FB5601] text-stone-600 hover:text-[#D64500] bg-white flex items-center justify-center transition cursor-pointer"
                aria-label="Previous Testimonials"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollTestimonials('right')}
                className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#FB5601] text-stone-600 hover:text-[#D64500] bg-white flex items-center justify-center transition cursor-pointer"
                aria-label="Next Testimonials"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={testimonialCarouselRef}
            className="flex gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-2"
          >
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                data-testimonial-card
                className="flex-shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start bg-white border border-stone-200/90 hover:border-[#FB5601]/60 rounded-2xl p-6 flex flex-col justify-between min-h-[210px] shadow-2xs transition"
              >
                <p className="font-serif text-stone-700 text-base leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between gap-3 pt-5 border-t border-stone-100 mt-5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-stone-200">
                      <Image src={t.avatar} alt={t.author} fill sizes="36px" className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-semibold text-stone-900 leading-tight">{t.author}</h3>
                      <p className="text-xs text-stone-400">{t.role}</p>
                    </div>
                  </div>
                  <BrandLogo variant="mark" className="w-5 h-5 opacity-80" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          9. NEWSLETTER
          ========================================================================= */}
      <section className="w-full bg-stone-100/80 border-t border-stone-200 py-14 sm:py-16 text-center">
        <div className="w-full max-w-xl mx-auto px-4 sm:px-8 space-y-3.5">
          <div className="flex justify-center">
            <BrandLogo variant="seal" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
            Taste the Season First
          </h2>
          <p className="text-sm text-stone-500 font-serif">
            Get 10% off your first bottle and seasonal harvest alerts.
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
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email for 10% off..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-md border border-stone-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#FB5601] focus:border-[#FB5601]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-md bg-[#FB5601] hover:bg-[#D64500] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer whitespace-nowrap"
                >
                  Claim 10% Off
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
