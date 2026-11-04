"use client";

import React, { useState } from "react";
import { ArrowUpRight, Bed, Stethoscope, UtensilsCrossed, Shirt, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

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
  const [activeServiceId, setActiveServiceId] = useState(services[0].id);
  const activeService = services.find((service) => service.id === activeServiceId) ?? services[0];

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

        {/* Tabbed service selector: stacked on small screens, two columns on larger screens. */}
        <div className="mb-12 grid grid-cols-1 items-stretch gap-5 md:grid-cols-[minmax(240px,0.32fr)_minmax(0,0.68fr)] md:gap-8">
          <div className="flex flex-col gap-3">
            {services.map((srv, index) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => setActiveServiceId(srv.id)}
                className={`flex min-w-0 flex-1 items-center gap-3 rounded-xl border p-4 text-left transition-all md:w-full ${
                  activeServiceId === srv.id
                    ? "border-[#6825a3] bg-[#240a3e] text-white shadow-lg"
                    : "border-purple-200/80 bg-white text-[#2c1d3c] hover:border-[#a855f7]"
                }`}
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${activeServiceId === srv.id ? "bg-white/15" : "bg-[#23093b]"}`}>
                  {React.cloneElement(srv.icon, { className: "h-5 w-5 text-amber-300" })}
                </span>
                <span>
                  <span className={`block text-[10px] font-semibold uppercase tracking-[0.16em] ${activeServiceId === srv.id ? "text-purple-200" : "text-[#6825a3]"}`}>
                    STEP 0{index + 1}
                  </span>
                  <span className="mt-1 block text-sm font-semibold leading-tight">{srv.title}</span>
                </span>
              </button>
            ))}
          </div>

          <article className="flex h-full min-h-[360px] flex-col rounded-2xl border border-purple-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(45,12,78,0.08)] sm:p-8">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#23093b] shadow-md">
                {activeService.icon}
              </div>
              <span className="rounded-full border border-purple-200/60 bg-purple-50 px-3 py-1 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#6825a3]">
                {activeService.category}
              </span>
            </div>
            <h3 className="mb-3 font-serif text-[28px] font-semibold tracking-tight text-[#1a0c2e] sm:text-[34px]">
              {activeService.title}
            </h3>
            <p className="mb-6 max-w-2xl text-[14px] leading-[1.7] text-[#554a61]">{activeService.description}</p>
            <div className="grid gap-3 border-t border-[#ece6dc] pt-5 sm:grid-cols-3">
              {activeService.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2 text-xs leading-relaxed text-[#4a3f57]">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6825a3]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-[#ece6dc] pt-5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6825a3]">{activeService.turnaround}</span>
              <button type="button" onClick={() => onOpenQuote(activeService.title)} className="inline-flex items-center gap-2 rounded bg-[#240a3e] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#6825a3]">
                Discuss this service <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </article>
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
