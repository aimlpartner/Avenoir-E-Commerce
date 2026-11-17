'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, X, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BrandLogo from '@/components/BrandLogo';

export default function FirstOrderValueModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('maison_harvest_club_seen');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('maison_harvest_club_seen', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      localStorage.setItem('maison_harvest_club_seen', 'true');
      localStorage.setItem('maison_harvest_club_member', 'true');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-stone-950/65 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-2xl border border-stone-200 shadow-2xl overflow-hidden z-10 text-left"
            role="dialog"
            aria-modal="true"
            aria-labelledby="harvest-club-title"
          >
            <button
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 flex items-center justify-center transition cursor-pointer z-20 shadow-xs"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            {/* Visual Header with Real Product Cutout + Logo */}
            <div className="bg-[#142118] text-white px-6 py-6 relative overflow-hidden border-b border-[#223528] flex items-center justify-between gap-4">
              <div className="space-y-2.5 flex-1">
                <BrandLogo variant="pill" theme="dark" />
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-widest text-[#FB5601]">
                  <Sparkles size={12} />
                  <span>First Order Perks</span>
                </div>
                <h3 id="harvest-club-title" className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                  Taste It Raw.
                </h3>
                <p className="text-xs text-stone-300">
                  Free tasting card + wax-sealed gift wrap over $75.
                </p>
              </div>

              <div className="relative w-24 h-36 shrink-0 drop-shadow-xl">
                <Image
                  src="/media/products/singing-bee-bottle.png"
                  alt="Singing Bee Wildflower Honey"
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Compact Body */}
            <div className="p-6 space-y-5">
              {/* 3 Short Visual Perks Pills */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-[#FFF8F3] border border-[#FB5601]/25">
                  <span className="text-[11px] font-bold text-stone-900 block">Tasting Card</span>
                  <span className="text-[10px] text-[#D64500] font-mono">Free</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FFF8F3] border border-[#FB5601]/25">
                  <span className="text-[11px] font-bold text-stone-900 block">Gift Wrap</span>
                  <span className="text-[10px] text-[#D64500] font-mono">$75+</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FFF8F3] border border-[#FB5601]/25">
                  <span className="text-[11px] font-bold text-stone-900 block">Batch Drops</span>
                  <span className="text-[10px] text-[#D64500] font-mono">Priority</span>
                </div>
              </div>

              {isSubmitted ? (
                <div className="p-4 rounded-xl bg-[#142118] text-white border border-[#FB5601] space-y-2 text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FB5601] text-white mx-auto">
                    <CheckCircle2 size={18} />
                  </div>
                  <h4 className="font-serif text-base font-bold text-white">You&apos;re In</h4>
                  <Link
                    href="/honey"
                    onClick={handleClose}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#FB5601] text-white text-xs font-bold hover:bg-[#D64500] transition"
                  >
                    <span>Shop Honey</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email..."
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#FB5601] focus:border-[#FB5601]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-lg bg-[#FB5601] hover:bg-[#D64500] text-white text-xs font-bold tracking-wide transition cursor-pointer whitespace-nowrap"
                    >
                      Join Club
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="text-[11px] text-stone-400 hover:text-stone-700 underline cursor-pointer"
                    >
                      No thanks
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
