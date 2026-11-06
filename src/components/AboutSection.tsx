"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, X, ShieldAlert, Sparkles, Droplet, Cpu, RefreshCw, Award } from "lucide-react";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<"tech" | "sustainability" | "facility">("tech");

  const comparisonRows = [
    {
      feature: "Cleansing Agent",
      traditional: "Toxic Perchloroethylene (Perc) solvent",
      luxewash: "Ionized Aqueous Ozone (O₃) + Bio-Enzymes",
      winner: "luxewash",
    },
    {
      feature: "Operating Temperature",
      traditional: "70°C – 90°C high heat (shrinks fibers)",
      luxewash: "28°C – 40°C cold-water infusion (preserves weave)",
      winner: "luxewash",
    },
    {
      feature: "Chemical Odor & Residue",
      traditional: "Pungent petroleum chemical scent",
      luxewash: "100% Odorless, crisp mountain-air freshness",
      winner: "luxewash",
    },
    {
      feature: "Fiber Lifespan Impact",
      traditional: "Fibers thin & tear after 15 washes",
      luxewash: "Tensile strength maintained for 60+ cycles",
      winner: "luxewash",
    },
    {
      feature: "Water & Energy Footprint",
      traditional: "Heavy industrial wastewater discharge",
      luxewash: "Closed-loop filtration: 48% water reduction",
      winner: "luxewash",
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#090d16] border-t border-white/10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 size-[500px] bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 size-[600px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-[0.2em] bg-white/[0.03] border border-cyan-500/20 px-3.5 py-1 rounded-full mb-3">
            <Sparkles className="size-3.5" />
            <span>The Clean Architecture</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.1]">
            ENGINEERING THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">CLEANEST LINENS</span> ON EARTH.
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Conventional laundry relies on harsh petroleum solvents and destructive thermal heat. LuxeWash fundamentally reimagines garment restoration through cold-water ozone chemistry and algorithmic reverse-axis tumbling.
          </p>
        </div>

        {/* 3 Pillars Grid with Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Pillar 1 */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 transition-all group relative overflow-hidden">
            <div className="size-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <Droplet className="size-6" />
            </div>
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
              PILLAR 01 // CHEMISTRY
            </span>
            <h3 className="font-display text-lg text-white font-bold mb-3 uppercase">
              Ionized Aqueous Ozone
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              We convert ambient oxygen into activated O₃ dissolved directly into wash water. It oxidizes soil and eliminates bacteria 3,125 times faster than chlorine bleach without degrading fabric fibers.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all group relative overflow-hidden">
            <div className="size-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="size-6" />
            </div>
            <span className="font-mono text-xs text-purple-400 uppercase tracking-widest block mb-1">
              PILLAR 02 // SENSORS
            </span>
            <h3 className="font-display text-lg text-white font-bold mb-3 uppercase">
              Optical Fiber Scanning
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every garment batch is evaluated by spectral weight and fiber density sensors, automatically adjusting drum RPM, water volume, and enzyme dosing to within 0.1% accuracy.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/40 transition-all group relative overflow-hidden">
            <div className="size-12 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <RefreshCw className="size-6" />
            </div>
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-1">
              PILLAR 03 // LOGISTICS
            </span>
            <h3 className="font-display text-lg text-white font-bold mb-3 uppercase">
              24H RFID Barcode Dispatch
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every linen bundle is tagged with thermal RFID micro-chips. From door pickup to multi-tier ozone wash, robotic press, and climate-controlled courier return: zero lost items.
            </p>
          </div>
        </div>

        {/* Facility & Technology Showcase Card */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0c1424] via-[#0d1728] to-[#0a101d] border border-white/10 p-6 sm:p-10 mb-20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase">
                  CENTRAL FACILITY · 45,000 SQ. FT.
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-white font-bold uppercase leading-snug">
                Where Industrial Throughput Meets Surgical Precision.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Our central facility houses 14 heavy-load tunnel washers and 8 computerized multi-roller ironers capable of processing 25,000 kg of luxury linens daily. Every piece leaves sterile, neutral-pH, and crisp.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div>
                  <span className="block font-display text-2xl text-white font-bold">25,000<span className="text-cyan-400 font-mono text-sm">KG</span></span>
                  <span className="block font-mono text-[10px] text-slate-400 uppercase mt-0.5">Daily Capacity</span>
                </div>
                <div>
                  <span className="block font-display text-2xl text-cyan-300 font-bold">99.98<span className="text-xs font-mono">%</span></span>
                  <span className="block font-mono text-[10px] text-slate-400 uppercase mt-0.5">Bacterial Kill Rate</span>
                </div>
                <div>
                  <span className="block font-display text-2xl text-emerald-400 font-bold">0.0<span className="text-xs font-mono">PPM</span></span>
                  <span className="block font-mono text-[10px] text-slate-400 uppercase mt-0.5">Residue Guarantee</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/industrial-facility.jpg"
                  alt="LuxeWash Central Facility"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-white">
                  <span className="bg-black/60 px-2.5 py-1 rounded backdrop-blur border border-white/10">
                    FACILITY HUB // AUTOMATED ROLLER SYSTEM
                  </span>
                  <span className="text-cyan-400">EN 14065 CERTIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Matrix: LuxeWash vs Conventional Cleaners */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">
              DIRECT BENCHMARK
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase mt-2">
              LuxeWash vs. Conventional Laundry
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              Why high-end boutique hotels, Michelin-starred culinary venues, and bespoke designers choose our molecular standard.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 font-mono text-xs uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-4">Evaluation Criteria</th>
                  <th className="py-4 px-4 text-rose-400">Conventional Dry Cleaners</th>
                  <th className="py-4 px-4 text-cyan-400 bg-cyan-950/20 rounded-t-lg">
                    LuxeWash Precision
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans text-sm">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-slate-400 flex items-center gap-2">
                      <X className="size-4 text-rose-500 shrink-0" />
                      <span>{row.traditional}</span>
                    </td>
                    <td className="py-4 px-4 text-white bg-cyan-950/20 font-medium">
                      <div className="flex items-center gap-2 text-cyan-300">
                        <Check className="size-4 text-cyan-400 shrink-0" />
                        <span>{row.luxewash}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
