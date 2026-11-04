"use client";

import React from "react";
import Image from "next/image";
import { assetPath } from "@/lib/site";
import { Check } from "lucide-react";

interface WhoWeAreProps {
  onOpenBooking: () => void;
}

export default function WhoWeAre({ onOpenBooking }: WhoWeAreProps) {
  return (
    <section id="who-we-are" className="py-20 lg:py-28 bg-white text-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ======================================================== */}
          {/* LEFT: Main Image with Overlapping Inset Basket Image      */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 relative pb-10 sm:pb-12 lg:pb-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Big Image: Woman Smiling with Fresh Clean Laundry at Dryer Drum */}
              <div className="relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src={assetPath("/images/who-we-are-main.jpg")}
                  alt="Smiling woman taking fresh clean laundry from washer"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* Inset Overlapping Image: Tipped Laundry Basket (Exact Reference Layout) */}
              <div className="absolute -bottom-6 right-2 sm:-bottom-8 sm:right-6 w-48 sm:w-64 h-36 sm:h-44 rounded-2xl overflow-hidden border-[6px] border-white shadow-2xl z-20 bg-white">
                <Image
                  src={assetPath("/images/who-we-are-basket.jpg")}
                  alt="Laundry basket with freshly folded colorful clothes"
                  fill
                  className="object-cover object-center"
                />
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: Content Matching Reference Image Exact Structure  */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 lg:pl-6">
            
            {/* Tagline */}
            <div className="text-amber-500 font-black text-xs uppercase tracking-widest mb-3">
              WHO WE ARE
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 leading-[1.15] tracking-tight mb-5">
              Helping you in doing your laundry <br className="hidden sm:inline" />
              at the finest
            </h2>

            {/* Description Paragraph */}
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-normal">
              Mus ac magnis velit id feugiat vestibulum natoque ridiculus pharetra si. Fusce mollis in suscipit fringilla condimentum ipsum dictum elit. Bibendum a erat efficitur pretium cursus mi molestie ipsum.
            </p>

            {/* 2-Column Features (Exact Reference: 3 Days Delivery & Best Wash Quality) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-9">
              
              {/* Feature 1 */}
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-5 h-5 rounded-md bg-amber-400 text-purple-950 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    3 Days Delivery
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pl-7 sm:pl-0">
                  Morbi praesent nascetur maecenas ligula habitasse tellus duis quisque efficitur sollicitudin senectus.
                </p>
              </div>

              {/* Feature 2 */}
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-5 h-5 rounded-md bg-amber-400 text-purple-950 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Best Wash Quality
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pl-7 sm:pl-0">
                  Morbi praesent nascetur maecenas ligula habitasse tellus duis quisque efficitur sollicitudin senectus.
                </p>
              </div>

            </div>

            {/* CTA Button: More About Us (Exact Reference Style in Luxury Gold Theme) */}
            <div>
              <button
                onClick={onOpenBooking}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-500 text-purple-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-400/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                More About Us
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
