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
  Sliders,
  GraduationCap,
  HeartHandshake,
  Store,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/context/CartContext';
import { HONEY_SUBCATEGORIES, BEEKEEPING_SUBCATEGORIES, PRODUCTS } from '@/lib/products';

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();
  
  const [navDropdown, setNavDropdown] = useState<'shop' | 'services' | null>(null);
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

  const handleMouseEnter = (dept: 'shop' | 'services') => {
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

  const totalCount = PRODUCTS.length;
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
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.14em] text-slate-900 group-hover:text-emerald-950 transition">
            MAISON AVENOIR
          </span>
        </Link>

        {/* Navigation Links - Center (Streamlined: Shop ∨, Build Your Box, Services ∨, Corporate) */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
          
          {/* 1. Shop Dropdown */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter('shop')}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/shop"
              prefetch={true}
              onClick={() => setNavDropdown(null)}
              className={`px-3.5 xl:px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 ${
                pathname.startsWith('/shop') || pathname.startsWith('/honey') || pathname.startsWith('/beekeeping') || navDropdown === 'shop'
                  ? 'bg-[#15231A] text-white shadow-xs' 
                  : 'text-stone-800 hover:text-stone-950 hover:bg-stone-100/80'
              }`}
              aria-expanded={navDropdown === 'shop'}
              aria-haspopup="true"
            >
              <Store size={16} strokeWidth={2.2} className={pathname.startsWith('/shop') || pathname.startsWith('/honey') || pathname.startsWith('/beekeeping') || navDropdown === 'shop' ? 'text-[#C5A265]' : 'text-[#8C6B28]'} />
              <span className="text-[14px]">Shop</span>
              <ChevronDown 
                size={15} 
                strokeWidth={2.2}
                className={`transition-transform duration-200 ${navDropdown === 'shop' ? 'rotate-180 text-[#C5A265]' : 'text-stone-400'}`} 
              />
            </Link>

            {/* Shop Mega Dropdown Menu Panel */}
            <AnimatePresence>
              {navDropdown === 'shop' && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.99 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg p-3 shadow-xl border border-stone-200/90 z-50 text-left"
                >
                  <div className="flex items-center justify-between px-2 pb-2.5 border-b border-stone-100 mb-2">
                    <span className="text-[11px] font-bold tracking-wider text-stone-500 uppercase">
                      Apiary Catalogue
                    </span>
                    <Link
                      href="/shop"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="text-xs font-semibold text-[#15231A] hover:text-[#2A4433] flex items-center gap-1"
                    >
                      <span>All Items ({totalCount})</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>

                  <div className="space-y-1">
                    {/* Build Your Own Box - Highlighted */}
                    <Link
                      href="/gifting"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="flex items-center gap-3 p-2.5 rounded-md bg-stone-50 hover:bg-stone-100 border border-stone-200 transition group"
                    >
                      <div className="w-8 h-8 rounded-md bg-stone-100 text-[#8C6B28] flex items-center justify-center shrink-0">
                        <Gift size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 group-hover:text-[#15231A] text-sm">Build Your Own Box</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-xs bg-stone-900 text-[#E8D7B5]">Save 25%</span>
                        </div>
                        <p className="text-[11px] text-stone-600 font-normal">Custom 3, 6, or 12-jar stack &amp; wax note</p>
                      </div>
                    </Link>

                    {/* Honey Products */}
                    <Link
                      href="/honey"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="flex items-center gap-3 p-2.5 rounded-md hover:bg-stone-50 transition group"
                    >
                      <div className="w-8 h-8 rounded-md bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                        <Droplets size={16} className="text-[#8C6B28]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 group-hover:text-[#15231A] text-sm">Pure Honey Products</span>
                          <span className="text-xs text-stone-400 font-semibold">({honeyCount})</span>
                        </div>
                        <p className="text-[11px] text-stone-500 font-normal">Raw single-origin, comb, and creamed whips</p>
                      </div>
                    </Link>

                    {/* Beekeeping Products */}
                    <Link
                      href="/beekeeping"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="flex items-center gap-3 p-2.5 rounded-md hover:bg-stone-50 transition group"
                    >
                      <div className="w-8 h-8 rounded-md bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                        <Shield size={16} className="text-[#1A3324]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 group-hover:text-[#15231A] text-sm">Beekeeping Equipment</span>
                          <span className="text-xs text-stone-400 font-semibold">({beekeepingCount})</span>
                        </div>
                        <p className="text-[11px] text-stone-500 font-normal">Suits, smokers, tools &amp; hive components</p>
                      </div>
                    </Link>

                    {/* Botanical Terroir Profiles */}
                    <Link
                      href="/terroir"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="flex items-center gap-3 p-2.5 rounded-md hover:bg-stone-50 transition group"
                    >
                      <div className="w-8 h-8 rounded-md bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                        <Compass size={16} className="text-stone-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 group-hover:text-[#15231A] text-sm">Botanical Terroir</span>
                          <ChevronRight size={14} className="text-stone-300 group-hover:text-stone-700 transition" />
                        </div>
                        <p className="text-[11px] text-stone-500 font-normal">Sussex County floral maps &amp; microclimates</p>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Build Your Box - Highlighted Direct Link */}
          <Link
            href="/gifting"
            prefetch={true}
            className={`px-3.5 xl:px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 ${
              pathname.startsWith('/gifting') || pathname.startsWith('/build-your-box')
                ? 'bg-[#15231A] text-white shadow-xs' 
                : 'text-stone-900 bg-stone-100/90 hover:bg-stone-200 border border-stone-300'
            }`}
          >
            <Gift size={16} className={pathname.startsWith('/gifting') ? 'text-[#C5A265]' : 'text-[#8C6B28]'} />
            <span className="text-[14px]">Build Your Box</span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-xs bg-stone-900 text-[#E8D7B5]">Save 25%</span>
          </Link>

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
              className={`px-3.5 xl:px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 ${
                pathname.startsWith('/services') || navDropdown === 'services'
                  ? 'bg-[#15231A] text-white shadow-xs' 
                  : 'text-stone-800 hover:text-stone-950 hover:bg-stone-100/80'
              }`}
              aria-expanded={navDropdown === 'services'}
              aria-haspopup="true"
            >
              <Compass size={16} strokeWidth={2.2} className={pathname.startsWith('/services') || navDropdown === 'services' ? 'text-[#C5A265]' : 'text-stone-600'} />
              <span className="text-[14px]">Services</span>
              <ChevronDown 
                size={15} 
                strokeWidth={2.2}
                className={`transition-transform duration-200 ${navDropdown === 'services' ? 'rotate-180 text-[#C5A265]' : 'text-stone-400'}`} 
              />
            </Link>

            {/* Services Dropdown Menu Panel */}
            <AnimatePresence>
              {navDropdown === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.99 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-84 bg-white rounded-lg p-3 shadow-xl border border-stone-200/90 z-50 text-left"
                >
                  <div className="px-3 pt-1.5 pb-1 text-[11px] font-bold tracking-wider text-stone-500 uppercase">
                    Apiary Services
                  </div>

                  <div className="space-y-1">
                    {/* Educate */}
                    <Link
                      href="/services/educate"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="flex items-start gap-3 px-3 py-2 rounded-md text-sm font-semibold text-stone-800 hover:text-stone-950 hover:bg-stone-50 transition group"
                    >
                      <div className="w-8 h-8 rounded-md bg-stone-100 text-stone-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-stone-200 transition">
                        <GraduationCap size={16} className="text-[#8C6B28]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 group-hover:text-[#15231A]">Educate</span>
                          <ChevronRight size={14} className="text-stone-300 group-hover:text-stone-700 transition" />
                        </div>
                        <p className="text-[11px] text-stone-500 font-normal leading-snug">
                          Academy &amp; field masterclasses
                        </p>
                      </div>
                    </Link>

                    {/* Bee Removal */}
                    <Link
                      href="/services/bee-removal"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="flex items-start gap-3 px-3 py-2 rounded-md text-sm font-semibold text-stone-800 hover:text-stone-950 hover:bg-stone-50 transition group"
                    >
                      <div className="w-8 h-8 rounded-md bg-stone-100 text-stone-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-stone-200 transition">
                        <HeartHandshake size={16} className="text-[#1A3324]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 group-hover:text-[#15231A]">Bee Removal</span>
                          <ChevronRight size={14} className="text-stone-300 group-hover:text-stone-700 transition" />
                        </div>
                        <p className="text-[11px] text-stone-500 font-normal leading-snug">
                          100% humane live swarm rescue
                        </p>
                      </div>
                    </Link>

                    {/* Bee Keeping */}
                    <Link
                      href="/services/beekeeping"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="flex items-start gap-3 px-3 py-2 rounded-md text-sm font-semibold text-stone-800 hover:text-stone-950 hover:bg-stone-50 transition group"
                    >
                      <div className="w-8 h-8 rounded-md bg-stone-100 text-stone-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-stone-200 transition">
                        <Wrench size={16} className="text-[#7A5B1E]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 group-hover:text-[#15231A]">Bee Keeping</span>
                          <ChevronRight size={14} className="text-stone-300 group-hover:text-stone-700 transition" />
                        </div>
                        <p className="text-[11px] text-stone-500 font-normal leading-snug">
                          Private estate hive stewardship
                        </p>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-1.5 pt-1.5 border-t border-stone-100">
                    <Link
                      href="/services"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="flex items-center justify-between px-3 py-2 rounded-md text-xs font-bold text-stone-900 bg-stone-100/70 hover:bg-stone-200/70 transition group"
                    >
                      <span>All Services Overview</span>
                      <span className="text-xs font-semibold text-stone-700 group-hover:translate-x-0.5 transition-transform">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. Corporate Gifting Page */}
          <Link 
            href="/corporate"
            prefetch={true}
            className={`px-3.5 xl:px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition cursor-pointer whitespace-nowrap shrink-0 ${
              pathname === '/corporate' 
                ? 'bg-[#15231A] text-white shadow-xs' 
                : 'text-stone-800 hover:text-stone-950 hover:bg-stone-100/80'
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
            className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold tracking-wide transition cursor-pointer border ${
              pathname.startsWith('/admin')
                ? 'bg-stone-100 text-stone-950 border-stone-300 font-bold shadow-2xs'
                : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100/80 border-stone-200/90'
            }`}
            title="Open Admin Management Atelier"
          >
            <SlidersHorizontal size={14} className={pathname.startsWith('/admin') ? 'text-[#8C6B28]' : 'text-stone-500'} />
            <span>Admin</span>
          </Link>

          {/* Shopping Bag Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white text-xs font-semibold tracking-wide transition cursor-pointer shadow-xs active:scale-98 whitespace-nowrap shrink-0"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag size={15} className="text-[#C5A265]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="w-5 h-5 rounded-xs bg-[#C5A265] text-stone-950 font-bold text-[11px] flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Navigation Menu Toggle Button (Hamburger) - Visible on all viewports */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold cursor-pointer transition active:scale-98 shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            <span className="hidden sm:inline">Menu</span>
          </button>
        </div>

      </div>

      {/* Slide-over Navigation Sidebar & Overlay (Mounted to body via Portal to prevent header stacking context issues) */}
      {isClient && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-[100]">
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
                aria-label="Navigation Sidebar"
                className="fixed inset-y-0 right-0 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-hidden z-[100] text-left border-l border-slate-200"
              >
                {/* Header */}
                <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
                  <Link
                    href="/"
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-xl font-bold tracking-[0.14em] text-stone-900 select-none"
                  >
                    MAISON AVENOIR
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-md bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center cursor-pointer transition"
                    aria-label="Close Sidebar"
                  >
                    <X size={17} />
                  </button>
                </div>

                {/* Scrollable Navigation Area */}
                <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
                  {/* Apiary Atelier Subtitle */}
                  <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#15231A] px-1">
                    New Jersey Harvest House &bull; Est. 2026
                  </p>

                  {/* Shop All Departments Primary Card */}
                  <Link
                    href="/shop"
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-4 rounded-lg bg-[#15231A] text-white shadow-xs hover:shadow-md transition group border border-[#263D2E]"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Store size={16} className="text-[#C5A265]" />
                        <span className="font-serif text-base font-bold text-white group-hover:text-[#F4EEDF] transition">
                          Shop All Departments
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-xs bg-stone-900 text-[#E8D7B5] border border-stone-700">
                        {totalCount} Items
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed font-normal">
                      Sussex County single-origin raw honeys, custom gift boxes, and beekeeping gear.
                    </p>
                  </Link>

                  {/* 1. Honey Products Accordion Card */}
                  <div className="border border-stone-200/90 rounded-lg p-3 bg-white space-y-2">
                    <button
                      onClick={() => setMobileAccordion(prev => prev === 'honey' ? null : 'honey')}
                      className="w-full flex items-center justify-between font-serif text-base font-bold text-stone-900 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-stone-100 text-[#8C6B28] flex items-center justify-center">
                          <Droplets size={14} />
                        </div>
                        <span>Honey Products</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-xs bg-stone-100 text-stone-700">
                          {honeyCount}
                        </span>
                        <ChevronDown size={15} className={`transition-transform duration-200 ${mobileAccordion === 'honey' ? 'rotate-180 text-stone-700' : 'text-stone-400'}`} />
                      </div>
                    </button>

                    {mobileAccordion === 'honey' && (
                      <div className="pt-2.5 border-t border-stone-100 space-y-1">
                        <Link
                          href="/honey"
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block w-full text-xs font-bold text-stone-900 py-2 px-3 rounded-md bg-stone-100 hover:bg-stone-200 transition"
                        >
                          &rarr; View Entire Honey Department ({honeyCount})
                        </Link>
                        {HONEY_SUBCATEGORIES.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/honey?sub=${sub.id}`}
                            prefetch={true}
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full text-xs font-medium text-stone-800 hover:text-stone-950 py-2 px-3 rounded-md hover:bg-stone-50 transition flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              {sub.id === 'honey-raw' && <Droplets size={14} className="text-[#8C6B28]" />}
                              {sub.id === 'honey-comb' && <Layers size={14} className="text-[#8C6B28]" />}
                              {sub.id === 'honey-vaults' && <Gift size={14} className="text-[#8C6B28]" />}
                              {sub.id === 'honey-infused' && <Sparkles size={14} className="text-[#8C6B28]" />}
                              <span>{sub.name}</span>
                            </div>
                            <span className="text-[11px] font-semibold text-stone-400">
                              {PRODUCTS.filter(p => p.subcategory === sub.id).length}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 2. Beekeeping Products Accordion Card */}
                  <div className="border border-stone-200/90 rounded-lg p-3 bg-white space-y-2">
                    <button
                      onClick={() => setMobileAccordion(prev => prev === 'beekeeping' ? null : 'beekeeping')}
                      className="w-full flex items-center justify-between font-serif text-base font-bold text-stone-900 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-stone-100 text-[#1A3324] flex items-center justify-center">
                          <Shield size={14} />
                        </div>
                        <span className="text-[15px]">Beekeeping Gear</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-xs bg-stone-100 text-stone-700">
                          {beekeepingCount}
                        </span>
                        <ChevronDown size={15} className={`transition-transform duration-200 ${mobileAccordion === 'beekeeping' ? 'rotate-180 text-stone-700' : 'text-stone-400'}`} />
                      </div>
                    </button>

                    {mobileAccordion === 'beekeeping' && (
                      <div className="pt-2.5 border-t border-stone-100 space-y-1">
                        <Link
                          href="/beekeeping"
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block w-full text-xs font-bold text-stone-900 py-2 px-3 rounded-md bg-stone-100 hover:bg-stone-200 transition"
                        >
                          &rarr; View Entire Apiary Department ({beekeepingCount})
                        </Link>
                        {BEEKEEPING_SUBCATEGORIES.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/beekeeping?sub=${sub.id}`}
                            prefetch={true}
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full text-xs font-medium text-stone-800 hover:text-stone-950 py-2 px-3 rounded-md hover:bg-stone-50 transition flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              {sub.id === 'bee-apparel' && <Shield size={14} className="text-[#1A3324]" />}
                              {sub.id === 'bee-tools' && <Wrench size={14} className="text-[#1A3324]" />}
                              {sub.id === 'bee-hardware' && <Layers size={14} className="text-[#1A3324]" />}
                              {sub.id === 'bee-harvest' && <Compass size={14} className="text-[#1A3324]" />}
                              <span>{sub.name}</span>
                            </div>
                            <span className="text-[11px] font-semibold text-stone-400">
                              {PRODUCTS.filter(p => p.subcategory === sub.id).length}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3. Services Accordion Card */}
                  <div className="border border-stone-200/90 rounded-lg p-3 bg-white space-y-2">
                    <button
                      onClick={() => setMobileAccordion(prev => prev === 'services' ? null : 'services')}
                      className="w-full flex items-center justify-between font-serif text-base font-bold text-stone-900 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-stone-100 text-stone-700 flex items-center justify-center">
                          <Compass size={14} />
                        </div>
                        <span className="text-[15px]">Sussex Apiary Services</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-xs bg-stone-100 text-stone-700">
                          3 Disciplines
                        </span>
                        <ChevronDown size={15} className={`transition-transform duration-200 ${mobileAccordion === 'services' ? 'rotate-180 text-stone-700' : 'text-stone-400'}`} />
                      </div>
                    </button>

                    {mobileAccordion === 'services' && (
                      <div className="pt-2.5 border-t border-stone-100 space-y-1">
                        <Link
                          href="/services"
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block w-full text-xs font-bold text-stone-900 py-2 px-3 rounded-md bg-stone-100 hover:bg-stone-200 transition"
                        >
                          &rarr; View Overview &amp; Portfolio
                        </Link>
                        
                        <Link
                          href="/services/educate"
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full text-xs font-medium text-stone-800 hover:text-stone-950 py-2 px-3 rounded-md hover:bg-stone-50 transition flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <GraduationCap size={15} className="text-[#8C6B28]" />
                            <div>
                              <p className="font-semibold text-stone-900 leading-snug">Educate</p>
                              <p className="text-[10px] text-stone-500">Apiary Academy &amp; Workshops</p>
                            </div>
                          </div>
                          <ChevronRight size={13} className="text-stone-400" />
                        </Link>

                        <Link
                          href="/services/bee-removal"
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full text-xs font-medium text-stone-800 hover:text-stone-950 py-2 px-3 rounded-md hover:bg-stone-50 transition flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <HeartHandshake size={15} className="text-[#1A3324]" />
                            <div>
                              <p className="font-semibold text-stone-900 leading-snug">Bee Removal</p>
                              <p className="text-[10px] text-stone-500">100% Humane Live Rescue</p>
                            </div>
                          </div>
                          <ChevronRight size={13} className="text-stone-400" />
                        </Link>

                        <Link
                          href="/services/beekeeping"
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full text-xs font-medium text-stone-800 hover:text-stone-950 py-2 px-3 rounded-md hover:bg-stone-50 transition flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles size={15} className="text-[#8C6B28]" />
                            <div>
                              <p className="font-semibold text-stone-900 leading-snug">Bee Keeping</p>
                              <p className="text-[10px] text-stone-500">Estate Apiary Stewardship</p>
                            </div>
                          </div>
                          <ChevronRight size={13} className="text-stone-400" />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Additional Destination Links */}
                  <div className="space-y-1.5 pt-1">
                    {/* Gifting & Box Builder Mobile Card */}
                    <Link
                      href="/gifting"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full py-2.5 px-3.5 rounded-lg text-xs font-semibold flex items-center justify-between transition border ${
                        pathname.startsWith('/gifting') || pathname.startsWith('/build-your-box')
                          ? 'bg-[#15231A] text-white border-[#263D2E] shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Gift size={16} className={pathname.startsWith('/gifting') ? 'text-[#C5A265]' : 'text-[#8C6B28]'} />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">Build Your Own Box</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-xs bg-stone-900 text-[#E8D7B5]">Save 25%</span>
                          </div>
                          <p className="text-[10px] text-stone-500 font-normal">Custom honey stacks &amp; curated bundles</p>
                        </div>
                      </div>
                      <ChevronRight size={15} className="text-stone-400" />
                    </Link>

                    <Link
                      href="/terroir"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full py-2.5 px-3.5 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                        pathname === '/terroir'
                          ? 'bg-[#15231A] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Compass size={15} className={pathname === '/terroir' ? 'text-[#C5A265]' : 'text-stone-600'} />
                        <span>Botanical Terroir Profiles</span>
                      </div>
                      <ChevronRight size={15} className="text-stone-400" />
                    </Link>

                    <Link
                      href="/corporate"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full py-2.5 px-3.5 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                        pathname === '/corporate'
                          ? 'bg-[#15231A] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles size={15} className={pathname === '/corporate' ? 'text-[#C5A265]' : 'text-stone-600'} />
                        <span>Corporate Gifting &amp; Concierge</span>
                      </div>
                      <ChevronRight size={15} className="text-stone-400" />
                    </Link>
                  </div>
                </div>

                {/* Sidebar Footer with Bag Action */}
                <div className="p-4 border-t border-stone-200 bg-stone-50/80 space-y-2.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="w-full py-3 px-4 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-between shadow-xs cursor-pointer transition active:scale-98"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={15} className="text-[#C5A265]" />
                      <span>View Shopping Bag</span>
                    </div>
                    <span className="w-5 h-5 rounded-xs bg-[#C5A265] text-stone-950 font-bold text-xs flex items-center justify-center">
                      {cartCount}
                    </span>
                  </button>

                  <Link
                    href="/admin"
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2 px-3 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 border border-stone-300 transition"
                  >
                    <SlidersHorizontal size={14} className="text-stone-600" />
                    <span>Admin Management Atelier</span>
                  </Link>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 px-1 font-medium">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-[#1A3324]" />
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
