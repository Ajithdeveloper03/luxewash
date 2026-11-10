"use client";

import React, { useRef } from "react";
import { Sparkles } from "lucide-react";
import { useFrameCanvas } from "@/hooks/useFrameCanvas";

export default function PunchingFrameSection() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Slow, steady, smooth pinned ScrollTrigger until all 238 frames complete
  useFrameCanvas({
    folder: "punching-frames",
    totalFrames: 238,
    triggerRef: containerRef,
    canvasRef: canvasRef,
    scrubSpeed: 1.3,
    scrollDistance: "+=450%",
    fitMode: "cover",
    scaleMultiplier: 1.02,
    backgroundColor: "#00142d",
  });

  return (
    <div className="relative w-full">
      <section
        id="extraction"
        ref={containerRef}
        className="relative w-full h-screen bg-[#00142d] text-white overflow-hidden flex items-end sm:items-center justify-start px-4 sm:px-8 md:px-12 lg:px-16 pb-10 sm:pb-0 not-italic select-none"
      >
        {/* Background Canvas: 238 Punching Frames Pinned on ScrollTrigger */}
        <div className="absolute inset-0 size-full pointer-events-none z-0">
          <canvas ref={canvasRef} className="w-full h-full object-cover block" />
        </div>

        {/* Minimal Content Kept Strictly on the LEFT Side (Right side completely clear) */}
        <div className="relative z-20 max-w-sm sm:max-w-md w-full p-5 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl bg-purple-950/90 border-2 border-amber-400/50 backdrop-blur-xl shadow-2xl space-y-2.5 sm:space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900 border border-purple-400/30 text-amber-300 font-bold text-base">
            <Sparkles className="size-4 text-amber-400 shrink-0" />
            <span>Deep Stain Wash</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            Powerful stain removal
          </h2>

          <p className="text-purple-100 text-base sm:text-lg font-medium leading-relaxed">
            Deep water pressure lifts tough stains while keeping fabrics spotless.
          </p>
        </div>
      </section>
    </div>
  );
}
