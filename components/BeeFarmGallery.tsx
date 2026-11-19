'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface BeeFarmPhoto {
  id: string;
  src: string;
  alt: string;
  aspectClass: string;
}

export const BEE_FARM_PHOTOS: BeeFarmPhoto[] = [
  {
    id: 'sunset-hives',
    src: '/media/apiary/photos/sunset-hives-row.jpeg',
    alt: 'Row of wooden beehives at Madisonville Apiary',
    aspectClass: 'aspect-4/3',
  },
  {
    id: 'glass-top-hive',
    src: '/media/apiary/photos/glass-top-hive.jpeg',
    alt: 'Hive top view showing honey frames',
    aspectClass: 'aspect-3/4',
  },
  {
    id: 'smoker-inspection',
    src: '/media/apiary/photos/smoker-inspection.jpeg',
    alt: 'Beekeeper inspecting hive with smoker',
    aspectClass: 'aspect-3/4',
  },
  {
    id: 'frame-comb-bees',
    src: '/media/apiary/photos/frame-inspection-closeup.jpg',
    alt: 'Honeybees on comb frame',
    aspectClass: 'aspect-square',
  },
  {
    id: 'brood-pointing',
    src: '/media/apiary/photos/brood-frame-pointing.jpg',
    alt: 'Checking comb frame',
    aspectClass: 'aspect-square',
  },
  {
    id: 'spring-apiary-yard',
    src: '/media/apiary/photos/spring-yard-nuc.jpeg',
    alt: 'Bee yard in spring',
    aspectClass: 'aspect-3/4',
  },
];

export default function BeeFarmGallery() {
  const [selected, setSelected] = useState<BeeFarmPhoto | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowRight') {
        const idx = BEE_FARM_PHOTOS.findIndex((p) => p.id === selected.id);
        setSelected(BEE_FARM_PHOTOS[(idx + 1) % BEE_FARM_PHOTOS.length]);
      }
      if (e.key === 'ArrowLeft') {
        const idx = BEE_FARM_PHOTOS.findIndex((p) => p.id === selected.id);
        setSelected(BEE_FARM_PHOTOS[(idx - 1 + BEE_FARM_PHOTOS.length) % BEE_FARM_PHOTOS.length]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <section className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 text-left">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-stone-200 pb-5">
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
          Inside Our Bee Farm
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 font-serif">
          Madisonville Apiary &bull; Basking Ridge, NJ
        </p>
      </div>

      {/* Pure Staggered Masonry Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {BEE_FARM_PHOTOS.map((photo) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setSelected(photo)}
            className={`group relative block w-full mb-4 break-inside-avoid rounded-xl overflow-hidden bg-stone-100 cursor-pointer ${photo.aspectClass}`}
            aria-label={photo.alt}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-103 transition-transform duration-500"
            />
          </button>
        ))}
      </div>

      {/* Minimal Image-Only Lightbox */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="fixed top-5 right-5 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer z-20"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const idx = BEE_FARM_PHOTOS.findIndex((p) => p.id === selected.id);
              setSelected(
                BEE_FARM_PHOTOS[(idx - 1 + BEE_FARM_PHOTOS.length) % BEE_FARM_PHOTOS.length]
              );
            }}
            className="fixed left-4 sm:left-6 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer z-20"
            aria-label="Previous photo"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            className="relative w-full max-w-4xl h-[82vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected.src}
              alt={selected.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const idx = BEE_FARM_PHOTOS.findIndex((p) => p.id === selected.id);
              setSelected(BEE_FARM_PHOTOS[(idx + 1) % BEE_FARM_PHOTOS.length]);
            }}
            className="fixed right-4 sm:right-6 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer z-20"
            aria-label="Next photo"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}
