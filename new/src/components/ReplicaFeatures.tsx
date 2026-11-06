"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles, Crown, Building2, Plane } from "lucide-react";

const SERVICES_CARDS = [
  {
    tag: "Wash & Fold • 24h",
    title: "Wardrobe Wash & Fold",
    description:
      "Color-sorted, cold-ozone sanitized laundry wash, hand-folded into moisture-barrier garment boxes.",
    icon: Sparkles,
    staggerClass: "lg:-translate-y-3",
    badgeColor: "text-purple-950 bg-purple-100/90 border-purple-200",
  },
  {
    tag: "Dry Clean • 48h",
    title: "Couture Dry Cleaning",
    description:
      "Perc-free botanical solvent cleaning, tension steam press, and custom cedarwood hanger delivery.",
    icon: Crown,
    staggerClass: "lg:translate-y-3",
    badgeColor: "text-amber-950 bg-amber-100/90 border-amber-200",
  },
  {
    tag: "Commercial • Bulk",
    title: "Hospitality Linen Laundry",
    description:
      "High-volume Egyptian cotton bedsheet & towel wash with hospital-grade EN 14065 sanitization.",
    icon: Building2,
    staggerClass: "lg:-translate-y-1",
    badgeColor: "text-purple-950 bg-purple-100/90 border-purple-200",
  },
  {
    tag: "Priority • 4-Hour",
    title: "Express 4-Hour Laundry",
    description:
      "Rapid door-to-door wash, dry & press for private aviation crews, executives & VIP galas.",
    icon: Plane,
    staggerClass: "lg:translate-y-4",
    badgeColor: "text-amber-950 bg-amber-100/90 border-amber-200",
  },
];

export default function ReplicaFeatures() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx: any;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          cardRefs.current.forEach((el, idx) => {
            if (!el) return;
            gsap.fromTo(
              el,
              { y: 25 * (idx % 2 === 0 ? 1 : -1), opacity: 0.8 },
              {
                y: 0,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 75%",
                  end: "center center",
                  scrub: 2.5,
                },
              }
            );
          });
        }, containerRef);
      }
    );

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative min-h-[100vh] h-auto lg:h-screen lg:max-h-screen w-full flex flex-col justify-center items-center py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-16 z-10 box-border gap-4 sm:gap-6 overflow-y-auto lg:overflow-hidden"
    >
      {/* Top Header: Title */}
      <div className="w-full flex flex-col items-center justify-center text-center z-10">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight [text-shadow:0_1px_10px_rgb(255_255_255/0.95)]">
          Four Precision Laundry Tiers
        </h2>
      </div>

      {/* Cards strictly on 2 sides: Left 2 Cards + Open Center + Right 2 Cards (Light Opacity & Blur) */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8 z-10">
        {/* Left Column: 2 Cards */}
        <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col gap-3.5 sm:gap-4.5">
          {SERVICES_CARDS.slice(0, 2).map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="flex flex-col justify-between p-5 sm:p-6 rounded-[26px] sm:rounded-[30px] bg-white/50 hover:bg-white/65 border border-white/60 backdrop-blur-md shadow-xl transition-all duration-300 text-left group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-base font-extrabold tracking-wider uppercase px-3.5 py-1 rounded-full border ${card.badgeColor} shadow-sm backdrop-blur-[1px]`}
                    >
                      {card.tag}
                    </span>
                    <div className="size-9 rounded-xl bg-white/90 flex items-center justify-center text-purple-950 border border-purple-200 group-hover:scale-110 transition-transform shadow-sm">
                      <Icon className="size-5" />
                    </div>
                  </div>

                  <h3 className="text-slate-950 font-sans font-black text-xl lg:text-2xl leading-tight tracking-tight pt-1 [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
                    {card.title}
                  </h3>
                </div>

                <div className="pt-2.5 border-t border-white/30 mt-2">
                  <p className="text-slate-950 font-bold text-base leading-relaxed [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Open Center Gap */}
        <div className="hidden lg:block w-32 xl:w-48 pointer-events-none" />

        {/* Right Column: 2 Cards */}
        <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col gap-3.5 sm:gap-4.5">
          {SERVICES_CARDS.slice(2, 4).map((card, idx) => {
            const realIdx = idx + 2;
            const Icon = card.icon;
            return (
              <div
                key={realIdx}
                ref={(el) => {
                  cardRefs.current[realIdx] = el;
                }}
                className="flex flex-col justify-between p-5 sm:p-6 rounded-[26px] sm:rounded-[30px] bg-white/50 hover:bg-white/65 border border-white/60 backdrop-blur-md shadow-xl transition-all duration-300 text-left group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-base font-extrabold tracking-wider uppercase px-3.5 py-1 rounded-full border ${card.badgeColor} shadow-sm backdrop-blur-[1px]`}
                    >
                      {card.tag}
                    </span>
                    <div className="size-9 rounded-xl bg-white/90 flex items-center justify-center text-purple-950 border border-purple-200 group-hover:scale-110 transition-transform shadow-sm">
                      <Icon className="size-5" />
                    </div>
                  </div>

                  <h3 className="text-slate-950 font-sans font-black text-xl lg:text-2xl leading-tight tracking-tight pt-1 [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
                    {card.title}
                  </h3>
                </div>

                <div className="pt-2.5 border-t border-white/30 mt-2">
                  <p className="text-slate-950 font-bold text-base leading-relaxed [text-shadow:0_1px_8px_rgb(255_255_255/0.9)]">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
