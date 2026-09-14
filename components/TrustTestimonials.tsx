'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Sparkles, ExternalLink } from 'lucide-react';
import { PRODUCTS, ProductItem } from '@/lib/products';

type CategoryFilter = 'all' | 'culinary' | 'apiary' | 'gifting';

interface TestimonialRecord {
  id: string;
  author: string;
  role: string;
  affiliation?: string;
  location: string;
  category: 'culinary' | 'apiary' | 'gifting';
  productId: string;
  harvestNote: string;
  text: string;
  date: string;
}

const TESTIMONIAL_ARCHIVES: TestimonialRecord[] = [
  // ==========================================
  // CULINARY & CHEFS (8 RECORDS)
  // ==========================================
  {
    id: 'cul-01',
    author: 'Chef Julian Vance',
    role: 'Pastry Director',
    affiliation: 'L’Atelier Botanique (2 Michelin Stars)',
    location: 'Manhattan, NY',
    category: 'culinary',
    productId: 'AV-JAR-SKYLAND',
    harvestNote: 'Summer Harvest • Cold-Extracted',
    text: 'The subtle mint and camphor floral notes in this cold-extracted Linden honey are extraordinary. It completely elevated our seasonal dessert service with natural enzymatic complexity.',
    date: 'August 2025',
  },
  {
    id: 'cul-02',
    author: 'Claire Beaumont',
    role: 'Terroir Sommelier & Botanical Judge',
    affiliation: 'Northeast Floral Preservation Guild',
    location: 'Brooklyn, NY',
    category: 'culinary',
    productId: 'AV-JAR-APOTH',
    harvestNote: 'Kittatinny Ridge Elevation 1,450ft',
    text: 'You can taste the exact elevation of the forest canopy. Diastase lab numbers of 28+ DN confirm this raw nectar has never touched pasteurization heat. The flint apothecary bottle is a work of art.',
    date: 'September 2025',
  },
  {
    id: 'cul-03',
    author: 'Sophia Rossi',
    role: 'Fine Food Artisan',
    affiliation: 'The Curated Board',
    location: 'Summit, NJ',
    category: 'culinary',
    productId: 'AV-COMB-SLAB',
    harvestNote: 'Virgin Wax • Unfiltered Comb',
    text: 'Served this raw honeycomb slab on warm rustic sourdough with triple-crème cheese for our tasting room. Chewing the delicate virgin comb wax is pure culinary nostalgia.',
    date: 'September 2025',
  },
  {
    id: 'cul-04',
    author: 'Dr. Evelyn Martinez',
    role: 'Estate Botanist',
    affiliation: 'Skyland Arboretum Conservancy',
    location: 'Sussex, NJ',
    category: 'culinary',
    productId: 'AV-JAR-HEXDUO',
    harvestNote: 'Spring Locust & Summer Linden Pairing',
    text: 'The floral contrast between the water-white Spring Black Locust and the amber Linden is a sensory masterclass in Sussex County floral geography.',
    date: 'July 2025',
  },
  {
    id: 'cul-05',
    author: 'Mei-Ling Zhou',
    role: 'Ceremonial Tea Master',
    affiliation: 'Cloud & Leaf Tea Pavilion',
    location: 'San Francisco, CA',
    category: 'culinary',
    productId: 'AV-INF-VANILLA',
    harvestNote: 'Madagascar Grade-A Pod Infusion',
    text: 'Cold-steeped bourbon vanilla notes merge with raw floral nectar without overwhelming high-mountain roasted oolong. Remarkable clarity and silky texture.',
    date: 'September 2025',
  },
  {
    id: 'cul-06',
    author: 'Chef Luca Moretti',
    role: 'Executive Chef',
    affiliation: 'Osteria Della Valle',
    location: 'Philadelphia, PA',
    category: 'culinary',
    productId: 'AV-INF-LAVENDER',
    harvestNote: 'Provence Flower Cold-Steeped',
    text: 'Used for finishing house-made ricotta and roasted baby figs. The lavender perfume is gentle, authentic, and free of artificial essences.',
    date: 'June 2025',
  },
  {
    id: 'cul-07',
    author: 'Antoine Morales',
    role: 'Charcuterie & Fromage Director',
    affiliation: 'Tableau Gourmet Market',
    location: 'Philadelphia, PA',
    category: 'culinary',
    productId: 'AV-JAR-APOTH',
    harvestNote: 'Wild Pine Honeydew Extract',
    text: 'The dark resinous undertones and natural low moisture level create an intoxicating pairing with aged alpine cheeses and smoked duck.',
    date: 'October 2025',
  },
  {
    id: 'cul-08',
    author: 'Nadia Chen',
    role: 'Artisan Sourdough Baker',
    affiliation: 'Hearth & Stone Bakery',
    location: 'Hoboken, NJ',
    category: 'culinary',
    productId: 'AV-JAR-SKYLAND',
    harvestNote: 'Wild Linden Nectar Starter',
    text: 'We feed our hundred-year-old starter with a touch of this raw unpasteurized honey. The active wild yeasts produce a crumb structure like nothing else.',
    date: 'November 2025',
  },

  // ==========================================
  // APIARY & FIELD EQUIPMENT (8 RECORDS)
  // ==========================================
  {
    id: 'api-01',
    author: 'Eleanor Thorne',
    role: 'County Apiary Inspector & Master Beekeeper',
    affiliation: 'Northern Valley Apiary Society',
    location: 'Sussex County, NJ',
    category: 'apiary',
    productId: 'AV-BEE-SUIT',
    harvestNote: 'Yard 4 Field Inspection • 94°F Humidity',
    text: 'Finest 3D air-mesh construction I have tested in thirty years of county inspections. Complete cross-ventilation in midsummer sun with zero sting penetrations across 180 hive checks.',
    date: 'July 2025',
  },
  {
    id: 'api-02',
    author: 'David K. Lindholm',
    role: 'Commercial Apiarist',
    affiliation: 'Green Mountain Bee Farm (120 Hives)',
    location: 'Woodstock, VT',
    category: 'apiary',
    productId: 'AV-BEE-BOX',
    harvestNote: 'Overwintering Trial • Zone 5a',
    text: 'Dovetail tolerances fitted together like cabinet-grade furniture without needing rasping. The natural Western Red Cedar aroma and thermal insulation over winter outperformed standard pine.',
    date: 'November 2025',
  },
  {
    id: 'api-03',
    author: 'Tom Henderson',
    role: 'Production Apiary Manager',
    affiliation: 'Hudson River Apiaries',
    location: 'Hudson Valley, NY',
    category: 'apiary',
    productId: 'AV-BEE-SMOKER',
    harvestNote: 'Heavy Commercial Daily Yard Cycle',
    text: 'Heavy 304 surgical stainless chamber with real leather bellows and a protective cage that stays cool. We replaced our entire fleet of flimsy commercial smokers with this model.',
    date: 'June 2025',
  },
  {
    id: 'api-04',
    author: 'Rachel Green',
    role: 'Apiary Technician',
    affiliation: 'Highland Bee Yard',
    location: 'Bucks County, PA',
    category: 'apiary',
    productId: 'AV-BEE-GLOVES',
    harvestNote: 'Queen Cell Grafting & Frame Pulls',
    text: 'Soft and tactile enough to gently hold delicate queen cages without crushing, while the elbow-length canvas keeps forearm stings at zero. Truly supple right out of the box.',
    date: 'May 2025',
  },
  {
    id: 'api-05',
    author: 'Gareth MacIntyre',
    role: 'Senior Beekeeper',
    affiliation: 'Adirondack Honeyworks',
    location: 'Lake Placid, NY',
    category: 'apiary',
    productId: 'AV-BEE-JHOOK',
    harvestNote: 'Propolis-Caked Frame Extractions',
    text: 'The beveled fulcrum lifts propolis-sealed wooden frames cleanly without gouging sidebars. Damascus steel balance feels like an heirloom tool.',
    date: 'August 2025',
  },
  {
    id: 'api-06',
    author: 'Soren Lind',
    role: 'Master Woodworker & Hive Builder',
    affiliation: 'Berkshire Wood Craft',
    location: 'Great Barrington, MA',
    category: 'apiary',
    productId: 'AV-BEE-FRAMES',
    harvestNote: 'Kiln-Dried White Pine Joinery',
    text: 'Grooved top and bottom bars fit foundation wax sheets with millimetric precision. Sturdy enough to withstand repetitive centrifugal extractor cycles.',
    date: 'September 2025',
  },
  {
    id: 'api-07',
    author: 'Kendra Walsh',
    role: 'Urban Apiarist & Educator',
    affiliation: 'Rooftop Pollinator Project',
    location: 'Jersey City, NJ',
    category: 'apiary',
    productId: 'AV-BEE-UNCAP',
    harvestNote: 'Centrifugal Extraction Room',
    text: 'The stainless uncapping roller opens virgin cells cleanly without destroying the underlying comb geometry. Our bees repaired the comb in under 48 hours.',
    date: 'August 2025',
  },
  {
    id: 'api-08',
    author: 'Liam O’Connell',
    role: 'Sideline Beekeeper (30 Colonies)',
    location: 'Warwick, NY',
    category: 'apiary',
    productId: 'AV-BEE-SUIT',
    harvestNote: 'Late Summer Robbing Season Defense',
    text: 'Working defensive colonies during a dearth can be stressful, but this suit provides absolute peace of mind. The veil rigidity keeps the mesh off your face entirely.',
    date: 'October 2025',
  },

  // ==========================================
  // HEIRLOOM & CORPORATE GIFTING (8 RECORDS)
  // ==========================================
  {
    id: 'gift-01',
    author: 'Marcus Sterling',
    role: 'Managing Partner',
    affiliation: 'Sterling & Cross Partners',
    location: 'Boston, MA',
    category: 'gifting',
    productId: 'AV-BOX-WALNUT',
    harvestNote: 'Custom Commission • 40 Keepsake Trunks',
    text: 'We commissioned 40 custom brass-engraved walnut trunks for our executive retreat. The joinery, wax seals, and provenance certificates were breathtaking. Our international clients were enthralled.',
    date: 'October 2025',
  },
  {
    id: 'gift-02',
    author: 'Helena Rostova',
    role: 'Private Collector & Patron',
    affiliation: 'Private Cellar Archive',
    location: 'Princeton, NJ',
    category: 'gifting',
    productId: 'AV-CHEST-MAPLE',
    harvestNote: 'Numbered Edition 014 of 050',
    text: 'The holographic chatoyancy of the New England birdseye maple is museum-grade. The French apothecary vessels with gold-poured beeswax seals sit in our salon as an heirloom centerpiece.',
    date: 'December 2025',
  },
  {
    id: 'gift-03',
    author: 'Harrison Van Der Bilt',
    role: 'Guest Experience Director',
    affiliation: 'The Somerset Hills Manor',
    location: 'Bernardsville, NJ',
    category: 'gifting',
    productId: 'AV-JAR-SKYLAND',
    harvestNote: 'Boutique Breakfast Table Service',
    text: 'Our breakfast guests continually ask where to purchase these amber cork-sealed jars. A singular regional luxury that speaks volumes about artisanal provenance.',
    date: 'October 2025',
  },
  {
    id: 'gift-04',
    author: 'Camilla Dupont',
    role: 'Corporate Events Producer',
    affiliation: 'Atelier Lux Event Design',
    location: 'New York, NY',
    category: 'gifting',
    productId: 'AV-ACC-WAND',
    harvestNote: 'Holiday Gala Gifting Suite',
    text: 'The solid turned brass dipper has an impressive, satisfying heft. Paired with estate jars, it created the most talked-about gift box of our winter season.',
    date: 'December 2025',
  },
  {
    id: 'gift-05',
    author: 'Arthur Pendelton',
    role: 'Board Chairman',
    affiliation: 'Pendelton Asset Group',
    location: 'Greenwich, CT',
    category: 'gifting',
    productId: 'AV-BOX-WALNUT',
    harvestNote: 'Retirement Keepsake Presentation',
    text: 'Presented to our retiring CEO alongside a personalized brass inscription plate. The velvet lining and walnut craftsmanship are of a caliber rarely seen today.',
    date: 'November 2025',
  },
  {
    id: 'gift-06',
    author: 'Genevieve Laurent',
    role: 'Private Estate Curator',
    location: 'Newport, RI',
    category: 'gifting',
    productId: 'AV-CHEST-MAPLE',
    harvestNote: 'Autumn Guest House Welcoming Suite',
    text: 'We placed the birdseye maple chest in our private cottage. Opening the box releases an exquisite fragrance of natural beeswax and seasoned northern hardwoods.',
    date: 'September 2025',
  },
  {
    id: 'gift-07',
    author: 'Dr. Alistair Finch',
    role: 'Private Patron',
    location: 'Philadelphia, PA',
    category: 'gifting',
    productId: 'AV-JAR-HEXDUO',
    harvestNote: '25th Wedding Anniversary Gift',
    text: 'A gift for my wife who appreciates natural botany. The faceted hexagonal jars look like cut gemstones on the dining table in the morning sunlight.',
    date: 'August 2025',
  },
  {
    id: 'gift-08',
    author: 'Seraphina Cross',
    role: 'Luxury Wedding Designer',
    affiliation: 'Cross & Co. Events',
    location: 'East Hampton, NY',
    category: 'gifting',
    productId: 'AV-JAR-SKYLAND',
    harvestNote: '120 Bespoke Guest Favors',
    text: 'Every single guest was mesmerized by the wax-stamped seal and personalized calligraphy tags. It set an unforgettable tone for the harvest weekend celebration.',
    date: 'July 2025',
  },
];

/**
 * Builds an endless array that is guaranteed to span wide displays seamlessly.
 */
function buildSeamlessTrack(items: TestimonialRecord[]): TestimonialRecord[] {
  if (items.length === 0) return [];
  // Ensure we have at least 8 items in base set before duplicating
  let base: TestimonialRecord[] = [...items];
  while (base.length < 8) {
    base = base.concat(items);
  }
  // Duplicate for seamless 50% translation marquee
  return base.concat(base);
}

export default function TrustTestimonials() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [selectedRecord, setSelectedRecord] = useState<TestimonialRecord | null>(null);

  // Filter records
  const filteredRecords = TESTIMONIAL_ARCHIVES.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  // Split into two alternating streams for the dual-row ticker
  const row1Base = filteredRecords.filter((_, idx) => idx % 2 === 0);
  const row2Base = filteredRecords.filter((_, idx) => idx % 2 !== 0);

  const row1 = buildSeamlessTrack(row1Base);
  const row2 = buildSeamlessTrack(row2Base);

  // Find product for a given testimonial
  const getProduct = (productId: string): ProductItem | undefined => {
    return PRODUCTS.find((p) => p.id === productId);
  };

  const selectedProduct = selectedRecord ? getProduct(selectedRecord.productId) : null;

  return (
    <section className="py-20 bg-[#FBF9F5] border-y border-stone-200/80 overflow-hidden relative text-left">
      <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12">
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-2 pb-6 border-b border-stone-200/80 text-left">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-500">
            Patron Dispatches &amp; Field Records
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 leading-tight">
            Observations from Michelin Kitchens, Apiary Yards &amp; Private Cellars
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed pt-1">
            Field testing notes on cold-extracted raw varietals, cabinet-grade cedar joinery, and heirloom gift trunks. Click any dispatch to inspect harvest provenance.
          </p>
        </div>
      </div>

      {/* Scrolling Tickers Area */}
      <div className="mt-8 space-y-4 relative w-full">
        {/* Soft Edge Fade Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-32 bg-gradient-to-r from-[#FBF9F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-32 bg-gradient-to-l from-[#FBF9F5] to-transparent z-10 pointer-events-none" />

        {/* Row 1 */}
        <div className="flex overflow-hidden group/row1">
          <div className="flex gap-4 shrink-0 pr-4 animate-marquee group-hover/row1:[animation-play-state:paused]">
            {row1.map((record, index) => {
              const product = getProduct(record.productId);
              return (
                <div
                  key={`r1-${record.id}-${index}`}
                  onClick={() => setSelectedRecord(record)}
                  className="w-80 sm:w-96 shrink-0 bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs hover:border-stone-400 hover:shadow-md transition-all text-left cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Harvest / Field Meta Tag */}
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="font-mono text-stone-500 uppercase tracking-wider text-[10px]">
                        {record.harvestNote}
                      </span>
                      <span className="text-stone-400 font-sans">{record.date}</span>
                    </div>

                    {/* Pull Quote */}
                    <p className="font-serif italic text-stone-800 text-sm sm:text-[15px] leading-relaxed group-hover:text-emerald-950 transition-colors">
                      &ldquo;{record.text}&rdquo;
                    </p>
                  </div>

                  {/* Footer with Author & Associated Product Thumbnail */}
                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-sans font-bold text-stone-900 text-xs sm:text-sm">
                        {record.author}
                      </h4>
                      <p className="text-[11px] text-stone-500 line-clamp-1">
                        {record.role} &bull; {record.location}
                      </p>
                    </div>

                    {product && (
                      <div
                        title={`Referenced: ${product.name}`}
                        className="shrink-0 relative w-8 h-8 rounded-lg overflow-hidden bg-stone-100 border border-stone-200/80 group-hover:border-stone-400 transition"
                      >
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="32px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2 (Scrolling Reverse) */}
        <div className="flex overflow-hidden group/row2">
          <div className="flex gap-4 shrink-0 pr-4 animate-marquee-reverse group-hover/row2:[animation-play-state:paused]">
            {row2.map((record, index) => {
              const product = getProduct(record.productId);
              return (
                <div
                  key={`r2-${record.id}-${index}`}
                  onClick={() => setSelectedRecord(record)}
                  className="w-80 sm:w-96 shrink-0 bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs hover:border-stone-400 hover:shadow-md transition-all text-left cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Harvest / Field Meta Tag */}
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="font-mono text-stone-500 uppercase tracking-wider text-[10px]">
                        {record.harvestNote}
                      </span>
                      <span className="text-stone-400 font-sans">{record.date}</span>
                    </div>

                    {/* Pull Quote */}
                    <p className="font-serif italic text-stone-800 text-sm sm:text-[15px] leading-relaxed group-hover:text-emerald-950 transition-colors">
                      &ldquo;{record.text}&rdquo;
                    </p>
                  </div>

                  {/* Footer with Author & Associated Product Thumbnail */}
                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-sans font-bold text-stone-900 text-xs sm:text-sm">
                        {record.author}
                      </h4>
                      <p className="text-[11px] text-stone-500 line-clamp-1">
                        {record.role} &bull; {record.location}
                      </p>
                    </div>

                    {product && (
                      <div
                        title={`Referenced: ${product.name}`}
                        className="shrink-0 relative w-8 h-8 rounded-lg overflow-hidden bg-stone-100 border border-stone-200/80 group-hover:border-stone-400 transition"
                      >
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="32px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Filter Tabs - Docked below for better switching */}
      <div className="mt-8 flex justify-center px-4 relative z-20">
        <div className="flex flex-wrap items-center justify-center gap-1.5 bg-stone-200/70 p-1.5 rounded-2xl text-xs font-medium shadow-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            All Records ({TESTIMONIAL_ARCHIVES.length})
          </button>
          <button
            onClick={() => setActiveFilter('culinary')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'culinary'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            Culinary &amp; Chefs
          </button>
          <button
            onClick={() => setActiveFilter('apiary')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'apiary'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            Apiary &amp; Equipment
          </button>
          <button
            onClick={() => setActiveFilter('gifting')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'gifting'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            Heirloom Gifting
          </button>
        </div>
      </div>

      {/* Interactive Detail Modal / Inspector */}
      {selectedRecord && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="bg-white max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 text-left relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Header / Origin */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 uppercase tracking-widest">
                <Sparkles size={13} className="text-emerald-700" />
                <span>Verified Field Dispatch &bull; {selectedRecord.date}</span>
              </div>
              <h3 className="font-serif text-2xl text-stone-900 font-bold">
                {selectedRecord.author}
              </h3>
              <p className="text-xs text-stone-500 font-sans">
                {selectedRecord.role}{selectedRecord.affiliation && <>, <span className="text-stone-700">{selectedRecord.affiliation}</span></>} &bull; {selectedRecord.location}
              </p>
            </div>

            {/* Quote Body */}
            <blockquote className="font-serif italic text-stone-800 text-lg leading-relaxed border-l-2 border-emerald-800 pl-4 py-1">
              &ldquo;{selectedRecord.text}&rdquo;
            </blockquote>

            {/* Field Note Meta */}
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/80 text-xs space-y-1">
              <p className="font-mono text-stone-500 text-[10px] uppercase tracking-wider">
                Harvest Specification &amp; Application
              </p>
              <p className="font-medium text-stone-800">
                {selectedRecord.harvestNote}
              </p>
            </div>

            {/* Associated Product Card */}
            {selectedProduct && (
              <div className="pt-2 border-t border-stone-200">
                <p className="text-[11px] font-sans font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Referenced Harvest / Equipment
                </p>
                <div className="flex items-center justify-between gap-4 p-3 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-100/70 transition">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                      <Image
                        src={selectedProduct.imageUrl}
                        alt={selectedProduct.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 text-sm line-clamp-1">
                        {selectedProduct.name}
                      </h4>
                      <p className="text-xs text-stone-500 font-medium">
                        {selectedProduct.subtitle}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/products/${selectedProduct.id}`}
                    prefetch={true}
                    onClick={() => setSelectedRecord(null)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-900 hover:text-emerald-700 shrink-0 px-3 py-1.5 rounded-lg bg-white border border-stone-200 shadow-xs hover:border-emerald-300 transition"
                  >
                    <span>View Product</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            )}

            {/* Modal Footer Dismiss */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
              >
                Close Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
