'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  GIFT_BOX_TIERS, 
  GiftBoxTier, 
  BOX_FLAVORS, 
  BoxFlavorItem, 
  PACKAGING_OPTIONS, 
  PackagingOption, 
  CuratedBundle, 
  CURATED_BUNDLES 
} from '@/lib/products';
import { useCart } from '@/context/CartContext';
import BoxTierSelector from '@/components/gifting/BoxTierSelector';
import FlavorSelectorGrid from '@/components/gifting/FlavorSelectorGrid';
import VisualBoxDrawer from '@/components/gifting/VisualBoxDrawer';
import CuratedBundlesSection from '@/components/gifting/CuratedBundlesSection';
import { 
  Gift, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Truck, 
  Sliders, 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle,
  Feather
} from 'lucide-react';
import { motion } from 'motion/react';

export default function GiftingClient() {
  const { addBundleToCart } = useCart();

  // Tab State: 'custom' or 'curated'
  const [activeTab, setActiveTab] = useState<'custom' | 'curated'>('custom');

  // Custom Box Builder State
  const [selectedTier, setSelectedTier] = useState<GiftBoxTier>(GIFT_BOX_TIERS[1]); // Default 6-pack
  const [selectedItems, setSelectedItems] = useState<BoxFlavorItem[]>([
    BOX_FLAVORS[0], // Wildflower
    BOX_FLAVORS[1], // High Skylands
    BOX_FLAVORS[2]  // Bourbon Vanilla
  ]);
  const [packaging, setPackaging] = useState<PackagingOption>(PACKAGING_OPTIONS[0]);
  const [giftRecipient, setGiftRecipient] = useState<string>('');
  const [giftSender, setGiftSender] = useState<string>('');
  const [giftMessage, setGiftMessage] = useState<string>('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const builderRef = useRef<HTMLDivElement>(null);

  // Sync selectedItems when tier is changed to smaller capacity
  const handleSelectTier = (tier: GiftBoxTier) => {
    setSelectedTier(tier);
    if (selectedItems.length > tier.capacity) {
      setSelectedItems(selectedItems.slice(0, tier.capacity));
    }
  };

  const handleAddItem = (item: BoxFlavorItem) => {
    if (selectedItems.length < selectedTier.capacity) {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setSelectedItems([]);
  };

  const handleSaveGiftNote = (recipient: string, sender: string, message: string) => {
    setGiftRecipient(recipient);
    setGiftSender(sender);
    setGiftMessage(message);
  };

  // Add Custom Box to Cart
  const handleAddCustomBoxToCart = () => {
    const finalPrice = selectedTier.bundlePrice + packaging.priceDelta;
    const manifest = selectedItems.map((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl
    }));

    const noteText = giftMessage
      ? `To: ${giftRecipient || 'Recipient'} | From: ${giftSender || 'Sender'} | "${giftMessage}"`
      : undefined;

    addBundleToCart({
      name: `Custom ${selectedTier.name}`,
      tier: selectedTier.name,
      price: finalPrice,
      imageUrl: packaging.imageUrl,
      items: manifest,
      packagingStyle: packaging.name,
      customNote: noteText
    });

    setToastMessage(`Added Custom ${selectedTier.name} to your shopping bag!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Quick Add Curated Bundle
  const handleQuickAddBundle = (bundle: CuratedBundle) => {
    const bundleFlavors = bundle.itemIds
      .map((id) => BOX_FLAVORS.find((f) => f.id === id))
      .filter(Boolean) as BoxFlavorItem[];

    const manifest = bundleFlavors.map((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl
    }));

    addBundleToCart({
      bundleId: bundle.id,
      name: bundle.name,
      tier: bundle.tierLabel,
      price: bundle.price,
      imageUrl: bundle.imageUrl,
      items: manifest,
      packagingStyle: 'Signature Linen Presentation Box',
      customNote: 'Curated Artisan Pairing'
    });

    setToastMessage(`Added ${bundle.name} to your shopping bag!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Customize Curated Bundle (Loads items into custom builder)
  const handleCustomizeBundle = (bundle: CuratedBundle) => {
    // 1. Find matching tier
    const matchedTier =
      GIFT_BOX_TIERS.find((t) => t.id === bundle.tierId) || GIFT_BOX_TIERS[1];
    setSelectedTier(matchedTier);

    // 2. Resolve items
    const bundleFlavors = bundle.itemIds
      .map((id) => BOX_FLAVORS.find((f) => f.id === id))
      .filter(Boolean) as BoxFlavorItem[];
    setSelectedItems(bundleFlavors);

    // 3. Switch tab and scroll to builder
    setActiveTab('custom');
    if (builderRef.current) {
      builderRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    setToastMessage(`Loaded "${bundle.name}" into your custom box builder. Swap any flavors you wish!`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-8 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-emerald-950 text-white border border-amber-400 shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={18} className="text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" prefetch={true} className="hover:text-emerald-900 transition">Home</Link>
        <ChevronRight size={12} />
        <Link href="/shop" prefetch={true} className="hover:text-emerald-900 transition">Shop</Link>
        <ChevronRight size={12} />
        <span className="text-emerald-950 font-bold">Build Your Own Box &amp; Gifting</span>
      </nav>

      {/* Contained Luxury Hero Banner */}
      <div className="rounded-3xl p-6 sm:p-10 lg:p-12 border border-emerald-900/60 relative overflow-hidden shadow-md text-left bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none select-none" />
        
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/90 border border-amber-400/40 text-amber-300 text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
            <Gift size={13} className="text-amber-400" />
            <span>Maison Avenoir Bespoke Gifting Studio</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Build Your Own Box <br />
            <span className="italic font-normal text-amber-300">&amp; Curated Honey Flights</span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 font-serif leading-relaxed max-w-2xl">
            Curate a personalized assortment of cold-extracted raw nectars, whipped honey silks, and botanical infusions. Hand-packed in New Jersey with complimentary wax-sealed calligraphy.
          </p>

          {/* Social Proof & Trust Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-emerald-200/90 font-medium">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <span className="font-bold text-white">4.9</span>
              <span>(2,500+ Gift Boxes Shipped)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Truck size={13} className="text-amber-400" />
              <span>Free Courier Shipping over $60</span>
            </div>

            <div className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-amber-400" />
              <span>100% Provenance Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200 max-w-md mx-auto flex items-center gap-1">
        <button
          onClick={() => setActiveTab('custom')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'custom'
              ? 'bg-emerald-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sliders size={15} />
          <span>Build Your Own Box</span>
        </button>

        <button
          onClick={() => setActiveTab('curated')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'curated'
              ? 'bg-emerald-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Gift size={15} />
          <span>Curated Bundles</span>
        </button>
      </div>

      {/* TAB 1: Custom Box Builder */}
      {activeTab === 'custom' && (
        <div ref={builderRef} className="space-y-12 scroll-mt-28">
          {/* Step 1: Tier Selector */}
          <BoxTierSelector
            selectedTier={selectedTier}
            onSelectTier={handleSelectTier}
          />

            {/* Split Builder Layout: Flavors Grid (60%) + Sticky Summary Drawer (40%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-slate-200/80">
              {/* Left Column: Flavors Grid */}
              <div className="lg:col-span-7 xl:col-span-8">
                <FlavorSelectorGrid
                  selectedItems={selectedItems}
                  maxCapacity={selectedTier.capacity}
                  onAddItem={handleAddItem}
                  onRemoveItem={handleRemoveItem}
                />
              </div>

              {/* Right Column: Visual Box Summary Drawer */}
              <div className="lg:col-span-5 xl:col-span-4">
                <VisualBoxDrawer
                  tier={selectedTier}
                  selectedItems={selectedItems}
                  onRemoveItem={handleRemoveItem}
                  onClearAll={handleClearAll}
                  packaging={packaging}
                  onChangePackaging={setPackaging}
                  giftRecipient={giftRecipient}
                  giftSender={giftSender}
                  giftMessage={giftMessage}
                  onSaveGiftNote={handleSaveGiftNote}
                  onAddToCart={handleAddCustomBoxToCart}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Curated Pre-Made Sets */}
        {activeTab === 'curated' && (
          <div className="space-y-12">
            <CuratedBundlesSection
              onQuickAddBundle={handleQuickAddBundle}
              onCustomizeBundle={handleCustomizeBundle}
            />
          </div>
        )}

        {/* Gifting Assurance & FAQs Section */}
        <section className="mt-24 pt-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block mb-1">
              Gifting Etiquette &amp; Details
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              The Maison Avenoir Gifting Experience
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Every detail is considered—from zero-pricing receipts to handwritten envelopes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                <Feather size={20} className="text-amber-800" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Discreet Gifting Dispatch
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All gift boxes are shipped with blind packing slips. No receipts, prices, or invoices are ever included in the recipient package.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                <Sparkles size={20} className="text-emerald-800" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Wax-Sealed Presentation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your custom note is penned on heavyweight cotton rag stock and sealed by hand with molten apiary beeswax and our brass hive crest.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-slate-900 flex items-center justify-center">
                <Truck size={20} className="text-slate-800" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Insulated Fragile Transit
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Each French flint glass jar is nestled in custom-cut shock-absorbent recycled kraft cells to ensure pristine arrival across the US.
              </p>
            </div>
          </div>

          {/* Corporate Gifting Callout */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-emerald-950 to-slate-900 text-white max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-800">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                Looking for 25+ Boxes?
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                Custom Corporate Gifting &amp; Event Favors
              </h3>
              <p className="text-xs text-emerald-200/80 max-w-lg">
                Custom engraved brass plaques, multi-recipient spreadsheet dispatch, and volume enterprise pricing.
              </p>
            </div>

            <Link
              href="/corporate"
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs sm:text-sm transition shrink-0 shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>Explore Corporate Concierge</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </section>
    </div>
  );
}
