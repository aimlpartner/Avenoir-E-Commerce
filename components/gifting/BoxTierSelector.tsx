'use client';

import React from 'react';
import { GiftBoxTier, GIFT_BOX_TIERS } from '@/lib/products';
import { Check, Sparkles, Truck, Package } from 'lucide-react';
import { motion } from 'motion/react';

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
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-stone-50 text-[#8C6B28] text-xs font-bold uppercase tracking-widest mb-3 border border-stone-200">
          <Sparkles size={13} className="text-[#8C6B28]" />
          Step 1: Select Box Size
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
          Choose Your Box Capacity
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2 font-serif">
          Mix &amp; match your favorite raw honeys and infusions. The more jars you add, the more you save—up to 25% off.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {GIFT_BOX_TIERS.map((tier) => {
          const isSelected = selectedTier.id === tier.id;
          return (
            <motion.div
              key={tier.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectTier(tier)}
              className={`relative rounded-lg p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border text-left ${
                isSelected
                  ? 'bg-[#142118] text-white border-[#C5A265] shadow-lg ring-1 ring-[#C5A265]/40'
                  : 'bg-white text-stone-900 border-stone-200/90 hover:border-stone-400 shadow-2xs hover:shadow-md'
              }`}
            >
              {/* Badges on Top */}
              <div className="flex items-center justify-between gap-2 mb-3">
                {tier.isPopular ? (
                  <span className="px-2.5 py-0.5 rounded-xs bg-[#C5A265] text-stone-950 text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                    {tier.badge}
                  </span>
                ) : tier.badge ? (
                  <span
                    className={`px-2.5 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider ${
                      isSelected
                        ? 'bg-stone-800 text-[#E8D7B5] border border-stone-700'
                        : 'bg-stone-100 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {tier.badge}
                  </span>
                ) : (
                  <div />
                )}

                {/* Selection Radio / Check indicator */}
                <div
                  className={`w-5 h-5 rounded-xs flex items-center justify-center transition ${
                    isSelected
                      ? 'bg-[#C5A265] text-stone-950'
                      : 'border border-stone-300 bg-white text-transparent'
                  }`}
                >
                  <Check size={13} strokeWidth={3} />
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3
                  className={`font-serif text-xl sm:text-2xl font-bold ${
                    isSelected ? 'text-white' : 'text-stone-900'
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${
                    isSelected ? 'text-stone-300' : 'text-stone-500'
                  }`}
                >
                  {tier.description}
                </p>
              </div>

              {/* Pricing breakdown */}
              <div className="mt-5 pt-4 border-t border-stone-200/20">
                <div className="flex items-baseline gap-2.5">
                  <span
                    className={`font-serif text-2xl sm:text-3xl font-extrabold ${
                      isSelected ? 'text-[#C5A265]' : 'text-stone-900'
                    }`}
                  >
                    ${tier.bundlePrice.toFixed(2)}
                  </span>
                  <span
                    className={`text-sm line-through ${
                      isSelected ? 'text-stone-400' : 'text-stone-400'
                    }`}
                  >
                    ${tier.regularPrice.toFixed(2)}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wide ${
                      isSelected
                        ? 'bg-[#C5A265]/20 text-[#E8D7B5]'
                        : 'bg-stone-100 text-stone-800 border border-stone-200'
                    }`}
                  >
                    Save {tier.discountPercent}%
                  </span>
                </div>

                <div className="flex items-center justify-between mt-2.5 text-xs">
                  <span
                    className={`font-medium ${
                      isSelected ? 'text-stone-300' : 'text-stone-500'
                    }`}
                  >
                    ${tier.perJarPrice.toFixed(2)} per 12 oz jar
                  </span>

                  {tier.freeShipping && (
                    <span
                      className={`inline-flex items-center gap-1 font-bold ${
                        isSelected ? 'text-[#C5A265]' : 'text-stone-800'
                      }`}
                    >
                      <Truck size={13} className="text-[#C5A265]" />
                      Free Shipping
                    </span>
                  )}
                </div>

                {/* Packaging preview text */}
                <div
                  className={`mt-3 pt-3 text-[11px] flex items-center gap-1.5 border-t ${
                    isSelected
                      ? 'border-[#223528] text-stone-300'
                      : 'border-stone-100 text-stone-500'
                  }`}
                >
                  <Package size={13} className="shrink-0 text-[#C5A265]" />
                  <span className="truncate">{tier.includedPackaging}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
