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
      <div className="w-full lg:sticky lg:top-24 bg-white rounded-lg border border-stone-200/90 shadow-md overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-[#142118] text-white flex items-center justify-between border-b border-[#223528]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A265] block mb-0.5">
              Step 3: Box Summary
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold flex items-center gap-2">
              <span>{tier.name}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-xs bg-stone-900 border border-stone-700 text-[#E8D7B5]">
                {count}/{capacity} Filled
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {count > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-stone-300 hover:text-white transition flex items-center gap-1 p-1 cursor-pointer"
                title="Clear all jars"
              >
                <Trash2 size={13} />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            {/* Mobile Expand/Collapse Button */}
            <button
              onClick={() => setMobileExpanded(!mobileExpanded)}
              className="lg:hidden w-8 h-8 rounded-md bg-stone-800 text-stone-200 flex items-center justify-center transition cursor-pointer"
              aria-label="Toggle Box Details"
            >
              {mobileExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </button>
          </div>
        </div>

        {/* Progress Bar & Status Text */}
        <div className="p-4 sm:p-5 bg-stone-50 border-b border-stone-200">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className={isFull ? 'text-stone-900 font-extrabold flex items-center gap-1.5' : 'text-stone-700'}>
              {isFull ? (
                <>
                  <Check size={14} strokeWidth={3} className="text-[#8C6B28]" />
                  Your box is complete &amp; ready for gifting!
                </>
              ) : (
                `Add ${remaining} more jar${remaining === 1 ? '' : 's'} to complete your ${tier.capacity}-pack`
              )}
            </span>
            <span className="text-stone-900 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full transition-all duration-300 ${
                isFull ? 'bg-[#15231A]' : 'bg-[#C5A265]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Content Section (Collapsible on Mobile, always open on Desktop) */}
        <div className={`p-5 sm:p-6 space-y-6 ${mobileExpanded ? 'block' : 'hidden lg:block'}`}>
          
          {/* Visual Box Slots Grid */}
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-stone-800 uppercase tracking-wider">
              <span>Box Slots ({capacity} Jars)</span>
              <span className="text-[11px] font-normal text-stone-500">Tap &apos;×&apos; to remove</span>
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
                  className={`relative rounded-md border transition-all duration-200 aspect-square flex flex-col items-center justify-center p-1 text-center ${
                    item
                      ? 'border-stone-300 bg-stone-50 shadow-2xs'
                      : 'border-dashed border-stone-300 bg-stone-50/50 text-stone-400'
                  }`}
                >
                  {item ? (
                    <>
                      <div className="relative w-full h-full rounded-sm overflow-hidden">
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
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-xs bg-stone-900 hover:bg-rose-700 text-white flex items-center justify-center shadow-md transition cursor-pointer z-10"
                        title="Remove jar"
                      >
                        <X size={12} strokeWidth={2.6} />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-1">
                      <span className="w-5 h-5 rounded-xs border border-stone-300 flex items-center justify-center text-stone-400 text-xs font-bold mb-1">
                        +
                      </span>
                      <span className="text-[9px] font-semibold text-stone-400 uppercase tracking-wider">
                        Slot {idx + 1}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Packaging Style Option */}
          <div className="pt-4 border-t border-stone-200">
            <span className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Package size={14} className="text-[#8C6B28]" />
              Packaging Presentation
            </span>

            <div className="space-y-2">
              {PACKAGING_OPTIONS.map((opt) => {
                const isSelected = packaging.id === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => onChangePackaging(opt)}
                    className={`p-3 rounded-md border text-left cursor-pointer transition flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-[#15231A] bg-stone-50 shadow-2xs'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-stone-900 leading-tight">
                          {opt.name}
                        </span>
                        {opt.priceDelta === 0 ? (
                          <span className="text-[10px] font-bold text-stone-800 bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded-xs">
                            Free
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-[#8C6B28] bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded-xs">
                            +${opt.priceDelta.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                        {opt.tagline}
                      </p>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-xs flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#15231A] text-white'
                          : 'border border-stone-300'
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
          <div className="pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Feather size={14} className="text-[#8C6B28]" />
                Wax-Sealed Gift Note
              </span>
              <span className="text-[10px] font-bold text-[#8C6B28] bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-xs">
                Complimentary
              </span>
            </div>

            {hasGiftNote ? (
              <div className="p-3.5 rounded-md bg-stone-50 border border-stone-200 text-left space-y-1 relative group">
                <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                  <span>To: {giftRecipient || 'Recipient'}</span>
                  <button
                    onClick={() => setIsNoteModalOpen(true)}
                    className="text-[#8C6B28] hover:text-stone-950 underline text-[11px] font-semibold cursor-pointer"
                  >
                    Edit Note
                  </button>
                </div>
                <p className="text-xs italic text-stone-700 line-clamp-2">
                  &quot;{giftMessage || 'Warmest wishes from Maison Avenoir'}&quot;
                </p>
                {giftSender && (
                  <p className="text-[11px] text-stone-500 font-medium text-right">
                    — {giftSender}
                  </p>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsNoteModalOpen(true)}
                className="w-full p-3 rounded-md border border-dashed border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Feather size={14} className="text-[#8C6B28]" />
                <span>+ Add Calligraphy Note (Free)</span>
              </button>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="pt-4 border-t border-stone-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-stone-500">
              <span>Standard Value:</span>
              <span className="line-through">${originalTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-[#8C6B28] font-bold">
              <span>Bundle Tier Savings ({tier.discountPercent}%):</span>
              <span>-${savings.toFixed(2)}</span>
            </div>

            {packagingDelta > 0 && (
              <div className="flex justify-between text-stone-800 font-medium">
                <span>Heirloom Walnut Upgrade:</span>
                <span>+${packagingDelta.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-baseline pt-2 border-t border-stone-200 text-stone-900">
              <span className="font-serif text-base font-bold">Total Bundle Price:</span>
              <div className="text-right">
                <span className="font-serif text-2xl font-extrabold text-stone-900">
                  ${finalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {tier.freeShipping && (
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#8C6B28] pt-1">
                <Truck size={13} />
                <span>Free Express Courier Shipping Included</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer / Add to Cart CTA Bar */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200">
          <button
            onClick={onAddToCart}
            disabled={!isFull}
            className={`w-full py-3.5 px-5 rounded-md font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs ${
              isFull
                ? 'bg-[#15231A] text-white hover:bg-[#1E3326] active:scale-[0.99]'
                : 'bg-stone-200 text-stone-500 cursor-not-allowed opacity-75'
            }`}
          >
            <ShoppingBag size={18} className={isFull ? 'text-[#C5A265]' : ''} />
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
