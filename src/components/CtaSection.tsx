"use client";

import React from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";

export default function CtaSection() {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-[#FAF8FD] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2E0854] font-body bg-white px-4 py-1.5 rounded-full border border-purple-200/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] inline-block" />
            <span>CONTACT US</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#1E0935] tracking-tight font-display leading-tight">
            Business Enquiries
          </h2>

          <p className="text-slate-600 font-body text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            For commercial partnerships, bulk laundry contracts and recurring service requirements, contact our team. We look forward to exploring how LuxeWash can support your business.
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Direct Commercial Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-purple-100/80 shadow-lg shadow-purple-950/5 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b58d20] font-body">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Commercial Support &amp; Contracts</span>
              </div>

              {/* Contact Item 1: Phone */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center border border-[#D4AF37]/30 shadow-sm shrink-0">
                  <Phone className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-body">
                    Phone &amp; Hotline
                  </span>
                  <a
                    href="tel:+919876543210"
                    onClick={(e) => e.preventDefault()}
                    className="text-base sm:text-lg font-bold text-[#1E0935] hover:text-[#4B1278] transition-colors font-display"
                  >
                    +91 98765 43210
                  </a>
                  <p className="text-xs text-slate-500 font-body mt-0.5">
                    Commercial desk: +91 98765 43211
                  </p>
                </div>
              </div>

              {/* Contact Item 2: Email */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center border border-[#D4AF37]/30 shadow-sm shrink-0">
                  <Mail className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-body">
                    Email Address
                  </span>
                  <a
                    href="mailto:business@luxewash.com"
                    onClick={(e) => e.preventDefault()}
                    className="text-base sm:text-lg font-bold text-[#1E0935] hover:text-[#4B1278] transition-colors font-display"
                  >
                    business@luxewash.com
                  </a>
                  <p className="text-xs text-slate-500 font-body mt-0.5">
                    Proposals: commercial@luxewash.com
                  </p>
                </div>
              </div>

              {/* Contact Item 3: Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center border border-[#D4AF37]/30 shadow-sm shrink-0">
                  <MapPin className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-body">
                    Facility &amp; Operations
                  </span>
                  <p className="text-sm font-semibold text-[#1E0935] font-body leading-snug">
                    LuxeWash Commercial Facility, Industrial Estate, Trichy, Tamil Nadu 620001
                  </p>
                </div>
              </div>

              {/* Contact Item 4: Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1E0935] to-[#2E0854] text-[#f3cf65] flex items-center justify-center border border-[#D4AF37]/30 shadow-sm shrink-0">
                  <Clock className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-body">
                    Operating Schedule
                  </span>
                  <p className="text-sm font-semibold text-[#1E0935] font-body">
                    Mon – Sat: 7:00 AM – 9:00 PM
                  </p>
                  <p className="text-xs text-[#b58d20] font-bold font-body mt-0.5">
                    24/7 Scheduled Commercial Collections &amp; Deliveries
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("open-quote-modal"));
                    }
                  }}
                  className="w-full py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-[#1E0935] via-[#2E0854] to-[#4B1278] hover:from-[#2E0854] hover:to-[#5E1695] border border-[#D4AF37]/60 shadow-lg shadow-purple-950/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer font-body text-sm"
                >
                  <span className="text-[#f3cf65]">Request a Commercial Quote</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Google Map Embed */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative w-full h-[380px] sm:h-[440px] lg:h-full min-h-[380px] rounded-3xl overflow-hidden border border-purple-200/80 shadow-lg shadow-purple-950/5 bg-white">
              <iframe
                title="LuxeWash Commercial Facility Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125413.43343369654!2d78.61898729559868!3d10.790483309995116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa147047970d4f%3A0xb35a09c313a05984!2sTiruchirappalli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[25%] contrast-[1.05]"
              />

              {/* Floating map location pill */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-purple-100 shadow-md flex items-center gap-2 pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E0854] animate-pulse" />
                <span className="text-xs font-bold text-[#1E0935] font-body">
                  Trichy Facility &amp; Central Processing Plant
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
