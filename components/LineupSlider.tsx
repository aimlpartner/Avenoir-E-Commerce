'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface SlideItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  images: { src: string; alt: string; position?: string }[];
}

const SLIDES: SlideItem[] = [
  {
    id: 'lineup',
    tag: 'Complete Collection',
    title: 'Raw Wildflower Honey, Every Size & Occasion',
    subtitle:
      '1/2 lb & 1 lb jars, 3-jar combos, kids bear bottles, holiday boxes, event favors, and corporate glass.',
    ctaLabel: 'Explore All Products',
    ctaHref: '/shop',
    images: [
      {
        src: '/media/products/beeproduct_allkinds_banner.jpeg',
        alt: 'Singing Bee Wildflower Honey full lineup',
        position: 'object-[50%_84%]',
      },
    ],
  },
  {
    id: 'holiday',
    tag: 'Seasonal Gifting',
    title: 'Holiday Special Editions',
    subtitle:
      'Thanksgiving, Christmas, and New Year honey jars dressed with festive ribbon and tags.',
    ctaLabel: 'Shop Holiday Boxes',
    ctaHref: '/products/SB-HOLIDAY-BOX',
    images: [
      {
        src: '/media/products/beeproduct_holidayedition4.jpeg',
        alt: 'Thanksgiving, Christmas, and New Year honey jars',
        position: 'object-[50%_58%]',
      },
    ],
  },
  {
    id: 'favors',
    tag: 'Celebrations',
    title: 'Wedding, Party & Event Favors',
    subtitle: 'Mini hexagon honey jars with wooden dippers and personalized guest tags.',
    ctaLabel: 'Shop Favor Gifts',
    ctaHref: '/products/SB-FAVOR-GIFTS',
    images: [
      {
        src: '/media/products/beeproduct_favorgifting.jpeg',
        alt: 'Mini honey favor jars with wooden dippers and tags',
        position: 'object-[50%_68%]',
      },
    ],
  },
  {
    id: 'jars',
    tag: 'Madisonville Apiary',
    title: '1/2 lb & 1 lb Everyday Jars',
    subtitle:
      'Harvested in Basking Ridge, NJ. Available as single jars or 3-jar family combos.',
    ctaLabel: 'Shop Jars',
    ctaHref: '/products/SB-JAR-SINGLE',
    images: [
      {
        src: '/media/products/beeproduct_0.5lbs.jpeg',
        alt: '1/2 lb Singing Bee Honey jars',
        position: 'object-[50%_72%]',
      },
      {
        src: '/media/products/beeproduct_1lbs.jpeg',
        alt: '1 lb Singing Bee Honey jars',
        position: 'object-[50%_72%]',
      },
    ],
  },
];

export default function LineupSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-[#E6DFC5] bg-gradient-to-br from-[#FDF9E4] via-[#FAF8F1] to-[#F3EEFC]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top 3-Color Botanical Accent Line (Lavender · Honey Yellow · Leaf Green) */}
      <div className="h-1 w-full bg-gradient-to-r from-[#A890E4] via-[#F0E454] to-[#78B448]" />

      {/* Sliding Track */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className="w-full shrink-0 grid grid-cols-1 lg:grid-cols-12 text-stone-900"
          >
            {/* Left Copy Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 pb-16 lg:pb-18 flex flex-col justify-center gap-4 text-left order-2 lg:order-1">
              <div className="space-y-2.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5B8E33]">
                  <span className="w-2 h-2 rounded-full bg-[#78B448]" />
                  <span>{slide.tag}</span>
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight leading-tight text-stone-900">
                  {slide.title}
                </h2>
                <p className="text-sm leading-relaxed max-w-md text-stone-600">
                  {slide.subtitle}
                </p>
              </div>

              <div className="pt-1">
                <Link
                  href={slide.ctaHref}
                  prefetch={true}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#8B6FE0] hover:bg-[#7A5CD6] text-white text-xs font-semibold uppercase tracking-wider transition shadow-xs"
                >
                  <span>{slide.ctaLabel}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Visual Stage */}
            <div className="lg:col-span-7 relative h-[240px] sm:h-[310px] lg:h-[380px] overflow-hidden order-1 lg:order-2">
              {slide.images.length === 1 ? (
                <Image
                  src={slide.images[0].src}
                  alt={slide.images[0].alt}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className={`object-cover ${slide.images[0].position || 'object-center'}`}
                />
              ) : (
                <div className="grid grid-cols-2 w-full h-full gap-0.5 bg-[#E6DFC5]">
                  {slide.images.map((img) => (
                    <div key={img.src} className="relative w-full h-full overflow-hidden">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 1024px) 50vw, 30vw"
                        className={`object-cover ${img.position || 'object-center'}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-4 left-6 right-6 lg:right-auto lg:left-10 lg:w-[calc(41.666%-5rem)] flex items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-1.5">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === activeIndex
                  ? 'w-6 bg-[#8B6FE0]'
                  : 'w-2 bg-[#C8BCEB] hover:bg-[#A890E4]'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-8 h-8 rounded-full border border-[#D8CEF4] bg-white/90 hover:border-[#8B6FE0] text-stone-700 hover:text-[#7A5CD6] flex items-center justify-center transition cursor-pointer"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-8 h-8 rounded-full border border-[#D8CEF4] bg-white/90 hover:border-[#8B6FE0] text-stone-700 hover:text-[#7A5CD6] flex items-center justify-center transition cursor-pointer"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
