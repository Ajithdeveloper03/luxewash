"use client";

import React, { useRef } from "react";
import { Sparkles, ShieldCheck, Droplets } from "lucide-react";
import { useFrameCanvas } from "@/hooks/useFrameCanvas";

export default function FabricFrameSection() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Slow, steady, smooth pinned ScrollTrigger until all 104 frames complete
  useFrameCanvas({
    folder: "fiber-frames",
    totalFrames: 104,
    triggerRef: containerRef,
    canvasRef: canvasRef,
    scrubSpeed: 1.2,
    scrollDistance: "+=400%",
    fitMode: "cover",
    scaleMultiplier: 1.0,
    backgroundColor: "#000000",
  });

  return (
    <div className="relative w-full">
      <section
        id="technology"
        ref={containerRef}
        className="relative w-full h-screen bg-black text-white overflow-hidden flex items-end sm:items-center justify-end px-4 sm:px-8 md:px-12 lg:px-16 pb-10 sm:pb-0 not-italic select-none"
      >
        {/* Full-Screen Background Canvas: 104 Fabric Frames (No border, No overlay) */}
        <div className="absolute inset-0 size-full pointer-events-none z-0">
          <canvas ref={canvasRef} className="w-full h-full object-cover block bg-black" />
        </div>

        {/* Transparent Background Content on the RIGHT Side (No box, no border, expanded description) */}
        <div className="relative z-20 max-w-md lg:max-w-lg w-full md:ml-auto bg-transparent space-y-4 sm:space-y-5 text-left">
          <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-base">
            <Sparkles className="size-5 text-amber-400 shrink-0" />
            <span>Fabric Protection</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Gentle care for <span className="text-amber-400">every thread</span>
          </h2>

          <p className="text-purple-100 text-base sm:text-lg font-medium leading-relaxed">
            Our cold organic water bath and plant-based conditioners gently cleanse deep inside delicate weave structures without harsh friction or heat. Silk, linen, cotton, and cashmere retain their natural softness, vibrant color, and original drape wash after wash.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="size-6 text-amber-400 shrink-0" />
              <span className="text-base sm:text-lg font-extrabold text-white">
                Zero shrinkage protection
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Droplets className="size-6 text-amber-400 shrink-0" />
              <span className="text-base sm:text-lg font-extrabold text-white">
                Soft organic fiber bath
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
