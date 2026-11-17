'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BoxFlavorItem, GiftBoxTier, PACKAGING_OPTIONS, PackagingOption } from '@/lib/products';
import { 
  Check, 
  X, 
  ShoppingBag, 
  Feather, 
  Trash2, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import GiftNoteModal from './GiftNoteModal';
import BrandLogo from '@/components/BrandLogo';

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

  const basePrice = tier.bundlePrice;
  const packagingDelta = packaging.priceDelta;
  const finalPrice = basePrice + packagingDelta;

  const hasGiftNote = Boolean(giftMessage || giftRecipient);

  // Generate slots array with filled or empty items
  const slots = Array.from({ length: capacity }, (_, i) => selectedItems[i] || null);

  return (
    <>
      {/* Desktop Sticky Panel / Mobile Bottom Drawer */}
      <div className="w-full lg:sticky lg:top-24 bg-white rounded-lg border border-stone-200/90 shadow-xs overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="p-5 bg-stone-50/90 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo variant="mark" className="w-8 h-8" />
            <div>
              <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-[#D64500] uppercase block mb-0.5">
                Box Summary
              </span>
              <h3 className="font-serif text-xl font-normal text-stone-900">
                {tier.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {count > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-stone-400 hover:text-stone-700 transition flex items-center gap-1 p-1 cursor-pointer"
                title="Clear all jars"
              >
                <Trash2 size={13} />
                <span className="hidden sm:inline font-mono text-[11px]">Clear</span>
              </button>
            )}

            {/* Mobile Expand/Collapse Button */}
            <button
              onClick={() => setMobileExpanded(!mobileExpanded)}
              className="lg:hidden w-8 h-8 rounded-md bg-stone-100 text-stone-600 flex items-center justify-center transition cursor-pointer"
              aria-label="Toggle Box Details"
            >
              {mobileExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </button>
          </div>
        </div>

        {/* Quiet Status Row */}
        <div className="px-5 py-2.5 bg-stone-100/60 border-b border-stone-200/80 flex items-center justify-between text-xs font-mono text-stone-600">
          <span>{isFull ? 'Box complete' : `Select ${remaining} more jar${remaining === 1 ? '' : 's'}`}</span>
          <span>{count} / {capacity}</span>
        </div>

        {/* Content Section (Collapsible on Mobile, always open on Desktop) */}
        <div className={`p-5 sm:p-6 space-y-6 ${mobileExpanded ? 'block' : 'hidden lg:block'}`}>
          
          {/* Visual Box Slots Grid */}
          <div>
            <div className="flex items-center justify-between mb-3 text-[11px] font-mono tracking-wider uppercase text-stone-400">
              <span>Selected Jars</span>
              <span className="text-[10px] normal-case text-stone-400">Hover &lsquo;×&rsquo; to remove</span>
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
                      ? 'border-stone-200 bg-stone-50 shadow-2xs'
                      : 'border-dashed border-stone-200 bg-stone-50/40 text-stone-300'
                  }`}
                >
                  {item ? (
                    <>
                      <div className="relative w-full h-full rounded-sm overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className={item.imageUrl.includes('singing-bee-bottle') ? 'object-contain p-1' : 'object-cover'}
                        />
                        <span className="absolute bottom-1 inset-x-1 text-[9px] font-medium text-stone-900 bg-white/80 backdrop-blur-xs rounded-xs px-1 line-clamp-1 leading-tight text-center">
                          {item.name.replace('Honey', '').trim()}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-stone-800 hover:bg-stone-950 text-white flex items-center justify-center shadow-xs transition cursor-pointer z-10"
                        title="Remove jar"
                      >
                        <X size={11} strokeWidth={2} />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-1">
                      <span className="text-stone-300 text-xs font-light mb-0.5">
                        +
                      </span>
                      <span className="text-[9px] font-mono text-stone-400 uppercase">
                        Jar {idx + 1}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Packaging Style Option */}
          <div className="pt-5 border-t border-stone-200/80">
            <span className="block text-[11px] font-mono tracking-wider uppercase text-stone-400 mb-2.5">
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
                        ? 'border-stone-900 bg-stone-50'
                        : 'border-stone-200/80 bg-white hover:bg-stone-50/60'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm text-stone-900 leading-tight">
                          {opt.name}
                        </span>
                        {opt.priceDelta > 0 && (
                          <span className="text-[11px] font-mono text-stone-500">
                            +${opt.priceDelta.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">
                        {opt.tagline}
                      </p>
                    </div>

                    <div
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-4 border-[#15231A]'
                          : 'border border-stone-300'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Complimentary Handwritten Gift Note */}
          <div className="pt-5 border-t border-stone-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono tracking-wider uppercase text-stone-400">
                Calligraphy Note
              </span>
              <span className="text-[11px] font-mono text-stone-400">
                Complimentary
              </span>
            </div>

            {hasGiftNote ? (
              <div className="p-3.5 rounded-md bg-stone-50 border border-stone-200 text-left space-y-1 relative group">
                <div className="flex items-center justify-between text-xs font-serif text-stone-900">
                  <span>To: {giftRecipient || 'Recipient'}</span>
                  <button
                    onClick={() => setIsNoteModalOpen(true)}
                    className="text-stone-500 hover:text-stone-900 underline text-xs cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-xs italic text-stone-600 line-clamp-2 font-serif">
                  &ldquo;{giftMessage || 'Warmest wishes from Singing Bee Honey'}&rdquo;
                </p>
                {giftSender && (
                  <p className="text-xs text-stone-400 text-right font-serif">
                    — {giftSender}
                  </p>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsNoteModalOpen(true)}
                className="w-full p-2.5 rounded-md border border-stone-200 bg-stone-50/50 hover:bg-stone-50 text-stone-600 text-xs font-mono transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Feather size={13} className="text-stone-500" />
                <span>+ Add Calligraphy Note</span>
              </button>
            )}
          </div>

          {/* Clean Price Display */}
          <div className="pt-5 border-t border-stone-200/80 space-y-1.5">
            {packagingDelta > 0 && (
              <div className="flex justify-between text-xs text-stone-500 font-serif">
                <span>Walnut Presentation Box:</span>
                <span>+${packagingDelta.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-baseline pt-1 text-stone-900">
              <span className="font-serif text-sm text-stone-600">Total</span>
              <span className="font-serif text-2xl font-normal text-stone-900">
                ${finalPrice.toFixed(2)}
              </span>
            </div>

            <p className="text-[11px] font-mono text-stone-400 pt-0.5">
              Discreet blind packing slip • Fragile courier delivery
            </p>
          </div>
        </div>

        {/* Footer / Add to Cart CTA Bar */}
        <div className="p-4 sm:p-5 bg-stone-50/90 border-t border-stone-200/80">
          <button
            onClick={onAddToCart}
            disabled={!isFull}
            className={`w-full py-3 px-5 rounded-md text-xs font-medium uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer ${
              isFull
                ? 'bg-[#15231A] text-white hover:bg-[#1E3326]'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag size={14} />
            <span>
              {isFull
                ? `Add to Cart • $${finalPrice.toFixed(2)}`
                : `Select ${remaining} More Jar${remaining === 1 ? '' : 's'}`}
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

