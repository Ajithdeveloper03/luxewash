"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { getAssetPath } from "@/lib/constants";

const FRAME_COUNT = 210;
const FRAME_EXT = "webp";

const framePath = (i: number) =>
  getAssetPath(`/frames/frame_${String(i + 1).padStart(4, "0")}.${FRAME_EXT}`);

// Elegant serif used in the reference design (falls back gracefully if the font isn't loaded)
const SERIF =
  'var(--font-playfair), "Playfair Display", "Cormorant Garamond", Georgia, "Times New Roman", serif';

const PURPLE = "#2B0B4A";
const GOLD = "#B8863B";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const isGlassActiveRef = useRef<boolean>(false);

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

    const scrubDistance = window.innerWidth < 768 ? 1600 : 2400;

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

          // Hero light glassy background only comes in larger devices after frame 140 strictly
          const shouldBeGlass = idx >= 140;
          if (shouldBeGlass !== isGlassActiveRef.current) {
            isGlassActiveRef.current = shouldBeGlass;
            if (leftPanelRef.current) {
              if (shouldBeGlass) {
                leftPanelRef.current.classList.add("hero-glass-active");
              } else {
                leftPanelRef.current.classList.remove("hero-glass-active");
              }
            }
            if (rightPanelRef.current) {
              if (shouldBeGlass) {
                rightPanelRef.current.classList.add("hero-glass-active");
              } else {
                rightPanelRef.current.classList.remove("hero-glass-active");
              }
            }
          }
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

  const goToServices = () => {
    if (typeof window === "undefined") return;
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.dispatchEvent(new CustomEvent("open-quote-modal"));
    }
  };

  return (
    <section id="home" className="relative z-10 w-full bg-white">
      <div
        ref={containerRef}
        className="relative isolate w-full min-h-[100svh] overflow-hidden bg-white flex flex-col justify-between pt-16 sm:pt-20 pb-4 lg:h-screen lg:min-h-screen lg:flex-row lg:items-center lg:py-0"
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

        {/* LAYER 3: Content (Container-Fluid with minimal edge gap) */}
        <div className="relative z-20 w-full max-w-none h-full flex flex-col justify-between lg:flex-row lg:items-center px-3 sm:px-5 md:px-6 lg:px-8 xl:px-12 py-3 sm:py-5 lg:py-0 pointer-events-none">
          {/* PRIMARY COLUMN (Left on desktop, Top on mobile/tablet) with light glassmorphism strictly after frame 140 on desktop */}
          <div
            ref={leftPanelRef}
            className="w-full max-w-md mx-auto lg:mx-0 lg:w-[360px] xl:w-[420px] 2xl:w-[490px] flex flex-col justify-center text-left z-20 pointer-events-auto shrink-0 bg-white/45  hero-glass-panel p-6 sm:p-8 xl:p-9 rounded-3xl"
          >
            {/* Headline strictly with Playfair Display */}
            <h1
              className="font-playfair text-[2rem] sm:text-[2.5rem] md:text-[2.75rem] lg:text-[2.75rem] xl:text-[3.4rem] 2xl:text-[3.9rem] font-semibold leading-[1.04] tracking-[-0.01em]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', color: PURPLE }}
            >
              Luxury Care for Every Thread
            </h1>

            {/* Gold accent line */}
            <div
              className="w-14 sm:w-16 xl:w-[88px] h-[2px] mt-4 sm:mt-5 xl:mt-6"
              style={{ backgroundColor: GOLD }}
            />

            {/* Tagline */}
            <p className="font-sans mt-4 sm:mt-5 text-base sm:text-lg xl:text-[1.35rem] leading-snug text-[#4B3A63] font-normal">
              Expert laundry care.
              <br />
              Impeccable results.
            </p>

            {/* Outlined pill button with Apple Glass feel */}
            <div className="mt-5 sm:mt-6 xl:mt-7">
              <button
                type="button"
                onClick={goToServices}
                className="group inline-flex items-center gap-2 rounded-full border-[1.5px] bg-white/40 backdrop-blur-md px-6 sm:px-7 xl:px-8 py-2.5 sm:py-3 xl:py-3.5 text-sm xl:text-base font-bold transition-all duration-300 hover:text-white hover:shadow-lg active:scale-[0.98] cursor-pointer shadow-[0_4px_16px_rgba(46,8,84,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)]"
                style={{ borderColor: PURPLE, color: PURPLE }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PURPLE)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <span>Explore Our Services</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* MOBILE/TABLET COMPACT BOTTOM PILL (< lg only) with light glassmorphism & text-sm */}
          <div className="lg:hidden mx-auto max-w-sm w-full px-1 pointer-events-auto mt-2">
            <div className="bg-white/50 backdrop-blur-2xl border border-white/75 shadow-[0_4px_20px_rgba(46,8,84,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] py-2.5 px-4 rounded-full flex items-center justify-between text-sm font-semibold text-[#2E0854]">
              <span>✓ Bulk Linen Care</span>
              <span className="text-[#D4AF37]">•</span>
              <span>✓ Strict Hygiene</span>
              <span className="text-[#D4AF37]">•</span>
              <span>✓ Dependable Ops</span>
            </div>
          </div>

          {/* CENTER SPACER (Desktop only) */}
          <div className="hidden lg:block flex-1 min-w-[30px]" aria-hidden="true" />

          {/* SECONDARY COLUMN (Right on desktop only) with light glassmorphism strictly after frame 140 */}
          <div
            ref={rightPanelRef}
            className="hidden lg:flex w-[300px] xl:w-[340px] 2xl:w-[380px] flex-col items-center justify-center text-center z-20 pointer-events-auto shrink-0 hero-glass-panel p-6 sm:p-8 xl:p-9 rounded-3xl"
          >
            {/* Diamond icon */}
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              stroke={GOLD}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="mb-3"
            >
              <path d="M16 3 L29 16 L16 29 L3 16 Z" />
              <path d="M11 16 L16 11 L21 16" />
              <path d="M11 20 L16 15 L21 20" />
            </svg>

            {/* Eyebrow: — PREMIUM LAUNDRY CARE — strictly text-sm */}
            <div
              className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em]"
              style={{ color: GOLD }}
            >
              <span className="block w-4 h-px" style={{ backgroundColor: GOLD }} />
              <span>Premium Laundry Care</span>
              <span className="block w-4 h-px" style={{ backgroundColor: GOLD }} />
            </div>

            {/* Heading strictly with Playfair Display */}
            <h2
              className="font-playfair mt-4 text-[1.55rem] xl:text-[1.9rem] 2xl:text-[2.1rem] font-normal leading-[1.18]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', color: PURPLE }}
            >
              Thoughtful cleaning
              <br />
              for the clothes you love.
            </h2>

            {/* Gold line */}
            <div className="w-16 xl:w-20 h-[2px] mt-5" style={{ backgroundColor: GOLD }} />
          </div>
        </div>
      </div>
    </section>
  );
}