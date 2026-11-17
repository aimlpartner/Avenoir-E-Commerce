'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

export interface BeeFarmPhoto {
  id: string;
  src: string;
  title: string;
  aspectClass: string;
}

export const BEE_FARM_PHOTOS: BeeFarmPhoto[] = [
  {
    id: 'sunset-hives',
    src: '/media/apiary/photos/sunset-hives-row.jpeg',
    title: 'Sunset Row · Four Active Hives',
    aspectClass: 'aspect-4/3',
  },
  {
    id: 'glass-top-hive',
    src: '/media/apiary/photos/glass-top-hive.jpeg',
    title: 'Observation Cover & Golden Frames',
    aspectClass: 'aspect-3/4',
  },
  {
    id: 'smoker-inspection',
    src: '/media/apiary/photos/smoker-inspection.jpeg',
    title: 'Morning Smoker & Hive Check',
    aspectClass: 'aspect-3/4',
  },
  {
    id: 'frame-comb-bees',
    src: '/media/apiary/photos/frame-inspection-closeup.jpg',
    title: 'Live Honeybees on Comb Frame',
    aspectClass: 'aspect-square',
  },
  {
    id: 'brood-pointing',
    src: '/media/apiary/photos/brood-frame-pointing.jpg',
    title: 'Brood & Capped Honey Audit',
    aspectClass: 'aspect-square',
  },
  {
    id: 'spring-apiary-yard',
    src: '/media/apiary/photos/spring-yard-nuc.jpeg',
    title: 'Spring Sanctuary Yard & Nuc',
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
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <BrandLogo variant="mark" className="w-5 h-5" />
            <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-[#D64500] uppercase">
              Madisonville Apiary
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
            Inside Our Bee Farm
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 font-serif">
          Basking Ridge, NJ &bull; Real Yard Photos
        </p>
      </div>

      {/* True Staggered Masonry Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {BEE_FARM_PHOTOS.map((photo) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setSelected(photo)}
            className={`group relative block w-full mb-4 break-inside-avoid rounded-xl overflow-hidden bg-stone-100 cursor-pointer text-left ${photo.aspectClass}`}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-103 transition-transform duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 pt-10 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end justify-between gap-2">
              <span className="font-serif text-xs sm:text-sm text-white line-clamp-1">
                {photo.title}
              </span>
              <span className="w-7 h-7 rounded-full bg-white/15 group-hover:bg-[#FB5601] text-white flex items-center justify-center transition shrink-0">
                <Maximize2 size={11} />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 border border-stone-700 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh] bg-black">
              <Image
                src={selected.src}
                alt={selected.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div className="p-4 flex items-center justify-between gap-4 bg-stone-900 text-white border-t border-stone-800">
              <div className="flex items-center gap-3">
                <BrandLogo variant="mark" className="w-7 h-7" />
                <span className="font-serif text-sm sm:text-base">{selected.title}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const idx = BEE_FARM_PHOTOS.findIndex((p) => p.id === selected.id);
                    setSelected(BEE_FARM_PHOTOS[(idx - 1 + BEE_FARM_PHOTOS.length) % BEE_FARM_PHOTOS.length]);
                  }}
                  className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const idx = BEE_FARM_PHOTOS.findIndex((p) => p.id === selected.id);
                    setSelected(BEE_FARM_PHOTOS[(idx + 1) % BEE_FARM_PHOTOS.length]);
                  }}
                  className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="w-9 h-9 rounded-lg bg-[#FB5601] hover:bg-[#D64500] flex items-center justify-center transition cursor-pointer"
                  aria-label="Close photo"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
