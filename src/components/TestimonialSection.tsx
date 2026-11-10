"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Phone } from "lucide-react";
import { getAssetPath } from "@/lib/basePath";

export default function TestimonialSection() {
  return (
    <section
      id="testimonial"
      className="relative w-full min-h-screen lg:h-screen bg-[#140722] text-white overflow-hidden flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-14 sm:py-16 lg:py-12 not-italic select-none"
    >
      <div className="max-w-5xl w-full mx-auto rounded-2xl sm:rounded-3xl bg-purple-950/85 border-2 border-purple-500/40 p-5 sm:p-8 md:p-10 lg:p-12 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left: Portrait Image */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative size-44 sm:size-52 lg:size-64 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-400 shadow-xl">
              <Image
                src={getAssetPath("/images/testimonial-avatar.jpg")}
                alt="Ananya Singhania"
                fill
                className="object-cover object-center"
                sizes="260px"
              />
            </div>
          </div>

          {/* Right: Minimal Quote & Direct Helpline CTA */}
          <div className="md:col-span-8 space-y-4 sm:space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900 border border-purple-400/30 text-amber-300 font-bold text-base">
              <Sparkles className="size-4 text-amber-400 shrink-0" />
              <span>Client Review</span>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-relaxed">
              &ldquo;LuxeWash transformed our wardrobe and bed linen care. Fabrics stay fresh, soft, and crisp after every wash.&rdquo;
            </p>

            <div>
              <div className="text-lg font-black text-amber-300">Ananya Singhania</div>
              <div className="text-base text-purple-200 font-medium">
                Taj Heritage Hotels & Resorts
              </div>
            </div>

            {/* Direct Helpline Link (No Popup Form) */}
            <div className="pt-3 border-t border-purple-800/80 flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
              <a
                href="tel:+18005893927"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-purple-950 font-black text-base shadow-lg transition-transform hover:scale-105"
              >
                <Phone className="size-5 shrink-0" />
                <span>Call +1 (800) 589-3927</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
