'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plus,
  Minus,
  ShoppingBag,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { ProductItem, ProductVariant } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

interface ProductDetailClientProps {
  product: ProductItem;
  relatedProducts: ProductItem[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [activeImage, setActiveImage] = useState<string>(
    product.variants[0]?.imageUrl || product.imageUrl
  );
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const gallery =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.imageUrl];

  const unitPrice = selectedVariant.price;
  const lineTotal = unitPrice * quantity;

  const handleSelectVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    if (variant.imageUrl) {
      setActiveImage(variant.imageUrl);
    }
  };

  const handleAdd = () => {
    addToCart(product, quantity, selectedVariant, customNote);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-14">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
        <Link href="/" prefetch={true} className="hover:text-stone-900 transition">
          Home
        </Link>
        <ChevronRight size={12} />
        <Link href="/shop" prefetch={true} className="hover:text-stone-900 transition font-medium">
          Shop
        </Link>
        <ChevronRight size={12} />
        <span className="text-stone-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main 2-Column Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 text-left">
        {/* Left: Real Product Photography + Thumbnails */}
        <div className="lg:col-span-6 space-y-3">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF7F2]">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover ${
                activeImage === product.imageUrl
                  ? product.imagePosition || 'object-center'
                  : 'object-center'
              }`}
            />
          </div>

          {gallery.length > 1 && (
            <div className="flex items-center gap-3">
              {gallery.map((src) => {
                const isSelected = activeImage === src;
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(src)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition cursor-pointer bg-[#FAF7F2] ${
                      isSelected
                        ? 'border-[#FB5601]'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={src} alt={product.name} fill sizes="80px" className="object-cover" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Clean Unboxed Options & Purchase */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-1.5">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-stone-500 font-serif">{product.subtitle}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2.5 pb-4 border-b border-stone-200">
            <span className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900">
              ${unitPrice.toFixed(2)}
            </span>
            {product.isSubscription && (
              <span className="text-sm font-medium text-[#D64500]">/ month</span>
            )}
            <span className="text-xs text-stone-500 ml-1">&bull; {selectedVariant.weight}</span>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed">{product.description}</p>

          {/* Clean Hairline Option Selector (No Heavy Card Boxes) */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
              {product.id === 'SB-HOLIDAY-BOX'
                ? 'Select Holiday Edition'
                : product.isSubscription
                ? 'Select Monthly Plan'
                : 'Select Option'}
            </span>
            <div className="divide-y divide-stone-200 border-y border-stone-200">
              {product.variants.map((variant) => {
                const isSelected = selectedVariant.id === variant.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => handleSelectVariant(variant)}
                    className={`w-full py-3.5 px-2 text-left transition cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected ? 'bg-[#FFF8F3]' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#FB5601]' : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-[#FB5601]" />}
                      </span>
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-stone-900 block">
                          {variant.label}
                        </span>
                        {variant.badge && (
                          <span className="text-[11px] font-semibold text-[#D64500] block">
                            {variant.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-stone-900 shrink-0">
                      ${variant.price.toFixed(0)}
                      {product.isSubscription ? '/mo' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Custom Note — Clean Underline Input */}
          {product.allowsCustomNote && (
            <div>
              <label
                htmlFor="product-custom-note"
                className="text-xs font-medium text-stone-600 block mb-1.5"
              >
                {product.customNoteLabel || 'Personalization (Optional)'}
              </label>
              <input
                id="product-custom-note"
                type="text"
                maxLength={90}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder={product.customNotePlaceholder || 'Add your custom text...'}
                className="w-full py-2 border-b border-stone-300 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#FB5601]"
              />
            </div>
          )}

          {/* Quantity & Add to Bag */}
          <div className="pt-1 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center justify-between border border-stone-300 rounded-md px-2 sm:w-32 h-12">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-950 transition cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="font-semibold text-sm text-stone-900 px-2">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-950 transition cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-3.5 px-6 rounded-md bg-[#FB5601] hover:bg-[#D64500] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 min-h-[48px]"
              >
                {product.isSubscription ? <RefreshCw size={16} /> : <ShoppingBag size={16} />}
                <span>
                  {addedSuccess
                    ? 'Added to Bag!'
                    : product.isSubscription
                    ? `Subscribe • $${lineTotal.toFixed(2)}/mo`
                    : `Add to Bag • $${lineTotal.toFixed(2)}`}
                </span>
              </button>
            </div>

            {addedSuccess && (
              <p className="text-xs font-semibold text-[#D64500] flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>Added to your shopping bag.</span>
              </p>
            )}

            {product.id === 'SB-CORPORATE-GLASS' && (
              <p className="text-xs text-stone-500">
                Need 50+ personalized glass jars or custom logo printing?{' '}
                <Link href="/corporate" className="text-[#D64500] font-semibold hover:underline">
                  Corporate Order Page &rarr;
                </Link>
              </p>
            )}
          </div>

          {/* Details */}
          <ul className="pt-5 border-t border-stone-200 space-y-2 text-xs sm:text-sm text-stone-600">
            {product.details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#D64500] shrink-0 mt-0.5" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* More Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 text-left pt-6 border-t border-stone-200">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
              More from Singing Bee
            </h2>
            <Link
              href="/shop"
              prefetch={true}
              className="text-xs font-semibold text-stone-700 hover:text-[#D64500] flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
