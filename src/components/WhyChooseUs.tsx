"use client";

import React from "react";
import Image from "next/image";
import {
  Hotel,
  HeartPulse,
  UtensilsCrossed,
  Briefcase,
  GraduationCap,
  Dumbbell,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { getAssetPath } from "@/lib/constants";

export default function WhyChooseUs() {
  return (
    <section id="industries" className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Background Ambience in Logo Purple */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#2E0854] font-body bg-purple-50 px-4 py-1.5 rounded-full border border-purple-200/60 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] inline-block" />
            <span>INDUSTRIES WE SERVE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#1E0935] tracking-tight font-display leading-tight">
            One Laundry Partner. Multiple Business Needs.
          </h2>

          <p className="text-slate-600 font-body text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            LuxeWash supports businesses that depend on clean linen, uniforms and reusable textiles as part of their daily commercial operations.
          </p>
        </div>

        {/* 4 Quadrants with Central Commercial Linen Facility Photo & Hairline Cross Grid */}
        <div className="relative max-w-5xl mx-auto mb-10">
          {/* Subtle Hairline Cross Divider Lines (Desktop only) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-purple-200/60 -translate-y-1/2" />
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-purple-200/60 -translate-x-1/2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            {/* LEFT COLUMN: 2 Industries (Top-Left & Bottom-Left) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 sm:space-y-8">
              {/* Industry 1: Hospitality */}
              <div className="p-5 sm:p-6 rounded-2xl apple-glass-interactive space-y-2.5 text-left group">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center shadow-sm shrink-0 border border-[#D4AF37]/30 group-hover:scale-105 transition-transform">
                    <Hotel className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-sm font-bold uppercase tracking-wider text-[#b58d20] block">
                      Sector 01
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1E0935] font-display">
                      Hospitality
                    </h3>
                  </div>
                </div>
                <p className="text-slate-600 font-body text-sm leading-relaxed pl-0 sm:pl-1">
                  Hotels, resorts, serviced apartments and guest houses — bedding, duvet covers, bath linen and towels.
                </p>
              </div>

              {/* Industry 2: Healthcare */}
              <div className="p-5 sm:p-6 rounded-2xl apple-glass-interactive space-y-2.5 text-left group">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center shadow-sm shrink-0 border border-[#D4AF37]/30 group-hover:scale-105 transition-transform">
                    <HeartPulse className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-sm font-bold uppercase tracking-wider text-[#b58d20] block">
                      Sector 02
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1E0935] font-display">
                      Healthcare
                    </h3>
                  </div>
                </div>
                <p className="text-slate-600 font-body text-sm leading-relaxed pl-0 sm:pl-1">
                  Hospitals, clinics and medical care facilities — strict hygienic sanitization for patient bed linen, gowns and scrubs.
                </p>
              </div>
            </div>

            {/* CENTER: Pristine Commercial Linens Stacks on Industrial Racks */}
            <div className="lg:col-span-4 flex items-center justify-center py-4 lg:py-0">
              <div className="relative w-[260px] sm:w-[300px] md:w-[320px] aspect-square rounded-3xl overflow-hidden p-2 flex items-center justify-center apple-glass shadow-[0_20px_50px_rgba(46,8,84,0.12),inset_0_1px_1.5px_rgba(255,255,255,0.95)] group">
                <Image
                  src={getAssetPath("/images/commercial_linens.jpg")}
                  alt="LUXEWASH Commercial Laundry Linen Processing Facility"
                  fill
                  sizes="320px"
                  className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#1E0935]/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 apple-glass-pill px-3.5 py-2 rounded-xl text-center shadow-xs">
                  <span className="text-sm font-bold text-[#1E0935] uppercase tracking-wider font-body flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Commercial Linen Facility</span>
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 2 Industries (Top-Right & Bottom-Right) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 sm:space-y-8">
              {/* Industry 3: Food Service */}
              <div className="p-5 sm:p-6 rounded-2xl apple-glass-interactive space-y-2.5 text-left lg:text-right group">
                <div className="flex items-center gap-3 lg:justify-end">
                  <div className="order-2 lg:order-1">
                    <span className="text-sm font-bold uppercase tracking-wider text-[#b58d20] block">
                      Sector 03
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1E0935] font-display">
                      Food Service
                    </h3>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center shadow-sm shrink-0 order-1 lg:order-2 border border-[#D4AF37]/30 group-hover:scale-105 transition-transform">
                    <UtensilsCrossed className="w-5 h-5 stroke-[2]" />
                  </div>
                </div>
                <p className="text-slate-600 font-body text-sm leading-relaxed pr-0 sm:pr-1">
                  Restaurants, catering companies, banquet halls and kitchens — crisp tablecloths, napkins and chef uniforms.
                </p>
              </div>

              {/* Industry 4: Corporate & Industrial */}
              <div className="p-5 sm:p-6 rounded-2xl apple-glass-interactive space-y-2.5 text-left lg:text-right group">
                <div className="flex items-center gap-3 lg:justify-end">
                  <div className="order-2 lg:order-1">
                    <span className="text-sm font-bold uppercase tracking-wider text-[#b58d20] block">
                      Sector 04
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1E0935] font-display">
                      Corporate & Industrial
                    </h3>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center shadow-sm shrink-0 order-1 lg:order-2 border border-[#D4AF37]/30 group-hover:scale-105 transition-transform">
                    <Briefcase className="w-5 h-5 stroke-[2]" />
                  </div>
                </div>
                <p className="text-slate-600 font-body text-sm leading-relaxed pr-0 sm:pr-1">
                  Professional laundering and pressing for corporate uniforms, industrial workwear and reusable textiles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Specialized Sectors Minimal Bar */}
        <div className="mb-12 max-w-4xl mx-auto apple-glass p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-body">
          <div className="flex items-center gap-2 text-[#2E0854] font-bold shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span>Also Serving Special Sectors:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full apple-glass-pill font-medium">
              <GraduationCap className="w-4 h-4 text-[#2E0854]" />
              <span>Hostels & Student Accommodation</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full apple-glass-pill font-medium">
              <Dumbbell className="w-4 h-4 text-[#2E0854]" />
              <span>Wellness Centers, Spas & Gyms</span>
            </span>
          </div>
        </div>

        {/* Bottom Commercial Partner Banner */}
        <div className="rounded-3xl p-7 sm:p-10 apple-glass-dark text-white relative overflow-hidden border border-[#D4AF37]/50 shadow-[0_24px_60px_-10px_rgba(18,3,36,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.25)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#f3cf65] font-body">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Commercial Partnerships</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
                Looking for a commercial laundry partner?
              </h3>
              <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed font-body">
                Share your business requirements with LuxeWash to discuss a customized service arrangement, volume pricing, and dedicated logistics.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-quote-modal"));
                }
              }}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-[#1E0935] bg-[#f3cf65] hover:bg-[#ffe17d] shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base cursor-pointer select-none font-body shrink-0 border border-amber-300"
            >
              <span>Request a Business Quote</span>
              <ArrowRight className="w-4 h-4 text-[#1E0935] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
