"use client";

import React, { useEffect, useRef } from "react";
import { Users, Zap } from "lucide-react";

export default function ReplicaExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardsRef = useRef<HTMLDivElement>(null);
  const rightCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current) return;

    let isMounted = true;
    let ctx: any;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!isMounted || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          if (leftCardsRef.current && sectionRef.current) {
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
          }
          if (rightCardsRef.current && sectionRef.current) {
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
          }
        }, sectionRef.current);
      }
    );

    return () => {
      isMounted = false;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-[100vh] h-auto lg:h-screen lg:max-h-screen w-full max-w-full flex flex-col justify-center items-center py-8 sm:py-10 lg:py-12 px-4 sm:px-8 lg:px-16 z-10 box-border overflow-x-hidden overflow-y-auto lg:overflow-hidden"
    >
      {/* Main Layout: Shuffled Inward Framing Cards with Rich Gradient Style (Image 2 Replica) */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 lg:gap-8 z-10 my-auto">
        {/* Left Flanking Column: 2 Cards (Curved Stagger) */}
        <div
          ref={leftCardsRef}
          className="w-full max-w-xl mx-auto lg:max-w-none lg:w-[380px] xl:w-[420px] flex flex-col gap-4 sm:gap-5"
        >
          {/* Card 1: Top Left - Pure Laundry */}
          <div className="p-5 sm:p-6 lg:p-7 rounded-[26px] sm:rounded-[30px] bg-gradient-to-br from-[#1d315c]/75 via-[#14203d]/80 to-[#0b1226]/85 hover:from-[#233a6b]/85 hover:via-[#19274a]/90 hover:to-[#0e1630]/95 border border-white/25 backdrop-blur-md shadow-2xl shadow-blue-950/30 space-y-3 transition-all text-left group lg:translate-x-0 hover:-translate-y-1">
            <div className="size-11 sm:size-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-md border border-white/80 group-hover:scale-105 transition-transform">
              <Zap className="size-6 text-blue-600 fill-blue-600" />
            </div>
            <h3 className="text-white font-sans font-black text-xl sm:text-2xl tracking-tight">
              Tailored Fabric Wash
            </h3>
            <p className="text-blue-100 font-bold text-base leading-relaxed">
              Custom wash cycles calibrated to every fiber — from delicate Mulberry silks to heavy Egyptian cottons.
            </p>
          </div>

          {/* Card 2: Bottom Left - Pure Laundry (Inward Offset) */}
          <div className="p-5 sm:p-6 lg:p-7 rounded-[26px] sm:rounded-[30px] bg-gradient-to-br from-[#1d315c]/75 via-[#14203d]/80 to-[#0b1226]/85 hover:from-[#233a6b]/85 hover:via-[#19274a]/90 hover:to-[#0e1630]/95 border border-white/25 backdrop-blur-md shadow-2xl shadow-blue-950/30 space-y-3 transition-all text-left group lg:translate-x-4 hover:-translate-y-1">
            <div className="size-11 sm:size-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-md border border-white/80 group-hover:scale-105 transition-transform">
              <Users className="size-6 text-blue-600 fill-blue-600" />
            </div>
            <h3 className="text-white font-sans font-black text-xl sm:text-2xl tracking-tight">
              Master Pressing Artisans
            </h3>
            <p className="text-blue-100 font-bold text-base leading-relaxed">
              Hand-finished tension steam pressing preserving natural drape, sharp lapels, and tailored seams.
            </p>
          </div>
        </div>

        {/* Center Area: Open Center View */}
        <div className="hidden lg:block w-32 xl:w-48 pointer-events-none" />

        {/* Right Flanking Column: 2 Cards (Curved Stagger) */}
        <div
          ref={rightCardsRef}
          className="w-full max-w-xl mx-auto lg:max-w-none lg:w-[380px] xl:w-[420px] flex flex-col gap-4 sm:gap-5"
        >
          {/* Card 3: Top Right - Pure Laundry */}
          <div className="p-5 sm:p-6 lg:p-7 rounded-[26px] sm:rounded-[30px] bg-gradient-to-br from-[#1d315c]/75 via-[#14203d]/80 to-[#0b1226]/85 hover:from-[#233a6b]/85 hover:via-[#19274a]/90 hover:to-[#0e1630]/95 border border-white/25 backdrop-blur-md shadow-2xl shadow-blue-950/30 space-y-3 transition-all text-left group lg:translate-x-0 hover:-translate-y-1">
            <div className="size-11 sm:size-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-md border border-white/80 group-hover:scale-105 transition-transform">
              <Zap className="size-6 text-blue-600 fill-blue-600" />
            </div>
            <h3 className="text-white font-sans font-black text-xl sm:text-2xl tracking-tight">
              White-Glove Laundry Pickup
            </h3>
            <p className="text-blue-100 font-bold text-base leading-relaxed">
              RFID-tracked hampers and moisture-sealed garment bags collected directly from your doorstep.
            </p>
          </div>

          {/* Card 4: Bottom Right - Pure Laundry (Inward Offset) */}
          <div className="p-5 sm:p-6 lg:p-7 rounded-[26px] sm:rounded-[30px] bg-gradient-to-br from-[#1d315c]/75 via-[#14203d]/80 to-[#0b1226]/85 hover:from-[#233a6b]/85 hover:via-[#19274a]/90 hover:to-[#0e1630]/95 border border-white/25 backdrop-blur-md shadow-2xl shadow-blue-950/30 space-y-3 transition-all text-left group lg:-translate-x-4 hover:-translate-y-1">
            <div className="size-11 sm:size-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-md border border-white/80 group-hover:scale-105 transition-transform">
              <Users className="size-6 text-blue-600 fill-blue-600" />
            </div>
            <h3 className="text-white font-sans font-black text-xl sm:text-2xl tracking-tight">
              24/7 Wardrobe Concierge
            </h3>
            <p className="text-blue-100 font-bold text-base leading-relaxed">
              Real-time wash cycle tracking and on-demand laundry return at your preferred schedule.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

