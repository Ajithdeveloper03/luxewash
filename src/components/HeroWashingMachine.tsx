"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCw,
  Droplets,
  Flame,
  Zap,
  Shield,
  Gauge,
  Sparkles,
  ArrowDown,
  Volume2,
  Lock,
  Unlock,
} from "lucide-react";

interface CycleMode {
  id: string;
  name: string;
  temp: number;
  rpm: number;
  color: string;
  tag: string;
  description: string;
  stageName: string;
}

const CYCLE_MODES: CycleMode[] = [
  {
    id: "eco",
    name: "Ozone Eco-Wash",
    temp: 38,
    rpm: 1200,
    color: "#06b6d4", // cyan
    tag: "MOST POPULAR",
    description: "Ionized cold-water ozone eliminates 99.9% of bacteria while saving 48% energy.",
    stageName: "OZONE DISSOLUTION · CYCLE 02",
  },
  {
    id: "delicate",
    name: "Couture & Silk",
    temp: 28,
    rpm: 600,
    color: "#a855f7", // purple
    tag: "ZERO STRETCH",
    description: "Gentle pendulum swing protects delicate silk, cashmere, and hand-embroidered weaves.",
    stageName: "PENDULUM ROCKING · STAGE 01",
  },
  {
    id: "turbo",
    name: "Turbo Spin 1600",
    temp: 40,
    rpm: 1600,
    color: "#38bdf8", // foam blue
    tag: "RAPID DRY",
    description: "High-velocity centrifugal extraction removes 88% moisture before warm-air fluffing.",
    stageName: "CENTRIFUGAL EXTRACTION",
  },
  {
    id: "sanitize",
    name: "Hospital Sanitize",
    temp: 65,
    rpm: 1400,
    color: "#f59e0b", // amber
    tag: "CLINICAL 65°C",
    description: "Thermal steam infusion exceeding CDC & hospital hygiene standards for luxury bedding.",
    stageName: "THERMAL STEAM STERILIZE",
  },
];

interface HeroWashingMachineProps {
  onOpenBooking?: (service?: string) => void;
}

export default function HeroWashingMachine({ onOpenBooking }: HeroWashingMachineProps) {
  const [activeCycle, setActiveCycle] = useState<CycleMode>(CYCLE_MODES[0]);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [doorOpen, setDoorOpen] = useState<boolean>(false);
  const [bubblesActive, setBubblesActive] = useState<boolean>(true);
  const [currentRpm, setCurrentRpm] = useState<number>(1200);
  const [timerSeconds, setTimerSeconds] = useState<number>(1462); // 24m 22s
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Timer countdown
  useEffect(() => {
    if (!isRunning || doorOpen) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 1800));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, doorOpen]);

  // Smooth RPM ramping when changing cycles or pausing
  useEffect(() => {
    const targetRpm = !isRunning || doorOpen ? 0 : activeCycle.rpm;
    let animId: number;

    const ramp = () => {
      setCurrentRpm((prev) => {
        const diff = targetRpm - prev;
        if (Math.abs(diff) < 5) return targetRpm;
        return prev + diff * 0.08;
      });
      if (Math.abs(targetRpm - currentRpm) > 2) {
        animId = requestAnimationFrame(ramp);
      }
    };
    animId = requestAnimationFrame(ramp);
    return () => cancelAnimationFrame(animId);
  }, [activeCycle, isRunning, doorOpen, currentRpm]);

  // Canvas Bubble & Water Motes Particle Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }

    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      x: width / 2 + (Math.random() - 0.5) * (width * 0.7),
      y: height / 2 + (Math.random() - 0.5) * (height * 0.7),
      radius: Math.random() * 5 + 2,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -Math.random() * 2 - 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? "#38bdf8" : "#ffffff",
    }));

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (bubblesActive && isRunning && !doorOpen) {
        const speedMultiplier = currentRpm / 1000;
        angle += 0.05 * speedMultiplier;

        // Draw swirling foam particles
        particles.forEach((p) => {
          // Centrifugal swirling effect
          const cx = width / 2;
          const cy = height / 2;
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Rotate around drum center
          const currentAngle = Math.atan2(dy, dx);
          const newAngle = currentAngle + 0.04 * speedMultiplier;
          p.x = cx + Math.cos(newAngle) * dist;
          p.y = cy + Math.sin(newAngle) * dist;

          // Buoyancy drift upwards
          p.y += p.vy;

          // Reset if escaped the drum circle
          const drumRadius = width * 0.42;
          if (dist > drumRadius || p.y < cy - drumRadius) {
            p.x = cx + (Math.random() - 0.5) * (drumRadius * 0.8);
            p.y = cy + drumRadius * 0.7;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowBlur = 8;
          ctx.shadowColor = activeCycle.color;
          ctx.fill();
        });
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [bubblesActive, isRunning, doorOpen, activeCycle, currentRpm]);

  // Format countdown clock: MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Drum rotation style based on current RPM
  const drumRotationDuration =
    currentRpm > 0 ? `${Math.max(0.35, 60 / currentRpm)}s` : "0s";

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-20 overflow-hidden flex flex-col justify-center bg-radial from-[#0c1322] via-[#07090e] to-[#040508]"
    >
      {/* Background Star/Dust Field */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/5 size-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 size-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Top Eyebrow / Telemetry Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] uppercase tracking-widest">
              <span className="size-1.5 rounded-full bg-cyan-400 animate-ping" />
              FACILITY NODE 01 · HYDRO-DYNAMICS
            </span>
            <span className="hidden sm:inline font-mono text-xs text-slate-400 tracking-wider uppercase">
              // ZERO PHOSPHATE PROTOCOL
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs text-slate-300">
            <div>
              <span className="text-slate-500 mr-2">PURITY:</span>
              <span className="text-cyan-400 font-bold">99.98% OZONE</span>
            </div>
            <div>
              <span className="text-slate-500 mr-2">PRESSURE:</span>
              <span className="text-white font-bold">4.2 BAR</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-slate-500 mr-2">TURNAROUND:</span>
              <span className="text-emerald-400 font-bold">&lt; 24 HOURS</span>
            </div>
          </div>
        </div>

        {/* Hero Grid: Left Copy & Controls, Center Laundry Machine, Right Telemetry Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline, Copy & Cycle Selectors (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-[0.2em] uppercase bg-white/[0.03] border border-cyan-500/20 px-3 py-1 rounded-full">
                <Sparkles className="size-3.5 text-cyan-300" />
                <span>Next-Gen Textile Engineering</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl xl:text-5xl font-black text-white leading-[1.08] tracking-tight uppercase">
                WHERE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">COUTURE</span> MEETS{" "}
                <span className="underline decoration-cyan-500/50 decoration-wavy decoration-2">SCALE.</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Luxewash operates industrial-grade molecular ozone washers engineered to restore fibers, extract micro-particulates, and deliver pristine linens without fiber wear.
              </p>
            </div>

            {/* Cycle Selector Buttons */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-wider">
                <span>Select Drum Cycle Preset:</span>
                <span className="text-cyan-400 font-bold">{activeCycle.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CYCLE_MODES.map((mode) => {
                  const isSelected = activeCycle.id === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => {
                        setActiveCycle(mode);
                        setIsRunning(true);
                      }}
                      className={`relative flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? "bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)] text-white"
                          : "bg-white/[0.02] border-white/10 hover:border-white/30 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono text-[10px] tracking-wider uppercase text-cyan-400">
                          {mode.tag}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          {mode.rpm} RPM
                        </span>
                      </div>
                      <span className="font-sans font-bold text-xs mt-1 text-slate-100">
                        {mode.name}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400 mt-0.5">
                        {mode.temp}°C · Micro-Ozone
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() =>
                  onOpenBooking
                    ? onOpenBooking(activeCycle.name)
                    : document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-mono text-xs uppercase tracking-wider font-extrabold shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all transform active:scale-95 flex items-center gap-2"
              >
                <Zap className="size-4 fill-current" />
                <span>Book Wash Collection</span>
              </button>

              <a
                href="#trajectory"
                className="px-5 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <span>5-Stage Trajectory</span>
                <ArrowDown className="size-3.5" />
              </a>
            </div>
          </div>

          {/* Center Column: The Animated Laundry Machine (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Washing Machine Outer Body / Housing */}
            <div className="relative w-full max-w-[480px] aspect-square rounded-[36px] bg-gradient-to-b from-[#182133] via-[#0f1624] to-[#0a0e18] p-5 sm:p-7 border border-slate-700/60 shadow-[0_30px_90px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)]">
              {/* Machine Top Bevel & Digital Control Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                  <span className="font-display text-xs tracking-[0.2em] font-bold text-white uppercase">
                    LUXE-WASH <span className="text-cyan-400 font-mono">SERIES X</span>
                  </span>
                </div>

                {/* Machine Digital LED Display Ring */}
                <div className="flex items-center gap-3 bg-black/60 border border-cyan-500/30 rounded-lg px-3 py-1 font-mono text-xs">
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] text-slate-400 tracking-wider">TIMER</span>
                    <span className="text-cyan-300 font-bold tracking-widest tabular-nums text-sm">
                      {formatTime(timerSeconds)}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-white/10" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 tracking-wider">SPEED</span>
                    <span className="text-white font-bold tracking-widest tabular-nums text-sm">
                      {Math.round(currentRpm)} <span className="text-[10px] text-cyan-400">RPM</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* The Circular Drum Assembly with Door & Glass Reflection */}
              <div className="relative w-full aspect-square flex items-center justify-center">
                {/* Ambient Glow Ring */}
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-40 transition-colors duration-700"
                  style={{ backgroundColor: activeCycle.color }}
                />

                {/* Outer Circular Chrome Bezel */}
                <div className="relative size-full rounded-full p-3 sm:p-4 bg-gradient-to-br from-slate-300 via-slate-600 to-slate-900 border-2 border-slate-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center overflow-hidden">
                  {/* Outer Gasket / Rubber Seal (Dark Charcoal with Grips) */}
                  <div className="relative size-full rounded-full bg-gradient-to-br from-[#121620] via-[#0d1017] to-[#181d29] p-2 sm:p-3 border-4 border-[#07090e] shadow-[inset_0_0_30px_rgba(0,0,0,0.95)] flex items-center justify-center overflow-hidden">
                    {/* Inner Rotating Drum (Stainless Steel with Perforated Holes & Lifters) */}
                    <div
                      className="relative size-full rounded-full overflow-hidden bg-[#070b13] flex items-center justify-center"
                      style={{
                        boxShadow: "inset 0 0 50px rgba(0,0,0,0.9)",
                      }}
                    >
                      {/* Rotating Stainless Steel Grid Layer */}
                      <div
                        className="absolute inset-[-10%] rounded-full opacity-60 pointer-events-none"
                        style={{
                          backgroundImage: `radial-gradient(circle at center, transparent 40%, rgba(15,23,42,0.8) 100%), 
                            radial-gradient(#94a3b8 1.5px, transparent 1.5px)`,
                          backgroundSize: "100% 100%, 14px 14px",
                          animation:
                            isRunning && !doorOpen
                              ? `drum-spin ${drumRotationDuration} linear infinite`
                              : "none",
                        }}
                      />

                      {/* 3D Drum Lifter Baffles (Agitator fins rotating) */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          animation:
                            isRunning && !doorOpen
                              ? `drum-spin ${drumRotationDuration} linear infinite`
                              : "none",
                        }}
                      >
                        {/* Fin 1 */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-16 bg-gradient-to-b from-slate-400 via-slate-600 to-transparent clip-path-polygon rounded-b-md opacity-80 shadow-lg" />
                        {/* Fin 2 */}
                        <div className="absolute bottom-6 left-6 w-16 h-8 bg-gradient-to-tr from-slate-400 via-slate-600 to-transparent rounded-r-md opacity-80 shadow-lg rotate-45" />
                        {/* Fin 3 */}
                        <div className="absolute bottom-6 right-6 w-16 h-8 bg-gradient-to-tl from-slate-400 via-slate-600 to-transparent rounded-l-md opacity-80 shadow-lg -rotate-45" />
                      </div>

                      {/* Tumbling Clothes / Linen Fabrics Inside Drum */}
                      <div
                        className="absolute inset-4 pointer-events-none flex items-center justify-center"
                        style={{
                          animation:
                            isRunning && !doorOpen
                              ? `drum-spin ${drumRotationDuration} linear infinite`
                              : "none",
                        }}
                      >
                        {/* Violet Cashmere Garment */}
                        <div className="absolute size-20 rounded-3xl bg-gradient-to-tr from-purple-800 to-violet-500 opacity-90 blur-[0.5px] transform translate-x-8 -translate-y-6 rotate-12 shadow-md animate-pulse" />
                        {/* Cyan Silk Shirt */}
                        <div className="absolute size-24 rounded-full bg-gradient-to-br from-cyan-600 to-sky-400 opacity-85 blur-[0.5px] transform -translate-x-10 translate-y-4 -rotate-45 shadow-lg" />
                        {/* Crisp White Egyptian Hotel Sheet */}
                        <div className="absolute size-28 rounded-2xl bg-gradient-to-br from-white via-slate-100 to-slate-300 opacity-95 transform -translate-y-10 translate-x-1 rotate-45 shadow-xl" />
                        {/* Coral Accent Garment */}
                        <div className="absolute size-16 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 opacity-80 transform translate-x-12 translate-y-8 rotate-90" />
                      </div>

                      {/* Animated Water Layer Sloshing at the bottom */}
                      {isRunning && !doorOpen && (
                        <div className="absolute bottom-0 left-0 right-0 h-2/5 overflow-hidden pointer-events-none opacity-75">
                          <div
                            className="absolute -inset-x-10 bottom-0 h-32 rounded-t-[50%] bg-gradient-to-t from-cyan-500/80 via-blue-500/50 to-transparent animate-water"
                            style={{
                              boxShadow: "0 0 20px rgba(6,182,212,0.8)",
                            }}
                          />
                        </div>
                      )}

                      {/* Canvas Bubbles & Suds Particle Layer */}
                      <canvas
                        ref={canvasRef}
                        className="absolute inset-0 size-full pointer-events-none z-10"
                      />

                      {/* Center Hubcap / Motor Axle Cap */}
                      <div className="relative size-16 sm:size-20 rounded-full bg-gradient-to-br from-slate-400 via-slate-700 to-slate-900 border-2 border-slate-400/50 shadow-[0_5px_15px_rgba(0,0,0,0.8)] flex items-center justify-center z-10">
                        <div className="size-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 animate-spin-drum-fast flex items-center justify-center">
                          <span className="size-2 rounded-full bg-white shadow-[0_0_6px_#fff]" />
                        </div>
                      </div>

                      {/* Door Glass Layer with Specular Reflections */}
                      <div
                        className={`door-glass absolute inset-0 rounded-full transition-transform duration-700 origin-left z-20 pointer-events-none ${
                          doorOpen ? "transform -rotate-y-50 scale-95 opacity-50" : ""
                        }`}
                      >
                        {/* Diagonal High-Gloss Reflection Stripe */}
                        <div className="absolute top-4 left-8 w-2/3 h-1/2 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-full transform -rotate-45 blur-xs" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Door Handle & Lock Mechanism */}
                <button
                  onClick={() => setDoorOpen(!doorOpen)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-30 p-2.5 rounded-full bg-gradient-to-r from-slate-700 to-slate-900 border border-white/20 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 shadow-xl transition-all"
                  title={doorOpen ? "Close Door" : "Open Drum Door"}
                >
                  {doorOpen ? <Unlock className="size-4 text-amber-400" /> : <Lock className="size-4" />}
                </button>
              </div>

              {/* Bottom Machine Interactive Quick Buttons */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (doorOpen) setDoorOpen(false);
                      setIsRunning(!isRunning);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                      isRunning && !doorOpen
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
                        : "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    }`}
                  >
                    {isRunning && !doorOpen ? (
                      <>
                        <Pause className="size-3.5 fill-current" />
                        <span>Pause Drum</span>
                      </>
                    ) : (
                      <>
                        <Play className="size-3.5 fill-current" />
                        <span>Start Drum</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setBubblesActive(!bubblesActive)}
                    className={`p-2 rounded-lg border font-mono text-xs transition-colors ${
                      bubblesActive
                        ? "bg-cyan-950/60 border-cyan-500/40 text-cyan-300"
                        : "bg-white/5 border-white/10 text-slate-400"
                    }`}
                    title="Toggle Micro-Bubble Injection"
                  >
                    <Droplets className="size-4" />
                  </button>

                  <button
                    onClick={() => setDoorOpen(!doorOpen)}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
                    title="Open / Close Drum Door"
                  >
                    <RotateCw className="size-4" />
                  </button>
                </div>

                <div className="font-mono text-[11px] text-slate-400 tracking-wider">
                  STATUS:{" "}
                  <span
                    className="font-bold uppercase"
                    style={{ color: isRunning && !doorOpen ? activeCycle.color : "#94a3b8" }}
                  >
                    {doorOpen ? "DOOR OPEN" : isRunning ? "WASHING ACTIVE" : "PAUSED"}
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-Machine Status Strip */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Shield className="size-3.5 text-cyan-400" />
                <span>Ozone Sterilized</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Flame className="size-3.5 text-amber-400" />
                <span>Zero Thermal Wear</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Gauge className="size-3.5 text-blue-400" />
                <span>1600 Max RPM Extract</span>
              </span>
            </div>
          </div>
        </div>

        {/* Telemetry HUD Bottom Strip (SELENE Style) */}
        <div className="mt-14 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="hud-brackets p-4 bg-white/[0.02] border border-white/5 rounded-lg">
            <span className="block font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">
              Current Phase
            </span>
            <span className="block font-display text-sm sm:text-base text-white font-bold mt-1 uppercase">
              {activeCycle.stageName}
            </span>
            <span className="block font-mono text-[10px] text-cyan-400 mt-0.5">
              Molecular Inversion
            </span>
          </div>

          <div className="hud-brackets p-4 bg-white/[0.02] border border-white/5 rounded-lg">
            <span className="block font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">
              Extraction RPM
            </span>
            <span className="block font-display text-sm sm:text-base text-cyan-300 font-bold mt-1 tabular-nums">
              {Math.round(currentRpm)} <span className="text-xs font-mono font-normal">RPM</span>
            </span>
            <span className="block font-mono text-[10px] text-slate-400 mt-0.5">
              Controlled Centrifugal
            </span>
          </div>

          <div className="hud-brackets p-4 bg-white/[0.02] border border-white/5 rounded-lg">
            <span className="block font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">
              Water Temp
            </span>
            <span className="block font-display text-sm sm:text-base text-white font-bold mt-1 tabular-nums">
              {activeCycle.temp}°C / {Math.round((activeCycle.temp * 9) / 5 + 32)}°F
            </span>
            <span className="block font-mono text-[10px] text-emerald-400 mt-0.5">
              Cold Ozone Active
            </span>
          </div>

          <div className="hud-brackets p-4 bg-white/[0.02] border border-white/5 rounded-lg">
            <span className="block font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">
              Residual Chemical
            </span>
            <span className="block font-display text-sm sm:text-base text-white font-bold mt-1">
              0.00% PPM
            </span>
            <span className="block font-mono text-[10px] text-cyan-400 mt-0.5">
              100% Skin Safe
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
