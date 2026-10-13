'use client';

import React, { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Search,
  User,
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck,
  Package,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/context/CartContext';
import { HONEY_SUBCATEGORIES, BEEKEEPING_SUBCATEGORIES, PRODUCTS } from '@/lib/products';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, setIsCartOpen } = useCart();
  
  const [navDropdown, setNavDropdown] = useState<'shop' | 'services' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const profileDropdownRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Lock body scroll when search or mobile sidebar is open
  useEffect(() => {
    if (mobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, isSearchOpen]);

  // Focus search input when search modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  // Close modals & menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (isProfileOpen) setIsProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, mobileMenuOpen, isProfileOpen]);

  // Click outside listener for profile dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const handleMouseEnter = (dept: 'shop' | 'services') => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setNavDropdown(dept);
  };

  const handleMouseLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setNavDropdown(null);
    }, 240);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const totalCount = PRODUCTS.length;
  const honeyCount = PRODUCTS.filter(p => p.department === 'honey').length;
  const beekeepingCount = PRODUCTS.filter(p => p.department === 'beekeeping').length;

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <header 
      className="sticky top-0 z-40 relative bg-white border-b border-stone-200"
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 h-20 relative flex items-center justify-between">
        
        {/* Brand Logo - Left */}
        <div 
          className="flex items-center shrink-0 z-20"
          onMouseEnter={() => {
            if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
            setNavDropdown(null);
          }}
        >
          <Link 
            href="/" 
            prefetch={true}
            className="flex items-center cursor-pointer select-none group py-1"
            onClick={() => { setNavDropdown(null); setMobileMenuOpen(false); }}
          >
            <span className="font-serif text-2xl lg:text-[26px] font-normal tracking-[0.22em] text-stone-900 group-hover:text-[#8C6B28] transition-colors">
              AVENOIR
            </span>
          </Link>
        </div>

        {/* Navigation Links - Center (Mathematically Centered in Header) */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7 xl:gap-9 absolute left-1/2 -translate-x-1/2 inset-y-0 h-full z-20">
          
          {/* 1. Shop Trigger */}
          <div 
            className="h-full flex items-center cursor-pointer"
            onMouseEnter={() => handleMouseEnter('shop')}
          >
            <button
              id="shop-nav-trigger"
              type="button"
              onClick={() => setNavDropdown(prev => prev === 'shop' ? null : 'shop')}
              onMouseEnter={() => handleMouseEnter('shop')}
              className="h-full px-2 text-sm font-medium text-stone-700 hover:text-stone-950 transition flex items-center gap-1.5 cursor-pointer bg-transparent border-0 select-none"
              aria-expanded={navDropdown === 'shop'}
              aria-haspopup="true"
            >
              <span>Shop</span>
              <ChevronDown 
                size={13} 
                className={`transition-transform duration-200 text-stone-400 ${navDropdown === 'shop' ? 'rotate-180 text-stone-900' : ''}`} 
              />
            </button>
          </div>

          {/* 2. Build a Gift Box */}
          <div 
            className="h-full flex items-center"
            onMouseEnter={() => {
              if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
              setNavDropdown(null);
            }}
          >
            <Link
              href="/gifting"
              prefetch={true}
              className="h-full px-2 text-sm font-medium text-stone-700 hover:text-stone-950 transition flex items-center whitespace-nowrap cursor-pointer"
            >
              Build a Gift Box
            </Link>
          </div>

          {/* 3. Services Trigger */}
          <div 
            className="h-full flex items-center cursor-pointer"
            onMouseEnter={() => handleMouseEnter('services')}
          >
            <button
              id="services-nav-trigger"
              type="button"
              onClick={() => setNavDropdown(prev => prev === 'services' ? null : 'services')}
              onMouseEnter={() => handleMouseEnter('services')}
              className="h-full px-2 text-sm font-medium text-stone-700 hover:text-stone-950 transition flex items-center gap-1.5 cursor-pointer bg-transparent border-0 select-none"
              aria-expanded={navDropdown === 'services'}
              aria-haspopup="true"
            >
              <span>Services</span>
              <ChevronDown 
                size={13} 
                className={`transition-transform duration-200 text-stone-400 ${navDropdown === 'services' ? 'rotate-180 text-stone-900' : ''}`} 
              />
            </button>
          </div>

          {/* 4. Corporate Gifting */}
          <div 
            className="h-full flex items-center"
            onMouseEnter={() => {
              if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
              setNavDropdown(null);
            }}
          >
            <Link 
              href="/corporate"
              prefetch={true}
              className="h-full px-2 text-sm font-medium text-stone-700 hover:text-stone-950 transition flex items-center whitespace-nowrap cursor-pointer"
            >
              Corporate Gifting
            </Link>
          </div>
        </nav>

        {/* Right Utility Actions: Search, Account/Profile, Bag, Mobile Menu */}
        <div 
          className="flex items-center gap-1 sm:gap-2 shrink-0"
          onMouseEnter={() => {
            if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
            setNavDropdown(null);
          }}
        >
          
          {/* 1. Search Icon Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-stone-700 hover:text-stone-950 transition cursor-pointer rounded-full hover:bg-stone-100"
            aria-label="Search honey and gift collection"
            title="Search"
          >
            <Search size={19} strokeWidth={1.8} />
          </button>

          {/* 2. Customer Profile / Account Trigger & Dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setIsProfileOpen(prev => !prev)}
              className="w-10 h-10 flex items-center justify-center text-stone-700 hover:text-stone-950 transition cursor-pointer rounded-full hover:bg-stone-100"
              aria-label="Customer Account & Orders"
              title="Account"
              aria-expanded={isProfileOpen}
            >
              <User size={19} strokeWidth={1.8} />
            </button>

            {/* Profile Dropdown Menu */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full w-64 bg-white border border-stone-200 border-t-0 p-3 shadow-xl z-50 text-left"
                >
                  <div className="pb-2.5 mb-2 border-b border-stone-100">
                    <p className="text-xs font-bold text-stone-900">Patron Account</p>
                    <p className="text-[11px] text-stone-500">Avenoir Collector</p>
                  </div>

                  <div className="space-y-1 text-xs">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        setIsCartOpen(true);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-md hover:bg-stone-50 font-medium text-stone-800 transition flex items-center justify-between"
                    >
                      <span>Active Shopping Bag</span>
                      <span className="font-mono text-stone-500">({cartCount})</span>
                    </button>

                    <Link
                      href="/admin"
                      prefetch={true}
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-2.5 py-2 rounded-md hover:bg-stone-50 font-medium text-stone-800 transition"
                    >
                      Atelier Admin Portal
                    </Link>

                    <Link
                      href="/gifting"
                      prefetch={true}
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-2.5 py-2 rounded-md hover:bg-stone-50 font-medium text-stone-800 transition"
                    >
                      Harvest Club Privileges
                    </Link>
                  </div>

                  <div className="pt-2 mt-1 border-t border-stone-100">
                    <p className="text-[10px] text-stone-400 px-2 py-1">
                      Batch Traceability &bull; Direct Apiary Access
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Shopping Bag Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="h-10 px-3 flex items-center gap-1.5 text-stone-900 hover:text-[#8C6B28] transition cursor-pointer rounded-full hover:bg-stone-100"
            aria-label={`Shopping bag containing ${cartCount} items`}
            title="Shopping Bag"
          >
            <ShoppingBag size={19} strokeWidth={1.8} />
            <span className="text-xs font-semibold font-mono tracking-tight">({cartCount})</span>
          </button>

          {/* 4. Mobile Menu Button (ONLY on mobile/tablet) */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-stone-800 hover:text-stone-950 transition cursor-pointer rounded-md hover:bg-stone-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
          </button>

        </div>

      </div>

      {/* =========================================================================
          ATTACHED DROPDOWN MEGA PANEL (Edge-to-edge flush with navbar bottom)
          ========================================================================= */}
      {navDropdown && (
        <div
          id="nav-attached-dropdown-panel"
          onMouseEnter={() => {
            if (dropdownTimeoutRef.current) {
              clearTimeout(dropdownTimeoutRef.current);
              dropdownTimeoutRef.current = null;
            }
          }}
          onMouseLeave={handleMouseLeave}
          className="absolute top-full inset-x-0 w-full bg-white border-b border-stone-200 shadow-xl z-50 text-left"
        >
          <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 py-8 lg:py-10">
              {navDropdown === 'shop' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14 xl:gap-16">
                  {/* Col 1: Honey Products */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-stone-400 font-medium block mb-4">
                      Honey Collection
                    </span>
                    <div className="space-y-3">
                      <Link
                        href="/honey"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          All Honey Reserves
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5 font-serif">
                          Explore all single-origin jars and seasonal reserves ({honeyCount})
                        </p>
                      </Link>

                      <Link
                        href="/honey?sub=honey-raw"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Raw &amp; Terroir Jars
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5 font-serif">
                          Unheated, unpasteurized Sussex County varietals
                        </p>
                      </Link>

                      <Link
                        href="/honey?sub=honey-comb"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Cut Honeycomb &amp; Flights
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5 font-serif">
                          100% edible virgin comb slabs and flight trios
                        </p>
                      </Link>

                      <Link
                        href="/honey?sub=honey-infused"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Infused &amp; Creamed
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5 font-serif">
                          Whipped Bourbon vanilla caviar and raw botanicals
                        </p>
                      </Link>

                      <Link
                        href="/honey?sub=honey-vaults"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Gift Vaults &amp; Chests
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5 font-serif">
                          Heirloom American walnut and maple tasting boxes
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Col 2: Beekeeping Gear */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-stone-400 font-medium block mb-4">
                      Beekeeping Equipment
                    </span>
                    <div className="space-y-3">
                      <Link
                        href="/beekeeping"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          All Apiary Equipment
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5 font-serif">
                          Tools, suits, smokers, and hive hardware ({beekeepingCount})
                        </p>
                      </Link>

                      <Link
                        href="/beekeeping?sub=bee-apparel"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Protective Apparel
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5 font-serif">
                          Ventilated suits, round veils, and goatskin gauntlets
                        </p>
                      </Link>

                      <Link
                        href="/beekeeping?sub=bee-tools"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Tools &amp; Smokers
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5 font-serif">
                          Stainless smokers, frame grips, and J-hook lifters
                        </p>
                      </Link>

                      <Link
                        href="/beekeeping?sub=bee-hardware"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Hive Hardware &amp; Woodenware
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5 font-serif">
                          Western Red Cedar Langstroth brood boxes and frames
                        </p>
                      </Link>

                      <Link
                        href="/beekeeping?sub=bee-harvest"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Harvest &amp; Wax Craft
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5 font-serif">
                          Turned brass tasting wands and pure beeswax sheets
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Col 3: Direct Shop Catalog Action */}
                  <div className="border-t md:border-t-0 md:border-l border-stone-200 pt-6 md:pt-0 md:pl-8 lg:pl-10 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 font-medium block">
                        Full Catalog
                      </span>
                      <h4 className="font-serif text-lg text-stone-900 font-normal">
                        Browse All Products
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed font-serif">
                        Explore our complete harvest collection of raw varietal honeys and certified apiary equipment.
                      </p>
                    </div>
                    <div className="pt-6">
                      <Link
                        href="/shop"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-900 hover:text-[#8C6B28] transition-colors group cursor-pointer"
                      >
                        <span>View All Products ({totalCount})</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {navDropdown === 'services' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 xl:gap-12">
                  {/* Service 1: Education */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-stone-400 font-medium block mb-4">
                      Education
                    </span>
                    <Link
                      href="/services/educate"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="group block space-y-1.5"
                    >
                      <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                        Apiary Academy &amp; Workshops
                      </p>
                      <p className="text-xs text-stone-500 font-serif leading-relaxed">
                        Masterclasses, hands-on apprentice inspections, and guided sensory honey tasting sessions.
                      </p>
                      <span className="text-xs font-medium text-[#8C6B28] inline-flex items-center gap-1 pt-1 group-hover:underline">
                        <span>Explore Classes</span>
                        <ArrowRight size={12} />
                      </span>
                    </Link>
                  </div>

                  {/* Service 2: Humane Bee Removal */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-stone-400 font-medium block mb-4">
                      Conservation
                    </span>
                    <Link
                      href="/services/bee-removal"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="group block space-y-1.5"
                    >
                      <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                        Humane Bee Removal
                      </p>
                      <p className="text-xs text-stone-500 font-serif leading-relaxed">
                        100% pesticide-free live swarm rescue and structural colony extractions relocated to sanctuary apiaries.
                      </p>
                      <span className="text-xs font-medium text-[#8C6B28] inline-flex items-center gap-1 pt-1 group-hover:underline">
                        <span>Request Removal</span>
                        <ArrowRight size={12} />
                      </span>
                    </Link>
                  </div>

                  {/* Service 3: Estate Hive Stewardship */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-stone-400 font-medium block mb-4">
                      Private Apiaries
                    </span>
                    <Link
                      href="/services/beekeeping"
                      prefetch={true}
                      onClick={() => setNavDropdown(null)}
                      className="group block space-y-1.5"
                    >
                      <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                        Estate Hive Stewardship
                      </p>
                      <p className="text-xs text-stone-500 font-serif leading-relaxed">
                        Turnkey cedar hive installation, seasonal health audits, and custom estate harvest bottling.
                      </p>
                      <span className="text-xs font-medium text-[#8C6B28] inline-flex items-center gap-1 pt-1 group-hover:underline">
                        <span>Estate Inquiry</span>
                        <ArrowRight size={12} />
                      </span>
                    </Link>
                  </div>

                  {/* Col 4: Services Overview */}
                  <div className="border-t md:border-t-0 md:border-l border-stone-200 pt-6 md:pt-0 md:pl-8 lg:pl-10 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 font-medium block">
                        Overview
                      </span>
                      <h4 className="font-serif text-lg text-stone-900 font-normal">
                        All Apiary Services
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed font-serif">
                        Learn about our mission to protect New Jersey honeybees through education, ethical rescue, and private apiaries.
                      </p>
                    </div>
                    <div className="pt-6">
                      <Link
                        href="/services"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-900 hover:text-[#8C6B28] transition-colors group cursor-pointer"
                      >
                        <span>Services Overview</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      {/* =========================================================================
          INTERACTIVE SEARCH MODAL (SLIDE-DOWN OVERLAY)
          ========================================================================= */}
      {isClient && createPortal(
        <AnimatePresence>
          {isSearchOpen && (
            <div className="fixed inset-0 z-[100]">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setIsSearchOpen(false)}
                className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs cursor-pointer"
                aria-hidden="true"
              />

              {/* Search Dialog Box */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-2xl mx-auto mt-12 sm:mt-20 px-4"
              >
                <div className="bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden text-left">
                  
                  {/* Search Bar Input */}
                  <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-stone-200 px-4 py-3.5 sm:py-4">
                    <Search size={20} className="text-stone-400 shrink-0 mr-3" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search honeys, gift sets, tasting notes, gear..."
                      className="w-full text-base sm:text-lg bg-transparent text-stone-900 placeholder:text-stone-400 focus:outline-none"
                    />
                    {searchQuery ? (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="p-1 text-stone-400 hover:text-stone-700 transition cursor-pointer"
                      >
                        <X size={18} />
                      </button>
                    ) : (
                      <span className="text-[11px] font-mono text-stone-400 uppercase hidden sm:inline">
                        ESC to close
                      </span>
                    )}
                  </form>

                  {/* Results or Trending Tags */}
                  <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto">
                    {searchQuery.trim() ? (
                      <div>
                        {searchResults.length > 0 ? (
                          <div className="space-y-2">
                            <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-2">
                              Matching Products ({searchResults.length})
                            </p>
                            {searchResults.map((product) => (
                              <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                prefetch={true}
                                onClick={() => setIsSearchOpen(false)}
                                className="flex items-center gap-3.5 p-2.5 rounded-lg hover:bg-stone-50 transition group"
                              >
                                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-stone-100 shrink-0">
                                  <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-serif text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition truncate">
                                    {product.name}
                                  </h4>
                                  <p className="text-xs text-stone-500 truncate">{product.subtitle}</p>
                                </div>
                                <span className="font-semibold text-sm text-stone-900 shrink-0">
                                  ${product.price.toFixed(2)}
                                </span>
                              </Link>
                            ))}
                            <div className="pt-3 border-t border-stone-100 text-center">
                              <button
                                type="button"
                                onClick={handleSearchSubmit}
                                className="text-xs font-semibold text-stone-800 hover:text-stone-950 hover:underline cursor-pointer"
                              >
                                View all matching results in Shop &rarr;
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="py-8 text-center text-stone-500 text-sm">
                            <p>No products found for &ldquo;{searchQuery}&rdquo;</p>
                            <p className="text-xs text-stone-400 mt-1">Try searching for wildflower, gift box, or comb</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                          Popular Searches
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'Raw Wildflower',
                            'Gift Box',
                            'Honeycomb Slab',
                            'Whipped Vanilla',
                            'Harvest Trio',
                            'Beekeeping Gear'
                          ].map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => setSearchQuery(tag)}
                              className="px-3 py-1.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition cursor-pointer"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* =========================================================================
          SLIDE-OVER MOBILE NAVIGATION SIDEBAR
          ========================================================================= */}
      {isClient && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-[100] lg:hidden">
              {/* Dark Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs z-[99] cursor-pointer"
                aria-hidden="true"
              />

              {/* Sidebar Panel from Right */}
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                aria-label="Mobile Navigation"
                className="fixed inset-y-0 right-0 w-[80vw] max-w-xs bg-white shadow-xl flex flex-col justify-between overflow-hidden z-[100] text-left border-l border-stone-200"
              >
                {/* Header */}
                <div className="p-5 border-b border-stone-200 flex items-center justify-between">
                  <span className="font-serif text-xl font-normal tracking-[0.2em] text-stone-900">
                    AVENOIR
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-stone-600 hover:text-stone-900 transition"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  <div className="space-y-1">
                    <Link
                      href="/shop"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2.5 text-base font-serif text-stone-900 hover:text-[#8C6B28] transition"
                    >
                      Shop All Honey ({totalCount})
                    </Link>

                    <Link
                      href="/honey"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm text-stone-600 hover:text-stone-900 transition pl-3"
                    >
                      Raw Varietal Jars
                    </Link>

                    <Link
                      href="/honey?sub=honey-comb"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm text-stone-600 hover:text-stone-900 transition pl-3"
                    >
                      Cut Honeycomb Slabs
                    </Link>

                    <Link
                      href="/beekeeping"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm text-stone-600 hover:text-stone-900 transition pl-3"
                    >
                      Beekeeping Gear
                    </Link>
                  </div>

                  <div className="border-t border-stone-100 pt-3 space-y-2">
                    <Link
                      href="/gifting"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-base font-serif text-stone-900 hover:text-[#8C6B28] transition"
                    >
                      Build a Gift Box
                    </Link>

                    <Link
                      href="/corporate"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-base font-serif text-stone-900 hover:text-[#8C6B28] transition"
                    >
                      Corporate Gifting
                    </Link>

                    <Link
                      href="/services"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-base font-serif text-stone-900 hover:text-[#8C6B28] transition"
                    >
                      Apiary Services
                    </Link>

                    <Link
                      href="/terroir"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-base font-serif text-stone-900 hover:text-[#8C6B28] transition"
                    >
                      Botanical Terroir Map
                    </Link>
                  </div>
                </div>

                {/* Footer Cart Action */}
                <div className="p-4 border-t border-stone-200 bg-stone-50">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="w-full py-3 px-4 rounded-md bg-[#15231A] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-between"
                  >
                    <span>View Shopping Bag</span>
                    <span className="font-mono">({cartCount})</span>
                  </button>
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
