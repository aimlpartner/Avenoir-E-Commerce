'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    freeShippingThreshold 
  } = useCart();

  const progress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

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
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-serif text-2xl font-bold text-slate-900">Your Shopping Bag</h3>
                  <span className="bg-emerald-100 text-emerald-950 text-xs font-bold px-2.5 py-1 rounded-md">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 flex items-center justify-center transition cursor-pointer"
                  aria-label="Close Shopping Bag"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              {/* Free Shipping Progress Meter */}
              <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-300">
                <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5 font-medium">
                  <span className="flex items-center gap-2 text-amber-950 font-bold">
                    <Truck size={17} strokeWidth={2.4} className="text-amber-800" />
                    {remainingForFreeShipping > 0
                      ? `Add $${remainingForFreeShipping.toFixed(2)} more for Free Express Delivery`
                      : 'You unlocked Free Express Insured Delivery!'}
                  </span>
                  <span className="font-extrabold text-amber-900 text-sm">{progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-amber-200/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                    <Sparkles size={24} />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-slate-800 mb-1">Your bag is currently empty</h4>
                  <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">
                    Discover raw terroir honeys from New Jersey or explore professional apiary equipment.
                  </p>
                  <div className="flex flex-col gap-2 max-w-xs mx-auto">
                    <Link
                      href="/honey"
                      prefetch={true}
                      onClick={() => setIsCartOpen(false)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 transition text-center shadow-xs"
                    >
                      Shop Raw Honey Reserves
                    </Link>
                    <Link
                      href="/beekeeping"
                      prefetch={true}
                      onClick={() => setIsCartOpen(false)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition text-center"
                    >
                      Shop Beekeeping Gear
                    </Link>
                  </div>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition flex gap-3.5 relative"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
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
                        <Link 
                          href={`/products/${item.productId}`}
                          prefetch={true}
                          onClick={() => setIsCartOpen(false)}
                          className="font-serif text-base font-bold text-slate-900 hover:text-emerald-900 transition line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-600 transition p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} strokeWidth={2.2} />
                        </button>
                      </div>

                      {item.finish && (
                        <span className="text-xs text-slate-600 block mt-0.5 font-semibold">
                          Finish: {item.finish}
                        </span>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-700 hover:text-slate-950 transition cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} strokeWidth={2.4} />
                          </button>
                          <span className="w-8 text-center text-xs sm:text-sm font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-700 hover:text-slate-900 transition cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} strokeWidth={2.4} />
                          </button>
                        </div>

                        <span className="text-base font-extrabold text-emerald-950">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-slate-50/90 space-y-4">
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-700 font-medium">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-700 font-medium">
                    <span>Courier Delivery</span>
                    <span className="font-bold text-emerald-900">
                      {remainingForFreeShipping === 0 ? 'FREE' : '$12.00'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-base font-bold text-slate-900">Estimated Total</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
                    ${(cartSubtotal + (remainingForFreeShipping === 0 ? 0 : 12)).toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <Link
                    href="/cart"
                    prefetch={true}
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-4 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold tracking-wide transition flex items-center justify-center gap-2.5 shadow-sm cursor-pointer active:scale-98"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight size={17} strokeWidth={2.5} />
                  </Link>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 transition cursor-pointer text-center"
                  >
                    Continue Shopping
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 pt-1 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={14} strokeWidth={2.2} className="text-emerald-700" />
                    256-Bit SSL Encrypted
                  </span>
                  <span>•</span>
                  <span>Authentic Apiary Harvest</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
