"use client";

import React, { useEffect, useState, useRef } from "react";
import { Sparkles } from "lucide-react";

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Animate count1 to 250
    let start1 = 0;
    const end1 = 250;
    const duration1 = 1500;
    const stepTime1 = Math.abs(Math.floor(duration1 / end1));
    const timer1 = setInterval(() => {
      start1 += 3;
      if (start1 >= end1) {
        setCount1(end1);
        clearInterval(timer1);
      } else {
        setCount1(start1);
      }
    }, stepTime1);

    // Animate count2 to 99.8
    let start2 = 0;
    const end2 = 99.8;
    const timer2 = setInterval(() => {
      start2 += 1.5;
      if (start2 >= end2) {
        setCount2(end2);
        clearInterval(timer2);
      } else {
        setCount2(parseFloat(start2.toFixed(1)));
      }
    }, 20);

    // Animate count3 to 24
    let start3 = 0;
    const end3 = 24;
    const timer3 = setInterval(() => {
      start3 += 1;
      if (start3 >= end3) {
        setCount3(end3);
        clearInterval(timer3);
      } else {
        setCount3(start3);
      }
    }, 50);

    // Animate count4 to 100
    let start4 = 0;
    const end4 = 100;
    const timer4 = setInterval(() => {
      start4 += 2;
      if (start4 >= end4) {
        setCount4(end4);
        clearInterval(timer4);
      } else {
        setCount4(start4);
      }
    }, 25);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(timer3);
      clearInterval(timer4);
    };
  }, [isVisible]);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="py-12 sm:py-16 bg-transparent relative overflow-hidden"
    >
      {/* Background ambient lighting for glass refraction */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-80 h-80 bg-purple-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Glassmorphism Container Card */}
        <div className="relative rounded-3xl p-7 sm:p-10 md:p-12 bg-white/45 sm:bg-white/55 backdrop-blur-xl border border-white/80 ring-1 ring-purple-100/60 shadow-[0_8px_32px_0_rgba(46,8,84,0.06)] overflow-hidden">
          
          {/* Subtle glossy sheen reflection on top of the glass */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />
          <div className="absolute -top-24 left-1/4 w-96 h-48 bg-gradient-to-b from-white/30 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Minimal Section Header */}
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-purple-200/60 text-[#4B1278] text-sm font-bold uppercase tracking-wider font-body shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#C8961E]" />
              <span>Excellence in Numbers</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-[#18042b]">
              Numbers that define our care
            </h2>
          </div>

          {/* 4 Animated Glassmorphism Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center relative z-10">
            {/* Stat 1 */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white/50 backdrop-blur-md border border-white/75 shadow-xs hover:bg-white/70 hover:shadow-md transition-all duration-300">
              <div className="text-3xl sm:text-5xl font-extrabold tracking-tight font-body">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E0854] via-[#5A188C] to-[#B8860B]">
                  {count1.toLocaleString()}k
                </span>
                <span className="text-[#C8961E]">+</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-[#4B1278] font-body tracking-wide mt-2">
                Kg Linen Processed
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white/50 backdrop-blur-md border border-white/75 shadow-xs hover:bg-white/70 hover:shadow-md transition-all duration-300">
              <div className="text-3xl sm:text-5xl font-extrabold tracking-tight font-body">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E0854] via-[#5A188C] to-[#B8860B]">
                  {count2}
                </span>
                <span className="text-[#C8961E]">%</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-[#4B1278] font-body tracking-wide mt-2">
                On-Time Dispatch
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white/50 backdrop-blur-md border border-white/75 shadow-xs hover:bg-white/70 hover:shadow-md transition-all duration-300">
              <div className="text-3xl sm:text-5xl font-extrabold tracking-tight font-body">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E0854] via-[#5A188C] to-[#B8860B]">
                  {count3}
                </span>
                <span className="text-[#C8961E]">h</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-[#4B1278] font-body tracking-wide mt-2">
                Turnaround SLA
              </div>
            </div>

            {/* Stat 4 */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white/50 backdrop-blur-md border border-white/75 shadow-xs hover:bg-white/70 hover:shadow-md transition-all duration-300">
              <div className="text-3xl sm:text-5xl font-extrabold tracking-tight font-body">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E0854] via-[#5A188C] to-[#B8860B]">
                  {count4}
                </span>
                <span className="text-[#C8961E]">%</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-[#4B1278] font-body tracking-wide mt-2">
                Sanitized Standards
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
