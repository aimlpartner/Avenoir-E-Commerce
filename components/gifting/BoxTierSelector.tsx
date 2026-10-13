'use client';

import React from 'react';
import { GiftBoxTier, GIFT_BOX_TIERS } from '@/lib/products';

interface BoxTierSelectorProps {
  selectedTier: GiftBoxTier;
  onSelectTier: (tier: GiftBoxTier) => void;
}

export default function BoxTierSelector({
  selectedTier,
  onSelectTier
}: BoxTierSelectorProps) {
  return (
    <section className="w-full">
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
        <span className="text-[11px] font-mono font-medium tracking-[0.2em] text-stone-400 uppercase block mb-1.5">
          Box Capacity
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
          Select Your Box Size
        </h2>
        <p className="text-sm text-stone-500 font-serif mt-2 leading-relaxed">
          Choose 3, 6, or 12 reserve jars. Hand-packed in Sussex County.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {GIFT_BOX_TIERS.map((tier) => {
          const isSelected = selectedTier.id === tier.id;
          return (
            <div
              key={tier.id}
              onClick={() => onSelectTier(tier)}
              className={`p-6 rounded-lg transition-all cursor-pointer flex flex-col justify-between border text-left ${
                isSelected
                  ? 'bg-[#142118] text-white border-[#223528]'
                  : 'bg-white text-stone-900 border-stone-200 hover:border-stone-400'
              }`}
            >
              <div className="space-y-1.5">
                <span className={`text-[10px] font-mono uppercase tracking-[0.2em] block ${
                  isSelected ? 'text-[#C5A265]' : 'text-stone-400'
                }`}>
                  {tier.capacity} Jars &bull; Save {tier.discountPercent}%
                </span>
                <h3 className={`font-serif text-xl sm:text-2xl font-normal ${
                  isSelected ? 'text-white' : 'text-stone-900'
                }`}>
                  {tier.name}
                </h3>
                <p className={`text-xs font-serif leading-relaxed line-clamp-2 ${
                  isSelected ? 'text-stone-300' : 'text-stone-500'
                }`}>
                  {tier.description}
                </p>
              </div>

              <div className={`mt-6 pt-4 border-t flex items-baseline justify-between ${
                isSelected ? 'border-stone-800' : 'border-stone-100'
              }`}>
                <div>
                  <span className={`font-serif text-2xl font-normal ${
                    isSelected ? 'text-[#C5A265]' : 'text-stone-900'
                  }`}>
                    ${tier.bundlePrice.toFixed(2)}
                  </span>
                  <span className={`text-xs font-serif ml-1.5 ${
                    isSelected ? 'text-stone-400' : 'text-stone-400'
                  }`}>
                    (${tier.perJarPrice.toFixed(2)} / jar)
                  </span>
                </div>
                {isSelected && (
                  <span className="text-[11px] font-mono text-[#C5A265] uppercase tracking-wider">
                    Selected
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
