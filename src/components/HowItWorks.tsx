"use client";

import React, { useState } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/site";
import { CheckCircle2, CalendarDays, Shirt } from "lucide-react";

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export default function HowItWorks({ onOpenBooking }: HowItWorksProps) {
  const [activeHover, setActiveHover] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: "Provide Us With The Details",
      desc: "At feugiat odio arcu rhoncus dui sociosqu finibus torquent quis duis efficitur. Tempus neque nascetur ipsum rutrum ornare si vulputate quisque est.",
      icon: (
        /* Custom 3-bullet list icon matching Reference Image */
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
          <circle cx="5" cy="7" r="1.5" fill="currentColor" />
          <circle cx="5" cy="12" r="1.5" fill="currentColor" />
          <circle cx="5" cy="17" r="1.5" fill="currentColor" />
          <line x1="10" y1="7" x2="20" y2="7" strokeLinecap="round" />
          <line x1="10" y1="12" x2="20" y2="12" strokeLinecap="round" />
          <line x1="10" y1="17" x2="20" y2="17" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Pick The Suitable Plan For You",
      desc: "At feugiat odio arcu rhoncus dui sociosqu finibus torquent quis duis efficitur. Tempus neque nascetur ipsum rutrum ornare si vulputate quisque est.",
      icon: <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />,
    },
    {
      id: 3,
      title: "Online Scheduling In Few Clicks",
      desc: "At feugiat odio arcu rhoncus dui sociosqu finibus torquent quis duis efficitur. Tempus neque nascetur ipsum rutrum ornare si vulputate quisque est.",
      icon: <CalendarDays className="w-5 h-5 stroke-[2.5]" />,
    },
    {
      id: 4,
      title: "Cleaning With Care",
      desc: "At feugiat odio arcu rhoncus dui sociosqu finibus torquent quis duis efficitur. Tempus neque nascetur ipsum rutrum ornare si vulputate quisque est.",
      icon: <Shirt className="w-5 h-5 stroke-[2.5]" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white text-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ======================================================== */}
          {/* LEFT: Staff Woman with Bags & Rack Photo (Exact Ref)     */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Photo with rounded corners and soft luxury shadow */}
              <div className="relative h-[480px] sm:h-[580px] rounded-3xl overflow-hidden shadow-xl border border-slate-100 group">
                <Image
                  src={assetPath("/images/how-it-works.jpg")}
                  alt="Friendly laundry intake specialist holding a pen with packaged garments"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                
                {/* Subtle soft gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: Content & 4 Vertical Connected Steps (Exact Ref)  */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 lg:pl-4">
            
            {/* Tagline */}
            <div className="text-amber-500 font-black text-xs uppercase tracking-widest mb-3">
              HOW IT WORKS
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 leading-[1.15] tracking-tight mb-5">
              Easy step to get pick up service
            </h2>

            {/* Description Paragraph */}
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-10 max-w-2xl font-normal">
              Ex ligula montes id fames suscipit. Rhoncus ullamcorper scelerisque sed maecenas efficitur arcu lacinia blandit. Fusce class pharetra ultrices sed dolor mus nulla habitant placerat.
            </p>

            {/* Vertical Connected Steps Timeline */}
            <div className="relative space-y-7">
              
              {/* Dotted Vertical Connector Line running behind icons (Exact Ref) */}
              <div className="absolute top-6 bottom-6 left-[21px] w-[2px] border-l-2 border-dashed border-amber-400 z-0" />

              {steps.map((step, idx) => {
                const isHovered = activeHover === idx;

                return (
                  <div
                    key={step.id}
                    onMouseEnter={() => setActiveHover(idx)}
                    onMouseLeave={() => setActiveHover(null)}
                    onClick={onOpenBooking}
                    className="relative z-10 flex items-start gap-5 group cursor-pointer"
                  >
                    {/* Orange/Gold Rounded Square Icon Container */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-md ${
                        isHovered
                          ? "bg-gradient-to-tr from-amber-400 to-yellow-300 text-purple-950 scale-110 shadow-amber-400/40 ring-4 ring-amber-300/30"
                          : "bg-amber-400 text-purple-950 group-hover:scale-105"
                      }`}
                    >
                      {step.icon}
                    </div>

                    {/* Content */}
                    <div className="pt-0.5">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1.5 group-hover:text-purple-900 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal max-w-xl">
                        {step.desc}
                      </p>
                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
