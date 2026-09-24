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
    <div className="bg-white rounded-md border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between text-left group relative overflow-hidden">
      {/* Edge-to-edge Product Image without side padding */}
      <Link 
        href={`/products/${product.id}`} 
        prefetch={true}
        className="block relative aspect-square w-full overflow-hidden bg-stone-100 cursor-pointer"
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
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="bg-stone-900 text-[#E8D7B5] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-2xs">
              {product.badge}
            </span>
          )}
          <span
            className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-2xs backdrop-blur-xs ${
              isHoney
                ? 'bg-white/95 text-stone-900 border border-stone-200'
                : 'bg-stone-100/95 text-stone-800 border border-stone-300'
            }`}
          >
            {isHoney ? 'Honey Reserve' : 'Apiary Gear'}
          </span>
        </div>

        {/* Customer Rating */}
        <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-xs text-[10px] sm:text-xs font-bold text-stone-800 flex items-center gap-1 shadow-2xs border border-stone-200">
          <Star size={11} strokeWidth={2.4} className="text-[#C5A265] fill-[#C5A265] sm:w-[12px] sm:h-[12px]" />
          <span>{product.rating}</span>
          <span className="text-stone-400 text-[9px] sm:text-[10px] font-semibold">({product.reviewsCount})</span>
        </div>
      </Link>

      {/* Card Body with comfortable padding */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Subcategory Label */}
          {subMeta && (
            <span className="text-[10px] sm:text-[11px] font-bold text-[#8C6B28] uppercase tracking-wider block mb-0.5">
              {subMeta.name}
            </span>
          )}

          {/* Title linking to individual product page */}
          <Link href={`/products/${product.id}`} prefetch={true} className="group/title block">
            <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900 mb-0.5 leading-snug group-hover/title:text-[#15231A] transition flex items-center justify-between">
              <span className="line-clamp-1">{product.name}</span>
              <ArrowUpRight size={15} strokeWidth={2.2} className="text-stone-400 opacity-0 group-hover/title:opacity-100 transition shrink-0 ml-1 hidden sm:inline" />
            </h3>
          </Link>

          <p className="text-[11px] sm:text-xs text-stone-500 font-medium mb-2.5 sm:mb-3 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Footer / Price & Add to Bag */}
        <div className="pt-2 sm:pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[9px] sm:text-[10px] text-stone-400 block uppercase font-bold tracking-wider">Price</span>
            <span className="text-sm sm:text-lg font-bold text-stone-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1, product.finishes ? product.finishes[0] : undefined)}
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white text-xs font-semibold tracking-wide transition cursor-pointer flex items-center gap-1 sm:gap-1.5 shadow-2xs active:scale-98 shrink-0"
            aria-label={`Add ${product.name} to Bag`}
          >
            <Plus size={13} strokeWidth={2.4} className="sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Add to Bag</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
