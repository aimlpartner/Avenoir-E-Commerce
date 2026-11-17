'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Play,
  Pause,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Video,
} from 'lucide-react';
import { APIARY_VIDEO_CLIPS, ApiaryVideoClip } from '@/lib/apiaryVideos';
import BrandLogo from '@/components/BrandLogo';

interface ApiaryProofSectionProps {
  id?: string;
  compact?: boolean;
  clips?: ApiaryVideoClip[];
  heading?: string;
  subheading?: string;
}

export default function ApiaryProofSection({
  id = 'apiary-proof',
  compact = false,
  clips = APIARY_VIDEO_CLIPS,
  heading = 'Real Hives. Zero Stock.',
  subheading = 'Unedited footage from inside our bee yards.',
}: ApiaryProofSectionProps) {
  const [isPlayingAll, setIsPlayingAll] = useState(true);
  const [activeClip, setActiveClip] = useState<ApiaryVideoClip | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((vid) => {
      if (!vid) return;
      if (isPlayingAll) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [isPlayingAll]);

  useEffect(() => {
    if (!activeClip) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveClip(null);
      if (e.key === 'ArrowRight') {
        const idx = clips.findIndex((c) => c.id === activeClip.id);
        setActiveClip(clips[(idx + 1) % clips.length]);
      }
      if (e.key === 'ArrowLeft') {
        const idx = clips.findIndex((c) => c.id === activeClip.id);
        setActiveClip(clips[(idx - 1 + clips.length) % clips.length]);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeClip, clips]);

  const scrollTrack = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const distance = direction === 'left' ? -340 : 340;
    trackRef.current.scrollBy({ left: distance, behavior: 'smooth' });
  };

  return (
    <section
      id={id}
      className={`${
        compact ? 'py-10 sm:py-12' : 'py-14 sm:py-20'
      } bg-[#FAF7F2] border-y border-stone-200/80 scroll-mt-24 text-left overflow-hidden`}
    >
      <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 2xl:px-16 space-y-8">
        
        {/* Clean Minimal Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-stone-200">
          <div className="space-y-1.5">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
              {heading}
            </h2>
            <p className="text-sm sm:text-base text-stone-500 font-serif">
              {subheading}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsPlayingAll((prev) => !prev)}
              className="px-3.5 py-2 rounded-lg border border-stone-300 bg-white hover:border-[#FB5601] text-stone-800 hover:text-[#D64500] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              {isPlayingAll ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlayingAll ? 'Pause' : 'Play'}</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTrack('left')}
              className="w-9 h-9 rounded-full border border-stone-300 bg-white hover:border-[#FB5601] text-stone-700 hover:text-[#D64500] flex items-center justify-center transition cursor-pointer"
              aria-label="Scroll clips left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack('right')}
              className="w-9 h-9 rounded-full border border-stone-300 bg-white hover:border-[#FB5601] text-stone-700 hover:text-[#D64500] flex items-center justify-center transition cursor-pointer"
              aria-label="Scroll clips right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Side-by-Side Live Apiary Video Strip (Visual First, Minimal Caption) */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 scrollbar-none"
        >
          {clips.map((clip, index) => (
            <article
              key={clip.id}
              onClick={() => setActiveClip(clip)}
              className="group relative w-[235px] sm:w-[265px] lg:w-[280px] shrink-0 snap-start rounded-2xl overflow-hidden bg-stone-950 border border-stone-200 hover:border-[#FB5601] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden bg-stone-900">
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={clip.videoUrl}
                  poster={clip.posterUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />

                {/* Top tag + Singing Bee seal */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FB5601]" />
                    <span>{clip.tag}</span>
                  </span>

                  <div className="w-7 h-7 rounded-full bg-white/95 p-0.5 border border-[#FB5601]/60 shadow-sm shrink-0">
                    <Image
                      src="/media/brand/singing-bee-mark.png"
                      alt="Singing Bee"
                      width={24}
                      height={24}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Ultra-clean single-line bottom overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3.5 pt-8 bg-gradient-to-t from-black/85 via-black/35 to-transparent text-white flex items-end justify-between gap-2">
                  <h3 className="font-serif text-base font-normal text-white leading-tight truncate">
                    {clip.title}
                  </h3>
                  <span className="w-7 h-7 rounded-full bg-white/15 group-hover:bg-[#FB5601] text-white flex items-center justify-center transition-colors shrink-0">
                    <Maximize2 size={12} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Compact 3-Pill Proof Bar */}
        {!compact && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="rounded-xl bg-white border border-stone-200/90 p-4 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#FFF4ED] border border-[#FB5601]/30 flex items-center justify-center shrink-0 p-1.5">
                <Image
                  src="/media/brand/singing-bee-mark.png"
                  alt="Singing Bee"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-stone-900">Single-Apiary Pure</h4>
                <p className="text-xs text-stone-500">Zero bulk blending or imported syrup.</p>
              </div>
            </div>

            <div className="rounded-xl bg-white border border-stone-200/90 p-4 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#FFF4ED] border border-[#FB5601]/30 text-[#D64500] flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-stone-900">Raw &amp; Unheated</h4>
                <p className="text-xs text-stone-500">Cold-spun below 95&deg;F hive warmth.</p>
              </div>
            </div>

            <Link
              href="/terroir"
              prefetch={true}
              className="rounded-xl bg-[#15231A] hover:bg-[#1E3326] border border-[#24392C] p-4 flex items-center justify-between gap-3 text-white transition group"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FB5601] block">Batch Lab Data</span>
                <h4 className="font-serif text-sm font-normal text-white flex items-center gap-1.5 mt-0.5">
                  <span>Inspect Live Terroir</span>
                  <ArrowRight size={13} className="text-[#FB5601] group-hover:translate-x-1 transition-transform" />
                </h4>
              </div>
              <BrandLogo variant="seal" className="scale-90" />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Video Modal */}
      {activeClip && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeClip.title}
          className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveClip(null)}
        >
          <div
            className="bg-stone-900 border border-stone-700 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:col-span-7 bg-black flex items-center justify-center relative">
              <video
                key={activeClip.id}
                src={activeClip.videoUrl}
                poster={activeClip.posterUrl}
                controls
                autoPlay
                loop
                playsInline
                className="w-full max-h-[75vh] object-contain"
              />
            </div>

            <div className="md:col-span-5 p-6 flex flex-col justify-between text-white space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#FB5601] font-semibold">
                    <Video size={13} />
                    <span>{activeClip.timestampRange}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveClip(null)}
                    className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                    aria-label="Close video modal"
                  >
                    <X size={16} />
                  </button>
                </div>

                <BrandLogo variant="pill" theme="dark" />

                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl font-normal text-white">
                    {activeClip.title}
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed font-serif">
                    {activeClip.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-800">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const idx = clips.findIndex((c) => c.id === activeClip.id);
                      setActiveClip(clips[(idx - 1 + clips.length) % clips.length]);
                    }}
                    className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const idx = clips.findIndex((c) => c.id === activeClip.id);
                      setActiveClip(clips[(idx + 1) % clips.length]);
                    }}
                    className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <Link
                  href="/honey"
                  onClick={() => setActiveClip(null)}
                  className="w-full py-3 px-4 rounded-lg bg-[#FB5601] hover:bg-[#D64500] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <Sparkles size={14} />
                  <span>Shop Wildflower Honey</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
