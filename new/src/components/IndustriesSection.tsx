"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Building2, Utensils, HeartPulse, Plane, Briefcase, CheckCircle, ArrowRight, Shield } from "lucide-react";

interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  icon: React.ElementType;
  volumeMetric: string;
  volumeLabel: string;
  standards: string[];
  keyHighlights: string[];
}

const INDUSTRIES: IndustryItem[] = [
  {
    id: "hospitality",
    name: "Luxury Hotels & Resorts",
    tagline: "5-Star Linen Precision & Bedding Longevity",
    description:
      "Engineered for boutique hotels and 5-star suites where guest experience is paramount. We restore high-thread Egyptian cotton to crisp, breathable softness without yellowing or fiber degradation.",
    image: "/images/hotel-bedroom-hero.jpg",
    icon: Building2,
    volumeMetric: "12,000+ KG",
    volumeLabel: "Processed Daily For Hotels",
    standards: ["EN 14065 Certified", "400+ Thread Count Safe", "RFID Linen Barcode"],
    keyHighlights: [
      "Customized morning & evening linen rotation routes",
      "Neutral pH balance preventing skin irritation",
      "Automated robotic roller ironers delivering crisp hospital folds",
      "Dedicated account manager & 24/7 emergency dispatch",
    ],
  },
  {
    id: "dining",
    name: "Fine Dining & Restaurants",
    tagline: "Immaculate Table Linens & Chef Apparel",
    description:
      "Tough culinary grease, dark balsamic, and red wine stains require surgical molecular extraction. Our cold aqueous ozone dissolves tannins and oils while preserving crisp linen weight.",
    image: "/images/folded-linens-study.jpg",
    icon: Utensils,
    volumeMetric: "4,500+ PCS",
    volumeLabel: "Tablecloths Restored Daily",
    standards: ["Zero Chemical Odor", "Tannin & Oil Extraction", "Stiff French Press"],
    keyHighlights: [
      "No perfume or petroleum solvent odor to interfere with fine wines",
      "Starch-balanced crisp French fold table linens",
      "Heavy-duty grease removal for executive chef jackets & aprons",
      "Same-day emergency re-stock deliveries",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare & Clinical Spas",
    tagline: "Surgical Bio-Sanitization & Barrier Protection",
    description:
      "Exceeding CDC and OSHA guidelines for medical clinics, cosmetic surgery centers, and wellness spas. Ozone gas destroys 99.98% of pathogens without carcinogenic chemical residue.",
    image: "/images/who-we-are-main.jpg",
    icon: HeartPulse,
    volumeMetric: "99.98%",
    volumeLabel: "Bacterial Decontamination Rate",
    standards: ["CDC Compliant", "Bio-Barrier Bags", "Thermal Ozone 65°C"],
    keyHighlights: [
      "Individually sealed sterile barrier packaging",
      "Thermal ozone cycle eliminating MRSA, viruses, and spores",
      "Hypoallergenic chemistry ideal for post-operative recovery",
      "Full batch compliance logging for healthcare audits",
    ],
  },
  {
    id: "aviation",
    name: "Aviation & Superyachts",
    tagline: "Tarmac & Marina Rapid Turnaround",
    description:
      "Ultra-compact turnaround for private charter jets, executive aviation, and superyacht crews. We neutralize marine salt air and treat ultra-luxury cashmere, silk bedding, and bespoke uniforms.",
    image: "/images/hero-valet.jpg",
    icon: Plane,
    volumeMetric: "< 6 HOURS",
    volumeLabel: "Tarmac & Marina Turnaround",
    standards: ["FBO Ramp Delivery", "Marine Salt Desalination", "Aviation Flame Retardant"],
    keyHighlights: [
      "Direct collection and return to FBO private terminals and yacht marinas",
      "Marine salt extraction restoring softness to deck towels and bed covers",
      "Flight crew uniform dry-pressing on custom hangers",
      "Emergency same-day priority handling",
    ],
  },
  {
    id: "corporate",
    name: "Corporate & Executive",
    tagline: "Enterprise Uniforms & Executive Lounges",
    description:
      "Turnkey garment care for corporate towers, financial institutions, and airline flight teams. Direct office locker pickup and RFID barcode return.",
    image: "/images/who-we-are.jpg",
    icon: Briefcase,
    volumeMetric: "100%",
    volumeLabel: "RFID Tracked Item Accuracy",
    standards: ["Barcode Tracked", "Executive Locker Service", "Corporate B2B Invoicing"],
    keyHighlights: [
      "Automated employee locker drop-off and return systems",
      "Detailed monthly itemized corporate billing & ESG sustainability reporting",
      "Hand-finished shirt service with collar stays and plastic-free packaging",
      "Dedicated corporate route driver",
    ],
  },
];

interface IndustriesSectionProps {
  onOpenBooking?: (industry?: string) => void;
}

export default function IndustriesSection({ onOpenBooking }: IndustriesSectionProps) {
  const [selectedId, setSelectedId] = useState("hospitality");

  const current = INDUSTRIES.find((ind) => ind.id === selectedId) || INDUSTRIES[0];
  const IconComponent = current.icon;

  return (
    <section
      id="industries"
      className="relative py-28 bg-[#07090e] border-t border-white/10 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/4 size-[500px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-[0.2em] bg-white/[0.03] border border-cyan-500/20 px-3.5 py-1 rounded-full mb-3">
              <Shield className="size-3.5" />
              <span>COMMERCIAL ENTERPRISE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.1]">
              BUILT FOR YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">INDUSTRY.</span>
            </h2>
          </div>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-wider max-w-sm">
            High-volume capacity with surgical grade cleanliness protocols for world-class hospitality and corporate leaders.
          </p>
        </div>

        {/* Industry Category Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {INDUSTRIES.map((ind) => {
            const isSelected = ind.id === selectedId;
            const TabIcon = ind.icon;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedId(ind.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
                  isSelected
                    ? "bg-cyan-950/70 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] font-bold"
                    : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                <TabIcon className="size-4 text-cyan-400" />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Industry Active Feature Showcase Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0e1627] via-[#090d16] to-[#05070c] border border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Content & Highlights (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                  <IconComponent className="size-5" />
                </div>
                <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest">
                  COMMERCIAL PROTOCOL // {current.id.toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-white font-bold uppercase">
                  {current.name}
                </h3>
                <p className="font-mono text-xs text-cyan-400 mt-1 uppercase tracking-wider">
                  {current.tagline}
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {current.description}
              </p>

              {/* Highlights Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {current.keyHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Metric Card Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
                <div className="hud-brackets p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                  <span className="block font-mono text-[10px] text-slate-400 uppercase">
                    Throughput Scale
                  </span>
                  <span className="block font-display text-lg text-white font-bold mt-0.5">
                    {current.volumeMetric}
                  </span>
                  <span className="block font-mono text-[9px] text-cyan-400">
                    {current.volumeLabel}
                  </span>
                </div>

                {current.standards.slice(0, 2).map((std, i) => (
                  <div key={i} className="hud-brackets p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                    <span className="block font-mono text-[10px] text-slate-400 uppercase">
                      Compliance Standard
                    </span>
                    <span className="block font-sans text-xs text-emerald-300 font-bold mt-1">
                      {std}
                    </span>
                    <span className="block font-mono text-[9px] text-slate-500">
                      Audit Verified
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() =>
                    onOpenBooking
                      ? onOpenBooking(current.name)
                      : document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs uppercase tracking-wider font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                >
                  <span>Request Custom {current.name.split(" ")[0]} Proposal</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Right: Sector Photo Preview (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-white">
                  <span className="bg-black/70 px-2.5 py-1 rounded backdrop-blur border border-white/10">
                    {current.name.toUpperCase()} FACILITY DECK
                  </span>
                  <span className="text-cyan-400">STATUS: ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
