"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles, Phone } from "lucide-react";
import { getAssetPath } from "@/lib/basePath";

// Exact Quadratic Bezier matching full-width SVG path: M 0 470 Q 720 30 1440 470 inside 1440x500 viewBox
// At t = 0: (0%, 94%) -> Bottom Left
// At t = 0.5: (50%, 50%) -> Center Center (Right behind the LuxeWash Logo)
// At t = 1: (100%, 94%) -> Bottom Right
function sampleArchCurve(t: number) {
  const u = 1 - t;
  const xPct = (u * u * 0 + 2 * u * t * 720 + t * t * 1440) / 14.4;
  const yPct = (u * u * 470 + 2 * u * t * 30 + t * t * 470) / 5.0;

  const dx = 1440;
  const dy = 2 * (1 - 2 * t) * (30 - 470);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI) * 0.22;

  return { xPct, yPct, angle };
}

export default function CurvedClothSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemGlideRef = useRef<HTMLDivElement>(null);
  const dirtyImgRef = useRef<HTMLImageElement>(null);
  const freshImgRef = useRef<HTMLImageElement>(null);
  const logoBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sectionEl = sectionRef.current;
    const glideEl = itemGlideRef.current;
    const dirtyEl = dirtyImgRef.current;
    const freshEl = freshImgRef.current;
    const logoEl = logoBadgeRef.current;
    if (!sectionEl || !glideEl || !dirtyEl || !freshEl) return;

    const ctx = gsap.context(() => {
      if (logoEl) {
        gsap.to(logoEl, {
          scale: 1.05,
          duration: 2.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      const playhead = { t: 0.05 };

      const updatePosition = () => {
        const t = playhead.t;
        const { xPct, yPct, angle } = sampleArchCurve(t);

        glideEl.style.left = `${xPct}%`;
        glideEl.style.top = `${yPct}%`;
        glideEl.style.transform = `translate3d(-50%, -50%, 0) rotate(${angle}deg)`;

        let edgeAlpha = 1;
        if (t < 0.11) {
          edgeAlpha = Math.max(0, (t - 0.05) / 0.06);
        } else if (t > 0.89) {
          edgeAlpha = Math.max(0, (0.95 - t) / 0.06);
        }
        glideEl.style.opacity = String(edgeAlpha);

        // Switch from Dirty to Fresh right behind the Center Logo (t = 0.50)
        if (t < 0.5) {
          dirtyEl.style.opacity = "1";
          freshEl.style.opacity = "0";
        } else {
          dirtyEl.style.opacity = "0";
          freshEl.style.opacity = "1";
        }
      };

      updatePosition();

      gsap.to(playhead, {
        t: 0.95,
        duration: 6.8,
        ease: "none",
        repeat: -1,
        onUpdate: updatePosition,
      });
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="careline"
      ref={sectionRef}
      className="relative w-full bg-[#0f051a] text-white overflow-hidden flex flex-col items-center justify-center py-10 sm:py-14 px-0 not-italic select-none"
    >
      {/* Horizontally Centered Title, Description & Button (Tight spacing, no unwanted vertical gaps) */}
      <div className="relative z-30 max-w-2xl mx-auto text-center flex flex-col items-center space-y-3 sm:space-y-4 px-4 sm:px-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/90 border border-amber-400/40 text-amber-300 font-bold text-base shadow-md">
          <Sparkles className="size-4 text-amber-400 shrink-0" />
          <span>Pure Linen Transformation</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          Crisp steam press for{" "}
          <span className="text-amber-400">every towel & bedsheet</span>
        </h2>

        <p className="text-purple-100 text-base sm:text-lg font-medium leading-relaxed max-w-xl">
          Soiled towels and bedsheets glide through our organic wash and emerge fresh, neat, and spotless.
        </p>

        <div className="pt-1">
          <a
            href="tel:+18005893927"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-base shadow-xl transition-transform hover:scale-105 active:scale-95"
          >
            <Phone className="size-5 text-purple-950 shrink-0" />
            <span>Call for Free Pickup</span>
          </a>
        </div>
      </div>

      {/* FULL SCREEN WIDTH Curved Line Stage (Zero unwanted vertical space) */}
      <div className="relative w-screen max-w-[100vw] h-[230px] sm:h-[290px] md:h-[340px] lg:h-[380px] -mt-2 sm:-mt-4 overflow-hidden">
        {/* Plain White Huge Curved Line Path Spanning Full Width of Screen */}
        <svg
          viewBox="0 0 1440 500"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          {/* Soft Outer White Halo */}
          <path
            d="M -20 470 Q 720 30 1460 470"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="34"
            strokeLinecap="round"
          />

          {/* Main Huge Plain White Curved Stroke */}
          <path
            d="M -20 470 Q 720 30 1460 470"
            stroke="#ffffff"
            strokeWidth="18"
            strokeLinecap="round"
          />
        </svg>

        {/* CENTER OF THE CURVE (t = 0.5, 50% / 50%): LuxeWash Logo with Crisp White Background (z-30) */}
        <div
          ref={logoBadgeRef}
          style={{
            left: "50%",
            top: "50%",
            transform: "translate3d(-50%, -50%, 0)",
          }}
          className="absolute z-30 bg-white px-4 py-2.5 sm:px-6 sm:py-3.5 md:px-8 md:py-4 rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] border-4 border-white flex items-center justify-center pointer-events-none"
        >
          <img
            src={getAssetPath("/luxewash-logo.png")}
            alt="LuxeWash"
            width={200}
            height={60}
            className="w-[105px] sm:w-[145px] md:w-[180px] h-auto object-contain select-none"
          />
        </div>

        {/* MOVING TOWEL & BEDSHEET BUNDLE (z-20, passes BEHIND the z-30 center logo) */}
        <div
          ref={itemGlideRef}
          style={{
            left: "5%",
            top: "86%",
            transform: "translate3d(-50%, -50%, 0)",
          }}
          className="absolute z-20 pointer-events-none will-change-transform w-[115px] sm:w-[160px] md:w-[195px] lg:w-[230px] aspect-[4/3] flex items-center justify-center"
        >
          {/* Left Side (t < 0.5): Dirty Towel & Bedsheet */}
          <img
            ref={dirtyImgRef}
            src={getAssetPath("/images/dirty-clothes.png")}
            alt="Dirty towel and bedsheet before wash"
            className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.85)] select-none"
          />

          {/* Right Side (t >= 0.5, after passing behind logo): Fresh & Clean Towel & Bedsheet */}
          <img
            ref={freshImgRef}
            src={getAssetPath("/images/fresh-clothes.png")}
            alt="Fresh neat and clean towel and bedsheet after wash"
            style={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.85)] select-none"
          />
        </div>
      </div>
    </section>
  );
}
