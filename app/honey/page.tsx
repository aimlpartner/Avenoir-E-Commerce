'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Droplets, 
  Search, 
  X, 
  SlidersHorizontal, 
  ChevronRight, 
  RotateCcw,
  Star
} from 'lucide-react';
import { PRODUCTS, HONEY_SUBCATEGORIES, Subcategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import GridViewSelector, { GridColumns } from '@/components/GridViewSelector';
import ProductFilterModal from '@/components/ProductFilterModal';

function HoneyPageContent() {
  const searchParams = useSearchParams();
  const subParam = searchParams.get('sub') as Subcategory | null;

  const [userSelectedSub, setUserSelectedSub] = useState<Subcategory | 'all' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [gridCols, setGridCols] = useState<GridColumns>(4);
  
  // Modal & Extended Filter States
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const selectedSub = userSelectedSub !== null
    ? userSelectedSub
    : (subParam && HONEY_SUBCATEGORIES.some(s => s.id === subParam) ? subParam : 'all');

  const setSelectedSub = (sub: Subcategory | 'all') => {
    setUserSelectedSub(sub);
  };

  const honeyProducts = PRODUCTS.filter((p) => p.department === 'honey');

  // Subcategory Counts
  const countsBySub: Record<string, number> = {};
  HONEY_SUBCATEGORIES.forEach((s) => {
    countsBySub[s.id] = honeyProducts.filter((p) => p.subcategory === s.id).length;
  });

  const isPriceFiltered = priceRange[0] > 0 || priceRange[1] < 300;

  // Active filters count for modal badge
  const activeFilterCount = 
    (selectedSub !== 'all' ? 1 : 0) +
    (isPriceFiltered ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedSub('all');
    setSearchQuery('');
    setPriceRange([0, 300]);
    setInStockOnly(false);
    setMinRating(0);
    setSortBy('featured');
  };

  const filteredProducts = honeyProducts.filter((product) => {
    // 1. Subcategory
    if (selectedSub !== 'all' && product.subcategory !== selectedSub) {
      return false;
    }
    // 2. Price Range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    // 3. In-Stock Only
    if (inStockOnly && product.inStock === false) {
      return false;
    }
    // 4. Minimum Rating
    if (minRating > 0 && product.rating < minRating) {
      return false;
    }
    // 5. Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(q) ||
        product.subtitle.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.materials.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const activeSubMeta = HONEY_SUBCATEGORIES.find(s => s.id === selectedSub);

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-8">
      
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" prefetch={true} className="hover:text-emerald-900 transition">Home</Link>
        <ChevronRight size={12} />
        <span className="text-emerald-950 font-bold">Honey Products</span>
        {activeSubMeta && (
          <>
            <ChevronRight size={12} />
            <span className="text-amber-700 font-semibold">{activeSubMeta.shortName}</span>
          </>
        )}
      </nav>

      {/* Page Hero Header */}
      <div className="bg-gradient-to-r from-amber-50/90 via-emerald-50/50 to-amber-50/80 rounded-2xl p-5 sm:p-10 lg:p-12 border border-amber-200/80 relative overflow-hidden shadow-xs text-left">
        <div className="max-w-3xl relative z-10">
          <p className="text-[11px] sm:text-sm font-bold tracking-widest text-amber-900 uppercase mb-1">
            Terroir Department &bull; Raw Sussex Apiary
          </p>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2 sm:mb-3 tracking-tight">
            Raw Honey Products &amp; <span className="text-amber-700">Terroir Reserves</span>
          </h1>
          <p className="text-slate-700 text-xs sm:text-base leading-relaxed mb-4 sm:mb-6">
            100% raw, unheated, cold-extracted varietals harvested directly from our protected Sussex County apiaries along the Kittatinny Ridge. Hand-bottled into apothecary glassware and solid walnut presentation vaults.
          </p>

          {/* Quick Pillars */}
          <div className="flex flex-wrap gap-3 sm:gap-6 text-[11px] sm:text-xs text-slate-700 font-medium pt-1">
            <span>&bull; Never heated &gt; 95&deg;F</span>
            <span>&bull; Preserved live pollen</span>
            <span>&bull; Heirloom packaging</span>
          </div>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute right-4 -bottom-10 opacity-10 pointer-events-none hidden lg:block text-amber-900">
          <Droplets size={320} />
        </div>
      </div>

      {/* Unified Search & Filter Control Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search raw honey, vaults, flights, comb..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Action Buttons: Modal Trigger + Sort + Grid Views */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 w-full sm:w-auto">
            
            {/* Dedicated Filters Modal Trigger Button */}
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 border shadow-xs min-h-[40px] sm:min-h-[42px] whitespace-nowrap ${
                activeFilterCount > 0
                  ? 'bg-emerald-900 text-white border-emerald-950 hover:bg-emerald-800'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal size={14} className={activeFilterCount > 0 ? 'text-amber-300' : 'text-slate-600'} />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Quick Sort Dropdown */}
            <div className="flex-1 sm:flex-initial flex items-center justify-center sm:justify-start gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2 sm:px-3 py-1.5 h-[40px] sm:h-[42px] min-w-0">
              <span className="text-[11px] text-slate-500 font-medium hidden md:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-slate-800 font-semibold focus:outline-hidden cursor-pointer w-full sm:w-auto text-center sm:text-left truncate"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>

            {/* Grid Columns Selector */}
            <GridViewSelector
              columns={gridCols}
              onChange={(cols) => setGridCols(cols)}
            />
          </div>
        </div>

        {/* Active Filter Chips & Clear All */}
        {activeFilterCount > 0 && (
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Active Filters:
            </span>

            {/* Subcategory Chip */}
            {selectedSub !== 'all' && activeSubMeta && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold">
                <span>Collection: {activeSubMeta.shortName}</span>
                <button
                  onClick={() => setSelectedSub('all')}
                  className="hover:text-emerald-700 cursor-pointer ml-1 p-0.5"
                  aria-label="Remove category filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {/* Price Chip */}
            {isPriceFiltered && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-950 border border-amber-200 text-xs font-semibold">
                <span>Price: ${priceRange[0]} &ndash; ${priceRange[1]}</span>
                <button
                  onClick={() => setPriceRange([0, 300])}
                  className="hover:text-amber-800 cursor-pointer ml-1 p-0.5"
                  aria-label="Remove price filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {/* In-Stock Chip */}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold">
                <span>In-Stock Only</span>
                <button
                  onClick={() => setInStockOnly(false)}
                  className="hover:text-emerald-700 cursor-pointer ml-1 p-0.5"
                  aria-label="Remove in-stock filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {/* Rating Chip */}
            {minRating > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-950 border border-amber-200 text-xs font-semibold">
                <span className="flex items-center gap-0.5">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  {minRating}+ Stars
                </span>
                <button
                  onClick={() => setMinRating(0)}
                  className="hover:text-amber-800 cursor-pointer ml-1 p-0.5"
                  aria-label="Remove rating filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {/* Search Query Chip */}
            {searchQuery.trim() !== '' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold">
                <span>&ldquo;{searchQuery}&rdquo;</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:text-slate-600 cursor-pointer ml-1 p-0.5"
                  aria-label="Remove search filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {/* Reset All Button */}
            <button
              onClick={resetAllFilters}
              className="text-[11px] font-bold text-rose-700 hover:text-rose-900 hover:underline cursor-pointer flex items-center gap-1 ml-1"
            >
              <RotateCcw size={11} />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Showing Results & Active Collection Info */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-left">
        <div>
          <p className="text-xs text-slate-600">
            Showing <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'reserve product' : 'reserve products'}
            {activeSubMeta && (
              <span> in <strong className="text-emerald-950 font-bold">{activeSubMeta.name}</strong></span>
            )}
          </p>
          {activeSubMeta && (
            <p className="text-[11px] text-slate-500 mt-0.5">
              {activeSubMeta.description}
            </p>
          )}
        </div>
      </div>

      {/* Comprehensive Filter Modal */}
      <ProductFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        departmentName="Honey Reserves"
        department="honey"
        subcategories={HONEY_SUBCATEGORIES}
        selectedSub={selectedSub}
        onSelectSub={(sub) => setSelectedSub(sub)}
        priceRange={priceRange}
        minAllowedPrice={0}
        maxAllowedPrice={300}
        onPriceRangeChange={setPriceRange}
        inStockOnly={inStockOnly}
        onInStockOnlyChange={setInStockOnly}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        activeFilterCount={activeFilterCount}
        matchingCount={filteredProducts.length}
        onResetAll={resetAllFilters}
        countsBySub={countsBySub}
        totalProductsCount={honeyProducts.length}
      />

      {/* Product Grid - User-Controlled Columns (Min 2, up to 5 on Desktop) */}
      {filteredProducts.length > 0 ? (
        <div
          className={`grid ${
            gridCols === 2
              ? 'grid-cols-2 max-w-5xl mx-auto gap-3.5 sm:gap-6 lg:gap-8'
              : gridCols === 3
              ? 'grid-cols-2 sm:grid-cols-3 max-w-6xl mx-auto gap-3 sm:gap-5 lg:gap-7'
              : gridCols === 5
              ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-7xl mx-auto gap-2.5 sm:gap-4 lg:gap-5'
              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto gap-3 sm:gap-5 lg:gap-6'
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center max-w-lg mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Search size={24} />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">No Honey Products Match Your Criteria</h3>
          <p className="text-xs text-slate-600 mb-6">
            We couldn&apos;t find any honeys matching &quot;{searchQuery}&quot;. Try resetting your filters.
          </p>
          <button
            onClick={() => {
              setSelectedSub('all');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 transition cursor-pointer shadow-xs"
          >
            Reset Honey Filters
          </button>
        </div>
      )}

      {/* Footer Callout */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-left">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
            Sussex County Terroir Guide
          </span>
          <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
            Curious about microclimates, floral nectar flows, and enzymes?
          </h3>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Every varietal reflects distinct floral foraging radiuses and elevation belts in Northern New Jersey. Explore tasting profiles, diastase indexes, and seasonal harvest dates on our Terroir page.
          </p>
        </div>
        <Link
          href="/terroir"
          className="px-6 py-3 rounded-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold tracking-wide transition shrink-0 cursor-pointer shadow-xs"
        >
          Explore Terroir Profiles →
        </Link>
      </div>

    </div>
  );
}

export default function HoneyPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-slate-400">Loading Honey Products...</div>}>
      <HoneyPageContent />
    </Suspense>
  );
}
