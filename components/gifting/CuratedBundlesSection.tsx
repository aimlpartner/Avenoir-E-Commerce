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
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-xs font-bold uppercase tracking-widest mb-3 border border-emerald-200">
          <Sparkles size={13} className="text-amber-600" />
          Ready-to-Gift Luxury Sets
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Curated Pre-Made Bundles
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 font-serif">
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
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Badge */}
              <div className="relative aspect-16/10 w-full bg-slate-100 overflow-hidden group">
                <Image
                  src={bundle.imageUrl}
                  alt={bundle.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-60" />

                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-emerald-950/90 text-amber-300 text-[10px] font-black uppercase tracking-wider backdrop-blur-xs shadow-xs">
                    {bundle.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/90 text-slate-800 text-[10px] font-bold backdrop-blur-xs shadow-2xs">
                    {bundle.tierLabel}
                  </span>
                </div>

                {bundle.price >= 60 && (
                  <div className="absolute bottom-3 right-3 bg-emerald-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1 shadow-xs">
                    <Truck size={12} />
                    Free Shipping
                  </div>
                )}
              </div>

              {/* Bundle Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {bundle.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {bundle.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {bundle.description}
                  </p>

                  {/* Included Jars Visual Strip */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      Included in this Box:
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {bundleFlavors.slice(0, 5).map((flavor, idx) => (
                        <div
                          key={idx}
                          className="relative w-11 h-11 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shrink-0 group/flavor"
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
                        <div className="w-11 h-11 rounded-lg border border-slate-200 bg-amber-50 text-amber-900 flex items-center justify-center text-xs font-bold shrink-0">
                          +{bundleFlavors.length - 5}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                    {bundle.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check size={13} className="text-emerald-700 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-950">
                          ${bundle.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-slate-400 line-through">
                          ${bundle.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 block mt-0.5">
                        Save {bundle.discountPercent}% off individual items
                      </span>
                    </div>

                    <span className="text-xs font-semibold px-2 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200/80">
                      Gift Ready
                    </span>
                  </div>

                  {/* Two Buttons: 1-Click Add & Customize */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => onQuickAddBundle(bundle)}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-950 active:scale-95 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <ShoppingBag size={15} />
                      <span>Quick Add</span>
                    </button>

                    <button
                      onClick={() => onCustomizeBundle(bundle)}
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-100 active:scale-95 transition flex items-center justify-center gap-1.5 cursor-pointer"
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
