"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onOpenBooking?: (service?: string) => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Industries", href: "#industries" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07090e]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
          : "bg-gradient-to-b from-[#07090e]/80 via-[#07090e]/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="LUXEWASH Home"
          >
            <div className="relative size-10 rounded-full border border-cyan-500/40 bg-cyan-950/40 p-1 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.25)] group-hover:border-cyan-400 group-hover:shadow-[0_0_22px_rgba(6,182,212,0.5)] transition-all">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 animate-spin-drum" />
              <div className="relative size-6 rounded-full border border-dashed border-cyan-400/80 animate-spin-drum-fast flex items-center justify-center">
                <span className="size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg tracking-[0.22em] font-bold text-white uppercase group-hover:text-cyan-300 transition-colors">
                  LUXE<span className="text-cyan-400 font-extrabold">WASH</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  EST. 2024
                </span>
              </div>
              <span className="font-mono text-[9px] tracking-[0.26em] text-slate-400 uppercase -mt-0.5">
                MOLECULAR LINEN CARE
              </span>
            </div>
          </a>

          {/* Desktop Nav Links: Home, About, Services, Industries, Contact */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/[0.03] border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono text-emerald-400/90 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
              <span>FACILITY ACTIVE · 24H EXPRESS</span>
            </div>
            <button
              onClick={() => onOpenBooking ? onOpenBooking() : document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all transform active:scale-95"
            >
              <Sparkles className="size-3.5" />
              <span>Schedule Pickup</span>
              <ArrowUpRight className="size-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#07090e]/98 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3 mt-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid gap-2">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/[0.03] hover:bg-cyan-950/30 border border-white/5 hover:border-cyan-500/30 text-sm font-mono tracking-wider uppercase text-slate-200 hover:text-cyan-300 transition-colors"
              >
                <span>{link.name}</span>
                <span className="text-[10px] text-slate-500">0{idx + 1}</span>
              </a>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
                else document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <Sparkles className="size-4" />
              <span>Schedule Pickup Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
