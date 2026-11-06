"use client";

import React from "react";
import { Sparkles, Check, ArrowRight, ShieldCheck, Clock, Zap } from "lucide-react";

interface ServicePlan {
  id: string;
  name: string;
  turnaround: string;
  featured?: boolean;
  tagline: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
}

const SERVICES: ServicePlan[] = [
  {
    id: "daily",
    name: "Wardrobe Elite",
    turnaround: "24 HOURS",
    tagline: "Everyday Luxury Wash & Fold",
    description:
      "For discerning residences. Every piece color-sorted, cold-ozone sanitized, and meticulously hand-folded into moisture-barrier garment boxes.",
    features: [
      "Separated lights, darks & delicates",
      "Hypoallergenic zero-phosphate detergent",
      "Cold-water ozone fiber rejuvenation",
      "Crisp precision robotic & hand folding",
      "Doorstep pickup & drop-off included",
    ],
    specs: [
      { label: "Turnaround", value: "24h standard" },
      { label: "Water Temp", value: "32°C eco-chill" },
      { label: "Packaging", value: "Bespoke linen box" },
    ],
  },
  {
    id: "couture",
    name: "Couture & Atelier",
    turnaround: "48 HOURS",
    featured: true,
    tagline: "High-End Designer & Delicate Care",
    description:
      "Surgical care for silk, cashmere, bespoke tailoring, and evening wear. Zero toxic perchloroethylene, manual spot treatment, and custom cedar hangers.",
    features: [
      "Comprehensive pre-wash fiber inspection",
      "Perc-free molecular silicone dry care",
      "Hand-finished steam tension press",
      "Custom velvet & cedarwood hangers",
      "Breathable museum-grade garment covers",
    ],
    specs: [
      { label: "Turnaround", value: "48h precision" },
      { label: "Solvent", value: "100% GreenEarth" },
      { label: "Inspection", value: "3-point manual" },
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality & Linens",
    turnaround: "SCHEDULED",
    tagline: "Commercial High-Volume Excellence",
    description:
      "Bespoke bulk linen management for boutique hotels, luxury spas, and fine dining. RFID batch tracking with hospital-grade EN 14065 sanitization.",
    features: [
      "400+ thread count Egyptian cotton restoration",
      "Bio-barrier sanitization exceeding CDC standards",
      "Automated multi-roller continuous ironer",
      "RFID micro-chip loss prevention tracking",
      "Customized scheduled collection routes",
    ],
    specs: [
      { label: "Turnaround", value: "Daily / 12h express" },
      { label: "Capacity", value: "Up to 25,000 kg" },
      { label: "Compliance", value: "EN 14065 & OSHA" },
    ],
  },
  {
    id: "express",
    name: "Express 4-Hour",
    turnaround: "4 HOURS",
    tagline: "Rapid Emergency Turnaround",
    description:
      "When timing is mission-critical. Dedicated VIP single-chamber wash, instant ozone drying, and rapid courier return direct to your suite or office.",
    features: [
      "Instant priority courier dispatch",
      "Dedicated single-batch chamber (never mixed)",
      "High-velocity centrifugal extraction",
      "Executive hand-pressing on arrival",
      "Real-time GPS tracking of courier",
    ],
    specs: [
      { label: "Turnaround", value: "Under 240 mins" },
      { label: "Batch Size", value: "Single VIP drum" },
      { label: "Tracking", value: "Live GPS courier" },
    ],
  },
];

interface ServicesSectionProps {
  onOpenBooking?: (service?: string) => void;
}

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="relative py-28 bg-[#090d16] border-t border-white/10 overflow-hidden"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 size-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 size-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-[0.2em] bg-white/[0.03] border border-cyan-500/20 px-3.5 py-1 rounded-full mb-3">
              <Sparkles className="size-3.5" />
              <span>BESPOKE LAUNDRY TIERS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.1]">
              SERVICES TAILORED FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">EVERY WEAVE.</span>
            </h2>
          </div>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-wider max-w-sm">
            Zero perchloroethylene · 100% cold ozone hydro-cleansing · Same-day delivery options.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${
                s.featured
                  ? "bg-gradient-to-b from-[#111a2e] to-[#0a101d] border-cyan-400/80 shadow-[0_20px_50px_rgba(6,182,212,0.2)]"
                  : "bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
              }`}
            >
              {/* Featured Badge */}
              {s.featured && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 font-mono text-[9px] font-extrabold text-slate-950 uppercase tracking-widest shadow-md">
                  MOST REQUESTED
                </div>
              )}

              {/* Orbital Ring SVG Graphic in Card Background (Selene inspired) */}
              <div className="absolute top-4 right-4 size-24 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                <svg viewBox="0 0 100 100" className="size-full animate-spin-drum">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" className="text-cyan-400" />
                  <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1" className="text-white" />
                  <circle cx="50" cy="22" r="3" fill="currentColor" className="text-cyan-400" />
                </svg>
              </div>

              <div>
                {/* Turnaround Badge */}
                <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-0.5 rounded mb-4">
                  <Clock className="size-3" />
                  <span>{s.turnaround}</span>
                </div>

                <h3 className="font-display text-xl text-white font-bold uppercase mb-1">
                  {s.name}
                </h3>
                <p className="font-mono text-xs text-slate-400 mb-4">{s.tagline}</p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {s.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2.5 border-t border-white/10 pt-4 mb-6">
                  {s.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="size-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {/* Tech Specs */}
                <div className="grid grid-cols-2 gap-2 bg-black/40 rounded-lg p-2.5 mb-5 border border-white/5 font-mono text-[10px]">
                  {s.specs.slice(0, 2).map((sp, idx) => (
                    <div key={idx}>
                      <span className="text-slate-500 block">{sp.label}</span>
                      <span className="text-white font-bold block">{sp.value}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <button
                  onClick={() =>
                    onOpenBooking
                      ? onOpenBooking(s.name)
                      : document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={`w-full py-3 px-4 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    s.featured
                      ? "bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                      : "bg-white/10 hover:bg-white text-white hover:text-slate-950"
                  }`}
                >
                  <span>Select {s.name.split(" ")[0]}</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
