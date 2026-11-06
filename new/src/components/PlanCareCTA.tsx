"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface PlanCareCTAProps {
  onOpenPlanCare: () => void;
}

export default function PlanCareCTA({ onOpenPlanCare }: PlanCareCTAProps) {
  return (
    <section className="w-full bg-[#240a3e] text-white py-10 sm:py-14 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#6825a3]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-4 h-[1.5px] bg-[#c084fc]" />
          <span className="text-[11px] font-sans font-semibold tracking-[0.24em] uppercase text-purple-200">
            PARTNER WITH LUXEWASH
          </span>
          <span className="w-4 h-[1.5px] bg-[#c084fc]" />
        </div>

        <h2 className="font-serif text-[34px] sm:text-[44px] xl:text-[50px] leading-[1.06] font-medium tracking-tight mb-4">
          Ready to elevate your commercial linen standard?
        </h2>

        <p className="text-[14.5px] sm:text-[16px] leading-relaxed text-purple-200/80 max-w-[620px] mx-auto mb-6">
          Book a direct consultation with our linen operations director. We will audit your fabric rotation, estimate your cost efficiencies, and provide a tailored operational proposal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onOpenPlanCare}
            className="group inline-flex items-center gap-2.5 bg-white text-[#240a3e] hover:bg-purple-50 px-8 py-4 rounded text-[13.5px] font-semibold tracking-wide shadow-xl transition-all duration-200"
          >
            <span>Plan your laundry care</span>
            <ArrowUpRight className="w-4 h-4 text-[#240a3e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <a
            href="tel:+18005893927"
            className="inline-flex items-center gap-2 border border-purple-400/50 hover:border-purple-300 text-white px-7 py-4 rounded text-[13.5px] font-medium transition-colors"
          >
            <span>Call (800) LUXE-WASH</span>
          </a>
        </div>

      </div>
    </section>
  );
}
