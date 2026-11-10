"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/basePath";

export default function ReplicaTestimonial() {
  const containerRef = useRef<HTMLElement>(null);
  const photoCardRef = useRef<HTMLDivElement>(null);
  const metricCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx: any;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          if (photoCardRef.current) {
            gsap.fromTo(
              photoCardRef.current,
              { opacity: 0, x: -30 },
              {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 75%",
                  end: "center center",
                  scrub: 1.0,
                },
              }
            );
          }
          if (metricCardRef.current) {
            gsap.fromTo(
              metricCardRef.current,
              { opacity: 0, x: 30 },
              {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 75%",
                  end: "center center",
                  scrub: 1.0,
                },
              }
            );
          }
        }, containerRef);
      }
    );

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] h-auto lg:h-screen lg:max-h-screen w-full flex flex-col justify-center items-center py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-16 z-10 box-border overflow-y-auto lg:overflow-hidden"
    >
      {/* Main Container: Left Portrait Card + Right Indigo Glassmorphic Metric Card (Exact Image 1 Replica) */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch z-10 my-auto">
        {/* Left: Clean Rounded Portrait Card (Matching Image 1) */}
        <div
          ref={photoCardRef}
          className="md:col-span-4 lg:col-span-4 flex items-center justify-center w-full"
        >
          <div className="relative w-48 h-64 sm:w-56 sm:h-72 md:w-full md:h-full min-h-[260px] md:min-h-[360px] max-w-xs md:max-w-none rounded-[28px] sm:rounded-[36px] overflow-hidden bg-white shadow-2xl border-2 border-white/80 ring-1 ring-purple-200/50 shrink-0">
            <Image
              src={getAssetPath("/images/testimonial-avatar.jpg")}
              alt="Ananya Singhania"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 240px, 400px"
              priority
            />
          </div>
        </div>

        {/* Right: Indigo Glassmorphic Metric Card with rich opacity & blurriness (Matching Image 1) */}
        <div
          ref={metricCardRef}
          className="md:col-span-8 lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 lg:p-10 rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#1d356d]/90 via-[#17254e]/92 to-[#0e162f]/95 border border-white/25 text-white backdrop-blur-md shadow-2xl shadow-blue-950/40 space-y-6 sm:space-y-8 text-left"
        >
          {/* Quote with French Guillemets « » in Natural Sentence Case (Indian luxury context) */}
          <blockquote className="text-white font-sans font-bold text-base sm:text-lg lg:text-xl leading-relaxed tracking-tight">
            « With Luxewash, we transformed garment laundry and bed linen care across our luxury suites and royal banquets. We cut our fabric replacement costs substantially, extended delicate silk and cotton laundry lifespan by 40%, and our guests constantly compliment the fresh, crisp feel. »
          </blockquote>

          {/* Metrics Row: 3 bold columns side-by-side (Matching Image 1 Layout & Hierarchy) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 border-t border-white/20 pt-5 sm:pt-6">
            <div>
              <span className="block font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                ₹25L+
              </span>
              <span className="block font-sans text-base lg:text-lg font-bold text-blue-200 mt-1 leading-snug">
                Annual Savings
              </span>
            </div>

            <div>
              <span className="block font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                +40%
              </span>
              <span className="block font-sans text-base lg:text-lg font-bold text-blue-200 mt-1 leading-snug">
                Fabric Lifespan
              </span>
            </div>

            <div>
              <span className="block font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                100%
              </span>
              <span className="block font-sans text-base lg:text-lg font-bold text-blue-200 mt-1 leading-snug">
                Pristine Rating
              </span>
            </div>
          </div>

          {/* Bottom Attribution in Natural Case (Matching Image 1: — Name \n Designation) */}
          <div className="space-y-1 text-left border-t border-white/10 pt-4">
            <div className="text-lg sm:text-xl font-black text-white tracking-wide">
              — Ananya Singhania
            </div>
            <div className="text-base sm:text-lg font-bold text-blue-200">
              Director of Housekeeping, Taj Heritage Hotels & Resorts, Mumbai
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
