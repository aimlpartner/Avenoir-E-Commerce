'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/context/CartContext';
import BrandLogo from '@/components/BrandLogo';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    freeShippingThreshold,
  } = useCart();

  const totalItems = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const hasUnlockedFreeShipping = cartSubtotal >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-50 transition-opacity"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white z-50 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BrandLogo variant="mark" className="w-8 h-8" />
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-900">
                    Shopping Bag
                    <span className="text-[#7A5CD6] font-sans text-sm ml-2 font-semibold">
                      ({totalItems})
                    </span>
                  </h3>
                  <p className="text-xs text-stone-500 font-serif mt-0.5">
                    {cartItems.length === 0
                      ? 'Free shipping on orders over $60'
                      : hasUnlockedFreeShipping
                      ? 'Free shipping unlocked'
                      : `Add $${remainingForFreeShipping.toFixed(2)} for free shipping`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-900 transition cursor-pointer"
                aria-label="Close Shopping Bag"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="flex justify-center">
                    <BrandLogo variant="seal" />
                  </div>
                  <h4 className="font-serif text-lg font-normal text-stone-800">
                    Your bag is empty
                  </h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto font-serif">
                    Start with a single jar, a 3-jar combo, a holiday gift box, or our monthly club.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/shop"
                      prefetch={true}
                      onClick={() => setIsCartOpen(false)}
                      className="inline-block px-6 py-2.5 rounded-lg bg-[#8B6FE0] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#7A5CD6] transition shadow-2xs"
                    >
                      Shop Honey
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-5 flex gap-4 items-start">
                      <div className="relative w-20 h-20 rounded-md overflow-hidden bg-[#FDF9E4] shrink-0 border border-stone-200/80">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className={
                            item.imageUrl.endsWith('.png')
                              ? 'object-contain p-1.5'
                              : 'object-cover'
                          }
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${item.productId}`}
                            prefetch={true}
                            onClick={() => setIsCartOpen(false)}
                            className="font-serif text-sm sm:text-base font-normal text-stone-900 hover:text-[#7A5CD6] transition line-clamp-1"
                          >
                            {item.name}
                          </Link>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-300 hover:text-stone-700 transition p-0.5 cursor-pointer shrink-0"
                            aria-label="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        {item.variantLabel && (
                          <span className="text-xs text-stone-500 block">{item.variantLabel}</span>
                        )}

                        {item.customNote && (
                          <p className="text-xs text-stone-500 italic font-serif">
                            &ldquo;{item.customNote}&rdquo;
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-900 transition cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-xs font-medium text-stone-800">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-900 transition cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <span className="text-sm font-semibold text-stone-900">
                            ${(item.price * item.quantity).toFixed(2)}
                            {item.isSubscription ? '/mo' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-stone-200 bg-white space-y-4">
                <div className="space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-stone-900">
                      {hasUnlockedFreeShipping ? 'Free' : '$8.00'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline">
                  <span className="font-serif text-base text-stone-900">Total</span>
                  <span className="text-xl font-semibold text-stone-900">
                    ${(cartSubtotal + (hasUnlockedFreeShipping ? 0 : 8)).toFixed(2)}
                  </span>
                </div>

                <Link
                  href="/cart"
                  prefetch={true}
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 rounded-lg bg-[#8B6FE0] hover:bg-[#7A5CD6] text-white text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
