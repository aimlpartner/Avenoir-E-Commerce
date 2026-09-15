'use client';

import React, { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, 
  Droplets, 
  Shield, 
  ChevronDown, 
  ChevronRight, 
  Menu, 
  X, 
  Layers, 
  Gift, 
  Sparkles, 
  Wrench, 
  Compass, 
  CheckCircle2,
  SlidersHorizontal,
  GraduationCap,
  HeartHandshake
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/context/CartContext';
import { HONEY_SUBCATEGORIES, BEEKEEPING_SUBCATEGORIES, PRODUCTS } from '@/lib/products';

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();
  
  const [navDropdown, setNavDropdown] = useState<'honey' | 'beekeeping' | 'services' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<'honey' | 'beekeeping' | 'services' | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close sidebar on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleMouseEnter = (dept: 'honey' | 'beekeeping' | 'services') => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setNavDropdown(dept);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setNavDropdown(null);
    }, 180);
  };

  const honeyCount = PRODUCTS.filter(p => p.department === 'honey').length;
  const beekeepingCount = PRODUCTS.filter(p => p.department === 'beekeeping').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Identity - Left */}
        <Link 
          href="/" 
          prefetch={true}
          className="flex items-center cursor-pointer select-none group py-1"
          onClick={() => { setNavDropdown(null); setMobileMenuOpen(false); }}
        >
          <span className="font-serif text-2xl font-bold tracking-[0.18em] text-slate-900 group-hover:text-emerald-950 transition">
            AVENOIR
          </span>
        </Link>

        {/* Navigation Links - Center (With Dropdowns & Individual Page Links) */}
        <nav aria-label="Primary" className="hidden xl:flex items-center gap-2 shrink-0">
          
          {/* 1. Honey Products Dropdown */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter('honey')}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/honey"
              prefetch={true}
              onClick={() => setNavDropdown(null)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 ${
                pathname.startsWith('/honey') || navDropdown === 'honey'
                  ? 'bg-emerald-900 text-white shadow-xs' 
                  : 'text-slate-800 hover:text-emerald-950 hover:bg-slate-100'
              }`}
              aria-expanded={navDropdown === 'honey'}
              aria-haspopup="true"
            >
              <Droplets size={17} strokeWidth={2.4} className={pathname.startsWith('/honey') || navDropdown === 'honey' ? 'text-amber-400' : 'text-amber-600'} />
              <span className="text-[14px]">Honey Products</span>
              <ChevronDown 
                size={16} 
                strokeWidth={2.4}
                className={`transition-transform duration-200 ${navDropdown === 'honey' ? 'rotate-180 text-amber-300' : 'text-slate-400'}`} 
              />
            </Link>

            {/* Honey Dropdown Menu Panel */}
            <AnimatePresence>
              {navDropdown === 'honey' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl p-3 shadow-2xl border border-slate-200/90 z-50 text-left"
                >
                  <div className="px-3.5 pt-2 pb-1.5 text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                    Honey Categories
                  </div>

                  <div className="space-y-1">
                    {HONEY_SUBCATEGORIES.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/honey?sub=${sub.id}`}
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:text-emerald-950 hover:bg-emerald-50/70 transition group"
                      >
                        <span className="text-amber-600 group-hover:text-amber-700 transition shrink-0">
                          {sub.id === 'honey-raw' && <Droplets size={18} />}
                          {sub.id === 'honey-comb' && <Layers size={18} />}
                          {sub.id === 'honey-vaults' && <Gift size={18} />}
                          {sub.id === 'honey-infused' && <Sparkles size={18} />}
                        </span>
                        <span className="flex-1 leading-snug">{sub.name}</span>
                        <ChevronRight size={15} className="text-slate-300 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition" />
                      </Link>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <Link
                      href="/honey"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-emerald-900 bg-emerald-50/50 hover:bg-emerald-100/70 transition group"
                    >
                      <span>All Honey Products</span>
                      <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                        ({honeyCount}) &rarr;
                      </span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Beekeeping Products Dropdown */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter('beekeeping')}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/beekeeping"
              prefetch={true}
              onClick={() => setNavDropdown(null)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 ${
                pathname.startsWith('/beekeeping') || navDropdown === 'beekeeping'
                  ? 'bg-emerald-900 text-white shadow-xs' 
                  : 'text-slate-800 hover:text-emerald-950 hover:bg-slate-100'
              }`}
              aria-expanded={navDropdown === 'beekeeping'}
              aria-haspopup="true"
            >
              <Shield size={17} strokeWidth={2.4} className={pathname.startsWith('/beekeeping') || navDropdown === 'beekeeping' ? 'text-amber-400' : 'text-emerald-700'} />
              <span className="text-[14px]">Beekeeping Products</span>
              <ChevronDown 
                size={16} 
                strokeWidth={2.4}
                className={`transition-transform duration-200 ${navDropdown === 'beekeeping' ? 'rotate-180 text-amber-300' : 'text-slate-400'}`} 
              />
            </Link>

            {/* Beekeeping Dropdown Menu Panel */}
            <AnimatePresence>
              {navDropdown === 'beekeeping' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl p-3 shadow-2xl border border-slate-200/90 z-50 text-left"
                >
                  <div className="px-3.5 pt-2 pb-1.5 text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                    Apiary Equipment
                  </div>

                  <div className="space-y-1">
                    {BEEKEEPING_SUBCATEGORIES.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/beekeeping?sub=${sub.id}`}
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:text-emerald-950 hover:bg-emerald-50/70 transition group"
                      >
                        <span className="text-emerald-700 group-hover:text-emerald-800 transition shrink-0">
                          {sub.id === 'bee-apparel' && <Shield size={18} />}
                          {sub.id === 'bee-tools' && <Wrench size={18} />}
                          {sub.id === 'bee-hardware' && <Layers size={18} />}
                          {sub.id === 'bee-harvest' && <Compass size={18} />}
                        </span>
                        <span className="flex-1 leading-snug">{sub.name}</span>
                        <ChevronRight size={15} className="text-slate-300 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition" />
                      </Link>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <Link
                      href="/beekeeping"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-emerald-900 bg-emerald-50/50 hover:bg-emerald-100/70 transition group"
                    >
                      <span>All Beekeeping Supplies</span>
                      <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                        ({beekeepingCount}) &rarr;
                      </span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Services Dropdown (Educate, Bee Removal, Bee Keeping) */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/services"
              prefetch={true}
              onClick={() => setNavDropdown(null)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 ${
                pathname.startsWith('/services') || navDropdown === 'services'
                  ? 'bg-emerald-900 text-white shadow-xs' 
                  : 'text-slate-800 hover:text-emerald-950 hover:bg-slate-100'
              }`}
              aria-expanded={navDropdown === 'services'}
              aria-haspopup="true"
            >
              <Compass size={17} strokeWidth={2.4} className={pathname.startsWith('/services') || navDropdown === 'services' ? 'text-amber-400' : 'text-emerald-800'} />
              <span className="text-[14px]">Services</span>
              <ChevronDown 
                size={16} 
                strokeWidth={2.4}
                className={`transition-transform duration-200 ${navDropdown === 'services' ? 'rotate-180 text-amber-300' : 'text-slate-400'}`} 
              />
            </Link>

            {/* Services Dropdown Menu Panel */}
            <AnimatePresence>
              {navDropdown === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-84 bg-white rounded-2xl p-3 shadow-2xl border border-slate-200/90 z-50 text-left"
                >
                  <div className="px-3.5 pt-2 pb-1.5 text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                    Apiary Services
                  </div>

                  <div className="space-y-1">
                    {/* Educate */}
                    <Link
                      href="/services/educate"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="flex items-start gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:text-emerald-950 hover:bg-emerald-50/70 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-200 transition">
                        <GraduationCap size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 group-hover:text-emerald-950">Educate</span>
                          <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition" />
                        </div>
                        <p className="text-[11px] text-slate-500 font-normal leading-snug">
                          Academy &amp; field masterclasses
                        </p>
                      </div>
                    </Link>

                    {/* Bee Removal */}
                    <Link
                      href="/services/bee-removal"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="flex items-start gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:text-emerald-950 hover:bg-emerald-50/70 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-200 transition">
                        <HeartHandshake size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 group-hover:text-emerald-950">Bee Removal</span>
                          <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition" />
                        </div>
                        <p className="text-[11px] text-slate-500 font-normal leading-snug">
                          100% humane live swarm rescue
                        </p>
                      </div>
                    </Link>

                    {/* Bee Keeping */}
                    <Link
                      href="/services/beekeeping"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="flex items-start gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:text-emerald-950 hover:bg-emerald-50/70 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-900 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-100 transition">
                        <Wrench size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 group-hover:text-emerald-950">Bee Keeping</span>
                          <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition" />
                        </div>
                        <p className="text-[11px] text-slate-500 font-normal leading-snug">
                          Private estate hive stewardship
                        </p>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <Link
                      href="/services"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-emerald-900 bg-emerald-50/50 hover:bg-emerald-100/70 transition group"
                    >
                      <span>All Services Overview</span>
                      <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. Terroir Profiles Page */}
          <Link 
            href="/terroir"
            prefetch={true}
            className={`px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition cursor-pointer whitespace-nowrap shrink-0 ${
              pathname === '/terroir' 
                ? 'bg-emerald-900 text-white shadow-xs' 
                : 'text-slate-800 hover:text-emerald-950 hover:bg-slate-100'
            }`}
          >
            <span className="text-[14px]">Terroir Profiles</span>
          </Link>

          {/* 5. Corporate Gifting Page */}
          <Link 
            href="/corporate"
            prefetch={true}
            className={`px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition cursor-pointer whitespace-nowrap shrink-0 ${
              pathname === '/corporate' 
                ? 'bg-emerald-900 text-white shadow-xs' 
                : 'text-slate-800 hover:text-emerald-950 hover:bg-slate-100'
            }`}
          >
            <span className="text-[14px]">Corporate Gifting</span>
          </Link>
        </nav>

        {/* Right Actions & Bag Button */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Admin Atelier Portal Link */}
          <Link
            href="/admin"
            prefetch={true}
            className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer border ${
              pathname.startsWith('/admin')
                ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold shadow-2xs'
                : 'text-slate-700 hover:text-emerald-950 hover:bg-slate-100 border-slate-200/80'
            }`}
            title="Open Admin Management Atelier"
          >
            <SlidersHorizontal size={14} className={pathname.startsWith('/admin') ? 'text-amber-800' : 'text-slate-500'} />
            <span>Admin</span>
          </Link>

          {/* Shopping Bag Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold tracking-wide transition cursor-pointer shadow-sm active:scale-95 whitespace-nowrap shrink-0"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag size={15} className="text-amber-400" />
            <span className="hidden sm:inline">Bag</span>
            <span className="w-5 h-5 rounded-md bg-amber-400 text-emerald-950 font-bold text-[11px] flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="xl:hidden w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center cursor-pointer transition"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Slide-over Sidebar & Overlay (Mounted to body via Portal to prevent header stacking context issues) */}
      {isClient && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-[100] xl:hidden">
              {/* Dark Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[99] cursor-pointer"
                aria-hidden="true"
              />

              {/* Sidebar Panel from the RIGHT */}
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 280 }}
                aria-label="Mobile Navigation Sidebar"
                className="fixed inset-y-0 right-0 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-hidden z-[100] text-left border-l border-slate-200"
              >
                {/* Header */}
                <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
                  <Link
                    href="/"
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-2xl font-bold tracking-[0.18em] text-slate-900 select-none"
                  >
                    AVENOIR
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center cursor-pointer transition"
                    aria-label="Close Sidebar"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Scrollable Navigation Area */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {/* Apiary Atelier Subtitle */}
                  <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-900 px-1">
                    Sussex County Apiary Atelier
                  </p>

                  {/* 1. Honey Products Accordion Card */}
                  <div className="border border-amber-200/90 rounded-2xl p-3.5 bg-gradient-to-br from-amber-50/60 to-white space-y-2">
                    <button
                      onClick={() => setMobileAccordion(prev => prev === 'honey' ? null : 'honey')}
                      className="w-full flex items-center justify-between font-serif text-base font-bold text-slate-900 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                          <Droplets size={14} />
                        </div>
                        <span>Honey Products</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                          {honeyCount}
                        </span>
                        <ChevronDown size={16} className={`transition-transform duration-200 ${mobileAccordion === 'honey' ? 'rotate-180 text-amber-600' : 'text-slate-400'}`} />
                      </div>
                    </button>

                    {mobileAccordion === 'honey' && (
                      <div className="pt-3 border-t border-amber-200/60 space-y-2">
                        <Link
                          href="/honey"
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block w-full text-sm font-bold text-emerald-950 py-2.5 px-3.5 rounded-xl bg-amber-100/70 hover:bg-amber-200/70 transition"
                        >
                          → View Entire Honey Department ({honeyCount})
                        </Link>
                        {HONEY_SUBCATEGORIES.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/honey?sub=${sub.id}`}
                            prefetch={true}
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full text-sm font-medium text-slate-800 hover:text-emerald-950 py-2.5 px-3.5 rounded-xl hover:bg-amber-50 transition flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2.5">
                              {sub.id === 'honey-raw' && <Droplets size={16} className="text-amber-600" />}
                              {sub.id === 'honey-comb' && <Layers size={16} className="text-amber-600" />}
                              {sub.id === 'honey-vaults' && <Gift size={16} className="text-amber-600" />}
                              {sub.id === 'honey-infused' && <Sparkles size={16} className="text-amber-600" />}
                              <span>{sub.name}</span>
                            </div>
                            <span className="text-xs font-semibold text-slate-400">
                              {PRODUCTS.filter(p => p.subcategory === sub.id).length}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 2. Beekeeping Products Accordion Card */}
                  <div className="border border-emerald-200/90 rounded-2xl p-3.5 bg-gradient-to-br from-emerald-50/60 to-white space-y-2">
                    <button
                      onClick={() => setMobileAccordion(prev => prev === 'beekeeping' ? null : 'beekeeping')}
                      className="w-full flex items-center justify-between font-serif text-base font-bold text-slate-900 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                          <Shield size={16} />
                        </div>
                        <span className="text-[15px]">Beekeeping Gear</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                          {beekeepingCount}
                        </span>
                        <ChevronDown size={16} className={`transition-transform duration-200 ${mobileAccordion === 'beekeeping' ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} />
                      </div>
                    </button>

                    {mobileAccordion === 'beekeeping' && (
                      <div className="pt-3 border-t border-emerald-200/60 space-y-2">
                        <Link
                          href="/beekeeping"
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block w-full text-sm font-bold text-emerald-950 py-2.5 px-3.5 rounded-xl bg-emerald-100/70 hover:bg-emerald-200/70 transition"
                        >
                          → View Entire Apiary Department ({beekeepingCount})
                        </Link>
                        {BEEKEEPING_SUBCATEGORIES.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/beekeeping?sub=${sub.id}`}
                            prefetch={true}
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full text-sm font-medium text-slate-800 hover:text-emerald-950 py-2.5 px-3.5 rounded-xl hover:bg-emerald-50 transition flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2.5">
                              {sub.id === 'bee-apparel' && <Shield size={16} className="text-emerald-700" />}
                              {sub.id === 'bee-tools' && <Wrench size={16} className="text-emerald-700" />}
                              {sub.id === 'bee-hardware' && <Layers size={16} className="text-emerald-700" />}
                              {sub.id === 'bee-harvest' && <Compass size={16} className="text-emerald-700" />}
                              <span>{sub.name}</span>
                            </div>
                            <span className="text-xs font-semibold text-slate-400">
                              {PRODUCTS.filter(p => p.subcategory === sub.id).length}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3. Services Accordion Card */}
                  <div className="border border-sky-200/90 rounded-2xl p-3.5 bg-gradient-to-br from-sky-50/60 to-white space-y-2">
                    <button
                      onClick={() => setMobileAccordion(prev => prev === 'services' ? null : 'services')}
                      className="w-full flex items-center justify-between font-serif text-base font-bold text-slate-900 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-900 flex items-center justify-center">
                          <Compass size={16} />
                        </div>
                        <span className="text-[15px]">Sussex Apiary Services</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-sky-100 text-sky-900">
                          3 Disciplines
                        </span>
                        <ChevronDown size={16} className={`transition-transform duration-200 ${mobileAccordion === 'services' ? 'rotate-180 text-sky-600' : 'text-slate-400'}`} />
                      </div>
                    </button>

                    {mobileAccordion === 'services' && (
                      <div className="pt-3 border-t border-sky-200/60 space-y-2">
                        <Link
                          href="/services"
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block w-full text-sm font-bold text-sky-950 py-2.5 px-3.5 rounded-xl bg-sky-100/70 hover:bg-sky-200/70 transition"
                        >
                          → View Overview & Portfolio
                        </Link>
                        
                        <Link
                          href="/services/educate"
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full text-sm font-medium text-slate-800 hover:text-sky-950 py-2.5 px-3.5 rounded-xl hover:bg-sky-50 transition flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <GraduationCap size={16} className="text-amber-600" />
                            <div>
                              <p className="font-semibold text-slate-900 leading-snug">Educate</p>
                              <p className="text-[11px] text-slate-500">Apiary Academy & Workshops</p>
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-slate-400" />
                        </Link>

                        <Link
                          href="/services/bee-removal"
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full text-sm font-medium text-slate-800 hover:text-sky-950 py-2.5 px-3.5 rounded-xl hover:bg-sky-50 transition flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <HeartHandshake size={16} className="text-emerald-700" />
                            <div>
                              <p className="font-semibold text-slate-900 leading-snug">Bee Removal</p>
                              <p className="text-[11px] text-slate-500">100% Humane Live Rescue</p>
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-slate-400" />
                        </Link>

                        <Link
                          href="/services/beekeeping"
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full text-sm font-medium text-slate-800 hover:text-sky-950 py-2.5 px-3.5 rounded-xl hover:bg-sky-50 transition flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <Sparkles size={16} className="text-sky-700" />
                            <div>
                              <p className="font-semibold text-slate-900 leading-snug">Bee Keeping</p>
                              <p className="text-[11px] text-slate-500">Estate Apiary Stewardship</p>
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-slate-400" />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Additional Destination Links */}
                  <div className="space-y-2 pt-1">
                    <Link
                      href="/terroir"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full py-3.5 px-4 rounded-2xl text-sm font-semibold flex items-center justify-between transition ${
                        pathname === '/terroir'
                          ? 'bg-emerald-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Compass size={16} className={pathname === '/terroir' ? 'text-amber-400' : 'text-slate-600'} />
                        <span>Botanical Terroir Profiles</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </Link>

                    <Link
                      href="/corporate"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full py-3.5 px-4 rounded-2xl text-sm font-semibold flex items-center justify-between transition ${
                        pathname === '/corporate'
                          ? 'bg-emerald-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles size={16} className={pathname === '/corporate' ? 'text-amber-400' : 'text-slate-600'} />
                        <span>Corporate Gifting & Concierge</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </Link>
                  </div>
                </div>

                {/* Sidebar Footer with Bag Action */}
                <div className="p-5 border-t border-slate-200 bg-slate-50/80 space-y-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="w-full py-3.5 px-5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-between shadow-sm cursor-pointer transition active:scale-98"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShoppingBag size={16} className="text-amber-400" />
                      <span>View Shopping Bag</span>
                    </div>
                    <span className="w-6 h-6 rounded-md bg-amber-400 text-emerald-950 font-extrabold text-xs flex items-center justify-center">
                      {cartCount}
                    </span>
                  </button>

                  <Link
                    href="/admin"
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-100 hover:bg-amber-200/80 text-amber-950 text-xs font-bold flex items-center justify-center gap-2 border border-amber-300 transition"
                  >
                    <SlidersHorizontal size={15} className="text-amber-800" />
                    <span>Admin Management Atelier</span>
                  </Link>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 font-medium">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-emerald-600" />
                      Insured Courier Shipping
                    </span>
                    <span>100% Raw Certified</span>
                  </div>
                </div>

              </motion.aside>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </header>
  );
}
