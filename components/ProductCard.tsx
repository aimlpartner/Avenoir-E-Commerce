'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Plus, ArrowUpRight } from 'lucide-react';
import { ProductItem, HONEY_SUBCATEGORIES, BEEKEEPING_SUBCATEGORIES } from '@/lib/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: ProductItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const isHoney = product.department === 'honey';

  const subMeta = isHoney
    ? HONEY_SUBCATEGORIES.find((s) => s.id === product.subcategory)
    : BEEKEEPING_SUBCATEGORIES.find((s) => s.id === product.subcategory);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between text-left group relative overflow-hidden">
      {/* Edge-to-edge Product Image without side padding */}
      <Link 
        href={`/products/${product.id}`} 
        prefetch={true}
        className="block relative aspect-square w-full overflow-hidden bg-slate-100 cursor-pointer"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-1.5 items-start">
          {product.badge && (
            <span className="bg-emerald-950 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-sm shadow-xs">
              {product.badge}
            </span>
          )}
          <span
            className={`text-[9px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-sm shadow-2xs backdrop-blur-xs ${
              isHoney
                ? 'bg-amber-100 text-amber-950 border border-amber-300'
                : 'bg-emerald-100 text-emerald-950 border border-emerald-300'
            }`}
          >
            {isHoney ? 'Honey Reserve' : 'Apiary Gear'}
          </span>
        </div>

        {/* Customer Rating */}
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white/95 backdrop-blur-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold text-slate-800 flex items-center gap-1 shadow-xs border border-slate-200">
          <Star size={11} strokeWidth={2.5} className="text-amber-500 fill-amber-500 sm:w-[13px] sm:h-[13px]" />
          <span>{product.rating}</span>
          <span className="text-slate-500 text-[9px] sm:text-[11px] font-semibold">({product.reviewsCount})</span>
        </div>
      </Link>

      {/* Card Body with comfortable padding */}
      <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Subcategory Label */}
          {subMeta && (
            <span className="text-[10px] sm:text-xs font-bold text-emerald-900 uppercase tracking-wider block mb-0.5 sm:mb-1">
              {subMeta.name}
            </span>
          )}

          {/* Title linking to individual product page */}
          <Link href={`/products/${product.id}`} prefetch={true} className="group/title block">
            <h3 className="font-serif text-sm sm:text-lg font-bold text-slate-900 mb-0.5 sm:mb-1 leading-snug group-hover/title:text-emerald-900 transition flex items-center justify-between">
              <span className="line-clamp-1">{product.name}</span>
              <ArrowUpRight size={16} strokeWidth={2.4} className="text-slate-500 opacity-0 group-hover/title:opacity-100 transition shrink-0 ml-1 hidden sm:inline" />
            </h3>
          </Link>

          <p className="text-[11px] sm:text-sm text-slate-600 font-medium mb-2.5 sm:mb-4 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Footer / Price & Add to Bag */}
        <div className="pt-2.5 sm:pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[9px] sm:text-[11px] text-slate-500 block uppercase font-bold tracking-wider">Price</span>
            <span className="text-sm sm:text-xl font-extrabold text-emerald-950">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1, product.finishes ? product.finishes[0] : undefined)}
            className="px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold tracking-wide transition cursor-pointer flex items-center gap-1 sm:gap-2 shadow-xs active:scale-95 shrink-0"
            aria-label={`Add ${product.name} to Bag`}
          >
            <Plus size={14} strokeWidth={2.5} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Add to Bag</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
