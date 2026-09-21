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
import GridViewSelector, { GridColumns } from '@/components/GridViewSelector';

export default function ShopClient() {
  const searchParams = useSearchParams();
  const deptParam = searchParams.get('dept') as Department | 'all' | 'gifts' | null;

  const [selectedCategory, setSelectedCategory] = useState<string>(
    deptParam || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [gridCols, setGridCols] = useState<GridColumns>(4);

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
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" prefetch={true} className="hover:text-emerald-900 transition">Home</Link>
        <ChevronRight size={12} />
        <span className="text-emerald-950 font-bold">Shop All Departments</span>
      </nav>

      {/* Featured Department Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* 1. Build Your Own Box Banner */}
        <Link
          href="/gifting"
          prefetch={true}
          className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white p-7 flex flex-col justify-between min-h-[220px] shadow-md hover:shadow-xl transition-all border border-emerald-800"
        >
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-black uppercase tracking-wider">
                Featured Experience
              </span>
              <span className="text-xs text-amber-300 font-bold">Save up to 25%</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-white leading-tight group-hover:text-amber-300 transition">
              Build Your Own Box
            </h2>
            <p className="text-xs text-emerald-200/80 mt-1.5 line-clamp-2 leading-relaxed">
              Design a custom 3, 6, or 12-jar honey stack with handwritten wax-sealed calligraphy.
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-emerald-800/80 text-xs font-bold text-amber-300">
            <span>Launch Box Builder</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* 2. Honey Collections Banner */}
        <Link
          href="/honey"
          prefetch={true}
          className="group relative rounded-3xl overflow-hidden bg-white text-slate-900 p-7 flex flex-col justify-between min-h-[220px] shadow-xs hover:shadow-lg transition-all border border-slate-200/90"
        >
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                Pure Provenance
              </span>
              <span className="text-xs text-slate-500 font-semibold">{honeyCount} Reserves</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 leading-tight group-hover:text-emerald-900 transition">
              Honey Products
            </h2>
            <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
              Single-origin raw nectar, whipped Madagascar vanilla cream, and edible comb slabs.
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-emerald-900">
            <span>Explore Raw Honey</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* 3. Beekeeping Gear Banner */}
        <Link
          href="/beekeeping"
          prefetch={true}
          className="group relative rounded-3xl overflow-hidden bg-white text-slate-900 p-7 flex flex-col justify-between min-h-[220px] shadow-xs hover:shadow-lg transition-all border border-slate-200/90"
        >
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase tracking-wider">
                Commercial Grade
              </span>
              <span className="text-xs text-slate-500 font-semibold">{beekeepingCount} Supplies</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 leading-tight group-hover:text-emerald-900 transition">
              Beekeeping Gear
            </h2>
            <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
              3-layer ventilated sting-proof suits, stainless smokers, and Cedar Langstroth woodenware.
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-emerald-900">
            <span>Explore Equipment</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

      </div>

      {/* Catalog Controls: Filter Tabs + Search + Sort */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-emerald-950 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Items ({totalAllCount})
            </button>

            <button
              onClick={() => setSelectedCategory('honey')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'honey'
                  ? 'bg-emerald-950 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Droplets size={14} className={selectedCategory === 'honey' ? 'text-amber-400' : 'text-amber-600'} />
              <span>Honey Products ({honeyCount})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('beekeeping')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'beekeeping'
                  ? 'bg-emerald-950 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Shield size={14} className={selectedCategory === 'beekeeping' ? 'text-amber-400' : 'text-emerald-700'} />
              <span>Beekeeping Equipment ({beekeepingCount})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('gifts')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'gifts'
                  ? 'bg-emerald-950 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Gift size={14} className={selectedCategory === 'gifts' ? 'text-amber-400' : 'text-amber-600'} />
              <span>Luxury Gift Vaults ({giftCount})</span>
            </button>
          </div>

          {/* Right Controls: Search & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-60">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
              />
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-800 shrink-0"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* Grid Column Selector on Desktop */}
            <div className="hidden lg:block">
              <GridViewSelector columns={gridCols} onChange={setGridCols} />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div>
        <div
          className={`grid gap-5 sm:gap-6 ${
            gridCols === 3
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <h3 className="font-serif text-xl font-bold text-slate-800">
              No products found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find any items matching &quot;{searchQuery}&quot;. Try resetting your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 transition"
            >
              Clear Search &amp; Filters
            </button>
          </div>
        )}
      </div>

      {/* Terroir & Concierge Banner Footer */}
      <div className="p-8 rounded-3xl bg-stone-100 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Botanical Provenance
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            Explore Our Four Microclimate Terroirs
          </h3>
          <p className="text-xs text-slate-600 max-w-xl">
            Learn how elevation, mountain ridges, and Pine Barrens blossoms shape the distinct tasting notes of each seasonal harvest.
          </p>
        </div>

        <Link
          href="/terroir"
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-950 text-white font-bold text-xs transition shrink-0 flex items-center gap-1.5 shadow-xs"
        >
          <Compass size={15} />
          <span>View Terroir Profiles</span>
        </Link>
      </div>

    </div>
  );
}
