"use client";

import React from "react";
import Image from "next/image";
import { assetPath } from "@/lib/site";
import { ArrowUpRight, ArrowDown } from "lucide-react";

interface HeroSectionProps {
  onOpenPlanCare: () => void;
}

export default function HeroSection({ onOpenPlanCare }: HeroSectionProps) {
  return (
    <section id="hospitality" className="relative w-full bg-[#faf8f5] py-10 sm:py-14 overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Editorial Typography Matching Reference Image 2 */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            
            {/* Tagline / Category Label */}
            <div className="flex items-center gap-2.5 mb-5 sm:mb-7">
              <span className="w-6 h-[1.5px] bg-[#6825a3]" />
              <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.24em] uppercase text-[#6825a3]">
                COMMERCIAL LAUNDRY SOLUTIONS
              </span>
            </div>

            {/* Giant Editorial Serif Headline */}
            <h1 className="font-serif text-[46px] sm:text-[62px] xl:text-[74px] leading-[1.04] text-[#191024] font-medium tracking-[-0.02em] mb-7">
              <span>Fresh linen.</span>
              <br />
              <span>Fewer worries.</span>
              <br />
              <span className="italic font-normal text-[#6d228f]">
                Better business.
              </span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-[15px] sm:text-[17px] leading-[1.65] text-[#554a61] max-w-[480px] mb-9 font-normal">
              Behind every great guest experience is care you can feel. Discover a thoughtful approach to laundry for your business.
            </p>

            {/* CTA Group: Let's talk laundry ↗ & Explore industry solutions ↓ */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              
              <button
                onClick={onOpenPlanCare}
                className="group inline-flex items-center justify-center gap-3 bg-[#240a3e] hover:bg-[#3b1261] active:bg-[#18052b] text-white px-7 py-3.5 rounded text-[13.5px] font-medium tracking-wide shadow-[0_8px_20px_rgba(36,10,62,0.18)] hover:shadow-[0_12px_28px_rgba(36,10,62,0.25)] transition-all duration-200"
              >
                <span>Let&apos;s talk laundry</span>
                <ArrowUpRight className="w-4 h-4 text-purple-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <a
                href="#industries"
                className="group inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#240a3e] hover:text-[#5e1c8a] transition-colors border-b border-[#240a3e]/40 hover:border-[#5e1c8a] pb-0.5"
              >
                <span>Explore industry solutions</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-[#6825a3]" />
              </a>

            </div>

          </div>

          {/* RIGHT COLUMN: Luxury Bed Visual with LW Art of Care Badge & Caption */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(36,10,62,0.12)] border border-[#e8e2d8]">
              
              <Image
                src={assetPath("/images/hotel-bedroom-hero.jpg")}
                alt="Luxury hotel bedroom suite with pristine fresh white linen duvet and pillows"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transform hover:scale-102 transition-transform duration-700 ease-out"
              />

              {/* Top Right Circular Badge Stamp - Reference Image 2: "LW / THE ART OF CARE" */}
              <div className="absolute top-5 right-5 sm:top-7 sm:right-7 z-20 pointer-events-none">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/60 bg-white/20 backdrop-blur-[6px] flex flex-col items-center justify-center p-2 text-center shadow-lg">
                  <div className="w-[calc(100%-6px)] h-[calc(100%-6px)] rounded-full border border-white/40 flex flex-col items-center justify-center">
                    <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-white drop-shadow-sm leading-none">
                      LW
                    </span>
                    <span className="text-[7px] sm:text-[8px] font-sans tracking-[0.22em] uppercase font-semibold text-white/95 mt-0.5 drop-shadow-sm">
                      THE ART OF CARE
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Caption Overlay - Reference Image 2: "SMALL DETAILS. LASTING IMPRESSIONS." */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pt-12 pb-4 px-6 sm:px-8 z-10 flex items-end">
                <p className="text-[9.5px] sm:text-[10.5px] font-sans font-semibold tracking-[0.22em] uppercase text-white/95 drop-shadow">
                  SMALL DETAILS. LASTING IMPRESSIONS.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
