"use client";

import React, { useRef, useState, useCallback } from "react";
import { Phone, Calendar, Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { getAssetPath } from "@/lib/basePath";
import { useFrameCanvas } from "@/hooks/useFrameCanvas";

export default function HeroFrameSection() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // While scrolling and as the hero frames perform:
  // - Main title fades out to the TOP
  // - Bottom-left content fades out to the LEFT
  // - Bottom-right content fades out to the RIGHT
  const handleHeroProgress = useCallback((progress: number) => {
    const fadeT = Math.min(1, Math.max(0, progress / 0.28));
    const eased = fadeT * fadeT * (3 - 2 * fadeT);
    const alpha = 1 - eased;

    if (titleRef.current) {
      titleRef.current.style.opacity = String(alpha);
      titleRef.current.style.transform = `translate3d(0, ${-eased * 130}px, 0)`;
    }

    if (leftContentRef.current) {
      leftContentRef.current.style.opacity = String(alpha);
      leftContentRef.current.style.transform = `translate3d(${-eased * 160}px, 0, 0)`;
    }

    if (rightContentRef.current) {
      rightContentRef.current.style.opacity = String(alpha);
      rightContentRef.current.style.transform = `translate3d(${eased * 160}px, 0, 0)`;
    }
  }, []);

  // Slow, steady, smooth pinned ScrollTrigger (complete dark #000000 background, very little scale out: 0.88)
  useFrameCanvas({
    folder: "washing-machine-frames",
    totalFrames: 175,
    triggerRef: containerRef,
    canvasRef: canvasRef,
    scrubSpeed: 1.3,
    scrollDistance: "+=420%",
    fitMode: "contain",
    scaleMultiplier: 0.88,
    backgroundColor: "#000000",
    onProgress: handleHeroProgress,
  });

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Fabric Care", href: "#technology" },
    { name: "Services", href: "#services" },
    { name: "Stain Wash", href: "#extraction" },
    { name: "Care Line", href: "#careline" },
    { name: "Delivery", href: "#umbrella" },
    { name: "Reviews", href: "#testimonial" },
  ];

  return (
    <div className="relative w-full overflow-x-hidden">
      <section
        id="home"
        ref={containerRef}
        className="relative w-full h-screen bg-black text-white overflow-hidden flex flex-col justify-between items-center z-10 select-none not-italic"
      >
        {/* Complete Dark Header — Hamburger menu active on all small, medium & tablet/compact laptop screens (< 1280px) */}
        <header className="relative w-full z-40 bg-black/95 border-b border-purple-900/40 backdrop-blur-md shrink-0">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20 gap-2">
            {/* Left: Brand Logo */}
            <a
              href="#home"
              className="relative px-3 py-1.5 rounded-2xl bg-white flex items-center shrink-0 transition-transform hover:scale-105"
            >
              <img
                src={getAssetPath("/luxewash-logo.png")}
                alt="LuxeWash"
                width={175}
                height={50}
                className="h-7 sm:h-9 md:h-10 w-auto object-contain"
              />
            </a>

            {/* Center: Dark Royal Capsule Navigation (Large Desktop >= 1280px only so medium devices never crowd) */}
            <nav className="hidden xl:flex items-center gap-1 bg-purple-950/80 border border-purple-800/50 px-4 py-1.5 rounded-full">
              {navLinks.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-base font-bold transition-colors whitespace-nowrap ${
                    idx === 0
                      ? "bg-amber-400 text-purple-950"
                      : "text-purple-100 hover:text-amber-300 hover:bg-purple-900/60"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right: Helpline, Book Pickup CTA & Hamburger Menu (Visible on all Small & Medium devices < 1280px) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href="tel:+18005893927"
                className="hidden 2xl:flex items-center gap-2.5 text-white hover:text-amber-300 transition-colors"
              >
                <span className="size-10 rounded-full bg-purple-950 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Phone className="size-4" />
                </span>
                <span className="text-base font-extrabold whitespace-nowrap">+1 (800) 589-3927</span>
              </a>

              <a
                href="#services"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-base transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                <Calendar className="size-4 text-purple-950 shrink-0" />
                <span>Book Pickup</span>
              </a>

              {/* Hamburger Menu Button for Small & Medium Devices (< 1280px) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 sm:p-2.5 rounded-full bg-purple-950 text-amber-300 border border-purple-700 hover:border-amber-400 transition-colors shrink-0"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </div>

          {/* Responsive Small & Medium Device Hamburger Drawer (< 1280px) */}
          {mobileMenuOpen && (
            <div className="xl:hidden absolute top-full inset-x-0 z-50 bg-black/98 border-t border-b border-purple-800/70 px-5 sm:px-8 py-5 space-y-3 shadow-2xl backdrop-blur-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-4 rounded-xl text-base font-bold text-purple-100 bg-purple-950/50 hover:bg-purple-900/80 hover:text-amber-300 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div className="pt-3 border-t border-purple-900/60 flex flex-wrap items-center justify-between gap-3">
                <a href="tel:+18005893927" className="text-base font-extrabold text-amber-300">
                  +1 (800) 589-3927
                </a>
                <a
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-amber-400 text-purple-950 text-base font-black"
                >
                  Book Pickup
                </a>
              </div>
            </div>
          )}
        </header>

        {/* Complete Dark Hero Frames Stage */}
        <div className="relative flex-1 w-full h-full bg-black flex flex-col items-center justify-center overflow-hidden">
          {/* Huge Stylish Glowing Aesthetic Title at Top of the Frames (Fades out to TOP on scroll) */}
          <div
            ref={titleRef}
            className="absolute top-1 sm:top-2 inset-x-0 flex items-center justify-center pointer-events-none z-20 px-2 will-change-transform"
          >
            <h1
              style={{
                textShadow:
                  "0 0 24px rgba(255, 255, 255, 0.92), 0 0 58px rgba(251, 191, 36, 0.55), 0 0 110px rgba(168, 85, 247, 0.65)",
              }}
              className="font-luxury text-[12.8vw] sm:text-[13.5vw] lg:text-[14vw] font-black tracking-wider text-white leading-none text-center select-none whitespace-nowrap"
            >
              LUXEWASH
            </h1>
          </div>

          {/* Washing Machine Frames Container (Complete Dark #000000 Background, Very Little Scale Out: 0.88) */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none z-10 pt-10 sm:pt-16">
            <canvas ref={canvasRef} className="w-full h-full block bg-black" />
          </div>
        </div>

        {/* Bottom-Left and Bottom-Right Minimal Content (Fades out Left & Right on scroll) */}
        <div className="relative lg:absolute lg:bottom-7 lg:inset-x-0 z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-5 lg:pb-0 flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-4 sm:gap-6 pointer-events-none">
          {/* Bottom-Left Content -> Fades out to the LEFT */}
          <div
            ref={leftContentRef}
            className="pointer-events-auto max-w-sm space-y-1.5 text-left will-change-transform"
          >
            <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-base">
              <Sparkles className="size-4 text-amber-400 shrink-0" />
              <span>Organic Garment Care</span>
            </div>
            <p className="text-white text-base sm:text-lg font-extrabold leading-snug">
              Pure cold-water wash and crisp steam finish for every fabric.
            </p>
          </div>

          {/* Bottom-Right Content -> Fades out to the RIGHT */}
          <div
            ref={rightContentRef}
            className="pointer-events-auto sm:max-w-xs flex flex-row sm:flex-col items-center sm:items-end justify-between gap-3 text-left sm:text-right will-change-transform"
          >
            <div>
              <div className="text-amber-400 font-extrabold text-base">Free 24h Doorstep Valet</div>
              <p className="text-purple-100 text-base font-medium">
                Freshly folded right to your door
              </p>
            </div>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-base transition-transform hover:scale-105 shrink-0"
            >
              <span>Explore Care</span>
              <ArrowRight className="size-4 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
