"use client";

import React from "react";
import { Sparkles, ArrowUp, ShieldCheck, Droplet, Leaf, Award } from "lucide-react";

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Industries", href: "#industries" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative bg-[#04060a] border-t border-white/10 pt-16 pb-12 overflow-hidden text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="flex items-center gap-3 group">
              <div className="size-9 rounded-full border border-cyan-500/40 bg-cyan-950/40 p-1 flex items-center justify-center overflow-hidden shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                <div className="size-5 rounded-full border border-dashed border-cyan-400/80 animate-spin-drum-fast flex items-center justify-center">
                  <span className="size-1.5 rounded-full bg-cyan-400" />
                </div>
              </div>
              <span className="font-display text-xl tracking-[0.2em] font-bold text-white uppercase group-hover:text-cyan-300 transition-colors">
                LUXE<span className="text-cyan-400 font-extrabold">WASH</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Molecular garment restoration and high-volume commercial linen excellence. Closed-loop cold-water aqueous ozone engineering.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3.5" />
                <span>ISO 9001</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Leaf className="size-3.5 text-emerald-400" />
                <span className="text-emerald-400">100% Eco-Ozone</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="size-3.5 text-amber-400" />
                <span className="text-amber-400">EN 14065</span>
              </span>
            </div>
          </div>

          {/* Quick Menus (Home, About, Services, Industries, Contact) */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 font-mono text-xs">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-cyan-400 transition-colors uppercase tracking-wider block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quick Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold mb-4">
              Specialized Care
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Wardrobe Elite Wash & Fold
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Couture Silk & Cashmere Atelier
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Hotel & Resort Bulk Linens
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Express VIP 4-Hour Turnaround
                </a>
              </li>
              <li>
                <a href="#trajectory" className="hover:text-cyan-400 transition-colors">
                  5-Stage Ozone Hydro-Cycle
                </a>
              </li>
            </ul>
          </div>

          {/* Commercial Facility Hours & Hotline */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold mb-4">
              Operations & Concierge
            </h4>
            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Central Facility</span>
                <span className="text-white">Continuous 24/7 Operations</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Courier Dispatches</span>
                <span className="text-white">Daily 07:00 – 22:00</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Emergency VIP Line</span>
                <a href="tel:+18005893927" className="text-cyan-400 font-bold hover:underline">
                  +1 (800) 589-3927
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} LUXEWASH Inc. All rights reserved. Molecular Garment Architecture.
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-slate-300 transition-colors">
              Purity Policy
            </a>
            <a href="#services" className="hover:text-slate-300 transition-colors">
              Terms of Care
            </a>
            <a
              href="#home"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
