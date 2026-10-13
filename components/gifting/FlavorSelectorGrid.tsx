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
          <span className="text-[11px] font-mono font-medium tracking-[0.2em] text-stone-400 uppercase block mb-1">
            Artisanal Varieties
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 tracking-tight">
            Select Your Reserve Jars
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-serif mt-1">
            Choose any combination of cold-extracted raw varietals, creamed whips, and botanical infusions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            placeholder="Search varietals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-md border border-stone-200 bg-white text-xs focus:outline-none focus:border-stone-800 transition placeholder:text-stone-400 font-serif"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition cursor-pointer font-serif ${
              activeCategory === cat.id
                ? 'bg-[#15231A] text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
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
            className="mb-6 p-3.5 rounded-md bg-stone-50 border border-stone-200 text-stone-800 flex items-center gap-2.5 text-xs font-serif"
          >
            <AlertCircle size={16} className="text-[#8C6B28] shrink-0" />
            <span>{feedbackMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flavor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFlavors.map((flavor) => {
          const countInBox = flavorCounts[flavor.id] || 0;
          return (
            <div
              key={flavor.id}
              className={`rounded-lg border bg-white overflow-hidden transition-all flex flex-col justify-between ${
                countInBox > 0
                  ? 'border-stone-800 ring-1 ring-stone-800/10'
                  : 'border-stone-200 hover:border-stone-400'
              }`}
            >
              {/* Product Image */}
              <div className="relative aspect-4/3 w-full bg-stone-50 overflow-hidden group">
                <Image
                  src={flavor.imageUrl}
                  alt={flavor.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />

                {/* Counter Tag if in box */}
                {countInBox > 0 && (
                  <div className="absolute top-2.5 right-2.5 bg-[#15231A] text-white px-2 py-0.5 rounded text-[11px] font-mono">
                    {countInBox} in box
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-normal text-stone-900 leading-snug line-clamp-1">
                    {flavor.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-serif mt-0.5 line-clamp-1">
                    {flavor.subtitle}
                  </p>
                </div>

                {/* Bottom Row: Net Weight + Add Button */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-serif text-stone-400">
                    {flavor.netWeight}
                  </span>

                  <button
                    onClick={() => handleAdd(flavor)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition cursor-pointer flex items-center gap-1 ${
                      isBoxFull
                        ? 'bg-stone-100 text-stone-400 hover:bg-stone-200'
                        : countInBox > 0
                        ? 'bg-[#15231A] text-white hover:bg-[#1E3326]'
                        : 'bg-stone-900 text-white hover:bg-stone-800'
                    }`}
                  >
                    <Plus size={13} />
                    <span>{countInBox > 0 ? `Add (${countInBox})` : 'Add to Box'}</span>
                  </button>
                </div>
              </div>
            </div>
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
