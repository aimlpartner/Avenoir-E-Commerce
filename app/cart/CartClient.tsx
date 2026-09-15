'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Tag 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAdmin } from '@/context/AdminContext';

export default function CartClient() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    freeShippingThreshold 
  } = useCart();
  const { createOrder } = useAdmin();

  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('842915');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  const progress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const discountAmount = discountApplied ? cartSubtotal * 0.10 : 0;
  const shippingCost = remainingForFreeShipping === 0 ? 0 : 12.0;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'TERROIR10') {
      setDiscountApplied(true);
      setPromoCode('');
    } else {
      setPromoError('Invalid promotion code. Try "TERROIR10" for 10% off.');
    }
  };

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const created = createOrder({
      customerName: customerName.trim() || 'Valued Guest Collector',
      customerEmail: customerEmail.trim() || 'client@avenoirhoney.com',
      items: cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        finish: item.finish,
        customNote: item.customNote,
      })),
      subtotal: cartSubtotal,
      tax: 0,
      shipping: shippingCost,
      total: finalTotal,
      status: 'pending',
      paymentStatus: 'paid',
      shippingAddress: {
        street: shippingAddress.trim() || 'Atelier Delivery Address',
        city: 'New York',
        state: 'NY',
        postalCode: '10021',
        country: 'United States',
      },
      notes: 'Customer placed via web checkout portal.',
    });

    setOrderNumber(created.orderNumber);
    setCheckoutComplete(true);
    clearCart();
  };

  if (checkoutComplete) {
    return (
      <div className="py-16 sm:py-24 px-4 sm:px-8 max-w-2xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 size={36} className="text-emerald-700" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          Order Confirmed & Staged for Dispatch
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          Thank you for choosing Avenoir. Your order #{orderNumber} has been received by our Sussex County atelier and will be packed in temperature-controlled protective casing.
        </p>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex justify-between font-medium text-slate-700">
            <span>Estimated Courier Delivery:</span>
            <span className="font-bold text-slate-900">2 - 3 Business Days</span>
          </div>
          <div className="flex justify-between font-medium text-slate-700">
            <span>Provenance Certificate:</span>
            <span className="font-bold text-emerald-800">Included in Package</span>
          </div>
        </div>
        <div className="pt-4">
          <Link
            href="/"
            prefetch={true}
            className="px-8 py-3.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition inline-flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <span>Return to Homepage</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-6 sm:space-y-8 text-left">
      
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" prefetch={true} className="hover:text-emerald-900 transition">Home</Link>
        <ChevronRight size={12} />
        <span className="text-emerald-950 font-bold">Shopping Bag & Checkout</span>
      </nav>

      {/* Page Title */}
      <div className="border-b border-slate-200 pb-3 sm:pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-2">
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
          Your Shopping Bag
        </h1>
        <span className="text-xs text-slate-500">
          {cartItems.reduce((acc, i) => acc + i.quantity, 0)} item{cartItems.length !== 1 ? 's' : ''} in bag
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 sm:p-20 border border-slate-200 text-center max-w-md mx-auto shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <ShoppingBag size={28} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900">Your Bag is Empty</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Explore our cold-extracted New Jersey raw honey terroir jars, luxury keepsake vaults, or professional beekeeping gear.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/honey"
              prefetch={true}
              className="px-6 py-2.5 rounded-full bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 transition"
            >
              Shop Honey Reserves
            </Link>
            <Link
              href="/beekeeping"
              prefetch={true}
              className="px-6 py-2.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition"
            >
              Shop Apiary Gear
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free shipping banner */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-amber-900">
                <span className="flex items-center gap-1.5 font-bold">
                  <Truck size={14} className="text-amber-700" />
                  {remainingForFreeShipping > 0
                    ? `Add $${remainingForFreeShipping.toFixed(2)} more for Complimentary Express Insured Delivery`
                    : 'You unlocked Free Express Insured Delivery!'}
                </span>
                <span className="font-extrabold">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-amber-200/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Item Rows */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/products/${item.productId}`}
                        prefetch={true}
                        className="font-serif text-sm sm:text-base font-bold text-slate-900 hover:text-emerald-900 transition"
                      >
                        {item.name}
                      </Link>
                      {item.finish && (
                        <span className="text-xs text-slate-500 block mt-0.5">
                          Artisan Finish: {item.finish}
                        </span>
                      )}
                      {item.customNote && (
                        <span className="text-xs text-amber-800 italic block mt-0.5">
                          Note: &quot;{item.customNote}&quot;
                        </span>
                      )}
                      <span className="text-xs text-slate-400 block mt-1">
                        ${item.price.toFixed(2)} each
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Item Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50 px-1 py-0.5">
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
                        className="w-8 h-8 flex items-center justify-center text-slate-700 hover:text-slate-950 transition cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} strokeWidth={2.4} />
                      </button>
                    </div>

                    <span className="font-serif text-lg font-extrabold text-emerald-950 sm:w-20 sm:text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-rose-600 transition p-1.5 cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 size={17} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-between items-center gap-3 pt-2">
              <div className="flex items-center gap-3">
                <Link
                  href="/honey"
                  className="text-xs font-bold text-emerald-900 hover:underline cursor-pointer"
                >
                  ← Shop Honey
                </Link>
                <span className="text-slate-300">|</span>
                <Link
                  href="/beekeeping"
                  className="text-xs font-bold text-emerald-900 hover:underline cursor-pointer"
                >
                  Shop Beekeeping Gear →
                </Link>
              </div>
              <button
                onClick={clearCart}
                className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear entire bag
              </button>
            </div>
          </div>

          {/* Right: Checkout Summary & Form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-4 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <h2 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Order Summary
              </h2>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (e.g. TERROIR10)"
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 uppercase font-mono focus:outline-hidden focus:border-emerald-700"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {discountApplied && (
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={12} /> 10% Atelier Discount Applied!
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 font-medium">
                    {promoError}
                  </p>
                )}
              </form>

              {/* Line Items */}
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Promotion Discount (10%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Courier Delivery</span>
                  <span className="font-semibold text-emerald-800">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated State Tax</span>
                  <span className="font-semibold text-slate-900">$0.00 (NJ Apiary Exempt)</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">Total</span>
                  <span className="text-2xl sm:text-3xl font-bold text-emerald-950">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Simulated Checkout Form */}
              <form onSubmit={handleSimulateCheckout} className="space-y-3 pt-2">
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Recipient full name (e.g. Eleanor Vance)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-700"
                />
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Shipping confirmation email"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-700"
                />
                <input
                  type="text"
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Full recipient shipping address"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-700"
                />

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-sm active:scale-98"
                >
                  <ShieldCheck size={16} className="text-amber-400" />
                  <span>Place Order • ${finalTotal.toFixed(2)}</span>
                </button>
              </form>

              <div className="pt-2 text-center text-[11px] text-slate-400 space-y-1">
                <p className="flex items-center justify-center gap-1">
                  <ShieldCheck size={13} className="text-emerald-700" />
                  256-Bit SSL Encrypted & Temperature Controlled
                </p>
                <p>30-day money-back satisfaction guarantee on all honey and apiary supplies.</p>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
