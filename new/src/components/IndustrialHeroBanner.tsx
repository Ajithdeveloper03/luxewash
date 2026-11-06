"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck, Clock, Building2 } from "lucide-react";

interface IndustrialHeroBannerProps {
  onOpenQuote: (industry?: string) => void;
}

export default function IndustrialHeroBanner({ onOpenQuote }: IndustrialHeroBannerProps) {
  const specs = [
    { label: "Daily Throughput", value: "35,000 lbs" },
    { label: "Thermal Sanitization", value: "165°F / 74°C" },
    { label: "On-Time Dispatch", value: "99.85%" },
    { label: "Fleet Coverage", value: "Metropolitan Area" },
  ];

  return (
    <section className="relative w-full min-h-[560px] lg:min-h-[620px] flex flex-col justify-between text-white overflow-hidden border-b border-purple-950">
      
      {/* 1. FULL BACKGROUND IMAGE with REDUCED OVERLAY OPACITY */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/industrial-facility.jpg"
          alt="Commercial laundry facility with continuous batch washers and linen carts"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        
        {/* Lighter, clear overlay (Opacity significantly reduced as requested) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#10021c]/70 via-[#10021c]/45 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#120320]/85 via-[#120320]/50 to-transparent" />
      </div>

      {/* 2. MAIN HERO CONTENT OVERLAY - Compact Spacing */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-5 sm:px-8 pt-24 sm:pt-28 pb-8 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl xl:max-w-3xl">
          
          {/* Small Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 backdrop-blur-md border border-purple-400/40 text-purple-200 text-[10.5px] font-sans font-semibold tracking-[0.2em] uppercase mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#c084fc] animate-pulse" />
            <span>Commercial Laundry Excellence</span>
          </div>

          {/* Headline - High contrast with drop shadow */}
          <h1 className="font-serif text-[38px] sm:text-[50px] xl:text-[60px] leading-[1.08] text-white font-medium tracking-[-0.02em] mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            Commercial Laundry <br />
            Excellence for <br />
            <span className="italic font-normal text-[#d8b4fe]">
              Healthcare &amp; Hospitality
            </span>
          </h1>

          {/* Short, Concise Description */}
          <p className="text-[14.5px] sm:text-[16px] leading-[1.6] text-white/95 max-w-[560px] font-normal mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Premium laundry solutions built for businesses that demand reliability, compliance, and pristine results. Medical-grade sanitization with industry-leading turnaround times.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-7">
            <button
              onClick={() => onOpenQuote("Commercial Enterprise")}
              className="group inline-flex items-center justify-center gap-2 bg-[#7e22ce] hover:bg-[#9333ea] active:bg-[#6b21a8] text-white px-6 py-3 rounded text-[13px] font-semibold tracking-wide shadow-xl shadow-purple-950/70 transition-all duration-200 hover:scale-102"
            >
              <span>Request Quote</span>
              <ArrowUpRight className="w-4 h-4 text-purple-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <a
              href="#industries"
              className="inline-flex items-center gap-2 bg-black/30 hover:bg-black/45 text-white backdrop-blur-md border border-white/40 px-5 py-3 rounded text-[13px] font-medium transition-colors"
            >
              <span>View Services</span>
            </a>
          </div>

          {/* Trust Indicators Row */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs sm:text-[12.5px] text-white/95 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#c084fc]" />
              <span>Serving 500+ Businesses</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c084fc]" />
              <span>24/7 Operations</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c084fc]" />
              <span>OSHA Compliant</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM PLANT METRICS STRIP - Clean & Sleek */}
      <div className="relative z-10 w-full bg-[#11021b]/85 backdrop-blur-md border-t border-purple-800/40 py-3.5 px-5 sm:px-8">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-purple-900/50">
            {specs.map((item, i) => (
              <div key={item.label} className={i !== 0 ? "pt-2 md:pt-0" : ""}>
                <div className="font-serif text-lg sm:text-2xl font-semibold text-white">
                  {item.value}
                </div>
                <div className="text-[10px] sm:text-[10.5px] font-sans uppercase tracking-[0.16em] text-[#d8b4fe] font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
