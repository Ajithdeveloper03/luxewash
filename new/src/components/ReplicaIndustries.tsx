"use client";

import React, { useEffect, useRef } from "react";
import { Building2, ShieldCheck, Plane, Wine, Crown } from "lucide-react";

export default function ReplicaIndustries() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardsRef = useRef<HTMLDivElement>(null);
  const rightCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx: any;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.fromTo(
            leftCardsRef.current,
            { opacity: 0, x: -35 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                end: "center center",
                scrub: 1.0,
              },
            }
          );

          gsap.fromTo(
            rightCardsRef.current,
            { opacity: 0, x: 35 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                end: "center center",
                scrub: 1.0,
              },
            }
          );
        }, sectionRef);
      }
    );

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const brands = [
    { name: "TAJ PALACE & RESORTS", icon: Building2 },
    { name: "THE OBEROI GROUP", icon: ShieldCheck },
    { name: "ITC LUXURY HOTELS", icon: Building2 },
    { name: "THE LEELA PALACES", icon: Crown },
    { name: "AERO CHARTERS INDIA", icon: Plane },
    { name: "MICHELIN DINING", icon: Wine },
    { name: "CONDON RESORTS", icon: ShieldCheck },
    { name: "MORRISON SUITES", icon: Building2 },
  ];

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="relative min-h-[100vh] h-auto lg:h-screen lg:max-h-screen w-full flex flex-col justify-between items-center py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-16 z-10 box-border overflow-y-auto lg:overflow-hidden"
    >
      {/* Dynamic Content Wrapper: Visible as usual with reduced spacing */}
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center items-center gap-3 sm:gap-4 lg:gap-5 z-10">
        {/* Top Header */}
        <div className="max-w-4xl mx-auto text-center space-y-1.5 sm:space-y-2 pt-0 z-10">
          <h2 className="font-serif italic font-normal text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-950 tracking-tight leading-[1.08] [text-shadow:0_2px_20px_rgb(255_255_255/0.95)]">
            Proudly Trusted for Laundry <br className="hidden sm:inline" />
            <span className="not-italic font-sans font-black text-slate-950">by Leading Brands</span> <br className="hidden sm:inline" />
            Across Industries<span className="text-purple-700 font-sans not-italic text-2xl sm:text-3xl align-super ml-1">✦</span>
          </h2>

          <p className="text-slate-950 font-bold text-base sm:text-lg max-w-xl mx-auto leading-relaxed [text-shadow:0_1px_10px_rgb(255_255_255/0.95)]">
            Bespoke commercial wash solutions tailored for 5-star hotel suites, Michelin dining, and private aviation.
          </p>
        </div>

        {/* Cards strictly displayed in 2 sides: Left 2 Cards + Open Center View + Right 2 Cards */}
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8 z-10 py-1 sm:py-2">
          {/* Left Side: 2 Cards with light opacity & blurriness */}
          <div
            ref={leftCardsRef}
            className="w-full lg:w-[380px] xl:w-[420px] flex flex-col gap-3.5 sm:gap-4.5"
          >
            {/* Card 1: Top Left */}
            <div className="p-5 sm:p-6 rounded-[26px] sm:rounded-[30px] bg-white/50 hover:bg-white/65 border border-white/60 backdrop-blur-md shadow-xl space-y-2.5 transition-all text-left">
              <div className="size-11 rounded-2xl bg-white/90 flex items-center justify-center text-purple-950 shadow-sm border border-purple-200">
                <Building2 className="size-6 text-purple-950" />
              </div>
              <h4 className="text-slate-950 font-black text-xl lg:text-2xl [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
                5-Star Hotel Linens
              </h4>
              <p className="text-slate-950 font-bold text-base leading-relaxed [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
                400+ thread count Egyptian cotton bedsheet & duvet laundry wash with crisp French roller pressing.
              </p>
            </div>

            {/* Card 2: Bottom Left */}
            <div className="p-5 sm:p-6 rounded-[26px] sm:rounded-[30px] bg-white/50 hover:bg-white/65 border border-white/60 backdrop-blur-md shadow-xl space-y-2.5 transition-all text-left">
              <div className="size-11 rounded-2xl bg-white/90 flex items-center justify-center text-amber-950 shadow-sm border border-amber-200">
                <Wine className="size-6 text-amber-700" />
              </div>
              <h4 className="text-slate-950 font-black text-xl lg:text-2xl [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
                Fine Dining Linens
              </h4>
              <p className="text-slate-950 font-bold text-base leading-relaxed [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
                Culinary oil, tannin, and red wine stain extraction for fine tablecloths with zero fabric thinning.
              </p>
            </div>
          </div>

          {/* Open Center Gap: Unobstructed view of the background */}
          <div className="hidden lg:block w-32 xl:w-48 pointer-events-none" />

          {/* Right Side: 2 Cards with increased opacity & blurriness */}
          <div
            ref={rightCardsRef}
            className="w-full lg:w-[380px] xl:w-[420px] flex flex-col gap-3.5 sm:gap-4.5"
          >
            {/* Card 3: Top Right */}
            <div className="p-5 sm:p-6 rounded-[26px] sm:rounded-[30px] bg-white/50 hover:bg-white/65 border border-white/60 backdrop-blur-md shadow-xl space-y-2.5 transition-all text-left">
              <div className="size-11 rounded-2xl bg-white/90 flex items-center justify-center text-purple-950 shadow-sm border border-purple-200">
                <Plane className="size-6 text-purple-950" />
              </div>
              <h4 className="text-slate-950 font-black text-xl lg:text-2xl [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
                Aviation Cabin Linens
              </h4>
              <p className="text-slate-950 font-bold text-base leading-relaxed [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
                Hypoallergenic cabin blankets, headrest covers, and crew uniform laundry turnaround.
              </p>
            </div>

            {/* Card 4: Bottom Right */}
            <div className="p-5 sm:p-6 rounded-[26px] sm:rounded-[30px] bg-white/50 hover:bg-white/65 border border-white/60 backdrop-blur-md shadow-xl space-y-2.5 transition-all text-left">
              <div className="size-11 rounded-2xl bg-white/90 flex items-center justify-center text-amber-950 shadow-sm border border-amber-200">
                <ShieldCheck className="size-6 text-amber-700" />
              </div>
              <h4 className="text-slate-950 font-black text-xl lg:text-2xl [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
                Royal Heritage Suites
              </h4>
              <p className="text-slate-950 font-bold text-base leading-relaxed [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
                Preservation of heritage silks, heavy brocades, and ceremonial banquet draperies.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Logo Slider: Fullest Screen Width (100vw), No Background, Gaps Between Logos */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden py-3 sm:py-4 border-y border-white/20 z-10 select-none">
          <div className="animate-marquee flex items-center gap-12 sm:gap-16 lg:gap-20 whitespace-nowrap">
            {/* First set of logos */}
            {brands.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={`brand-1-${i}`} className="inline-flex items-center gap-3 text-slate-950 shrink-0">
                  <Icon className="size-5 sm:size-6 text-amber-500 shrink-0 drop-shadow-sm" />
                  <span className="font-sans text-base sm:text-lg lg:text-xl font-black tracking-widest uppercase [text-shadow:0_1px_10px_rgb(255_255_255/0.95)]">
                    {b.name}
                  </span>
                </div>
              );
            })}
            {/* Duplicate set for infinite seamless loop */}
            {brands.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={`brand-2-${i}`} className="inline-flex items-center gap-3 text-slate-950 shrink-0">
                  <Icon className="size-5 sm:size-6 text-amber-500 shrink-0 drop-shadow-sm" />
                  <span className="font-sans text-base sm:text-lg lg:text-xl font-black tracking-widest uppercase [text-shadow:0_1px_10px_rgb(255_255_255/0.95)]">
                    {b.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
