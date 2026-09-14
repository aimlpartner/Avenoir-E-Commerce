'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { Sparkles, Sliders, Box, HelpCircle } from 'lucide-react';

interface Product3DPreviewProps {
  productId: string;
  selectedFinish: string;
  engravingStyle: 'laser-charred' | 'gold-leaf';
  scale: number;
  mockPreviewGraphic: {
    svgPaths?: string[];
    registryNumber?: string;
    story?: string;
    woodAdvice?: string;
    borderColorStyle?: string;
  };
  recipientName?: string;
}

// Converts a bump canvas into a Sobel-based RGB normal map
function bumpCanvasToNormalMap(bumpCanvas: HTMLCanvasElement, strength = 3.0): HTMLCanvasElement {
  const w = bumpCanvas.width, h = bumpCanvas.height;
  const ctx2d = bumpCanvas.getContext('2d');
  if (!ctx2d) return bumpCanvas;
  const src = ctx2d.getImageData(0, 0, w, h);
  const out = document.createElement('canvas');
  out.width = w; out.height = h;
  const ctx = out.getContext('2d');
  if (!ctx) return bumpCanvas;
  const dst = ctx.createImageData(w, h);

  const getH = (x: number, y: number) => {
    // Clamp to border pixels
    const clampX = Math.max(0, Math.min(w - 1, x));
    const clampY = Math.max(0, Math.min(h - 1, y));
    const i = (clampY * w + clampX) * 4;
    return src.data[i] / 255.0;
  };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Sobel Kernels for X and Y derivatives
      const dX = (getH(x + 1, y - 1) + 2 * getH(x + 1, y) + getH(x + 1, y + 1))
               - (getH(x - 1, y - 1) + 2 * getH(x - 1, y) + getH(x - 1, y + 1));
      const dY = (getH(x - 1, y + 1) + 2 * getH(x, y + 1) + getH(x + 1, y + 1))
               - (getH(x - 1, y - 1) + 2 * getH(x, y - 1) + getH(x + 1, y - 1));

      // Compose tangent space normal vector (invert x and y depending on standard normal coordinates)
      const nx = -dX * strength;
      const ny = -dY * strength;
      const nz = 1.0;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);

      const i = (y * w + x) * 4;
      dst.data[i]     = ((nx / len) * 0.5 + 0.5) * 255;  // Red channel
      dst.data[i + 1] = ((ny / len) * 0.5 + 0.5) * 255;  // Green channel
      dst.data[i + 2] = ((nz / len) * 0.5 + 0.5) * 255;  // Blue channel
      dst.data[i + 3] = 255;                             // Alpha
    }
  }
  ctx.putImageData(dst, 0, 0);
  return out;
}

export default function Product3DPreview({
  productId,
  selectedFinish,
  engravingStyle,
  scale,
  mockPreviewGraphic,
  recipientName = "Isabella Rossi.",
}: Product3DPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // States for interactive lid animations & camera overrides
  const [isOpen, setIsOpen] = useState(false);
  const [showWireframe, setShowWireframe] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.005);
  const [isRotating, setIsRotating] = useState(true);

  // Keep references to components we want to animate in our render loop
  const lidGroupRef = useRef<THREE.Group | null>(null);
  const corkRef = useRef<THREE.Mesh | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);

  // Deterministic Pseudo-Random Number Generator (LCG)
  const createPRNG = (seed: number) => {
    let s = seed;
    return () => {
      s = (s * 48271) % 2147483647;
      return s / 2147483647;
    };
  };

  // Generate procedural wood texture to avoid external image hosting breaks
  const createProceduralWoodTexture = useCallback((type: 'walnut' | 'maple', finishName: string) => {
    const size = 2048;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const rand = createPRNG(42); // Seeded PRNG for deterministic texture align

    // Baseline wood colors
    let baseCol = '#3d2516'; // Raw walnut default
    let grainCol = '#1f1109'; 
    let microGapCol = '#523420';

    if (type === 'walnut') {
      if (finishName.includes('Dark')) {
        baseCol = '#25150c';
        grainCol = '#0f0805';
        microGapCol = '#382012';
      } else if (finishName.includes('Raw')) {
        baseCol = '#4e3322';
        grainCol = '#25140a';
        microGapCol = '#63432e';
      } else { // Satin Lacquer
        baseCol = '#462b1a';
        grainCol = '#221208';
        microGapCol = '#5d3d28';
      }
    } else { // maple wood
      if (finishName.includes('Beeswax')) {
        baseCol = '#e7cd9d';
        grainCol = '#bba172';
        microGapCol = '#f2dfbc';
      } else { // Clear Satin
        baseCol = '#f5e6ca';
        grainCol = '#cbba9a';
        microGapCol = '#fdfdfb';
      }
    }

    // Fill background with soft organic linear color gradient
    const fillG = ctx.createLinearGradient(0, 0, size, 0);
    fillG.addColorStop(0, baseCol);
    fillG.addColorStop(0.3, baseCol);
    fillG.addColorStop(0.7, microGapCol);
    fillG.addColorStop(1.0, baseCol);
    ctx.fillStyle = fillG;
    ctx.fillRect(0, 0, size, size);

    // Draw wavy fiber grain lines (underlying base sweeps)
    ctx.fillStyle = grainCol;
    for (let i = 0; i < size; i += 2) {
      // Simulating natural timber rings with deterministic sine octaves and noise ripples
      const offset = Math.sin(i * 0.01) * 120 + Math.sin(i * 0.035) * 45 + Math.cos(i * 0.12) * 15 + Math.cos(i * 0.3) * 3;
      const thickness = 0.5 + rand() * 2.5;
      
      ctx.globalAlpha = 0.15 + rand() * 0.3;
      ctx.beginPath();
      ctx.rect(0, i + offset, size, thickness);
      ctx.fill();
    }

    // Draw medullary rays / transverse flakes (light reflective wood wisps in furniture)
    ctx.fillStyle = microGapCol;
    ctx.globalAlpha = 0.15;
    for (let j = 0; j < 600; j++) {
      const rx = rand() * size;
      const ry = rand() * size;
      ctx.fillRect(rx, ry, 15 + rand() * 45, 1.5 + rand() * 1.5);
    }

    // Draw fine high-frequency timber pores (super photorealistic organic wood grain)
    ctx.fillStyle = grainCol;
    for (let p = 0; p < 25000; p++) {
      const px = rand() * size;
      const py = rand() * size;
      const pWidth = 0.8 + rand() * 1.6;
      const pHeight = 4.0 + rand() * 8.5; // Elongated fibers along the wood grains direction
      ctx.globalAlpha = 0.05 + rand() * 0.08;
      ctx.fillRect(px, py, pWidth, pHeight);
    }

    // Draw organic growth knots with tight growth loops!
    ctx.fillStyle = microGapCol;
    ctx.globalAlpha = 0.12;
    for (let k = 0; k < 4; k++) {
      const knotX = rand() * size;
      const knotY = rand() * size;
      const knotR = 15 + rand() * 35;
      
      // Draw nested Growth rings around the knot
      ctx.strokeStyle = grainCol;
      ctx.lineWidth = 1.5;
      for (let r = 8; r < knotR; r += 6) {
        ctx.globalAlpha = 0.07 + rand() * 0.05;
        ctx.beginPath();
        ctx.ellipse(knotX, knotY, r, r * 0.45, Math.PI / 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 0.15;
      const grad = ctx.createRadialGradient(knotX, knotY, 1, knotX, knotY, knotR);
      grad.addColorStop(0, grainCol);
      grad.addColorStop(0.4, baseCol);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(knotX, knotY, knotR, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 1);
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  // Generate deterministic grayscale bump map with pixel-aligned pores and annual rings
  const createProceduralWoodBumpTexture = useCallback((type: 'walnut' | 'maple', finishName: string) => {
    const size = 2048;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const rand = createPRNG(42); // EXACT same seed so features and random placement align perfectly!

    ctx.fillStyle = '#808080'; // Flat middle gray representing zero displacement
    ctx.fillRect(0, 0, size, size);

    // Annual Ring Grooves (Recessed - dark color)
    ctx.fillStyle = '#404040';
    for (let i = 0; i < size; i += 2) {
      const offset = Math.sin(i * 0.01) * 120 + Math.sin(i * 0.035) * 45 + Math.cos(i * 0.12) * 15 + Math.cos(i * 0.3) * 3;
      const thickness = 0.5 + rand() * 2.5;
      
      ctx.globalAlpha = 0.12 + rand() * 0.15;
      ctx.beginPath();
      ctx.rect(0, i + offset, size, thickness);
      ctx.fill();
    }

    // Ray flecks (Raised - white color)
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.15;
    for (let j = 0; j < 600; j++) {
      const rx = rand() * size;
      const ry = rand() * size;
      ctx.fillRect(rx, ry, 15 + rand() * 45, 1.5 + rand() * 1.5);
    }

    // Micro Wood Pores (Deep sharp recess - black dashes)
    ctx.fillStyle = '#000000';
    for (let p = 0; p < 25000; p++) {
      const px = rand() * size;
      const py = rand() * size;
      const pWidth = 0.8 + rand() * 1.6;
      const pHeight = 4.0 + rand() * 8.5;
      ctx.globalAlpha = 0.18 + rand() * 0.22;
      ctx.fillRect(px, py, pWidth, pHeight);
    }

    // Knots depth
    ctx.globalAlpha = 0.15;
    for (let k = 0; k < 4; k++) {
      const knotX = rand() * size;
      const knotY = rand() * size;
      const knotR = 15 + rand() * 35;

      // growth rings recess
      ctx.strokeStyle = '#202020';
      ctx.lineWidth = 1.5;
      for (let r = 8; r < knotR; r += 6) {
        ctx.globalAlpha = 0.2 + rand() * 0.15;
        ctx.beginPath();
        ctx.ellipse(knotX, knotY, r, r * 0.45, Math.PI / 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 0.3;
      const grad = ctx.createRadialGradient(knotX, knotY, 1, knotX, knotY, knotR);
      grad.addColorStop(0, '#000000');
      grad.addColorStop(0.5, '#606060');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(knotX, knotY, knotR, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 1);
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  // Generate dynamic top-carved logo plate canvas matching the calligraphy top in reference image
  const createProceduralTopEngravingTexture = useCallback((
    type: 'walnut' | 'maple',
    finish: string,
    style: 'laser-charred' | 'gold-leaf',
    paths?: string[],
    nameText?: string
  ) => {
    const size = 2048;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const scaleFactor = size / 1024;

    // Render underlying box color
    let baseColor = '#462b1a'; // Walnut preset
    if (type === 'maple') {
      baseColor = finish.includes('Beeswax') ? '#e7cd9d' : '#f5e6ca';
    } else {
      if (finish.includes('Dark')) baseColor = '#25150c';
      else if (finish.includes('Raw')) baseColor = '#503525';
    }
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, size, size);

    // Draw background wood grain in local canvas coordinate for seamless blend
    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 0.08;
    for (let i = 0; i < size; i += Math.max(1, Math.round(3 * scaleFactor))) {
      const offset = Math.sin(i * 0.04 / scaleFactor) * 20 * scaleFactor;
      ctx.beginPath();
      ctx.rect(0, i + offset, size, 1.2 * scaleFactor);
      ctx.fill();
    }

    const isGold = style === 'gold-leaf';
    const mainStrokeColor = isGold ? '#D4AF37' : '#221107'; // Charcoal vs gold leaf
    const borderStrokeColor = isGold ? '#c59d43' : '#150a04';

    ctx.globalAlpha = 1.0;

    // Premium Realistic Debossed Woodburning Carver effect!
    if (!isGold) {
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 4 * scaleFactor;
      ctx.shadowOffsetX = 1 * scaleFactor;
      ctx.shadowOffsetY = 2 * scaleFactor;
    } else {
      ctx.shadowColor = 'rgba(255,220,150,0.15)';
      ctx.shadowBlur = 6 * scaleFactor;
    }

    // Centered luxury text and paths drawing
    if (paths && paths.length > 0) {
      ctx.save();
      // Translate to upper portion of the top lid
      ctx.translate(size / 2, size / 2 - 80 * scaleFactor);
      ctx.scale(1.1 * scaleFactor, 1.1 * scaleFactor);
      ctx.translate(-300, -200); // Standard SVG coordinates offset

      ctx.strokeStyle = mainStrokeColor;
      ctx.lineWidth = isGold ? 10 : 6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      paths.forEach((pStr) => {
        try {
          ctx.beginPath();
          const tokens = pStr.match(/[a-zA-Z]+|[-+]?\d*\.?\d+/g) || [];
          let curX = 0;
          let curY = 0;
          let idx = 0;
          while (idx < tokens.length) {
            const cmd = tokens[idx];
            if (isNaN(Number(cmd))) {
              idx++;
              if (cmd === 'M' || cmd === 'm') {
                const tx = Number(tokens[idx++]);
                const ty = Number(tokens[idx++]);
                curX = tx; curY = ty;
                 ctx.moveTo(curX, curY);
              } else if (cmd === 'L' || cmd === 'l') {
                const tx = Number(tokens[idx++]);
                const ty = Number(tokens[idx++]);
                curX = tx; curY = ty;
                ctx.lineTo(curX, curY);
              } else if (cmd === 'H' || cmd === 'h') {
                const tx = Number(tokens[idx++]);
                curX = tx;
                ctx.lineTo(curX, curY);
              } else if (cmd === 'V' || cmd === 'v') {
                const ty = Number(tokens[idx++]);
                curY = ty;
                ctx.lineTo(curX, curY);
              } else if (cmd === 'Z' || cmd === 'z') {
                ctx.closePath();
              }
            } else {
              const tx = Number(tokens[idx++]);
              const ty = Number(tokens[idx++]);
              ctx.lineTo(tx, ty);
            }
          }
          ctx.stroke();
        } catch (e) {
          console.error("SVG Path render error", e);
        }
      });
      ctx.restore();
    } else {
      // Draw luxury geometric frame borders like reference image
      ctx.strokeStyle = borderStrokeColor;
      ctx.lineWidth = isGold ? 12 * scaleFactor : 6 * scaleFactor;
      ctx.strokeRect(100 * scaleFactor, 100 * scaleFactor, size - 200 * scaleFactor, size - 200 * scaleFactor);
      
      ctx.strokeStyle = mainStrokeColor;
      ctx.lineWidth = isGold ? 6 * scaleFactor : 3 * scaleFactor;
      ctx.strokeRect(130 * scaleFactor, 130 * scaleFactor, size - 260 * scaleFactor, size - 260 * scaleFactor);
    }

    // DRAW THE LUXURY CALLIGRAPHY TYPOGRAPHY ON LID TOP (matching reference style)
    ctx.textAlign = 'center';
    
    // Line 1 & Line 2: Elegant Signature Cursive Calligraphy Script (split into two beautifully spaced lines)
    ctx.fillStyle = mainStrokeColor;
    ctx.font = `italic ${Math.round(52 * scaleFactor)}px "Playfair Display", Georgia, Times, serif`;
    const activeName = nameText || recipientName;
    ctx.fillText("Bespoke Selection", size / 2, size / 2 + 50 * scaleFactor);
    ctx.fillText(`for ${activeName}`, size / 2, size / 2 + 150 * scaleFactor);

    // Line 3: Monospaced/Sans-Serif Subheading matching "WITH GRATITUDE | MONTCLAIRE ESTATES"
    ctx.fillStyle = isGold ? '#EED9AD' : '#573a24';
    ctx.font = `bold ${Math.round(20 * scaleFactor)}px "Space Grotesk", sans-serif`;
    ctx.letterSpacing = "6px";
    ctx.fillText("WITH GRATITUDE  |  MONTCLAIRE ESTATES", size / 2, size / 2 + 250 * scaleFactor);

    // Line 4: Historic catalog registry marking
    ctx.fillStyle = isGold ? 'rgba(212,175,55,0.45)' : 'rgba(87,58,36,0.45)';
    ctx.font = `bold ${Math.round(15 * scaleFactor)}px "JetBrains Mono", monospace`;
    ctx.letterSpacing = "2px";
    ctx.fillText(mockPreviewGraphic.registryNumber || "AV-ESTATE-2026", size / 2, size - 120 * scaleFactor);

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, [mockPreviewGraphic.registryNumber, recipientName]);

  // Generate dynamic front-carved eagle monogram logo badge canvas matching front right in reference
  const createProceduralFrontEngravingTexture = useCallback((
    type: 'walnut' | 'maple',
    finish: string,
    style: 'laser-charred' | 'gold-leaf'
  ) => {
    const size = 2048;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const scaleFactor = size / 1024;

    // Render underlying box color
    let baseColor = '#462b1a';
    if (type === 'maple') {
      baseColor = finish.includes('Beeswax') ? '#e7cd9d' : '#f5e6ca';
    } else {
      if (finish.includes('Dark')) baseColor = '#25150c';
      else if (finish.includes('Raw')) baseColor = '#503525';
    }
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, size, size);

    // Subtle wood grain match
    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 0.08;
    for (let i = 0; i < size; i += Math.max(1, Math.round(3 * scaleFactor))) {
      const offset = Math.sin(i * 0.04 / scaleFactor) * 20 * scaleFactor;
      ctx.beginPath();
      ctx.rect(0, i + offset, size, 1.2 * scaleFactor);
      ctx.fill();
    }

    const isGold = style === 'gold-leaf';
    const mainColor = isGold ? '#D4AF37' : '#221107';

    ctx.globalAlpha = 1.0;

    // Add realistic depth shadow
    if (!isGold) {
      ctx.shadowColor = 'rgba(0,0,0,0.45)';
      ctx.shadowBlur = 4 * scaleFactor;
      ctx.shadowOffsetX = 1 * scaleFactor;
      ctx.shadowOffsetY = 2 * scaleFactor;
    } else {
      ctx.shadowColor = 'rgba(255,220,150,0.15)';
      ctx.shadowBlur = 6 * scaleFactor;
    }

    const centerXRef = size * 0.78;

    // DRAW THE BRAND EAGLE/PHOENIX CREST BADGE ON FRONT RIGHT (matching reference)
    ctx.translate(centerXRef, size / 2 - 40 * scaleFactor);
    ctx.strokeStyle = mainColor;
    ctx.fillStyle = mainColor;
    ctx.lineWidth = 4 * scaleFactor;

    // Vector drawing of the royal phoenix wings crest
    ctx.beginPath();
    // Center stem
    ctx.moveTo(0, -60 * scaleFactor);
    ctx.lineTo(0, 60 * scaleFactor);
    // Draw left wing ribs
    ctx.bezierCurveTo(-20 * scaleFactor, -10 * scaleFactor, -80 * scaleFactor, -30 * scaleFactor, -100 * scaleFactor, 20 * scaleFactor);
    ctx.bezierCurveTo(-80 * scaleFactor, 40 * scaleFactor, -40 * scaleFactor, 20 * scaleFactor, 0, 60 * scaleFactor);
    // Draw right wing ribs
    ctx.bezierCurveTo(40 * scaleFactor, 20 * scaleFactor, 80 * scaleFactor, 40 * scaleFactor, 100 * scaleFactor, 20 * scaleFactor);
    ctx.bezierCurveTo(80 * scaleFactor, -30 * scaleFactor, 20 * scaleFactor, -10 * scaleFactor, 0, -60 * scaleFactor);
    ctx.fill();

    // Draw little phoenix crown and feathers
    ctx.beginPath();
    ctx.arc(0, -80 * scaleFactor, 12 * scaleFactor, 0, Math.PI * 2);
    ctx.fill();
    
    // Crown tips
    ctx.beginPath();
    ctx.moveTo(-15 * scaleFactor, -95 * scaleFactor); ctx.lineTo(-10 * scaleFactor, -85 * scaleFactor); ctx.lineTo(0, -100 * scaleFactor); ctx.lineTo(10 * scaleFactor, -85 * scaleFactor); ctx.lineTo(15 * scaleFactor, -95 * scaleFactor);
    ctx.stroke();

    // Reset translate
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // BRAND MARK LABEL TYPOGRAPHY (matching "AETHELRED FINANCIAL" standard on front right)
    ctx.textAlign = 'center';
    ctx.fillStyle = mainColor;
    ctx.font = `bold ${Math.round(28 * scaleFactor)}px "Space Grotesk", sans-serif`;
    ctx.letterSpacing = "4px";
    ctx.fillText("AVENOIR ATELIER", centerXRef, size / 2 + 150 * scaleFactor);
    
    ctx.fillStyle = isGold ? '#EED9AD' : '#573a24';
    ctx.font = `italic ${Math.round(18 * scaleFactor)}px serif`;
    ctx.letterSpacing = "1px";
    ctx.fillText("HONEY RESERVES", centerXRef, size / 2 + 195 * scaleFactor);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, []);

  // Generate dynamic engraved lid interior underside monogram/crest
  const createProceduralLidInteriorTexture = useCallback((
    type: 'walnut' | 'maple',
    finish: string,
    style: 'laser-charred' | 'gold-leaf'
  ) => {
    const size = 2048;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const scaleFactor = size / 1024;

    // Render underlying grain color matching the wood base
    let baseColor = '#462b1a';
    if (type === 'maple') {
      baseColor = finish.includes('Beeswax') ? '#e7cd9d' : '#f5e6ca';
    } else {
      if (finish.includes('Dark')) baseColor = '#25150c';
      else if (finish.includes('Raw')) baseColor = '#503525';
    }
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, size, size);

    // Dynamic grain lines corresponding to standard grain directions
    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 0.08;
    for (let i = 0; i < size; i += Math.max(1, Math.round(3 * scaleFactor))) {
      const offset = Math.sin(i * 0.04 / scaleFactor) * 20 * scaleFactor;
      ctx.beginPath();
      ctx.rect(0, i + offset, size, 1.2 * scaleFactor);
      ctx.fill();
    }

    const isGold = style === 'gold-leaf';
    const mainColor = isGold ? '#D4AF37' : '#221107';

    ctx.globalAlpha = 1.0;

    // Add realistic depth shadow on engraving
    if (!isGold) {
      ctx.shadowColor = 'rgba(0,0,0,0.45)';
      ctx.shadowBlur = 4 * scaleFactor;
      ctx.shadowOffsetX = 1 * scaleFactor;
      ctx.shadowOffsetY = 2 * scaleFactor;
    } else {
      ctx.shadowColor = 'rgba(255,220,150,0.15)';
      ctx.shadowBlur = 6 * scaleFactor;
    }

    // DRAW THE LUXURIOUS INTERLOCKING ISOMETRIC CUBE "G" MONOGRAM IN CENTER
    const cx = size / 2;
    const cy = size / 2;
    const R = 150 * scaleFactor;

    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 14 * scaleFactor;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const pts = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 6;
      pts.push({
        x: cx + R * Math.cos(angle),
        y: cy + R * Math.sin(angle)
      });
    }

    // Outer spiral to outline the "G" shape
    ctx.beginPath();
    ctx.moveTo(cx + 40 * scaleFactor, cy);
    ctx.lineTo(pts[1].x - 30 * scaleFactor, pts[1].y);
    ctx.lineTo(pts[1].x, pts[1].y);
    ctx.lineTo(pts[2].x, pts[2].y);
    ctx.lineTo(pts[3].x, pts[3].y);
    ctx.lineTo(pts[4].x, pts[4].y);
    ctx.lineTo(pts[5].x, pts[5].y);
    ctx.lineTo(pts[0].x, pts[0].y);
    ctx.lineTo(cx, cy + 30 * scaleFactor);
    ctx.stroke();

    // Additional interlocking lines that create the premium wireframe-cube simulation
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    ctx.lineTo(cx, cy);
    ctx.lineTo(pts[3].x, pts[3].y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pts[4].x, pts[4].y);
    ctx.lineTo(cx - 30 * scaleFactor, cy - 15 * scaleFactor);
    ctx.stroke();

    // Clean up shadow
    ctx.shadowColor = 'transparent';

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, []);

  // Generate dynamic citrus wedge slices
  const createProceduralCitrusSliceTexture = useCallback(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 20;

    ctx.clearRect(0, 0, size, size);

    // 1. Dark Orange/Brown outer skin (rind)
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#9b4703';
    ctx.fill();

    // 2. Light cream/yellow rind boundary
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 15, 0, Math.PI * 2);
    ctx.fillStyle = '#eadeb1';
    ctx.fill();

    // 3. Central pulp body
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 25, 0, Math.PI * 2);
    ctx.fillStyle = '#b55a0b';
    ctx.fill();

    // 4. Draw individual fruit wedges (pulp segments)
    const numSegments = 10;
    ctx.fillStyle = '#d46c07';
    for (let i = 0; i < numSegments; i++) {
      const angleStart = (i * Math.PI * 2) / numSegments + 0.05;
      const angleEnd = ((i + 1) * Math.PI * 2) / numSegments - 0.05;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius - 30, angleStart, angleEnd);
      ctx.closePath();
      ctx.fill();
    }

    // 5. Pale white core details
    ctx.beginPath();
    ctx.arc(cx, cy, 25, 0, Math.PI * 2);
    ctx.fillStyle = '#eadeb1';
    ctx.fill();

    // 6. Tiny seeds
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * (radius - 80);
      ctx.beginPath();
      ctx.arc(cx + dist * Math.cos(angle), cy + dist * Math.sin(angle), 3, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, []);

  // Generate beautiful gold-embossed paper label for raw honey jar
  const createProceduralHoneyLabelTexture = useCallback(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    ctx.fillStyle = '#faf8f4';
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, size - 40, size - 40);

    ctx.lineWidth = 2;
    ctx.strokeRect(32, 32, size - 64, size - 64);

    ctx.textAlign = 'center';
    
    ctx.fillStyle = '#221107';
    ctx.font = 'bold 32px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText("AVENOIR", size / 2, 120);

    ctx.font = 'italic 20px serif';
    ctx.letterSpacing = '2px';
    ctx.fillText("ATELIER & APIARY", size / 2, 160);

    ctx.beginPath();
    ctx.moveTo(150, 190);
    ctx.lineTo(size - 150, 190);
    ctx.strokeStyle = '#D4AF37';
    ctx.stroke();

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    const cx = size / 2;
    const cy = 250;
    const R = 35;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 6;
      const x = cx + R * Math.cos(angle);
      const y = cy + R * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, cy + R);
    ctx.lineTo(cx, cy - R);
    ctx.stroke();

    ctx.fillStyle = '#221107';
    ctx.font = 'bold 35px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText("RAW HONEY", size / 2, 360);

    ctx.fillStyle = '#D4AF37';
    ctx.font = 'italic 22px serif';
    ctx.fillText("Liquid Gold", size / 2, 400);

    ctx.fillStyle = '#7a6652';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.letterSpacing = '1px';
    ctx.fillText("AVENOIR CO. | VOL 500 G", size / 2, 440);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, []);

  // Generate hexagonal cap monogram "R"
  const createProceduralHoneyJarCapTexture = useCallback(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    ctx.fillStyle = '#25150c';
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 0.12;
    for (let i = 0; i < size; i += 6) {
      ctx.beginPath();
      ctx.rect(0, i, size, 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 40, 0, Math.PI * 2);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'italic bold 240px "Playfair Display", Georgia, serif';
    ctx.fillText("R", size / 2, size / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // SCENE INITIALIZATION & LUXURY LIGHTING ENVIRONMENT
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Premium neutral boutique backdrop color to coordinate with design layout
    scene.background = null;

    // Target dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 4.5, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // POST-PROCESSING PIPELINE FOR PHOTO-REALISTIC REALISM
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    // A. Screen-Space Ambient Occlusion (SSAO) to ground elements, gaps, hinges & corner guards
    const ssaoPass = new SSAOPass(scene, camera, width, height);
    ssaoPass.kernelRadius = 0.4;
    ssaoPass.minDistance = 0.001;
    ssaoPass.maxDistance = 0.05;
    composer.addPass(ssaoPass);

    // B. Sublte high-sheen reflections specular bloom
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.15, // intensity
      0.6,  // radius
      0.92  // threshold
    );
    composer.addPass(bloomPass);

    // C. SMAA Antialiasing Pass for clean geometries and curves
    const smaaPass = new SMAAPass();
    composer.addPass(smaaPass);

    // D. Output and correct color rendering pass
    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 1.9; // Prevent camera going underground
    controls.minDistance = 3;
    controls.maxDistance = 14;

    // LIGHTS & ADVANCED STUDIO ENVIRONMENT MAP
    // 1. PROCEDURAL NEUTRAL STUDIO HIGH-RESOLUTION ENVIRONMENT MAP (Image-Based-Lighting)
    const createStudioEnvironment = () => {
      const envWidth = 2048;
      const envHeight = 1024;
      const envCanvas = document.createElement('canvas');
      envCanvas.width = envWidth;
      envCanvas.height = envHeight;
      const envCtx = envCanvas.getContext('2d');
      if (!envCtx) return null;

      // Deep studio charcoal base to provide high-contrast soft reflection contours
      envCtx.fillStyle = '#11100f';
      envCtx.fillRect(0, 0, envWidth, envHeight);

      // --- Soft Box 1: Main Overlapping Warm-White Key Diffuse Panel ---
      const gradLeft = envCtx.createRadialGradient(
        envWidth * 0.25, envHeight * 0.35, 40,
        envWidth * 0.25, envHeight * 0.35, 520
      );
      gradLeft.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      gradLeft.addColorStop(0.2, 'rgba(250, 248, 245, 0.7)');
      gradLeft.addColorStop(0.7, 'rgba(180, 180, 180, 0.1)');
      gradLeft.addColorStop(1, 'rgba(0, 0, 0, 0)');
      envCtx.fillStyle = gradLeft;
      envCtx.beginPath();
      envCtx.arc(envWidth * 0.25, envHeight * 0.35, 520, 0, Math.PI * 2);
      envCtx.fill();

      // --- Soft Box 2: Fill Neutral White Panel ---
      const gradRight = envCtx.createRadialGradient(
        envWidth * 0.75, envHeight * 0.3, 20,
        envWidth * 0.75, envHeight * 0.3, 440
      );
      gradRight.addColorStop(0, 'rgba(255, 253, 250, 0.9)');
      gradRight.addColorStop(0.35, 'rgba(210, 210, 215, 0.3)');
      gradRight.addColorStop(1, 'rgba(0, 0, 0, 0)');
      envCtx.fillStyle = gradRight;
      envCtx.beginPath();
      envCtx.arc(envWidth * 0.75, envHeight * 0.3, 440, 0, Math.PI * 2);
      envCtx.fill();

      // --- Soft Box 3: Overhead continuous linear studio soft strip light ---
      const gradTop = envCtx.createLinearGradient(0, 0, 0, envHeight * 0.25);
      gradTop.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      gradTop.addColorStop(0.6, 'rgba(230, 230, 235, 0.35)');
      gradTop.addColorStop(1, 'rgba(0, 0, 0, 0)');
      envCtx.fillStyle = gradTop;
      envCtx.fillRect(0, 0, envWidth, envHeight * 0.25);

      const envTex = new THREE.CanvasTexture(envCanvas);
      envTex.mapping = THREE.EquirectangularReflectionMapping;
      return envTex;
    };

    const rawEnvTex = createStudioEnvironment();
    if (rawEnvTex) {
      const pmrem = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();
      const envMap = pmrem.fromEquirectangular(rawEnvTex).texture;
      scene.environment = envMap;
      pmrem.dispose();
      rawEnvTex.dispose();
    }

    // Soft Ambient
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.52);
    scene.add(ambientLight);

    // Key directional studio spot for crisp bevel shadows and micro-relief highlights (pure neutral white)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.25);
    keyLight.position.set(6, 10, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.00015;
    // Optimize shadow camera bounds for sharp box mapping
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    scene.add(keyLight);

    // Soft Fill light from side (pure neutral white)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.55);
    fillLight.position.set(-6, 4, 4);
    scene.add(fillLight);

    // Back rim light to separate product outline from background (pure neutral white)
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.15);
    rimLight.position.set(-5, 5, -8);
    scene.add(rimLight);

    // Soft desk reflections pedestal
    const pedestalGeo = new THREE.CylinderGeometry(2.8, 3.2, 0.15, 64);
    const pedestalMat = new THREE.MeshPhysicalMaterial({
      color: 0xefede8,
      roughness: 0.45,
      metalness: 0.1,
      clearcoat: 0.25,
      clearcoatRoughness: 0.2,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.6;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    // CORE PRODUCT MESH ASSEMBLY
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);
    meshGroupRef.current = meshGroup;

    // Build the dynamic 3D meshes depending on selected product
    const isWalnut = productId.includes('WALNUT');
    const isMaple = productId.includes('MAPLE');
    const isJarApoth = productId.includes('APOTH');
    const isJarHex = productId.includes('HEXDUO');
    const isBrassWand = productId.includes('WAND');

    // Create textures
    const woodType = isMaple ? 'maple' : 'walnut';
    const woodTexture = createProceduralWoodTexture(woodType, selectedFinish);
    const woodBumpTexture = createProceduralWoodBumpTexture(woodType, selectedFinish);
    const topCarvedTexture = createProceduralTopEngravingTexture(woodType, selectedFinish, engravingStyle, mockPreviewGraphic.svgPaths);
    const frontCarvedTexture = createProceduralFrontEngravingTexture(woodType, selectedFinish, engravingStyle);
    const lidInteriorTexture = createProceduralLidInteriorTexture(woodType, selectedFinish, engravingStyle);

    // Analyze finish style constants for PBR simulation
    const isLacquer = selectedFinish.includes('Lacquer') || selectedFinish.includes('Coated');
    const isBeeswax = selectedFinish.includes('Beeswax') || selectedFinish.includes('Raw') || selectedFinish.includes('Oil');

    // CONVERT IN-MEMORY BUMP MAPS TO SOBEL-BASED NORMAL MAPS FOR ENHANCED DESIGN TEXTURING
    const woodBumpCanvas = woodBumpTexture.image as HTMLCanvasElement;
    const woodNormalCanvas = bumpCanvasToNormalMap(woodBumpCanvas, isBeeswax ? 1.5 : 0.8);
    const woodNormalTexture = new THREE.CanvasTexture(woodNormalCanvas);
    woodNormalTexture.wrapS = THREE.RepeatWrapping;
    woodNormalTexture.wrapT = THREE.RepeatWrapping;

    const topBumpCanvas = topCarvedTexture.image as HTMLCanvasElement;
    const topNormalCanvas = bumpCanvasToNormalMap(topBumpCanvas, engravingStyle === 'gold-leaf' ? 0.45 : 3.0);
    const topNormalTexture = new THREE.CanvasTexture(topNormalCanvas);

    const frontBumpCanvas = frontCarvedTexture.image as HTMLCanvasElement;
    const frontNormalCanvas = bumpCanvasToNormalMap(frontBumpCanvas, engravingStyle === 'gold-leaf' ? 0.45 : 3.0);
    const frontNormalTexture = new THREE.CanvasTexture(frontNormalCanvas);

    // Rotate textures for vertical-grained wooden elements
    const woodTextureVert = woodTexture.clone();
    woodTextureVert.rotation = Math.PI / 2;
    woodTextureVert.center.set(0.5, 0.5);

    const woodNormalTextureVert = woodNormalTexture.clone();
    woodNormalTextureVert.rotation = Math.PI / 2;
    woodNormalTextureVert.center.set(0.5, 0.5);

    // Apply programmatically maximum hardware anisotropic filtering
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    woodTexture.anisotropy = maxAnisotropy;
    woodNormalTexture.anisotropy = maxAnisotropy;
    woodTextureVert.anisotropy = maxAnisotropy;
    woodNormalTextureVert.anisotropy = maxAnisotropy;
    topCarvedTexture.anisotropy = maxAnisotropy;
    topNormalTexture.anisotropy = maxAnisotropy;
    frontCarvedTexture.anisotropy = maxAnisotropy;
    frontNormalTexture.anisotropy = maxAnisotropy;
    lidInteriorTexture.anisotropy = maxAnisotropy;

    let baseRoughness = 0.35;
    let baseClearcoat = 0.0;
    let baseClearcoatRoughness = 0.1;
    let baseSheen = 0.0;

    if (isLacquer) {
      baseRoughness = 0.24;
      baseClearcoat = 0.95;
      baseClearcoatRoughness = 0.05;
      baseSheen = 0.35;
    } else if (isBeeswax) {
      baseRoughness = 0.58;
      baseClearcoat = 0.35;
      baseClearcoatRoughness = 0.25;
      baseSheen = 0.75;
    } else { // default
      baseRoughness = 0.4;
      baseClearcoat = 0.5;
      baseClearcoatRoughness = 0.15;
      baseSheen = 0.4;
    }

    // Custom multi-materials array for standard wooden containers with Physical Materials
    const standardWoodMaterial = new THREE.MeshPhysicalMaterial({
      map: woodTexture,
      roughness: baseRoughness,
      metalness: 0.0,
      normalMap: woodNormalTexture,
      normalScale: new THREE.Vector2(1.2, 1.2),
      clearcoat: baseClearcoat,
      clearcoatRoughness: baseClearcoatRoughness,
      sheen: baseSheen,
      sheenColor: new THREE.Color(0xd4af37), // rich gold tint wax highlights
      sheenRoughness: 0.35,
    });

    // Vertical-grained wood material for column posts and miter frames
    const standardWoodMaterialVert = new THREE.MeshPhysicalMaterial({
      map: woodTextureVert,
      roughness: baseRoughness,
      metalness: 0.0,
      normalMap: woodNormalTextureVert,
      normalScale: new THREE.Vector2(1.2, 1.2),
      clearcoat: baseClearcoat,
      clearcoatRoughness: baseClearcoatRoughness,
      sheen: baseSheen,
      sheenColor: new THREE.Color(0xd4af37),
      sheenRoughness: 0.35,
    });

    const isGold = engravingStyle === 'gold-leaf';
    const engravedTopMaterial = new THREE.MeshPhysicalMaterial({
      map: topCarvedTexture,
      roughness: isGold ? 0.08 : baseRoughness + 0.12,
      metalness: isGold ? 0.95 : 0.0,
      normalMap: topNormalTexture,
      normalScale: new THREE.Vector2(1.0, 1.0),
      clearcoat: isGold ? 0.25 : baseClearcoat,
      clearcoatRoughness: 0.1,
      sheen: isGold ? 0.0 : baseSheen,
      sheenColor: isGold ? undefined : new THREE.Color(0xd4af37),
    });

    const engravedFrontMaterial = new THREE.MeshPhysicalMaterial({
      map: frontCarvedTexture,
      roughness: isGold ? 0.08 : baseRoughness + 0.12,
      metalness: isGold ? 0.95 : 0.0,
      normalMap: frontNormalTexture,
      normalScale: new THREE.Vector2(1.0, 1.0),
      clearcoat: isGold ? 0.25 : baseClearcoat,
      clearcoatRoughness: 0.1,
      sheen: isGold ? 0.0 : baseSheen,
      sheenColor: isGold ? undefined : new THREE.Color(0xd4af37),
    });

    const engravedLidInteriorMaterial = new THREE.MeshPhysicalMaterial({
      map: lidInteriorTexture,
      roughness: isGold ? 0.08 : baseRoughness + 0.06,
      metalness: isGold ? 0.95 : 0.0,
      clearcoat: isGold ? 0.25 : baseClearcoat,
      clearcoatRoughness: 0.1,
      sheen: isGold ? 0.0 : baseSheen,
      sheenColor: isGold ? undefined : new THREE.Color(0xd4af37),
    });

    const brassMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      metalness: 0.98,
      roughness: 0.10,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });

    // Materials specifically matching the luxury layout: Top faces receive topCarved, Front faces receive frontCarved
    const boxMaterials = [
      standardWoodMaterial,  // Right (+X)
      standardWoodMaterial,  // Left (-X)
      engravedTopMaterial,   // Top (+Y) - Custom cursive calligraphy script & SVG path engravings
      standardWoodMaterial,  // Bottom (-Y)
      engravedFrontMaterial, // Front (+Z) - Beautiful Royal crest emblem matching reference
      standardWoodMaterial,  // Back (-Z)
    ];

    if (isWalnut || isMaple) {
      // 1. DESIGNING THE LUXURY VAULT CHEST (Walnut or Maple Box)
      const boxWidth = isWalnut ? 3.4 : 3.0;
      const boxHeight = 1.8;
      const boxDepth = 1.9;

      // Inner space container to hold nested objects
      const containerGroup = new THREE.Group();

      // CABINET BASE ASSEMBLY
      const baseAssembly = new THREE.Group();
      baseAssembly.position.y = - (boxHeight * 0.15);
      containerGroup.add(baseAssembly);

      // A. PREMIUM MODERN MINIMALIST SEAMLESS WOODEN SLAB WALLS
      const wallThickness = 0.06;
      const baseHeight = 1.15;
      const centerY = 0.215;

      // Front Plank (receives front right logo brand texture)
      const frontMaterials = [
        standardWoodMaterial,  // Right (+X)
        standardWoodMaterial,  // Left (-X)
        standardWoodMaterial,  // Top (+Y)
        standardWoodMaterial,  // Bottom (-Y)
        engravedFrontMaterial, // Front (+Z)
        standardWoodMaterial,  // Back (-Z)
      ];
      const wallFrontGeo = new THREE.BoxGeometry(boxWidth, baseHeight, wallThickness);
      const wallFront = new THREE.Mesh(wallFrontGeo, frontMaterials);
      wallFront.position.set(0, centerY, boxDepth/2 - wallThickness/2);
      wallFront.castShadow = true;
      wallFront.receiveShadow = true;
      baseAssembly.add(wallFront);

      // Back Plank
      const wallBackGeo = new THREE.BoxGeometry(boxWidth, baseHeight, wallThickness);
      const wallBack = new THREE.Mesh(wallBackGeo, standardWoodMaterial);
      wallBack.position.set(0, centerY, -boxDepth/2 + wallThickness/2);
      wallBack.castShadow = true;
      wallBack.receiveShadow = true;
      baseAssembly.add(wallBack);

      // Left Plank (vertical wood fiber grain match)
      const wallLeftGeo = new THREE.BoxGeometry(wallThickness, baseHeight, boxDepth - 2 * wallThickness);
      const wallLeft = new THREE.Mesh(wallLeftGeo, standardWoodMaterialVert);
      wallLeft.position.set(-boxWidth/2 + wallThickness/2, centerY, 0);
      wallLeft.castShadow = true;
      wallLeft.receiveShadow = true;
      baseAssembly.add(wallLeft);

      // Right Plank (vertical wood fiber grain match)
      const wallRightGeo = new THREE.BoxGeometry(wallThickness, baseHeight, boxDepth - 2 * wallThickness);
      const wallRight = new THREE.Mesh(wallRightGeo, standardWoodMaterialVert);
      wallRight.position.set(boxWidth/2 - wallThickness/2, centerY, 0);
      wallRight.castShadow = true;
      wallRight.receiveShadow = true;
      baseAssembly.add(wallRight);

      // Bottom Plank
      const bottomPlankGeo = new THREE.BoxGeometry(boxWidth - 2 * wallThickness, 0.06, boxDepth - 2 * wallThickness);
      const bottomPlank = new THREE.Mesh(bottomPlankGeo, standardWoodMaterial);
      bottomPlank.position.set(0, -0.33, 0);
      bottomPlank.castShadow = true;
      bottomPlank.receiveShadow = true;
      baseAssembly.add(bottomPlank);

      // Velvet Interior lining nested in the lower box - charcoal black for ultimate luxury
      const velvetInteriorGeo = new THREE.BoxGeometry(boxWidth - 0.12, 0.44, boxDepth - 0.12);
      const velvetMat = new THREE.MeshStandardMaterial({
        color: 0x141416, // Rich velvet charcoal black
        roughness: 0.88,
        metalness: 0.15,
      });
      const velvetMesh = new THREE.Mesh(velvetInteriorGeo, velvetMat);
      velvetMesh.position.y = 0.18;
      velvetMesh.receiveShadow = true;
      containerGroup.add(velvetMesh);

      // Raised custom velvet pocket moldings to simulate high-end thermoformed tray pockets!
      const pocketMat = new THREE.MeshStandardMaterial({
        color: 0x0e0e10, // slightly darker tone for pocket interior shadow
        roughness: 0.9,
        metalness: 0.0,
      });

      // Left pocket lip
      const leftPocketLipGeo = new THREE.CylinderGeometry(0.27, 0.30, 0.04, 6);
      const leftPocketLip = new THREE.Mesh(leftPocketLipGeo, velvetMat);
      leftPocketLip.position.set(-0.8, 0.40, -0.15);
      containerGroup.add(leftPocketLip);

      // Center pocket lip (larger)
      const centerPocketLipGeo = new THREE.CylinderGeometry(0.36, 0.40, 0.04, 6);
      const centerPocketLip = new THREE.Mesh(centerPocketLipGeo, velvetMat);
      centerPocketLip.position.set(0.0, 0.40, -0.15);
      containerGroup.add(centerPocketLip);

      // Right pocket lip
      const rightPocketLipGeo = new THREE.CylinderGeometry(0.27, 0.30, 0.04, 6);
      const rightPocketLip = new THREE.Mesh(rightPocketLipGeo, velvetMat);
      rightPocketLip.position.set(0.8, 0.40, -0.15);
      containerGroup.add(rightPocketLip);

      // Sunken dipper groove slot shadow
      const dipperGrooveGeo = new THREE.BoxGeometry(1.4, 0.03, 0.14);
      const dipperGroove = new THREE.Mesh(dipperGrooveGeo, pocketMat);
      dipperGroove.position.set(0, 0.40, 0.45);
      containerGroup.add(dipperGroove);

      // Create textures for internal products
      const citrusSliceTexture = createProceduralCitrusSliceTexture();
      const honeyLabelTexture = createProceduralHoneyLabelTexture();
      const honeyCapTexture = createProceduralHoneyJarCapTexture();

      // JAR 1: LEFT JAR (DRIED HIBISCUS IN METALLIC RED HEX CAP JAR)
      const leftJarGroup = new THREE.Group();
      leftJarGroup.position.set(-0.8, 0.41, -0.15);

      // Hexagonal outer glass body
      const hexGlassGeoLeft = new THREE.CylinderGeometry(0.23, 0.23, 0.46, 6);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
        roughness: 0.02,
        metalness: 0.1,
        transmission: 0.95,
        ior: 1.52,
        thickness: 0.18,
      });
      const leftGlassMesh = new THREE.Mesh(hexGlassGeoLeft, glassMat);
      leftGlassMesh.castShadow = true;
      leftGlassMesh.receiveShadow = true;
      leftJarGroup.add(leftGlassMesh);

      // Inside: dried deep-crimson petals (hibiscus filling)
      const hibiscusCoreGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.38, 6);
      const hibiscusMat = new THREE.MeshStandardMaterial({
        color: 0x420510, // deep burgundy/purple-red
        roughness: 0.95,
      });
      const hibiscusCore = new THREE.Mesh(hibiscusCoreGeo, hibiscusMat);
      hibiscusCore.position.y = -0.02;
      leftJarGroup.add(hibiscusCore);

      // Add a few tiny physical leaf specks inside the glass for organic 3D scattering texturing!
      const leafGeo = new THREE.SphereGeometry(0.016, 4, 4);
      const specularPetalMat = new THREE.MeshStandardMaterial({ color: 0x6e0e1e, roughness: 0.85 });
      for (let s = 0; s < 12; s++) {
        const speck = new THREE.Mesh(leafGeo, specularPetalMat);
        const theta = Math.random() * Math.PI * 2;
        const rad = Math.random() * 0.15;
        // Position them casually near top surface or rim
        speck.position.set(rad * Math.cos(theta), 0.10 + Math.random() * 0.08, rad * Math.sin(theta));
        speck.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
        leftJarGroup.add(speck);
      }

      // Hexagonal screw-cap (Metallic plum/crimson anodized lid)
      const lCapGeo = new THREE.CylinderGeometry(0.245, 0.245, 0.08, 6);
      const lCapMat = new THREE.MeshPhysicalMaterial({
        color: 0x821226, // deep metallic luxury crimson plum
        metalness: 0.85,
        roughness: 0.18,
        clearcoat: 0.6,
        clearcoatRoughness: 0.1,
      });
      const leftCapMesh = new THREE.Mesh(lCapGeo, lCapMat);
      leftCapMesh.position.y = 0.27;
      leftCapMesh.castShadow = true;
      leftJarGroup.add(leftCapMesh);
      containerGroup.add(leftJarGroup);


      // JAR 2: CENTER JAR (RAW HONEY WITH FRONT TEXTURED EMBOSSED PAPER LABEL & EMBOSSED CAP)
      const centerJarGroup = new THREE.Group();
      centerJarGroup.position.set(0.0, 0.41, -0.15);

      // Hexagonal outer glass body (larger)
      const hexGlassGeoCenter = new THREE.CylinderGeometry(0.31, 0.31, 0.58, 6);
      const centerGlassMesh = new THREE.Mesh(hexGlassGeoCenter, glassMat);
      centerGlassMesh.castShadow = true;
      centerGlassMesh.receiveShadow = true;
      centerJarGroup.add(centerGlassMesh);

      // Inside: Translucent honey core
      const honeyCoreGeo = new THREE.CylinderGeometry(0.27, 0.27, 0.48, 6);
      const honeyMat = new THREE.MeshPhysicalMaterial({
        color: 0xd98600, // beautiful glowing honey amber
        roughness: 0.04,
        metalness: 0.0,
        transmission: 0.85,
        thickness: 0.5,
        ior: 1.48,
        sheen: 0.7,
        sheenColor: new THREE.Color(0xffac00),
      });
      const centerHoneyCore = new THREE.Mesh(honeyCoreGeo, honeyMat);
      centerHoneyCore.position.y = -0.03;
      centerJarGroup.add(centerHoneyCore);

      // Hexagonal dual wooden screw-cap lid (Walnut / Maple rim with gold inlay R crest)
      const cCapGeo = new THREE.CylinderGeometry(0.325, 0.325, 0.09, 6);
      const centerCapMesh = new THREE.Mesh(cCapGeo, standardWoodMaterial);
      centerCapMesh.position.y = 0.33;
      centerCapMesh.castShadow = true;
      centerCapMesh.rotation.y = Math.PI / 6; // align hex points elegantly
      centerJarGroup.add(centerCapMesh);

      // Top face gold plate decoration containing the "R" monogram
      const cCapGoldPlateGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.01, 6);
      const cCapGoldPlateMat = new THREE.MeshPhysicalMaterial({
        map: honeyCapTexture,
        metalness: 0.90,
        roughness: 0.14,
        clearcoat: 0.8,
        clearcoatRoughness: 0.05,
      });
      const centerCapGoldPlate = new THREE.Mesh(cCapGoldPlateGeo, [
        cCapGoldPlateMat,
        cCapGoldPlateMat,
        cCapGoldPlateMat,
        cCapGoldPlateMat,
        cCapGoldPlateMat,
        cCapGoldPlateMat
      ]);
      centerCapGoldPlate.position.y = 0.38;
      centerCapGoldPlate.rotation.y = -Math.PI / 6; // counter-rotate for text alignment
      centerJarGroup.add(centerCapGoldPlate);

      // Front Embossed Boutique Hexagonal Label
      const labelPaperGeo = new THREE.BoxGeometry(0.26, 0.28, 0.01);
      const labelPaperMat = new THREE.MeshPhysicalMaterial({
        map: honeyLabelTexture,
        roughness: 0.75,
        metalness: 0.1,
        clearcoat: 0.1,
      });
      const labelMesh = new THREE.Mesh(labelPaperGeo, labelPaperMat);
      labelMesh.position.set(0, -0.02, 0.274);
      centerJarGroup.add(labelMesh);
      containerGroup.add(centerJarGroup);


      // JAR 3: RIGHT JAR (DRIED CITRUS WHEELS IN POLISHED BRONZE HEX CAP JAR)
      const rightJarGroup = new THREE.Group();
      rightJarGroup.position.set(0.8, 0.41, -0.15);

      // Hexagonal outer glass body
      const hexGlassGeoRight = new THREE.CylinderGeometry(0.23, 0.23, 0.46, 6);
      const rightGlassMesh = new THREE.Mesh(hexGlassGeoRight, glassMat);
      rightGlassMesh.castShadow = true;
      rightGlassMesh.receiveShadow = true;
      rightJarGroup.add(rightGlassMesh);

      // Under glass: stacked 3D dried citrus orange wheels!
      const sliceGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.025, 16);
      const sliceMat = new THREE.MeshPhysicalMaterial({
        map: citrusSliceTexture,
        roughness: 0.65,
        metalness: 0.0,
      });

      // Construct a casual natural stack of 3 orange slices resting against each other inside!
      // Slice 1: Lies flat at bottom
      const slice1 = new THREE.Mesh(sliceGeo, sliceMat);
      slice1.position.set(0, -0.15, 0);
      slice1.rotation.set(0.1, 0.3, 0.1);
      rightJarGroup.add(slice1);

      // Slice 2: Stacked and angled
      const slice2 = new THREE.Mesh(sliceGeo, sliceMat);
      slice2.position.set(-0.02, -0.05, 0.02);
      slice2.rotation.set(-0.4, 0.8, 0.3);
      rightJarGroup.add(slice2);

      // Slice 3: Leaning on top
      const slice3 = new THREE.Mesh(sliceGeo, sliceMat);
      slice3.position.set(0.01, 0.06, -0.01);
      slice3.rotation.set(0.3, -0.5, 0.5);
      rightJarGroup.add(slice3);

      // Copper hex lid
      const rCapGeo = new THREE.CylinderGeometry(0.245, 0.245, 0.08, 6);
      const rCapMat = new THREE.MeshPhysicalMaterial({
        color: 0xba6a43, // bronze copper alloy metallic
        metalness: 0.90,
        roughness: 0.14,
        clearcoat: 0.7,
        clearcoatRoughness: 0.05,
      });
      const rightCapMesh = new THREE.Mesh(rCapGeo, rCapMat);
      rightCapMesh.position.y = 0.27;
      rightCapMesh.castShadow = true;
      rightJarGroup.add(rightCapMesh);
      containerGroup.add(rightJarGroup);


      // INTEGRATED HARDWARE: THE PROFESSIONAL HONEY DIPPER Rested in Velvet Groove
      const dipperGroup = new THREE.Group();
      dipperGroup.position.set(0, 0.41, 0.45);
      dipperGroup.rotation.y = 0; // Perfectly horizontal along the X-axis within its custom velvet slot

      // 1. Dark Tapered Satin Handle (Satin Matte black)
      const handleMat = new THREE.MeshStandardMaterial({ color: 0x1d1d1f, roughness: 0.8, metalness: 0.1 });
      const handleSegments = [];
      const handlePartsNum = 6;
      for (let h = 0; h < handlePartsNum; h++) {
        const startRad = 0.038 - (h * 0.003);
        const endRad = 0.038 - ((h + 1) * 0.003);
        const chunkGeo = new THREE.CylinderGeometry(startRad, endRad, 0.12, 16);
        const chunk = new THREE.Mesh(chunkGeo, handleMat);
        chunk.rotation.z = Math.PI / 2; // lie along X axis
        chunk.position.x = 0.15 + (h * 0.12);
        dipperGroup.add(chunk);
      }

      // Rounded tip handle cap
      const tipCapGeo = new THREE.SphereGeometry(0.038, 16, 16);
      const tipCap = new THREE.Mesh(tipCapGeo, handleMat);
      tipCap.position.x = 0.15;
      dipperGroup.add(tipCap);

      // 2. Brass connection collar ring
      const collarGeo = new THREE.CylinderGeometry(0.026, 0.026, 0.04, 16);
      const collar = new THREE.Mesh(collarGeo, brassMat);
      collar.rotation.z = Math.PI / 2;
      collar.position.x = 0.15 + (handlePartsNum * 0.12);
      dipperGroup.add(collar);

      // 3. Luxurious gold shaft connecting rods
      const shaftGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.32, 16);
      const shaft = new THREE.Mesh(shaftGeo, brassMat);
      shaft.rotation.z = Math.PI / 2;
      shaft.position.x = -0.15;
      dipperGroup.add(shaft);

      // 4. Gold ribbed coil head (sculpted with 5 interlocking layered cylinders)
      const ribsCount = 5;
      const ribRadii = [0.05, 0.08, 0.085, 0.08, 0.055];
      const ribPositionsX = [-0.34, -0.39, -0.44, -0.49, -0.54];
      for (let r = 0; r < ribsCount; r++) {
        const discGeo = new THREE.CylinderGeometry(ribRadii[r], ribRadii[r], 0.035, 24);
        const disc = new THREE.Mesh(discGeo, brassMat);
        disc.rotation.z = Math.PI / 2;
        disc.position.x = ribPositionsX[r];
        disc.castShadow = true;
        dipperGroup.add(disc);

        if (r < ribsCount - 1) {
          const spacerGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.015, 16);
          const spacer = new THREE.Mesh(spacerGeo, brassMat);
          spacer.rotation.z = Math.PI / 2;
          spacer.position.x = (ribPositionsX[r] + ribPositionsX[r+1]) / 2;
          dipperGroup.add(spacer);
        }
      }

      // Round front tip
      const frontTipGeo = new THREE.SphereGeometry(0.038, 16, 16);
      const frontTip = new THREE.Mesh(frontTipGeo, brassMat);
      frontTip.position.x = -0.57;
      dipperGroup.add(frontTip);

      containerGroup.add(dipperGroup);


      // ADD INTERNAL SOLID BRASS LINEAR HINGES ON THE INSIDE CORNERS (matching reference images)
      const internalHingeRotY = [ -1, 1 ];
      internalHingeRotY.forEach((dir) => {
        const hingePlateGeo = new THREE.BoxGeometry(0.03, 0.16, 0.08);
        const internalHinge = new THREE.Mesh(hingePlateGeo, brassMat);
        internalHinge.position.set(dir * (boxWidth / 2 - 0.051), 0.38, -boxDepth / 2 + 0.06);
        internalHinge.rotation.y = dir * 0.15;
        containerGroup.add(internalHinge);
      });

      // UPPER REVOLVING COVER LID GROUP (for rotation hinges on the back-side of chest)
      const lidGroup = new THREE.Group();
      // Position the anchor hinge at the top rear lip of the base box
      lidGroup.position.set(0, boxHeight * 0.2, - (boxDepth / 2));

      // Visual Vault lid
      const lidGeo = new THREE.BoxGeometry(boxWidth, boxHeight * 0.4, boxDepth);
      // CABINET LID ASSEMBLY GROUP
      const lidAssemblyGroup = new THREE.Group();
      lidAssemblyGroup.position.set(0, boxHeight * 0.2, boxDepth / 2);
      lidGroup.add(lidAssemblyGroup);

      // A. MITER JOIN WOODEN LID FRAME
      // Frame Front
      const lfFrontGeo = new THREE.BoxGeometry(boxWidth, 0.14, 0.22);
      const lfFront = new THREE.Mesh(lfFrontGeo, standardWoodMaterial);
      lfFront.position.set(0, 0.20, boxDepth/2 - 0.11);
      lfFront.castShadow = true;
      lfFront.receiveShadow = true;
      lidAssemblyGroup.add(lfFront);

      // Frame Back
      const lfBackGeo = new THREE.BoxGeometry(boxWidth, 0.14, 0.22);
      const lfBack = new THREE.Mesh(lfBackGeo, standardWoodMaterial);
      lfBack.position.set(0, 0.20, -boxDepth/2 + 0.11);
      lfBack.castShadow = true;
      lfBack.receiveShadow = true;
      lidAssemblyGroup.add(lfBack);

      // Frame Left (vertical grain)
      const lfLeftGeo = new THREE.BoxGeometry(0.22, 0.14, boxDepth - 0.44);
      const lfLeft = new THREE.Mesh(lfLeftGeo, standardWoodMaterialVert);
      lfLeft.position.set(-boxWidth/2 + 0.11, 0.20, 0);
      lfLeft.castShadow = true;
      lfLeft.receiveShadow = true;
      lidAssemblyGroup.add(lfLeft);

      // Frame Right (vertical grain)
      const lfRightGeo = new THREE.BoxGeometry(0.22, 0.14, boxDepth - 0.44);
      const lfRight = new THREE.Mesh(lfRightGeo, standardWoodMaterialVert);
      lfRight.position.set(boxWidth/2 - 0.11, 0.20, 0);
      lfRight.castShadow = true;
      lfRight.receiveShadow = true;
      lidAssemblyGroup.add(lfRight);

      // B. FLOATING CENTER ENGRAVED PANEL (carved top wood plate with calligraphy)
      const lidTopPanelGeo = new THREE.BoxGeometry(boxWidth - 0.40, 0.12, boxDepth - 0.40);
      const lidTopPanel = new THREE.Mesh(lidTopPanelGeo, engravedTopMaterial);
      // Slightly inset/recessed below frame height to give classical woodworking shadowing
      lidTopPanel.position.set(0, 0.18, 0);
      lidTopPanel.castShadow = true;
      lidTopPanel.receiveShadow = true;
      lidAssemblyGroup.add(lidTopPanel);

      // Bottom ceiling plate of lid (uses the engraved lid interior monogram on the underside face)
      const lidCeilingGeo = new THREE.BoxGeometry(boxWidth - 0.04, 0.04, boxDepth - 0.04);
      const ceilingMaterials = [
        standardWoodMaterial,        // Right (+X)
        standardWoodMaterial,        // Left (-X)
        standardWoodMaterial,        // Top (+Y)
        engravedLidInteriorMaterial, // Bottom (-Y) <-- THIS IS THE ENGRAVED UNDER-LID!
        standardWoodMaterial,        // Front (+Z)
        standardWoodMaterial,        // Back (-Z)
      ];
      const lidCeiling = new THREE.Mesh(lidCeilingGeo, ceilingMaterials);
      lidCeiling.position.set(0, 0.11, 0);
      lidAssemblyGroup.add(lidCeiling);

      // Dummy object with matching name to avoid lint compilation failures
      const lidMesh = new THREE.Group();
      lidMesh.castShadow = true;
      lidMesh.receiveShadow = true;
      lidMesh.position.set(0, boxHeight * 0.2, boxDepth / 2);
      lidGroup.add(lidMesh);

      containerGroup.add(lidGroup);
      containerGroup.position.y = -0.4;
      meshGroup.add(containerGroup);

      lidGroupRef.current = lidGroup;

    } else if (isJarApoth) {
      // 2. DESIGNING THE TRANS_GLASS APOTHECARY JAR
      const jarGroup = new THREE.Group();

      const jarHeight = 2.4;
      const jarRadius = 1.0;
      const glassGeo = new THREE.CylinderGeometry(jarRadius, jarRadius, jarHeight, 32);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: false,
        opacity: 1.0,
        roughness: 0.015,
        metalness: 0.0,
        transmission: 0.99,
        thickness: 1.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.01,
        ior: 1.52,
      });

      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      glassMesh.castShadow = true;
      glassMesh.receiveShadow = true;
      jarGroup.add(glassMesh);

      const liquidHeight = jarHeight * 0.72;
      const honeyRadius = jarRadius - 0.08;
      const liquidGeo = new THREE.CylinderGeometry(honeyRadius, honeyRadius, liquidHeight, 32);
      const honeyLiquidMat = new THREE.MeshPhysicalMaterial({
        color: selectedFinish.includes('Dark') ? 0x613107 : 0xd18e11,
        roughness: 0.06,
        metalness: 0.0,
        transmission: 0.72,
        thickness: 0.85,
        sheen: 0.25,
        sheenColor: new THREE.Color(0xffbb00),
      });
      const liquidMesh = new THREE.Mesh(liquidGeo, honeyLiquidMat);
      liquidMesh.position.y = -(jarHeight / 2) + (liquidHeight / 2) + 0.1;
      jarGroup.add(liquidMesh);

      // Wrapper label uses custom top carved calligraphies
      const wrapGeo = new THREE.CylinderGeometry(jarRadius + 0.015, jarRadius + 0.015, 0.9, 32, 1, true, -Math.PI / 3, Math.PI * 2 / 3);
      const wrapMat = new THREE.MeshPhysicalMaterial({
        map: topCarvedTexture,
        side: THREE.DoubleSide,
        roughness: engravingStyle === 'gold-leaf' ? 0.15 : 0.45,
        metalness: engravingStyle === 'gold-leaf' ? 0.92 : 0.0,
        clearcoat: engravingStyle === 'gold-leaf' ? 0.3 : 0.0,
      });
      const wrapMesh = new THREE.Mesh(wrapGeo, wrapMat);
      wrapMesh.position.y = 0.12;
      jarGroup.add(wrapMesh);

      const neckGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.25, 24);
      const neckMesh = new THREE.Mesh(neckGeo, glassMat);
      neckMesh.position.y = (jarHeight / 2) + 0.11;
      jarGroup.add(neckMesh);

      const corkGeo = new THREE.CylinderGeometry(0.58, 0.52, 0.45, 20);
      const corkTexture = createProceduralWoodTexture('maple', 'Beeswax Buffed');
      corkTexture.anisotropy = maxAnisotropy;
      const corkMat = new THREE.MeshPhysicalMaterial({
        map: corkTexture,
        roughness: 0.95,
        metalness: 0.0,
        bumpMap: corkTexture,
        bumpScale: 0.05,
        color: 0xd2b48c,
        clearcoat: 0.0,
      });
      const corkMesh = new THREE.Mesh(corkGeo, corkMat);
      corkMesh.position.y = (jarHeight / 2) + 0.35;
      corkMesh.castShadow = true;
      jarGroup.add(corkMesh);
      corkRef.current = corkMesh;

      jarGroup.position.y = -0.15;
      meshGroup.add(jarGroup);

    } else if (isJarHex) {
      // 3. DESIGNING THE HEXAGONAL GLASS JAR DUO
      const hexGroup = new THREE.Group();

      for (let jarIdx = 0; jarIdx < 2; jarIdx++) {
        const singleHex = new THREE.Group();
        const dirOffset = jarIdx === 0 ? -0.85 : 0.85;
        singleHex.position.set(dirOffset, -0.2, jarIdx === 0 ? -0.15 : 0.15);
        if (jarIdx === 1) singleHex.rotation.y = Math.PI / 6;

        const hexHeight = 2.0;
        const hexRadius = 0.75;
        const hexGlassGeo = new THREE.CylinderGeometry(hexRadius, hexRadius, hexHeight, 6);
        const glassMat = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transparent: false,
          opacity: 1.0,
          roughness: 0.015,
          metalness: 0.0,
          transmission: 0.98,
          thickness: 1.2,
          clearcoat: 1.0,
          clearcoatRoughness: 0.01,
          ior: 1.5,
        });

        const hexMesh = new THREE.Mesh(hexGlassGeo, glassMat);
        hexMesh.castShadow = true;
        hexMesh.receiveShadow = true;
        singleHex.add(hexMesh);

        const hFillHeight = hexHeight * 0.78;
        const hexHoneyGeo = new THREE.CylinderGeometry(hexRadius - 0.08, hexRadius - 0.08, hFillHeight, 6);
        const hexHoneyMat = new THREE.MeshPhysicalMaterial({
          color: jarIdx === 0 ? 0xcc8400 : 0xe3a01a,
          roughness: 0.06,
          metalness: 0.0,
          transmission: 0.75,
          thickness: 0.8,
          sheen: 0.2,
          sheenColor: new THREE.Color(0xffaa00),
        });
        const hexHoney = new THREE.Mesh(hexHoneyGeo, hexHoneyMat);
        hexHoney.position.y = -(hexHeight / 2) + (hFillHeight / 2) + 0.05;
        singleHex.add(hexHoney);

        const faceGeo = new THREE.PlaneGeometry(0.68, 0.9);
        const decalMat = new THREE.MeshPhysicalMaterial({
          map: topCarvedTexture,
          roughness: engravingStyle === 'gold-leaf' ? 0.15 : 0.45,
          metalness: engravingStyle === 'gold-leaf' ? 0.92 : 0.0,
          side: THREE.DoubleSide,
        });
        const decalMesh = new THREE.Mesh(faceGeo, decalMat);
        decalMesh.position.set(0, 0.0, hexRadius + 0.015);
        singleHex.add(decalMesh);

        const capGeo = new THREE.CylinderGeometry(0.78, 0.78, 0.15, 6);
        const capMat = new THREE.MeshPhysicalMaterial({
          color: 0xcca043,
          metalness: 0.98,
          roughness: 0.12,
          clearcoat: 0.8,
          clearcoatRoughness: 0.05,
        });
        const capMesh = new THREE.Mesh(capGeo, capMat);
        capMesh.position.y = (hexHeight / 2) + 0.08;
        capMesh.castShadow = true;
        singleHex.add(capMesh);

        hexGroup.add(singleHex);
      }

      meshGroup.add(hexGroup);

    } else if (isBrassWand) {
      // 4. DESIGNING THE HIGH-PRECISION BRASS HONEY DIPPER WAND MATCHING REFERENCE IMAGE
      const wandGroup = new THREE.Group();

      const brassMat = new THREE.MeshPhysicalMaterial({
        color: 0xd4af37, // Polished premium gold/brass
        metalness: 0.98,
        roughness: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
      });

      // Refined Wooden shaft rod matching reference table wand
      const wandWoodTexture = createProceduralWoodTexture('walnut', 'Dark Satin Lacquer');
      wandWoodTexture.anisotropy = maxAnisotropy;
      const dipperWoodMat = new THREE.MeshPhysicalMaterial({
        map: wandWoodTexture,
        roughness: 0.3,
        metalness: 0.0,
        clearcoat: 0.9,
        clearcoatRoughness: 0.05,
      });

      // Elegant central wooden wand shaft (walnut/maple)
      const shaftGeo = new THREE.CylinderGeometry(0.055, 0.055, 3.2, 16);
      const shaftMesh = new THREE.Mesh(shaftGeo, dipperWoodMat);
      shaftMesh.rotation.z = Math.PI / 4;
      shaftMesh.castShadow = true;
      wandGroup.add(shaftMesh);

      // Gold connecting ferrules/caps on both ends of the wood shaft
      const ferruleUpperGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.25, 12);
      const ferruleUpper = new THREE.Mesh(ferruleUpperGeo, brassMat);
      ferruleUpper.rotation.z = Math.PI / 4;
      ferruleUpper.position.set(1.10, 1.10, 0);
      wandGroup.add(ferruleUpper);

      const ferruleLowerGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.25, 12);
      const ferruleLower = new THREE.Mesh(ferruleLowerGeo, brassMat);
      ferruleLower.rotation.z = Math.PI / 4;
      ferruleLower.position.set(-1.10, -1.10, 0);
      wandGroup.add(ferruleLower);

      // Pure gold hexagonal geometric end cap on top end (index 6 sides = perfect hexagon shape!)
      const crestHexGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.35, 6);
      const crestMesh = new THREE.Mesh(crestHexGeo, brassMat);
      crestMesh.rotation.set(Math.PI / 4, 0, Math.PI / 4);
      crestMesh.position.set(1.30, 1.30, 0);
      crestMesh.castShadow = true;
      wandGroup.add(crestMesh);

      // Turned concentric gold rib rings on bottom dipper end
      const dipperHeadGroup = new THREE.Group();
      dipperHeadGroup.position.set(-1.30, -1.30, 0);
      dipperHeadGroup.rotation.z = Math.PI / 4;

      const coreGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.8, 20);
      const coreMesh = new THREE.Mesh(coreGeo, brassMat);
      dipperHeadGroup.add(coreMesh);

      // Concentric shiny brass ribs matching the table wand
      for (let r = 0; r < 5; r++) {
        const diskGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.08, 24);
        const diskMesh = new THREE.Mesh(diskGeo, brassMat);
        diskMesh.position.y = -0.3 + (r * 0.15);
        dipperHeadGroup.add(diskMesh);
      }

      // Honey drop slide on dipper rings page
      const dropGeo = new THREE.SphereGeometry(0.29, 16, 16);
      const dropMat = new THREE.MeshPhysicalMaterial({
        color: 0xffa200,
        roughness: 0.04,
        metalness: 0.0,
        transmission: 0.88,
        thickness: 0.6,
        sheen: 0.3,
        sheenColor: new THREE.Color(0xffbf00),
      });
      const dropMesh = new THREE.Mesh(dropGeo, dropMat);
      dropMesh.position.set(0, -0.38, 0);
      dropMesh.scale.set(1, 1.4, 1);
      dipperHeadGroup.add(dropMesh);

      wandGroup.add(dipperHeadGroup);

      // Display stand pedestal receiver
      const standCradleGeo = new THREE.CylinderGeometry(0.08, 0.15, 0.4, 12);
      const standCradle = new THREE.Mesh(standCradleGeo, pedestalMat);
      standCradle.position.set(0, -1.4, 0);
      wandGroup.add(standCradle);

      wandGroup.position.set(0.1, 0.2, 0);
      meshGroup.add(wandGroup);
    }

    // SCENE RENDERING LOOP & MOTION
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Apply controls dampening
      controls.update();

      const time = clock.getElapsedTime();

      // Smooth idle floating rotation of the product if active
      if (isRotating && meshGroupRef.current) {
        meshGroupRef.current.rotation.y += rotationSpeed;
      }

      // Smooth animation transition of Lid Open/Close rotation
      if (lidGroupRef.current) {
        // Rotate box lid up around hinge back on -X axis
        const targetRotX = isOpen ? -Math.PI / 1.75 : 0;
        lidGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          lidGroupRef.current.rotation.x,
          targetRotX,
          0.08
        );
      }

      // Smooth animation transition of Bottle Cork up/down
      if (corkRef.current) {
        const targetPosY = isOpen ? (2.4 / 2) + 0.95 : (2.4 / 2) + 0.355;
        const targetRotY = isOpen ? Math.PI : 0;
        corkRef.current.position.y = THREE.MathUtils.lerp(corkRef.current.position.y, targetPosY, 0.08);
        corkRef.current.rotation.y = THREE.MathUtils.lerp(corkRef.current.rotation.y, targetRotY, 0.08);
      }

      // Adjust wireframe trigger
      scene.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          if (node.material && !Array.isArray(node.material)) {
            (node.material as any).wireframe = showWireframe;
          } else if (Array.isArray(node.material)) {
            node.material.forEach((m: any) => { m.wireframe = showWireframe; });
          }
        }
      });

      composer.render();
    };
    animate();

    // Resize observer wrapper
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(containerRef.current);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();
      composer.passes.forEach(pass => {
        if (typeof (pass as any).dispose === 'function') {
          (pass as any).dispose();
        }
      });
      renderer.dispose();
    };
  }, [
    productId,
    selectedFinish,
    engravingStyle,
    scale,
    mockPreviewGraphic,
    isOpen,
    showWireframe,
    isRotating,
    rotationSpeed,
    createProceduralWoodTexture,
    createProceduralWoodBumpTexture,
    createProceduralTopEngravingTexture,
    createProceduralFrontEngravingTexture,
    createProceduralCitrusSliceTexture,
    createProceduralHoneyJarCapTexture,
    createProceduralHoneyLabelTexture,
    createProceduralLidInteriorTexture,
  ]);

  return (
    <div className="w-full flex flex-col gap-5">
      {/* 3D RENDER INTERFACE PANEL WITH LUXURIOUS NATURAL BLURRED LIBRARY BACKGROUND */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-square md:aspect-[4/3] rounded-none border border-[#1C1612]/35 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing flex flex-col min-h-[360px] md:min-h-[460px] xl:min-h-[520px]"
        style={{
          backgroundImage: `linear-gradient(rgba(12, 7, 3, 0.45), rgba(12, 7, 3, 0.65)), url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80&blur=8')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* 3D CODESK REALTIME CONTROLS BAR */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-10">
          <div className="flex gap-2.5 pointer-events-auto">
            {/* Lids/Open actions */}
            {(productId.includes('WALNUT') || productId.includes('MAPLE') || productId.includes('APOTH')) && (
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className={`px-3.5 py-2 rounded-none text-xs font-bold font-sans uppercase tracking-widest border shadow-xs transition cursor-pointer flex items-center gap-1.5 ${
                  isOpen 
                    ? 'bg-[#875B26] text-white border-[#875B26]' 
                    : 'bg-white text-stone-800 border-[#DEB265]/40 hover:bg-[#FAF6EE]'
                }`}
              >
                <Sliders size={13} className={isOpen ? "animate-spin" : ""} />
                <span>{isOpen ? "Close Vault" : "Display Inside"}</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsRotating(!isRotating);
              }}
              className={`px-3.5 py-2 rounded-none text-xs font-bold font-sans uppercase tracking-widest border shadow-xs transition cursor-pointer ${
                isRotating 
                  ? 'bg-amber-100 text-[#875B26] border-[#DEB265]/30' 
                  : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <span>{isRotating ? "Pause Orbit" : "Auto Rotate"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setShowWireframe(!showWireframe)}
              className={`px-3.5 py-2 rounded-none text-xs font-mono border shadow-xs transition cursor-pointer ${
                showWireframe 
                  ? 'bg-rose-50 border-rose-200 text-rose-700 font-bold' 
                  : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'
              }`}
            >
              Blueprint.wire
            </button>
          </div>
        </div>

        {/* DRAG HELPER BANNER */}
        <div className="absolute bottom-4 left-4 pointer-events-none bg-stone-900/80 backdrop-blur-md rounded-none py-1.5 px-3 border border-white/5 flex items-center gap-2 text-[11px] font-sans font-light tracking-wider text-amber-100/90 shadow-sm animate-pulse">
          <HelpCircle size={12} className="text-[#DEB265]" />
          <span>Rotate: Drag object • Zoom: Scrollwheel</span>
        </div>

        <div className="absolute bottom-4 right-4 pointer-events-none bg-emerald-950/80 backdrop-blur-md rounded-none py-1 px-2.5 border border-emerald-500/10 flex items-center gap-1.5 text-[10px] uppercase font-mono font-bold text-emerald-300 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span>WebGL Acceleration Active</span>
        </div>
      </div>

      {/* QUICK CALIBRATIONS RAIL */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#FCFAF7] border border-[#E3D8C3]/50 p-3 rounded-none text-left">
          <span className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest block">Camera angle</span>
          <span className="text-xs font-semibold text-stone-700 font-sans mt-0.5 block">Perspective Orbit</span>
        </div>
        <div className="bg-[#FCFAF7] border border-[#E3D8C3]/50 p-3 rounded-none text-left">
          <span className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest block">Rotation Speed</span>
          <div className="flex items-center gap-1 mt-0.5">
            <input 
              type="range" 
              min="0" 
              max="0.02" 
              step="0.001" 
              value={rotationSpeed} 
              onChange={(e) => setRotationSpeed(Number(e.target.value))} 
              className="accent-[#875B26] h-1 w-16"
            />
            <span className="text-[9px] font-mono text-stone-550">{(rotationSpeed * 1000).toFixed(0)}</span>
          </div>
        </div>
        <div className="bg-[#FCFAF7] border border-[#E3D8C3]/50 p-3 rounded-none text-left">
          <span className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest block">Materials shader</span>
          <span className="text-xs font-semibold text-stone-700 font-sans mt-0.5 block">Standard PBR</span>
        </div>
        <div className="bg-[#FCFAF7] border border-[#E3D8C3]/50 p-3 rounded-none text-left">
          <span className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest block">Light environment</span>
          <span className="text-xs font-semibold text-[#875B26] font-sans mt-0.5 block flex items-center gap-1">
            <Sparkles size={11} /> Warm Boutique Studio
          </span>
        </div>
      </div>
    </div>
  );
}
