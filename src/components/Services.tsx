"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Shirt, Sparkles, Flame, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Services() {
  const pinRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const pinEl = pinRef.current;
    const card2 = card2Ref.current;
    const card3 = card3Ref.current;
    const card4 = card4Ref.current;

    if (!pinEl || !card2 || !card3 || !card4) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
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

      // Card 2 slides up to stack with Card 1 (tab header visible)
      tl.fromTo(
        card2,
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1,
        }
      );

      // Card 3 slides up to stack with Card 2
      tl.fromTo(
        card3,
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1,
        }
      );

      // Card 4 slides up to stack with Card 3
      tl.fromTo(
        card4,
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1,
        }
      );
    }, pinEl);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section id="services" className="relative w-full bg-[#FAF8FD] overflow-hidden z-20">
      {/* Pinned inner container so React's <section> element is never reparented */}
      <div
        ref={pinRef}
        className="relative w-full min-h-screen py-8 sm:py-8 md:py-8 overflow-hidden flex flex-col justify-start items-center"
      >
        {/* Fresh Blue Sky & Fluffy Clouds Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1800&q=85"
            alt="Fresh Clean Blue Sky"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-sky-400/10" />
        </div>

        {/* SECTION HEADER */}
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center mb-4 sm:mb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2E0854] font-body bg-white/75 backdrop-blur-md px-3.5 py-1 rounded-full border border-purple-200/50 shadow-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-[#2E0854] inline-block" />
            <span>OUR SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#18042b] tracking-tight font-display leading-tight">
            Commercial Laundry Solutions
          </h2>
        </div>

        {/* CLOTHESLINE WIRE & CARD STAGE */}
        <div className="relative w-full max-w-[360px] sm:max-w-[560px] md:max-w-[680px] lg:max-w-[780px] xl:max-w-[840px] mx-auto z-20 flex flex-col items-center">
          {/* Full-width screen wire passing through clothespin notches with deep middle curve */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[135px] pointer-events-none z-30 overflow-visible">
            <svg
              viewBox="0 0 1440 135"
              className="w-full h-full"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M -50 12 Q 720 128 1490 12"
                stroke="#18181b"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Two realistic wooden clothespins clamping down on the deeper curved wire */}
          <div className="absolute top-[62px] sm:top-[66px] w-full flex justify-between px-8 sm:px-14 md:px-18 lg:px-22 z-40 pointer-events-none">
            <div className="relative flex flex-col items-center -rotate-[4deg] drop-shadow-md">
              <div className="w-3 sm:w-3.5 h-6 bg-[#cca06a] rounded-t-sm border-t border-amber-100/60 shadow-inner" />
              <div className="w-4 sm:w-4.5 h-2 bg-[#42220d] rounded-sm my-[0.5px] shadow-sm" />
              <div className="w-3 sm:w-3.5 h-8 bg-gradient-to-b from-[#b88c54] via-[#9e7039] to-[#784e1b] rounded-b-sm shadow-md" />
            </div>

            <div className="relative flex flex-col items-center rotate-[4deg] drop-shadow-md">
              <div className="w-3 sm:w-3.5 h-6 bg-[#cca06a] rounded-t-sm border-t border-amber-100/60 shadow-inner" />
              <div className="w-4 sm:w-4.5 h-2 bg-[#42220d] rounded-sm my-[0.5px] shadow-sm" />
              <div className="w-3 sm:w-3.5 h-8 bg-gradient-to-b from-[#b88c54] via-[#9e7039] to-[#784e1b] rounded-b-sm shadow-md" />
            </div>
          </div>

          {/* Stacked Service Cards aligned with the deeper wire drop */}
          <div className="relative w-full h-[360px] sm:h-[330px] md:h-[310px] mt-[86px] sm:mt-[92px]">
            {/* Card 1: Hotel & Hospitality Laundry */}
            <div
              ref={card1Ref}
              className="absolute inset-0 bg-white rounded-3xl p-6 sm:p-8 md:p-9 shadow-2xl border border-slate-100 text-left flex flex-col justify-between z-10"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#2E0854] flex items-center justify-center border border-purple-100 shadow-sm">
                  <Shirt className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#18042b] font-body mb-2">
                    1. Hotel &amp; Hospitality
                  </h3>
                  <p className="text-slate-600 font-body text-xs sm:text-sm leading-relaxed">
                    Professional cleaning and care for bedsheets, pillowcases, towels, duvet covers, bath linen and hospitality textiles with pristine presentation.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-[#2E0854] uppercase tracking-wider font-body">
                  Hospitality Linen
                </span>
                <span className="text-sm font-extrabold text-[#18042b] font-display">
                  Scheduled Turnaround
                </span>
              </div>
            </div>

            {/* Card 2: Hospital & Healthcare Laundry */}
            <div
              ref={card2Ref}
              className="absolute inset-0 bg-white rounded-3xl p-6 sm:p-8 md:p-9 shadow-2xl border border-purple-100 text-left flex flex-col justify-between z-20"
              style={{ top: "20px" }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/60 shadow-sm">
                  <Sparkles className="w-6 h-6 stroke-[2] text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#18042b] font-body mb-2">
                    2. Hospital &amp; Healthcare
                  </h3>
                  <p className="text-slate-600 font-body text-xs sm:text-sm leading-relaxed">
                    Hygienic laundry services for hospital linen, patient garments, and staff scrubs with handling procedures aligned with medical facility standards.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider font-body">
                  Healthcare Protocols
                </span>
                <span className="text-sm font-extrabold text-[#18042b] font-display">
                  Sanitized Drums
                </span>
              </div>
            </div>

            {/* Card 3: Restaurant & Catering Laundry */}
            <div
              ref={card3Ref}
              className="absolute inset-0 bg-white rounded-3xl p-6 sm:p-8 md:p-9 shadow-2xl border border-purple-100 text-left flex flex-col justify-between z-30"
              style={{ top: "40px" }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#2E0854] flex items-center justify-center border border-purple-100 shadow-sm">
                  <Flame className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#18042b] font-body mb-2">
                    3. Restaurant &amp; Catering
                  </h3>
                  <p className="text-slate-600 font-body text-xs sm:text-sm leading-relaxed">
                    Reliable cleaning for tablecloths, cloth napkins, chef uniforms, kitchen garments and catering linen with deep stain removal and crisp pressing.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-[#2E0854] uppercase tracking-wider font-body">
                  Food Service Linen
                </span>
                <span className="text-sm font-extrabold text-[#18042b] font-display">
                  Stain-Free Finish
                </span>
              </div>
            </div>

            {/* Card 4: Uniform & Bulk Linen Processing */}
            <div
              ref={card4Ref}
              className="absolute inset-0 bg-white rounded-3xl p-6 sm:p-8 md:p-9 shadow-2xl border border-purple-200 text-left flex flex-col justify-between z-40"
              style={{ top: "60px" }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/60 shadow-sm">
                  <Award className="w-6 h-6 stroke-[2] text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#18042b] font-body mb-2">
                    4. Uniform &amp; Bulk Linen
                  </h3>
                  <p className="text-slate-600 font-body text-xs sm:text-sm leading-relaxed">
                    High-volume processing for corporate workwear, staff uniforms, and commercial textiles with custom collection frequencies and reliable delivery schedules.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider font-body">
                  Bulk &amp; Custom Contracts
                </span>
                <span className="text-sm font-extrabold text-[#18042b] font-display">
                  Tailored Schedules
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
