'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  SlidersHorizontal, 
  RotateCcw, 
  Check, 
  Star, 
  CheckCircle2,
  Sparkles,
  Droplets,
  Wrench
} from 'lucide-react';
import { Subcategory, SubCategoryMeta } from '@/lib/products';

export interface ProductFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  departmentName: string;
  department: 'honey' | 'beekeeping';
  subcategories: SubCategoryMeta[];
  selectedSub: Subcategory | 'all';
  onSelectSub: (sub: Subcategory | 'all') => void;
  priceRange: [number, number];
  minAllowedPrice: number;
  maxAllowedPrice: number;
  onPriceRangeChange: (range: [number, number]) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (val: boolean) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  onSortByChange: (sort: 'featured' | 'price-low' | 'price-high' | 'rating') => void;
  activeFilterCount: number;
  matchingCount: number;
  onResetAll: () => void;
  countsBySub: Record<string, number>;
  totalProductsCount: number;
}

export default function ProductFilterModal({
  isOpen,
  onClose,
  departmentName,
  department,
  subcategories,
  selectedSub,
  onSelectSub,
  priceRange,
  minAllowedPrice,
  maxAllowedPrice,
  onPriceRangeChange,
  inStockOnly,
  onInStockOnlyChange,
  minRating,
  onMinRatingChange,
  sortBy,
  onSortByChange,
  activeFilterCount,
  matchingCount,
  onResetAll,
  countsBySub,
  totalProductsCount,
}: ProductFilterModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const [minVal, maxVal] = priceRange;

  const handleMinPriceChange = (val: number) => {
    const clampedMin = Math.max(minAllowedPrice, Math.min(val, maxVal));
    onPriceRangeChange([clampedMin, maxVal]);
  };

  const handleMaxPriceChange = (val: number) => {
    const clampedMax = Math.min(maxAllowedPrice, Math.max(val, minVal));
    onPriceRangeChange([minVal, clampedMax]);
  };

  const setPricePreset = (min: number, max: number) => {
    onPriceRangeChange([min, max]);
  };

  const isPricePresetActive = (min: number, max: number) => {
    return minVal === min && maxVal === max;
  };

  const isDefaultPrice = minVal === minAllowedPrice && maxVal === maxAllowedPrice;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] z-10 text-left"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-900 text-amber-400 flex items-center justify-center shadow-xs shrink-0">
                  <SlidersHorizontal size={17} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <h3 className="font-serif text-base sm:text-xl font-bold text-slate-900 whitespace-nowrap">
                      Filter &amp; Refine
                    </h3>
                    {activeFilterCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-900 text-amber-300 text-[10px] font-extrabold uppercase tracking-wide shrink-0 whitespace-nowrap">
                        {activeFilterCount} Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 truncate hidden sm:block">
                    Configure {departmentName.toLowerCase()}, price brackets, and availability.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {activeFilterCount > 0 && (
                  <button
                    onClick={onResetAll}
                    title="Reset all filters"
                    className="text-xs font-semibold text-rose-700 hover:text-rose-800 px-2 sm:px-3 py-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer flex items-center gap-1 shrink-0 whitespace-nowrap"
                  >
                    <RotateCcw size={12} />
                    <span className="hidden sm:inline">Reset All</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition cursor-pointer shrink-0"
                  aria-label="Close filters"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-7 divide-y divide-slate-100">
              
              {/* Section 1: Sub-Products / Category */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Product Collection &amp; Terroir Types
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Select a dedicated collection
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* All Products Option */}
                  <button
                    onClick={() => onSelectSub('all')}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                      selectedSub === 'all'
                        ? 'border-emerald-900 bg-emerald-50/50 ring-1 ring-emerald-900 shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        selectedSub === 'all' ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {department === 'honey' ? <Droplets size={16} /> : <Wrench size={16} />}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          All {departmentName}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          Browse complete catalog
                        </span>
                      </div>
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      selectedSub === 'all' ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {totalProductsCount}
                    </span>
                  </button>

                  {/* Subcategories */}
                  {subcategories.map((sub) => {
                    const isSelected = selectedSub === sub.id;
                    const count = countsBySub[sub.id] || 0;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => onSelectSub(sub.id)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-emerald-900 bg-emerald-50/50 ring-1 ring-emerald-900 shadow-2xs'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-emerald-900 text-amber-300' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <Sparkles size={15} />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-slate-900 block truncate">
                              {sub.name}
                            </span>
                            <span className="text-[10px] text-slate-500 block truncate">
                              {sub.shortName}
                            </span>
                          </div>
                        </div>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isSelected ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Price Filter (Presets + Dual Range Controls) */}
              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                      Price Range
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Showing items between ${minVal} and ${maxVal}
                    </span>
                  </div>
                  {!isDefaultPrice && (
                    <button
                      onClick={() => onPriceRangeChange([minAllowedPrice, maxAllowedPrice])}
                      className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                    >
                      Reset Price
                    </button>
                  )}
                </div>

                {/* Quick Price Tier Chips */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setPricePreset(minAllowedPrice, maxAllowedPrice)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      isDefaultPrice
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    All Prices
                  </button>
                  <button
                    onClick={() => setPricePreset(minAllowedPrice, 50)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      isPricePresetActive(minAllowedPrice, 50)
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Under $50
                  </button>
                  <button
                    onClick={() => setPricePreset(50, 100)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      isPricePresetActive(50, 100)
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    $50 &ndash; $100
                  </button>
                  <button
                    onClick={() => setPricePreset(100, 200)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      isPricePresetActive(100, 200)
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    $100 &ndash; $200
                  </button>
                  <button
                    onClick={() => setPricePreset(200, maxAllowedPrice)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      isPricePresetActive(200, maxAllowedPrice)
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    $200+
                  </button>
                </div>

                {/* Range Slider for Price Ceiling */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span>Max Price Limit:</span>
                    <span className="font-mono font-bold text-slate-900">${maxVal}</span>
                  </div>
                  <input
                    type="range"
                    min={minAllowedPrice}
                    max={maxAllowedPrice}
                    step={5}
                    value={maxVal}
                    onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-900"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>${minAllowedPrice}</span>
                    <span>${Math.round((minAllowedPrice + maxAllowedPrice) / 2)}</span>
                    <span>${maxAllowedPrice}</span>
                  </div>
                </div>

                {/* Min/Max Numerical Input Boxes */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 block">
                      Min Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">$</span>
                      <input
                        type="number"
                        min={minAllowedPrice}
                        max={maxVal}
                        value={minVal}
                        onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700/30"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 block">
                      Max Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">$</span>
                      <input
                        type="number"
                        min={minVal}
                        max={maxAllowedPrice}
                        value={maxVal}
                        onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700/30"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Sort By */}
              <div className="pt-6 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                  Sort Order
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'featured', label: 'Featured Collection' },
                    { id: 'price-low', label: 'Price: Low to High' },
                    { id: 'price-high', label: 'Price: High to Low' },
                    { id: 'rating', label: 'Highest Customer Rating' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => onSortByChange(option.id as any)}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-medium transition cursor-pointer text-left flex items-center justify-between ${
                        sortBy === option.id
                          ? 'border-emerald-900 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{option.label}</span>
                      {sortBy === option.id && <Check size={14} className="text-emerald-900" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 4: Rating & Availability */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Rating Filter */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                    Minimum Rating
                  </span>
                  <div className="flex gap-2">
                    {[
                      { val: 0, label: 'All' },
                      { val: 4.5, label: '4.5+ ★' },
                      { val: 4.8, label: '4.8+ ★' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        onClick={() => onMinRatingChange(item.val)}
                        className={`flex-1 py-2 px-2.5 rounded-xl border text-xs font-medium transition cursor-pointer text-center ${
                          minRating === item.val
                            ? 'border-emerald-900 bg-emerald-900 text-white font-bold'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock Toggle */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                    Availability
                  </span>
                  <label className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition select-none">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => onInStockOnlyChange(e.target.checked)}
                      className="w-4 h-4 rounded-md text-emerald-900 focus:ring-emerald-800 border-slate-300 cursor-pointer accent-emerald-900"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-slate-900 block">In-Stock Only</span>
                      <span className="text-[10px] text-slate-500">Hide reserve harvest waitlists</span>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Sticky Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <button
                onClick={onResetAll}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                Reset All
              </button>

              <button
                onClick={onClose}
                className="flex-1 max-w-sm py-3 px-6 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <span>Show {matchingCount} {matchingCount === 1 ? 'Product' : 'Products'}</span>
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
