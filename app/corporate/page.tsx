'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Gift, 
  Plus, 
  Trash2, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight, 
  ChevronDown,
  Building2, 
  Mail, 
  ArrowRight,
  Check,
  FileSpreadsheet,
  Clock,
  Award,
  Layers,
  PhoneCall
} from 'lucide-react';
import { PRODUCTS, ProductItem } from '@/lib/products';
import { useCart } from '@/context/CartContext';

interface BulkRecipient {
  id: string;
  companyOrName: string;
  address: string;
  cityStateZip: string;
  inscription: string;
}

type PlaqueFontStyle = 'serif' | 'italic' | 'caps';

export default function CorporatePage() {
  const { addToCart } = useCart();

  // Curated corporate gifting items (presentation vaults and reserve tasting collections)
  const corporateProducts = PRODUCTS.filter(
    (p) => p.department === 'honey' && (p.subcategory === 'honey-vaults' || p.price >= 40)
  );

  const [selectedProductId, setSelectedProductId] = useState<string>(
    corporateProducts[0]?.id || 'AV-BOX-WALNUT'
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [quantity, setQuantity] = useState<number>(25);
  const [brassPlateNote, setBrassPlateNote] = useState<string>(
    'Presented with Gratitude for Five Years of Trusted Partnership'
  );
  const [plaqueFontStyle, setPlaqueFontStyle] = useState<PlaqueFontStyle>('italic');
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Close custom dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Multi-recipient dispatch roster
  const [recipients, setRecipients] = useState<BulkRecipient[]>([
    {
      id: 'rec-1',
      companyOrName: 'Highland Capital Partners — Attn: Marcus Vance',
      address: '452 5th Avenue, Floor 28',
      cityStateZip: 'New York, NY 10018',
      inscription: 'With appreciation for your enduring partnership in 2026'
    },
    {
      id: 'rec-2',
      companyOrName: 'Vanguard Biopharma — Attn: Dr. Sarah Lin',
      address: '100 Binney Street, Suite 400',
      cityStateZip: 'Cambridge, MA 02142',
      inscription: 'Honoring scientific excellence and dedicated collaboration'
    },
    {
      id: 'rec-3',
      companyOrName: 'Merrill & Stone Legal — Attn: Eleanor Wright',
      address: '190 S LaSalle St, Suite 3100',
      cityStateZip: 'Chicago, IL 60603',
      inscription: 'With deep gratitude for trusted counsel and stewardship'
    }
  ]);

  const selectedProduct: ProductItem = 
    corporateProducts.find((p) => p.id === selectedProductId) || corporateProducts[0];

  // Volume Tier Calculation
  const discountRate = quantity >= 100 ? 0.25 : quantity >= 25 ? 0.15 : quantity >= 5 ? 0.10 : 0;
  const basePrice = selectedProduct.price * quantity;
  const discountedPrice = basePrice * (1 - discountRate);
  const savings = basePrice - discountedPrice;
  const unitPriceAfterDiscount = discountedPrice / quantity;

  const handleAddRecipient = () => {
    const newRec: BulkRecipient = {
      id: `rec-${Date.now()}`,
      companyOrName: '',
      address: '',
      cityStateZip: '',
      inscription: brassPlateNote
    };
    setRecipients((prev) => [...prev, newRec]);
  };

  const handleRemoveRecipient = (id: string) => {
    setRecipients((prev) => prev.filter((r) => r.id !== id));
  };

  const handleUpdateRecipient = (id: string, field: keyof BulkRecipient, val: string) => {
    setRecipients((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  const handleDownloadSampleCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Recipient or Company,Street Address,City State Zip,Custom Inscription Note']
        .concat(
          recipients.map(
            (r) =>
              `"${r.companyOrName.replace(/"/g, '""')}","${r.address.replace(/"/g, '""')}","${r.cityStateZip.replace(/"/g, '""')}","${r.inscription.replace(/"/g, '""')}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'avenoir_corporate_gifting_manifest.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddTierToBag = () => {
    addToCart(
      selectedProduct,
      quantity,
      selectedProduct.finishes ? selectedProduct.finishes[0] : undefined,
      `Corporate Commission (${quantity} units) — Plaque: "${brassPlateNote}" [${plaqueFontStyle.toUpperCase()}]`
    );
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-10 text-left">
      
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" prefetch={true} className="hover:text-stone-900 transition">Home</Link>
        <ChevronRight size={12} />
        <span className="text-stone-900 font-semibold">Private Client &amp; Corporate Commissions</span>
      </nav>

      {/* Editorial Header Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 sm:p-10 lg:p-12 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <p className="text-[11px] sm:text-sm font-bold tracking-widest text-amber-300 uppercase">
            Private Commissions &bull; Sussex County
          </p>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Heirloom Presentation Trunks &amp; <span className="text-amber-300">Corporate Dispatch</span>
          </h1>

          <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl font-normal">
            Cabinet-grade American walnut and birdseye maple trunks, solid C360 architectural brass plaques engraved with your insignia, and white-glove individual recipient dispatch.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-800/80 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
              <span>Volume Tiers (10% to 25% Advantage)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
              <span>C360 Architectural Brass Engraving</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
              <span>Individual Multi-Address Courier</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Commission Studio (2-Column Planner) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Commission Configurator */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="font-serif text-xl sm:text-2xl text-stone-900 font-semibold">
              Commission Configurator &amp; Volume Ledger
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Select an heirloom presentation item, tailor your order volume, and customize your brass lid inscription.
            </p>
          </div>

          {/* 1. Custom Product Dropdown (Replacing native HTML select) */}
          <div className="space-y-2 relative" ref={dropdownRef}>
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              1. Choose Presentation Vessel or Vault
            </label>

            {/* Custom Dropdown Trigger Button */}
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              className={`w-full flex items-center justify-between gap-3 p-3 bg-stone-50 hover:bg-stone-100/70 border rounded-xl transition text-left cursor-pointer ${
                isDropdownOpen
                  ? 'border-emerald-700 ring-2 ring-emerald-700/20 bg-white'
                  : 'border-stone-300'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-stone-200 shrink-0 border border-stone-300/80">
                  <Image
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900 truncate">
                      {selectedProduct.name}
                    </span>
                    {selectedProduct.badge && (
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-sm bg-stone-200 text-stone-800">
                        {selectedProduct.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 truncate">
                    {selectedProduct.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-bold text-stone-900">
                  ${selectedProduct.price.toFixed(2)}
                  <span className="text-[10px] font-normal text-stone-500"> / unit</span>
                </span>
                <ChevronDown
                  size={16}
                  className={`text-stone-500 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180 text-emerald-800' : ''
                  }`}
                />
              </div>
            </button>

            {/* Custom Dropdown Popover Menu */}
            {isDropdownOpen && (
              <div
                role="listbox"
                className="absolute z-50 mt-1.5 w-full bg-white border border-stone-300 rounded-xl shadow-xl overflow-hidden max-h-80 overflow-y-auto divide-y divide-stone-100 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-3 py-2 bg-stone-50 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Available Presentation Trunks &amp; Reserve Jars
                </div>
                {corporateProducts.map((prod) => {
                  const isSelected = prod.id === selectedProductId;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSelectedProductId(prod.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between gap-3 p-3 text-left transition cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50/70 text-emerald-950'
                          : 'hover:bg-stone-50 text-stone-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-stone-200 shrink-0 border border-stone-200">
                          <Image
                            src={prod.imageUrl}
                            alt={prod.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold truncate ${isSelected ? 'text-emerald-950' : 'text-stone-900'}`}>
                              {prod.name}
                            </span>
                            {prod.materials && (
                              <span className="text-[10px] text-stone-500 truncate hidden sm:inline">
                                &bull; {prod.materials.split(',')[0]}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 truncate">
                            {prod.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-semibold text-stone-900">
                          ${prod.price.toFixed(2)}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center">
                            <Check size={12} />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Order Volume & Tier Indicator */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                2. Order Volume (Number of Units)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={5}
                  max={500}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(5, parseInt(e.target.value) || 5))}
                  className="w-20 px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-300 text-xs font-bold text-stone-900 text-center focus:outline-hidden focus:border-emerald-800"
                />
                <span className="text-xs text-stone-500 font-medium">boxes</span>
              </div>
            </div>

            <input
              type="range"
              min={5}
              max={150}
              step={5}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full accent-emerald-800 cursor-pointer"
            />

            {/* Volume Tier Cards */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs pt-1">
              <button
                type="button"
                onClick={() => setQuantity(10)}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  quantity >= 5 && quantity < 25
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="block text-[10px] uppercase font-bold opacity-80">Tier 1</span>
                <span className="block font-semibold">5 &ndash; 24 units</span>
                <span className="text-[11px] font-bold text-amber-500">10% Advantage</span>
              </button>

              <button
                type="button"
                onClick={() => setQuantity(25)}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  quantity >= 25 && quantity < 100
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="block text-[10px] uppercase font-bold opacity-80">Tier 2</span>
                <span className="block font-semibold">25 &ndash; 99 units</span>
                <span className="text-[11px] font-bold text-amber-500">15% Advantage</span>
              </button>

              <button
                type="button"
                onClick={() => setQuantity(100)}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  quantity >= 100
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="block text-[10px] uppercase font-bold opacity-80">Executive</span>
                <span className="block font-semibold">100+ units</span>
                <span className="text-[11px] font-bold text-amber-500">25% Advantage</span>
              </button>
            </div>
          </div>

          {/* 3. Brass Plate Engraving Note & Font Style */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                3. Bespoke Inscription on Architectural Brass
              </label>
              <span className="text-[11px] text-emerald-800 font-semibold">
                Complimentary Precision Laser Inlay
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                maxLength={80}
                value={brassPlateNote}
                onChange={(e) => setBrassPlateNote(e.target.value)}
                placeholder="e.g. In Honor of Our Advisory Board — 2026"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 font-medium focus:outline-hidden focus:border-emerald-800"
              />
              <span className="absolute right-3 top-2.5 text-[10px] text-stone-400">
                {brassPlateNote.length}/80
              </span>
            </div>

            {/* Typography Style Selector */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] text-stone-500 font-medium">Inscription Style:</span>
              <div className="inline-flex bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs">
                <button
                  type="button"
                  onClick={() => setPlaqueFontStyle('italic')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
                    plaqueFontStyle === 'italic'
                      ? 'bg-white text-stone-900 shadow-xs font-bold italic'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Classic Italic
                </button>
                <button
                  type="button"
                  onClick={() => setPlaqueFontStyle('serif')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
                    plaqueFontStyle === 'serif'
                      ? 'bg-white text-stone-900 shadow-xs font-bold font-serif'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Formal Serif
                </button>
                <button
                  type="button"
                  onClick={() => setPlaqueFontStyle('caps')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
                    plaqueFontStyle === 'caps'
                      ? 'bg-white text-stone-900 shadow-xs font-bold tracking-wider'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Architectural Caps
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Ledger */}
          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5">
            <div className="flex justify-between text-xs text-stone-600">
              <span>List Price ({quantity} &times; ${selectedProduct.price.toFixed(2)})</span>
              <span className="font-mono text-stone-800">${basePrice.toFixed(2)}</span>
            </div>

            {savings > 0 && (
              <div className="flex justify-between text-xs text-emerald-800 font-semibold">
                <span>Volume Advantage ({(discountRate * 100).toFixed(0)}% Off)</span>
                <span className="font-mono">-${savings.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-xs text-stone-600">
              <span>Laser-Cut Inscribed Brass Plates</span>
              <span className="font-semibold text-emerald-800 uppercase text-[11px]">Included ($0)</span>
            </div>

            <div className="flex justify-between text-xs text-stone-600">
              <span>White-Glove Insured Delivery</span>
              <span className="font-semibold text-emerald-800 uppercase text-[11px]">Complimentary ($0)</span>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Commission Total
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  ${unitPriceAfterDiscount.toFixed(2)} net / recipient
                </span>
              </div>
              <span className="font-mono text-3xl font-bold text-stone-900 tracking-tight">
                ${discountedPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Add to Bag Action */}
          <div className="space-y-2">
            <button
              onClick={handleAddTierToBag}
              className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-[0.99]"
            >
              <Gift size={16} className="text-amber-400" />
              <span>Add {quantity} Corporate Vaults to Order</span>
            </button>

            {addedSuccess && (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center justify-center gap-2 animate-in fade-in">
                <CheckCircle2 size={14} className="text-emerald-700" />
                <span>Added {quantity} bespoke units to your order with engraved brass plaque.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Architectural Inscription Mockup & Specifications */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Architectural Brass Plaque Realistic Preview */}
          <div className="bg-stone-100/70 rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block">
                  Live Proof Rendering
                </span>
                <h3 className="font-serif text-lg text-stone-900 font-semibold">
                  C360 Architectural Brass Plaque
                </h3>
              </div>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">
                1:1 Scale Proof
              </span>
            </div>

            {/* Realistic Brushed Brass Plaque Rendering */}
            <div className="relative p-6 sm:p-7 rounded-xl bg-gradient-to-br from-[#d4af6a] via-[#e8d19d] to-[#c19a55] border border-[#a88235] shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.3),0_4px_16px_rgba(0,0,0,0.08)] space-y-4 text-center overflow-hidden">
              
              {/* Brushed metal sheen overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

              {/* 4 Realistic Countersunk Brass Screws */}
              <div className="absolute top-2.5 left-2.5 w-3 h-3 rounded-full bg-gradient-to-b from-[#b58b44] to-[#7d591e] border border-[#f0dfb8]/60 shadow-inner flex items-center justify-center">
                <div className="w-2 h-0.5 bg-[#3a2507] rotate-45" />
              </div>
              <div className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full bg-gradient-to-b from-[#b58b44] to-[#7d591e] border border-[#f0dfb8]/60 shadow-inner flex items-center justify-center">
                <div className="w-2 h-0.5 bg-[#3a2507] -rotate-45" />
              </div>
              <div className="absolute bottom-2.5 left-2.5 w-3 h-3 rounded-full bg-gradient-to-b from-[#b58b44] to-[#7d591e] border border-[#f0dfb8]/60 shadow-inner flex items-center justify-center">
                <div className="w-2 h-0.5 bg-[#3a2507] -rotate-30" />
              </div>
              <div className="absolute bottom-2.5 right-2.5 w-3 h-3 rounded-full bg-gradient-to-b from-[#b58b44] to-[#7d591e] border border-[#f0dfb8]/60 shadow-inner flex items-center justify-center">
                <div className="w-2 h-0.5 bg-[#3a2507] rotate-60" />
              </div>

              {/* Sussex Apiary Hallmark */}
              <div className="space-y-0.5">
                <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-[#3d270c] block">
                  Avenoir &bull; Sussex County Apiary
                </span>
                <span className="text-[8px] tracking-[0.18em] uppercase text-[#4d3210]/80 block">
                  New Jersey &bull; Established 2018
                </span>
              </div>

              {/* Live Laser Inscribed Message */}
              <div className="py-2 px-3 border-y border-[#a88235]/40 min-h-[64px] flex items-center justify-center">
                <p 
                  className={`text-[#2b1b0a] font-serif text-base sm:text-lg font-bold leading-snug drop-shadow-[0_1px_0_rgba(255,255,255,0.4)] ${
                    plaqueFontStyle === 'italic'
                      ? 'italic'
                      : plaqueFontStyle === 'caps'
                      ? 'uppercase tracking-wider font-sans text-sm font-semibold'
                      : 'tracking-normal'
                  }`}
                >
                  &ldquo;{brassPlateNote || 'Your Custom Inscription Here'}&rdquo;
                </p>
              </div>

              {/* Technical hallmark footnote */}
              <div className="flex items-center justify-center gap-2 text-[8px] tracking-wider uppercase text-[#422c10]/85 font-semibold">
                <span>0.8mm Architectural C360</span>
                <span>&bull;</span>
                <span>Fiber Laser Etched</span>
                <span>&bull;</span>
                <span>Beeswax Buffed</span>
              </div>
            </div>

            {/* Timber & Vessel Specs Card */}
            <div className="bg-white rounded-xl p-4 border border-stone-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                  <Image
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{selectedProduct.name}</h4>
                  <p className="text-[11px] text-stone-500 font-mono">
                    {selectedProduct.dimensions || '32cm × 14cm × 12cm'} &bull; {selectedProduct.weight || '2.4 kg'}
                  </p>
                </div>
              </div>

              <ul className="text-xs text-stone-600 space-y-1.5 pt-2 border-t border-stone-100">
                <li className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-700 shrink-0 mt-0.5" />
                  <span>{selectedProduct.materials || 'Solid American Walnut, C360 Brass'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-700 shrink-0 mt-0.5" />
                  <span>Gold-foil debossed certificate of harvest with numbered seal</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-700 shrink-0 mt-0.5" />
                  <span>Hand-turned solid C360 brass tasting dipper included</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Concierge Desk Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold">
                <Mail size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Direct Concierge Assistance
                </h4>
                <p className="text-[11px] text-stone-500">Fast 2-hour formal proposal response</p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Prefer to submit an existing recipient spreadsheet or request physical timber sample swatches? Contact our account desk:
            </p>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-800 space-y-1">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span>corporate@avenoirhoney.com</span>
                <span className="text-emerald-800 font-semibold">(973) 555-MIEL</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Multi-Recipient CSV Batch Dispatch Section */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-900 uppercase tracking-widest mb-1">
              <FileSpreadsheet size={13} />
              <span>Multi-Address White-Glove Dispatch</span>
            </div>
            <h3 className="font-serif text-2xl text-stone-900 font-semibold">
              Recipient Manifest Manager
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Enter individual client destinations below or export our structured CSV template for batch dispatch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadSampleCsv}
              className="px-3.5 py-2 rounded-lg border border-stone-300 hover:border-stone-400 text-stone-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer bg-white"
            >
              <Download size={13} />
              <span>Export CSV Manifest</span>
            </button>
            <button
              onClick={handleAddRecipient}
              className="px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={13} />
              <span>Add Recipient Row</span>
            </button>
          </div>
        </div>

        {/* Recipients: Mobile Card View (md:hidden) + Desktop Table (hidden md:block) */}
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {/* Mobile Card List (Zero Horizontal Scrolling) */}
          <div className="block md:hidden divide-y divide-stone-200">
            {recipients.map((rec, index) => (
              <div key={rec.id} className="p-4 space-y-2.5 bg-white">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-stone-400 text-xs font-bold">Recipient #{index + 1}</span>
                  <button
                    onClick={() => handleRemoveRecipient(rec.id)}
                    className="text-stone-400 hover:text-rose-600 transition p-1 cursor-pointer flex items-center gap-1 text-xs"
                    aria-label="Remove Recipient"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>

                <div>
                  <label className="text-[10px] text-stone-400 uppercase font-bold block mb-1">Company &amp; Attn</label>
                  <input
                    type="text"
                    value={rec.companyOrName}
                    onChange={(e) => handleUpdateRecipient(rec.id, 'companyOrName', e.target.value)}
                    placeholder="e.g. Apex Partners — Jane Doe"
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-xs text-stone-900 focus:outline-hidden focus:border-stone-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-stone-400 uppercase font-bold block mb-1">Street Address</label>
                    <input
                      type="text"
                      value={rec.address}
                      onChange={(e) => handleUpdateRecipient(rec.id, 'address', e.target.value)}
                      placeholder="e.g. 100 Main St, Suite 400"
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-xs text-stone-900 focus:outline-hidden focus:border-stone-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-400 uppercase font-bold block mb-1">City, State, Zip</label>
                    <input
                      type="text"
                      value={rec.cityStateZip}
                      onChange={(e) => handleUpdateRecipient(rec.id, 'cityStateZip', e.target.value)}
                      placeholder="e.g. New York, NY 10001"
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-xs text-stone-900 focus:outline-hidden focus:border-stone-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-stone-400 uppercase font-bold block mb-1">Personal Inscription</label>
                  <input
                    type="text"
                    value={rec.inscription}
                    onChange={(e) => handleUpdateRecipient(rec.id, 'inscription', e.target.value)}
                    placeholder="Personal gift note..."
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-xs text-stone-900 focus:outline-hidden focus:border-stone-400"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3 w-8">#</th>
                  <th className="py-2.5 px-3">Company &amp; Attn</th>
                  <th className="py-2.5 px-3">Street Address</th>
                  <th className="py-2.5 px-3">City, State, Zip</th>
                  <th className="py-2.5 px-3">Personal Inscription Note</th>
                  <th className="py-2.5 px-3 text-right w-12">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recipients.map((rec, index) => (
                  <tr key={rec.id} className="hover:bg-stone-50/70 transition">
                    <td className="py-2.5 px-3 font-mono text-stone-400 text-[11px]">{index + 1}</td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={rec.companyOrName}
                        onChange={(e) => handleUpdateRecipient(rec.id, 'companyOrName', e.target.value)}
                        placeholder="e.g. Apex Partners — Jane Doe"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white text-xs text-stone-900 focus:outline-hidden focus:border-stone-400"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={rec.address}
                        onChange={(e) => handleUpdateRecipient(rec.id, 'address', e.target.value)}
                        placeholder="e.g. 100 Main St, Suite 400"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white text-xs text-stone-900 focus:outline-hidden focus:border-stone-400"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={rec.cityStateZip}
                        onChange={(e) => handleUpdateRecipient(rec.id, 'cityStateZip', e.target.value)}
                        placeholder="e.g. New York, NY 10001"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white text-xs text-stone-900 focus:outline-hidden focus:border-stone-400"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={rec.inscription}
                        onChange={(e) => handleUpdateRecipient(rec.id, 'inscription', e.target.value)}
                        placeholder="Personal gift note..."
                        className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white text-xs text-stone-900 focus:outline-hidden focus:border-stone-400"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => handleRemoveRecipient(rec.id)}
                        className="text-stone-400 hover:text-rose-600 transition p-1 cursor-pointer"
                        aria-label="Remove Recipient"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-stone-500">
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 size={14} className="text-emerald-700" />
            {recipients.length} destinations staged. Courier address verification included on all shipments.
          </span>
          <button
            onClick={handleAddRecipient}
            className="text-stone-900 font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <Plus size={13} />
            <span>Add Row</span>
          </button>
        </div>
      </section>

      {/* Direct Quote Inquiry Form */}
      <section className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-10 border border-stone-800 shadow-sm space-y-6">
        <div className="max-w-xl space-y-1.5">
          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
            Custom Consultation Desk
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Request Formal Proposal &amp; Proof Sheet
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Need custom wood species, specialized harvest years, or have a recipient list exceeding 250 locations? Our concierge desk will prepare full proof renders within 2 hours.
          </p>
        </div>

        {inquirySubmitted ? (
          <div className="p-6 rounded-xl bg-stone-800/80 border border-stone-700 text-center space-y-2 max-w-lg">
            <CheckCircle2 size={26} className="mx-auto text-amber-400" />
            <h4 className="font-serif text-lg font-semibold text-white">Inquiry Received</h4>
            <p className="text-xs text-stone-300">
              Thank you. An Avenoir corporate director has received your specifications and will follow up with your formal proposal and digital proof rendering within two hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setInquirySubmitted(true);
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl"
          >
            <input
              type="text"
              required
              placeholder="Your Full Name"
              className="px-3.5 py-2.5 rounded-lg bg-stone-800 border border-stone-700 text-xs text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400"
            />
            <input
              type="email"
              required
              placeholder="Corporate Email Address"
              className="px-3.5 py-2.5 rounded-lg bg-stone-800 border border-stone-700 text-xs text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400"
            />
            <input
              type="text"
              required
              placeholder="Company / Organization Name"
              className="px-3.5 py-2.5 rounded-lg bg-stone-800 border border-stone-700 text-xs text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400"
            />
            <input
              type="text"
              placeholder="Target Delivery Date (e.g. Nov 20, 2026)"
              className="px-3.5 py-2.5 rounded-lg bg-stone-800 border border-stone-700 text-xs text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400"
            />
            <textarea
              rows={3}
              placeholder="Notes on brass inscription, custom laser company crest, or multi-destination shipping deadlines..."
              className="sm:col-span-2 px-3.5 py-2.5 rounded-lg bg-stone-800 border border-stone-700 text-xs text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400 resize-none"
            />
            <div className="sm:col-span-2 pt-1">
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-xs"
              >
                Send Request to Concierge Director &rarr;
              </button>
            </div>
          </form>
        )}
      </section>

    </div>
  );
}
