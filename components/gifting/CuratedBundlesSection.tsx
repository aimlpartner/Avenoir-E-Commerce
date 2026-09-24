'use client';

import React from 'react';
import Image from 'next/image';
import { CURATED_BUNDLES, CuratedBundle, BOX_FLAVORS } from '@/lib/products';
import { ShoppingBag, Sliders, Sparkles, Check, Truck } from 'lucide-react';
import { motion } from 'motion/react';

interface CuratedBundlesSectionProps {
  onQuickAddBundle: (bundle: CuratedBundle) => void;
  onCustomizeBundle: (bundle: CuratedBundle) => void;
}

export default function CuratedBundlesSection({
  onQuickAddBundle,
  onCustomizeBundle
}: CuratedBundlesSectionProps) {
  return (
    <section className="w-full">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-stone-50 text-[#8C6B28] text-[11px] font-bold uppercase tracking-widest mb-3 border border-stone-200">
          <Sparkles size={13} className="text-[#8C6B28]" />
          Ready-to-Gift Luxury Sets
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Curated Pre-Made Bundles
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2 font-serif">
          Expertly paired by our head apiarist and pastry masters. Ready to ship in signature gift presentation or customize to your own taste.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {CURATED_BUNDLES.map((bundle) => {
          // Resolve item objects for thumbnails
          const bundleFlavors = bundle.itemIds
            .map((id) => BOX_FLAVORS.find((f) => f.id === id))
            .filter(Boolean);

          return (
            <motion.div
              key={bundle.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="rounded-lg border border-stone-200/90 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Badge */}
              <div className="relative aspect-16/10 w-full bg-stone-100 overflow-hidden group">
                <Image
                  src={bundle.imageUrl}
                  alt={bundle.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent opacity-60" />

                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-xs bg-stone-900/90 text-[#E8D7B5] text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
                    {bundle.badge}
                  </span>
                  <span className="px-2 py-1 rounded-xs bg-white/90 text-stone-800 text-[10px] font-bold backdrop-blur-xs shadow-2xs">
                    {bundle.tierLabel}
                  </span>
                </div>

                {bundle.price >= 60 && (
                  <div className="absolute bottom-3 right-3 bg-[#15231A]/90 text-stone-200 text-[11px] font-bold px-2.5 py-1 rounded-xs backdrop-blur-xs flex items-center gap-1 shadow-xs">
                    <Truck size={12} className="text-[#C5A265]" />
                    Free Shipping
                  </div>
                )}
              </div>

              {/* Bundle Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                    {bundle.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">
                    {bundle.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                    {bundle.description}
                  </p>

                  {/* Included Jars Visual Strip */}
                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
                      Included in this Box:
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {bundleFlavors.slice(0, 5).map((flavor, idx) => (
                        <div
                          key={idx}
                          className="relative w-11 h-11 rounded-md overflow-hidden border border-stone-200 bg-stone-50 shrink-0 group/flavor"
                          title={flavor?.name}
                        >
                          {flavor && (
                            <Image
                              src={flavor.imageUrl}
                              alt={flavor.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                      ))}
                      {bundleFlavors.length > 5 && (
                        <div className="w-11 h-11 rounded-md border border-stone-200 bg-stone-100 text-[#8C6B28] flex items-center justify-center text-xs font-bold shrink-0">
                          +{bundleFlavors.length - 5}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="mt-4 space-y-1.5 text-xs text-stone-600">
                    {bundle.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check size={13} className="text-[#8C6B28] shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="mt-6 pt-4 border-t border-stone-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
                          ${bundle.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-stone-400 line-through">
                          ${bundle.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#8C6B28] block mt-0.5">
                        Save {bundle.discountPercent}% off individual items
                      </span>
                    </div>

                    <span className="text-xs font-semibold px-2 py-1 rounded-xs bg-stone-50 text-[#8C6B28] border border-stone-200">
                      Gift Ready
                    </span>
                  </div>

                  {/* Two Buttons: 1-Click Add & Customize */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => onQuickAddBundle(bundle)}
                      className="w-full py-2.5 px-4 rounded-md bg-[#15231A] text-white text-xs font-bold hover:bg-[#1E3326] active:scale-98 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <ShoppingBag size={15} />
                      <span>Quick Add</span>
                    </button>

                    <button
                      onClick={() => onCustomizeBundle(bundle)}
                      className="w-full py-2.5 px-4 rounded-md border border-stone-300 bg-white text-stone-800 text-xs font-bold hover:bg-stone-50 active:scale-98 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sliders size={14} />
                      <span>Customize Box</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
