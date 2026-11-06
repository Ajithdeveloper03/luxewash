"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="w-full bg-[#160424] text-purple-200/90 pt-10 sm:pt-12 pb-6 border-t border-purple-950">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 border-b border-purple-900/50">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-3">
                <div className="relative h-11 w-44">
                  <Image
                    src="/images/logo-2.png"
                    alt="Luxewash"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <span className="font-sans text-[8.5px] tracking-[0.24em] uppercase text-purple-300 font-semibold block mt-1">
                  PROFESSIONAL LINEN CARE &amp; COMMERCIAL LAUNDRY
                </span>
              </Link>

              <p className="text-[13.5px] leading-relaxed text-purple-300/70 max-w-sm mt-2">
                Bespoke commercial textile care, high-capacity hygienic sanitization, and scheduled logistical management for the finest hospitality, culinary, wellness, and medical brands.
              </p>
            </div>

            <div className="mt-8 space-y-2.5 text-xs text-purple-300/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Central Processing Plant: 104 Industry Parkway, Metro Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>24/7 Operations Desk: +1 (800) 589-3927</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>commercial@luxewash.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-5">
              Who We Care For
            </h4>
            <ul className="space-y-3 text-[13px]">
              <li><a href="#industries" className="hover:text-white transition-colors">Hotels &amp; Resorts</a></li>
              <li><a href="#industries" className="hover:text-white transition-colors">Restaurants &amp; Catering</a></li>
              <li><a href="#industries" className="hover:text-white transition-colors">Salons &amp; Day Spas</a></li>
              <li><a href="#industries" className="hover:text-white transition-colors">Clinics &amp; Healthcare</a></li>
              <li><a href="#industries" className="hover:text-white transition-colors">Corporate Uniforms</a></li>
            </ul>
          </div>

          {/* Process & Facility */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-5">
              Operations
            </h4>
            <ul className="space-y-3 text-[13px]">
              <li><a href="#approach" className="hover:text-white transition-colors">The LuxeWash Approach</a></li>
              <li><a href="#facility" className="hover:text-white transition-colors">Commercial Facility</a></li>
              <li><a href="#estimator" className="hover:text-white transition-colors">Volume Estimator</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Sanitization Standards</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">RFID Inventory Tracking</a></li>
            </ul>
          </div>

          {/* Certifications */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-5">
              Standards &amp; Accreditations
            </h4>
            <div className="space-y-3 text-xs text-purple-300/80">
              <div className="p-3 bg-purple-950/40 border border-purple-900/60 rounded">
                <div className="font-semibold text-white mb-0.5">HLAC Certified</div>
                <div>Healthcare Laundry Accreditation Council hygiene standards.</div>
              </div>
              <div className="p-3 bg-purple-950/40 border border-purple-900/60 rounded">
                <div className="font-semibold text-white mb-0.5">Eco-Thermal Water Recovery</div>
                <div>Closed-loop thermal exchange saves 45% water &amp; energy.</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-400/70 gap-4">
          <p>© 2026 LuxeWash Linen Care &amp; Lesako Laundry. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">SLA Guidelines</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
