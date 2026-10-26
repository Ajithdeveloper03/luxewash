"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { getAssetPath } from "@/lib/constants";

const FRAME_COUNT = 210;
const FRAME_EXT = "webp"; // change to "jpg" if you extracted JPG frames

const framePath = (i: number) =>
  getAssetPath(`/frames/frame_${String(i + 1).padStart(4, "0")}.${FRAME_EXT}`);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    const state = { frame: 0 };
    let lastDrawn = -1;
    let cancelled = false;

    // Draws a frame using "cover" sizing (same as object-cover)
    const draw = (index: number) => {
      let img = images[index];

      // If this frame isn't loaded yet, use the nearest loaded one
      if (!img) {
        for (let d = 1; d < FRAME_COUNT; d++) {
          img = images[index - d] || images[index + d] || null;
          if (img) break;
        }
      }
      if (!img || !img.naturalWidth) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      lastDrawn = index;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      draw(Math.round(state.frame));
    };

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          images[i] = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = framePath(i);
      });

    // First frame immediately, the rest in background batches
    (async () => {
      await load(0);
      if (cancelled) return;
      resize();

      const BATCH = 12;
      for (let i = 1; i < FRAME_COUNT; i += BATCH) {
        if (cancelled) return;
        await Promise.all(
          Array.from({ length: Math.min(BATCH, FRAME_COUNT - i) }, (_, k) => load(i + k))
        );
      }
    })();

    window.addEventListener("resize", resize);

    const scrubDistance = window.innerWidth < 768 ? 1800 : 2600;

    // Video plays over the first 80% of the scroll, then holds the last frame
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        pinSpacing: true,
        start: "top top",
        end: `+=${scrubDistance}`,
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });

    tl.to(
      state,
      {
        frame: FRAME_COUNT - 1,
        ease: "none",
        duration: 0.8,
        onUpdate: () => {
          const idx = Math.round(state.frame);
          if (idx !== lastDrawn) draw(idx);
        },
      },
      0
    ).to({}, { duration: 0.2 }); // hold final frame

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section id="home" className="relative z-10 w-full bg-white">
      <div
        ref={containerRef}
        className="relative isolate w-full min-h-[100svh] overflow-hidden bg-white flex flex-col justify-between pt-16 sm:pt-20 pb-6 lg:h-screen lg:min-h-screen lg:flex-row lg:items-center lg:py-0"
      >
        {/* LAYER 1: Canvas frame sequence */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="LuxeWash commercial laundry presentation"
            className="absolute inset-0 block h-full w-full"
          />
        </div>

        {/* LAYER 2: Silk frame overlay */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
          <img
            src={getAssetPath("/images/silk-frame.png")}
            alt="Luxury silk drapery frame"
            decoding="async"
            className="w-full h-full object-cover object-center select-none"
          />
        </div>

        {/* LAYER 3: Content */}
        <div className="relative z-20 w-full max-w-none h-full flex flex-col justify-between lg:flex-row lg:items-center px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-0 pointer-events-none">
          {/* LEFT COLUMN */}
          <div className="w-full lg:w-[310px] xl:w-[340px] 2xl:w-[370px] flex flex-col justify-center space-y-3 sm:space-y-3.5 text-left z-20 pointer-events-auto shrink-0 bg-white/90 p-4 sm:p-5 rounded-2xl lg:bg-transparent lg:p-0 lg:rounded-none shadow-sm lg:shadow-none border border-purple-900/10 lg:border-none">
            <div className="inline-flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[#6B1D9E]" />
              <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#6B1D9E]">
                Commercial Laundry Solutions
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[2.6rem] xl:text-[2.95rem] font-extrabold leading-[1.08] tracking-tight text-[#1E0935]">
              Luxury Care <br className="hidden sm:inline" />
              for Every <br className="hidden sm:inline" />
              Thread
            </h1>

            <div className="w-12 h-[2px] bg-amber-400/90 my-1" />

            <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Expert laundry care. Impeccable results.
            </p>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-quote-modal"));
                }}
                className="group inline-flex items-center gap-2 rounded-full border border-purple-900/30 bg-white/95 hover:bg-white px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-[#2E0854] shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="h-4 w-4 text-[#2E0854] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* CENTER SPACER */}
          <div className="hidden lg:block flex-1 min-w-[30px]" aria-hidden="true" />

          {/* RIGHT COLUMN */}
          <div className="w-full lg:w-[280px] xl:w-[310px] 2xl:w-[340px] flex flex-col justify-center space-y-3 sm:space-y-3.5 text-left z-20 pointer-events-auto shrink-0 bg-white/90 p-4 sm:p-5 rounded-2xl lg:bg-transparent lg:p-0 lg:rounded-none shadow-sm lg:shadow-none border border-purple-900/10 lg:border-none">
            <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#b58d20]">
              <span className="text-amber-500">✦</span>
              <span>PREMIUM LAUNDRY CARE</span>
              <span className="text-amber-500">✦</span>
            </div>

            <h2 className="font-display text-xl sm:text-2xl lg:text-[1.65rem] xl:text-[1.75rem] font-extrabold leading-[1.2] text-[#1E0935]">
              Thoughtful cleaning for the businesses you run.
            </h2>

            <div className="w-12 h-[2px] bg-amber-400/90 my-0.5" />

            <div className="space-y-2 pt-0.5 font-sans text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6B1D9E] shrink-0" />
                <span className="font-medium">100% Isolated Sanitized Drums</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6B1D9E] shrink-0" />
                <span className="font-medium">Scheduled Doorstep Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6B1D9E] shrink-0" />
                <span className="font-medium">Custom Commercial Volume Rates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}