"use client";

import React from "react";
import Image from "next/image";
import { Check, Sparkles } from "lucide-react";

export default function AboutPhilosophySection() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen lg:h-screen bg-[#140722] text-white overflow-hidden flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-14 sm:py-16 lg:py-12 not-italic select-none"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
        {/* Left: Main Image + Overlapping Laundry Basket Image */}
        <div className="md:col-span-6 relative pb-6 sm:pb-8 md:pb-4 lg:pb-0">
          <div className="relative mx-auto max-w-md md:max-w-none">
            <div className="relative h-60 sm:h-76 md:h-88 lg:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-500/30">
              <Image
                src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1000&q=80"
                alt="Fresh clean laundry care"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Overlapping Inset Image */}
            <div className="absolute -bottom-5 right-2 sm:right-5 w-36 sm:w-48 lg:w-60 h-24 sm:h-32 lg:h-40 rounded-2xl overflow-hidden border-4 border-amber-400 shadow-2xl z-20 bg-purple-950">
              <Image
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80"
                alt="Freshly folded clothes"
                fill
                className="object-cover object-center"
                sizes="240px"
              />
            </div>
          </div>
        </div>

        {/* Right: Very Minimal Content */}
        <div className="md:col-span-6 space-y-4 sm:space-y-5 lg:space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-purple-900/70 border border-purple-400/30 text-amber-300 font-bold text-base">
            <Sparkles className="size-4 text-amber-400 shrink-0" />
            <span>Who We Are</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            Helping you in doing your{" "}
            <span className="text-amber-400">laundry at the finest</span>
          </h2>

          <p className="text-purple-100 text-base sm:text-lg leading-relaxed max-w-lg font-medium">
            Pure cold-water wash and crisp hand pressing delivered fresh to your doorstep.
          </p>

          {/* 2 Minimal Feature Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
            <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-purple-950/80 border border-purple-500/30">
              <div className="size-8 rounded-lg bg-amber-400 text-purple-950 flex items-center justify-center shrink-0">
                <Check className="size-5 stroke-[3]" />
              </div>
              <span className="text-base sm:text-lg font-extrabold text-white">
                24h Fast Delivery
              </span>
            </div>

            <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-purple-950/80 border border-purple-500/30">
              <div className="size-8 rounded-lg bg-amber-400 text-purple-950 flex items-center justify-center shrink-0">
                <Check className="size-5 stroke-[3]" />
              </div>
              <span className="text-base sm:text-lg font-extrabold text-white">
                Best Wash Quality
              </span>
            </div>
          </div>

          <div className="pt-1 sm:pt-2">
            <a
              href="#services"
              className="inline-flex items-center justify-center w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-purple-950 font-black text-base shadow-xl transition-transform hover:scale-105 active:scale-95"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
