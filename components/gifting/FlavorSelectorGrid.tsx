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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-stone-50 text-[#8C6B28] text-xs font-bold uppercase tracking-widest mb-2 border border-stone-200">
            <Sparkles size={13} className="text-[#8C6B28]" />
            Step 2: Choose Flavors
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Select Your Artisanal Jars
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Choose any combination of cold-extracted raw honeys, velvety creamed whips, and organic botanical infusions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            placeholder="Search flavor or note..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-md border border-stone-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-stone-800 transition shadow-2xs placeholder:text-stone-400"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-md text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#15231A] text-white shadow-2xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
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
            className="mb-6 p-4 rounded-md bg-stone-50 border border-stone-300 text-stone-900 flex items-center gap-3 text-xs sm:text-sm font-medium shadow-2xs"
          >
            <AlertCircle size={18} className="text-[#8C6B28] shrink-0" />
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
              className={`rounded-lg border bg-white overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-md ${
                countInBox > 0
                  ? 'border-stone-800 ring-1 ring-stone-800/20'
                  : 'border-stone-200/90 hover:border-stone-400'
              }`}
            >
              {/* Product Image & Badges */}
              <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden group">
                <Image
                  src={flavor.imageUrl}
                  alt={flavor.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-60" />

                {/* Top Badge */}
                {flavor.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-xs bg-stone-900/90 text-[#E8D7B5] text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs border border-stone-700">
                      {flavor.badge}
                    </span>
                  </div>
                )}

                {/* Quantity Counter Overlay if in box */}
                {countInBox > 0 && (
                  <div className="absolute top-3 right-3 bg-[#C5A265] text-stone-950 px-2 py-0.5 rounded-xs text-xs font-bold shadow-md flex items-center gap-1">
                    <Check size={13} strokeWidth={3} />
                    <span>{countInBox} in Box</span>
                  </div>
                )}

                {/* Net Weight */}
                <div className="absolute bottom-3 right-3">
                  <span className="text-[11px] font-semibold text-white/90 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-xs">
                    {flavor.netWeight}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 leading-snug group-hover:text-stone-700 transition line-clamp-2">
                    {flavor.name}
                  </h3>
                </div>

                {/* Bottom Row: Net Weight + Add Button */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-stone-500">
                    {flavor.netWeight}
                  </span>

                  <button
                    onClick={() => handleAdd(flavor)}
                    className={`px-3.5 py-2 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                      isBoxFull
                        ? 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                        : countInBox > 0
                        ? 'bg-[#C5A265] text-stone-950 hover:bg-[#B38E46]'
                        : 'bg-[#15231A] text-white hover:bg-[#1E3326] active:scale-95'
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
        <div className="text-center py-16 bg-white rounded-lg border border-stone-200">
          <p className="font-serif text-lg font-bold text-stone-800">
            No flavors found matching &quot;{searchQuery}&quot;
          </p>
          <p className="text-xs text-stone-500 mt-1">
            Try resetting your search query or selecting a different category.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-md bg-stone-100 text-stone-800 text-xs font-bold hover:bg-stone-200 transition cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}
