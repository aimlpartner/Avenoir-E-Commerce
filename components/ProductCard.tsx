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

  const defaultVariant = product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, defaultVariant);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setIsCartOpen(true);
    }, 450);
  };

  const priceDisplay = product.isSubscription
    ? `From $${product.price.toFixed(0)}/mo`
    : product.maxPrice && product.maxPrice > product.price
    ? `$${product.price.toFixed(0)} – $${product.maxPrice.toFixed(0)}`
    : `$${product.price.toFixed(2)}`;

  return (
    <div className="group text-left flex flex-col justify-between">
      <Link
        href={`/products/${product.id}`}
        prefetch={true}
        className="block relative aspect-square w-full overflow-hidden rounded-xl cursor-pointer mb-3 border border-stone-200/80 bg-[#FAF7F2] group-hover:border-[#FB5601]/50 transition-colors"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover ${product.imagePosition || 'object-center'} group-hover:scale-104 transition-transform duration-500 ease-out`}
        />

        {/* Desktop Quick Add on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block z-20">
          <button
            type="button"
            onClick={handleQuickAdd}
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
                <span>
                  {product.isSubscription ? 'Subscribe' : 'Quick Add'} &bull; $
                  {defaultVariant.price.toFixed(0)}
                </span>
              </>
            )}
          </button>
        </div>
      </Link>

      <div className="space-y-1">
        <Link href={`/products/${product.id}`} prefetch={true} className="block group/title">
          <h3 className="font-serif text-base font-normal text-stone-900 group-hover/title:text-[#D64500] transition leading-snug">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-stone-500 line-clamp-1">{product.subtitle}</p>
        <p className="text-sm font-semibold text-stone-900 pt-0.5">{priceDisplay}</p>
      </div>

      <Link
        href={`/products/${product.id}`}
        prefetch={true}
        className="sm:hidden mt-2.5 py-2 px-3 rounded-md bg-stone-100 hover:bg-[#FFF4ED] text-stone-900 text-xs font-semibold transition flex items-center justify-center"
      >
        Choose Options
      </Link>
    </div>
  );
}
