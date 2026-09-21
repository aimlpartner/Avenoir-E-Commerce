'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  X, 
  Mail, 
  CheckCircle2, 
  Gift, 
  BookOpen, 
  Award,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FirstOrderValueModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already seen or dismissed the welcome offer
    const hasSeenModal = localStorage.getItem('maison_harvest_club_seen');
    if (!hasSeenModal) {
      // Gentle delayed reveal after 3.5 seconds
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl border border-amber-200/90 shadow-2xl overflow-hidden z-10 text-left"
            role="dialog"
            aria-modal="true"
            aria-labelledby="harvest-club-title"
          >
            {/* Top Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X size={17} />
            </button>

            {/* Header Ornament */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-7 relative overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px]" />
              
              <div className="relative space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/90 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-widest">
                  <Sparkles size={12} className="text-amber-400" />
                  <span>Founding Harvest Club &bull; Est. 2026</span>
                </div>
                
                <h3 id="harvest-club-title" className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                  Welcome to the Harvest
                </h3>
                
                <p className="text-xs sm:text-sm text-emerald-100/90 font-serif leading-relaxed">
                  We believe exceptional terroir is honored with enduring craftsmanship, not generic discount codes. Receive genuine value-adds on your first order.
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-7 space-y-6">
              
              {/* 4 Value-Add Pillars */}
              <div className="space-y-3">
                
                {/* Pillar 1: Tasting Card & Seasonal Recipe */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-amber-200/60 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen size={16} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-sm font-bold text-slate-900 leading-snug">
                      Complimentary Tasting Card &amp; Seasonal Recipe
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                      Receive an embossed Sussex botanical pairing card and seasonal chef recipe slipped inside your first package.
                    </p>
                  </div>
                </div>

                {/* Pillar 2: Free Gift Note & Wrapping Threshold */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-amber-200/60 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Gift size={16} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-sm font-bold text-slate-900 leading-snug">
                      Free Gift Note &amp; Gift-Ready Linen Wrapping
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                      Unlocked automatically on any order over $75. Hand-sealed with hot apiary beeswax.
                    </p>
                  </div>
                </div>

                {/* Pillar 3: First Access to Limited Batches */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-amber-200/60 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-950 flex items-center justify-center shrink-0 mt-0.5">
                    <Award size={16} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-sm font-bold text-slate-900 leading-snug">
                      Founding Harvest Club Allocation
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                      Priority access to single-apiary limited batch reserve drops before public release.
                    </p>
                  </div>
                </div>

                {/* Pillar 4: Launch Week Exclusive Sampler */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-gradient-to-r from-amber-50/80 to-stone-50 border border-amber-300/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-950 flex items-center justify-center shrink-0 mt-0.5 font-serif font-black text-xs">
                    3x
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-sm font-bold text-slate-900 leading-snug">
                        &ldquo;Three Jars, One Harvest Story&rdquo; Sampler
                      </h4>
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-300 text-amber-950">
                        Launch Week
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                      Exclusive 3-jar provenance flight available only to email subscribers.
                    </p>
                  </div>
                </div>

              </div>

              {/* Action Form or Success Confirmation */}
              {isSubmitted ? (
                <div className="p-4 rounded-2xl bg-emerald-950 text-white border border-amber-400 space-y-2 text-center animate-in fade-in duration-300">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-amber-400 text-emerald-950 mx-auto">
                    <CheckCircle2 size={20} strokeWidth={2.5} />
                  </div>
                  <h4 className="font-serif text-base font-bold text-white">
                    Welcome to the Founding Harvest Club
                  </h4>
                  <p className="text-xs text-emerald-100/90 leading-relaxed">
                    Your complimentary tasting card and seasonal recipe will be automatically added to your first harvest dispatch.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/gifting"
                      onClick={handleClose}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-emerald-950 text-xs font-bold hover:bg-amber-300 transition"
                    >
                      <span>Explore Harvest Sets</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email for harvest gift..."
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-900 transition shadow-2xs placeholder:text-slate-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold tracking-wide transition shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      Claim First-Order Gift
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                    <span>No discount spam &bull; Pure harvest provenance</span>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="text-slate-500 hover:text-slate-700 underline cursor-pointer"
                    >
                      Maybe later
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
