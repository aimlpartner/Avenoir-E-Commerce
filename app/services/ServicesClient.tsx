'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  GraduationCap, 
  HeartHandshake, 
  Wrench, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  PhoneCall, 
  CheckCircle2, 
  Calendar,
  Layers,
  Award
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
    <div className="py-8 sm:py-14 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-12 sm:space-y-16 text-left">
      
      {/* 1. Services Editorial Header */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-6 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/images/hero-apiary-landscape.jpg"
            alt="Avenoir Sussex County Apiaries"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent sm:from-slate-950 sm:via-slate-950/70 sm:to-slate-950/20" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sussex County Apiary Atelier Services</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
            Master Apiary Services. <br />
            <span className="text-amber-400">Stewardship, Safety &amp; Academics.</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
            Rooted along the Kittatinny Ridge of Sussex County, Avenoir extends professional apiary governance beyond pure honey reserves. From hands-on masterclasses and humane live swarm relocations to private estate hive stewardship.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-mono">
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-emerald-400" /> NJ Licensed &amp; Insured</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5"><Award size={16} className="text-amber-400" /> Master Apiarists</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5"><HeartHandshake size={16} className="text-emerald-400" /> 100% No-Kill Policy</span>
          </div>
        </div>
      </div>

      {/* 2. Three Core Service Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {servicePillars.map((service) => (
          <div
            key={service.id}
            className="group rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-800 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Service Image - High Definition & Clearly Visible */}
            <div className="relative h-64 sm:h-72 w-full bg-slate-100 overflow-hidden">
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                <span className="bg-emerald-950/90 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg backdrop-blur-xs shadow-xs">
                  {service.badge}
                </span>
              </div>

              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-900/90 backdrop-blur-md flex items-center justify-center">
                    {service.icon}
                  </div>
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {service.title}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {service.subtitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Feature Highlights */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={service.href}
                prefetch={true}
                className="w-full py-3.5 px-5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md cursor-pointer"
              >
                <span>{service.ctaText}</span>
                <ArrowRight size={14} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Emergency Dispatch & Inquiry Contact Strip */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-amber-50 via-white to-emerald-50/40 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-amber-800 block">
            Emergency Swarm or Custom Estate Inquiry
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            Have a live bee swarm or need private estate apiary counsel?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Our Sussex County apiarists are on call across the Tristate area for humane extractions and bespoke estate setup consultations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <Link
            href="/services/bee-removal"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition text-center shadow-xs flex items-center justify-center gap-2"
          >
            <PhoneCall size={14} />
            <span>Emergency Swarm Dispatch</span>
          </Link>
          <Link
            href="/services/beekeeping"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-xs uppercase tracking-wider transition text-center shadow-2xs"
          >
            <span>Book Apiary Consultation</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
