'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Check } from 'lucide-react';
import { ProductItem } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import BrandLogo from '@/components/BrandLogo';

interface ProductCardProps {
  product: ProductItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [added, setAdded] = useState(false);

  const isBottleCutout = product.imageUrl.includes('singing-bee-bottle');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.finishes ? product.finishes[0] : undefined);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setIsCartOpen(true);
    }, 500);
  };

  return (
    <div className="group text-left flex flex-col justify-between">
      {/* Product Image */}
      <Link
        href={`/products/${product.id}`}
        prefetch={true}
        className={`block relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer mb-3 border border-stone-200/60 group-hover:border-[#FB5601]/40 transition-colors ${
          isBottleCutout ? 'bg-gradient-to-b from-[#FAF7F2] to-[#F2EAE0]' : 'bg-stone-100'
        }`}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className={
            isBottleCutout
              ? 'object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-md'
              : 'object-cover group-hover:scale-104 transition-transform duration-500 ease-out'
          }
          referrerPolicy="no-referrer"
        />

        {/* Singing Bee Authenticity Crest Seal */}
        <div
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 p-1 border border-[#FB5601]/50 shadow-xs backdrop-blur-xs pointer-events-none"
          title="Singing Bee Wildflower Honey"
        >
          <BrandLogo variant="mark" className="w-full h-full" />
        </div>

        {/* Desktop Quick Add Bar on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-md text-xs font-semibold uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer ${
              added
                ? 'bg-[#FB5601] text-white'
                : 'bg-white/95 hover:bg-white text-stone-900 hover:text-[#D64500] backdrop-blur-xs'
            }`}
          >
            {added ? (
              <>
                <Check size={14} className="text-white" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} className="text-[#D64500]" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="space-y-0.5">
        <Link href={`/products/${product.id}`} prefetch={true} className="block group/title">
          <h3 className="font-serif text-base font-normal text-stone-900 group-hover/title:text-[#D64500] transition leading-snug line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-semibold text-stone-900">
          ${product.price.toFixed(2)}
        </p>
      </div>

      {/* Mobile-only subtle add button */}
      <button
        onClick={handleAddToCart}
        className="sm:hidden mt-2 py-1.5 px-3 rounded-md bg-stone-100 hover:bg-[#FFF4ED] text-stone-900 text-xs font-medium transition cursor-pointer flex items-center justify-center gap-1"
      >
        <ShoppingBag size={12} className="text-[#D64500]" />
        <span>Add to Bag</span>
      </button>
    </div>
  );
}
