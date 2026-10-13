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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 xl:gap-16">
                  {/* Col 1: Terroir Honey */}
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8C6B28] font-semibold mb-4">
                      Single-Origin Terroir
                    </p>
                    <div className="space-y-3.5">
                      <Link
                        href="/honey"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Raw Varietal Honey
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Sussex &amp; Morris single-origin jars ({honeyCount})
                        </p>
                      </Link>

                      <Link
                        href="/honey?cat=honey-comb"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Raw Honeycomb Slabs
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          100% edible raw virgin comb cuts
                        </p>
                      </Link>

                      <Link
                        href="/honey?cat=honey-infused"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Infused &amp; Creamed Delicacies
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Whipped Madagascar vanilla &amp; botanicals
                        </p>
                      </Link>

                      <Link
                        href="/terroir"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Botanical Bloom Map
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Northern New Jersey terroir &amp; nectar flows
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Col 2: Gift Studio */}
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8C6B28] font-semibold mb-4">
                      Bespoke Gifting
                    </p>
                    <div className="space-y-3.5">
                      <Link
                        href="/gifting"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Build a Gift Box
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Wax-sealed bespoke gift atelier
                        </p>
                      </Link>

                      <Link
                        href="/honey?cat=honey-vaults"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Curated Tasting Stacks
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          American walnut presentation chests
                        </p>
                      </Link>

                      <Link
                        href="/corporate"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Corporate &amp; Event Gifting
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Custom wax seals &amp; volume atelier
                        </p>
                      </Link>

                      <Link
                        href="/beekeeping?cat=bee-harvest"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Turned Brass Accents
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Solid brass wands &amp; pure beeswax tapers
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Col 3: Apiary Equipment */}
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8C6B28] font-semibold mb-4">
                      Apiary Stewardship
                    </p>
                    <div className="space-y-3.5">
                      <Link
                        href="/beekeeping"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Beekeeping Gear
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Suits, smokers &amp; woodenware ({beekeepingCount})
                        </p>
                      </Link>

                      <Link
                        href="/beekeeping?cat=bee-apparel"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Protective Apparel
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Triple-layer ventilated suits &amp; veils
                        </p>
                      </Link>

                      <Link
                        href="/beekeeping?cat=bee-tools"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Tools &amp; Smokers
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Stainless smokers &amp; J-hook frame lifters
                        </p>
                      </Link>

                      <Link
                        href="/beekeeping?cat=bee-hardware"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Cedar Hive Woodenware
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Western Red Cedar Langstroth brood boxes
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Col 4: Spotlight & Direct Action */}
                  <div className="border-l border-stone-200 pl-6 xl:pl-8 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                        Seasonal Harvest
                      </span>
                      <h4 className="font-serif text-lg text-stone-900 mt-1 mb-2 font-normal">
                        Autumn Wildflower Reserve
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed font-light">
                        Raw late-season nectar from northern New Jersey ridges. Unheated, enzyme-rich, and packaged in biophotonic ultraviolet glass.
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 xl:gap-16">
                  {/* Col 1: Education */}
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8C6B28] font-semibold mb-4">
                      The Academy
                    </p>
                    <div className="space-y-3.5">
                      <Link
                        href="/services/educate"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Apiary Masterclasses
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Seasonal colony inspections &amp; brood care
                        </p>
                      </Link>

                      <Link
                        href="/services/educate"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Apprentice Workshops
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Hands-on frame manipulation &amp; safety
                        </p>
                      </Link>

                      <Link
                        href="/services/educate"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Sensory Honey Tastings
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Mono-floral origin profiling &amp; pairings
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Col 2: Swarm Stewardship */}
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8C6B28] font-semibold mb-4">
                      Conservation
                    </p>
                    <div className="space-y-3.5">
                      <Link
                        href="/services/bee-removal"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Humane Bee Removal
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          100% pesticide-free live swarm relocation
                        </p>
                      </Link>

                      <Link
                        href="/services/bee-removal"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Structural Extraction
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Gentle colony removal from soffits &amp; structures
                        </p>
                      </Link>

                      <Link
                        href="/services/bee-removal"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Sanctuary Apiary Transfer
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Relocated to protected conservation reserves
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Col 3: Estate Hive Care */}
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8C6B28] font-semibold mb-4">
                      Private Apiaries
                    </p>
                    <div className="space-y-3.5">
                      <Link
                        href="/services/beekeeping"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Estate Hive Stewardship
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Turnkey cedar hive installation &amp; care
                        </p>
                      </Link>

                      <Link
                        href="/services/beekeeping"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Bi-Weekly Health Audits
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Queen assessment, mite monitoring &amp; feeding
                        </p>
                      </Link>

                      <Link
                        href="/services/beekeeping"
                        prefetch={true}
                        onClick={() => setNavDropdown(null)}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-stone-900 group-hover:text-[#8C6B28] transition-colors">
                          Bespoke Harvest Bottling
                        </p>
                        <p className="text-xs text-stone-500 font-light mt-0.5">
                          Custom labeled raw honey from your estate
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Col 4: Services Overview */}
                  <div className="border-l border-stone-200 pl-6 xl:pl-8 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
                        Consultation
                      </span>
                      <h4 className="font-serif text-lg text-stone-900 mt-1 mb-2 font-normal">
                        Apiary Stewardship Inquiries
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed font-light">
                        Consult with our master beekeeper for estate feasibility studies, commercial pollination, or custom apiary programs.
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
                      href="/honey?cat=honey-comb"
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
