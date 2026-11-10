"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { getAssetPath } from "@/lib/basePath";
import { Sparkles, Shield, Cpu, Activity } from "lucide-react";

const TOTAL_FRAMES = 104;

const padZero = (num: number, size = 3) => {
  let s = String(num);
  while (s.length < size) s = "0" + s;
  return s;
};

export default function ReplicaFiberEngineering() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef<{ index: number }>({ index: 0 });
  const lastRenderedIndexRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);

  const [currentFrame, setCurrentFrame] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Construct frame asset URL with base path support
  const constructFrameUrl = useCallback((index: number) => {
    const frameNum = Math.min(TOTAL_FRAMES, Math.max(1, index + 1));
    return getAssetPath(`/fiber-frames/ezgif-frame-${padZero(frameNum, 3)}.jpg`);
  }, []);

  // High performance render with nearest loaded frame fallback
  const renderFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[idx];

    // Nearest loaded frame fallback to prevent blank flashing
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[idx - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[idx + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) {
      img = imagesRef.current[0];
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.floor(rect.width * dpr);
    const targetH = Math.floor(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const cw = rect.width;
    const ch = rect.height;
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

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    ctx.restore();
    lastRenderedIndexRef.current = idx;
  }, []);

  // Frame initialization and progressive preloading
  useEffect(() => {
    if (typeof window === "undefined") return;

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = constructFrameUrl(0);
    firstImg.onload = () => {
      images[0] = firstImg;
      renderFrame(0);

      // Preload remaining 103 frames progressively
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = constructFrameUrl(i);
        img.onload = () => {
          if (frameRef.current.index === i) {
            renderFrame(i);
          }
        };
        images[i] = img;
      }
    };

    return () => {
      if (imagesRef.current) {
        imagesRef.current.forEach((img) => {
          if (img) {
            img.onload = null;
            img.onerror = null;
          }
        });
      }
    };
  }, [constructFrameUrl, renderFrame]);

  // GSAP ScrollTrigger Integration for scroll-driven scrub
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current) return;

    let ctx: any;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          if (!sectionRef.current) return;

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            onUpdate: (self) => {
              const progress = self.progress;
              const targetIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
              );

              frameRef.current.index = targetIndex;
              setScrollProgress(Math.round(progress * 100));
              setCurrentFrame(targetIndex + 1);

              if (targetIndex !== lastRenderedIndexRef.current) {
                if (animFrameIdRef.current) {
                  cancelAnimationFrame(animFrameIdRef.current);
                }
                animFrameIdRef.current = requestAnimationFrame(() => {
                  renderFrame(targetIndex);
                });
              }
            },
          });
        }, sectionRef.current);
      }
    );

    const handleResize = () => {
      renderFrame(frameRef.current.index);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (ctx) ctx.revert();
    };
  }, [renderFrame]);

  return (
    <section
      ref={sectionRef}
      id="fiber-restoration"
      className="relative min-h-[180vh] sm:min-h-[220vh] w-full max-w-full bg-[#060813] text-white z-20 box-border overflow-x-hidden"
    >
      {/* Sticky Fullscreen Presentation Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-16 overflow-hidden">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-1/4 -left-32 size-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 size-96 bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />

        {/* 2-Column Responsive Layout: Left Content + Right Interactive Video Canvas */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center z-10 my-auto">
          {/* Left Column: Editorial Content, Fiber Diagnostics, and Process Highlights */}
          <div className="lg:col-span-6 w-full max-w-xl mx-auto lg:max-w-none text-left space-y-4 sm:space-y-5">
            {/* Bold Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-sans font-black text-white tracking-tight leading-[1.08]">
              Microscopic Fiber <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-amber-300">
                Aqueous Weave Restoration
              </span>
            </h2>

            {/* Editorial Description */}
            <p className="text-slate-300 font-bold text-base sm:text-lg leading-relaxed">
              Witness individualized warp and weft yarns revitalize under scroll-controlled molecular ozone cavitation. Compaction soils dissolve at 32°C without fiber friction, restoring original thread elasticity, hand softness, and tailored drape.
            </p>

            {/* Precision Micro-Metrics Deck */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 pt-1">
              <div className="p-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 backdrop-blur-md transition-all space-y-1.5">
                <div className="flex items-center gap-2.5 text-amber-300 font-black text-base">
                  <Sparkles className="size-5 text-amber-400" />
                  <span>0.02μ Aqueous O₃</span>
                </div>
                <p className="text-slate-300 font-bold text-base leading-relaxed">
                  Sub-micron cavitation dissolves soil residues without abrasive surfactants.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 backdrop-blur-md transition-all space-y-1.5">
                <div className="flex items-center gap-2.5 text-purple-300 font-black text-base">
                  <Shield className="size-5 text-purple-400" />
                  <span>Zero Yarn Abrasion</span>
                </div>
                <p className="text-slate-300 font-bold text-base leading-relaxed">
                  Thread count crimp preserved for +40% longer bed linen lifecycle.
                </p>
              </div>
            </div>

            {/* Live Telemetry Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/15">
              <div className="flex items-center gap-2.5 text-base font-extrabold text-slate-200">
                <Activity className="size-5 text-amber-400 animate-pulse" />
                <span>Micro-Weave Scan: Tier 01 Active</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-base font-black text-amber-300">
                <Cpu className="size-4 text-purple-300" />
                <span>FRAME {padZero(currentFrame, 3)} / {TOTAL_FRAMES}</span>
                <span className="text-slate-400 font-medium">({scrollProgress}%)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Scroll-Driven Fiber Canvas Display */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none h-[280px] sm:h-[380px] md:h-[440px] lg:h-[500px] rounded-[32px] sm:rounded-[40px] overflow-hidden border-2 border-white/20 bg-black/80 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9),0_0_35px_rgba(126,34,206,0.25)] ring-1 ring-white/15 group">
              {/* Inner High Performance Canvas */}
              <canvas
                ref={canvasRef}
                className="w-full h-full block object-cover"
              />

              {/* Glassmorphic Shine Overlay */}
              <div className="absolute inset-0 rounded-[30px] sm:rounded-[38px] border border-white/20 pointer-events-none" />
              <div className="absolute top-3 left-6 right-6 h-6 bg-gradient-to-b from-white/25 to-transparent rounded-full blur-sm pointer-events-none" />

              {/* Bottom Live Fiber Overlay Banner */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/20 flex items-center justify-between pointer-events-none text-left">
                <div className="space-y-0.5">
                  <div className="text-base font-black text-white flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Real-Time Thread Tension Telemetry</span>
                  </div>
                  <div className="text-base font-bold text-slate-300">
                    High-Definition Macro Weave Aqueous Inspection
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <span className="text-base font-black text-amber-400 uppercase tracking-wider">
                    HD 1080P
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
