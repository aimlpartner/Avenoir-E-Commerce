'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Check } from 'lucide-react';
import { ProductItem } from '@/lib/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: ProductItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [added, setAdded] = useState(false);

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
      {/* Product Image — Clean, borderless, zero badge clutter */}
      <Link 
        href={`/products/${product.id}`} 
        prefetch={true}
        className="block relative aspect-square w-full overflow-hidden rounded-lg bg-stone-100 cursor-pointer mb-3"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Desktop Quick Add Bar on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-md text-xs font-semibold uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer ${
              added 
                ? 'bg-[#1A3324] text-white' 
                : 'bg-white/95 hover:bg-white text-stone-900 hover:text-stone-950 backdrop-blur-xs'
            }`}
          >
            {added ? (
              <>
                <Check size={14} className="text-[#C5A265]" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} className="text-stone-700" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Details — Minimal, Editorial, Borderless */}
      <div className="space-y-0.5">
        <Link href={`/products/${product.id}`} prefetch={true} className="block group/title">
          <h3 className="font-serif text-base font-normal text-stone-900 group-hover/title:text-[#8C6B28] transition leading-snug line-clamp-1">
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
        className="sm:hidden mt-2 py-1.5 px-3 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-medium transition cursor-pointer flex items-center justify-center gap-1"
      >
        <ShoppingBag size={12} />
        <span>Add to Bag</span>
      </button>
    </div>
  );
}
