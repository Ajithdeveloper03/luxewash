"use client";

import React, { useEffect, useRef } from "react";
import { Building2, ShieldCheck, Plane, Wine, Crown } from "lucide-react";

export default function ReplicaIndustries() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current) return;

    let ctx: any;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          cardRefs.current.forEach((el, idx) => {
            if (!el || !sectionRef.current) return;
            gsap.fromTo(
              el,
              { opacity: 0, y: 30 * (idx % 2 === 0 ? 1 : -1) },
              {
                opacity: 1,
                y: 0,
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
          });
        }, sectionRef.current);
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
      className="relative min-h-screen h-auto w-full max-w-full flex flex-col justify-between items-center py-10 sm:py-14 lg:py-16 px-4 sm:px-8 lg:px-16 z-10 box-border overflow-x-hidden"
    >
      {/* Dynamic Content Wrapper */}
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-between items-center gap-6 sm:gap-8 lg:gap-10 z-10">
        {/* Top Header: Generous Spacing and Fully Visible on All Screen Sizes */}
        <div className="max-w-4xl mx-auto text-center space-y-3 pt-2 sm:pt-4 z-10">
          <h2 className="font-serif italic font-normal text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-slate-950 tracking-tight leading-snug [text-shadow:0_2px_20px_rgb(255_255_255/0.95)]">
            Proudly Trusted for Luxury Laundry <br className="hidden md:inline" />
            <span className="not-italic font-sans font-black text-slate-950">by Leading Brands Across Industries</span>
            <span className="text-purple-700 font-sans not-italic text-2xl sm:text-3xl align-super ml-1.5">✦</span>
          </h2>

          <p className="text-slate-950 font-bold text-base sm:text-lg max-w-2xl mx-auto leading-relaxed [text-shadow:0_1px_10px_rgb(255_255_255/0.95)]">
            Bespoke commercial wash solutions tailored for 5-star hotel suites, Michelin dining, and private aviation.
          </p>
        </div>

        {/* Shuffled Card Matrix: Centered Staggered 2-Column Bento (Not Contained Sideways) */}
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 my-auto z-10 py-4">
          {/* Card 1: 5-Star Hotel Linens */}
          <div
            ref={(el) => {
              cardRefs.current[0] = el;
            }}
            className="p-5 sm:p-6 lg:p-7 rounded-[26px] sm:rounded-[30px] bg-white/55 hover:bg-white/70 border border-white/65 backdrop-blur-md shadow-xl space-y-3 transition-all text-left group lg:translate-y-0 hover:-translate-y-1"
          >
            <div className="size-11 sm:size-12 rounded-2xl bg-white/95 flex items-center justify-center text-purple-950 shadow-sm border border-purple-200 group-hover:scale-105 transition-transform">
              <Building2 className="size-6 text-purple-950" />
            </div>
            <h4 className="text-slate-950 font-black text-xl lg:text-2xl [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
              5-Star Hotel Linens
            </h4>
            <p className="text-slate-950 font-bold text-base leading-relaxed [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
              400+ thread count Egyptian cotton bedsheet & duvet laundry wash with crisp French roller pressing.
            </p>
          </div>

          {/* Card 2: Fine Dining Linens (Staggered Vertical Offset) */}
          <div
            ref={(el) => {
              cardRefs.current[1] = el;
            }}
            className="p-5 sm:p-6 lg:p-7 rounded-[26px] sm:rounded-[30px] bg-white/55 hover:bg-white/70 border border-white/65 backdrop-blur-md shadow-xl space-y-3 transition-all text-left group lg:translate-y-6 hover:translate-y-5"
          >
            <div className="size-11 sm:size-12 rounded-2xl bg-white/95 flex items-center justify-center text-amber-950 shadow-sm border border-amber-200 group-hover:scale-105 transition-transform">
              <Wine className="size-6 text-amber-700" />
            </div>
            <h4 className="text-slate-950 font-black text-xl lg:text-2xl [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
              Fine Dining Linens
            </h4>
            <p className="text-slate-950 font-bold text-base leading-relaxed [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
              Culinary oil, tannin, and red wine stain extraction for fine tablecloths with zero fabric thinning.
            </p>
          </div>

          {/* Card 3: Aviation Cabin Linens (Staggered Vertical Offset) */}
          <div
            ref={(el) => {
              cardRefs.current[2] = el;
            }}
            className="p-5 sm:p-6 lg:p-7 rounded-[26px] sm:rounded-[30px] bg-white/55 hover:bg-white/70 border border-white/65 backdrop-blur-md shadow-xl space-y-3 transition-all text-left group lg:-translate-y-3 hover:-translate-y-4"
          >
            <div className="size-11 sm:size-12 rounded-2xl bg-white/95 flex items-center justify-center text-purple-950 shadow-sm border border-purple-200 group-hover:scale-105 transition-transform">
              <Plane className="size-6 text-purple-950" />
            </div>
            <h4 className="text-slate-950 font-black text-xl lg:text-2xl [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
              Aviation Cabin Linens
            </h4>
            <p className="text-slate-950 font-bold text-base leading-relaxed [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
              Hypoallergenic cabin blankets, headrest covers, and crew uniform laundry turnaround.
            </p>
          </div>

          {/* Card 4: Royal Heritage Suites (Staggered Vertical Offset) */}
          <div
            ref={(el) => {
              cardRefs.current[3] = el;
            }}
            className="p-5 sm:p-6 lg:p-7 rounded-[26px] sm:rounded-[30px] bg-white/55 hover:bg-white/70 border border-white/65 backdrop-blur-md shadow-xl space-y-3 transition-all text-left group lg:translate-y-3 hover:translate-y-2"
          >
            <div className="size-11 sm:size-12 rounded-2xl bg-white/95 flex items-center justify-center text-amber-950 shadow-sm border border-amber-200 group-hover:scale-105 transition-transform">
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

        {/* Bottom Logo Slider: Full Edge-to-Edge Without Any Horizontal Overflow */}
        <div className="-mx-4 sm:-mx-8 lg:-mx-16 w-[calc(100%+2rem)] sm:w-[calc(100%+4rem)] lg:w-[calc(100%+8rem)] max-w-none overflow-hidden py-3 sm:py-4 border-y border-white/20 z-10 select-none">
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
