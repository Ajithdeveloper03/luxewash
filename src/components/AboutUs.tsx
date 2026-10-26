"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import { getAssetPath } from "@/lib/constants";

export default function AboutUs() {
  return (
    <section id="about" className="py-8 sm:py-10 md:py-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Side: Rounded Photo matching User Reference Screenshot 2 */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[340px] sm:h-[400px] md:h-[440px] w-full max-w-[460px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1000&q=80"
                alt="LUXEWASH Premium Laundry Towels and Washcare"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Subtle floating badge */}
            <div className="absolute -bottom-3 -right-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-purple-100 hidden sm:flex items-center gap-2 text-xs font-semibold text-[#18042b]">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>100% Care Guarantee</span>
            </div>
          </div>

          {/* Right Side: Clean Content */}
          <div className="lg:col-span-7 flex flex-col justify-center relative">
            {/* Small Brand Pill with Glassmorphism */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md text-[#2E0854] border border-purple-200/60 shadow-2xs text-xs font-semibold uppercase tracking-wider font-body w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E0854]" />
              <span>About LuxeWash</span>
            </div>

            {/* Heading in Logo Color Theme */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#18042b] tracking-tight font-display leading-tight mb-4">
              Your Partner in Commercial Laundry Solutions
            </h2>

            {/* Shortened Minimal B2B Text */}
            <p className="text-slate-600 text-sm sm:text-base md:text-lg font-body leading-relaxed max-w-xl mb-5">
              LuxeWash delivers professional linen-care and commercial laundry solutions for hotels, healthcare facilities, and restaurants. We build custom service arrangements based on your daily textile volume, handling standards, and scheduled delivery requirements.
            </p>

            {/* Mission & Vision Dual Glassmorphism Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-w-xl">
              <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-purple-200/70 shadow-xs hover:bg-white/80 transition-all">
                <span className="text-[11px] font-bold text-[#2E0854] uppercase tracking-wider block mb-1">Our Mission</span>
                <p className="text-xs text-slate-600 leading-snug">
                  To simplify commercial laundry management by delivering reliable, professional, and customer-focused solutions.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-amber-200/70 shadow-xs hover:bg-white/80 transition-all">
                <span className="text-[11px] font-bold text-[#b58d20] uppercase tracking-wider block mb-1">Our Vision</span>
                <p className="text-xs text-slate-600 leading-snug">
                  To become the trusted commercial laundry partner for businesses seeking consistent quality and dependability.
                </p>
              </div>
            </div>

            {/* Business Quote CTA Button in Logo Theme */}
            <div className="mb-4 relative z-20">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-quote-modal"));
                  }
                }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-[#f3cf65] bg-gradient-to-r from-[#1E0935] via-[#2E0854] to-[#4B1278] hover:from-[#2E0854] hover:to-[#5E1695] border border-[#D4AF37]/60 shadow-lg shadow-purple-950/20 transition-all duration-300 hover:scale-105 active:scale-95 text-sm cursor-pointer select-none font-body"
              >
                <span>Request a Business Quote</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CLOTHESLINE STARTING BEHIND LEFT IMAGE AND SPANNING TO THE RIGHT SCREEN EDGE */}
      {/* <div className="absolute bottom-0 -left-20 sm:-left-32 md:-left-44 right-0 w-[calc(100%+5rem)] sm:w-[calc(100%+8rem)] md:w-[calc(100%+11rem)] h-[170px] sm:h-[230px] md:h-[300px] pointer-events-none z-0 translate-y-4">
        <Image
          src={getAssetPath("/images/dressing.png")}
          alt="Clean laundry hanging on clothesline"
          fill
          sizes="100vw"
          className="object-contain object-right-bottom"
          priority
        />
      </div> */}
    </section>
  );
}