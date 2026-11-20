'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, ChevronRight, X } from 'lucide-react';
import { PRODUCTS, PRODUCT_CATEGORIES, ProductCategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import BrandLogo from '@/components/BrandLogo';
import LineupSlider from '@/components/LineupSlider';

export default function ShopClient() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('cat') as ProductCategory | 'all' | null;
  const qParam = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(
    catParam && PRODUCT_CATEGORIES.some((c) => c.id === catParam) ? catParam : 'all'
  );
  const [searchQuery, setSearchQuery] = useState(qParam);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(q) ||
          product.subtitle.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.categoryLabel.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" prefetch={true} className="hover:text-stone-900 transition">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="text-stone-900 font-semibold">Shop</span>
      </nav>

      {/* Header */}
      <div className="pt-1 pb-6 border-b border-stone-200 text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-[#5B8E33] uppercase block mb-1.5">
            Madisonville Apiary &bull; Basking Ridge, NJ
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Shop Singing Bee Honey
          </h1>
          <p className="text-sm sm:text-base text-stone-500 font-serif mt-2 max-w-xl">
            Raw wildflower honey in single jars, 3-jar combos, seasonal gift boxes, event favors,
            kids bottles, corporate glass jars, and monthly subscriptions.
          </p>
        </div>
        <BrandLogo variant="seal" className="self-start sm:self-end" />
      </div>

      {/* Lineup Slider */}
      <LineupSlider />

      {/* Category Filter Pills & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {PRODUCT_CATEGORIES.map((cat) => {
            const count =
              cat.id === 'all'
                ? PRODUCTS.length
                : PRODUCTS.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-md text-xs font-semibold transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#8B6FE0] text-white shadow-2xs'
                    : 'bg-[#F5F1FD] text-stone-700 hover:bg-[#EAE2FB] hover:text-[#6E52C4]'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-64">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-md border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#8B6FE0] focus:border-[#8B6FE0]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-stone-50 rounded-xl border border-stone-200 p-8 space-y-3">
          <h2 className="font-serif text-xl text-stone-800">No products matched</h2>
          <p className="text-xs text-stone-500">
            Try clearing your search or choosing another category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-md bg-[#8B6FE0] text-white text-xs font-semibold hover:bg-[#7A5CD6] transition cursor-pointer"
          >
            Show All Products
          </button>
        </div>
      )}
    </div>
  );
}
