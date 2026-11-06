"use client";

import React from "react";
import { ArrowUpRight, Bed, Stethoscope, UtensilsCrossed, Shirt, ShieldCheck, CheckCircle2 } from "lucide-react";

interface CommercialServicesSectionProps {
  onOpenQuote: (serviceName?: string) => void;
}

export default function CommercialServicesSection({ onOpenQuote }: CommercialServicesSectionProps) {
  const services = [
    {
      id: "hospitality",
      title: "Hotel & Hospitality Laundry",
      category: "LUXURY ACCOMMODATION",
      description:
        "Professional cleaning and care for bedsheets, pillowcases, towels, duvet covers, bath linen and hospitality textiles with pristine, wrinkle-free presentation.",
      icon: <Bed className="w-6 h-6 text-amber-300" />,
      features: [
        "Sateen & high-thread Egyptian cotton handling",
        "Multi-roll steam calender finishing",
        "Dust-free sealed cart delivery",
      ],
      turnaround: "24-Hour Scheduled Rotation",
    },
    {
      id: "healthcare",
      title: "Hospital & Healthcare Laundry",
      category: "MEDICAL & CLINICAL",
      description:
        "Hygienic laundry services for hospital linen, patient garments, and staff scrubs with handling procedures rigorously aligned with medical facility standards.",
      icon: <Stethoscope className="w-6 h-6 text-amber-300" />,
      features: [
        "165°F (74°C) thermal disinfection cycles",
        "Physical barrier between soiled & clean zones",
        "Hypoallergenic, non-toxic formulations",
      ],
      turnaround: "HLAC & CDC Aligned",
    },
    {
      id: "dining",
      title: "Restaurant & Catering Laundry",
      category: "CULINARY & BANQUETS",
      description:
        "Reliable cleaning for tablecloths, cloth napkins, chef uniforms, kitchen garments and catering linen with deep culinary stain removal and crisp pressing.",
      icon: <UtensilsCrossed className="w-6 h-6 text-amber-300" />,
      features: [
        "Specialized oil, wine & grease stain extraction",
        "Precision mechanical starching & creases",
        "Split-shift emergency delivery availability",
      ],
      turnaround: "Daily Dinner Replenishment",
    },
    {
      id: "uniforms",
      title: "Uniform & Bulk Linen Processing",
      category: "ENTERPRISE & WORKWEAR",
      description:
        "High-volume processing for corporate workwear, staff uniforms, and commercial textiles with custom collection frequencies and reliable delivery schedules.",
      icon: <Shirt className="w-6 h-6 text-amber-300" />,
      features: [
        "Optional RFID & barcode piece-level tracking",
        "Minor repairs, button & seam verification",
        "Dedicated hanging or folded distribution",
      ],
      turnaround: "Scheduled Weekly / Bi-Weekly",
    },
  ];

  return (
    <section id="services" className="w-full bg-[#f6f2ec] py-12 sm:py-16 border-b border-[#ece6dc] relative overflow-hidden">
      
      {/* Background Soft Ambient Light */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-purple-200/40 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-[1.5px] bg-[#6825a3]" />
            <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.24em] uppercase text-[#6825a3]">
              COMMERCIAL SOLUTIONS &amp; BULK TEXTILE CARE
            </span>
          </div>

          <h2 className="font-serif text-[36px] sm:text-[46px] xl:text-[52px] leading-[1.08] text-[#191024] font-medium tracking-[-0.02em] mb-4">
            <span>Consistent, scheduled laundry solutions</span>
            <br />
            <span className="italic font-normal text-[#6d228f]">
              built for hotels, healthcare, and restaurants.
            </span>
          </h2>

          <p className="text-[14.5px] sm:text-[16px] leading-[1.7] text-[#554a61]">
            LuxeWash delivers professional linen-care and commercial laundry solutions tailored to your operational rhythm. We build custom arrangements based on your daily textile volume, handling standards, and scheduled delivery requirements.
          </p>

        </div>

        {/* 4 Core Commercial Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7 mb-12">
          {services.map((srv) => (
            <div
              key={srv.id}
              onClick={() => onOpenQuote(srv.title)}
              className="group bg-white rounded-[24px] p-7 sm:p-8 border border-purple-200/80 shadow-[0_10px_30px_rgba(45,12,78,0.06)] hover:border-[#7e22ce] hover:shadow-[0_20px_50px_rgba(126,34,206,0.22)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Top Icon + Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#23093b] border border-purple-900/50 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    {srv.icon}
                  </div>
                  <span className="text-[9.5px] font-sans font-semibold tracking-[0.2em] uppercase text-[#6825a3] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200/60">
                    {srv.category}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-serif text-[22px] sm:text-[23px] font-semibold text-[#1a0c2e] group-hover:text-[#6d228f] tracking-tight mb-3 transition-colors">
                  {srv.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] sm:text-[13.5px] leading-[1.65] text-[#554a61] font-normal mb-6">
                  {srv.description}
                </p>

                {/* Bullet Points */}
                <div className="space-y-2 pt-4 border-t border-[#ece6dc] mb-6">
                  {srv.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#4a3f57]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#6825a3] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA with Turnaround SLA */}
              <div className="pt-4 border-t border-[#ece6dc] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#6825a3] uppercase tracking-wider">
                  {srv.turnaround}
                </span>
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-[#240a3e] group-hover:bg-[#240a3e] group-hover:text-white transition-all shadow-xs">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Value Proposition Strip: In-House vs LuxeWash Managed */}
        <div className="bg-[#1f0734] text-white rounded-[24px] p-6 sm:p-10 border border-purple-900/60 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-[#c084fc]" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-300">
                  OPERATIONAL PEACE OF MIND
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-3">
                Eliminate In-House Laundry Overhead &amp; Machine Downtime
              </h3>
              <p className="text-sm text-purple-200/80 leading-relaxed max-w-xl">
                Replace expensive commercial washers, boiler utility bills, detergent inventory, and housekeeping labor headaches with a predictable, guaranteed cost-per-pound agreement.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3 sm:gap-4">
              <button
                onClick={() => onOpenQuote("Custom Partnership")}
                className="bg-[#7e22ce] hover:bg-[#9333ea] text-white px-7 py-3.5 rounded text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg transition-all"
              >
                Request Service Arrangement
              </button>
              <a
                href="#approach"
                className="border border-purple-400/40 hover:border-purple-300 text-white px-6 py-3.5 rounded text-xs sm:text-sm font-medium transition-colors"
              >
                Our 4-Step Process
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
