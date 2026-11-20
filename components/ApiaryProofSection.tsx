'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { APIARY_VIDEO_CLIPS, ApiaryVideoClip } from '@/lib/apiaryVideos';

interface ApiaryProofSectionProps {
  id?: string;
  clips?: ApiaryVideoClip[];
}

export default function ApiaryProofSection({
  id = 'apiary-proof',
  clips = APIARY_VIDEO_CLIPS,
}: ApiaryProofSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -320 : 320,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id={id}
      className="py-14 sm:py-20 bg-[#FDF9E4] border-y border-[#E6DFC5] scroll-mt-24 text-left overflow-hidden"
    >
      <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 space-y-8">
        <div className="flex items-end justify-between gap-4 pb-5 border-b border-[#E5DDBB]">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
              From Our Hives
            </h2>
            <p className="text-sm text-stone-600 font-serif mt-1">
              Madisonville Apiary &bull; Basking Ridge, NJ
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollTrack('left')}
              className="w-9 h-9 rounded-full border border-[#D8CEF4] bg-white hover:border-[#8B6FE0] text-stone-700 hover:text-[#7A5CD6] flex items-center justify-center transition cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack('right')}
              className="w-9 h-9 rounded-full border border-[#D8CEF4] bg-white hover:border-[#8B6FE0] text-stone-700 hover:text-[#7A5CD6] flex items-center justify-center transition cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Clean Side-by-Side Looping Video Strip */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 scrollbar-none"
        >
          {clips.map((clip) => (
            <div
              key={clip.id}
              className="relative w-[235px] sm:w-[265px] lg:w-[280px] shrink-0 snap-start rounded-2xl overflow-hidden bg-stone-900 border border-stone-200"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden">
                <video
                  src={clip.videoUrl}
                  poster={clip.posterUrl}
                  aria-label={clip.alt}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
