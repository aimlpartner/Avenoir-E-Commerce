'use client';

import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'navbar' | 'compact' | 'pill' | 'seal' | 'mark' | 'card';
  theme?: 'light' | 'dark';
  className?: string;
}

export default function BrandLogo({
  variant = 'navbar',
  theme = 'light',
  className = '',
}: BrandLogoProps) {
  if (variant === 'mark') {
    return (
      <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <Image
          src="/media/brand/singing-bee-mark.png"
          alt="Singing Bee Wildflower Honey"
          width={36}
          height={36}
          className="w-full h-full object-contain drop-shadow-xs"
        />
      </span>
    );
  }

  if (variant === 'seal') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-full bg-white/95 p-1.5 border-2 border-[#FB5601]/80 shadow-lg backdrop-blur-xs shrink-0 ${className}`}
        title="Singing Bee Wildflower Honey"
      >
        <div className="relative w-14 h-16 sm:w-16 sm:h-[70px]">
          <Image
            src="/media/brand/singing-bee-logo.png"
            alt="Singing Bee Wildflower Honey"
            fill
            sizes="72px"
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-xl bg-white p-3 sm:p-4 border border-[#FB5601]/30 shadow-md shrink-0 ${className}`}
      >
        <div className="relative w-24 h-28 sm:w-28 sm:h-32">
          <Image
            src="/media/brand/singing-bee-logo.png"
            alt="Singing Bee Wildflower Honey"
            fill
            sizes="120px"
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-xl px-3 py-1.5 border shadow-sm shrink-0 ${
          theme === 'dark'
            ? 'bg-white border-[#FB5601]/40'
            : 'bg-white border-[#FB5601]/30'
        } ${className}`}
      >
        <div className="relative w-14 h-16">
          <Image
            src="/media/brand/singing-bee-logo.png"
            alt="Singing Bee Wildflower Honey"
            fill
            sizes="64px"
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className={`inline-flex items-center justify-center shrink-0 ${
          theme === 'dark' ? 'bg-white rounded-lg px-2 py-1 border border-[#FB5601]/30' : ''
        } ${className}`}
      >
        <div className="relative w-12 h-14 shrink-0">
          <Image
            src="/media/brand/singing-bee-logo.png"
            alt="Singing Bee Wildflower Honey"
            fill
            sizes="56px"
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  // Default: 'navbar' — pure crisp full logo, zero duplicate text
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
        theme === 'dark' ? 'bg-white rounded-lg px-2 py-1 shadow-sm' : ''
      } ${className}`}
    >
      <div className="relative w-14 h-16 sm:w-16 sm:h-[72px] shrink-0">
        <Image
          src="/media/brand/singing-bee-logo.png"
          alt="Singing Bee Wildflower Honey"
          fill
          priority
          sizes="72px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
