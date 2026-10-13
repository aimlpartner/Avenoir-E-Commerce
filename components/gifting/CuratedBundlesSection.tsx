'use client';

import React from 'react';
import Image from 'next/image';
import { CURATED_BUNDLES, CuratedBundle, BOX_FLAVORS } from '@/lib/products';
import { ShoppingBag, Sliders } from 'lucide-react';

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
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[11px] font-mono font-medium tracking-[0.2em] text-stone-400 uppercase block mb-1.5">
          Curated Flights
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-stone-900 tracking-tight">
          Curated Honey Sets
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-2 font-serif leading-relaxed">
          Artisan pairings pre-selected by our head apiarist, packed in signature presentation boxes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {CURATED_BUNDLES.map((bundle) => {
          // Resolve item objects for thumbnails
          const bundleFlavors = bundle.itemIds
            .map((id) => BOX_FLAVORS.find((f) => f.id === id))
            .filter(Boolean);

          return (
            <div
              key={bundle.id}
              className="rounded-lg border border-stone-200/90 bg-white overflow-hidden shadow-2xs hover:border-stone-300 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Subtle Badge */}
              <div className="relative aspect-16/10 w-full bg-stone-100 overflow-hidden">
                <Image
                  src={bundle.imageUrl}
                  alt={bundle.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-xs bg-stone-900/80 text-stone-200 text-[10px] font-mono uppercase tracking-wider backdrop-blur-xs">
                    {bundle.tierLabel}
                  </span>
                </div>
              </div>

              {/* Bundle Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-stone-900 leading-snug">
                    {bundle.name}
                  </h3>
                  <p className="text-xs text-stone-400 font-serif mt-0.5">
                    {bundle.subtitle}
                  </p>

                  <p className="text-xs text-stone-500 mt-2.5 font-serif leading-relaxed line-clamp-2">
                    {bundle.description}
                  </p>

                  {/* Included Jars Visual Strip */}
                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-stone-400 block mb-2">
                      Included Varietals
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {bundleFlavors.slice(0, 5).map((flavor, idx) => (
                        <div
                          key={idx}
                          className="relative w-10 h-10 rounded-sm overflow-hidden border border-stone-200/80 bg-stone-50 shrink-0"
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
                        <div className="w-10 h-10 rounded-sm border border-stone-200/80 bg-stone-50 text-stone-500 flex items-center justify-center text-[11px] font-mono shrink-0">
                          +{bundleFlavors.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="mt-5 pt-4 border-t border-stone-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-xl sm:text-2xl font-normal text-stone-900">
                      ${bundle.price.toFixed(2)}
                    </span>
                    <span className="text-[11px] font-mono text-stone-400">
                      Signature packaging included
                    </span>
                  </div>

                  {/* Two Buttons: Quick Add & Customize */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onQuickAddBundle(bundle)}
                      className="w-full py-2.5 px-3 rounded-md bg-[#15231A] text-white text-[11px] font-mono uppercase tracking-wider hover:bg-[#1E3326] transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag size={13} />
                      <span>Quick Add</span>
                    </button>

                    <button
                      onClick={() => onCustomizeBundle(bundle)}
                      className="w-full py-2.5 px-3 rounded-md border border-stone-200/90 bg-white text-stone-700 text-[11px] font-mono uppercase tracking-wider hover:bg-stone-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sliders size={13} />
                      <span>Customize</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

