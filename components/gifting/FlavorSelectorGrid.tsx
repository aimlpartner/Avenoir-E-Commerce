'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { BoxFlavorItem, BOX_FLAVORS } from '@/lib/products';
import { Search, Plus, Check, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FlavorSelectorGridProps {
  selectedItems: BoxFlavorItem[];
  maxCapacity: number;
  onAddItem: (item: BoxFlavorItem) => void;
  onRemoveItem: (index: number) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Varietals' },
  { id: 'raw', label: 'Raw & Single Terroir' },
  { id: 'creamed', label: 'Whipped & Creamed' },
  { id: 'infused', label: 'Artisan Infusions' },
  { id: 'botanical', label: 'Botanical & Floral' }
] as const;

export default function FlavorSelectorGrid({
  selectedItems,
  maxCapacity,
  onAddItem
}: FlavorSelectorGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const isBoxFull = selectedItems.length >= maxCapacity;

  // Counts of each flavor in the box
  const flavorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    selectedItems.forEach((item) => {
      counts[item.id] = (counts[item.id] || 0) + 1;
    });
    return counts;
  }, [selectedItems]);

  const filteredFlavors = useMemo(() => {
    return BOX_FLAVORS.filter((flavor) => {
      const matchesCategory =
        activeCategory === 'all' || flavor.category === activeCategory;
      const matchesSearch =
        flavor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flavor.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flavor.tastingNotes.some((n) =>
          n.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAdd = (flavor: BoxFlavorItem) => {
    if (isBoxFull) {
      setFeedbackMessage(`Your ${maxCapacity}-jar box is full! Remove an item from your box or upgrade to a larger tier.`);
      setTimeout(() => setFeedbackMessage(null), 3500);
      return;
    }
    onAddItem(flavor);
  };

  return (
    <section className="w-full">
      {/* Header & Feedback Alert */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-xs font-bold uppercase tracking-widest mb-2 border border-emerald-200">
            <Sparkles size={13} className="text-amber-600" />
            Step 2: Choose Flavors
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Select Your Artisanal Jars
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Choose any combination of cold-extracted raw honeys, velvety creamed whips, and organic botanical infusions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search flavor or note..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 transition shadow-2xs placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Box Full Notice Toast */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex items-center gap-3 text-xs sm:text-sm font-medium shadow-sm"
          >
            <AlertCircle size={18} className="text-amber-700 shrink-0" />
            <span>{feedbackMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flavor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFlavors.map((flavor) => {
          const countInBox = flavorCounts[flavor.id] || 0;
          return (
            <motion.div
              key={flavor.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`rounded-2xl border bg-white overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-lg ${
                countInBox > 0
                  ? 'border-emerald-600/70 ring-1 ring-emerald-600/30'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              {/* Product Image & Badges */}
              <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden group">
                <Image
                  src={flavor.imageUrl}
                  alt={flavor.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />

                {/* Top Badge */}
                {flavor.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-950/90 text-amber-300 text-[10px] font-black uppercase tracking-wider backdrop-blur-xs shadow-xs">
                      {flavor.badge}
                    </span>
                  </div>
                )}

                {/* Quantity Counter Overlay if in box */}
                {countInBox > 0 && (
                  <div className="absolute top-3 right-3 bg-amber-400 text-emerald-950 px-2.5 py-1 rounded-full text-xs font-black shadow-md flex items-center gap-1">
                    <Check size={13} strokeWidth={3} />
                    <span>{countInBox} in Box</span>
                  </div>
                )}

                {/* Net Weight */}
                <div className="absolute bottom-3 right-3">
                  <span className="text-[11px] font-semibold text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                    {flavor.netWeight}
                  </span>
                </div>
              </div>

              {/* Card Details: Clean & Minimal - Just Name and Add Action */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-900 transition line-clamp-2">
                    {flavor.name}
                  </h3>
                </div>

                {/* Bottom Row: Net Weight + Add Button */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500">
                    {flavor.netWeight}
                  </span>

                  <button
                    onClick={() => handleAdd(flavor)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                      isBoxFull
                        ? 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        : countInBox > 0
                        ? 'bg-amber-400 text-emerald-950 hover:bg-amber-300'
                        : 'bg-emerald-900 text-white hover:bg-emerald-950 active:scale-95'
                    }`}
                  >
                    <Plus size={14} strokeWidth={2.5} />
                    <span>{countInBox > 0 ? `Add Another (${countInBox})` : 'Add to Box'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredFlavors.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="font-serif text-lg font-bold text-slate-800">
            No flavors found matching &quot;{searchQuery}&quot;
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try resetting your search query or selecting a different category.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}
