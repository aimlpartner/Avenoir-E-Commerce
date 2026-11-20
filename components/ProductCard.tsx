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
        className="block relative aspect-square w-full overflow-hidden rounded-xl cursor-pointer mb-3 border border-[#E8E0C8] bg-[#FDF9E4] group-hover:border-[#A890E4] transition-colors"
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
                ? 'bg-[#78B448] text-white'
                : 'bg-[#8B6FE0] hover:bg-[#7A5CD6] text-white'
            }`}
          >
            {added ? (
              <>
                <Check size={14} className="text-white" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} className="text-[#F0E454]" />
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
          <h3 className="font-serif text-base font-normal text-stone-900 group-hover/title:text-[#7A5CD6] transition leading-snug">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-stone-500 line-clamp-1">{product.subtitle}</p>
        <p className="text-sm font-semibold text-stone-900 pt-0.5">{priceDisplay}</p>
      </div>

      <Link
        href={`/products/${product.id}`}
        prefetch={true}
        className="sm:hidden mt-2.5 py-2 px-3 rounded-md bg-[#8B6FE0] hover:bg-[#7A5CD6] text-white text-xs font-semibold transition flex items-center justify-center"
      >
        Choose Options
      </Link>
    </div>
  );
}
