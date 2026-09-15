'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Droplets, 
  Shield, 
  Gift, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface Bee {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  size: number;
  wingAngle: number;
  wingSpeed: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  time: number;
  color: string;
  isScout?: boolean;
  trail: { x: number; y: number; alpha: number }[];
}

interface PollenParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  color: string;
}

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Realistic honeybee swarm
    const bees: Bee[] = [
      {
        x: width * 0.45,
        y: height * 0.35,
        vx: 0,
        vy: 0,
        targetX: width * 0.5,
        targetY: height * 0.35,
        size: 16,
        wingAngle: 0,
        wingSpeed: 0.65,
        wobbleSpeed: 0.08,
        wobbleAmp: 2.8,
        time: 0,
        color: '#f59e0b',
        isScout: true,
        trail: [],
      },
      {
        x: width * 0.2,
        y: height * 0.3,
        vx: 1.2,
        vy: 0.6,
        targetX: width * 0.25,
        targetY: height * 0.25,
        size: 13,
        wingAngle: 0,
        wingSpeed: 0.55,
        wobbleSpeed: 0.06,
        wobbleAmp: 2.2,
        time: 1.2,
        color: '#d97706',
        trail: [],
      },
      {
        x: width * 0.8,
        y: height * 0.4,
        vx: -1.1,
        vy: 0.8,
        targetX: width * 0.75,
        targetY: height * 0.45,
        size: 14,
        wingAngle: 0,
        wingSpeed: 0.6,
        wobbleSpeed: 0.07,
        wobbleAmp: 2.5,
        time: 2.5,
        color: '#b45309',
        trail: [],
      },
      {
        x: width * 0.3,
        y: height * 0.7,
        vx: 0.8,
        vy: -1.2,
        targetX: width * 0.35,
        targetY: height * 0.65,
        size: 13,
        wingAngle: 0,
        wingSpeed: 0.58,
        wobbleSpeed: 0.09,
        wobbleAmp: 2.0,
        time: 3.8,
        color: '#f59e0b',
        trail: [],
      },
      {
        x: width * 0.75,
        y: height * 0.65,
        vx: -1.3,
        vy: -0.5,
        targetX: width * 0.7,
        targetY: height * 0.6,
        size: 15,
        wingAngle: 0,
        wingSpeed: 0.62,
        wobbleSpeed: 0.05,
        wobbleAmp: 2.9,
        time: 4.6,
        color: '#f59e0b',
        trail: [],
      },
    ];

    let particles: PollenParticle[] = [];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Ambient golden pollen dust motes
      if (Math.random() < 0.2 && particles.length < 75) {
        particles.push({
          x: Math.random() * width,
          y: height + 10,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -(0.3 + Math.random() * 0.7),
          radius: 1 + Math.random() * 2,
          alpha: 0.5 + Math.random() * 0.4,
          decay: 0.002 + Math.random() * 0.003,
          color: Math.random() > 0.4 ? 'rgba(245, 158, 11, ' : 'rgba(251, 191, 36, ',
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y < -20) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      }

      // Render Bees
      bees.forEach((bee, idx) => {
        bee.time += 0.04;
        bee.wingAngle += bee.wingSpeed;

        if (bee.isScout && mouseRef.current.active) {
          const dx = mouseRef.current.x - bee.x;
          const dy = mouseRef.current.y - bee.y;
          bee.vx += dx * 0.0035;
          bee.vy += dy * 0.0035;
          bee.vx *= 0.93;
          bee.vy *= 0.93;
        } else {
          if (Math.random() < 0.025 || Math.hypot(bee.targetX - bee.x, bee.targetY - bee.y) < 35) {
            bee.targetX = width * 0.15 + Math.random() * (width * 0.7);
            bee.targetY = height * 0.15 + Math.random() * (height * 0.7);
          }

          const dx = bee.targetX - bee.x;
          const dy = bee.targetY - bee.y;
          bee.vx += dx * 0.0008;
          bee.vy += dy * 0.0008;
          bee.vx *= 0.95;
          bee.vy *= 0.95;
        }

        const wobbleX = Math.sin(bee.time * 5 + idx) * bee.wobbleAmp;
        const wobbleY = Math.cos(bee.time * 4 + idx) * bee.wobbleAmp;

        bee.x += bee.vx + wobbleX * 0.12;
        bee.y += bee.vy + wobbleY * 0.12;

        const pad = 40;
        if (bee.x < pad) bee.vx += 0.3;
        if (bee.x > width - pad) bee.vx -= 0.3;
        if (bee.y < pad) bee.vy += 0.3;
        if (bee.y > height - pad) bee.vy -= 0.3;

        // Dotted flight trail
        if (Math.random() < 0.35) {
          bee.trail.push({ x: bee.x, y: bee.y, alpha: 0.5 });
          if (bee.trail.length > 14) bee.trail.shift();
        }

        ctx.save();
        for (let t = 0; t < bee.trail.length; t++) {
          const pt = bee.trail[t];
          pt.alpha -= 0.025;
          if (pt.alpha > 0) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 158, 11, ${pt.alpha * 0.5})`;
            ctx.fill();
          }
        }
        ctx.restore();

        const heading = Math.atan2(bee.vy, bee.vx) + Math.PI / 2;

        ctx.save();
        ctx.translate(bee.x, bee.y);
        ctx.rotate(heading);

        const s = bee.size;
        const wingScaleY = Math.sin(bee.wingAngle) * 0.85;

        // Left Wing
        ctx.save();
        ctx.translate(-s * 0.35, -s * 0.1);
        ctx.scale(1, wingScaleY);
        ctx.beginPath();
        ctx.ellipse(-s * 0.45, -s * 0.25, s * 0.55, s * 0.22, -Math.PI / 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.strokeStyle = 'rgba(254, 243, 199, 0.8)';
        ctx.lineWidth = 0.8;
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Right Wing
        ctx.save();
        ctx.translate(s * 0.35, -s * 0.1);
        ctx.scale(1, wingScaleY);
        ctx.beginPath();
        ctx.ellipse(s * 0.45, -s * 0.25, s * 0.55, s * 0.22, Math.PI / 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.strokeStyle = 'rgba(254, 243, 199, 0.8)';
        ctx.lineWidth = 0.8;
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Stinger
        ctx.beginPath();
        ctx.moveTo(0, s * 0.55);
        ctx.lineTo(-s * 0.08, s * 0.72);
        ctx.lineTo(s * 0.08, s * 0.72);
        ctx.closePath();
        ctx.fillStyle = '#1e293b';
        ctx.fill();

        // Abdomen (Striped Amber & Slate)
        ctx.beginPath();
        ctx.ellipse(0, s * 0.2, s * 0.3, s * 0.42, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = s * 0.1;
        ctx.strokeStyle = '#0f172a';
        ctx.arc(0, s * 0.08, s * 0.26, 0.2, Math.PI - 0.2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, s * 0.28, s * 0.24, 0.2, Math.PI - 0.2);
        ctx.stroke();

        // Thorax
        ctx.beginPath();
        ctx.ellipse(0, -s * 0.18, s * 0.28, s * 0.24, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#451a03';
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.arc(0, -s * 0.44, s * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = '#1e1b4b';
        ctx.fill();

        // Antennae
        ctx.beginPath();
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 0.8;
        ctx.moveTo(-s * 0.07, -s * 0.5);
        ctx.quadraticCurveTo(-s * 0.18, -s * 0.7, -s * 0.25, -s * 0.65);
        ctx.moveTo(s * 0.07, -s * 0.5);
        ctx.quadraticCurveTo(s * 0.18, -s * 0.7, s * 0.25, -s * 0.65);
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    // Hide footer and lock scroll while on 404 to guarantee single viewport
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      if (footer) {
        footer.style.display = '';
      }
    };
  }, []);

  return (
    <div className="not-found-viewport relative h-[calc(100dvh-112px)] min-h-[480px] max-h-[calc(100dvh-112px)] flex flex-col items-center justify-center px-4 sm:px-8 overflow-hidden select-none">
      <style>{`
        body:has(.not-found-viewport) footer {
          display: none !important;
        }
        body:has(.not-found-viewport) {
          overflow: hidden !important;
          height: 100vh !important;
          max-height: 100vh !important;
        }
      `}</style>
      
      {/* 1. 60fps Honeybee Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      />

      {/* 2. Soft Ambient Radial Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center overflow-hidden">
        <div className="w-[600px] h-[600px] bg-gradient-to-br from-amber-200 via-emerald-100 to-transparent rounded-full blur-3xl" />
      </div>

      {/* 3. Subtle Editorial 404 Watermark */}
      <div className="absolute z-0 pointer-events-none select-none font-serif text-[120px] xs:text-[150px] sm:text-[200px] font-extrabold text-slate-900/[0.035] leading-none tracking-tighter">
        404
      </div>

      {/* 4. Single-Viewport Content Container */}
      <div className="relative z-10 w-full max-w-xl mx-auto text-center space-y-4 sm:space-y-5 my-auto">
        
        {/* Editorial Sub-header */}
        <div className="space-y-1">
          <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.3em] text-emerald-800 uppercase block">
            Sussex County Apiary &bull; 404
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Beyond the Foraging Belt
          </h1>
        </div>

        {/* Narrative Description */}
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          The varietal reserve, harvest batch, or URL you requested is out of range of our documented Kittatinny Ridge meadows.
        </p>

        {/* 3 Streamlined Compact Destination Cards (Always 1 Row) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-lg mx-auto text-left">
          
          <Link
            href="/honey"
            className="p-2.5 sm:p-3 rounded-xl border border-slate-200/90 bg-white/95 hover:bg-white hover:border-emerald-800 hover:shadow-md transition-all duration-200 group flex flex-col sm:flex-row items-center sm:items-start gap-2 text-center sm:text-left cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Droplets size={15} strokeWidth={2.4} />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-950 transition truncate">
                Raw Honey
              </h3>
              <p className="text-[10px] text-slate-500 hidden sm:block truncate">
                Cold-spun reserves
              </p>
            </div>
          </Link>

          <Link
            href="/beekeeping"
            className="p-2.5 sm:p-3 rounded-xl border border-slate-200/90 bg-white/95 hover:bg-white hover:border-emerald-800 hover:shadow-md transition-all duration-200 group flex flex-col sm:flex-row items-center sm:items-start gap-2 text-center sm:text-left cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Shield size={15} strokeWidth={2.4} />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-950 transition truncate">
                Apiary Gear
              </h3>
              <p className="text-[10px] text-slate-500 hidden sm:block truncate">
                Suits &amp; cedar hives
              </p>
            </div>
          </Link>

          <Link
            href="/corporate"
            className="p-2.5 sm:p-3 rounded-xl border border-slate-200/90 bg-white/95 hover:bg-white hover:border-emerald-800 hover:shadow-md transition-all duration-200 group flex flex-col sm:flex-row items-center sm:items-start gap-2 text-center sm:text-left cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Gift size={15} strokeWidth={2.4} />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-950 transition truncate">
                Gift Vaults
              </h3>
              <p className="text-[10px] text-slate-500 hidden sm:block truncate">
                Walnut chests
              </p>
            </div>
          </Link>

        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-row items-center justify-center gap-3 pt-1">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm hover:shadow-md cursor-pointer"
          >
            <ArrowLeft size={13} className="text-amber-400" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs uppercase tracking-wider transition shadow-2xs cursor-pointer"
          >
            <span>All Products</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Atelier Coordinates Footer Marker */}
        <div className="pt-2 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
          41°03&apos;18&quot;N 74°44&apos;31&quot;W &bull; Kittatinny Ridge Apiary
        </div>

      </div>
    </div>
  );
}
