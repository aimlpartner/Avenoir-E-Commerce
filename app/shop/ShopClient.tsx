'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  ChevronRight, 
  Droplets, 
  Shield, 
  Gift, 
  Layers, 
  Sparkles, 
  ArrowRight,
  Sliders,
  Compass
} from 'lucide-react';
import { PRODUCTS, Department } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import BrandLogo from '@/components/BrandLogo';

export default function ShopClient() {
  const searchParams = useSearchParams();
  const deptParam = searchParams.get('dept') as Department | 'all' | 'gifts' | null;

  const [selectedCategory, setSelectedCategory] = useState<string>(
    deptParam || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory === 'honey') {
        if (product.department !== 'honey') return false;
      } else if (selectedCategory === 'beekeeping') {
        if (product.department !== 'beekeeping') return false;
      } else if (selectedCategory === 'gifts') {
        if (product.subcategory !== 'honey-vaults') return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(q) ||
          product.subtitle.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.department.toLowerCase().includes(q) ||
          product.subcategory.toLowerCase().includes(q)
        );
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const totalAllCount = PRODUCTS.length;
  const honeyCount = PRODUCTS.filter((p) => p.department === 'honey').length;
  const beekeepingCount = PRODUCTS.filter((p) => p.department === 'beekeeping').length;
  const giftCount = PRODUCTS.filter((p) => p.subcategory === 'honey-vaults').length;

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-10">
      
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" prefetch={true} className="hover:text-stone-900 transition">Home</Link>
        <ChevronRight size={12} />
        <span className="text-stone-900 font-bold">Shop All Departments</span>
      </nav>

      {/* Editorial Header */}
      <div className="pt-1 pb-6 border-b border-stone-200 text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-[#D64500] uppercase block mb-1.5">
            Singing Bee Wildflower Honey
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Shop All Collections
          </h1>
          <p className="text-sm sm:text-base text-stone-500 font-serif mt-2 max-w-2xl">
            Single-origin raw harvests, curated gift flights, and master beekeeping hardware.
          </p>
        </div>
        <BrandLogo variant="seal" className="self-start sm:self-end" />
      </div>

      {/* Catalog Controls: Filter Tabs + Search + Sort */}
      <div className="space-y-4 pt-4 border-t border-stone-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#15231A] text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Items ({totalAllCount})
            </button>

            <button
              onClick={() => setSelectedCategory('honey')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'honey'
                  ? 'bg-[#15231A] text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Droplets size={14} className={selectedCategory === 'honey' ? 'text-[#FB5601]' : 'text-[#D64500]'} />
              <span>Honey Products ({honeyCount})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('beekeeping')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'beekeeping'
                  ? 'bg-[#15231A] text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Shield size={14} className={selectedCategory === 'beekeeping' ? 'text-[#FB5601]' : 'text-stone-600'} />
              <span>Beekeeping Equipment ({beekeepingCount})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('gifts')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'gifts'
                  ? 'bg-[#15231A] text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Gift size={14} className={selectedCategory === 'gifts' ? 'text-[#FB5601]' : 'text-[#D64500]'} />
              <span>Luxury Gift Vaults ({giftCount})</span>
            </button>
          </div>

          {/* Right Controls: Search & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-60">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-md border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-800"
              />
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-md border border-stone-300 bg-white text-xs font-semibold text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-800 shrink-0"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

          </div>
        </div>
      </div>

      {/* Product Grid - 3 Columns Editorial Layout */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg border border-stone-200 p-8 space-y-3">
            <h3 className="font-serif text-xl font-bold text-stone-800">
              No products found
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              We couldn&apos;t find any items matching &quot;{searchQuery}&quot;. Try resetting your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-md bg-[#15231A] text-white text-xs font-bold hover:bg-[#1E3326] transition shadow-2xs cursor-pointer"
            >
              Clear Search &amp; Filters
            </button>
          </div>
        )}
      </div>

      {/* Terroir & Concierge Footer Strip */}
      <div className="pt-8 pb-4 border-t border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#D64500]">
            Botanical Provenance
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-900">
            Explore Our Four Microclimate Terroirs
          </h3>
          <p className="text-xs text-stone-500 max-w-xl font-serif">
            Elevation, Kittatinny ridges, and Pine Barrens flora shape the distinct tasting notes of each seasonal harvest.
          </p>
        </div>

        <Link
          href="/terroir"
          className="px-5 py-2.5 rounded-lg bg-[#15231A] hover:bg-[#1E3326] text-white font-medium text-xs transition shrink-0 flex items-center gap-1.5"
        >
          <Compass size={15} className="text-[#FB5601]" />
          <span>View Terroir Profiles</span>
        </Link>
      </div>

    </div>
  );
}
