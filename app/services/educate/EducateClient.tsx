'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  GraduationCap, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Sparkles,
  Droplets,
  BookOpen,
  Send
} from 'lucide-react';

export default function EducateClient() {
  const [selectedCourse, setSelectedCourse] = useState('fundamentals');
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    attendees: '1',
    preferredMonth: 'May 2026',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const courses = [
    {
      id: 'fundamentals',
      title: 'Apiary Fundamentals & Hive Ecology',
      level: 'Beginner & Aspiring Beekeepers',
      duration: '1 Full Day (10 AM – 4 PM)',
      groupSize: 'Max 8 Patrons per Session',
      price: '$285 per attendee',
      tag: 'Most Popular',
      syllabus: [
        'Anatomy of the Superorganism: Queen, Worker, and Drone dynamics',
        'Hive hardware assembly: Western Red Cedar Langstroth & Top Bar',
        'Live hive inspection: opening the brood box safely with smoker and hive tool',
        'Identifying capped brood, honey stores, and queen eggs',
        'Protective ventilated apparel provided for all field work'
      ]
    },
    {
      id: 'advanced',
      title: 'Cold-Extraction & Terroir Chemistry Masterclass',
      level: 'Advanced Apiarists & Culinary Professionals',
      duration: '2-Day Immersive Intensive',
      groupSize: 'Max 6 Patrons per Session',
      price: '$650 per attendee',
      tag: 'Master Certification',
      syllabus: [
        'Preserving live enzymes: cold-spinning uncapped frames below 95°F',
        'Diastase index and refraction laboratory testing methodology',
        'Botanical terroir pairing: Sussex mountain aster vs. Pine Barrens cranberry',
        'Comb honey cutting and beeswax rendering techniques',
        'Bottle and seal 3 personalized reserve apothecary jars to take home'
      ]
    },
    {
      id: 'private',
      title: 'Private Estate Tasting & Field Experience',
      level: 'Private Parties, Families & Executive Retreats',
      duration: 'Half Day (3 Hours)',
      groupSize: 'Up to 12 Guests',
      price: '$1,200 total group',
      tag: 'Bespoke Concierge',
      syllabus: [
        'Guided walk through our protected Kittatinny Ridge mountain apiary',
        'Suited frame observation of a gentle Italian honeybee colony',
        'Sommelier-guided tasting flight of 5 single-origin seasonal reserves',
        'Fresh honeycomb cut directly from the hive paired with local cheeses',
        'Custom engraved walnut keepsake chest gift for the host'
      ]
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
        <span className="text-emerald-950 font-bold">Educate &bull; Apiary Academy</span>
      </nav>

      {/* 1. Hero Showcase with High-Visibility Photography */}
      <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Academy Narrative */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase">
              <GraduationCap size={16} className="text-amber-600" />
              <span>Avenoir Apiary Academy &bull; Kittatinny Ridge</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Step Inside the Hive. <br />
              <span className="text-amber-800">Learn Master Apiary Arts.</span>
            </h1>

            <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-normal">
              Whether you are preparing to establish your first country estate colony, a chef seeking deeper knowledge of enzymatic terroir, or an enthusiast fascinated by the superorganism. Our Sussex County master apiarists provide unmatched hands-on instruction.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <span className="font-mono text-[10px] uppercase font-bold text-emerald-800 block">Class Ratio</span>
              <span className="font-bold text-slate-900 text-sm">1 Instructor : 4 Students</span>
              <p className="text-[11px] text-slate-500">Uncompromising safety and focus</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <span className="font-mono text-[10px] uppercase font-bold text-amber-800 block">Protective Gear</span>
              <span className="font-bold text-slate-900 text-sm">Full Suits Provided</span>
              <p className="text-[11px] text-slate-500">Triple-layer ventilated mesh</p>
            </div>
          </div>
        </div>

        {/* Right Column: 100% Clearly Visible High-Resolution Photo */}
        <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full w-full overflow-hidden bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200">
          <Image
            src="/images/service-educate-hero.jpg"
            alt="Master Apiarist Teaching Live Honeybee Frame Inspection"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 750px"
            className="object-cover object-center opacity-100"
          />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
            <div className="bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-[11px] text-white font-mono shadow-md inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Sussex County Apiary Sanctuary &bull; Live Field Training</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Course Catalog & Interactive Curriculum */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-800 block mb-1">
            Curriculum &amp; Field Workshops
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
            Selected Educational Tracks
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between space-y-5 bg-white ${
                selectedCourse === course.id
                  ? 'border-emerald-800 shadow-md ring-1 ring-emerald-800'
                  : 'border-slate-200/90 hover:border-slate-400 shadow-xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200">
                    {course.tag}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {course.price}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-900">
                  {course.title}
                </h3>
                <p className="text-xs text-emerald-800 font-medium">
                  {course.level}
                </p>

                <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono py-1 border-y border-slate-100">
                  <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {course.groupSize}</span>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                    What You Will Master:
                  </span>
                  <ul className="space-y-1.5">
                    {course.syllabus.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                        <CheckCircle2 size={13} className="text-amber-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCourse(course.id);
                  const el = document.getElementById('enrollment-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 ${
                  selectedCourse === course.id
                    ? 'bg-emerald-950 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <span>{selectedCourse === course.id ? 'Selected for Enrollment' : 'Select This Track'}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Enrollment & Reservation Module */}
      <div id="enrollment-form" className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Academy Inclusions & Concierge (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-emerald-900/50 shadow-md">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/20 inline-block">
                  Academy Privileges
                </span>
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                  What Every Apprentice Receives
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every field masterclass at Avenoir Sanctuary is designed as an intimate, sensory mastercourse. All necessary professional gear and preserves are provided.
                </p>
              </div>

              {/* Inclusions List */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Full Apiary Safety Armor</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">Triple-layer ventilated mesh suit, round veil &amp; goatskin gauntlets fitted to your size.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Droplets size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Live Centrifuge &amp; Fresh Comb Jar</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">Hand-uncap and centrifuge honey combs, taking home a fresh 12oz raw comb jar.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Sussex Field Journal &amp; Handbook</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">Leatherbound flora bloom calendar, diastase testing guide, and seasonal hive log.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Award size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Certified Guild Accreditation</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">Official apprentice completion parchment sealed and signed by Head Apiarist Vance.</p>
                  </div>
                </div>
              </div>

              {/* Testimonial Quote */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
                <div className="flex text-amber-400 text-xs">★★★★★</div>
                <p className="text-xs italic text-slate-200 leading-relaxed">
                  &ldquo;Holding a live queen frame in the Sussex morning breeze under Vance&apos;s calm guidance was unforgettable. A truly world-class atelier experience.&rdquo;
                </p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-amber-300/80">
                  — Victoria D., Somerset Hills Estate Patron
                </p>
              </div>
            </div>

            {/* Concierge Hotline */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">Bespoke or Group Bookings</span>
                <span className="text-amber-300 font-mono font-semibold">concierge@avenoirhoney.com</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-300/90 font-bold bg-emerald-900/60 px-2.5 py-1 rounded-md border border-emerald-700/50">
                (973) 824-HIVE
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Reservation Form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            <div className="space-y-1.5 text-left border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase block">
                Reserve Your Place
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                Workshop Enrollment &amp; Scheduling
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Strict 1:4 instructor ratio (max 8 attendees per session). Reserve your preferred dates for the 2026 spring and summer apiary calendar below.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-950 text-white p-8 rounded-2xl border border-emerald-800 text-center space-y-4 shadow-sm">
                <CheckCircle2 size={40} className="text-amber-400 mx-auto" />
                <h3 className="font-serif text-2xl font-bold">Enrollment Dossier Confirmed</h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-amber-300 font-bold">{enquiryForm.name || 'Patron'}</span>. Our Head Apiarist has received your reservation for <span className="text-amber-300 font-bold">{enquiryForm.preferredMonth}</span> ({enquiryForm.attendees} Attendee{enquiryForm.attendees !== '1' ? 's' : ''}). A member of our concierge will telephone you at <span className="text-white font-mono">{enquiryForm.phone}</span> within 24 hours with your welcome kit, directions to our Kittatinny Sanctuary, and waiver documents.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer transition"
                  >
                    Submit Another Reservation
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                
                {/* Workshop Selection & Season */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Selected Educational Track</label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-slate-50/70 focus:border-emerald-800 focus:bg-white focus:outline-hidden font-medium text-slate-900"
                    >
                      <option value="fundamentals">Apiary Fundamentals ($285 / person)</option>
                      <option value="advanced">Cold-Extraction &amp; Terroir ($650 / person)</option>
                      <option value="private">Private Estate Experience ($1,200 / group)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Preferred Season / Month</label>
                    <select
                      value={enquiryForm.preferredMonth}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, preferredMonth: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-slate-50/70 focus:border-emerald-800 focus:bg-white focus:outline-hidden font-medium text-slate-900"
                    >
                      <option value="May 2026">May 2026 &bull; Spring Swarm &amp; Queen Season</option>
                      <option value="June 2026">June 2026 &bull; Clover &amp; Nectar Flow Peak</option>
                      <option value="July 2026">July 2026 &bull; Wildflower Mid-Summer Flow</option>
                      <option value="August 2026">August 2026 &bull; Mountain Aster &amp; Extraction</option>
                      <option value="September 2026">September 2026 &bull; Goldenrod &amp; Overwintering</option>
                    </select>
                  </div>
                </div>

                {/* Contact & Group Size */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Marcus Vance"
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-emerald-800 focus:outline-hidden text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="marcus@estate.com"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-emerald-800 focus:outline-hidden text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Telephone</label>
                    <input
                      type="tel"
                      required
                      placeholder="(973) 555-0182"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-emerald-800 focus:outline-hidden text-slate-900"
                    />
                  </div>
                </div>

                {/* Attendees & Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Party / Guest Count</label>
                    <select
                      value={enquiryForm.attendees}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, attendees: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-slate-50/70 focus:border-emerald-800 focus:bg-white focus:outline-hidden font-medium text-slate-900"
                    >
                      <option value="1">1 Person (Solo Apprentice)</option>
                      <option value="2">2 Persons (Duo Apprenticeship)</option>
                      <option value="3">3 Persons (Family or Friends)</option>
                      <option value="4">4 Persons (Private Sub-Group)</option>
                      <option value="6">6 to 8 Persons (Full Private Session)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-700">Special Notes, Allergies or Suit Sizing</label>
                    <input
                      type="text"
                      placeholder="Any prior experience, suit sizes (S/M/L/XL), or known allergies..."
                      value={enquiryForm.notes}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, notes: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-emerald-800 focus:outline-hidden text-slate-900"
                    />
                  </div>
                </div>

                {/* Reassurance Guarantees */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-amber-950 font-medium">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-700 shrink-0" />
                    <span>Covered Glass Observation Pavillion</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                    <span>Free Date Changes up to 7 Days</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-700 shrink-0" />
                    <span>Take-Home Raw Mountain Comb</span>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-widest transition cursor-pointer flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg"
                >
                  <Send size={15} className="text-amber-400" />
                  <span>Submit Enrollment Inquiry &amp; Request Calendar</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
