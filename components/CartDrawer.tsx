'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Sparkles, Gift, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, ProductItem } from '@/lib/products';

const ADDON_IDS = ['AV-JAR-MINI', 'AV-ACC-WAND', 'AV-CANDLE-TAPER'];
const cartAddOns = ADDON_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as ProductItem[];

export default function CartDrawer() {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    freeShippingThreshold,
    addToCart 
  } = useCart();

  const GIFT_THRESHOLD = 75;
  const hasUnlockedFreeShipping = cartSubtotal >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const hasUnlockedGiftWrap = cartSubtotal >= GIFT_THRESHOLD;
  const remainingForGiftWrap = Math.max(0, GIFT_THRESHOLD - cartSubtotal);
  const giftProgress = Math.min(100, Math.round((cartSubtotal / GIFT_THRESHOLD) * 100));

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 transition-opacity"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full sm:w-115 bg-white z-50 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-serif text-2xl font-bold text-stone-900">Your Shopping Bag</h3>
                  <span className="bg-stone-900 text-[#E8D7B5] text-xs font-bold px-2.5 py-1 rounded-xs">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950 flex items-center justify-center transition cursor-pointer"
                  aria-label="Close Shopping Bag"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Dual Value-Add Progress Meter: Free Shipping ($60) & Free Gift Note/Wrap ($75) */}
              <div className="mt-4 p-3.5 rounded-md bg-stone-50 border border-stone-200/90 space-y-2.5">
                <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
                  <span className="flex items-center gap-2 text-stone-900 font-bold">
                    {!hasUnlockedFreeShipping ? (
                      <>
                        <Truck size={16} strokeWidth={2.4} className="text-[#8C6B28]" />
                        <span>Add ${remainingForFreeShipping.toFixed(2)} for Free Shipping ($60)</span>
                      </>
                    ) : !hasUnlockedGiftWrap ? (
                      <>
                        <Gift size={16} strokeWidth={2.4} className="text-[#8C6B28]" />
                        <span>Add ${remainingForGiftWrap.toFixed(2)} for Free Gift Note &amp; Wrap ($75)</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} strokeWidth={2.4} className="text-[#8C6B28]" />
                        <span>Unlocked: Free Shipping + Free Gift Wrap ($75+)</span>
                      </>
                    )}
                  </span>
                  <span className="font-bold text-stone-900 text-xs">
                    {hasUnlockedGiftWrap ? '100%' : `${giftProgress}%`}
                  </span>
                </div>

                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      hasUnlockedGiftWrap ? 'bg-[#15231A]' : 'bg-[#C5A265]'
                    }`}
                    style={{ width: `${giftProgress}%` }}
                  />
                </div>

                {/* Milestone Indicators */}
                <div className="flex items-center justify-between text-[10px] font-semibold text-stone-500 pt-0.5">
                  <span className={`flex items-center gap-1 ${hasUnlockedFreeShipping ? 'text-stone-900 font-bold' : ''}`}>
                    <CheckCircle2 size={11} className={hasUnlockedFreeShipping ? 'text-[#8C6B28]' : 'text-stone-300'} />
                    $60 Free Shipping
                  </span>
                  <span className={`flex items-center gap-1 ${hasUnlockedGiftWrap ? 'text-stone-900 font-bold' : ''}`}>
                    <CheckCircle2 size={11} className={hasUnlockedGiftWrap ? 'text-[#8C6B28]' : 'text-stone-300'} />
                    $75 Free Gift Note &amp; Wrap
                  </span>
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4">
                    <Sparkles size={22} className="text-[#8C6B28]" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-800 mb-1">Your bag is currently empty</h4>
                  <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto">
                    Discover small-batch raw honey from our New Jersey hives or explore thoughtful gift boxes.
                  </p>
                  <div className="flex flex-col gap-2 max-w-xs mx-auto">
                    <Link
                      href="/honey"
                      prefetch={true}
                      onClick={() => setIsCartOpen(false)}
                      className="px-5 py-2.5 rounded-md bg-[#15231A] text-white text-xs font-bold hover:bg-[#1E3326] transition text-center shadow-2xs cursor-pointer"
                    >
                      Shop the Harvest
                    </Link>
                    <Link
                      href="/corporate"
                      prefetch={true}
                      onClick={() => setIsCartOpen(false)}
                      className="px-5 py-2.5 rounded-md bg-stone-100 text-stone-800 text-xs font-bold hover:bg-stone-200 transition text-center cursor-pointer"
                    >
                      Send a Gift
                    </Link>
                  </div>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-md border border-stone-200/90 bg-white hover:border-stone-300 transition flex gap-3.5 relative shadow-2xs"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-20 rounded-sm overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          {item.isBundle && (
                            <span className="inline-block px-2 py-0.5 rounded-xs bg-stone-100 text-[#8C6B28] border border-stone-200 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                              {item.bundleTier || 'Artisan Bundle'}
                            </span>
                          )}
                          {item.isBundle ? (
                            <Link 
                              href="/gifting"
                              prefetch={true}
                              onClick={() => setIsCartOpen(false)}
                              className="font-serif text-base font-bold text-stone-900 hover:text-stone-700 transition line-clamp-1 block"
                            >
                              {item.name}
                            </Link>
                          ) : (
                            <Link 
                              href={`/products/${item.productId}`}
                              prefetch={true}
                              onClick={() => setIsCartOpen(false)}
                              className="font-serif text-base font-bold text-stone-900 hover:text-stone-700 transition line-clamp-1 block"
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition p-1 cursor-pointer shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} strokeWidth={2.2} />
                        </button>
                      </div>

                      {item.finish && (
                        <span className="text-xs text-stone-600 block mt-0.5 font-medium">
                          Packaging: {item.finish}
                        </span>
                      )}

                      {/* Bundle Items Manifest Breakdown */}
                      {item.bundleItems && item.bundleItems.length > 0 && (
                        <div className="mt-1.5 p-2 rounded-md bg-stone-50 border border-stone-200 text-[11px] text-stone-600 space-y-0.5">
                          <span className="font-bold text-stone-700 block text-[10px] uppercase tracking-wide">
                            Included Jars ({item.bundleItems.length}):
                          </span>
                          <div className="max-h-20 overflow-y-auto space-y-0.5 pr-1">
                            {item.bundleItems.map((sub, idx) => (
                              <div key={idx} className="truncate text-stone-700 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A265] shrink-0" />
                                <span className="truncate">{sub.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.customNote && (
                        <span className="text-[11px] text-stone-800 italic block mt-1 bg-stone-50 p-1.5 rounded-xs border border-stone-200">
                          ✍ {item.customNote}
                        </span>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-stone-300 rounded-md bg-stone-50">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-stone-700 hover:text-stone-950 transition cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} strokeWidth={2.4} />
                          </button>
                          <span className="w-8 text-center text-xs sm:text-sm font-bold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-stone-700 hover:text-stone-900 transition cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} strokeWidth={2.4} />
                          </button>
                        </div>

                        <span className="text-base font-extrabold text-stone-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Cart Offer Sequence: Dipper, Beeswax Candle, or Mini Jar */}
              {cartItems.length > 0 && cartAddOns.length > 0 && (
                <div className="pt-3 border-t border-stone-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#8C6B28]" />
                      Complete Your Honey Ritual
                    </span>
                    <span className="text-[11px] text-stone-500">Curated Add-ons</span>
                  </div>

                  <div className="space-y-2">
                    {cartAddOns.map((addon) => {
                      const inCart = cartItems.some((i) => i.productId === addon.id);
                      return (
                        <div
                          key={addon.id}
                          className="p-2.5 rounded-md border border-stone-200/90 bg-stone-50/70 hover:bg-stone-50 transition flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="relative w-11 h-11 rounded-sm overflow-hidden bg-white shrink-0 border border-stone-200">
                              <Image
                                src={addon.imageUrl}
                                alt={addon.name}
                                fill
                                sizes="44px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-stone-900 truncate">
                                {addon.name}
                              </p>
                              <p className="text-[11px] text-stone-800 font-extrabold">
                                ${addon.price.toFixed(2)}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => addToCart(addon)}
                            className="shrink-0 px-2.5 py-1.5 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer active:scale-95"
                            aria-label={`Add ${addon.name} to bag`}
                          >
                            <Plus size={12} strokeWidth={2.4} />
                            <span>{inCart ? 'Add Another' : 'Add'}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-stone-200 bg-stone-50/90 space-y-4">
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-stone-700 font-medium">
                    <span>Subtotal</span>
                    <span className="font-bold text-stone-900">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-700 font-medium">
                    <span>Courier Delivery</span>
                    <span className="font-bold text-stone-900">
                      {remainingForFreeShipping === 0 ? 'FREE' : '$12.00'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="text-base font-bold text-stone-900">Estimated Total</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                    ${(cartSubtotal + (remainingForFreeShipping === 0 ? 0 : 12)).toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <Link
                    href="/cart"
                    prefetch={true}
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3.5 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white text-xs sm:text-sm font-bold tracking-wide transition flex items-center justify-center gap-2.5 shadow-2xs cursor-pointer active:scale-98"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight size={16} strokeWidth={2.5} className="text-[#C5A265]" />
                  </Link>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2 rounded-md text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-900 transition cursor-pointer text-center"
                  >
                    Continue Shopping
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 pt-1 text-xs text-stone-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={14} strokeWidth={2.2} className="text-[#8C6B28]" />
                    256-Bit SSL Encrypted
                  </span>
                  <span>•</span>
                  <span>Traceable New Jersey Honey</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
