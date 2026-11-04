"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroBannerProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
}

export default function HeroBanner({
  onOpenBooking,
  onOpenCalculator,
}: HeroBannerProps) {
  return (
    <section
      id="hero"
      className="relative bg-[#0d0216] text-white overflow-hidden min-h-[560px] lg:min-h-[640px] flex items-stretch border-b border-purple-950"
    >
      {/* 1. Global Background: Dark Dot Grid Matrix (Matching Reference 1 exactly) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#d4af37_1.2px,transparent_1.2px)] [background-size:22px_22px]" />
      
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-purple-700/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 2. Main Full-Bleed Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between">
        
        {/* ======================================================== */}
        {/* LEFT SECTION: Wireframe HUD Box with exact Ref 1 layout */}
        {/* ======================================================== */}
        <div className="w-full lg:w-[54%] py-12 lg:py-16 relative z-20">
          
          {/* Wireframe Outline Box (Exact match of Reference 1's green technical HUD frame) */}
          <div className="relative pt-8 pb-10 pl-6 sm:pl-10 pr-4">
            
            {/* Top-Left Corner & Top Line with open slot for 100% SATISFACTION */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400 rounded-tl-2xl" />
            <div className="absolute top-0 left-8 w-10 border-t-2 border-amber-400" />
            
            {/* 100% SATISFACTION Badge (Exact placement in top line gap) */}
            <div className="absolute -top-3.5 left-20 inline-flex items-center gap-1.5 bg-[#0d0216] px-3 py-0.5 border border-amber-400/60 rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] sm:text-xs font-black tracking-widest text-amber-400 uppercase">
                100% SATISFACTION
              </span>
            </div>

            {/* Continuation of top border line */}
            <div className="absolute top-0 left-[250px] sm:left-[270px] w-24 sm:w-44 border-t-2 border-amber-400" />

            {/* Left Vertical Line */}
            <div className="absolute top-8 bottom-8 left-0 w-0.5 bg-amber-400" />

            {/* Bottom-Left Corner & Bottom Line with small segment break (Exact Ref 1) */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-2xl" />
            <div className="absolute bottom-0 left-8 w-56 sm:w-72 border-b-2 border-amber-400" />
            <div className="absolute bottom-0 left-[236px] sm:left-[300px] w-4 h-0.5 bg-transparent" />
            <div className="absolute bottom-0 left-[244px] sm:left-[308px] w-8 border-b-2 border-amber-400" />

            {/* ======================================================== */}
            {/* HEADLINE TEXT (Exact Match of Reference 1 Typography) */}
            {/* ======================================================== */}
            <h1 className="text-4xl sm:text-6xl xl:text-[68px] font-black uppercase tracking-tight text-white leading-[1.05] mb-8">
              CLEANING <br />
              SERVICES{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                FOR
              </span>{" "}
              <br />
              YOUR WARDROBE
            </h1>

            {/* ======================================================== */}
            {/* PILL CTA BUTTON (Exact Match of Reference 1) */}
            {/* ======================================================== */}
            <div>
              <button
                onClick={onOpenCalculator}
                className="group inline-flex items-center justify-between gap-5 pl-7 pr-2.5 py-2.5 rounded-full bg-gradient-to-r from-purple-800 via-purple-700 to-amber-500 hover:from-amber-500 hover:to-purple-800 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-purple-950/70 border border-amber-300/40 transition-all duration-300 hover:scale-105"
              >
                <span>GET PRICING</span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#140220] flex items-center justify-center text-amber-300 group-hover:bg-white group-hover:text-purple-950 transition-colors shadow-inner">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>

          </div>

          {/* Floating Glossy Water Bubbles (Exact Ref 1) */}
          <div className="absolute -bottom-4 left-1/3 w-12 h-12 rounded-full bg-gradient-to-tr from-purple-400/20 to-amber-300/30 border border-white/30 backdrop-blur-sm pointer-events-none animate-pulse" />
          <div className="absolute bottom-6 left-1/4 w-8 h-8 rounded-full bg-purple-400/25 border border-purple-300/40 pointer-events-none" />
          <div className="absolute top-1/2 left-2 w-5 h-5 rounded-full bg-amber-400/20 border border-amber-300/30 pointer-events-none" />

          {/* 8-Spoke Rotating Wheel / Sunburst Motif (Exact Ref 1) */}
          <div className="hidden lg:block absolute top-12 right-8 w-11 h-11 pointer-events-none opacity-85 animate-spin" style={{ animationDuration: "18s" }}>
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400 fill-current">
              <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="6" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect
                  key={i}
                  x="47"
                  y="12"
                  width="6"
                  height="16"
                  rx="3"
                  transform={`rotate(${angle} 50 50)`}
                />
              ))}
            </svg>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RIGHT SECTION: Diagonal Slashes & Full-Bleed Photo (Exact Ref 1) */}
        {/* ======================================================== */}
        <div className="w-full lg:w-[48%] relative self-stretch flex items-stretch mt-6 lg:mt-0">
          
          {/* Layered Diagonal Graphic Slashes (Translating Ref 1's green angled sweeps to Purple/Gold) */}
          <div className="absolute inset-y-0 -left-12 lg:-left-16 w-28 pointer-events-none z-20 hidden sm:block">
            {/* Outer Gold Sharp Stroke */}
            <div
              className="absolute inset-y-0 left-0 w-3 bg-gradient-to-b from-amber-400 via-yellow-300 to-amber-500 shadow-[0_0_15px_#f59e0b]"
              style={{
                clipPath: "polygon(100% 0, 0 100%, 30% 100%, 100% 0)",
                transform: "skewX(-16deg)",
              }}
            />
            {/* Middle Broader Royal Purple & Gold Slash */}
            <div
              className="absolute inset-y-0 left-3 w-10 bg-gradient-to-b from-purple-600 via-purple-900 to-[#1e072a] opacity-95 shadow-2xl"
              style={{
                transform: "skewX(-16deg)",
              }}
            />
            {/* Inner Gold Pinstripe */}
            <div
              className="absolute inset-y-0 left-12 w-1.5 bg-amber-300"
              style={{
                transform: "skewX(-16deg)",
              }}
            />
          </div>

          {/* Hero Photograph with Diagonal Cut */}
          <div
            className="relative w-full h-[400px] sm:h-[500px] lg:h-full min-h-[460px] overflow-hidden shadow-2xl"
            style={{
              clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0% 100%)",
            }}
          >
            <Image
              src="/images/hero-valet.jpg"
              alt="Professional laundry specialist with freshly ironed garments"
              fill
              className="object-cover object-center"
              priority
            />
            
            {/* Vignette Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0216]/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0216]/70 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Bottom-Right Circular "0%" Badge (Exact Ref 1) */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0d0216]/95 border-2 border-amber-400 flex flex-col items-center justify-center text-center shadow-2xl shadow-purple-950 backdrop-blur-md">
              <span className="text-base sm:text-xl font-black text-white leading-none">
                0%
              </span>
              <span className="text-[7px] sm:text-[8px] font-black tracking-tighter text-amber-400 uppercase mt-0.5">
                HARSH CHEMICALS
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
