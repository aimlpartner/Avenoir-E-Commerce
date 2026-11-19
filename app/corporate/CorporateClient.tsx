'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ShoppingBag, CheckCircle2, Send } from 'lucide-react';
import { getProductById, ProductVariant } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import BrandLogo from '@/components/BrandLogo';

export default function CorporateClient() {
  const { addToCart } = useCart();
  const corporateProduct = getProductById('SB-CORPORATE-GLASS')!;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    corporateProduct.variants[1]
  );
  const [companyName, setCompanyName] = useState('');
  const [labelMessage, setLabelMessage] = useState('Thank you for a wonderful year!');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [estimatedQty, setEstimatedQty] = useState('50+');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleAddToBag = () => {
    const customLabel = companyName.trim()
      ? `${companyName.trim()} — "${labelMessage.trim()}"`
      : labelMessage.trim() || 'Personalized Corporate Label';
    addToCart(corporateProduct, 1, selectedVariant, customLabel);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName.trim() && contactEmail.trim()) {
      setInquirySubmitted(true);
    }
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-16 text-left">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" prefetch={true} className="hover:text-stone-900 transition">
          Home
        </Link>
        <ChevronRight size={12} />
        <Link href="/shop" prefetch={true} className="hover:text-stone-900 transition">
          Shop
        </Link>
        <ChevronRight size={12} />
        <span className="text-stone-900 font-semibold">Corporate Gifting</span>
      </nav>

      {/* Open Editorial Header */}
      <div className="pb-8 border-b border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-[#D64500] uppercase block mb-1.5">
            Business &amp; Client Gifts
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Personalized Corporate Gifting
          </h1>
          <p className="text-sm sm:text-base text-stone-500 font-serif mt-2 max-w-2xl">
            Clear glass bottles and jars filled with raw wildflower honey from Basking Ridge,
            personalized with your company name and message.
          </p>
        </div>
        <BrandLogo variant="seal" className="self-start sm:self-end" />
      </div>

      {/* Open 2-Column Layout (Zero Outer Card Boxes) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Real Photo + Simple Label Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden bg-stone-100">
            <Image
              src="/media/products/beeproduct_corporategifting.jpeg"
              alt="Personalized Corporate Honey Gift Box"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-[50%_52%]"
            />
          </div>

          {/* Clean Borderless Label Preview Strip */}
          <div className="pt-4 border-t border-stone-200 flex items-start gap-4">
            <BrandLogo variant="mark" className="w-8 h-8 shrink-0 mt-0.5" />
            <div className="space-y-1 min-w-0">
              <p className="text-xs uppercase tracking-wider text-[#D64500] font-semibold">
                {companyName.trim() || 'Your Company Name'}
              </p>
              <p className="font-serif text-base text-stone-900 leading-snug">
                &ldquo;{labelMessage.trim() || 'Your custom label message'}&rdquo;
              </p>
              <p className="text-xs text-stone-400">
                Digital proof sent by email before label printing.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Clean Unboxed Order Form */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
              Configure Your Glass Bottle / Jar Order
            </h2>
            <p className="text-sm text-stone-500">
              Select a glass pack size and enter your custom front label text.
            </p>
          </div>

          {/* 1. Pack Size — Clean Hairline Radio List (Not Heavy Boxes) */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
              1. Select Glass Pack
            </span>
            <div className="divide-y divide-stone-200 border-y border-stone-200">
              {corporateProduct.variants.map((variant) => {
                const selected = selectedVariant.id === variant.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`w-full py-4 px-2 text-left transition cursor-pointer flex items-center justify-between gap-4 ${
                      selected ? 'bg-[#FFF8F3]' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                          selected ? 'border-[#FB5601]' : 'border-stone-300'
                        }`}
                      >
                        {selected && <span className="w-2 h-2 rounded-full bg-[#FB5601]" />}
                      </span>
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-stone-900 block">
                          {variant.label}
                        </span>
                        <span className="text-xs text-stone-500 block">{variant.weight}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-base font-semibold text-stone-900 block">
                        ${variant.price.toFixed(0)}
                      </span>
                      {variant.badge && (
                        <span className="text-[11px] font-semibold text-[#D64500]">
                          {variant.badge}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Personalization — Clean Underline Inputs */}
          <div className="space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
              2. Personalize Your Label
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="corp-company"
                  className="text-xs font-medium text-stone-600 block mb-1.5"
                >
                  Company / Organization Name
                </label>
                <input
                  id="corp-company"
                  type="text"
                  maxLength={50}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Ridgefield Design Group"
                  className="w-full py-2 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#FB5601] transition"
                />
              </div>

              <div>
                <label
                  htmlFor="corp-message"
                  className="text-xs font-medium text-stone-600 block mb-1.5"
                >
                  Custom Label Message
                </label>
                <input
                  id="corp-message"
                  type="text"
                  maxLength={75}
                  value={labelMessage}
                  onChange={(e) => setLabelMessage(e.target.value)}
                  placeholder="e.g. Thank you for a wonderful year!"
                  className="w-full py-2 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#FB5601] transition"
                />
              </div>
            </div>
          </div>

          {/* Add to Bag Row */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-200">
            <div>
              <span className="text-xs text-stone-500 block">Total</span>
              <span className="font-serif text-3xl font-semibold text-stone-900">
                ${selectedVariant.price.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddToBag}
              className="py-3.5 px-8 rounded-md bg-[#FB5601] hover:bg-[#D64500] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition cursor-pointer inline-flex items-center justify-center gap-2"
            >
              {addedSuccess ? <CheckCircle2 size={16} /> : <ShoppingBag size={16} />}
              <span>
                {addedSuccess
                  ? 'Added to Bag'
                  : `Add to Bag • $${selectedVariant.price.toFixed(0)}`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom / Large Volume Inquiry — Open Hairline Section (Zero Outer Box) */}
      <section className="pt-12 border-t border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5 space-y-2.5">
          <span className="text-xs uppercase tracking-wider text-[#D64500] font-semibold block">
            Custom Orders &amp; Logo Printing
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
            Need a Custom Quote or Logo File?
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Ordering 50+ glass bottles, adding your company logo, or shipping to multiple client
            addresses? Send a quick note and we&apos;ll reply within 1 business day.
          </p>
          <p className="text-xs text-stone-500 pt-1">
            hello@singingbeehoney.com &bull; Basking Ridge, NJ
          </p>
        </div>

        <div className="lg:col-span-7">
          {inquirySubmitted ? (
            <div className="py-6 border-l-2 border-[#FB5601] pl-5 space-y-1">
              <h3 className="font-serif text-xl text-stone-900">Inquiry Received</h3>
              <p className="text-sm text-stone-600">
                Thanks, {contactName}. We&apos;ll reach out to {contactEmail} shortly with pricing
                and label proof details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your name"
                  className="py-2.5 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#FB5601]"
                />
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Work email"
                  className="py-2.5 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#FB5601]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company name"
                  className="py-2.5 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#FB5601]"
                />
                <select
                  value={estimatedQty}
                  onChange={(e) => setEstimatedQty(e.target.value)}
                  className="py-2.5 border-b border-stone-300 bg-transparent text-sm text-stone-900 focus:outline-none focus:border-[#FB5601]"
                >
                  <option value="12-24">12 – 24 glass jars/bottles</option>
                  <option value="25-49">25 – 49 glass jars/bottles</option>
                  <option value="50+">50 – 100 glass jars/bottles</option>
                  <option value="100+">100+ glass jars/bottles</option>
                </select>
              </div>

              <textarea
                rows={3}
                value={inquiryNotes}
                onChange={(e) => setInquiryNotes(e.target.value)}
                placeholder="Target delivery date, jar size (1/2 lb or 1 lb), and custom logo details..."
                className="w-full py-2.5 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#FB5601] resize-none"
              />

              <button
                type="submit"
                className="px-7 py-3 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white text-xs font-semibold uppercase tracking-wider transition inline-flex items-center gap-2 cursor-pointer"
              >
                <Send size={14} className="text-[#FB5601]" />
                <span>Send Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
