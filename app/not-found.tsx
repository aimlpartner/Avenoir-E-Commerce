import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

export default function NotFound() {
  return (
    <div className="py-20 sm:py-28 px-4 sm:px-8 max-w-xl mx-auto text-center space-y-6">
      <div className="flex justify-center">
        <BrandLogo variant="seal" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-wider text-[#5B8E33] font-semibold block">
          404 &bull; Page Not Found
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900">
          We couldn&apos;t find that page.
        </h1>
        <p className="text-sm text-stone-500 font-serif">
          Explore our raw wildflower honey jars, 3-jar combos, gift boxes, and monthly club.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#F5F1FD] hover:bg-[#EAE2FB] text-[#6E52C4] text-xs font-semibold uppercase tracking-wider transition"
        >
          <ArrowLeft size={14} />
          <span>Home</span>
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#8B6FE0] hover:bg-[#7A5CD6] text-white text-xs font-semibold uppercase tracking-wider transition"
        >
          <span>Shop Honey</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
