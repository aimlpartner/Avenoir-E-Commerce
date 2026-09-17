'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  Droplets,
  Shield,
  Layers,
  Award
} from 'lucide-react';
import { ProductItem } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

interface ProductDetailClientProps {
  product: ProductItem;
  relatedProducts: ProductItem[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedFinish, setSelectedFinish] = useState<string>(
    product.finishes && product.finishes.length > 0 ? product.finishes[0] : ''
  );
  const [customInscription, setCustomInscription] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isHoney = product.department === 'honey';

  const handleAdd = () => {
    addToCart(product, quantity, selectedFinish || undefined, customInscription || undefined);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-12">
      
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <Link href="/" prefetch={true} className="hover:text-emerald-900 transition">Home</Link>
        <ChevronRight size={12} />
        <Link 
          href={isHoney ? "/honey" : "/beekeeping"} 
          prefetch={true}
          className="hover:text-emerald-900 transition font-medium"
        >
          {isHoney ? "Honey Products" : "Beekeeping Gear"}
        </Link>
        <ChevronRight size={12} />
        <span className="text-emerald-950 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Section: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 text-left">
        
        {/* Left: Product Image Stage */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
              {product.badge && (
                <span className="bg-emerald-950 text-amber-300 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-xs">
                  {product.badge}
                </span>
              )}
              <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm ${
                isHoney ? 'bg-amber-100 text-amber-950 border border-amber-300/70' : 'bg-emerald-100 text-emerald-950 border border-emerald-300/70'
              }`}>
                {isHoney ? 'New Jersey Honey' : 'Professional Apiary Supply'}
              </span>
            </div>

            {/* Stock status */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-sm text-xs font-semibold text-emerald-900 flex items-center gap-2 shadow-xs border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>In Stock &bull; Ready for Courier Dispatch</span>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
            <div className="p-2 sm:p-3 rounded-xl bg-white border border-slate-200 text-center space-y-0.5 sm:space-y-1">
              <Truck size={16} className="mx-auto text-emerald-700" />
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 block truncate">Express Dispatch</span>
              <p className="text-[9px] sm:text-[10px] text-slate-500">Free over $60</p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-white border border-slate-200 text-center space-y-0.5 sm:space-y-1">
              <ShieldCheck size={16} className="mx-auto text-emerald-700" />
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 block truncate">New Jersey Hives</span>
              <p className="text-[9px] sm:text-[10px] text-slate-500">Traceable Batch</p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-white border border-slate-200 text-center space-y-0.5 sm:space-y-1">
              <RotateCcw size={16} className="mx-auto text-emerald-700" />
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 block truncate">Guarantee</span>
              <p className="text-[9px] sm:text-[10px] text-slate-500">30-Day Policy</p>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Rating & SKU */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-slate-800 font-extrabold ml-1">{product.rating}</span>
                <span className="text-slate-400 text-[11px]">({product.reviewsCount} verified)</span>
              </div>
              {product.sku && (
                <span className="font-mono text-[10px] sm:text-[11px] bg-slate-100 px-2 py-0.5 rounded-md">
                  SKU: {product.sku}
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div>
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-emerald-800 uppercase block mb-1">
                {product.subtitle}
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 pt-1 pb-2 border-b border-slate-200">
              <span className="text-2xl sm:text-4xl font-extrabold text-emerald-950">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500">
                Taxes included. Hand-inspected in Sussex County.
              </span>
            </div>

            {/* Description & Long Description */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {product.longDescription || product.description}
            </p>

            {/* Finishes Selector (If Applicable) */}
            {product.finishes && product.finishes.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-slate-700 block">
                  Select Artisan Finish: <strong className="text-emerald-950">{selectedFinish}</strong>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.finishes.map((finish) => (
                    <button
                      key={finish}
                      type="button"
                      onClick={() => setSelectedFinish(finish)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        selectedFinish === finish
                          ? 'bg-emerald-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Engraving / Gifting Note (For Vaults or Jars) */}
            {isHoney && (
              <div className="space-y-1.5 pt-1">
                <label htmlFor="custom-inscription" className="text-xs font-bold text-slate-700 block flex items-center justify-between">
                  <span>Optional Brass Lid Inscription / Gift Note:</span>
                  <span className="text-[10px] text-slate-400 font-normal">Complimentary</span>
                </label>
                <input
                  id="custom-inscription"
                  type="text"
                  maxLength={60}
                  value={customInscription}
                  onChange={(e) => setCustomInscription(e.target.value)}
                  placeholder="e.g. For Henry & Catherine — Happy Anniversary"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/30"
                />
              </div>
            )}

            {/* Quantity Selector & Add to Bag Button */}
            <div className="pt-3 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                
                {/* Quantity Control */}
                <div className="flex items-center justify-between border border-slate-200 rounded-xl bg-slate-50 px-3 py-1 sm:w-36 h-12">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-950 hover:bg-slate-200/60 transition cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="font-bold text-sm text-slate-900 px-2">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-950 hover:bg-slate-200/60 transition cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-6 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-sm active:scale-98 min-h-[48px]"
                >
                  <ShoppingBag size={16} className="text-amber-400" />
                  <span>{addedSuccess ? 'Added to Bag!' : `Add to Bag • $${(product.price * quantity).toFixed(2)}`}</span>
                </button>
              </div>

              {addedSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-2xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                  <span>Item added to your shopping bag! Cart drawer is open.</span>
                </div>
              )}
            </div>

            {/* Product Specifications List */}
            <div className="pt-6 border-t border-slate-200 space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-800 block">
                Harvest &amp; Product Details
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
                {product.materials && (
                  <li className="flex items-start gap-2">
                    <Layers size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Craft Materials:</strong> {product.materials}</span>
                  </li>
                )}
                {product.weight && (
                  <li className="flex items-start gap-2">
                    <Sparkles size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Weight:</strong> {product.weight}</span>
                  </li>
                )}
                {product.dimensions && (
                  <li className="flex items-start gap-2">
                    <Award size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Dimensions:</strong> {product.dimensions}</span>
                  </li>
                )}
              </ul>
            </div>

          </div>
        </div>

      </div>

      {/* Verified Reviews Section */}
      <section className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-xs text-left space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Verified Client Reviews
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Feedback from verified collectors, gift recipients, and certified apiarists.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="font-serif text-3xl font-extrabold text-slate-900 block leading-none">
                {product.rating}
              </span>
              <span className="text-[10px] text-slate-400">out of 5 stars</span>
            </div>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-amber-400" />
              ))}
            </div>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-slate-400">3 days ago</span>
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              &quot;The wildflower honey has completely spoiled store-bought honey for me. You can actually taste the season.&quot;
            </p>
            <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
              <span className="text-xs font-bold text-slate-800">Eleanor V.</span>
              <span className="text-[10px] text-emerald-800 uppercase tracking-wider font-semibold">Verified Buyer</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-slate-400">2 weeks ago</span>
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              &quot;Received this as an executive holiday gift from a partner firm. Hands-down the most tasteful, memorable presentation I have ever unboxed.&quot;
            </p>
            <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
              <span className="text-xs font-bold text-slate-800">Marcus Thorne</span>
              <span className="text-[10px] text-emerald-800 uppercase tracking-wider font-semibold">Verified Corporate</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-slate-400">1 month ago</span>
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              &quot;Precision build and top tier materials. Whether in the kitchen or out in the apiary yard, the quality holds up flawlessly.&quot;
            </p>
            <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
              <span className="text-xs font-bold text-slate-800">Dr. Julian Hayes</span>
              <span className="text-[10px] text-emerald-800 uppercase tracking-wider font-semibold">Master Apiarist</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 text-left">
          <div className="flex items-end justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                More from {isHoney ? 'The Honey Reserve' : 'The Apiary Shop'}
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                You May Also Admire
              </h3>
            </div>
            <Link
              href={isHoney ? "/honey" : "/beekeeping"}
              prefetch={true}
              className="text-xs font-bold text-emerald-900 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>View All {isHoney ? 'Honey' : 'Beekeeping'}</span>
              <ChevronRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
