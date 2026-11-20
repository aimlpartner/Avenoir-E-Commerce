'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { getProductById, ProductVariant } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import BrandLogo from '@/components/BrandLogo';

export default function GiftingClient() {
  const { addToCart } = useCart();

  const holidayProduct = getProductById('SB-HOLIDAY-BOX')!;
  const favorProduct = getProductById('SB-FAVOR-GIFTS')!;
  const holidayGallery = holidayProduct.galleryImages || [holidayProduct.imageUrl];

  const [holidayVariant, setHolidayVariant] = useState<ProductVariant>(holidayProduct.variants[0]);
  const [activeHolidayImage, setActiveHolidayImage] = useState<string>(holidayProduct.imageUrl);
  const [holidayNote, setHolidayNote] = useState('');
  const [holidayAdded, setHolidayAdded] = useState(false);

  const [favorOccasion, setFavorOccasion] = useState<'Wedding' | 'Party' | 'Special Event'>(
    'Wedding'
  );
  const [favorVariant, setFavorVariant] = useState<ProductVariant>(favorProduct.variants[1]);
  const [favorTagText, setFavorTagText] = useState('');
  const [favorAdded, setFavorAdded] = useState(false);

  const handleSelectHolidayVariant = (v: ProductVariant) => {
    setHolidayVariant(v);
    if (v.imageUrl) {
      setActiveHolidayImage(v.imageUrl);
    }
  };

  const handleAddHoliday = () => {
    addToCart(holidayProduct, 1, holidayVariant, holidayNote);
    setHolidayAdded(true);
    setTimeout(() => setHolidayAdded(false), 2500);
  };

  const handleAddFavors = () => {
    const note = favorTagText.trim()
      ? `${favorOccasion} Favors · Tag: "${favorTagText.trim()}"`
      : `${favorOccasion} Favors`;
    addToCart(favorProduct, 1, favorVariant, note);
    setFavorAdded(true);
    setTimeout(() => setFavorAdded(false), 2500);
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
        <span className="text-stone-900 font-semibold">Gift Boxes &amp; Favors</span>
      </nav>

      {/* Open Header */}
      <div className="pb-8 border-b border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-[#5B8E33] uppercase block mb-1.5">
            Seasonal Boxes &amp; Celebrations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Holiday Boxes &amp; Favor Gifts
          </h1>
          <p className="text-sm sm:text-base text-stone-500 font-serif mt-2 max-w-xl">
            Gift-ready raw wildflower honey from Basking Ridge for holidays, weddings, parties, and
            family celebrations.
          </p>
        </div>
        <BrandLogo variant="seal" className="self-start sm:self-end" />
      </div>

      {/* Section 1: Holiday Special Gift Box — Open 2-Column Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-5 space-y-3">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FDF9E4]">
            <Image
              src={activeHolidayImage}
              alt={holidayProduct.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {holidayGallery.map((src, idx) => {
              const isSelected = activeHolidayImage === src;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveHolidayImage(src)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                    isSelected
                      ? 'border-[#8B6FE0]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Holiday edition photo ${idx + 1}`}
                >
                  <Image src={src} alt="" fill sizes="96px" className="object-cover" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#5B8E33] font-semibold block">
              Holiday Special
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-stone-900">
              {holidayProduct.name}
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed max-w-xl">
              {holidayProduct.description}
            </p>
          </div>

          {/* Clean Hairline Edition List */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
              Choose Holiday Edition
            </span>
            <div className="divide-y divide-stone-200 border-y border-stone-200">
              {holidayProduct.variants.map((v) => {
                const selected = holidayVariant.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleSelectHolidayVariant(v)}
                    className={`w-full py-3.5 px-2 text-left transition cursor-pointer flex items-center justify-between gap-4 ${
                      selected ? 'bg-[#F5F1FD]' : 'hover:bg-[#FDF9E4]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selected ? 'border-[#8B6FE0]' : 'border-stone-300'
                        }`}
                      >
                        {selected && <span className="w-2 h-2 rounded-full bg-[#8B6FE0]" />}
                      </span>
                      <span className="text-sm font-medium text-stone-900">{v.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-stone-900 shrink-0">
                      ${v.price.toFixed(0)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Underline Gift Note */}
          <div>
            <label
              htmlFor="holiday-gift-note"
              className="text-xs font-medium text-stone-600 block mb-1.5"
            >
              Gift Card Message (Optional)
            </label>
            <input
              id="holiday-gift-note"
              type="text"
              maxLength={90}
              value={holidayNote}
              onChange={(e) => setHolidayNote(e.target.value)}
              placeholder="e.g. Happy Holidays from the Miller family!"
              className="w-full py-2 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#8B6FE0]"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-serif text-3xl font-semibold text-stone-900">
                ${holidayVariant.price.toFixed(2)}
              </span>
              <span className="text-xs text-stone-500 block">{holidayVariant.weight}</span>
            </div>
            <button
              type="button"
              onClick={handleAddHoliday}
              className="py-3.5 px-8 rounded-md bg-[#8B6FE0] hover:bg-[#7A5CD6] text-white font-semibold text-xs uppercase tracking-wider transition cursor-pointer inline-flex items-center justify-center gap-2"
            >
              {holidayAdded ? <CheckCircle2 size={16} /> : <ShoppingBag size={16} />}
              <span>{holidayAdded ? 'Added to Bag' : 'Add Gift Box to Bag'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Favor Gifts — Open 2-Column Layout separated by Hairline */}
      <section className="pt-14 border-t border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-5">
          <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-[#FDF9E4]">
            <Image
              src={favorProduct.imageUrl}
              alt={favorProduct.name}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#5B8E33] font-semibold block">
              Wedding &bull; Party &bull; Events
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-stone-900">
              {favorProduct.name}
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed max-w-xl">
              {favorProduct.description}
            </p>
          </div>

          {/* Occasion Tabs */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
              Occasion
            </span>
            <div className="flex flex-wrap gap-2">
              {(['Wedding', 'Party', 'Special Event'] as const).map((occ) => (
                <button
                  key={occ}
                  type="button"
                  onClick={() => setFavorOccasion(occ)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                    favorOccasion === occ
                      ? 'bg-[#8B6FE0] text-white'
                      : 'bg-[#F5F1FD] text-stone-700 hover:bg-[#EAE2FB] hover:text-[#6E52C4]'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Pack Size — Clean Hairline Radio List */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
              Pack Quantity
            </span>
            <div className="divide-y divide-stone-200 border-y border-stone-200">
              {favorProduct.variants.map((v) => {
                const selected = favorVariant.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setFavorVariant(v)}
                    className={`w-full py-3.5 px-2 text-left transition cursor-pointer flex items-center justify-between gap-4 ${
                      selected ? 'bg-[#F5F1FD]' : 'hover:bg-[#FDF9E4]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selected ? 'border-[#8B6FE0]' : 'border-stone-300'
                        }`}
                      >
                        {selected && <span className="w-2 h-2 rounded-full bg-[#8B6FE0]" />}
                      </span>
                      <span className="text-sm font-medium text-stone-900">{v.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-stone-900 shrink-0">
                      ${v.price.toFixed(0)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Tag Underline Input */}
          <div>
            <label
              htmlFor="favor-tag-text"
              className="text-xs font-medium text-stone-600 block mb-1.5"
            >
              Custom Tag Text (Optional)
            </label>
            <input
              id="favor-tag-text"
              type="text"
              maxLength={80}
              value={favorTagText}
              onChange={(e) => setFavorTagText(e.target.value)}
              placeholder="e.g. Sweetest Thank You · Maya & Daniel · June 14"
              className="w-full py-2 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#8B6FE0]"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-serif text-3xl font-semibold text-stone-900">
                ${favorVariant.price.toFixed(2)}
              </span>
              <span className="text-xs text-stone-500 block">{favorVariant.weight}</span>
            </div>
            <button
              type="button"
              onClick={handleAddFavors}
              className="py-3.5 px-8 rounded-md bg-[#8B6FE0] hover:bg-[#7A5CD6] text-white font-semibold text-xs uppercase tracking-wider transition cursor-pointer inline-flex items-center justify-center gap-2"
            >
              {favorAdded ? <CheckCircle2 size={16} /> : <ShoppingBag size={16} />}
              <span>{favorAdded ? 'Added to Bag' : 'Add Favor Pack to Bag'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Corporate Callout — Simple Hairline Footer Row */}
      <section className="pt-12 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5B8E33] block">
            Business &amp; Client Gifting
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
            Personalized Corporate Glass Bottles &amp; Jars
          </h3>
          <p className="text-sm text-stone-500 font-serif max-w-xl">
            Add your company name and thank-you message to our clear glass honey jars and bottles.
          </p>
        </div>

        <Link
          href="/corporate"
          prefetch={true}
          className="px-6 py-3 rounded-md bg-[#8B6FE0] hover:bg-[#7A5CD6] text-white text-xs font-semibold uppercase tracking-wider transition shrink-0 inline-flex items-center gap-2"
        >
          <span>Corporate Gifting</span>
          <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}
