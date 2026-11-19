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
        <span className="text-xs uppercase tracking-wider text-[#D64500] font-semibold block">
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
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white text-xs font-semibold uppercase tracking-wider transition"
        >
          <ArrowLeft size={14} className="text-[#FB5601]" />
          <span>Home</span>
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#FB5601] hover:bg-[#D64500] text-white text-xs font-semibold uppercase tracking-wider transition"
        >
          <span>Shop Honey</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
