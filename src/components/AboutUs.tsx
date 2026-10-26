"use client";

import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import { getAssetPath } from "@/lib/constants";

/* ---------------- Clothesline tuning ---------------- */
const LINE_START_X = 0.85;   // where the PNG's left edge sits across the photo (0 = photo left, 1 = photo right)
const WIRE_LEFT_Y = 0.78;    // wire height at the PNG's LEFT edge  (0 = top of PNG, 1 = bottom)
const WIRE_RIGHT_Y = 0.10;   // wire height at the PNG's RIGHT edge (0 = top of PNG, 1 = bottom)
const CLEARANCE = 44;        // min gap (px) between text and wire (covers clothespins + wind movement)
const PHOTO_OVERHANG = 56;   // how far above the photo's bottom edge the wire emerges (px)
const BASE_PAD = 48;         // section's normal top/bottom padding (md:py-12)
const BASE_PHOTO_H = 440;    // photo's normal height on desktop
const DEBUG = false;         // true = draws a red line where the code thinks the wire is
/* ---------------------------------------------------- */

const WIND_CSS = `
@keyframes lw-sway {
  0%, 100% { transform: rotate(-0.35deg); }
  50%      { transform: rotate(0.35deg); }
}
@keyframes lw-flutter {
  0%, 100% { transform: skewX(-0.7deg); }
  50%      { transform: skewX(0.7deg); }
}
.lw-sway    { animation: lw-sway 7s ease-in-out infinite; will-change: transform; }
.lw-flutter { animation: lw-flutter 4.6s ease-in-out infinite; transform-origin: 50% 45%; will-change: transform; }
@media (prefers-reduced-motion: reduce) {
  .lw-sway, .lw-flutter { animation: none; }
}
`;

type Layout = {
  left: number;
  top: number;
  width: number;
  height: number;
  padTop: number;
  padBottom: number;
  photoH: number;
};

const sameLayout = (a: Layout | null, b: Layout | null) =>
  a === b ||
  (!!a &&
    !!b &&
    a.left === b.left &&
    a.top === b.top &&
    a.width === b.width &&
    a.height === b.height &&
    a.padTop === b.padTop &&
    a.padBottom === b.padBottom &&
    a.photoH === b.photoH);

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const lineRef = useRef<HTMLImageElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);

  const measure = useCallback(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const photo = photoRef.current;
    const textCol = textRef.current;
    const cards = cardsRef.current;
    const cta = ctaRef.current;
    const img = lineRef.current;
    if (!section || !grid || !photo || !textCol || !cards || !cta || !img) return;
    if (!img.naturalWidth) return;

    // Mobile / tablet uses the in-flow strip instead
    if (window.innerWidth < 1024) {
      setLayout((prev) => (prev === null ? prev : null));
      return;
    }

    const sr = section.getBoundingClientRect();
    const gr = grid.getBoundingClientRect();
    const pr = photo.getBoundingClientRect();
    const tr = textCol.getBoundingClientRect();

    // ----- Horizontal: start inside the photo, end at the screen's right edge -----
    const photoLeft = pr.left - sr.left;
    const photoRight = pr.right - sr.left;
    const left = photoLeft + pr.width * LINE_START_X;
    const width = sr.width - left;
    const height = width * (img.naturalHeight / img.naturalWidth);

    // Wire's y (from the PNG's top) at a given x (section coordinates)
    const slope = ((WIRE_RIGHT_Y - WIRE_LEFT_Y) * height) / width;
    const wireAt = (x: number) => WIRE_LEFT_Y * height + slope * (x - left);

    // ----- Vertical (all relative to the grid's top, so padding changes never feed back) -----
    // The wire must pass below the bottom-right corner of every text block
    const blocks = [cta.getBoundingClientRect(), cards.getBoundingClientRect()];
    let topRel = -Infinity;
    for (const r of blocks) {
      const need = r.bottom - gr.top + CLEARANCE - wireAt(r.right - sr.left);
      topRel = Math.max(topRel, need);
    }

    // Photo grows so the wire emerges from behind it, near its bottom
    const photoTopRel = pr.top - gr.top;
    const photoH = Math.max(
      BASE_PHOTO_H,
      topRel + wireAt(photoRight) + PHOTO_OVERHANG - photoTopRel
    );

    const gridBottomRel = Math.max(photoTopRel + photoH, tr.bottom - gr.top);
    const padTop = Math.max(BASE_PAD, -topRel + 8);
    const padBottom = Math.max(BASE_PAD, topRel + height - gridBottomRel + 16);

    const next: Layout = {
      left: Math.round(left),
      top: Math.round(padTop + topRel),
      width: Math.round(width),
      height: Math.round(height),
      padTop: Math.round(padTop),
      padBottom: Math.round(padBottom),
      photoH: Math.round(photoH),
    };
    setLayout((prev) => (sameLayout(prev, next) ? prev : next));
  }, []);

  useLayoutEffect(() => {
    measure();

    const ro = new ResizeObserver(measure);
    [sectionRef, gridRef, photoRef, textRef, cardsRef, ctaRef].forEach(
      (r) => r.current && ro.observe(r.current)
    );

    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    if (lineRef.current?.complete) measure();
    document.fonts?.ready.then(measure).catch(() => {});

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, [measure]);

  const origin = `0% ${WIRE_LEFT_Y * 100}%`;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-8 sm:py-10 md:py-12 bg-white relative overflow-hidden"
      style={
        layout
          ? { paddingTop: layout.padTop, paddingBottom: layout.padBottom }
          : undefined
      }
    >
      <style>{WIND_CSS}</style>

      {/* DESKTOP CLOTHESLINE: behind everything, wire runs below all text to the screen's right edge */}
      <div
        className="hidden lg:block absolute z-0 pointer-events-none select-none"
        style={
          layout
            ? { left: layout.left, top: layout.top, width: layout.width, height: layout.height }
            : { left: 0, top: 0, width: "60%", opacity: 0 }
        }
      >
        <div className="lw-sway" style={{ transformOrigin: origin }}>
          <div className="lw-flutter">
            <img
              ref={lineRef}
              src={getAssetPath("/images/dressing.png")}
              alt=""
              aria-hidden="true"
              draggable={false}
              onLoad={measure}
              className="block w-full h-auto max-w-none"
            />
          </div>
        </div>
      </div>

      {DEBUG && layout && (
        <svg className="hidden lg:block absolute inset-0 w-full h-full z-30 pointer-events-none">
          <line
            x1={layout.left}
            y1={layout.top + WIRE_LEFT_Y * layout.height}
            x2={layout.left + layout.width}
            y2={layout.top + WIRE_RIGHT_Y * layout.height}
            stroke="red"
            strokeWidth="1"
          />
        </svg>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start"
        >
          {/* Left Side: Rounded Photo (grows taller on desktop so the wire emerges from behind it) */}
          <div className="lg:col-span-5 relative">
            <div
              ref={photoRef}
              className="relative h-[340px] sm:h-[400px] md:h-[440px] w-full max-w-[460px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-white"
              style={layout ? { height: layout.photoH } : undefined}
            >
              <Image
                src={getAssetPath("/images/about.jpg")}
                alt="LUXEWASH Premium Laundry Towels and Washcare"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Badge moved to the left so it never sits where the wire comes out */}
            <div className="absolute -bottom-3 -left-3 apple-glass px-4 py-2 rounded-2xl shadow-xl hidden sm:flex items-center gap-2 text-sm font-semibold text-[#18042b]">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>100% Care Guarantee</span>
            </div>
          </div>

          {/* Right Side: Content */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col justify-center relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass-pill text-[#2E0854] text-sm font-semibold uppercase tracking-wider font-body w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E0854]" />
              <span>About LuxeWash</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#18042b] tracking-tight font-display leading-tight mb-4">
              Your Partner in Commercial Laundry Solutions
            </h2>

            <p className="text-slate-600 text-sm sm:text-base md:text-lg font-body leading-relaxed max-w-xl mb-5">
              LuxeWash delivers professional linen-care and commercial laundry solutions for hotels, healthcare facilities, and restaurants. We build custom service arrangements based on your daily textile volume, handling standards, and scheduled delivery requirements.
            </p>

            <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-w-xl">
              <div className="p-4 sm:p-5 rounded-2xl apple-glass-interactive">
                <span className="text-sm font-bold text-[#2E0854] uppercase tracking-wider block mb-1">Our Mission</span>
                <p className="text-sm text-slate-600 leading-snug">
                  To simplify commercial laundry management by delivering reliable, professional, and customer-focused solutions.
                </p>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl apple-glass-interactive">
                <span className="text-sm font-bold text-[#b58d20] uppercase tracking-wider block mb-1">Our Vision</span>
                <p className="text-sm text-slate-600 leading-snug">
                  To become the trusted commercial laundry partner for businesses seeking consistent quality and dependability.
                </p>
              </div>
            </div>

            <div className="mb-4 relative z-20">
              <button
                ref={ctaRef}
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-quote-modal"));
                }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-[#f3cf65] bg-gradient-to-r from-[#1E0935] via-[#2E0854] to-[#4B1278] hover:from-[#2E0854] hover:to-[#5E1695] border border-[#D4AF37]/60 shadow-[0_12px_32px_rgba(46,8,84,0.25),inset_0_1px_1.5px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 text-sm cursor-pointer select-none font-body"
              >
                <span>Request a Business Quote</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET CLOTHESLINE: full-width strip below all content, never overlaps text */}
      <div className="lg:hidden relative z-0 mt-6 -mb-8 sm:-mb-10 md:-mb-12 overflow-hidden pointer-events-none select-none">
        <div className="lw-sway" style={{ transformOrigin: origin }}>
          <div className="lw-flutter">
            <img
              src={getAssetPath("/images/dressing.png")}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="block w-full h-auto max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}