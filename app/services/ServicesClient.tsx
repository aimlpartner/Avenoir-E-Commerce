'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  GraduationCap, 
  HeartHandshake, 
  Wrench, 
  ArrowRight, 
  PhoneCall
} from 'lucide-react';

export default function ServicesClient() {
  const servicePillars = [
    {
      id: 'educate',
      href: '/services/educate',
      title: 'Educate',
      subtitle: 'Apiary Academy & Field Masterclasses',
      description: 'Hands-on live hive inspections, colony biology, cold-spun honey chemistry, and master beekeeping certifications hosted at our Kittatinny Ridge sanctuary.',
      imageUrl: '/images/service-educate-hero.jpg',
      badge: 'Academy & Workshops',
      icon: <GraduationCap size={20} className="text-amber-400" />,
      features: [
        'Hands-on live hive frame inspections',
        'Beginner to Master Apiarist syllabi',
        'Single-origin honey terroir sensory tasting',
        'All protective ventilated gear provided'
      ],
      ctaText: 'Explore Workshops & Classes'
    },
    {
      id: 'bee-removal',
      href: '/services/bee-removal',
      title: 'Bee Removal',
      subtitle: '100% Humane Live Swarm Relocation',
      description: 'Zero poisons, zero extermination. We gently rescue honeybee swarms and colonies from trees, siding, attics, and chimneys, relocating them to our protected mountain apiaries.',
      imageUrl: '/images/service-removal-hero.jpg',
      badge: 'Emergency & Scheduled',
      icon: <HeartHandshake size={20} className="text-amber-400" />,
      features: [
        '100% pesticide-free humane live rescue',
        'Structural cut-outs & swarm extraction',
        'Direct relocation to Sussex County reserve',
        '24/7 emergency dispatch hotline'
      ],
      ctaText: 'Request Live Bee Removal'
    },
    {
      id: 'beekeeping',
      href: '/services/beekeeping',
      title: 'Bee Keeping',
      subtitle: 'Full-Service Private Estate Apiary Stewardship',
      description: 'Turnkey hive installation, seasonal disease management, and private honey harvests for luxury country homes, vineyards, orchards, and corporate estates.',
      imageUrl: '/images/service-beekeeping-hero.jpg',
      badge: 'Estate Management',
      icon: <Wrench size={20} className="text-amber-400" />,
      features: [
        'Western Red Cedar hive installation with copper roofs',
        'Bi-weekly apiary health & queen inspections',
        'Organic Varroa mite prevention & winterization',
        'Custom private estate honey bottling with family insignia'
      ],
      ctaText: 'View Estate Stewardship Plans'
    }
  ];

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-10 sm:space-y-14 text-left">
      
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" prefetch={true} className="hover:text-stone-900 transition">Home</Link>
        <span className="text-stone-300">/</span>
        <span className="text-stone-900 font-medium">Apiary Services</span>
      </nav>

      {/* Editorial Header - Pure Typography, No Floating Cards, No AI Slop */}
      <div className="pt-1 pb-8 border-b border-stone-200">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-[1.1]">
          Apiary Services &amp; <br className="hidden sm:inline" />
          <span className="italic text-[#8C6B28]">Estate Stewardship.</span>
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-serif mt-3 max-w-xl leading-relaxed">
          Professional apiary management, humane colony relocation, and hands-on masterclasses across Sussex County.
        </p>
      </div>

      {/* 2. Three Core Service Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {servicePillars.map((service) => (
          <div
            key={service.id}
            className="group rounded-lg bg-white border border-stone-200 overflow-hidden hover:border-stone-400 transition-colors flex flex-col justify-between"
          >
            {/* Service Image */}
            <div className="relative h-60 sm:h-64 w-full bg-stone-100 overflow-hidden">
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className="bg-stone-900/85 text-white text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-xs backdrop-blur-xs">
                  {service.badge}
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="font-serif text-xl sm:text-2xl font-normal text-white">
                  {service.title}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="font-serif text-base font-semibold text-stone-900">
                  {service.subtitle}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                  {service.description}
                </p>

                {/* Feature Highlights */}
                <div className="space-y-1.5 pt-3 border-t border-stone-100">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                      <span className="text-[#8C6B28] font-bold">&bull;</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={service.href}
                prefetch={true}
                className="w-full py-3 px-5 rounded-md bg-[#15231A] hover:bg-[#1E3326] text-white font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{service.ctaText}</span>
                <ArrowRight size={13} className="text-[#C5A265]" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Emergency Dispatch & Inquiry Contact Strip - Clean Editorial */}
      <div className="pt-8 pb-4 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1 text-left">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C6B28] block">
            Emergency Swarm or Custom Estate Inquiry
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-900">
            Have a live bee swarm or need private estate apiary counsel?
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 font-serif max-w-xl">
            Our Sussex County apiarists are on call across Northern New Jersey for humane extractions and bespoke estate setup consultations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <Link
            href="/services/bee-removal"
            className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#15231A] hover:bg-[#1E3326] text-white font-medium text-xs uppercase tracking-wider transition text-center flex items-center justify-center gap-2"
          >
            <PhoneCall size={14} />
            <span>Emergency Swarm Dispatch</span>
          </Link>
          <Link
            href="/services/beekeeping"
            className="w-full sm:w-auto px-5 py-3 rounded-lg bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-medium text-xs uppercase tracking-wider transition text-center"
          >
            <span>Book Apiary Consultation</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
