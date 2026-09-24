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
  Award,
  Leaf,
  MapPin,
  Gift,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { PRODUCTS, ProductItem } from '@/lib/products';
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
  const [faqOpen, setFaqOpen] = useState(false);
  const [addedAddonId, setAddedAddonId] = useState<string | null>(null);

  const isHoney = product.department === 'honey';

  const pairWellWithProducts = PRODUCTS.filter(
    (p) => ['AV-JAR-MINI', 'AV-ACC-WAND', 'AV-CANDLE-TAPER'].includes(p.id) && p.id !== product.id
  ).slice(0, 3);

  const handleAdd = () => {
    addToCart(product, quantity, selectedFinish || undefined, customInscription || undefined);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const handleAddAddon = (item: ProductItem) => {
    addToCart(item, 1);
    setAddedAddonId(item.id);
    setTimeout(() => setAddedAddonId(null), 2000);
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
        <span className="text-stone-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Section: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 text-left">
        
        {/* Left: Product Image Stage */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-stone-100 border border-stone-200/90 shadow-xs">
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
                <span className="bg-stone-900 text-[#E8D7B5] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs shadow-xs">
                  {product.badge}
                </span>
              )}
              <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-xs ${
                isHoney ? 'bg-white text-stone-900 border border-stone-200 shadow-2xs' : 'bg-stone-100 text-stone-900 border border-stone-200'
              }`}>
                {isHoney ? 'New Jersey Honey' : 'Professional Apiary Supply'}
              </span>
            </div>

            {/* Stock status */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xs text-xs font-semibold text-stone-900 flex items-center gap-2 shadow-xs border border-stone-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15231A]"></span>
              <span>In Stock &bull; Ready for Courier Dispatch</span>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-2">
            <div className="p-2 sm:p-2.5 rounded-md bg-white border border-stone-200/90 text-center space-y-0.5 shadow-2xs">
              <Truck size={15} className="mx-auto text-[#8C6B28]" />
              <span className="text-[10px] sm:text-[11px] font-bold text-stone-800 block truncate">Express Dispatch</span>
              <p className="text-[9px] sm:text-[10px] text-stone-500">Free over $60</p>
            </div>
            <div className="p-2 sm:p-2.5 rounded-md bg-white border border-stone-200/90 text-center space-y-0.5 shadow-2xs">
              <MapPin size={15} className="mx-auto text-[#8C6B28]" />
              <span className="text-[10px] sm:text-[11px] font-bold text-stone-800 block truncate">Local Pickup</span>
              <p className="text-[9px] sm:text-[10px] text-stone-500">Sussex County, NJ</p>
            </div>
            <div className="p-2 sm:p-2.5 rounded-md bg-white border border-stone-200/90 text-center space-y-0.5 shadow-2xs">
              <ShieldCheck size={15} className="mx-auto text-[#8C6B28]" />
              <span className="text-[10px] sm:text-[11px] font-bold text-stone-800 block truncate">Traceable QR</span>
              <p className="text-[9px] sm:text-[10px] text-stone-500">Hive Passport</p>
            </div>
            <div className="p-2 sm:p-2.5 rounded-md bg-white border border-stone-200/90 text-center space-y-0.5 shadow-2xs">
              <RotateCcw size={15} className="mx-auto text-[#8C6B28]" />
              <span className="text-[10px] sm:text-[11px] font-bold text-stone-800 block truncate">Guarantee</span>
              <p className="text-[9px] sm:text-[10px] text-stone-500">30-Day Policy</p>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Rating & SKU */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
              <div className="flex items-center gap-1 text-[#C5A265] font-bold">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-[#C5A265] text-[#C5A265]" />
                  ))}
                </div>
                <span className="text-stone-800 font-extrabold ml-1">{product.rating}</span>
                <span className="text-stone-400 text-[11px]">({product.reviewsCount} verified)</span>
              </div>
              {product.sku && (
                <span className="font-mono text-[10px] sm:text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-xs border border-stone-200">
                  SKU: {product.sku}
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#8C6B28] uppercase block">
                  {product.subtitle}
                </span>
                {isHoney && (
                  <span className="text-[10px] sm:text-[11px] font-mono font-medium text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-xs border border-stone-200">
                    Harvested from our New Jersey hives &bull; Sussex &amp; Morris Counties
                  </span>
                )}
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              {isHoney && (
                <div className="text-xs font-medium text-stone-800 bg-stone-50 p-3 rounded-md border border-stone-200 flex items-start gap-2">
                  <Leaf size={15} className="text-[#8C6B28] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Honest Process:</strong> Raw &amp; unfiltered &mdash; bottled unheated to protect natural live enzymes, wild pollen, and microclimate floral aromatics.
                  </p>
                </div>
              )}
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 pt-1 pb-2 border-b border-stone-200">
              <span className="text-2xl sm:text-4xl font-extrabold text-stone-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-[11px] sm:text-xs text-stone-500">
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
                <span className="text-xs font-bold text-stone-700 block">
                  Select Artisan Finish: <strong className="text-stone-900">{selectedFinish}</strong>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.finishes.map((finish) => (
                    <button
                      key={finish}
                      type="button"
                      onClick={() => setSelectedFinish(finish)}
                      className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                        selectedFinish === finish
                          ? 'bg-[#15231A] text-white shadow-2xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
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
                <label htmlFor="custom-inscription" className="text-xs font-bold text-stone-700 block flex items-center justify-between">
                  <span>Optional Brass Lid Inscription / Gift Note:</span>
                  <span className="text-[10px] text-stone-400 font-normal">Complimentary</span>
                </label>
                <input
                  id="custom-inscription"
                  type="text"
                  maxLength={60}
                  value={customInscription}
                  onChange={(e) => setCustomInscription(e.target.value)}
                  placeholder="e.g. For Henry & Catherine — Happy Anniversary"
                  className="w-full px-3.5 py-2.5 rounded-md bg-stone-50 border border-stone-300 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-800"
                />
              </div>
            )}

            {/* Quantity Selector & Add to Bag Button */}
            <div className="pt-3 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                
                {/* Quantity Control */}
                <div className="flex items-center justify-between border border-stone-300 rounded-md bg-stone-50 px-3 py-1 sm:w-36 h-12">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-9 h-9 rounded-md flex items-center justify-center text-stone-600 hover:text-stone-950 hover:bg-stone-200/60 transition cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="font-bold text-sm text-stone-900 px-2">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-9 h-9 rounded-md flex items-center justify-center text-stone-600 hover:text-stone-950 hover:bg-stone-200/60 transition cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-6 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-2xs active:scale-98 min-h-[48px]"
                >
                  <ShoppingBag size={16} className="text-[#C5A265]" />
                  <span>{addedSuccess ? 'Added to Bag!' : `Add to Bag • $${(product.price * quantity).toFixed(2)}`}</span>
                </button>
              </div>

              {addedSuccess && (
                <div className="p-3 bg-[#142118] text-stone-200 border border-[#223528] rounded-md text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#C5A265] shrink-0" />
                  <span>Item added to your shopping bag! Cart drawer is open.</span>
                </div>
              )}

              {/* Shipping & Gifting Dispatch Notices */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-md border border-stone-200/80">
                  <Gift size={14} className="text-[#8C6B28] shrink-0" />
                  <span>Complimentary gift wrapping &amp; handwritten note included at checkout. &ldquo;A sweeter way to say thank you.&rdquo;</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-stone-800 bg-stone-50 p-2.5 rounded-md border border-stone-200/80">
                  <Truck size={14} className="text-[#8C6B28] shrink-0" />
                  <span><strong>Holiday Gift Notice:</strong> Order by Dec 18 for guaranteed delivery by Dec 24. Local pickup available through Dec 23.</span>
                </div>
              </div>
            </div>

            {/* Pairs Well With Section */}
            {pairWellWithProducts.length > 0 && (
              <div className="pt-5 border-t border-stone-200 space-y-2.5">
                <span className="text-xs uppercase tracking-wider font-bold text-stone-800 block">
                  Pairs Well With
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {pairWellWithProducts.map((addon) => (
                    <div
                      key={addon.id}
                      className="p-2.5 rounded-md border border-stone-200/90 bg-white hover:border-stone-300 transition flex flex-col justify-between gap-2 shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-stone-100 shrink-0">
                          <Image
                            src={addon.imageUrl}
                            alt={addon.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-stone-900 truncate">{addon.name}</h4>
                          <span className="text-[11px] text-stone-500 font-semibold">${addon.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddAddon(addon)}
                        className="w-full py-1 px-2 rounded-md bg-stone-100 hover:bg-[#15231A] hover:text-white text-stone-800 text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {addedAddonId === addon.id ? (
                          <>
                            <CheckCircle2 size={12} className="text-[#C5A265]" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus size={12} />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Specifications List */}
            <div className="pt-5 border-t border-stone-200 space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-stone-800 block">
                Harvest &amp; Product Details
              </span>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-[#8C6B28] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
                {product.materials && (
                  <li className="flex items-start gap-2">
                    <Layers size={14} className="text-[#8C6B28] shrink-0 mt-0.5" />
                    <span><strong>Craft Materials:</strong> {product.materials}</span>
                  </li>
                )}
                {product.weight && (
                  <li className="flex items-start gap-2">
                    <Sparkles size={14} className="text-[#8C6B28] shrink-0 mt-0.5" />
                    <span><strong>Weight:</strong> {product.weight}</span>
                  </li>
                )}
                {product.dimensions && (
                  <li className="flex items-start gap-2">
                    <Award size={14} className="text-[#8C6B28] shrink-0 mt-0.5" />
                    <span><strong>Dimensions:</strong> {product.dimensions}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Crystallization FAQ (Honey Products) */}
            {isHoney && (
              <div className="pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setFaqOpen(!faqOpen)}
                  className="w-full flex items-center justify-between text-left p-3 rounded-md bg-stone-50 hover:bg-stone-100 border border-stone-200 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle size={15} className="text-[#8C6B28] shrink-0" />
                    <span className="text-xs font-bold text-stone-900">
                      Why does real honey crystallize?
                    </span>
                  </div>
                  <ChevronDown
                    size={15}
                    className={`text-[#8C6B28] transition-transform duration-200 ${
                      faqOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {faqOpen && (
                  <div className="p-3.5 mt-2 rounded-md bg-white border border-stone-200 text-xs text-stone-700 leading-relaxed space-y-2 animate-in fade-in duration-200">
                    <p>
                      Crystallization is completely natural and a hallmark of raw, unprocessed honey. It proves the honey has never been micro-filtered or superheated, leaving natural glucose, beneficial live enzymes, and wild flower pollen 100% intact.
                    </p>
                    <p className="text-stone-600 font-medium">
                      <strong>To return it to liquid:</strong> Gently place the glass jar in a warm water bath (under 100&deg;F) for a few minutes. Never microwave, as high heat destroys fragile enzymes.
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Verified Reviews Section */}
      <section className="bg-white rounded-lg p-8 sm:p-12 border border-stone-200 shadow-2xs text-left space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Verified Client Reviews
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Feedback from verified collectors, gift recipients, and certified apiarists.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="font-serif text-3xl font-extrabold text-stone-900 block leading-none">
                {product.rating}
              </span>
              <span className="text-[10px] text-stone-400">out of 5 stars</span>
            </div>
            <div className="flex text-[#C5A265]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-[#C5A265]" />
              ))}
            </div>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-md bg-stone-50 border border-stone-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex text-[#C5A265]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-[#C5A265]" />
                ))}
              </div>
              <span className="text-[10px] text-stone-400">3 days ago</span>
            </div>
            <p className="text-xs text-stone-700 italic leading-relaxed">
              &quot;The wildflower honey has completely spoiled store-bought honey for me. You can actually taste the season.&quot;
            </p>
            <div className="flex items-center gap-2 pt-1 border-t border-stone-200/60">
              <span className="text-xs font-bold text-stone-800">Eleanor V.</span>
              <span className="text-[10px] text-[#8C6B28] uppercase tracking-wider font-semibold">Verified Buyer</span>
            </div>
          </div>

          <div className="p-5 rounded-md bg-stone-50 border border-stone-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex text-[#C5A265]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-[#C5A265]" />
                ))}
              </div>
              <span className="text-[10px] text-stone-400">2 weeks ago</span>
            </div>
            <p className="text-xs text-stone-700 italic leading-relaxed">
              &quot;Received this as an executive holiday gift from a partner firm. Hands-down the most tasteful, memorable presentation I have ever unboxed.&quot;
            </p>
            <div className="flex items-center gap-2 pt-1 border-t border-stone-200/60">
              <span className="text-xs font-bold text-stone-800">Marcus Thorne</span>
              <span className="text-[10px] text-[#8C6B28] uppercase tracking-wider font-semibold">Verified Corporate</span>
            </div>
          </div>

          <div className="p-5 rounded-md bg-stone-50 border border-stone-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex text-[#C5A265]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-[#C5A265]" />
                ))}
              </div>
              <span className="text-[10px] text-stone-400">1 month ago</span>
            </div>
            <p className="text-xs text-stone-700 italic leading-relaxed">
              &quot;Precision build and top tier materials. Whether in the kitchen or out in the apiary yard, the quality holds up flawlessly.&quot;
            </p>
            <div className="flex items-center gap-2 pt-1 border-t border-stone-200/60">
              <span className="text-xs font-bold text-stone-800">Dr. Julian Hayes</span>
              <span className="text-[10px] text-[#8C6B28] uppercase tracking-wider font-semibold">Master Apiarist</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 text-left">
          <div className="flex items-end justify-between border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs font-bold text-[#8C6B28] uppercase tracking-wider block mb-1">
                More from {isHoney ? 'The Honey Reserve' : 'The Apiary Shop'}
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                You May Also Admire
              </h3>
            </div>
            <Link
              href={isHoney ? "/honey" : "/beekeeping"}
              prefetch={true}
              className="text-xs font-bold text-stone-900 hover:text-stone-700 flex items-center gap-1"
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
