"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Shirt,
  Scissors,
  Bed,
  Heart,
  Crown,
  Clock,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface OurServicesProps {
  onSelectService: (serviceName: string) => void;
  onOpenCalculator: () => void;
}

export default function OurServices({
  onSelectService,
  onOpenCalculator,
}: OurServicesProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", label: "All Services" },
    { id: "wash-fold", label: "Wash & Fold" },
    { id: "dry-clean", label: "Dry Cleaning" },
    { id: "steam-press", label: "Steam Press" },
    { id: "home-bedding", label: "Bedding & Home" },
    { id: "couture", label: "Couture & Gowns" },
  ];

  const services = [
    {
      id: "wf-1",
      category: "wash-fold",
      name: "Artisanal Wash & Fold",
      tagline: "Everyday luxury for your casuals & business wear",
      price: "$2.50",
      unit: "per lb",
      turnaround: "24 Hours",
      popular: true,
      features: [
        "Light & dark garment separation",
        "Hypoallergenic organic detergents",
        "Gentle tumble dry with wool dryer balls",
        "Crisp military-grade folding & banding",
        "Delivered in sealed breathable bags",
      ],
      description:
        "Say goodbye to laundry day forever. We weigh, wash, fluff, and fold your daily clothes with signature lavender-scented freshness.",
    },
    {
      id: "dc-1",
      category: "dry-clean",
      name: "Executive Couture Dry Cleaning",
      tagline: "Precision hydrocarbon cleaning for suits & dresses",
      price: "$9.50",
      unit: "per item",
      turnaround: "24 - 48 Hours",
      popular: true,
      features: [
        "Zero-odor non-toxic solvent technology",
        "Specialist collar & cuff stain extraction",
        "Hand inspection of buttons & seams",
        "Complimentary minor stitch repairs",
        "Custom wooden hanger & dust cover",
      ],
      description:
        "Formulated specifically for fine wools, cashmere, silks, and tailored suits without toxic perc chemicals or stiff residues.",
    },
    {
      id: "sp-1",
      category: "steam-press",
      name: "Italian Hand Steam Pressing",
      tagline: "Crisp, wrinkle-free lines without heat damage",
      price: "$4.00",
      unit: "per garment",
      turnaround: "Same Day / 24h",
      popular: false,
      features: [
        "High-pressure micro-steam treatment",
        "Zero shine or fabric scorch risk",
        "Sharp creases on trousers & pleats",
        "Button-safe pressing contours",
        "Delivered on hanger with shoulder guards",
      ],
      description:
        "For already-washed shirts and garments that need immaculate shaping and crisp presentation before big meetings or events.",
    },
    {
      id: "hb-1",
      category: "home-bedding",
      name: "Luxury Duvet, Linen & Curtains",
      tagline: "Deep allergen extraction for home sanctuaries",
      price: "$24.00",
      unit: "per set",
      turnaround: "48 Hours",
      popular: false,
      features: [
        "Anti-dust-mite thermal sterilization",
        "Down & feather gentle restoration",
        "Curtain drape steam rejuvenation",
        "Oversized commercial drum wash",
        "Vacuum-sealed storage packaging",
      ],
      description:
        "Revitalize king/queen duvets, comforters, memory foam covers, and designer draperies with restorative freshness.",
    },
    {
      id: "cg-1",
      category: "couture",
      name: "Wedding Gown & Evening Couture",
      tagline: "Museum-grade heirloom preservation",
      price: "$85.00",
      unit: "from",
      turnaround: "3 - 5 Days",
      popular: false,
      features: [
        "Micro-bead & lace hand inspection",
        "Acid-free preservation archival box",
        "UV and moisture barrier seal",
        "Before-and-after photo report",
        "Lifetime anti-yellowing warranty",
      ],
      description:
        "Cherish your wedding gown or red-carpet attire for generations with our bespoke preservation process.",
    },
    {
      id: "sl-1",
      category: "dry-clean",
      name: "Leather, Suede & Designer Bag Spa",
      tagline: "Conditioning, stain lifting & color revival",
      price: "$35.00",
      unit: "from",
      turnaround: "3 Days",
      popular: false,
      features: [
        "Natural wax & oil reconditioning",
        "Water & stain repellent coating",
        "Hardware polishing & scratch smoothing",
        "Shape retention stuffing",
        "Certified leather artisan care",
      ],
      description:
        "Restore supple softness and lustrous depth to your luxury leather jackets, handbags, boots, and suede garments.",
    },
  ];

  const filteredServices =
    activeFilter === "all"
      ? services
      : services.filter((s) => s.category === activeFilter);

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#faf7fd] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-900 text-xs font-black uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>OUR SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Tailored Garment Care For Every{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-amber-600">
              Fabric In Your Wardrobe
            </span>
          </h2>
          <p className="mt-4 text-slate-600 text-base">
            From daily work shirts to delicate designer evening gowns, experience specialized fabric attention backed by a 100% re-clean warranty.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeFilter === cat.id
                    ? "bg-purple-900 text-amber-300 shadow-md shadow-purple-950/20 scale-105"
                    : "bg-white text-slate-600 hover:text-purple-900 hover:bg-purple-50 border border-purple-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`relative rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 ${
                service.popular
                  ? "border-amber-400 shadow-xl shadow-purple-950/10 ring-2 ring-amber-400/30"
                  : "border-purple-100 shadow-md hover:shadow-xl hover:border-purple-300"
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-purple-950 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  <span>Most Popular</span>
                </div>
              )}

              <div className="p-7">
                {/* Header info */}
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Turnaround: {service.turnaround}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-purple-900 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {service.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mb-6 p-4 rounded-2xl bg-[#faf7fd] border border-purple-100/60 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-semibold block">Starting at</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-purple-950">{service.price}</span>
                      <span className="text-xs font-semibold text-slate-600">/{service.unit}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Free Pickup & Delivery
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features Checklist */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-7 pt-0">
                <button
                  onClick={() => onSelectService(service.name)}
                  className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 ${
                    service.popular
                      ? "bg-gradient-to-r from-purple-900 to-[#32083d] hover:from-purple-800 hover:to-amber-600 text-white shadow-md shadow-purple-950/20"
                      : "bg-purple-50 hover:bg-purple-900 text-purple-900 hover:text-white"
                  }`}
                >
                  <span>Book {service.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Quick Price Calculator Banner Trigger */}
        <div className="p-8 rounded-3xl bg-white border-2 border-dashed border-purple-200 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-left">
            <h4 className="text-lg font-bold text-slate-900">
              Want to see an instant laundry estimate?
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Select items (shirts, suits, bedsheets, shoes) in our interactive pricing tool.
            </p>
          </div>

          <button
            onClick={onOpenCalculator}
            className="px-6 py-3 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Launch Price Calculator</span>
          </button>
        </div>

      </div>
    </section>
  );
}
