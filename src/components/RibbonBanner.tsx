"use client";

import React from "react";

export default function RibbonBanner() {
  const points = [
    "Thoughtful fabric care",
    "A focus on consistency",
    "Business-first planning",
    "Attention in every detail",
  ];

  return (
    <div className="w-full bg-[#1c0730] text-purple-100/90 py-3 px-4 sm:px-8 border-y border-purple-950/40">
      <div className="max-w-[1360px] mx-auto">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-y-3 gap-x-8 sm:gap-x-12 text-center">
          {points.map((point) => (
            <div key={point} className="flex items-center gap-2.5">
              {/* Four-point diamond / star from Reference Image 2 */}
              <span className="text-[#a855f7] text-xs leading-none">✦</span>
              <span className="text-[12.5px] sm:text-[13.5px] font-sans font-medium tracking-[0.03em] text-[#f2eafc]">
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
