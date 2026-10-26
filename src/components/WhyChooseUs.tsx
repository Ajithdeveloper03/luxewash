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
} from "lucide-react";
import { getAssetPath } from "@/lib/constants";

export default function WhyChooseUs() {
  const industries = [
    {
      icon: Hotel,
      title: "Hospitality",
      desc: "Hotels, resorts, serviced apartments and guest houses — bedding, duvet covers, bath linen and towels.",
    },
    {
      icon: HeartPulse,
      title: "Healthcare",
      desc: "Hospitals, clinics and medical facilities — strict hygienic sanitization for patient linen and scrubs.",
    },
    {
      icon: UtensilsCrossed,
      title: "Food Service",
      desc: "Restaurants, catering companies, banquet halls and kitchens — crisp tablecloths, napkins and chef uniforms.",
    },
    {
      icon: Briefcase,
      title: "Corporate & Industrial",
      desc: "Professional laundering and pressing for corporate uniforms, industrial workwear and reusable textiles.",
    },
    {
      icon: GraduationCap,
      title: "Education & Accommodation",
      desc: "Hostels, colleges and training accommodation — scheduled bulk linen management and reliable delivery.",
    },
    {
      icon: Dumbbell,
      title: "Wellness & Fitness",
      desc: "Gyms, wellness centers and luxury spas — continuous sanitization for plush towels and staff robes.",
    },
  ];

  return (
    <section id="industries" className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Background Ambience in Logo Purple */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2E0854] font-body bg-purple-50 px-4 py-1.5 rounded-full border border-purple-200/60 shadow-xs">
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

        {/* 6 Clean Minimal Sector Cards (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {industries.map((ind, idx) => {
            const IconComponent = ind.icon;
            return (
              <div
                key={ind.title}
                className="group relative p-6 sm:p-7 rounded-3xl bg-[#FAF8FD] border border-purple-100/80 hover:border-[#D4AF37]/60 shadow-xs hover:shadow-xl hover:shadow-purple-950/5 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center border border-[#D4AF37]/30 shadow-sm mb-4 transition-transform group-hover:scale-105">
                    <IconComponent className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#1E0935] font-display mb-2 group-hover:text-[#4B1278] transition-colors">
                    {ind.title}
                  </h3>

                  <p className="text-slate-600 font-body text-xs sm:text-sm leading-relaxed">
                    {ind.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-purple-100/60 flex items-center justify-between text-xs font-bold text-[#2E0854]">
                  <span className="uppercase tracking-wider font-body text-[11px] text-[#b58d20]">
                    Sector 0{idx + 1}
                  </span>
                  <span className="text-[#2E0854] font-medium">Commercial Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Commercial Partner Banner */}
        <div className="rounded-3xl p-7 sm:p-10 bg-gradient-to-r from-[#1E0935] via-[#2E0854] to-[#4B1278] text-white relative overflow-hidden border border-[#D4AF37]/40 shadow-2xl shadow-purple-950/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f3cf65] font-body">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Commercial Partnerships</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
                Looking for a commercial laundry partner?
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed font-body">
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
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-[#1E0935] bg-[#f3cf65] hover:bg-[#ffe17d] shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 active:scale-95 text-xs sm:text-sm cursor-pointer select-none font-body shrink-0 border border-amber-300"
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
