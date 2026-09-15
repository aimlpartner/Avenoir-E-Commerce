'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Wrench, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Send, 
  Droplets,
  Award,
  Layers,
  Calendar
} from 'lucide-react';

export default function BeekeepingServicesClient() {
  const [selectedTier, setSelectedTier] = useState('host');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    estateAcreage: '2–5 Acres',
    locationTown: '',
    specialRequests: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const programs = [
    {
      id: 'host',
      title: 'Turnkey Estate Hive Host',
      tag: 'Most Popular',
      suitableFor: 'Private Country Estates & Historic Residences',
      summary: 'Effortless luxury. We deliver, install, and fully manage 2 handcrafted cedar beehives on your grounds. You enjoy thriving gardens and all the custom-bottled honey.',
      deliverables: [
        'Two handcrafted Western Red Cedar Langstroth hives with copper roofs',
        'Acclimated, docile Italian queen colonies installed in spring',
        'Bi-weekly apiary health, brood, and Varroa mite inspections',
        '100% of seasonal honey harvested, cold-spun, and bottled',
        'Custom engraved wooden presentation chest and labeled jars'
      ],
      pricing: 'Annual Stewardship Contract'
    },
    {
      id: 'mentored',
      title: 'Mentored Co-Apiarist Program',
      tag: 'Hands-On Apprenticeship',
      suitableFor: 'Property Owners Aspiring to Master the Craft',
      summary: 'Learn alongside our Head Apiarist on your own land. Suit up for every inspection with guided mentorship until you possess the confidence of a master beekeeper.',
      deliverables: [
        'Complete commercial-grade ventilated bee suit and hive tool kit included',
        'Structured 1-on-1 field lessons during every seasonal hive opening',
        'Emergency phone & WhatsApp direct access to your designated apiarist',
        'Spring hive split, swarm prevention, and winter wrap coaching',
        'Certificate of Sussex County Apiary Apprenticeship'
      ],
      pricing: 'Seasonal Mentorship Plan'
    },
    {
      id: 'agricultural',
      title: 'Commercial Orchard & Vineyard Pollination',
      tag: 'Agricultural Yield',
      suitableFor: 'Apple Orchards, Vineyards & Organic Farms',
      summary: 'Deploy dense clusters of pathogen-free commercial colonies to maximize blossom set, fruit diameter, and berry yields during critical spring bloom cycles.',
      deliverables: [
        'Delivery and optimal GPS cluster placement of 10 to 50 active hives',
        'High-vitality colonies timed precisely to your crop bloom window',
        'Weekly monitoring and supplementary organic pollen patties if needed',
        'Prompt post-bloom relocation without interfering with harvest machinery',
        'Full agricultural compliance and state health inspection papers'
      ],
      pricing: 'Per-Hive Bloom Cycle Contract'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-10 sm:space-y-14 text-left">
      
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" prefetch={true} className="hover:text-emerald-950 transition">Home</Link>
        <ChevronRight size={12} />
        <Link href="/services" prefetch={true} className="hover:text-emerald-950 transition">Services</Link>
        <ChevronRight size={12} />
        <span className="text-emerald-950 font-bold">Bee Keeping &bull; Estate Apiary Stewardship</span>
      </nav>

      {/* 1. Hero Showcase with High-Visibility Photography */}
      <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Narrative */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase">
              <Wrench size={16} className="text-emerald-700" />
              <span>Private Client &bull; Apiary Management</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Your Private Apiary. <br />
              <span className="text-amber-800">Masterfully Managed.</span>
            </h1>

            <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-normal">
              Introducing honeybee colonies to your country estate enriches wildflower meadows, multiplies garden fruit yields, and produces private-reserve raw honey bottled exclusively for your household. Avenoir handles every facet of hive joinery, disease prevention, and harvest bottling.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <span className="font-mono text-[10px] uppercase font-bold text-emerald-800 block">Hive Craftsmanship</span>
              <span className="font-bold text-slate-900 text-sm">Western Red Cedar</span>
              <p className="text-[11px] text-slate-500">Natural rot resistance &amp; copper roof</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <span className="font-mono text-[10px] uppercase font-bold text-amber-800 block">Estate Harvest</span>
              <span className="font-bold text-slate-900 text-sm">Custom Bottling</span>
              <p className="text-[11px] text-slate-500">Apothecary glass with family crest</p>
            </div>
          </div>
        </div>

        {/* Right Column: 100% Clearly Visible High-Resolution Photo */}
        <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full w-full overflow-hidden bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200">
          <Image
            src="/images/service-beekeeping-hero.jpg"
            alt="Handcrafted Western Red Cedar Beehives on Private Country Estate with Master Apiarist"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 750px"
            className="object-cover object-center opacity-100"
          />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
            <div className="bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-[11px] text-white font-mono shadow-md inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Turnkey Western Red Cedar Langstroth Hives &bull; Private Estate</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Stewardship Programs */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-800 block mb-1">
            Service Tiers &amp; Stewardship Contracts
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
            Estate Apiary Management Programs
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className={`rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between space-y-5 bg-white ${
                selectedTier === program.id
                  ? 'border-emerald-800 shadow-md ring-1 ring-emerald-800'
                  : 'border-slate-200/90 hover:border-slate-400 shadow-xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200">
                    {program.tag}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {program.pricing}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-900">
                  {program.title}
                </h3>
                <p className="text-xs text-emerald-800 font-medium">
                  {program.suitableFor}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed py-1 border-y border-slate-100">
                  {program.summary}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                    Program Deliverables:
                  </span>
                  <ul className="space-y-1.5">
                    {program.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                        <CheckCircle2 size={13} className="text-emerald-700 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedTier(program.id);
                  const el = document.getElementById('consultation-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 ${
                  selectedTier === program.id
                    ? 'bg-emerald-950 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <span>{selectedTier === program.id ? 'Selected for Consultation' : 'Select Program'}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Consultation Inquiry Form */}
      <div id="consultation-form" className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Estate Apiary Privileges (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-emerald-900/50 shadow-md">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/20 inline-block">
                  Estate Privileges
                </span>
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                  Turnkey Private Apiary Stewardship
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We handle every facet of beekeeping on your estate — hive installation, swarm prevention, disease testing, winterization, and extraction — while you enjoy the honey and ecological benefits.
                </p>
              </div>

              {/* Privileges List */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Layers size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Architectural Cedar Hives</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">Sustainable Western Red Cedar Langstroth hives finished with bee-safe copper roofs and organic tung oil.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Droplets size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Private Estate Monogram Bottling</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">Cold-spun honey bottled exclusively for your estate in French apothecary jars with custom wax seal &amp; family monogram.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Zero-Effort Full Care</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">Bi-weekly visits by licensed master apiarists, full mite testing, winter feeding, and 100% replacement guarantee.</p>
                  </div>
                </div>
              </div>

              {/* Verified Estate Testimonial */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
                <div className="flex text-amber-400 text-xs">★★★★★</div>
                <p className="text-xs italic text-slate-200 leading-relaxed">
                  &ldquo;Avenoir installed 3 cedar hives along our wildflower meadow. We received 160 bespoke jars of raw honey with our estate crest for the holidays, and our orchard fruit set doubled.&rdquo;
                </p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-amber-300/80">
                  — Roderick &amp; Evelyn B., Tewksbury Township
                </p>
              </div>
            </div>

            {/* Concierge Line */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">Estate Consultation Hotline</span>
                <span className="text-amber-300 font-mono font-semibold">estates@avenoirhoney.com</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-300/90 font-bold bg-emerald-900/60 px-2.5 py-1 rounded-md border border-emerald-700/50">
                (973) 824-HIVE
              </span>
            </div>
          </div>

          {/* Right Column: Site Consultation Form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            <div className="space-y-1.5 text-left border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase block">
                Site Assessment &amp; Feasibility
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                Request an Estate Apiary Consultation
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Our Head Apiarist will arrange a personal walkthrough of your grounds to assess solar exposure, prevailing winds, native forage biodiversity, and water sources for optimal hive health.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-950 text-white p-8 rounded-2xl border border-emerald-800 text-center space-y-4 shadow-sm">
                <CheckCircle2 size={40} className="text-amber-400 mx-auto" />
                <h3 className="font-serif text-2xl font-bold">Consultation Dossier Created</h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-amber-300 font-bold">{formData.name || 'Patron'}</span>. Our Head Apiarist will contact you directly at <span className="text-white font-mono">{formData.email}</span> to schedule a complimentary property walkthrough in <span className="text-amber-300 font-bold">{formData.locationTown || 'Sussex County'}</span>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer transition"
                  >
                    Submit Another Consultation
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                
                {/* Program Tier & Acreage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Selected Program Tier</label>
                    <select
                      value={selectedTier}
                      onChange={(e) => setSelectedTier(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-slate-50/70 focus:border-emerald-800 focus:bg-white focus:outline-hidden font-medium text-slate-900"
                    >
                      <option value="host">Turnkey Estate Hive Host (Full Management)</option>
                      <option value="mentored">Mentored Co-Apiarist (Apprenticeship)</option>
                      <option value="agricultural">Commercial Orchard &amp; Vineyard Pollination</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Property / Estate Acreage</label>
                    <select
                      value={formData.estateAcreage}
                      onChange={(e) => setFormData({ ...formData, estateAcreage: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-slate-50/70 focus:border-emerald-800 focus:bg-white focus:outline-hidden font-medium text-slate-900"
                    >
                      <option value="Under 1 Acre">Under 1 Acre &bull; Suburban Estate Grounds</option>
                      <option value="2–5 Acres">2–5 Acres &bull; Country Property / Meadow</option>
                      <option value="5–20 Acres">5–20 Acres &bull; Private Farm / Forest Border</option>
                      <option value="20+ Acres">20+ Acres &bull; Commercial Estate / Orchard</option>
                    </select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Harrison Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-emerald-800 focus:outline-hidden text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="harrison@estate.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-emerald-800 focus:outline-hidden text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="(973) 555-0144"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-emerald-800 focus:outline-hidden text-slate-900"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Property Municipality / Town (NJ / NY / PA)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mendham / Bedminster / Sussex County / New Hope"
                    value={formData.locationTown}
                    onChange={(e) => setFormData({ ...formData, locationTown: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-emerald-800 focus:outline-hidden text-slate-900"
                  />
                </div>

                {/* Goals & Special Requests */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Estate Goals &amp; Preferences</label>
                  <textarea
                    rows={3}
                    placeholder="Share details on your property (fruit trees, wildflower gardens, vegetable patches, desired hive count, or private bottling preferences)..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-emerald-800 focus:outline-hidden text-slate-900"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-widest transition cursor-pointer flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg"
                >
                  <Send size={15} className="text-amber-400" />
                  <span>Request Estate Apiary Consultation &amp; Site Walkthrough</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
