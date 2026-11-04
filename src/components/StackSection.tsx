"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

export default function StackSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section id="stats" className="w-full bg-[#0d0216] text-white overflow-hidden">
      
      {/* Full-Width Horizontal Composite Bar (Exact Reference Image Layout) */}
      <div className="w-full flex flex-col lg:flex-row items-stretch">
        
        {/* ======================================================== */}
        {/* LEFT BLOCK: Video / About Cleaning Section (~38% width)   */}
        {/* ======================================================== */}
        <div className="relative w-full lg:w-[38%] py-8 px-6 sm:px-10 flex items-center justify-between overflow-hidden bg-gradient-to-r from-purple-800 via-purple-900 to-[#3b0d52]">
          
          {/* Background Laundry Photo with Rich Purple Overlay */}
          <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay">
            <Image
              src="/images/video-laundry-bg.jpg"
              alt="Deep cleaning laundry facility"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Geometric Triangle Pattern Overlay (Exact match of Ref 1 texture on left) */}
          <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 w-full flex items-center justify-center lg:justify-start gap-4 sm:gap-6">
            
            {/* Hand-drawn Curly Looping Arrow pointing to play button (Exact Ref) */}
            <div className="hidden sm:block w-12 h-12 flex-shrink-0 text-white">
              <svg viewBox="0 0 60 60" fill="none" className="w-full h-full stroke-white">
                <path
                  d="M15 15 C 25 5, 45 10, 35 25 C 25 40, 10 30, 20 20 C 30 10, 50 35, 42 48"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M36 42 L 42 48 L 48 42"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Circular Dark Play Button with Jagged/Sawtooth Ring (Exact Ref) */}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center group focus:outline-none cursor-pointer"
              aria-label="Play deep cleaning video"
            >
              {/* Jagged Sawtooth Ring SVG */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full fill-[#0d1f1c] group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
              >
                <polygon
                  points="50,2 56,12 67,6 70,18 82,16 81,28 92,30 87,41 97,46 89,55 96,63 86,69 89,81 77,82 76,94 65,90 60,100 50,93 40,100 35,90 24,94 23,82 11,81 14,69 4,63 11,55 3,46 13,41 8,30 19,28 18,16 30,18 33,6 44,12"
                />
              </svg>
              
              {/* Play Triangle Icon */}
              <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 text-white fill-white flex items-center justify-center pl-1">
                <Play className="w-full h-full fill-white" />
              </div>
            </button>

            {/* Text: ABOUT CLEANING — DEEP CLEANING IN YOUR CITY */}
            <div className="text-left text-white">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-300 mb-1">
                <span>ABOUT CLEANING</span>
                <span className="w-4 h-0.5 bg-amber-400 inline-block" />
              </div>

              <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                DEEP CLEANING <br />
                IN YOUR CITY
              </h3>
            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* RIGHT BLOCK: 4 Horizontal Stats Counters (~62% width)    */}
        {/* ======================================================== */}
        <div className="w-full lg:w-[62%] py-8 px-6 sm:px-10 bg-[#071614]/95 lg:bg-[#071714] flex items-center justify-around border-t lg:border-t-0 lg:border-l border-emerald-950/40">
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 items-center">
            
            {/* Stat 1: 950+ Happy Client */}
            <div className="flex items-center gap-3">
              {/* Outline Icon: Person stepping up stairs */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 text-white/90">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-full h-full">
                  <circle cx="6" cy="4" r="2" />
                  <path d="M4 12 L 6 8 L 9 9 L 11 13" />
                  <path d="M6 12 L 6 16 L 4 20" />
                  <path d="M9 13 L 11 17 L 14 17" />
                  <path d="M12 20 H 22" />
                  <path d="M14 20 V 16 H 18 V 12 H 22" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
                  950+
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-300 capitalize mt-1">
                  Happy Client
                </div>
              </div>
            </div>

            {/* Stat 2: 45+ Award Winner */}
            <div className="flex items-center gap-3">
              {/* Outline Icon: Hands holding star */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 text-white/90">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-full h-full">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  <path d="M2 17 C 4 21, 8 22, 12 22 C 16 22, 20 21, 22 17" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
                  45+
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-300 capitalize mt-1">
                  Award Winner
                </div>
              </div>
            </div>

            {/* Stat 3: 400+ Completed Project */}
            <div className="flex items-center gap-3">
              {/* Outline Icon: House / facility building */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 text-white/90">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-full h-full">
                  <path d="M3 21h18" />
                  <path d="M4 21V9l7-6 7 6v12" />
                  <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
                  400+
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-300 capitalize mt-1">
                  Completed Project
                </div>
              </div>
            </div>

            {/* Stat 4: 100+ Team Member */}
            <div className="flex items-center gap-3">
              {/* Outline Icon: Gear with team people */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 text-white/90">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-full h-full">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
                  100+
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-300 capitalize mt-1">
                  Team Member
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* Interactive Video Modal for the Play Button              */}
      {/* ======================================================== */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#12041d] rounded-3xl overflow-hidden border-2 border-amber-400 shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-purple-950 flex items-center justify-between border-b border-purple-800">
              <h4 className="text-sm font-bold text-amber-300">
                LUXE WASH — Deep Cleaning In Your City Tour
              </h4>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Showcase Image with play overlay */}
            <div className="relative h-[380px] sm:h-[440px] w-full">
              <Image
                src="/images/video-laundry-bg.jpg"
                alt="Industrial laundry machines cleaning"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-full bg-amber-400 text-purple-950 flex items-center justify-center shadow-2xl animate-pulse mb-4">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h5 className="text-xl font-black text-white mb-2">
                  Hospital-Grade Sanitization & Master Fabric Care
                </h5>
                <p className="text-xs text-purple-200 max-w-md">
                  Experience how our temperature-calibrated wash drums and biological eco-enzymes clean deeper than any conventional laundromat.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-purple-950 text-center">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-6 py-2 rounded-full bg-amber-400 text-purple-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300"
              >
                Close Video Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
