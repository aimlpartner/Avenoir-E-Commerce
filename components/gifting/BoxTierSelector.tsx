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
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3 border border-amber-200">
          <Sparkles size={13} className="text-amber-700" />
          Step 1: Select Box Size
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
          Choose Your Box Capacity
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 font-serif">
          Mix & match your favorite raw honeys and infusions. The more jars you add, the more you save—up to 25% off.
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
              className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border-2 text-left ${
                isSelected
                  ? 'bg-emerald-950 text-white border-amber-400 shadow-xl shadow-emerald-950/20 ring-2 ring-amber-400/50'
                  : 'bg-white text-slate-900 border-slate-200/90 hover:border-emerald-700/50 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Badges on Top */}
              <div className="flex items-center justify-between gap-2 mb-3">
                {tier.isPopular ? (
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-emerald-950 text-[11px] font-black uppercase tracking-wider shadow-xs">
                    {tier.badge}
                  </span>
                ) : tier.badge ? (
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                      isSelected
                        ? 'bg-emerald-800 text-amber-300'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {tier.badge}
                  </span>
                ) : (
                  <div />
                )}

                {/* Selection Radio / Check indicator */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition ${
                    isSelected
                      ? 'bg-amber-400 text-emerald-950'
                      : 'border-2 border-slate-300 bg-white text-transparent'
                  }`}
                >
                  <Check size={14} strokeWidth={3} />
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3
                  className={`font-serif text-xl sm:text-2xl font-bold ${
                    isSelected ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${
                    isSelected ? 'text-emerald-200/90' : 'text-slate-500'
                  }`}
                >
                  {tier.description}
                </p>
              </div>

              {/* Pricing breakdown */}
              <div className="mt-5 pt-4 border-t border-slate-200/20">
                <div className="flex items-baseline gap-2.5">
                  <span
                    className={`font-serif text-2xl sm:text-3xl font-extrabold ${
                      isSelected ? 'text-amber-300' : 'text-emerald-950'
                    }`}
                  >
                    ${tier.bundlePrice.toFixed(2)}
                  </span>
                  <span
                    className={`text-sm line-through ${
                      isSelected ? 'text-emerald-300/70' : 'text-slate-400'
                    }`}
                  >
                    ${tier.regularPrice.toFixed(2)}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wide ${
                      isSelected
                        ? 'bg-amber-400/20 text-amber-300'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    Save {tier.discountPercent}%
                  </span>
                </div>

                <div className="flex items-center justify-between mt-2.5 text-xs">
                  <span
                    className={`font-medium ${
                      isSelected ? 'text-emerald-200' : 'text-slate-500'
                    }`}
                  >
                    ${tier.perJarPrice.toFixed(2)} per 12 oz jar
                  </span>

                  {tier.freeShipping && (
                    <span
                      className={`inline-flex items-center gap-1 font-bold ${
                        isSelected ? 'text-amber-300' : 'text-emerald-700'
                      }`}
                    >
                      <Truck size={13} />
                      Free Shipping
                    </span>
                  )}
                </div>

                {/* Packaging preview text */}
                <div
                  className={`mt-3 pt-3 text-[11px] flex items-center gap-1.5 border-t ${
                    isSelected
                      ? 'border-emerald-800 text-emerald-300'
                      : 'border-slate-100 text-slate-500'
                  }`}
                >
                  <Package size={13} className="shrink-0 text-amber-400" />
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
