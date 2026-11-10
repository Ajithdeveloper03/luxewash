"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { getAssetPath } from "@/lib/basePath";

interface ReplicaHeroProps {
  onOpenBooking?: () => void;
}

export default function ReplicaHero({ onOpenBooking }: ReplicaHeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!heroRef.current) return;

    let ctx: any;
    Promise.all([import("gsap")]).then(([{ gsap }]) => {
      if (!heroRef.current) return;
      ctx = gsap.context(() => {
        if (windowRef.current) {
          gsap.fromTo(
            windowRef.current,
            { opacity: 0, scale: 0.94, y: 15 },
            { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power2.out" }
          );
        }
      }, heroRef.current);
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", active: true },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Industries", href: "#industries" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const handleBookingClick = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[100vh] h-auto lg:h-screen lg:max-h-screen w-full max-w-full flex flex-col justify-between items-center py-4 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-16 z-10 overflow-hidden box-border"
    >
      {/* Top Header / Navigation Bar */}
      <header className="relative w-full flex items-center justify-between z-30 py-2 sm:py-3">
        {/* Left: Brand Logo (Significantly Bigger) */}
        <a href="#home" className="relative flex items-center gap-2 group transition-transform hover:scale-[1.03]">
          <Image
            src={getAssetPath("/luxewash-logo.png")}
            alt="Luxewash"
            width={260}
            height={75}
            className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain drop-shadow-[0_4px_16px_rgba(126,34,206,0.3)]"
            priority
          />
        </a>

        {/* Center: Capsule Pill Navigation with Large Font (Shown on desktop lg: >= 1024px to prevent tablet cramping) */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-white/75 border border-purple-200/60 rounded-full px-3.5 py-2 backdrop-blur-[2px] shadow-md shadow-purple-950/5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-3.5 py-1.5 lg:px-4 lg:py-2 rounded-full text-base font-bold tracking-wide transition-all ${
                link.active
                  ? "bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-amber-300 font-extrabold shadow-sm border border-amber-400/30"
                  : "text-slate-900 hover:text-purple-950 hover:bg-purple-100/60"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBookingClick}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white border-2 border-purple-300 text-purple-950 font-extrabold text-base tracking-wider transition-all backdrop-blur-[2px] shadow-sm hover:border-amber-400 hover:shadow-purple-200"
          >
            <span className="text-amber-600">✦</span>
            <span>Book Laundry Pickup</span>
          </button>

          {/* Mobile & Tablet hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-white/90 border border-purple-200 text-purple-950 shadow-sm"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 z-50 bg-white/95 border border-purple-200 rounded-3xl p-6 backdrop-blur-md space-y-4 shadow-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-2xl text-base font-bold transition-colors ${
                  link.active
                    ? "bg-purple-950 text-amber-300 font-extrabold"
                    : "text-slate-900 hover:bg-purple-50 hover:text-purple-950"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleBookingClick();
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-950 to-indigo-950 text-amber-300 font-extrabold text-base uppercase tracking-wider border border-amber-400/30"
          >
            Book Laundry Pickup
          </button>
        </div>
      )}

      {/* Center Main Content Container - Black Aperture Window (Responsive on all screens) */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-center my-auto z-10 px-2 sm:px-4 py-4">
        <div
          ref={windowRef}
          className="relative w-full max-w-[340px] sm:max-w-md md:max-w-2xl lg:max-w-4xl h-auto min-h-[420px] sm:min-h-[460px] md:min-h-[500px] rounded-[44px] sm:rounded-[70px] md:rounded-[90px] border-[10px] sm:border-[16px] md:border-[20px] border-black/50 bg-white/15 backdrop-blur-[4.5px] shadow-[0_25px_60px_-10px_rgba(0,0,0,0.5),0_0_25px_rgba(0,0,0,0.3),inset_0_0_30px_rgba(0,0,0,0.25)] ring-1 ring-black/50 flex flex-col items-center justify-center text-center p-5 sm:p-8 md:p-10"
        >
          {/* Inner glass reflection shine */}
          <div className="absolute inset-0 rounded-[34px] sm:rounded-[54px] md:rounded-[70px] border border-white/40 pointer-events-none" />
          <div className="absolute top-3 left-1/4 right-1/4 h-6 sm:h-8 bg-gradient-to-b from-white/40 to-transparent rounded-full blur-sm pointer-events-none" />

          {/* Typography */}
          <div className="relative z-10 max-w-2xl space-y-2.5 sm:space-y-3">
            {/* Soft purple & gold badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/80 border border-purple-200/80 shadow-sm backdrop-blur-[1px]">
              <span className="text-amber-500 font-extrabold text-base">✦</span>
              <span className="text-base font-extrabold tracking-normal sm:tracking-wider text-purple-950 uppercase">
                PREMIUM LAUNDRY & DRY CLEANING
              </span>
              <span className="text-amber-500 font-extrabold text-base">✦</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black text-slate-950 tracking-tight leading-[1.08] [text-shadow:0_2px_15px_rgb(255_255_255/0.95)]">
              Experience Pure Luxury Laundry Care
            </h1>

            <p className="text-slate-950 font-bold text-base md:text-lg lg:text-xl leading-relaxed max-w-md mx-auto [text-shadow:0_1px_10px_rgb(255_255_255/0.95)]">
              Pure aqueous ozone wash and couture hand pressing for designer wardrobes & luxury suites.
            </p>

            <div className="pt-1">
              <button
                onClick={handleBookingClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white font-extrabold text-base md:text-lg tracking-wide shadow-xl shadow-purple-950/25 border-2 border-amber-400/50 hover:scale-[1.03] transition-all hover:border-amber-300"
              >
                <span>Schedule Laundry Pickup</span>
                <span className="size-6 rounded-full bg-amber-400 text-purple-950 flex items-center justify-center font-black">
                  <ArrowUpRight className="size-4 stroke-[3]" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
