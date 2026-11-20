'use client';

import React, { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/lib/products';
import BrandLogo from '@/components/BrandLogo';

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/gifting', label: 'Gift Boxes & Favors' },
  { href: '/corporate', label: 'Corporate Gifting' },
  { href: '/products/SB-MONTHLY-SUB', label: 'Monthly Club' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, setIsCartOpen } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

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

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, mobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-40 relative bg-white border-b border-stone-200">
      <div className="w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 xl:px-12 h-20 relative flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center shrink-0 z-20">
          <Link
            href="/"
            prefetch={true}
            className="flex items-center cursor-pointer select-none group py-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            <BrandLogo variant="navbar" />
          </Link>
        </div>

        {/* Clean Primary Navigation */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-8 xl:gap-10 absolute left-1/2 -translate-x-1/2 inset-y-0 h-full z-20"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className={`h-full px-1 text-sm font-medium transition flex items-center whitespace-nowrap ${
                  isActive ? 'text-[#7A5CD6]' : 'text-stone-700 hover:text-[#7A5CD6]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Search, Bag, Mobile Menu */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-stone-700 hover:text-stone-950 transition cursor-pointer rounded-full hover:bg-stone-100"
            aria-label="Search products"
            title="Search"
          >
            <Search size={19} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="h-10 px-3 flex items-center gap-1.5 text-stone-900 hover:text-[#7A5CD6] transition cursor-pointer rounded-full hover:bg-[#F5F1FD]"
            aria-label={`Shopping bag containing ${cartCount} items`}
            title="Shopping Bag"
          >
            <ShoppingBag size={19} strokeWidth={1.8} />
            <span className="text-xs font-semibold tracking-tight">({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-stone-800 hover:text-stone-950 transition cursor-pointer rounded-md hover:bg-stone-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
          </button>
        </div>
      </div>

      {/* Search Modal */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {isSearchOpen && (
              <div className="fixed inset-0 z-[100]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setIsSearchOpen(false)}
                  className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs cursor-pointer"
                  aria-hidden="true"
                />

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="relative z-10 w-full max-w-2xl mx-auto mt-12 sm:mt-20 px-4"
                >
                  <div className="bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden text-left">
                    <form
                      onSubmit={handleSearchSubmit}
                      className="relative flex items-center border-b border-stone-200 px-4 py-3.5 sm:py-4"
                    >
                      <BrandLogo variant="mark" className="w-6 h-6 mr-2" />
                      <Search size={18} className="text-[#8B6FE0] shrink-0 mr-2.5" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search jars, 3-jar combo, holiday box, favors, kids, corporate..."
                        className="w-full text-sm sm:text-base bg-transparent text-stone-900 placeholder:text-stone-400 focus:outline-none"
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
                        <span className="text-[11px] font-medium text-stone-400 uppercase hidden sm:inline">
                          ESC
                        </span>
                      )}
                    </form>

                    <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto">
                      {searchQuery.trim() ? (
                        searchResults.length > 0 ? (
                          <div className="space-y-2">
                            {searchResults.map((product) => (
                              <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                prefetch={true}
                                onClick={() => setIsSearchOpen(false)}
                                className="flex items-center gap-3.5 p-2.5 rounded-lg hover:bg-stone-50 transition group"
                              >
                                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-[#FDF9E4] shrink-0 border border-stone-200/70">
                                  <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-serif text-sm font-medium text-stone-900 group-hover:text-[#7A5CD6] transition truncate">
                                    {product.name}
                                  </h4>
                                  <p className="text-xs text-stone-500 truncate">{product.subtitle}</p>
                                </div>
                                <span className="font-semibold text-sm text-stone-900 shrink-0">
                                  From ${product.price.toFixed(0)}
                                  {product.isSubscription ? '/mo' : ''}
                                </span>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="py-8 text-center text-stone-500 text-sm">
                            <p>No products found for &ldquo;{searchQuery}&rdquo;</p>
                          </div>
                        )
                      ) : (
                        <div className="space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                            Quick Search
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {[
                              'Jar',
                              '3-Jar Combo',
                              'Holiday',
                              'Favor Gifts',
                              'Kids',
                              'Corporate',
                              'Subscription',
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

      {/* Mobile Drawer */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-[100] lg:hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs z-[99] cursor-pointer"
                  aria-hidden="true"
                />

                <motion.aside
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                  aria-label="Mobile Navigation"
                  className="fixed inset-y-0 right-0 w-[80vw] max-w-xs bg-white shadow-xl flex flex-col justify-between overflow-hidden z-[100] text-left border-l border-stone-200"
                >
                  <div className="p-4 border-b border-stone-200 flex items-center justify-between">
                    <Link href="/" prefetch={true} onClick={() => setMobileMenuOpen(false)}>
                      <BrandLogo variant="compact" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-1.5 text-stone-600 hover:text-stone-900 transition"
                      aria-label="Close menu"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-5 space-y-5">
                    <div className="space-y-1">
                      {NAV_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-2.5 text-base font-serif text-stone-900 hover:text-[#7A5CD6] transition"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-stone-100 pt-4 space-y-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                        All Products
                      </span>
                      {PRODUCTS.map((p) => (
                        <Link
                          key={p.id}
                          href={`/products/${p.id}`}
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1.5 text-sm text-stone-600 hover:text-[#7A5CD6] transition"
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border-t border-stone-200 bg-[#FDF9E4]">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsCartOpen(true);
                      }}
                      className="w-full py-3 px-4 rounded-md bg-[#8B6FE0] hover:bg-[#7A5CD6] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-between"
                    >
                      <span>View Shopping Bag</span>
                      <span className="font-semibold">({cartCount})</span>
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
