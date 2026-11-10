"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { getAssetPath } from "@/lib/basePath";
import { Sparkles, Shield } from "lucide-react";

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
    const cw = rect.width || window.innerWidth;
    const ch = rect.height || window.innerHeight;

    const targetW = Math.floor(cw * dpr);
    const targetH = Math.floor(ch * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

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
      // On desktop, bias focal center towards the right side to leave left open for content
      offsetX = cw >= 1024 ? (cw - renderW) * 0.75 : (cw - renderW) / 2;
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

      // Preload remaining 103 frames progressively in background
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

  // GSAP ScrollTrigger Integration: Screen locked (pin: true) until all 104 frames finish playing
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
            end: "+=2600",
            pin: true,
            scrub: 1.0, // Steady, buttery-smooth scrub rate
            anticipatePin: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const targetIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
              );

              frameRef.current.index = targetIndex;

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
      className="relative h-screen w-full max-w-full bg-[#060813] text-white z-20 box-border overflow-hidden"
    >
      {/* 1. Full Background Canvas: Smooth, steady 104-frame micro-weave animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block object-cover z-0"
      />

      {/* 2. Soft Dark Vignette & Gradient Overlays: Preserves left side contrast while keeping right side open */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060813] via-[#060813]/85 sm:via-[#060813]/70 to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060813]/90 via-transparent to-[#060813]/60 z-[1] pointer-events-none lg:hidden" />

      {/* 3. Main Content Container: Left Column has Editorial Content; Right side has NO text or labels */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto flex flex-col justify-center px-4 sm:px-8 lg:px-16 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full my-auto pointer-events-auto">
          {/* Left Column: Bold Typography, Description & Micro-Metrics */}
          <div className="lg:col-span-6 w-full max-w-xl mx-auto lg:max-w-none text-left space-y-4 sm:space-y-6">
            {/* Bold Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black text-white tracking-tight leading-[1.08] [text-shadow:0_2px_20px_rgb(0_0_0/0.95)]">
              Microscopic Fiber <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-amber-300">
                Aqueous Weave Restoration
              </span>
            </h2>

            {/* Editorial Description */}
            <p className="text-slate-200 font-bold text-base sm:text-lg leading-relaxed [text-shadow:0_1px_10px_rgb(0_0_0/0.95)]">
              Witness individualized warp and weft yarns revitalize under scroll-controlled molecular ozone cavitation. Compaction soils dissolve at 32°C without fiber friction, restoring original thread elasticity, hand softness, and tailored drape.
            </p>

            {/* Precision Micro-Metrics Deck */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 hover:bg-black/75 border border-white/20 backdrop-blur-md shadow-xl transition-all space-y-2">
                <div className="flex items-center gap-2.5 text-amber-300 font-black text-base">
                  <Sparkles className="size-5 text-amber-400" />
                  <span>0.02μ Aqueous O₃</span>
                </div>
                <p className="text-slate-300 font-bold text-base leading-relaxed">
                  Sub-micron cavitation dissolves soil residues without abrasive surfactants.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 hover:bg-black/75 border border-white/20 backdrop-blur-md shadow-xl transition-all space-y-2">
                <div className="flex items-center gap-2.5 text-purple-300 font-black text-base">
                  <Shield className="size-5 text-purple-400" />
                  <span>Zero Yarn Abrasion</span>
                </div>
                <p className="text-slate-300 font-bold text-base leading-relaxed">
                  Thread count crimp preserved for +40% longer bed linen lifecycle.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Intentionally Empty — Pure cinematic view of the background fiber frames with ZERO text or labels */}
          <div className="lg:col-span-6 w-full hidden lg:block pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
