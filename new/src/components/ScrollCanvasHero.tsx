"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowDown } from "lucide-react";

const TOTAL_FRAMES = 300;

const padZero = (num: number, size = 3) => {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

const getFramePath = (index: number) => {
  const frameNum = Math.min(TOTAL_FRAMES, Math.max(1, index + 1));
  return `/frames/ezgif-frame-${padZero(frameNum)}.jpg`;
};

interface ScrollCanvasHeroProps {
  onOpenBooking?: () => void;
}

export default function ScrollCanvasHero({ onOpenBooking }: ScrollCanvasHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Cached image elements
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Telemetry based on progress (0 - 100%)
  const telemetry = {
    rpm: Math.round(
      scrollPercent < 15
        ? scrollPercent * 25
        : scrollPercent < 70
        ? 400 + scrollPercent * 11
        : 1100 + (scrollPercent - 70) * 16.6
    ),
    temp: scrollPercent < 40 ? 28 : scrollPercent < 80 ? 38 : 42,
    ozonePpm: Math.min(4.8, (scrollPercent / 100) * 5).toFixed(1),
    cleanliness: Math.min(99.98, 80 + (scrollPercent / 100) * 19.98).toFixed(2),
    phaseName:
      scrollPercent < 22
        ? "OPTICAL SCAN & HYDRO-INGESTION"
        : scrollPercent < 48
        ? "COLD OZONE (O₃) INFUSION"
        : scrollPercent < 76
        ? "DUAL-AXIS INVERSION AGITATION"
        : "CENTRIFUGAL EXTRACTION 1600 RPM",
  };

  // Preload all 300 frames
  useEffect(() => {
    if (typeof window === "undefined") return;

    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const handleSingleLoad = () => {
      loadedCount++;
      const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      setLoadProgress(pct);
      if (loadedCount >= Math.min(30, TOTAL_FRAMES)) {
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = handleSingleLoad;
      img.onerror = handleSingleLoad;
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  // Canvas drawing helper with object-fit: cover preservation
  const renderFrame = (index: number) => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Calculate aspect ratio cover
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let renderW = cw;
    let renderH = ch;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderW = cw;
      renderH = cw / imgRatio;
      offsetY = (ch - renderH) / 2;
    } else {
      renderH = ch;
      renderW = ch * imgRatio;
      offsetX = (cw - renderW) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    // Subtle dark gradient vignette at edges for cinematic integration
    const grad = ctx.createRadialGradient(
      cw / 2,
      ch / 2,
      Math.min(cw, ch) * 0.35,
      cw / 2,
      ch / 2,
      Math.max(cw, ch) * 0.8
    );
    grad.addColorStop(0, "rgba(6, 8, 13, 0)");
    grad.addColorStop(0.7, "rgba(6, 8, 13, 0.45)");
    grad.addColorStop(1, "rgba(6, 8, 13, 0.95)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cw, ch);

    ctx.restore();
  };

  // Initial paint on first loaded frame
  useEffect(() => {
    if (isLoaded) {
      renderFrame(0);
    }
  }, [isLoaded]);

  // GSAP ScrollTrigger setup
  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    if (!section) return;

    let ctx: any;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=350%",
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => {
              const progress = self.progress;
              const frameIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.floor(progress * (TOTAL_FRAMES - 1))
              );
              setCurrentFrameIndex(frameIndex);
              setScrollPercent(Math.round(progress * 100));
              renderFrame(frameIndex);
            },
          });
        }, section);
      });
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, [isLoaded]);

  // Handle window resize
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      renderFrame(currentFrameIndex);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentFrameIndex]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen w-full bg-[#06080d] overflow-hidden select-none"
    >
      {/* Canvas for the 300-frame ScrollTrigger sequence */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full object-cover z-0 pointer-events-none"
      />

      {/* Loading Screen Overlay if frames are downloading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#06080d] flex flex-col items-center justify-center z-40 transition-opacity duration-700">
          <div className="size-16 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin mb-4" />
          <span className="font-display text-sm tracking-[0.24em] text-white uppercase">
            CALIBRATING MOLECULAR SEQUENCE
          </span>
          <div className="mt-3 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-200"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="mt-2 font-mono text-xs text-cyan-400">{loadProgress}%</span>
        </div>
      )}

      {/* Narrative Overlays that Transition Based on Scroll Percentage */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 sm:p-10 lg:p-16">
        {/* Top Floating Telemetry Header */}
        <div className="flex items-center justify-between pt-14 sm:pt-12">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] uppercase tracking-widest backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-cyan-400 animate-ping" />
              SCROLLTRIGGER SEQUENCE ACTIVE
            </span>
            <span className="hidden sm:inline font-mono text-xs text-slate-400 uppercase tracking-wider">
              // FRAME {padZero(currentFrameIndex + 1)} / {TOTAL_FRAMES}
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs text-slate-300">
            <div className="hidden md:block">
              <span className="text-slate-500 mr-2">OZONE (O₃):</span>
              <span className="text-cyan-400 font-bold">{telemetry.ozonePpm} PPM</span>
            </div>
            <div>
              <span className="text-slate-500 mr-2">DRUM:</span>
              <span className="text-white font-bold">{telemetry.rpm} RPM</span>
            </div>
            <div>
              <span className="text-slate-500 mr-2">CYCLE:</span>
              <span className="text-emerald-400 font-bold">{scrollPercent}%</span>
            </div>
          </div>
        </div>

        {/* Dynamic Center Hero Content Switching with Scroll */}
        <div className="relative max-w-3xl my-auto">
          {/* Phase 1: Intro (0% - 24%) */}
          <div
            className={`transition-all duration-700 ${
              scrollPercent <= 24
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-8 pointer-events-none absolute inset-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-[0.2em] uppercase bg-white/[0.04] border border-cyan-500/20 px-3.5 py-1 rounded-full mb-3 backdrop-blur-md">
              <Sparkles className="size-3.5 text-cyan-300" />
              <span>Scroll-Driven Flow Animation</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight uppercase [text-shadow:0_4px_30px_rgb(0_0_0/0.8)]">
              PRECISION <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">LAUNDRY</span> FLOW.
            </h1>
            <p className="mt-4 text-slate-200 text-sm sm:text-lg max-w-xl leading-relaxed [text-shadow:0_2px_12px_rgb(0_0_0/0.8)]">
              Scroll down to witness the fluid dynamics of LuxeWash. From cold aqueous ozone infusion to high-velocity extraction, experience pure garment preservation.
            </p>

            <div className="mt-8 flex items-center gap-4 pointer-events-auto">
              <button
                onClick={
                  onOpenBooking
                    ? onOpenBooking
                    : () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-mono text-xs uppercase tracking-wider font-extrabold shadow-[0_0_25px_rgba(6,182,212,0.45)] transition-all transform active:scale-95"
              >
                Schedule Doorstep Wash
              </button>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 animate-bounce">
                <span>Scroll down to initiate sequence</span>
                <ArrowDown className="size-3.5" />
              </div>
            </div>
          </div>

          {/* Phase 2: Ozone Infusion (25% - 49%) */}
          <div
            className={`transition-all duration-700 ${
              scrollPercent > 24 && scrollPercent <= 49
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8 pointer-events-none absolute inset-0"
            }`}
          >
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
              STAGE 01 // MOLECULAR DISSOLUTION
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase leading-[1.1] [text-shadow:0_4px_30px_rgb(0_0_0/0.8)]">
              COLD AQUEOUS <span className="text-cyan-400">OZONE</span> INFUSION.
            </h2>
            <p className="mt-3 text-slate-200 text-sm sm:text-base max-w-lg leading-relaxed [text-shadow:0_2px_10px_rgb(0_0_0/0.8)]">
              Micro-dissolved active oxygen penetrates the fiber matrix at 32°C, instantly breaking down organic soil without the tensile degradation of scorching water.
            </p>
          </div>

          {/* Phase 3: Inversion Agitation (50% - 74%) */}
          <div
            className={`transition-all duration-700 ${
              scrollPercent > 49 && scrollPercent <= 74
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8 pointer-events-none absolute inset-0"
            }`}
          >
            <span className="font-mono text-xs text-purple-400 uppercase tracking-widest block mb-1">
              STAGE 02 // HYDRO-DYNAMIC FLOW
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase leading-[1.1] [text-shadow:0_4px_30px_rgb(0_0_0/0.8)]">
              DUAL-AXIS <span className="text-purple-400">INVERSION</span> AGITATION.
            </h2>
            <p className="mt-3 text-slate-200 text-sm sm:text-base max-w-lg leading-relaxed [text-shadow:0_2px_10px_rgb(0_0_0/0.8)]">
              Alternating counter-rotational currents gently float delicate weaves and Egyptian linens, eliminating friction tear while achieving 99.4% particulate extraction.
            </p>
          </div>

          {/* Phase 4: Centrifugal Extraction (75% - 100%) */}
          <div
            className={`transition-all duration-700 ${
              scrollPercent > 74
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8 pointer-events-none absolute inset-0"
            }`}
          >
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block mb-1">
              STAGE 03 // SURGICAL COMPLETION
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase leading-[1.1] [text-shadow:0_4px_30px_rgb(0_0_0/0.8)]">
              1,600 RPM <span className="text-emerald-400">CENTRIFUGAL</span> EXTRACT.
            </h2>
            <p className="mt-3 text-slate-200 text-sm sm:text-base max-w-lg leading-relaxed [text-shadow:0_2px_10px_rgb(0_0_0/0.8)]">
              Maximum moisture removal with zero residual surfactants. Garments emerge crisp, neutral-pH, and sterile, ready for automated robotic pressing.
            </p>

            <div className="mt-6 pointer-events-auto">
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs uppercase tracking-wider font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
              >
                <span>Explore Full Facility & Services</span>
                <ArrowDown className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Telemetry HUD Ribbon & Scrubber */}
        <div className="w-full">
          {/* Progress Timeline Scrubber Bar */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-4 backdrop-blur-md">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 transition-all duration-100 shadow-[0_0_10px_#38bdf8]"
              style={{ width: `${scrollPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="hud-brackets p-3 bg-black/60 border border-white/10 rounded-lg backdrop-blur-md">
              <span className="block font-mono text-[9px] text-slate-400 uppercase">
                Active Phase
              </span>
              <span className="block font-display text-xs text-white font-bold mt-0.5 line-clamp-1 uppercase">
                {telemetry.phaseName}
              </span>
            </div>

            <div className="hud-brackets p-3 bg-black/60 border border-white/10 rounded-lg backdrop-blur-md">
              <span className="block font-mono text-[9px] text-slate-400 uppercase">
                Drum Velocity
              </span>
              <span className="block font-display text-xs text-cyan-300 font-bold mt-0.5 tabular-nums">
                {telemetry.rpm} <span className="text-[10px] font-mono">RPM</span>
              </span>
            </div>

            <div className="hud-brackets p-3 bg-black/60 border border-white/10 rounded-lg backdrop-blur-md">
              <span className="block font-mono text-[9px] text-slate-400 uppercase">
                Bath Temperature
              </span>
              <span className="block font-display text-xs text-white font-bold mt-0.5 tabular-nums">
                {telemetry.temp}°C / {Math.round((telemetry.temp * 9) / 5 + 32)}°F
              </span>
            </div>

            <div className="hud-brackets p-3 bg-black/60 border border-white/10 rounded-lg backdrop-blur-md">
              <span className="block font-mono text-[9px] text-slate-400 uppercase">
                Sterility Index
              </span>
              <span className="block font-display text-xs text-emerald-400 font-bold mt-0.5 tabular-nums">
                {telemetry.cleanliness}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
