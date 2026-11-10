"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles, ShieldCheck, Feather, ArrowUpRight } from "lucide-react";

export default function ReplicaAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current) return;

    let ctx: any;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          if (leftRef.current && sectionRef.current) {
            gsap.fromTo(
              leftRef.current,
              { opacity: 0, x: -30 },
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
          }
          if (rightRef.current && sectionRef.current) {
            gsap.fromTo(
              rightRef.current,
              { opacity: 0, x: 30 },
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
          }
        }, sectionRef.current);
      }
    );

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-[100vh] h-auto lg:h-screen lg:max-h-screen w-full max-w-full flex flex-col justify-center items-center py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-16 z-10 box-border overflow-x-hidden overflow-y-auto lg:overflow-hidden"
    >
      {/* Main 2-Column Asymmetrical Split Content - Never in the Middle */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center z-10 my-auto">
        {/* Left Column: Bold Headline & Editorial Statement (Max 6xl) */}
        <div ref={leftRef} className="lg:col-span-7 w-full max-w-xl mx-auto lg:max-w-none text-left space-y-4 sm:space-y-5">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-slate-950 tracking-tight leading-[1.06] [text-shadow:0_2px_20px_rgb(255_255_255/0.95)]">
            Industrial wash power. <br />
            <span className="text-purple-950">Couture garment precision.</span>
          </h2>

          <p className="text-slate-950 font-bold text-base sm:text-lg md:text-xl leading-relaxed max-w-xl [text-shadow:0_1px_10px_rgb(255_255_255/0.95)]">
            Zero harsh chemicals. Cold aqueous O₃ dissolves deep-seated soils at 32°C, revitalizing thread count softness and sanitizing 99.98% of pathogens.
          </p>

          <div className="pt-1">
            <a
              href="#services"
              className="inline-flex items-center gap-2 text-base font-extrabold text-purple-950 hover:text-purple-800 uppercase tracking-wider group"
            >
              <span>Explore Laundry Protocols</span>
              <ArrowUpRight className="size-5 text-amber-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column: 3 Stacked Large Cards with increased opacity & frosted blur */}
        <div ref={rightRef} className="lg:col-span-5 w-full max-w-xl mx-auto lg:max-w-none flex flex-col gap-3 sm:gap-3.5">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/50 hover:bg-white/65 border border-white/60 backdrop-blur-md shadow-xl space-y-1.5 transition-all hover:translate-x-1 duration-200">
            <div className="flex items-center gap-2.5 text-purple-950 font-black text-lg">
              <Sparkles className="size-5 text-amber-500" />
              <span>Eco-Chill Aqueous Wash</span>
            </div>
            <p className="text-slate-950 font-bold text-base leading-relaxed [text-shadow:0_1px_8px_rgb(255_255_255/0.85)]">
              Lifts soils at 32°C without thermal fiber stress, detergent residues, or harsh chemical odor.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/50 hover:bg-white/65 border border-white/60 backdrop-blur-md shadow-xl space-y-1.5 transition-all hover:translate-x-1 duration-200">
            <div className="flex items-center gap-2.5 text-purple-950 font-black text-lg">
              <Feather className="size-5 text-purple-700" />
              <span>100% Perc-Free Dry Clean</span>
            </div>
            <p className="text-slate-950 font-bold text-base leading-relaxed [text-shadow:0_1px_8px_rgb(255_255_255/0.85)]">
              Botanical silicone solvents engineered for delicate cashmere, silk, and bespoke tailored suits.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/50 hover:bg-white/65 border border-white/60 backdrop-blur-md shadow-xl space-y-1.5 transition-all hover:translate-x-1 duration-200">
            <div className="flex items-center gap-2.5 text-purple-950 font-black text-lg">
              <ShieldCheck className="size-5 text-amber-500" />
              <span>+40% Fabric Longevity</span>
            </div>
            <p className="text-slate-950 font-bold text-base leading-relaxed [text-shadow:0_1px_8px_rgb(255_255_255/0.85)]">
              pH-balanced restorative washing that prevents fiber thinning across bed linens and garments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
