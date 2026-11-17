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
import BrandLogo from '@/components/BrandLogo';
import { 
  Gift, 
  Sliders, 
  CheckCircle2, 
  ChevronRight 
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
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-md bg-[#15231A] text-white border border-[#FB5601] shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={18} className="text-[#FB5601] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" prefetch={true} className="hover:text-stone-900 transition">Home</Link>
        <ChevronRight size={12} />
        <Link href="/shop" prefetch={true} className="hover:text-stone-900 transition">Shop</Link>
        <ChevronRight size={12} />
        <span className="text-stone-900 font-bold">Build Your Own Box &amp; Gifting</span>
      </nav>

      {/* Editorial Header */}
      <div className="pt-2 pb-8 border-b border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-[#D64500] uppercase block mb-2">
            Singing Bee Gifting Studio
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-[1.1]">
            Build a Gift Box &amp; <br className="hidden sm:inline" />
            <span className="italic text-[#D64500]">Curated Honey Flights.</span>
          </h1>
          <p className="text-sm sm:text-base text-stone-500 font-serif mt-2.5 max-w-xl leading-relaxed">
            Curate a personalized assortment of cold-extracted raw nectars, whipped honey, and botanical infusions hand-packed in New Jersey.
          </p>
        </div>
        <BrandLogo variant="seal" className="self-start sm:self-end" />
      </div>

      {/* View Switcher Tabs */}
      <div className="bg-white rounded-lg p-1 shadow-2xs border border-stone-200/90 max-w-md mx-auto flex items-center gap-1">
        <button
          onClick={() => setActiveTab('custom')}
          className={`flex-1 py-2.5 px-4 rounded-md text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'custom'
              ? 'bg-[#15231A] text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          }`}
        >
          <Sliders size={15} />
          <span>Build Your Own Box</span>
        </button>

        <button
          onClick={() => setActiveTab('curated')}
          className={`flex-1 py-2.5 px-4 rounded-md text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'curated'
              ? 'bg-[#15231A] text-white shadow-2xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-stone-200">
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

        {/* Gifting Assurance & Details Section - Clean Editorial (No Icon Boxes) */}
        <section className="mt-16 pt-12 border-t border-stone-200 text-left">
          <div className="mb-10 sm:mb-12">
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] text-stone-400 uppercase block mb-1.5">
              Gifting Etiquette
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-stone-900">
              The Singing Bee Gifting Experience
            </h2>
            <p className="text-sm text-stone-500 font-serif mt-1.5 max-w-xl leading-relaxed">
              Every detail considered—from discreet unpriced packing slips to wax-sealed presentation cards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-stone-200">
            <div className="border-t border-stone-200/80 pt-6 space-y-1.5">
              <h3 className="font-serif text-base font-normal text-stone-900">
                Discreet Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 font-serif leading-relaxed">
                All boxes arrive with blind slips. Zero pricing or invoices are ever included.
              </p>
            </div>

            <div className="border-t border-stone-200/80 pt-6 space-y-1.5">
              <h3 className="font-serif text-base font-normal text-stone-900">
                Wax-Sealed Notes
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 font-serif leading-relaxed">
                Your message is pressed on cotton rag paper and sealed with raw apiary beeswax.
              </p>
            </div>

            <div className="border-t border-stone-200/80 pt-6 space-y-1.5">
              <h3 className="font-serif text-base font-normal text-stone-900">
                Fragile Transit
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 font-serif leading-relaxed">
                Heavy French flint glass cushioned in shock-absorbent recycled kraft cells.
              </p>
            </div>
          </div>

          {/* Corporate Gifting Callout Strip */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-medium tracking-[0.2em] text-stone-400 uppercase block">
                Volume Concierge
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-900">
                Custom Corporate Gifting &amp; Event Favors
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 font-serif max-w-xl">
                Custom engraved plaques, multi-recipient spreadsheet dispatch, and volume allocations.
              </p>
            </div>

            <Link
              href="/corporate"
              className="px-6 py-3 rounded-lg bg-[#15231A] hover:bg-[#1E3326] text-white font-medium text-xs uppercase tracking-wider transition shrink-0 flex items-center gap-1.5"
            >
              <span>Explore Corporate Concierge</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </section>
    </div>
  );
}
