"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, Sparkles, Check, Clock, ShieldCheck } from "lucide-react";

interface EstimatorProps {
  onSelectEstimate?: (summary: string) => void;
}

export default function InteractiveEstimator({ onSelectEstimate }: EstimatorProps) {
  const [garmentKg, setGarmentKg] = useState<number>(10);
  const [beddingSets, setBeddingSets] = useState<number>(2);
  const [couturePieces, setCouturePieces] = useState<number>(1);
  const [serviceSpeed, setServiceSpeed] = useState<"standard" | "express">("standard");

  // Price Calculation:
  // Base: $3.50 per kg of everyday garments
  // Bedding set: $14.00 per set
  // Couture piece: $18.00 per piece
  // Express 4h multiplier: 1.35x
  const baseCost = garmentKg * 3.5 + beddingSets * 14.0 + couturePieces * 18.0;
  const speedMultiplier = serviceSpeed === "express" ? 1.35 : 1.0;
  const estimatedTotal = Math.round(baseCost * speedMultiplier);

  const turnaroundTime = serviceSpeed === "express" ? "< 4 Hours Express" : "24 Hours Standard";

  const handleBook = () => {
    const summary = `${garmentKg}kg Garments, ${beddingSets} Bedding Sets, ${couturePieces} Couture Items (${serviceSpeed.toUpperCase()} Speed ~ $${estimatedTotal})`;
    if (onSelectEstimate) {
      onSelectEstimate(summary);
    } else {
      const contactEl = document.getElementById("contact");
      contactEl?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-24 bg-[#090d16] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#0b101c] to-[#07090e] border border-cyan-500/30 p-6 sm:p-12 shadow-[0_20px_60px_rgba(6,182,212,0.15)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Interactive Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full mb-3">
                  <Calculator className="size-3.5" />
                  <span>INSTANT VOLUME ESTIMATOR</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-white font-bold uppercase">
                  Calculate Your Wash Requirements
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Adjust your weekly or one-time batch sizes below for an instant turnaround and cost projection.
                </p>
              </div>

              {/* Slider 1: Everyday Garments (Kg) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 uppercase tracking-wider">
                    Everyday Garments (Wash & Fold)
                  </span>
                  <span className="text-cyan-400 font-bold text-sm">{garmentKg} KG</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="60"
                  step="2"
                  value={garmentKg}
                  onChange={(e) => setGarmentKg(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>2 kg (Quick Load)</span>
                  <span>30 kg</span>
                  <span>60 kg (Family / Commercial)</span>
                </div>
              </div>

              {/* Slider 2: Bedding & Duvet Sets */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 uppercase tracking-wider">
                    Luxury Bedding & Duvet Sets (Queen / King)
                  </span>
                  <span className="text-cyan-400 font-bold text-sm">{beddingSets} SETS</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="1"
                  value={beddingSets}
                  onChange={(e) => setBeddingSets(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0 sets</span>
                  <span>6 sets</span>
                  <span>12 sets (Boutique Villa)</span>
                </div>
              </div>

              {/* Slider 3: Couture & Atelier Items */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 uppercase tracking-wider">
                    Couture, Silk & Suit Pieces
                  </span>
                  <span className="text-cyan-400 font-bold text-sm">{couturePieces} PIECES</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={couturePieces}
                  onChange={(e) => setCouturePieces(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0 pieces</span>
                  <span>5 pieces</span>
                  <span>10 pieces</span>
                </div>
              </div>

              {/* Service Speed Toggle */}
              <div className="pt-2">
                <span className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Select Turnaround Speed:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setServiceSpeed("standard")}
                    className={`py-3 px-4 rounded-xl border font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      serviceSpeed === "standard"
                        ? "bg-cyan-950/70 border-cyan-400 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Clock className="size-3.5 text-cyan-400" />
                    <span>24H Standard Care</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceSpeed("express")}
                    className={`py-3 px-4 rounded-xl border font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      serviceSpeed === "express"
                        ? "bg-cyan-950/70 border-cyan-400 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Sparkles className="size-3.5 text-amber-400" />
                    <span>&lt; 4H Express VIP</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Projected Summary Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="p-7 rounded-2xl bg-gradient-to-b from-[#131c2e] to-[#0a0f1b] border border-cyan-500/40 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                    ESTIMATED TOTAL
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    <ShieldCheck className="size-3" />
                    NO HIDDEN CHARGES
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl sm:text-5xl font-black text-white tabular-nums">
                      ${estimatedTotal}
                    </span>
                    <span className="font-mono text-xs text-slate-400 uppercase">
                      / Est. Net
                    </span>
                  </div>
                  <p className="font-mono text-xs text-cyan-300 mt-2">
                    Turnaround SLA: <span className="font-bold">{turnaroundTime}</span>
                  </p>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-4 mb-6 font-mono text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Garment Processing:</span>
                    <span>{garmentKg} kg (Ozone wash)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bedding Sanitize:</span>
                    <span>{beddingSets} Luxury Sets</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Couture Atelier:</span>
                    <span>{couturePieces} Fine pieces</span>
                  </div>
                  <div className="flex justify-between text-cyan-400 font-bold pt-1 border-t border-white/5">
                    <span>Doorstep Logistics:</span>
                    <span>COMPLIMENTARY</span>
                  </div>
                </div>

                <button
                  onClick={handleBook}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-mono text-xs uppercase tracking-wider font-extrabold shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <span>Book This Estimate</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
