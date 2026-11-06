"use client";

import React, { useState } from "react";
import {
  Scan,
  Droplets,
  RotateCcw,
  Filter,
  Wind,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface Stage {
  step: string;
  title: string;
  subtitle: string;
  time: string;
  rpm: number;
  temp: string;
  metricLabel: string;
  metricValue: string;
  description: string;
  icon: React.ElementType;
}

const STAGES: Stage[] = [
  {
    step: "01",
    title: "Optical Fiber Scan & Density Mapping",
    subtitle: "SPECTRAL FABRIC RECOGNITION",
    time: "02 MIN",
    rpm: 0,
    temp: "24°C",
    metricLabel: "FIBER RECOGNITION",
    metricValue: "100% ACCURACY",
    description:
      "High-resolution spectral cameras assess thread count, fiber blend (Egyptian cotton, pure silk, cashmere, or synthetic blends), and soil density to generate a customized wash program.",
    icon: Scan,
  },
  {
    step: "02",
    title: "Cold Aqueous Ozone Hydro-Infusion",
    subtitle: "OZONE MICRO-BUBBLE PENETRATION",
    time: "12 MIN",
    rpm: 400,
    temp: "32°C",
    metricLabel: "DISSOLVED OZONE",
    metricValue: "4.5 PPM",
    description:
      "Activated O₃ gas is micro-dissolved into chill water at 32°C. Millions of sub-micron ozone bubbles penetrate fiber pores, instantly destroying odor compounds, organic stains, and bacteria.",
    icon: Droplets,
  },
  {
    step: "03",
    title: "Dual-Axis Reverse Inversion Agitation",
    subtitle: "HYDRODYNAMIC WEAVE RESTORATION",
    time: "18 MIN",
    rpm: 950,
    temp: "38°C",
    metricLabel: "MECHANICAL WEAR",
    metricValue: "0.02% (NEGLIGIBLE)",
    description:
      "Computer-controlled alternating reverse drum rotations ensure clothes do not tangle or pull. Water streams hydro-float the garments, mimicking delicate hand-washing with commercial force.",
    icon: RotateCcw,
  },
  {
    step: "04",
    title: "Triple Hyper-Filtered Pure Rinse",
    subtitle: "SUB-MICRON REVERSE OSMOSIS",
    time: "08 MIN",
    rpm: 800,
    temp: "26°C",
    metricLabel: "CHEMICAL RESIDUE",
    metricValue: "0.00 PPM",
    description:
      "Three cycles of pure reverse-osmosis filtered water flush out every trace of surfactant and bio-enzyme. Ideal for hyper-sensitive skin and high-end hospital / baby care standards.",
    icon: Filter,
  },
  {
    step: "05",
    title: "Centrifugal Extraction & Sonic Air Dry",
    subtitle: "1600 RPM TURBOSPIN & MOISTURE DETECT",
    time: "14 MIN",
    rpm: 1600,
    temp: "42°C",
    metricLabel: "MOISTURE REMOVAL",
    metricValue: "88.4%",
    description:
      "Precision balanced spin reaches 1600 RPM without vibration. Garments emerge gently damp and transfer to low-temperature laminar air tunnels that de-wrinkle and fluff without scorching.",
    icon: Wind,
  },
];

export default function WashTrajectory() {
  const [activeStageIndex, setActiveStageIndex] = useState(1); // default stage 2

  const activeStage = STAGES[activeStageIndex];

  return (
    <section
      id="trajectory"
      className="relative py-28 bg-[#07090e] border-t border-white/10 overflow-hidden"
    >
      {/* Background Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-[600px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-[0.2em] bg-white/[0.03] border border-cyan-500/20 px-3.5 py-1 rounded-full mb-3">
              <Zap className="size-3.5 text-cyan-300" />
              <span>THE 5-STAGE PRECISION PATH</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.1]">
              THE MOLECULAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">CLEANING</span> TRAJECTORY.
            </h2>
          </div>
          <div className="font-mono text-xs text-slate-400 uppercase tracking-widest text-right">
            STAGE PROGRESS:{" "}
            <span className="text-cyan-400 font-bold text-sm">
              0{activeStageIndex + 1} / 0{STAGES.length}
            </span>
          </div>
        </div>

        {/* Interactive Step Navigator Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {STAGES.map((s, idx) => {
            const Icon = s.icon;
            const isActive = idx === activeStageIndex;
            const isCompleted = idx < activeStageIndex;

            return (
              <button
                key={s.step}
                onClick={() => setActiveStageIndex(idx)}
                className={`relative p-4 rounded-xl text-left border transition-all ${
                  isActive
                    ? "bg-cyan-950/60 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] text-white"
                    : isCompleted
                    ? "bg-white/[0.04] border-white/20 text-slate-300 hover:border-cyan-500/40"
                    : "bg-white/[0.02] border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-bold tracking-wider ${
                      isActive ? "text-cyan-400" : isCompleted ? "text-emerald-400" : "text-slate-500"
                    }`}
                  >
                    STAGE {s.step}
                  </span>
                  <Icon className="size-4 opacity-80" />
                </div>
                <div className="font-sans font-bold text-xs line-clamp-1 text-slate-100">
                  {s.title}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  {s.time} · {s.temp}
                </div>

                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute -bottom-px left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_#38bdf8]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Stage Interactive Visualizer & Telemetry Display Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0e1524] via-[#090d16] to-[#06080d] border border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Active Stage Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 uppercase tracking-widest">
                  STAGE {activeStage.step} // ACTIVE
                </span>
                <span className="font-mono text-xs text-slate-400 tracking-wider">
                  {activeStage.subtitle}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl text-white font-bold uppercase leading-snug">
                {activeStage.title}
              </h3>

              <p className="text-slate-300 text-base leading-relaxed">
                {activeStage.description}
              </p>

              {/* Technical Telemetry Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="hud-brackets p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                  <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                    Process Duration
                  </span>
                  <span className="block font-display text-lg text-white font-bold mt-1">
                    {activeStage.time}
                  </span>
                </div>

                <div className="hud-brackets p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                  <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                    Drum Velocity
                  </span>
                  <span className="block font-display text-lg text-cyan-300 font-bold mt-1">
                    {activeStage.rpm} <span className="text-xs font-mono">RPM</span>
                  </span>
                </div>

                <div className="hud-brackets p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                  <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                    {activeStage.metricLabel}
                  </span>
                  <span className="block font-display text-lg text-emerald-400 font-bold mt-1">
                    {activeStage.metricValue}
                  </span>
                </div>
              </div>

              {/* Next Stage Button */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() =>
                    setActiveStageIndex((prev) => (prev + 1) % STAGES.length)
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                >
                  <span>Advance to Next Stage</span>
                  <ChevronRight className="size-4" />
                </button>
                <span className="font-mono text-xs text-slate-500">
                  Click any stage tab above to inspect parameters
                </span>
              </div>
            </div>

            {/* Right: Graphic Schematic Representation (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative size-72 sm:size-80 rounded-full border border-cyan-500/30 bg-cyan-950/20 p-6 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.15)]">
                {/* Orbit Rings */}
                <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/20 animate-spin-drum" />
                <div className="absolute inset-6 rounded-full border border-white/10 animate-spin-drum-reverse" />

                {/* Center Core */}
                <div className="relative size-40 rounded-full bg-gradient-to-tr from-cyan-950 via-slate-900 to-[#0c1424] border-2 border-cyan-400/60 flex flex-col items-center justify-center text-center p-4 shadow-2xl">
                  {React.createElement(activeStage.icon, {
                    className: "size-10 text-cyan-300 animate-pulse mb-2",
                  })}
                  <span className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase">
                    STAGE {activeStage.step}
                  </span>
                  <span className="font-display text-xs text-white font-bold uppercase mt-0.5 line-clamp-1">
                    {activeStage.metricValue}
                  </span>
                </div>

                {/* Floating Orbiting Satellite Indicators */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/80 border border-cyan-500/40 font-mono text-[9px] text-cyan-300">
                  O₃ OZONE LEVEL: 4.5 PPM
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/80 border border-emerald-500/40 font-mono text-[9px] text-emerald-300">
                  TEMP: {activeStage.temp}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
