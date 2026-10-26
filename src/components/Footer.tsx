"use client";

import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { getAssetPath } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[#100220] text-white py-12 border-t border-purple-900/40 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        {/* Brand Logo */}
        <div className="flex items-center justify-center">
          <div className="relative h-14 w-48">
            <Image
              src={getAssetPath("/images/logo.png")}
              alt="LUXEWASH"
              fill
              sizes="200px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Minimal Brand Tagline */}
        <p className="text-purple-200/80 text-lg max-w-4xl mx-auto font-body leading-relaxed">
          Commercial laundry and linen-care solutions for hotels, hospitals, restaurants, and corporate establishments. Consistent quality, scheduled pickups, and dependable delivery.
        </p>

        {/* Concise Contact Details */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm sm:text-base text-purple-300/80 font-body pt-1">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#d4af37]" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#d4af37]" />
            <span>care@luxewash.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#d4af37]" />
            <span>Trichy</span>
          </div>
        </div>

      
        <div className="pt-4 border-t border-purple-900/40 text-sm text-white font-body">
          &copy; 2026 LUXEWASH Commercial Laundry Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
