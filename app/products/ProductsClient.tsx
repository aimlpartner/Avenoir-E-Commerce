'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  ChevronRight, 
  RotateCcw, 
  Droplets, 
  Shield, 
  Gift, 
  Layers 
} from 'lucide-react';
import { PRODUCTS, Department } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import GridViewSelector, { GridColumns } from '@/components/GridViewSelector';

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const deptParam = searchParams.get('dept') as Department | 'all' | null;

  const [selectedDept, setSelectedDept] = useState<Department | 'all'>(
    deptParam === 'honey' || deptParam === 'beekeeping' ? deptParam : 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [gridCols, setGridCols] = useState<GridColumns>(4);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Department filter
      if (selectedDept === 'honey') {
        if (product.department !== 'honey') return false;
      } else if (selectedDept === 'beekeeping') {
        if (product.department !== 'beekeeping') return false;
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
  }, [selectedDept, searchQuery, sortBy]);

  const totalAllCount = PRODUCTS.length;
  const honeyCount = PRODUCTS.filter((p) => p.department === 'honey').length;
  const beekeepingCount = PRODUCTS.filter((p) => p.department === 'beekeeping').length;

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-8">
      
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" prefetch={true} className="hover:text-emerald-900 transition">Home</Link>
        <ChevronRight size={12} />
        <span className="text-emerald-950 font-bold">All Products &amp; Catalog</span>
      </nav>

      {/* Page Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-sm text-left">
        <div className="max-w-3xl relative z-10 space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-amber-400 uppercase block">
            Sussex County Atelier Catalog
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Complete Apiary Collection
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Browse our full assortment of single-origin unheated honeys, certified commercial apiculture hardware, and bespoke corporate presentation trunks.
          </p>
        </div>
        <div className="absolute -right-8 -bottom-10 opacity-5 pointer-events-none hidden lg:block text-white">
          <Layers size={360} />
        </div>
      </div>

      {/* Department Filter Navigation Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-4">
        <button
          onClick={() => setSelectedDept('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            selectedDept === 'all'
              ? 'bg-emerald-950 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Layers size={14} />
          <span>All Items ({totalAllCount})</span>
        </button>

        <button
          onClick={() => setSelectedDept('honey')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            selectedDept === 'honey'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Droplets size={14} className="text-amber-500" />
          <span>Raw Honey &amp; Comb ({honeyCount})</span>
        </button>

        <button
          onClick={() => setSelectedDept('beekeeping')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            selectedDept === 'beekeeping'
              ? 'bg-emerald-900 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Shield size={14} className="text-emerald-700" />
          <span>Apiary Hardware ({beekeepingCount})</span>
        </button>

        <Link
          href="/corporate"
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 transition flex items-center gap-2 cursor-pointer"
        >
          <Gift size={14} className="text-amber-700" />
          <span>Executive Gifting</span>
        </Link>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all honeys, hives, suits, or tools..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-xs sm:text-sm bg-slate-50/50"
          />
        </div>

        {/* Sort & Grid Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:border-emerald-700 cursor-pointer"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          <GridViewSelector columns={gridCols} onChange={setGridCols} />
        </div>
      </div>

      {/* Active Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items</span>
        {(selectedDept !== 'all' || searchQuery !== '') && (
          <button
            onClick={() => {
              setSelectedDept('all');
              setSearchQuery('');
            }}
            className="text-emerald-800 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className={`grid gap-6 ${
          gridCols === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : gridCols === 3
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center max-w-lg mx-auto shadow-xs space-y-4">
          <div className="w-14 h-14 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <Search size={24} />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-900">No Products Found</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            No items matched your query &quot;{searchQuery}&quot;. Try selecting another department or resetting filters.
          </p>
          <button
            onClick={() => {
              setSelectedDept('all');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-950 text-white text-xs font-bold hover:bg-emerald-900 transition cursor-pointer shadow-xs"
          >
            Reset Catalog Filters
          </button>
        </div>
      )}

    </div>
  );
}
