'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BoxFlavorItem, GiftBoxTier, PACKAGING_OPTIONS, PackagingOption } from '@/lib/products';
import { 
  Check, 
  X, 
  ShoppingBag, 
  Sparkles, 
  Feather, 
  Package, 
  Truck, 
  Trash2, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import GiftNoteModal from './GiftNoteModal';

interface VisualBoxDrawerProps {
  tier: GiftBoxTier;
  selectedItems: BoxFlavorItem[];
  onRemoveItem: (index: number) => void;
  onClearAll: () => void;
  packaging: PackagingOption;
  onChangePackaging: (pkg: PackagingOption) => void;
  giftRecipient: string;
  giftSender: string;
  giftMessage: string;
  onSaveGiftNote: (recipient: string, sender: string, message: string) => void;
  onAddToCart: () => void;
}

export default function VisualBoxDrawer({
  tier,
  selectedItems,
  onRemoveItem,
  onClearAll,
  packaging,
  onChangePackaging,
  giftRecipient,
  giftSender,
  giftMessage,
  onSaveGiftNote,
  onAddToCart
}: VisualBoxDrawerProps) {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const capacity = tier.capacity;
  const count = selectedItems.length;
  const remaining = capacity - count;
  const isFull = count >= capacity;
  const progressPercent = Math.min(100, Math.round((count / capacity) * 100));

  const basePrice = tier.bundlePrice;
  const packagingDelta = packaging.priceDelta;
  const finalPrice = basePrice + packagingDelta;
  const originalTotal = tier.regularPrice + packagingDelta;
  const savings = originalTotal - finalPrice;

  const hasGiftNote = Boolean(giftMessage || giftRecipient);

  // Generate slots array with filled or empty items
  const slots = Array.from({ length: capacity }, (_, i) => selectedItems[i] || null);

  return (
    <>
      {/* Desktop Sticky Panel / Mobile Bottom Drawer */}
      <div className="w-full lg:sticky lg:top-24 bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-emerald-950 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 block mb-0.5">
              Step 3: Box Summary
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold flex items-center gap-2">
              <span>{tier.name}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-800 text-amber-300">
                {count}/{capacity} Filled
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {count > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-emerald-200 hover:text-white transition flex items-center gap-1 p-1 cursor-pointer"
                title="Clear all jars"
              >
                <Trash2 size={13} />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            {/* Mobile Expand/Collapse Button */}
            <button
              onClick={() => setMobileExpanded(!mobileExpanded)}
              className="lg:hidden w-8 h-8 rounded-lg bg-emerald-900 text-emerald-100 flex items-center justify-center transition cursor-pointer"
              aria-label="Toggle Box Details"
            >
              {mobileExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </button>
          </div>
        </div>

        {/* Progress Bar & Status Text */}
        <div className="p-4 sm:p-5 bg-stone-50 border-b border-slate-200/80">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className={isFull ? 'text-emerald-800 font-extrabold flex items-center gap-1.5' : 'text-slate-700'}>
              {isFull ? (
                <>
                  <Check size={14} strokeWidth={3} className="text-emerald-700" />
                  Your box is complete &amp; ready for gifting!
                </>
              ) : (
                `Add ${remaining} more jar${remaining === 1 ? '' : 's'} to complete your ${tier.capacity}-pack`
              )}
            </span>
            <span className="text-emerald-900">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full transition-all duration-300 ${
                isFull ? 'bg-amber-500' : 'bg-emerald-700'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Content Section (Collapsible on Mobile, always open on Desktop) */}
        <div className={`p-5 sm:p-6 space-y-6 ${mobileExpanded ? 'block' : 'hidden lg:block'}`}>
          
          {/* Visual Box Slots Grid */}
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Box Slots ({capacity} Jars)</span>
              <span className="text-[11px] font-normal text-slate-500">Tap &apos;×&apos; to remove</span>
            </div>

            <div
              className={`grid gap-2.5 ${
                capacity === 3
                  ? 'grid-cols-3'
                  : capacity === 6
                  ? 'grid-cols-3'
                  : 'grid-cols-4 sm:grid-cols-6'
              }`}
            >
              {slots.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative rounded-xl border transition-all duration-200 aspect-square flex flex-col items-center justify-center p-1 text-center ${
                    item
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs'
                      : 'border-dashed border-slate-300 bg-stone-50/50 text-slate-400'
                  }`}
                >
                  {item ? (
                    <>
                      <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute bottom-1 inset-x-1 text-[9px] font-bold text-white line-clamp-1 leading-tight drop-shadow-xs">
                          {item.name.replace('Honey', '').trim()}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-900 hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition cursor-pointer z-10"
                        title="Remove jar"
                      >
                        <X size={12} strokeWidth={2.6} />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-1">
                      <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 text-xs font-bold mb-1">
                        +
                      </span>
                      <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                        Slot {idx + 1}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Packaging Style Option */}
          <div className="pt-4 border-t border-slate-200/80">
            <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Package size={14} className="text-amber-700" />
              Packaging Presentation
            </span>

            <div className="space-y-2">
              {PACKAGING_OPTIONS.map((opt) => {
                const isSelected = packaging.id === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => onChangePackaging(opt)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-emerald-800 bg-emerald-50/70 shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                          {opt.name}
                        </span>
                        {opt.priceDelta === 0 ? (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                            Free
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded">
                            +${opt.priceDelta.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {opt.tagline}
                      </p>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-emerald-900 text-white'
                          : 'border border-slate-300'
                      }`}
                    >
                      {isSelected && <Check size={10} strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Complimentary Handwritten Gift Note */}
          <div className="pt-4 border-t border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Feather size={14} className="text-amber-700" />
                Wax-Sealed Gift Note
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Complimentary
              </span>
            </div>

            {hasGiftNote ? (
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/90 text-left space-y-1 relative group">
                <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                  <span>To: {giftRecipient || 'Recipient'}</span>
                  <button
                    onClick={() => setIsNoteModalOpen(true)}
                    className="text-amber-800 hover:text-emerald-950 underline text-[11px] font-semibold cursor-pointer"
                  >
                    Edit Note
                  </button>
                </div>
                <p className="text-xs italic text-slate-700 line-clamp-2">
                  &quot;{giftMessage || 'Warmest wishes from Maison Avenoir'}&quot;
                </p>
                {giftSender && (
                  <p className="text-[11px] text-slate-500 font-medium text-right">
                    — {giftSender}
                  </p>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsNoteModalOpen(true)}
                className="w-full p-3 rounded-xl border border-dashed border-amber-300 bg-amber-50/40 hover:bg-amber-50 text-amber-900 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Feather size={14} />
                <span>+ Add Calligraphy Note (Free)</span>
              </button>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="pt-4 border-t border-slate-200/80 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Standard Value:</span>
              <span className="line-through">${originalTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-emerald-800 font-bold">
              <span>Bundle Tier Savings ({tier.discountPercent}%):</span>
              <span>-${savings.toFixed(2)}</span>
            </div>

            {packagingDelta > 0 && (
              <div className="flex justify-between text-amber-900 font-medium">
                <span>Heirloom Walnut Upgrade:</span>
                <span>+${packagingDelta.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 text-slate-900">
              <span className="font-serif text-base font-bold">Total Bundle Price:</span>
              <div className="text-right">
                <span className="font-serif text-2xl font-extrabold text-emerald-950">
                  ${finalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {tier.freeShipping && (
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 pt-1">
                <Truck size={13} />
                <span>Free Express Courier Shipping Included</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer / Add to Cart CTA Bar */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-slate-200/90">
          <button
            onClick={onAddToCart}
            disabled={!isFull}
            className={`w-full py-3.5 px-5 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md ${
              isFull
                ? 'bg-emerald-900 text-white hover:bg-emerald-950 active:scale-[0.99] shadow-emerald-950/20 animate-pulse-subtle'
                : 'bg-slate-200 text-slate-500 cursor-not-allowed opacity-75'
            }`}
          >
            <ShoppingBag size={18} />
            <span>
              {isFull
                ? `Add Custom ${tier.capacity}-Jar Box to Cart • $${finalPrice.toFixed(2)}`
                : `Select ${remaining} More Jar${remaining === 1 ? '' : 's'} to Add to Cart`}
            </span>
          </button>
        </div>
      </div>

      {/* Gift Note Modal */}
      <GiftNoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        recipientName={giftRecipient}
        senderName={giftSender}
        message={giftMessage}
        onSave={onSaveGiftNote}
      />
    </>
  );
}
