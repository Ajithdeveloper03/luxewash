"use client";

import React from "react";
import { getAssetPath } from "@/lib/basePath";

export default function LuxuryFooter() {
  return (
    <footer className="relative w-full py-8 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#0a0312] text-white border-t border-purple-900/60 overflow-hidden not-italic select-none">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 text-center lg:text-left">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <div className="p-2 rounded-2xl bg-white">
            <img
              src={getAssetPath("/luxewash-logo.png")}
              alt="LuxeWash"
              width={150}
              height={44}
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </div>
          <span className="hidden sm:inline text-purple-600 font-bold">|</span>
          <p className="text-base text-purple-200 font-medium">
            © 2026 LuxeWash Laundry Care.
          </p>
        </div>

        {/* Minimal Links */}
        <div className="flex items-center gap-4 sm:gap-6 text-base font-bold text-purple-200 flex-wrap justify-center">
          <a href="#home" className="hover:text-amber-400 transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-amber-400 transition-colors">
            About Us
          </a>
          <a href="#technology" className="hover:text-amber-400 transition-colors">
            Fabric Care
          </a>
          <a href="#services" className="hover:text-amber-400 transition-colors">
            Services
          </a>
          <a href="#extraction" className="hover:text-amber-400 transition-colors">
            Stain Wash
          </a>
          <a href="#umbrella" className="hover:text-amber-400 transition-colors">
            Delivery
          </a>
          <a href="#testimonial" className="hover:text-amber-400 transition-colors">
            Reviews
          </a>
        </div>
      </div>
    </footer>
  );
}
