'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Droplets, 
  Compass,
  ChevronRight, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Thermometer, 
  Activity, 
  ArrowRight,
  RefreshCw,
  Search,
  Scale,
  FileText,
  Sparkles,
  Wind,
  Sun,
  Layers,
  Award,
  ExternalLink,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { TERROIR_PROFILES_DATA, TerroirZoneData, BotanicalFlora } from '@/lib/terroirData';
import { PRODUCTS, ProductItem } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

interface WeatherStationData {
  location: string;
  latitude: number;
  longitude: number;
  elevationFt: number;
  barometricTrend: string;
  airQualityIndex: string;
  foragingActivityStatus: string;
  sensorStatus: string;
}

interface BatchVerifyResult {
  success: boolean;
  lotNumber: string;
  zoneName: string;
  region: string;
  certificate: {
    lotNumber: string;
    testedDate: string;
    harvestDate: string;
    diastaseNumber: number;
    hmfMgKg: number;
    moisturePercent: number;
    pollenDensityPerGram: number;
    invertaseActivityUkg: number;
    fructoseGlucoseRatio: number;
    certificationAuthority: string;
    analystSignature: string;
  };
  sensoryProfile: {
    pfundScaleMm: number;
    pfundColorName: string;
    sweetness: number;
    floralIntensity: number;
    woodyResinous: number;
  };
  purityGuarantee: {
    heatTreated: boolean;
    maxExtractionTempF: number;
    spectrophotometerVerified: boolean;
    zeroMicroFiltration: boolean;
    rawEnzymeActive: boolean;
  };
  verifiedAt: string;
}

export default function TerroirClient() {
  // Data state
  const [zones, setZones] = useState<TerroirZoneData[]>(TERROIR_PROFILES_DATA);
  const [activeZoneId, setActiveZoneId] = useState<string>(TERROIR_PROFILES_DATA[0].id);
  const [weatherStation, setWeatherStation] = useState<WeatherStationData | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Connecting to Sussex apiary node...');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'flora' | 'sensory' | 'lab' | 'pairings'>('overview');
  
  // Flora filtering
  const [floraSeasonFilter, setFloraSeasonFilter] = useState<string>('all');
  const [selectedFloraModal, setSelectedFloraModal] = useState<BotanicalFlora | null>(null);

  // Batch Verification lookup state
  const [batchInput, setBatchInput] = useState<string>('LOT-NJ-2026-DEC');
  const [batchResult, setBatchResult] = useState<BatchVerifyResult | null>(() => {
    const defaultZone = TERROIR_PROFILES_DATA[0];
    return {
      success: true,
      lotNumber: defaultZone.labCertificate.lotNumber,
      zoneName: defaultZone.name,
      region: defaultZone.region,
      certificate: defaultZone.labCertificate,
      sensoryProfile: defaultZone.sensory,
      purityGuarantee: {
        heatTreated: false,
        maxExtractionTempF: 95.0,
        spectrophotometerVerified: true,
        zeroMicroFiltration: true,
        rawEnzymeActive: true
      },
      verifiedAt: 'Certified Active (Sussex Melissopalynology)'
    };
  });
  const [isVerifyingBatch, setIsVerifyingBatch] = useState<boolean>(false);
  const [batchError, setBatchError] = useState<string | null>(null);

  // Comparison mode state
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const [compareZoneId, setCompareZoneId] = useState<string>(TERROIR_PROFILES_DATA[1].id);

  // Sync telemetry data on user demand
  const syncTelemetry = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/terroir?refresh=true', {
        headers: { 'Accept': 'application/json' },
        cache: 'no-store'
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.zones) && data.zones.length > 0) {
        setZones(data.zones);
        setWeatherStation(data.weatherStation || null);
        setLastSyncTime(data.liveTimeDisplay || 'Live Synchronized');
      }
    } catch (err) {
      console.warn('Fallback to local terroir repository:', err);
      const now = new Date();
      setLastSyncTime(`${now.toLocaleTimeString()} (Cached)`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch initial telemetry without synchronous setState inside effect body
  useEffect(() => {
    let isMounted = true;
    async function loadInitial() {
      try {
        const res = await fetch('/api/terroir?refresh=true', {
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && Array.isArray(data.zones)) {
            setZones(data.zones);
            setWeatherStation(data.weatherStation || null);
            setLastSyncTime(data.liveTimeDisplay || 'Live Synchronized');
          }
        }
      } catch {
        // Fallback initialized with TERROIR_PROFILES_DATA
      }
    }
    loadInitial();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle batch verification via API
  const handleVerifyBatch = async (batchToSearch?: string) => {
    const lot = (batchToSearch || batchInput).trim().toUpperCase();
    if (!lot) return;

    setIsVerifyingBatch(true);
    setBatchError(null);
    try {
      const res = await fetch(`/api/terroir?batch=${encodeURIComponent(lot)}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        setBatchError(data.error || `Certificate ${lot} could not be validated.`);
        setBatchResult(null);
      } else {
        setBatchResult(data);
      }
    } catch {
      setBatchError('Network error connecting to melissopalynology laboratory database.');
      setBatchResult(null);
    } finally {
      setIsVerifyingBatch(false);
    }
  };

  const currentZone = zones.find((z) => z.id === activeZoneId) || zones[0];
  const comparisonZone = zones.find((z) => z.id === compareZoneId) || zones[1];

  // Get matching products for this terroir
  const matchingProducts: ProductItem[] = PRODUCTS.filter((p) =>
    currentZone.associatedProductIds?.includes(p.id)
  );

  // Filter flora
  const filteredFlora = currentZone.flora.filter((f) => {
    if (floraSeasonFilter === 'all') return true;
    return f.bloomSeason === floraSeasonFilter;
  });

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto space-y-12 text-left">
      
      {/* Breadcrumbs & Telemetry Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" prefetch={true} className="hover:text-emerald-900 transition">Home</Link>
          <ChevronRight size={12} />
          <Link href="/honey" prefetch={true} className="hover:text-emerald-900 transition">Honey Atelier</Link>
          <ChevronRight size={12} />
          <span className="text-emerald-950 font-bold">Botanical Terroir Profiles</span>
        </nav>

        {/* Live Sussex Apiary Telemetry Badge & Refresh Trigger */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="font-semibold text-slate-700">Telemetry:</span>
            <span className="text-emerald-800 font-bold">{lastSyncTime}</span>
          </div>

          <button
            onClick={syncTelemetry}
            disabled={isLoading}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:text-emerald-900 hover:border-emerald-300 transition text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-2xs"
            title="Fetch latest Sussex County apiary sensors"
          >
            <RefreshCw size={13} className={isLoading ? 'animate-spin text-emerald-700' : ''} />
            <span className="hidden sm:inline font-sans text-xs">Sync Feed</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-slate-950 text-white rounded-2xl p-5 sm:p-10 lg:p-14 border border-emerald-800/80 shadow-md relative overflow-hidden">
        {/* Authentic Kittatinny Ridge Elevation Research Site Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <Image
            src="/images/spotlight-terroir.jpg"
            alt="Kittatinny Ridge Microclimate Study Site at Elevation"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-emerald-950/85 to-slate-950/50 sm:from-slate-950/90 sm:via-emerald-950/70 sm:to-transparent" />
          <div className="absolute inset-0 bg-slate-950/30" />
        </div>

        <div className="max-w-3xl relative z-10 space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em]">
              Transparent &bull; See the Harvest Behind Your Jar
            </span>
            <span className="text-emerald-300/80 text-[11px] sm:text-xs font-mono">
              Sussex County Research Yard &bull; Elevation 1,450 ft
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            The Science of Botanical Honey Terroir
          </h1>
          
          <p className="text-emerald-100/90 text-xs sm:text-base leading-relaxed max-w-2xl">
            This transparency is not filler&mdash;it is the reason our patrons trust us more than an anonymous grocery shelf product. From live hive inspections and selective frame pulls to unheated extraction, natural crystallization, and care for colony health, explore the exact harvest data behind every jar.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-emerald-800/60">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-emerald-300 block">Hive Temp</span>
              <span className="text-base sm:text-lg font-mono font-bold text-white">&le; 95.0&deg;F</span>
              <span className="text-[10px] sm:text-[11px] text-emerald-200/70 block">100% Unheated</span>
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-emerald-300 block">Diastase Enzyme</span>
              <span className="text-base sm:text-lg font-mono font-bold text-amber-300">&gt; 28 DN</span>
              <span className="text-[10px] sm:text-[11px] text-emerald-200/70 block">Active &amp; Live</span>
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-emerald-300 block">Micro-Filtration</span>
              <span className="text-base sm:text-lg font-mono font-bold text-white">0% Filtered</span>
              <span className="text-[10px] sm:text-[11px] text-emerald-200/70 block">Pollen intact</span>
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-emerald-300 block">Sussex Weather</span>
              <span className="text-base sm:text-lg font-mono font-bold text-white">
                {currentZone.telemetry.ambientTempF}&deg;F / {currentZone.telemetry.relativeHumidityPct}%
              </span>
              <span className="text-[10px] sm:text-[11px] text-emerald-200/70 block">Optimal Flight</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Sussex Weather Station Telemetry Ticker */}
      {weatherStation && (
        <div className="bg-slate-900 text-slate-100 rounded-xl p-4 border border-slate-800 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-emerald-300">{weatherStation.location}</span>
            <span className="text-slate-400 hidden sm:inline">&bull;</span>
            <span className="text-slate-300 hidden sm:inline">{weatherStation.foragingActivityStatus}</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-slate-300">
            <span className="flex items-center gap-1">
              <Sun size={13} className="text-amber-400" /> UV {currentZone.telemetry.uvIndex}
            </span>
            <span className="flex items-center gap-1">
              <Wind size={13} className="text-teal-400" /> {currentZone.telemetry.windMph} mph
            </span>
            <span className="flex items-center gap-1">
              <Thermometer size={13} className="text-rose-400" /> Hive: {currentZone.telemetry.hiveCoreTempF}&deg;F
            </span>
            <span className="text-emerald-400 font-sans hidden md:inline">
              {weatherStation.sensorStatus}
            </span>
          </div>
        </div>
      )}

      {/* Microclimate Zone Selector Header */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              Explore 4 Regional Microclimates
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              The Sussex County Harvest Belts
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsComparisonOpen(true)}
              className="px-4 py-2 rounded-xl border border-emerald-800 bg-emerald-50 text-emerald-950 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-2xs"
            >
              <Scale size={14} className="text-emerald-800" />
              <span>Compare Terroirs Side-by-Side</span>
            </button>
          </div>
        </div>

        {/* Zone Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {zones.map((zone) => {
            const isActive = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                onClick={() => {
                  setActiveZoneId(zone.id);
                  if (zone.labCertificate?.lotNumber) {
                    setBatchInput(zone.labCertificate.lotNumber);
                    handleVerifyBatch(zone.labCertificate.lotNumber);
                  }
                }}
                className={`p-5 rounded-2xl text-left transition border cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  isActive
                    ? 'bg-emerald-950 text-white border-emerald-900 shadow-md ring-2 ring-amber-400/50'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-600/50 hover:bg-slate-50'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-amber-400/10 rounded-bl-full pointer-events-none" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                      isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {zone.season.split('(')[0].trim()}
                    </span>
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-amber-300' : 'text-slate-600'}`}>
                      {zone.telemetry.ambientTempF}&deg;F
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold leading-snug mb-1">
                    {zone.name}
                  </h3>
                  <p className={`text-xs line-clamp-2 ${isActive ? 'text-emerald-200/90' : 'text-slate-500'}`}>
                    {zone.heroTagline}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs ${
                  isActive ? 'border-emerald-800 text-emerald-200' : 'border-slate-100 text-slate-500'
                }`}>
                  <span className="font-mono">{zone.elevation}</span>
                  <div className="flex items-center gap-1 font-semibold">
                    <span>Explore</span>
                    <ChevronRight size={13} className={isActive ? 'text-amber-300' : 'text-slate-400'} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Zone Deep Dive Interactive Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Top Zone Banner */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 text-[11px] font-bold uppercase tracking-wider">
                  Active Terroir Profile
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <MapPin size={12} className="text-amber-400" />
                  {currentZone.gpsCoordinates.label} ({currentZone.gpsCoordinates.lat}&deg; N, {Math.abs(currentZone.gpsCoordinates.lng)}&deg; W)
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {currentZone.name}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {currentZone.description}
              </p>
            </div>

            {/* Live Sensor Capsule */}
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-2 shrink-0 md:w-64">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono uppercase text-[10px]">Apiary Telemetry</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Feed
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-slate-900/80 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Hive Core</span>
                  <span className="text-sm font-mono font-bold text-white">{currentZone.telemetry.hiveCoreTempF}&deg;F</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Moisture</span>
                  <span className="text-sm font-mono font-bold text-amber-300">{currentZone.labCertificate.moisturePercent}%</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-300 pt-1 text-center font-mono">
                Diastase: <strong className="text-emerald-300">{currentZone.labCertificate.diastaseNumber} DN</strong> (Certified)
              </div>
            </div>
          </div>

          {/* Tab Navigation for Detailed Scientific Exploration */}
          <div className="border-b border-slate-200 bg-slate-50/70 px-4 sm:px-6 flex flex-wrap items-center gap-1 sm:gap-2">
            {[
              { id: 'overview', label: 'Overview & Telemetry', icon: Activity },
              { id: 'flora', label: `Botanical Flora (${currentZone.flora.length})`, icon: Sparkles },
              { id: 'sensory', label: 'Sensory Radar & Pfund Scale', icon: SlidersHorizontal },
              { id: 'lab', label: 'Spectrophotometric Lab Report', icon: FileText },
              { id: 'pairings', label: 'Sommelier Pairings', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`py-3 px-3 sm:px-4 text-xs font-semibold border-b-2 transition flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'border-emerald-900 text-emerald-950 font-bold bg-white -mb-px rounded-t-lg'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-emerald-800' : 'text-slate-400'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW & TELEMETRY */}
          {activeTab === 'overview' && (
            <div className="p-6 sm:p-10 space-y-8">
              
              {/* Microclimate telemetry grid */}
              <div>
                <h4 className="font-serif text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Activity size={18} className="text-emerald-800" />
                  <span>Real-Time Apiary Sensor Feed &bull; {currentZone.county}</span>
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Ambient Temperature</span>
                    <span className="text-2xl font-mono font-bold text-slate-900">{currentZone.telemetry.ambientTempF}&deg;F</span>
                    <span className="text-[11px] text-slate-500 block mt-1">Sussex array reading</span>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-1">Hive Interior Temperature</span>
                    <span className="text-2xl font-mono font-bold text-emerald-950">{currentZone.telemetry.hiveCoreTempF}&deg;F</span>
                    <span className="text-[11px] text-emerald-700 block mt-1">Guaranteed &le; 95.0&deg;F</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Relative Humidity</span>
                    <span className="text-2xl font-mono font-bold text-slate-900">{currentZone.telemetry.relativeHumidityPct}%</span>
                    <span className="text-[11px] text-slate-500 block mt-1">Barometer: {currentZone.telemetry.barometricInHg} inHg</span>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                    <span className="text-[10px] uppercase font-bold text-amber-900 block mb-1">Diastase Activity (DN)</span>
                    <span className="text-2xl font-mono font-bold text-amber-900">{currentZone.labCertificate.diastaseNumber}</span>
                    <span className="text-[11px] text-amber-800 block mt-1">EU Standard &gt; 8 DN</span>
                  </div>
                </div>
              </div>

              {/* Soil Geology & Microclimate Environment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Layers size={16} className="text-emerald-800" />
                    <span>Bedrock Geology &amp; Soil Chemistry</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Geological Formation:</span>
                      <span className="font-semibold text-slate-800">{currentZone.soilGeology.formation}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Dominant Minerals:</span>
                      <span className="font-semibold text-slate-800">{currentZone.soilGeology.dominantMinerals}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Soil Acidity (pH):</span>
                      <span className="font-semibold text-slate-800">{currentZone.soilGeology.soilPh}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Water Drainage:</span>
                      <span className="font-semibold text-slate-800">{currentZone.soilGeology.drainage}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-emerald-950 text-white space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                    <Compass size={16} />
                    <span>Microclimate &amp; Foraging Dynamics</span>
                  </div>
                  <p className="text-xs text-emerald-100/90 leading-relaxed">
                    {currentZone.microclimateNotes}
                  </p>
                  <div className="pt-2 text-xs font-mono text-emerald-300 flex items-center justify-between">
                    <span>Flight Radius: 3.2 miles</span>
                    <span>Forage Status: {currentZone.telemetry.forageStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BOTANICAL FLORA */}
          {activeTab === 'flora' && (
            <div className="p-6 sm:p-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-xl font-bold text-slate-900">
                    Indigenous Foraging Flora Taxonomy
                  </h4>
                  <p className="text-xs text-slate-500">
                    Each plant contributes distinctive volatile aromatic esters, pollen protein profiles, and nectar enzymes.
                  </p>
                </div>

                {/* Season filter */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-medium">
                  {['all', 'Spring', 'High Summer', 'Late Summer / Autumn'].map((season) => (
                    <button
                      key={season}
                      onClick={() => setFloraSeasonFilter(season)}
                      className={`px-3 py-1 rounded-md transition cursor-pointer ${
                        floraSeasonFilter === season
                          ? 'bg-white text-emerald-950 font-bold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {season === 'all' ? 'All Seasons' : season}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flora Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFlora.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedFloraModal(item)}
                    className="p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-700/50 hover:shadow-xs transition space-y-3 text-left group cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold tracking-wider block">
                          {item.family} &bull; {item.bloomSeason}
                        </span>
                        <h5 className="font-serif text-lg font-bold text-slate-900">
                          {item.commonName}
                        </h5>
                        <p className="text-xs italic text-slate-500 font-serif">
                          {item.scientificName}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] uppercase text-slate-400 font-mono block">Nectar Sugar</span>
                        <span className="text-sm font-mono font-bold text-amber-900">{item.nectarBrix}&deg; Brix</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.sensoryContribution}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-3 h-3 rounded-full border border-slate-300" 
                          style={{ backgroundColor: item.pollenHex }}
                        />
                        <span className="text-[11px] text-slate-500 font-medium">
                          Pollen: {item.pollenColor}
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-800 font-mono flex items-center gap-1">
                        <Calendar size={12} />
                        {item.bloomWindow}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SENSORY RADAR & PFUND SCALE */}
          {activeTab === 'sensory' && (
            <div className="p-6 sm:p-10 space-y-8">
              <div>
                <h4 className="font-serif text-xl font-bold text-slate-900 mb-1">
                  Sensory Organoleptic Spectrum &amp; Color Grading
                </h4>
                <p className="text-xs text-slate-500">
                  Calibrated according to International Honey Commission (IHC) sensory profiling criteria.
                </p>
              </div>

              {/* Pfund Scale Visual Bar */}
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Pfund Optical Colorimeter Grade
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                    {currentZone.sensory.pfundScaleMm} mm Pfund &bull; {currentZone.sensory.pfundColorName}
                  </span>
                </div>

                {/* Color bar gradient */}
                <div className="relative h-6 w-full rounded-lg overflow-hidden bg-gradient-to-r from-[#FFFBEB] via-[#FDE68A] via-[#F59E0B] via-[#B45309] to-[#3B1705] border border-slate-300 shadow-inner">
                  <div 
                    className="absolute top-0 bottom-0 w-2.5 bg-white border-2 border-slate-900 shadow-md rounded-xs -translate-x-1/2 transition-all duration-500"
                    style={{ left: `${Math.min(100, Math.max(0, (currentZone.sensory.pfundScaleMm / 140) * 100))}%` }}
                    title={`${currentZone.sensory.pfundScaleMm} mm`}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span>0 mm (Water White)</span>
                  <span>34 mm (Extra Light Amber)</span>
                  <span>85 mm (Amber)</span>
                  <span>140 mm (Dark Amber)</span>
                </div>
              </div>

              {/* Sensory Metric Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Sweetness Intensity', value: currentZone.sensory.sweetness, desc: 'Fructose-led perceived palate sweetness' },
                  { label: 'Floral Aromatics', value: currentZone.sensory.floralIntensity, desc: 'Volatile terpene and ester concentrations' },
                  { label: 'Woody & Resinous Depth', value: currentZone.sensory.woodyResinous, desc: 'Hemlock, pine honeydew, and pinene esters' },
                  { label: 'Malt & Caramel Notes', value: currentZone.sensory.maltCaramel, desc: 'Dark molasses and caramelized minerals' },
                  { label: 'Natural Acidity', value: currentZone.sensory.acidity, desc: 'Organic gluconic acids and tart berry notes' },
                  { label: 'Density & Viscosity', value: currentZone.sensory.viscosity, desc: 'Low moisture body and velvety mouthfeel' },
                ].map((metric) => (
                  <div key={metric.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-800">{metric.label}</span>
                      <span className="font-mono font-bold text-emerald-900">{metric.value}/100</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div 
                        className="h-full bg-emerald-800 rounded-full transition-all duration-500"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 block">{metric.desc}</span>
                  </div>
                ))}
              </div>

              {/* Sommelier Tasting Note */}
              <div className="p-6 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                  Sommelier Organoleptic Impression
                </span>
                <blockquote className="font-serif italic text-base sm:text-lg text-slate-900 leading-relaxed">
                  &quot;{currentZone.pairings.sommelierNote}&quot;
                </blockquote>
              </div>
            </div>
          )}

          {/* TAB 4: LAB CERTIFICATE (BATCH INSPECTOR) */}
          {activeTab === 'lab' && (
            <div className="p-6 sm:p-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h4 className="font-serif text-xl font-bold text-slate-900">
                    Official Spectrophotometric Lab Certificate
                  </h4>
                  <p className="text-xs text-slate-500">
                    Certified by independent Sussex County Melissopalynology Laboratory.
                  </p>
                </div>

                {/* Batch lookup bar */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={batchInput}
                      onChange={(e) => setBatchInput(e.target.value)}
                      placeholder="e.g. LOT-NJ-2026-DEC"
                      className="pl-8 pr-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 w-44"
                    />
                    <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
                  </div>
                  <button
                    onClick={() => handleVerifyBatch()}
                    disabled={isVerifyingBatch}
                    className="px-3 py-1.5 rounded-lg bg-emerald-900 text-white text-xs font-semibold hover:bg-emerald-800 transition cursor-pointer disabled:opacity-50"
                  >
                    {isVerifyingBatch ? 'Checking...' : 'Verify Lot'}
                  </button>
                </div>
              </div>

              {/* Batch Quick Switch Buttons */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Active Harvest Lots:</span>
                {['LOT-NJ-2026-DEC', 'LOT-NJ-2026-SKY', 'LOT-NJ-2026-PIN', 'LOT-NJ-2026-DEL'].map((lot) => (
                  <button
                    key={lot}
                    onClick={() => {
                      setBatchInput(lot);
                      handleVerifyBatch(lot);
                    }}
                    className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition cursor-pointer border ${
                      batchInput === lot
                        ? 'bg-emerald-950 text-amber-300 border-emerald-950 font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {lot}
                  </button>
                ))}
              </div>

              {batchError && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                  {batchError}
                </div>
              )}

              {/* Certificate Document Card */}
              <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-300 shadow-xs space-y-6 text-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-900 font-bold block">
                      Certificate of Chemical &amp; Melissopalynological Analysis
                    </span>
                    <h5 className="font-serif text-xl font-bold text-slate-900">
                      Harvest Lot: {batchResult?.lotNumber || currentZone.labCertificate.lotNumber}
                    </h5>
                    <p className="text-xs text-slate-600">
                      Region: {batchResult?.region || currentZone.region} &bull; {currentZone.county}
                    </p>
                  </div>

                  <div className="text-right font-mono text-xs">
                    <span className="text-emerald-900 font-bold flex items-center justify-end gap-1">
                      <CheckCircle2 size={14} className="text-emerald-700" /> Certified Grade A Unadulterated
                    </span>
                    <span className="text-slate-500 block text-[11px]">
                      Test Date: {batchResult?.certificate.testedDate || currentZone.labCertificate.testedDate}
                    </span>
                  </div>
                </div>

                {/* Analytical Results Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div className="p-3 bg-white rounded-lg border border-stone-200">
                    <span className="text-[10px] text-slate-500 uppercase block">Diastase (Schade DN)</span>
                    <span className="text-base font-bold text-emerald-900">
                      {batchResult?.certificate.diastaseNumber || currentZone.labCertificate.diastaseNumber} DN
                    </span>
                    <span className="text-[10px] text-emerald-700 block">Pass (Limit &gt; 8 DN)</span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-stone-200">
                    <span className="text-[10px] text-slate-500 uppercase block">HMF Level</span>
                    <span className="text-base font-bold text-slate-900">
                      {batchResult?.certificate.hmfMgKg || currentZone.labCertificate.hmfMgKg} mg/kg
                    </span>
                    <span className="text-[10px] text-emerald-700 block">Fresh (&lt; 10 mg/kg)</span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-stone-200">
                    <span className="text-[10px] text-slate-500 uppercase block">Moisture Density</span>
                    <span className="text-base font-bold text-slate-900">
                      {batchResult?.certificate.moisturePercent || currentZone.labCertificate.moisturePercent}%
                    </span>
                    <span className="text-[10px] text-emerald-700 block">Optimal (&lt; 18%)</span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-stone-200">
                    <span className="text-[10px] text-slate-500 uppercase block">Native Pollen Count</span>
                    <span className="text-base font-bold text-slate-900">
                      {(batchResult?.certificate.pollenDensityPerGram || currentZone.labCertificate.pollenDensityPerGram).toLocaleString()} / g
                    </span>
                    <span className="text-[10px] text-emerald-700 block">Unfiltered</span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-600 space-y-1 border-t border-stone-200">
                  <p>
                    <strong>Laboratory:</strong> {currentZone.labCertificate.certificationAuthority}
                  </p>
                  <p>
                    <strong>Principal Analyst:</strong> {currentZone.labCertificate.analystSignature}
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    Methodology: Spectrophotometric measurement of diastase hydrolysis rate via Phadebas blue starch dye. HMF determined via White spectrophotometric absorbance at 284nm &amp; 336nm.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SOMMELIER PAIRINGS */}
          {activeTab === 'pairings' && (
            <div className="p-6 sm:p-10 space-y-8">
              <div>
                <h4 className="font-serif text-xl font-bold text-slate-900 mb-1">
                  Gastronomic Pairing Guide
                </h4>
                <p className="text-xs text-slate-500">
                  Curated pairing suggestions to elevate savory courses, cheese boards, and afternoon tea rituals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cheeses */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                    Artisanal Cheeses
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {currentZone.pairings.cheeses.map((c, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Breads & Charcuterie */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                    Breads &amp; Pastries
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {currentZone.pairings.breads.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-amber-700 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Teas & Infusions */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-teal-900 uppercase tracking-wider block">
                    Teas &amp; Botanicals
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {currentZone.pairings.teas.map((t, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-teal-700 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Culinary Notes */}
              <div className="p-6 rounded-xl bg-emerald-950 text-white space-y-3">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  Chef&apos;s Culinary Applications
                </span>
                <ul className="space-y-2 text-xs text-emerald-100/90 list-disc list-inside">
                  {currentZone.pairings.culinaryUses.map((use, i) => (
                    <li key={i} className="leading-relaxed">{use}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Featured Single-Harvest Honey Jars Mapped to this Terroir */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              Reserve Offerings
            </span>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Vessels Harvested From {currentZone.name}
            </h3>
          </div>

          <Link
            href="/honey"
            prefetch={true}
            className="text-xs font-bold text-emerald-900 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Raw Varietals</span>
            <ChevronRight size={13} />
          </Link>
        </div>

        {matchingProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
            <Droplets size={28} className="mx-auto text-amber-600" />
            <h4 className="font-serif text-lg font-bold text-slate-900">Next Vintage Currently Aging in Apiary Vault</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Our single-harvest extraction for this microclimate is resting below 95&deg;F. Browse our full cellar for current availability.
            </p>
            <Link
              href="/honey"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-900 text-white text-xs font-semibold hover:bg-emerald-800 transition"
            >
              <span>Explore All Honey Products</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </section>

      {/* Cold Extraction Standards Education */}
      <section className="bg-slate-50 rounded-2xl p-8 sm:p-12 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Thermometer size={18} />
          </div>
          <h4 className="font-serif text-lg font-bold text-slate-900">Cold Extracted ≤ 95°F</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Industrial commercial honey is flash-heated to 160°F to prevent crystallization, which destroys delicate volatile floral aromatics and natural enzymes. We extract strictly at natural hive temperature.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
            <Activity size={18} />
          </div>
          <h4 className="font-serif text-lg font-bold text-slate-900">Lab-Certified Diastase Index</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every batch undergoes certified spectrophotometric enzyme testing. Our honeys consistently score a Diastase Number (DN) greater than 28, well exceeding European luxury standards.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-950 flex items-center justify-center font-bold">
            <Droplets size={18} />
          </div>
          <h4 className="font-serif text-lg font-bold text-slate-900">Zero Micro-Filtration</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            We only pass nectar through a coarse mesh gravity strainer to remove large wax flakes. Microscopic native pollen grains and natural propolis bioflavonoids remain completely intact.
          </p>
        </div>
      </section>

      {/* Terroir Side-by-Side Comparison Modal */}
      {isComparisonOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsComparisonOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 text-left my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
                  Scientific Comparison
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Compare Terroir Microclimates Side-by-Side
                </h3>
              </div>
              <button
                onClick={() => setIsComparisonOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Selector Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Terroir A</label>
                <select
                  value={activeZoneId}
                  onChange={(e) => setActiveZoneId(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  {zones.map((z) => (
                    <option key={z.id} value={z.id}>{z.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Terroir B</label>
                <select
                  value={compareZoneId}
                  onChange={(e) => setCompareZoneId(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  {zones.map((z) => (
                    <option key={z.id} value={z.id}>{z.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Parameter</th>
                    <th className="p-3 text-emerald-900 font-serif">{currentZone.name}</th>
                    <th className="p-3 text-amber-900 font-serif">{comparisonZone.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">Elevation</td>
                    <td className="p-3 font-mono font-bold text-slate-900">{currentZone.elevation}</td>
                    <td className="p-3 font-mono font-bold text-slate-900">{comparisonZone.elevation}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">Harvest Season</td>
                    <td className="p-3">{currentZone.season}</td>
                    <td className="p-3">{comparisonZone.season}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">Moisture Content</td>
                    <td className="p-3 font-mono font-bold text-emerald-900">{currentZone.labCertificate.moisturePercent}%</td>
                    <td className="p-3 font-mono font-bold text-amber-900">{comparisonZone.labCertificate.moisturePercent}%</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">Diastase Number (DN)</td>
                    <td className="p-3 font-mono font-bold text-emerald-900">{currentZone.labCertificate.diastaseNumber} DN</td>
                    <td className="p-3 font-mono font-bold text-amber-900">{comparisonZone.labCertificate.diastaseNumber} DN</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">Pfund Color Scale</td>
                    <td className="p-3 font-mono">{currentZone.sensory.pfundScaleMm} mm ({currentZone.sensory.pfundColorName})</td>
                    <td className="p-3 font-mono">{comparisonZone.sensory.pfundScaleMm} mm ({comparisonZone.sensory.pfundColorName})</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">Soil Geology</td>
                    <td className="p-3 text-slate-700">{currentZone.soilGeology.formation}</td>
                    <td className="p-3 text-slate-700">{comparisonZone.soilGeology.formation}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">Primary Floral Nectar</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {currentZone.flora.map(f => (
                          <span key={f.id} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-medium">
                            {f.commonName}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {comparisonZone.flora.map(f => (
                          <span key={f.id} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-medium">
                            {f.commonName}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">Dominant Sensory Note</td>
                    <td className="p-3 italic text-slate-700">&quot;{currentZone.pairings.sommelierNote.slice(0, 80)}...&quot;</td>
                    <td className="p-3 italic text-slate-700">&quot;{comparisonZone.pairings.sommelierNote.slice(0, 80)}...&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsComparisonOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flora Inspection Detail Modal */}
      {selectedFloraModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedFloraModal(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5 text-left my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 tracking-wider block">
                  Botanical Specimen &bull; {selectedFloraModal.family}
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  {selectedFloraModal.commonName}
                </h3>
                <p className="text-xs italic text-slate-500 font-serif">
                  {selectedFloraModal.scientificName}
                </p>
              </div>
              <button
                onClick={() => setSelectedFloraModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Bloom Window:</span>
                  <span className="font-semibold text-slate-900">{selectedFloraModal.bloomWindow} ({selectedFloraModal.bloomSeason})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nectar Sugar Concentration:</span>
                  <span className="font-mono font-bold text-amber-900">{selectedFloraModal.nectarBrix}&deg; Brix</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Pollen Spectral Hue:</span>
                  <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                    <span 
                      className="w-3 h-3 rounded-full border border-slate-300"
                      style={{ backgroundColor: selectedFloraModal.pollenHex }}
                    />
                    {selectedFloraModal.pollenColor}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Sensory &amp; Enzymatic Contribution
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/60">
                  {selectedFloraModal.sensoryContribution}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedFloraModal(null)}
                className="px-4 py-2 rounded-xl bg-emerald-950 text-white text-xs font-semibold hover:bg-emerald-900 transition cursor-pointer"
              >
                Close Specimen
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
