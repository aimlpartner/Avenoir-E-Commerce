'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import BrandLogo from '@/components/BrandLogo';

export default function CartClient() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    freeShippingThreshold,
  } = useCart();

  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [isGift, setIsGift] = useState(false);
  const [giftRecipientName, setGiftRecipientName] = useState('');
  const [giftNote, setGiftNote] = useState('');

  const progress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shippingCost = remainingForFreeShipping === 0 || cartItems.length === 0 ? 0 : 8.0;
  const finalTotal = cartSubtotal + shippingCost;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const randomOrder = `SB-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(randomOrder);
    setCheckoutComplete(true);
    clearCart();
  };

  if (checkoutComplete) {
    return (
      <div className="py-16 sm:py-24 px-4 sm:px-8 max-w-xl mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <BrandLogo variant="seal" />
        </div>
        <CheckCircle2 size={32} className="text-[#FB5601] mx-auto" />
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900">
          Thank You for Your Order
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
          Order <strong className="font-semibold text-stone-900">#{orderNumber}</strong> has been
          received. A confirmation will be sent to{' '}
          <span className="font-medium text-stone-900">{customerEmail || 'your email'}</span>.
        </p>

        <div className="py-4 border-y border-stone-200 text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex justify-between text-stone-600">
            <span>Packed &amp; Shipped From</span>
            <span className="font-semibold text-stone-900">Basking Ridge, NJ</span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>Estimated Delivery</span>
            <span className="font-semibold text-stone-900">2 – 4 Business Days</span>
          </div>
          {isGift && (
            <div className="flex justify-between text-stone-600 pt-2 border-t border-stone-100">
              <span>Gift Recipient</span>
              <span className="font-semibold text-stone-900">
                {giftRecipientName || 'Gift Note Included'}
              </span>
            </div>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            prefetch={true}
            className="w-full sm:w-auto px-7 py-3 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white text-xs font-semibold uppercase tracking-wider transition inline-flex items-center justify-center gap-2"
          >
            <span>Back to Home</span>
            <ArrowRight size={14} className="text-[#FB5601]" />
          </Link>
          <Link
            href="/shop"
            prefetch={true}
            className="w-full sm:w-auto px-6 py-3 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold uppercase tracking-wider transition inline-flex items-center justify-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-8 text-left">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" prefetch={true} className="hover:text-stone-900 transition">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="text-stone-900 font-semibold">Shopping Bag</span>
      </nav>

      {/* Header */}
      <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <BrandLogo variant="mark" className="w-9 h-9" />
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900">
            Your Shopping Bag
          </h1>
        </div>
        <span className="text-xs text-[#D64500] font-semibold">
          {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="py-16 text-center max-w-md mx-auto space-y-4">
          <div className="flex justify-center">
            <BrandLogo variant="seal" />
          </div>
          <h2 className="font-serif text-2xl font-normal text-stone-900">Your Bag is Empty</h2>
          <p className="text-sm text-stone-500 leading-relaxed">
            Shop our 1/2 lb &amp; 1 lb jars, 3-jar combos, holiday gift boxes, or monthly club.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/shop"
              prefetch={true}
              className="px-6 py-2.5 rounded-md bg-[#FB5601] hover:bg-[#D64500] text-white text-xs font-semibold uppercase tracking-wider transition"
            >
              Shop Honey
            </Link>
            <Link
              href="/gifting"
              prefetch={true}
              className="px-6 py-2.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold uppercase tracking-wider transition"
            >
              Gift Boxes
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Open Items List */}
          <div className="lg:col-span-7 space-y-6">
            {/* Minimal Shipping Progress Bar */}
            <div className="space-y-2 pb-4 border-b border-stone-200">
              <div className="flex items-center justify-between text-xs text-stone-700">
                <span className="flex items-center gap-1.5 font-medium">
                  <Truck size={14} className="text-[#D64500]" />
                  {remainingForFreeShipping > 0
                    ? `Add $${remainingForFreeShipping.toFixed(2)} more for free shipping (over $60)`
                    : 'Free shipping unlocked'}
                </span>
                <span className="font-semibold text-[#D64500]">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FB5601] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Unboxed Item Rows */}
            <div className="divide-y divide-stone-200">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-[#FAF7F2] shrink-0">
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
                    <div className="space-y-0.5">
                      <Link
                        href={`/products/${item.productId}`}
                        prefetch={true}
                        className="font-serif text-base font-medium text-stone-900 hover:text-[#D64500] transition block"
                      >
                        {item.name}
                      </Link>
                      {item.variantLabel && (
                        <span className="text-xs text-stone-500 block">{item.variantLabel}</span>
                      )}
                      {item.customNote && (
                        <span className="text-xs text-stone-500 italic block pt-0.5">
                          &ldquo;{item.customNote}&rdquo;
                        </span>
                      )}
                      <span className="text-xs text-stone-400 block pt-0.5">
                        ${item.price.toFixed(2)}
                        {item.isSubscription ? ' / month' : ' each'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 pt-2 sm:pt-0">
                    <div className="flex items-center border border-stone-300 rounded-md px-1 py-0.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-950 transition cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-7 text-center text-xs font-semibold text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-950 transition cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <span className="font-serif text-lg font-semibold text-stone-900 sm:w-20 sm:text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-400 hover:text-rose-600 transition p-1 cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-stone-200">
              <Link
                href="/shop"
                className="text-xs font-semibold text-stone-700 hover:text-[#D64500] hover:underline"
              >
                &larr; Continue Shopping
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                Clear bag
              </button>
            </div>
          </div>

          {/* Right: Clean Unboxed Checkout Column */}
          <div className="lg:col-span-5 lg:border-l lg:border-stone-200 lg:pl-12 space-y-6">
            <h2 className="font-serif text-2xl font-normal text-stone-900">Order Summary</h2>

            <div className="space-y-2.5 text-sm text-stone-600 pb-4 border-b border-stone-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-stone-900">
                  {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline">
                <span className="font-semibold text-stone-900">Total</span>
                <span className="font-serif text-3xl font-semibold text-stone-900">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Full name"
                className="w-full py-2.5 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#FB5601]"
              />
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Email for order confirmation"
                className="w-full py-2.5 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#FB5601]"
              />
              <input
                type="text"
                required
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Shipping address (Street, City, State, ZIP)"
                className="w-full py-2.5 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#FB5601]"
              />

              <div className="pt-2 space-y-3">
                <label className="flex items-center gap-2 text-xs text-stone-800 font-medium cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="w-4 h-4 rounded border-stone-300 accent-[#FB5601] cursor-pointer"
                  />
                  <span>This order is a gift</span>
                </label>

                {isGift && (
                  <div className="pl-4 border-l-2 border-[#FB5601]/60 space-y-3">
                    <input
                      type="text"
                      value={giftRecipientName}
                      onChange={(e) => setGiftRecipientName(e.target.value)}
                      placeholder="Recipient name"
                      className="w-full py-2 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#FB5601]"
                    />
                    <textarea
                      rows={2}
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Optional gift message..."
                      className="w-full py-2 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#FB5601] resize-none"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white text-xs font-semibold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck size={16} className="text-[#FB5601]" />
                <span>Place Order &bull; ${finalTotal.toFixed(2)}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
