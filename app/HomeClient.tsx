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
  Sparkles,
  Layers,
  Award,
  Truck,
  FileText,
  Clock,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Compass,
  Download,
  Mail,
  Home as HomeIcon,
  Wine,
  PartyPopper,
  Briefcase
} from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export default function HomeClient() {
  const { addToCart, setIsCartOpen } = useCart();
  const [harvestAdded, setHarvestAdded] = useState(false);
  const [activePassportTab, setActivePassportTab] = useState<'forage' | 'lab' | 'story'>('forage');
  
  // Email capture state
  const [emailSelection, setEmailSelection] = useState<'early-access' | 'pairing-guide' | 'both'>('both');
  const [captureEmail, setCaptureEmail] = useState('');
  const [captureSuccess, setCaptureSuccess] = useState(false);

  // Active Seasonal Harvest Product (Flagship Raw Wildflower)
  const currentHarvest = PRODUCTS.find((p) => p.id === 'AV-JAR-APOTH') || PRODUCTS[2];

  const handleBuyCurrentHarvest = () => {
    addToCart(currentHarvest, 1);
    setHarvestAdded(true);
    setTimeout(() => {
      setHarvestAdded(false);
      setIsCartOpen(true);
    }, 600);
  };

  const handleCaptureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captureEmail.trim()) {
      setCaptureSuccess(true);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* =========================================================================
          SECTION 1: HERO — “Honey with a sense of place.”
          ========================================================================= */}
      <section className="relative bg-white border-b border-stone-200/90 px-4 sm:px-8 xl:px-12 2xl:px-16 flex flex-col justify-between overflow-hidden min-h-[560px] lg:h-[calc(100vh-105px)] lg:max-h-[780px] py-6 sm:py-10">
        
        {/* Authentic Sussex Apiary Landscape Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <Image
            src="/images/hero-apiary-landscape.jpg"
            alt="Authentic Sussex Countryside Apiary with Wooden Beehives"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] opacity-90"
          />
          {/* Typographic Scrim Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent sm:from-white/90 sm:via-white/65 sm:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>

        <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto flex flex-col justify-between h-full relative z-10 gap-6">
          
          {/* Top Live Harvest Status Bar */}
          <div className="flex items-center justify-between gap-2 text-xs border-b border-stone-300/70 pb-2.5 shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex text-[#C5A265]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
              <span className="font-bold text-stone-900 text-xs">4.9 / 5</span>
              <span className="text-stone-500 text-xs hidden sm:inline">&bull; Sussex County First Harvest</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-stone-700">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A3324] animate-pulse"></span>
                <span>Active Batch: #NJ-26-08 &bull; Late Summer Harvest</span>
              </span>
              <span className="hidden md:inline text-stone-300">|</span>
              <span className="hidden md:inline text-stone-600">Free Courier Shipping Over $60</span>
            </div>
          </div>

          {/* Main Hero Copy & Direct Actions */}
          <div className="max-w-3xl space-y-4 sm:space-y-6 my-auto text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-stone-900/90 border border-[#C5A265]/40 text-[#E8D7B5] text-[11px] font-semibold uppercase tracking-wider backdrop-blur-xs">
              <MapPin size={12} className="text-[#C5A265]" />
              <span>Sussex &amp; Morris County Apiaries &bull; Est. 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-stone-900 tracking-tight leading-[1.05]">
              Honey with a <br />
              <span className="text-[#8C6B28] italic font-normal">sense of place.</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-stone-700 leading-relaxed font-serif max-w-2xl">
              Small-batch, single-origin raw honey harvested across Sussex and Morris County apiaries. Bottled cold and unfiltered with the living story of the season still inside.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#current-harvest"
                className="inline-flex items-center gap-2 py-3 px-6 sm:px-7 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition shadow-xs active:scale-98 cursor-pointer"
              >
                <Droplets size={15} className="text-[#C5A265]" />
                <span>Shop the Current Harvest</span>
                <ArrowRight size={13} className="text-[#C5A265]" />
              </a>

              <Link
                href="/gifting"
                prefetch={true}
                className="inline-flex items-center gap-2 py-3 px-6 sm:px-7 rounded-md bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-semibold text-xs sm:text-sm uppercase tracking-wider transition shadow-2xs cursor-pointer"
              >
                <Gift size={15} className="text-stone-700" />
                <span>Build a Gift Box</span>
              </Link>
            </div>

            <p className="text-xs font-serif italic text-stone-500 pt-1">
              &ldquo;Good for your pantry. Even better when shared.&rdquo;
            </p>
          </div>

          {/* Bottom 4-Point Purity Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white/95 backdrop-blur-xs rounded-md border border-stone-200/90 py-2.5 px-4 shadow-2xs shrink-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-800">
              <Check size={14} className="text-[#1A3324] shrink-0" />
              <span>100% Raw &amp; Unheated</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-800">
              <Check size={14} className="text-[#1A3324] shrink-0" />
              <span>Single-Apiary Sussex Yards</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-800">
              <Check size={14} className="text-[#1A3324] shrink-0" />
              <span>Tamper-Evident Hive Passport</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-800">
              <Check size={14} className="text-[#1A3324] shrink-0" />
              <span>Free Courier Shipping &gt; $60</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SHOP THE CURRENT HARVEST — ONE DOMINANT BUY BUTTON
          ========================================================================= */}
      <section id="current-harvest" className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 scroll-mt-28">
        
        <div className="bg-white rounded-xl border border-stone-300/90 shadow-md overflow-hidden text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12 items-center">
            
            {/* Left: Product Photo & Active Harvest Badge */}
            <div className="lg:col-span-6 relative aspect-square sm:aspect-4/3 lg:aspect-square w-full rounded-lg overflow-hidden bg-stone-100 shadow-xs border border-stone-200 group">
              <Image
                src={currentHarvest.imageUrl}
                alt={currentHarvest.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-60" />

              {/* Floating Batch Card Overlay */}
              <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-xs bg-stone-900/95 text-[#E8D7B5] text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A265] animate-pulse"></span>
                  <span>Active Current Harvest</span>
                </span>
                <span className="px-2.5 py-1 rounded-xs bg-white/95 text-stone-900 text-xs font-mono font-bold shadow-2xs">
                  Batch #NJ-26-08
                </span>
              </div>

              <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-stone-950/90 backdrop-blur-md p-3 rounded-md border border-white/15 text-xs text-white flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-[#E8D7B5]">Origin Location</p>
                  <p className="font-semibold text-white">Kittatinny Ridge, Sussex County NJ</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-mono tracking-widest text-[#9DB8A1]">Net Weight</p>
                  <p className="font-semibold text-white">12 oz (340g)</p>
                </div>
              </div>
            </div>

            {/* Right: Detailed Story & ONE DOMINANT BUY BUTTON */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#8C6B28] uppercase">
                    Step into the current season
                  </span>
                  <span className="text-stone-300">&bull;</span>
                  <span className="text-xs text-[#1A3324] font-semibold">Limited Micro-Lot</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
                  {currentHarvest.name}
                </h2>

                <p className="text-xs sm:text-sm font-medium text-[#8C6B28] font-mono">
                  {currentHarvest.subtitle}
                </p>

                <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-serif">
                  {currentHarvest.description}
                </p>

                {/* Flavor & Harvest Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <div className="p-2.5 sm:p-3 rounded-md bg-stone-50 border border-stone-200/80 space-y-0.5">
                    <span className="text-[10px] font-bold uppercase text-stone-400">Tasting Notes</span>
                    <p className="text-xs font-bold text-stone-800">Wild Asters &amp; Caramel</p>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-md bg-stone-50 border border-stone-200/80 space-y-0.5">
                    <span className="text-[10px] font-bold uppercase text-stone-400">Moisture Level</span>
                    <p className="text-xs font-bold text-stone-800">16.8% (Optimal)</p>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-md bg-stone-50 border border-stone-200/80 space-y-0.5">
                    <span className="text-[10px] font-bold uppercase text-stone-400">Handling</span>
                    <p className="text-xs font-bold text-stone-800">Unheated &bull; 94&deg;F</p>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-md bg-stone-50 border border-stone-200/80 space-y-0.5">
                    <span className="text-[10px] font-bold uppercase text-stone-400">Packaging</span>
                    <p className="text-xs font-bold text-stone-800">Flint Jar &bull; Wax Seal</p>
                  </div>
                </div>
              </div>

              {/* Price & The One Dominant Buy Button */}
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
                    <span>In Stock &bull; Ships within 24 hours</span>
                  </span>
                </div>

                {/* THE ONE DOMINANT BUY BUTTON */}
                <button
                  onClick={handleBuyCurrentHarvest}
                  disabled={harvestAdded}
                  className={`w-full py-3.5 sm:py-4 px-6 rounded-md font-semibold text-xs sm:text-sm uppercase tracking-wider transition duration-150 shadow-xs cursor-pointer flex items-center justify-center gap-2.5 ${
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
                      <span>Add Current Harvest to Bag &bull; ${currentHarvest.price.toFixed(2)}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs text-stone-500 pt-1 px-1">
                  <span>Tamper-evident QR passport on lid</span>
                  <Link href="/honey" prefetch={true} className="text-stone-700 font-semibold hover:text-stone-900 hover:underline flex items-center gap-1">
                    <span>Or browse all 12 reserve varietals</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: WHY IT IS DIFFERENT — RAW, SMALL-BATCH, NEW JERSEY, DOCUMENTED
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 text-left">
        <div className="max-w-2xl mb-10 space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#8C6B28] uppercase block">
            The Maison Avenoir Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Why It Is Different
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-serif leading-relaxed">
            Most commercial honey is blended anonymously across industrial drums and ultra-filtered into plain syrup. We take the uncompromising artisanal path.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1: Raw & Unheated */}
          <div className="p-6 sm:p-7 rounded-lg bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-stone-50 border border-stone-200 text-[#8C6B28] flex items-center justify-center">
                <Droplets size={20} />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                100% Raw &amp; Unheated
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Never flash-heated above natural hive temperature (~95&deg;F) and never micro-filtered. Keeps 100% of the live enzymes, raw wildflower pollen, and terroir aromatics intact.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 text-[11px] font-semibold text-stone-800">
              Preserves Natural Crystallization &bull; Live Bio-Enzymes
            </div>
          </div>

          {/* Pillar 2: True Small-Batch */}
          <div className="p-6 sm:p-7 rounded-lg bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-stone-50 border border-stone-200 text-[#8C6B28] flex items-center justify-center">
                <Layers size={20} />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                True Small-Batch
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Spun yard-by-yard in numbered micro-lots. Each extraction captures the unique signature of a single 3-week bloom window, never blended into generic uniformity.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 text-[11px] font-semibold text-stone-800">
              Numbered Batches &bull; 45 Managed Hives
            </div>
          </div>

          {/* Pillar 3: New Jersey Terroir */}
          <div className="p-6 sm:p-7 rounded-lg bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-stone-50 border border-stone-200 text-[#8C6B28] flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                New Jersey Terroir
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Foraged exclusively by our bees across northern New Jersey—black locust ridges, Sussex wildflower valleys, and Pine Barren blossom bogs. Real local provenance.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 text-[11px] font-semibold text-stone-800">
              Sussex, Morris &amp; Kittatinny Ridge Apiaries
            </div>
          </div>

          {/* Pillar 4: Documented Harvest */}
          <div className="p-6 sm:p-7 rounded-lg bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-stone-50 border border-stone-200 text-[#8C6B28] flex items-center justify-center">
                <QrCode size={20} />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Documented Harvest
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Total transparency on every jar. Stamped with harvest dates, floral forage percentages, moisture metrics, and exact GPS coordinates accessible via QR Hive Passport.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 text-[11px] font-semibold text-stone-800">
              Verified Batch Records &bull; QR Traceability
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THE HIVE PASSPORT — REAL BATCH CARD & TRACEABILITY DEMO
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 text-left">
        <div className="bg-[#121110] text-white rounded-xl border border-stone-800 shadow-xl p-6 sm:p-10 lg:p-12 space-y-10">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-stone-800 border border-stone-700 text-[#C5A265] text-xs font-mono font-bold uppercase tracking-wider">
              <QrCode size={13} className="text-[#C5A265]" />
              <span>Tamper-Evident QR Technology</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              The Hive Passport: <span className="text-[#C5A265]">Scan &amp; Trace Every Jar</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-300 font-serif leading-relaxed">
              Every jar of Maison Avenoir carries a laser-etched QR code. Scan it with any smartphone to open the authentic harvest dossier for that exact batch.
            </p>
          </div>

          {/* Dual-Pane Demonstration: Physical Batch Card & Live Screen Record */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Physical Cotton Rag Batch Card Mockup */}
            <div className="lg:col-span-6 bg-white text-stone-900 rounded-lg p-6 sm:p-8 border border-stone-200 shadow-md space-y-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-4">
                  <div>
                    <span className="font-serif text-lg font-bold tracking-[0.14em] text-stone-900 block">
                      MAISON AVENOIR
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#8C6B28]">
                      Apiary Provenance Archive
                    </span>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-stone-100 border border-stone-300 text-stone-900 flex flex-col items-center justify-center text-[9px] font-bold font-serif tracking-widest shadow-2xs">
                    <span>WAX</span>
                    <span>SEAL</span>
                  </div>
                </div>

                <div className="space-y-3 font-serif">
                  <div className="flex justify-between items-baseline border-b border-stone-200 pb-1.5 text-xs">
                    <span className="text-stone-500 uppercase font-sans text-[10px] tracking-wider">Official Batch ID:</span>
                    <span className="font-mono font-bold text-stone-900 text-sm">#NJ-26-08 (Sussex)</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-stone-200 pb-1.5 text-xs">
                    <span className="text-stone-500 uppercase font-sans text-[10px] tracking-wider">Apiary Yard:</span>
                    <span className="font-bold text-stone-900">Kittatinny Ridge, Yard #4</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-stone-200 pb-1.5 text-xs">
                    <span className="text-stone-500 uppercase font-sans text-[10px] tracking-wider">GPS Coordinates:</span>
                    <span className="font-mono text-stone-800 text-xs">41&deg;07&apos;12&quot;N 74&deg;45&apos;29&quot;W</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-stone-200 pb-1.5 text-xs">
                    <span className="text-stone-500 uppercase font-sans text-[10px] tracking-wider">Harvest Window:</span>
                    <span className="text-stone-900 font-semibold">Late Summer 2026 &bull; 21 Dry Days</span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs pt-1">
                    <span className="text-stone-500 uppercase font-sans text-[10px] tracking-wider">Tested Moisture:</span>
                    <span className="font-bold text-[#15231A]">16.8% (Grade-A Raw Optimal)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-600">
                <span>Hand-signed by Head Apiarist</span>
                <span className="font-mono text-stone-500">Scan QR Code on Lid</span>
              </div>
            </div>

            {/* Right: Live Traceability Screen Preview */}
            <div className="lg:col-span-6 bg-[#181716] rounded-lg p-6 sm:p-8 border border-stone-800 shadow-md space-y-5 flex flex-col justify-between">
              
              {/* Screen Header */}
              <div>
                <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C5A265] animate-pulse"></span>
                    <span className="text-xs font-mono font-bold text-[#C5A265] uppercase tracking-wider">
                      Live Traceability Verification
                    </span>
                  </div>
                  <span className="text-xs text-stone-400 font-mono">hivepassport.maisonavenoir.com</span>
                </div>

                {/* Interactive Traceability Tabs */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setActivePassportTab('forage')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                      activePassportTab === 'forage'
                        ? 'bg-[#C5A265] text-stone-950 shadow-xs'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    Floral Forage
                  </button>
                  <button
                    onClick={() => setActivePassportTab('lab')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                      activePassportTab === 'lab'
                        ? 'bg-[#C5A265] text-stone-950 shadow-xs'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    Lab Metrics
                  </button>
                  <button
                    onClick={() => setActivePassportTab('story')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                      activePassportTab === 'story'
                        ? 'bg-[#C5A265] text-stone-950 shadow-xs'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    Beekeeper Log
                  </button>
                </div>

                {/* Tab Content 1: Forage */}
                {activePassportTab === 'forage' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-stone-300 mb-1 font-semibold">
                        <span>Wild Asters (Asteraceae)</span>
                        <span className="text-[#C5A265] font-mono">45%</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#C5A265] rounded-full w-[45%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-stone-300 mb-1 font-semibold">
                        <span>Goldenrod (Solidago)</span>
                        <span className="text-[#C5A265] font-mono">35%</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#A88748] rounded-full w-[35%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-stone-300 mb-1 font-semibold">
                        <span>Japanese Knotweed Blossom</span>
                        <span className="text-[#C5A265] font-mono">20%</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#8C6B28] rounded-full w-[20%]" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content 2: Lab */}
                {activePassportTab === 'lab' && (
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-md bg-stone-800/80 border border-stone-700 space-y-1">
                      <span className="text-stone-400 text-[10px]">Processing Temp</span>
                      <p className="font-bold text-white text-sm">94.2&deg;F (Natural Hive Temp)</p>
                    </div>
                    <div className="p-3 rounded-md bg-stone-800/80 border border-stone-700 space-y-1">
                      <span className="text-stone-400 text-[10px]">Refractometer Moisture</span>
                      <p className="font-bold text-[#E8D7B5] text-sm">16.8% (Raw Premium)</p>
                    </div>
                    <div className="p-3 rounded-md bg-stone-800/80 border border-stone-700 space-y-1">
                      <span className="text-stone-400 text-[10px]">Pollen Count</span>
                      <p className="font-bold text-white text-sm">100% Intact &bull; Unfiltered</p>
                    </div>
                    <div className="p-3 rounded-md bg-stone-800/80 border border-stone-700 space-y-1">
                      <span className="text-stone-400 text-[10px]">Syrup Additives</span>
                      <p className="font-bold text-[#E8D7B5] text-sm">0.00% (Certified Pure)</p>
                    </div>
                  </div>
                )}

                {/* Tab Content 3: Story */}
                {activePassportTab === 'story' && (
                  <div className="p-4 rounded-md bg-stone-800/80 border border-stone-700 space-y-2 text-xs text-stone-300 font-serif leading-relaxed">
                    <p>
                      &ldquo;Pulled frames at dawn under dry August mountain skies along Sussex County ridge. Deep amber hue with rich butterscotch bouquet and crisp floral finish.&rdquo;
                    </p>
                    <p className="font-mono text-[11px] text-[#C5A265]">
                      &mdash; Lead Beekeeper, Yard 4 Inspection
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                <span className="text-xs text-stone-400">Every jar tells its own story.</span>
                <Link href="/terroir" prefetch={true} className="text-xs font-bold text-[#C5A265] hover:text-[#D4B57E] flex items-center gap-1">
                  <span>Explore Terroir Profiles</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: GIFT-READY PRODUCTS — 5 OCCASIONS
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-stone-200 pb-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#8C6B28] uppercase block">
              Gift-Ready Honey
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
              Good for Your Pantry. Better When Shared.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-serif leading-relaxed">
              Hand-packed in New Jersey with complimentary wax-sealed calligraphy notes and zero-pricing gift packaging.
            </p>
          </div>
          <Link
            href="/gifting"
            prefetch={true}
            className="text-xs sm:text-sm font-semibold text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 px-4 py-2.5 rounded-md flex items-center gap-2 transition shrink-0 shadow-2xs"
          >
            <Gift size={15} className="text-[#8C6B28]" />
            <span>Build Your Own Box (Save 25%)</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 5 Gift Occasion Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          
          {/* 1. Dinner Hosts */}
          <Link
            href="/gifting"
            prefetch={true}
            className="group rounded-lg bg-white border border-stone-200/90 hover:border-stone-400 p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition duration-300"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-stone-50 border border-stone-200 text-[#8C6B28] flex items-center justify-center">
                <Wine size={18} />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#8C6B28] block">
                Occasion &bull; 01
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-stone-700 transition">
                Dinner Hosts
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Replace another generic bottle of wine with an unforgettable 3-jar tasting stack paired with cheese notes.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900">
              <span>Send Host Gift</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-[#8C6B28]" />
            </div>
          </Link>

          {/* 2. Holidays */}
          <Link
            href="/gifting"
            prefetch={true}
            className="group rounded-lg bg-white border border-stone-200/90 hover:border-stone-400 p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition duration-300"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-stone-50 border border-stone-200 text-[#8C6B28] flex items-center justify-center">
                <PartyPopper size={18} />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#8C6B28] block">
                Occasion &bull; 02
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-stone-700 transition">
                Holiday Feasts
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The centerpiece of the festive spread: Grand Reserve 6-jar chest with solid brass honey wand.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900">
              <span>Shop Holiday Set</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-[#8C6B28]" />
            </div>
          </Link>

          {/* 3. Client Gifts */}
          <Link
            href="/corporate"
            prefetch={true}
            className="group rounded-lg bg-white border border-stone-200/90 hover:border-stone-400 p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition duration-300"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-stone-50 border border-stone-200 text-[#8C6B28] flex items-center justify-center">
                <Briefcase size={18} />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#8C6B28] block">
                Occasion &bull; 03
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-stone-700 transition">
                Client Gifts
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Heirloom American Walnut presentation trunks with custom engraved brass plaques and corporate billing.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900">
              <span>Corporate Concierge</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-[#8C6B28]" />
            </div>
          </Link>

          {/* 4. Housewarmings */}
          <Link
            href="/gifting"
            prefetch={true}
            className="group rounded-lg bg-white border border-stone-200/90 hover:border-stone-400 p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition duration-300"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-stone-50 border border-stone-200 text-[#8C6B28] flex items-center justify-center">
                <HomeIcon size={18} />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#8C6B28] block">
                Occasion &bull; 04
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-stone-700 transition">
                Housewarmings
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Raw Sussex Wildflower honey paired with hand-poured pure beeswax tapers for a warm hearth.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900">
              <span>Shop Housewarming Duo</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-[#8C6B28]" />
            </div>
          </Link>

          {/* 5. Thank-Yous */}
          <Link
            href="/gifting"
            prefetch={true}
            className="group rounded-lg bg-white border border-stone-200/90 hover:border-stone-400 p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition duration-300"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-stone-50 border border-stone-200 text-[#8C6B28] flex items-center justify-center">
                <HeartHandshake size={18} />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#8C6B28] block">
                Occasion &bull; 05
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-stone-700 transition">
                Heartfelt Thank-Yous
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                A single reserve jar tied with botanical silk ribbon and handwritten wax-sealed calligraphy card.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-900">
              <span>Send a Thank-You</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-[#8C6B28]" />
            </div>
          </Link>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FOUNDER AND HIVE STORY — AUTHENTIC PHOTOS, NOT STOCK IMAGES
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 text-left">
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* Authentic Apiary Photo */}
          <div className="lg:col-span-6 relative min-h-[360px] sm:min-h-[460px] w-full overflow-hidden bg-stone-100 border-b lg:border-b-0 lg:border-r border-stone-200">
            <Image
              src="/images/service-beekeeping-hero.jpg"
              alt="Maison Avenoir Beekeeper inspecting honey frames in Sussex County apiary yard"
              fill
              sizes="(max-width: 1024px) 100vw, 650px"
              className="object-cover object-center hover:scale-102 transition-transform duration-700"
            />
            {/* Real Apiary Badge */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
              <div className="bg-stone-950/90 backdrop-blur-md px-3.5 py-2 rounded-md border border-stone-700 text-xs text-white font-mono shadow-md inline-flex items-center gap-2">
                <MapPin size={13} className="text-[#C5A265]" />
                <span>Sussex County Apiary Yard &bull; 45 Active Hives</span>
              </div>
            </div>
          </div>

          {/* Genuine Founder & Hive Narrative */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest text-[#8C6B28] uppercase block">
                Authentic Roots &bull; Not Corporate Factory Honey
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
                Real Hives. Real Hands. <br />
                <span className="text-[#8C6B28]">Deep Respect for the Season.</span>
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-stone-600 leading-relaxed font-serif">
                Most supermarket honey begins in nameless industrial shipping containers, pooled across anonymous distributors, and flash-heated until all floral character is erased. We founded Maison Avenoir to prove there is a better way.
              </p>

              <p className="text-xs sm:text-sm lg:text-base text-stone-600 leading-relaxed font-serif">
                We steward our own apiaries across Sussex and Morris counties. We never feed sugar syrups during nectar flow, we never heat our honey past hive temperature (95&deg;F), and we never blend across different apiary yards. When you open a jar of Maison Avenoir, you taste the exact wildflowers and trees our bees visited across a single New Jersey summer.
              </p>

              {/* Authentic Philosophy Quote */}
              <blockquote className="p-4 rounded-md bg-stone-50 border-l-2 border-[#C5A265] text-xs sm:text-sm font-serif italic text-stone-800 leading-relaxed">
                &ldquo;Our job isn&apos;t to manufacture honey &mdash; it&apos;s to protect what the bees gathered from local fields and bottle it honestly.&rdquo;
                <span className="block not-italic font-sans text-[11px] font-bold text-[#8C6B28] mt-1">&mdash; Founder &amp; Head Apiarist</span>
              </blockquote>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/services/educate"
                prefetch={true}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white text-xs font-bold uppercase tracking-wider transition shadow-2xs cursor-pointer"
              >
                <span>Visit the Apiary Academy</span>
                <ArrowRight size={13} className="text-[#C5A265]" />
              </Link>
              <Link
                href="/services/beekeeping"
                prefetch={true}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-2xs"
              >
                <span>Estate Hive Stewardship</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: CORPORATE GIFTING CTA — “Send a taste of New Jersey.”
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16">
        <div className="bg-[#142118] text-white rounded-xl border border-[#223528] shadow-xl p-8 sm:p-12 lg:p-16 text-left relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C5A265_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest text-[#C5A265] uppercase block">
                Executive &amp; Corporate Gifting Concierge
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                &ldquo;Send a taste of New Jersey.&rdquo;
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-stone-300 font-serif leading-relaxed max-w-2xl">
                Elevate client relationships and executive milestones with bespoke honey gift sets. Handcrafted in Sussex County with custom wax seals, personalized branding plaques, and multi-recipient courier dispatch.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#C5A265] shrink-0" />
                  <span>Multi-Address Spreadsheet Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#C5A265] shrink-0" />
                  <span>Blind Packaging (Zero Prices)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#C5A265] shrink-0" />
                  <span>Custom Wax Stamps &amp; Logos</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <Link
                href="/corporate"
                prefetch={true}
                className="w-full py-3.5 px-6 rounded-md bg-[#C5A265] hover:bg-[#B38E46] text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition text-center shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Corporate Concierge</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/gifting"
                prefetch={true}
                className="w-full py-3 px-6 rounded-md bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition text-center border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Gifting Catalog</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: EMAIL CAPTURE — EARLY ACCESS OR HONEY PAIRING GUIDE
          ========================================================================= */}
      <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 text-left">
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-8 sm:p-12 max-w-4xl mx-auto space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#8C6B28] uppercase block">
              Join the Harvest Society
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Stay Connected to the Season
            </h2>
            
            <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed">
              Get early access to our limited micro-batch harvest drops before public release, or download our printable Sussex County Honey Pairing Guide &amp; Kitchen Recipes.
            </p>
          </div>

          {/* Interactive Benefit Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            <button
              type="button"
              onClick={() => setEmailSelection('early-access')}
              className={`p-3.5 rounded-md border text-left transition cursor-pointer flex items-start gap-2.5 ${
                emailSelection === 'early-access'
                  ? 'border-[#15231A] bg-[#15231A] text-white shadow-2xs'
                  : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300'
              }`}
            >
              <Clock size={16} className={emailSelection === 'early-access' ? 'text-[#C5A265]' : 'text-[#8C6B28]'} />
              <div>
                <p className="font-bold text-xs">Early Batch Access</p>
                <p className={`text-[10px] mt-0.5 ${emailSelection === 'early-access' ? 'text-stone-300' : 'text-stone-500'}`}>First notification before batches sell out</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setEmailSelection('pairing-guide')}
              className={`p-3.5 rounded-md border text-left transition cursor-pointer flex items-start gap-2.5 ${
                emailSelection === 'pairing-guide'
                  ? 'border-[#15231A] bg-[#15231A] text-white shadow-2xs'
                  : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300'
              }`}
            >
              <BookOpen size={16} className={emailSelection === 'pairing-guide' ? 'text-[#C5A265]' : 'text-[#8C6B28]'} />
              <div>
                <p className="font-bold text-xs">Pairing Guide PDF</p>
                <p className={`text-[10px] mt-0.5 ${emailSelection === 'pairing-guide' ? 'text-stone-300' : 'text-stone-500'}`}>Printable kitchen pairing chart &amp; recipes</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setEmailSelection('both')}
              className={`p-3.5 rounded-md border text-left transition cursor-pointer flex items-start gap-2.5 ${
                emailSelection === 'both'
                  ? 'border-[#15231A] bg-[#15231A] text-white shadow-2xs'
                  : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300'
              }`}
            >
              <Sparkles size={16} className={emailSelection === 'both' ? 'text-[#C5A265]' : 'text-[#8C6B28]'} />
              <div>
                <p className="font-bold text-xs">Both Privileges</p>
                <p className={`text-[10px] mt-0.5 ${emailSelection === 'both' ? 'text-stone-300' : 'text-stone-500'}`}>Full harvest membership + recipe folio</p>
              </div>
            </button>
          </div>

          {/* Email Capture Form or Success State */}
          <div className="max-w-xl mx-auto">
            {captureSuccess ? (
              <div className="p-6 rounded-lg bg-[#142118] text-white border border-[#C5A265] text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-10 h-10 rounded-full bg-[#C5A265] text-stone-950 flex items-center justify-center mx-auto font-bold">
                  <Check size={20} strokeWidth={3} />
                </div>
                <h4 className="font-serif text-lg font-bold text-white">
                  Welcome to the Harvest Society
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed max-w-md mx-auto">
                  You are on the priority reservation list for the next batch drop. Your printable Sussex County Honey Pairing Guide is ready below.
                </p>
                <div className="pt-2">
                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Downloading Maison Avenoir Sussex Honey Pairing Guide (PDF)...');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#C5A265] hover:bg-[#B38E46] text-stone-950 font-bold text-xs transition shadow-sm"
                  >
                    <Download size={14} />
                    <span>Download Honey Pairing Guide (PDF)</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCaptureSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="email"
                      required
                      value={captureEmail}
                      onChange={(e) => setCaptureEmail(e.target.value)}
                      placeholder="Enter your email for harvest access & guide..."
                      className="w-full pl-10 pr-4 py-3 rounded-md border border-stone-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-stone-800 transition shadow-2xs placeholder:text-stone-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    Claim Harvest Access
                  </button>
                </div>
                <p className="text-[11px] text-stone-500 text-center">
                  We send 1&ndash;2 seasonal harvest alerts when frames are spun. No discount spam, no marketing noise.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
