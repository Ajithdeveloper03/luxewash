"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ClipboardCheck, CalendarClock, Sparkles, PackageCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAssetPath } from "@/lib/constants";

export default function HowItWorks() {
  const pinRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const pinEl = pinRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    const card3 = card3Ref.current;
    const card4 = card4Ref.current;

    if (!pinEl || !card1 || !card2 || !card3 || !card4) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const mm = gsap.matchMedia();

    // ScrollTrigger Animation on desktop devices (min-width: 1024px)
    mm.add("(min-width: 1024px)", () => {
      // Initial folded/stacked positions
      gsap.set(card1, { xPercent: 0, yPercent: 0, rotation: -10, x: -12, y: 10, scale: 0.95 });
      gsap.set(card2, { xPercent: 0, yPercent: 0, rotation: -4, x: -5, y: 5, scale: 0.97 });
      gsap.set(card3, { xPercent: 0, yPercent: 0, rotation: 3, x: 8, y: 0, scale: 0.99 });
      gsap.set(card4, { xPercent: 0, yPercent: 0, rotation: 8, x: 18, y: -6, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: "+=1600",
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Spread and rotate cards to aligned 4-card row
      tl.to(
        card1,
        {
          xPercent: -156,
          yPercent: 0,
          rotation: 0,
          x: 0,
          y: 0,
          scale: 1,
          ease: "power2.out",
          duration: 1,
        },
        0
      )
        .to(
          card2,
          {
            xPercent: -52,
            yPercent: 0,
            rotation: 0,
            x: 0,
            y: 0,
            scale: 1,
            ease: "power2.out",
            duration: 1,
          },
          0
        )
        .to(
          card3,
          {
            xPercent: 52,
            yPercent: 0,
            rotation: 0,
            x: 0,
            y: 0,
            scale: 1,
            ease: "power2.out",
            duration: 1,
          },
          0
        )
        .to(
          card4,
          {
            xPercent: 156,
            yPercent: 0,
            rotation: 0,
            x: 0,
            y: 0,
            scale: 1,
            ease: "power2.out",
            duration: 1,
          },
          0
        );
    });

    return () => {
      clearTimeout(timer);
      mm.revert();
    };
  }, []);

  return (
    <section id="process" className="relative w-full bg-[#FAF8FD] overflow-hidden z-20">
      <div
        ref={pinRef}
        className="relative w-full min-h-screen py-10 sm:py-12 md:py-16 overflow-hidden flex flex-col justify-start items-center"
      >
        {/* Soft Background Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1920&q=85"
            alt="Ethereal Purple & Golden Clouds"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2E0854]/10 via-transparent to-[#FAF8FD]" />
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          {/* Section Header */}
          <div className="space-y-3 mb-10 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2E0854] font-body bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-purple-200/60 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] inline-block" />
              <span>OUR PROCESS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-5xl font-extrabold text-[#1E0935] tracking-tight font-display leading-tight">
              A Structured Approach to Commercial Laundry
            </h2>
            <p className="text-white font-body text-md sm:text-md max-w-2xl mx-auto leading-relaxed">
              We make commercial laundry management straightforward through a clear, coordinated service process.
            </p>
          </div>

          {/* DESKTOP STAGE (min-width: 1024px): Folded & Stacked -> Unfolds and Spreads on Scroll */}
          <div
            ref={containerRef}
            className="hidden lg:flex relative w-full h-[440px] items-center justify-center"
          >
            {/* Card 1: Assessment */}
            <div
              ref={card1Ref}
              className="absolute w-[290px] lg:w-[315px] xl:w-[340px] 2xl:w-[355px] h-[375px] xl:h-[390px] bg-white rounded-3xl p-7 sm:p-8 xl:p-9 shadow-2xl border border-purple-100 flex flex-col justify-between text-left select-none origin-bottom-center z-10 transition-shadow hover:shadow-purple-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center border border-[#D4AF37]/30 shadow-sm">
                    <ClipboardCheck className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#2E0854] bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60 uppercase tracking-wider font-body">
                    Step 01
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1E0935] font-display mb-2">
                  Requirement Assessment
                </h3>
                <p className="text-slate-600 font-body text-xs sm:text-sm leading-relaxed">
                  We understand your business operations, estimated daily laundry volume, textile categories, and pickup expectations.
                </p>
              </div>
              <div className="pt-4 border-t border-purple-100/60 flex items-center justify-between text-xs font-body">
                <span className="font-bold text-[#2E0854]">Volume Evaluation</span>
                <span className="text-slate-500">Service Scope</span>
              </div>
            </div>

            {/* Card 2: Planning & Collection */}
            <div
              ref={card2Ref}
              className="absolute w-[290px] lg:w-[315px] xl:w-[340px] 2xl:w-[355px] h-[375px] xl:h-[390px] bg-white rounded-3xl p-7 sm:p-8 xl:p-9 shadow-2xl border border-purple-100 flex flex-col justify-between text-left select-none origin-bottom-center z-20 transition-shadow hover:shadow-purple-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center border border-[#D4AF37]/30 shadow-sm">
                    <CalendarClock className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#2E0854] bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60 uppercase tracking-wider font-body">
                    Step 02
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1E0935] font-display mb-2">
                  Planning &amp; Collection
                </h3>
                <p className="text-slate-600 font-body text-xs sm:text-sm leading-relaxed">
                  Scheduled collection from your facility with rigorous pre-sorting by fabric grade, color, and sanitization requirement.
                </p>
              </div>
              <div className="pt-4 border-t border-purple-100/60 flex items-center justify-between text-xs font-body">
                <span className="font-bold text-[#2E0854]">Timely Logistics</span>
                <span className="text-slate-500">Careful Sorting</span>
              </div>
            </div>

            {/* Card 3: Washing & Finishing */}
            <div
              ref={card3Ref}
              className="absolute w-[290px] lg:w-[315px] xl:w-[340px] 2xl:w-[355px] h-[375px] xl:h-[390px] bg-white rounded-3xl p-7 sm:p-8 xl:p-9 shadow-2xl border border-purple-100 flex flex-col justify-between text-left select-none origin-bottom-center z-30 transition-shadow hover:shadow-purple-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center border border-[#D4AF37]/30 shadow-sm">
                    <Sparkles className="w-6 h-6 stroke-[1.8] text-[#D4AF37]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#2E0854] bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60 uppercase tracking-wider font-body">
                    Step 03
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1E0935] font-display mb-2">
                  Washing &amp; Finishing
                </h3>
                <p className="text-slate-600 font-body text-xs sm:text-sm leading-relaxed">
                  Textiles undergo isolated industrial drum washing, thermal disinfection, conditioning, and automatic calender ironing.
                </p>
              </div>
              <div className="pt-4 border-t border-purple-100/60 flex items-center justify-between text-xs font-body">
                <span className="font-bold text-[#2E0854]">Isolated Drums</span>
                <span className="text-slate-500">Steam Pressing</span>
              </div>
            </div>

            {/* Card 4: Quality & Delivery */}
            <div
              ref={card4Ref}
              className="absolute w-[290px] lg:w-[315px] xl:w-[340px] 2xl:w-[355px] h-[375px] xl:h-[390px] bg-white rounded-3xl p-7 sm:p-8 xl:p-9 shadow-2xl border border-purple-100 flex flex-col justify-between text-left select-none origin-bottom-center z-40 transition-shadow hover:shadow-purple-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center border border-[#D4AF37]/30 shadow-sm">
                    <PackageCheck className="w-6 h-6 stroke-[1.8] text-[#D4AF37]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#b58d20] bg-amber-50 px-3 py-1 rounded-full border border-amber-200/70 uppercase tracking-wider font-body">
                    Step 04
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1E0935] font-display mb-2">
                  Quality &amp; Delivery
                </h3>
                <p className="text-slate-600 font-body text-xs sm:text-sm leading-relaxed">
                  Processed items are inspected, sealed in protective wrap, and returned on schedule with ongoing account support.
                </p>
              </div>
              <div className="pt-4 border-t border-purple-100/60 flex items-center justify-between text-xs font-body">
                <span className="font-bold text-[#b58d20]">100% Quality Checked</span>
                <span className="text-slate-500">Scheduled Return</span>
              </div>
            </div>
          </div>

          {/* MOBILE & TABLET CARDS (< 1024px) */}
          <div className="flex lg:hidden flex-col md:grid md:grid-cols-2 gap-5 w-full max-w-lg md:max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="w-full bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-purple-100 text-left flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center border border-[#D4AF37]/30 shadow-sm">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-[#2E0854] bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60 uppercase tracking-wider font-body">
                    Step 01
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1E0935] font-display mb-2">
                  Requirement Assessment
                </h3>
                <p className="text-slate-600 font-body text-xs sm:text-sm leading-relaxed mb-4">
                  We analyze your daily volume, textile categories, collection location, and turnaround expectations.
                </p>
              </div>
              <div className="pt-3 border-t border-purple-100/60 flex items-center justify-between text-xs font-body">
                <span className="font-bold text-[#2E0854]">Volume Evaluation</span>
                <span className="text-slate-500">Service Scope</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="w-full bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-purple-100 text-left flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center border border-[#D4AF37]/30 shadow-sm">
                    <CalendarClock className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-[#2E0854] bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60 uppercase tracking-wider font-body">
                    Step 02
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1E0935] font-display mb-2">
                  Planning &amp; Collection
                </h3>
                <p className="text-slate-600 font-body text-xs sm:text-sm leading-relaxed mb-4">
                  Scheduled collection from your facility with rigorous pre-sorting by fabric grade and care standards.
                </p>
              </div>
              <div className="pt-3 border-t border-purple-100/60 flex items-center justify-between text-xs font-body">
                <span className="font-bold text-[#2E0854]">Timely Logistics</span>
                <span className="text-slate-500">Careful Sorting</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="w-full bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-purple-100 text-left flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center border border-[#D4AF37]/30 shadow-sm">
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#2E0854] bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60 uppercase tracking-wider font-body">
                    Step 03
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1E0935] font-display mb-2">
                  Washing &amp; Finishing
                </h3>
                <p className="text-slate-600 font-body text-xs sm:text-sm leading-relaxed mb-4">
                  Textiles undergo isolated industrial drum washing, thermal disinfection, and automatic calender ironing.
                </p>
              </div>
              <div className="pt-3 border-t border-purple-100/60 flex items-center justify-between text-xs font-body">
                <span className="font-bold text-[#2E0854]">Isolated Drums</span>
                <span className="text-slate-500">Steam Pressing</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="w-full bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-purple-100 text-left flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center border border-[#D4AF37]/30 shadow-sm">
                    <PackageCheck className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#b58d20] bg-amber-50 px-3 py-1 rounded-full border border-amber-200/70 uppercase tracking-wider font-body">
                    Step 04
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1E0935] font-display mb-2">
                  Quality &amp; Delivery
                </h3>
                <p className="text-slate-600 font-body text-xs sm:text-sm leading-relaxed mb-4">
                  Processed items are inspected, sealed in protective wrap, and returned on schedule with ongoing support.
                </p>
              </div>
              <div className="pt-3 border-t border-purple-100/60 flex items-center justify-between text-xs font-body">
                <span className="font-bold text-[#b58d20]">100% Quality Checked</span>
                <span className="text-slate-500">Scheduled Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
