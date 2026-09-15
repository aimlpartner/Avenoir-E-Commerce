'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  HeartHandshake, 
  ChevronRight, 
  PhoneCall, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Home, 
  Trees, 
  Building2,
  Clock,
  Send,
  MapPin
} from 'lucide-react';

export default function BeeRemovalClient() {
  const [urgency, setUrgency] = useState<'immediate' | 'scheduled'>('immediate');
  const [removalType, setRemovalType] = useState('tree');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    town: '',
    description: '',
  });
  const [dispatched, setDispatched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDispatched(true);
  };

  const scenarios = [
    {
      id: 'tree',
      title: 'Resting Swarm (Tree, Fence, Bush)',
      icon: <Trees size={24} className="text-emerald-700" />,
      timeframe: 'Same-Day Fast Dispatch (1–3 Hours)',
      description: 'Transient swarms clustering temporarily on a branch or post while scout bees search for a home. We brush the swarm directly into a cedar transport box without harming a single bee.',
      rate: 'Complimentary / Modest Travel Stipend'
    },
    {
      id: 'structure',
      title: 'Structural Hive (Siding, Soffit, Wall)',
      icon: <Home size={24} className="text-amber-700" />,
      timeframe: 'Scheduled Precision Extraction',
      description: 'Established colony residing inside wall studs or attic rafters. We utilize thermal imaging to pinpoint comb coordinates, gently extract queen and comb, clean scent trails, and seal entry points.',
      rate: 'Transparent Quote After Inspection'
    },
    {
      id: 'chimney',
      title: 'Chimneys, Barns & Outbuildings',
      icon: <Building2 size={24} className="text-slate-700" />,
      timeframe: 'Specialized Extraction & Trap-Out',
      description: 'High-elevation or historic masonry environments. We apply gentle one-way bee cones or specialized low-pressure vacuum captures to extract the entire superorganism intact.',
      rate: 'Bespoke Historic & Rural Assessment'
    }
  ];

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-10 sm:space-y-14 text-left">
      
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" prefetch={true} className="hover:text-emerald-950 transition">Home</Link>
        <ChevronRight size={12} />
        <Link href="/services" prefetch={true} className="hover:text-emerald-950 transition">Services</Link>
        <ChevronRight size={12} />
        <span className="text-emerald-950 font-bold">Bee Removal &bull; 100% Humane Live Rescue</span>
      </nav>

      {/* 1. Hero Showcase with High-Visibility Photography */}
      <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Humane Charter */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase">
              <HeartHandshake size={16} className="text-emerald-600" />
              <span>Sussex County Humane Live Rescue Program</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Never Spray. Never Kill. <br />
              <span className="text-amber-800">We Save Every Colony.</span>
            </h1>

            <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-normal">
              Honeybees are essential agricultural keystones. Exterminators apply neurotoxins that leave gallons of rotting fermented honey inside your walls, attracting rodents and moths. Avenoir safely relocates the living colony to our protected Kittatinny Ridge mountain apiary sanctuary.
            </p>
          </div>

          {/* Emergency Hotline Strip */}
          <div className="p-4 rounded-2xl bg-emerald-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-900">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase font-bold">
                24/7 Swarm Dispatch Hotline
              </span>
              <p className="text-base sm:text-lg font-mono font-bold text-white">
                (973) 824-HIVE &bull; (973) 824-4483
              </p>
            </div>
            <a
              href="tel:9738244483"
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall size={14} />
              <span>Call Dispatch</span>
            </a>
          </div>
        </div>

        {/* Right Column: 100% Clearly Visible High-Resolution Photo */}
        <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full w-full overflow-hidden bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200">
          <Image
            src="/images/service-removal-hero.jpg"
            alt="Professional Sussex Apiarist Gently Rescuing Honeybee Swarm into Cedar Box"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 750px"
            className="object-cover object-center opacity-100"
          />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
            <div className="bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-[11px] text-white font-mono shadow-md inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>100% Non-Toxic &bull; Cedar Transport Box Relocation</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Removal Scenarios */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-800 block mb-1">
            Coverage &amp; Capabilities
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
            Extraction Scenarios Handled
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {scenarios.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between space-y-4 bg-white ${
                removalType === item.id
                  ? 'border-emerald-800 shadow-md ring-1 ring-emerald-800'
                  : 'border-slate-200/90 hover:border-slate-400 shadow-xs'
              }`}
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  {item.icon}
                </div>

                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {item.title}
                </h3>

                <span className="text-[11px] font-mono text-emerald-800 font-semibold block">
                  {item.timeframe}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-slate-100 text-xs font-semibold text-slate-800">
                  Fee: <span className="text-emerald-900 font-bold">{item.rate}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setRemovalType(item.id);
                  const el = document.getElementById('dispatch-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Select for Dispatch</span>
                <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Dispatch & Assessment Request Form */}
      {/* 3. Dispatch Form & Fast Intake */}
      <div id="dispatch-form" className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Rescue Charter & Sanctuary Re-Homing (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-emerald-900/50 shadow-md">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/20 inline-block">
                  Rescue Charter
                </span>
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                  The Avenoir Living Rescue Guarantee
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unlike exterminators who spray neurotoxins leaving gallons of rotting honey inside your walls, Avenoir extracts the living superorganism intact.
                </p>
              </div>

              {/* Charter Highlights */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Zero Toxic Chemicals</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">100% organic relocation using lemongrass lures and low-pressure cedar transport vacuums.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <HeartHandshake size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Kittatinny Sanctuary Re-Homing</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">Rescued colonies are introduced to permanent quarantine hives in our protected mountain apiary.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Full Scent Masking &amp; Exclusion</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">Complete comb removal, thermal cavity sanitizing, and copper mesh exclusion to prevent re-infestation.</p>
                  </div>
                </div>
              </div>

              {/* Verified Rescue Testimonial */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
                <div className="flex text-amber-400 text-xs">★★★★★</div>
                <p className="text-xs italic text-slate-200 leading-relaxed">
                  &ldquo;A 40,000-bee swarm landed on our pergola before an outdoor wedding. Avenoir arrived in 40 minutes, gently transferred the queen to a cedar nuc, and left without a single sting.&rdquo;
                </p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-amber-300/80">
                  — Julian &amp; Claire T., Bedminster NJ
                </p>
              </div>
            </div>

            {/* Direct 24/7 Dispatch Box */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">Immediate Swarm Assistance</span>
                <span className="text-amber-300 font-mono font-bold text-sm">(973) 824-HIVE</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-300/90 font-bold bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-700/50">
                24/7 ON-CALL
              </span>
            </div>
          </div>

          {/* Right Column: Intake Dispatch Form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            <div className="space-y-1.5 text-left border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase block">
                Online Dispatch Request
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                Live Bee Removal Assessment
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Submit property and swarm details below. For urgent active clusters posing risk to foot traffic, our on-call truck dispatches immediately upon telephone confirmation.
              </p>
            </div>

            {dispatched ? (
              <div className="bg-emerald-950 text-white p-8 rounded-2xl border border-emerald-800 text-center space-y-4 shadow-sm">
                <CheckCircle2 size={40} className="text-amber-400 mx-auto" />
                <h3 className="font-serif text-2xl font-bold">Dispatch Ticket Transmitted</h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-amber-300 font-bold">{formData.name || 'Patron'}</span>. Our on-call Sussex apiarist has received your removal notification for <span className="text-amber-300 font-bold">{formData.town || 'Sussex County'}</span>. We are preparing travel transport boxes and will telephone you shortly at <span className="text-white font-mono">{formData.phone || 'your phone'}</span>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setDispatched(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer transition"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                
                {/* Urgency Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">Situation Urgency Level</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUrgency('immediate')}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border cursor-pointer ${
                        urgency === 'immediate'
                          ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <AlertTriangle size={15} className={urgency === 'immediate' ? 'text-slate-950' : 'text-amber-600'} />
                      <span>Active Swarm &bull; Immediate</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrgency('scheduled')}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border cursor-pointer ${
                        urgency === 'scheduled'
                          ? 'bg-emerald-950 text-white border-emerald-950 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Clock size={15} className={urgency === 'scheduled' ? 'text-amber-400' : 'text-slate-400'} />
                      <span>Established Hive &bull; Scheduled</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Eleanor Wright"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-emerald-800 focus:outline-hidden text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Mobile Phone (Direct Dispatch SMS/Call)</label>
                    <input
                      type="tel"
                      required
                      placeholder="(973) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-emerald-800 focus:outline-hidden text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="142 Ridge Road"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-emerald-800 focus:outline-hidden text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Town / Municipality (NJ / Tristate)</label>
                    <input
                      type="text"
                      required
                      placeholder="Newton / Sparta / Sussex County"
                      value={formData.town}
                      onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-emerald-800 focus:outline-hidden text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Swarm or Nest Location Details</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe location (e.g., apple tree branch 7ft off ground, inside chimney flue, behind cedar siding soffit)..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-emerald-800 focus:outline-hidden text-slate-900"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-widest transition cursor-pointer flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg"
                >
                  <Send size={15} className="text-amber-400" />
                  <span>Transmit Humane Dispatch Request &amp; Alert Team</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
