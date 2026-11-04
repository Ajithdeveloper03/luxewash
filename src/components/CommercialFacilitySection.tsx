"use client";

import React from "react";
import Image from "next/image";
import { assetPath } from "@/lib/site";
import { ArrowUpRight, ShieldCheck, Clock, Building2 } from "lucide-react";

interface CommercialFacilitySectionProps {
  onOpenQuote: () => void;
}

export default function CommercialFacilitySection({ onOpenQuote }: CommercialFacilitySectionProps) {
  const specs = [
    { label: "Daily Throughput", value: "35,000 lbs" },
    { label: "Thermal Sanitization", value: "165°F / 74°C" },
    { label: "On-Time Dispatch", value: "99.85%" },
    { label: "Fleet Coverage", value: "Metropolitan Area" },
  ];

  return (
    <section id="facility" className="relative w-full bg-[#170526] text-white py-24 sm:py-32 overflow-hidden">
      
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c084fc_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Top Header Matching Reference Image 1 */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-[1.5px] bg-[#c084fc]" />
            <span className="text-[11px] font-sans font-semibold tracking-[0.24em] uppercase text-purple-300">
              INDUSTRIAL INFRASTRUCTURE
            </span>
          </div>

          <h2 className="font-serif text-[38px] sm:text-[52px] xl:text-[58px] leading-[1.1] font-medium tracking-tight mb-6">
            Commercial Laundry Excellence for Healthcare &amp; Hospitality
          </h2>

          <p className="text-[15px] sm:text-[17px] leading-[1.7] text-purple-200/80 max-w-[640px]">
            Premium laundry solutions built for businesses that demand reliability, compliance, and pristine results. Medical-grade sanitization with industry-leading turnaround times.
          </p>

          {/* CTA Buttons Matching Reference 1 */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 bg-[#6b21a8] hover:bg-[#7e22ce] text-white px-7 py-3 rounded text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-purple-950/60 transition-all hover:scale-102"
            >
              <span>Request Quote</span>
              <ArrowUpRight className="w-4 h-4 text-purple-200" />
            </button>

            <a
              href="#approach"
              className="inline-flex items-center gap-2 border border-purple-400/40 hover:border-purple-300 text-purple-100 hover:text-white px-6 py-3 rounded text-xs sm:text-sm font-medium transition-colors"
            >
              <span>View Processing Standards</span>
            </a>
          </div>

          {/* Trust Badges - Exactly as shown in Reference Image 1 */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-10 text-xs sm:text-[13px] text-purple-200/90 font-medium border-t border-purple-900/60 mt-10">
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
              <span>OSHA &amp; HLAC Compliant</span>
            </div>
          </div>
        </div>

        {/* Industrial Plant Facility Display */}
        <div className="relative w-full rounded-sm overflow-hidden border border-purple-900/60 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
          
          <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full">
            <Image
              src={assetPath("/images/industrial-facility.jpg")}
              alt="High-capacity commercial laundry plant with automated continuous batch tunnel washers and ironers"
              fill
              sizes="(max-width: 1280px) 100vw, 1360px"
              className="object-cover object-center"
            />
            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140322]/90 via-transparent to-[#140322]/20" />
          </div>

          {/* Plant Stats Bar overlay at bottom of facility */}
          <div className="bg-[#19052b]/95 border-t border-purple-900/60 p-6 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-purple-900/40">
              {specs.map((item, i) => (
                <div key={item.label} className={i !== 0 ? "pt-4 md:pt-0" : ""}>
                  <div className="font-serif text-2xl sm:text-3xl font-semibold text-white mb-1">
                    {item.value}
                  </div>
                  <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-purple-300/80 font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
