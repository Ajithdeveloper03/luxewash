"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Tag, Clock } from "lucide-react";

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export default function FinalCTA({ onOpenBooking }: FinalCTAProps) {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [selectedService, setSelectedService] = useState("Artisanal Wash & Fold");
  const [submitted, setSubmitted] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneOrEmail.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        onOpenBooking();
      }, 1200);
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-[#140520] via-[#20072e] to-[#12041d] text-white relative overflow-hidden">
      {/* Background radial matrix */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-purple-600/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c59a3f_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#2a0c3d] via-[#1c062a] to-[#11031b] border-2 border-amber-400/70 shadow-2xl shadow-purple-950/80 text-center">
          
          {/* Top Promotional Promo Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-purple-950 text-xs font-black uppercase tracking-wider mb-6 shadow-md shadow-amber-400/30">
            <Tag className="w-3.5 h-3.5" />
            <span>LIMITED TIME: 20% OFF YOUR FIRST ORDER</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Never Spend Another Weekend <br className="hidden sm:inline" />
            Doing Laundry Again.
          </h2>

          <p className="text-purple-200/90 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Join over 25,000 discerning residents and professionals who enjoy immaculate, fresh garments delivered directly to their doorstep in 24 hours.
          </p>

          {/* Quick Action Form or Success Confirmation */}
          {submitted ? (
            <div className="p-6 rounded-2xl bg-purple-900/90 border border-amber-400 text-amber-200 max-w-md mx-auto animate-in zoom-in-95 duration-300">
              <CheckCircle2 className="w-10 h-10 text-amber-300 mx-auto mb-2" />
              <h4 className="text-lg font-bold text-white">Promo Code LUXE20 Applied!</h4>
              <p className="text-xs text-purple-200 mt-1">
                Opening your booking calendar now...
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleQuickSubmit}
              className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3 bg-purple-950/80 p-2.5 rounded-3xl border border-purple-700/60 shadow-inner"
            >
              <div className="w-full sm:w-1/2">
                <input
                  type="text"
                  required
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder="Enter Phone Number or Email..."
                  className="w-full px-5 py-3.5 rounded-full bg-[#160624] border border-purple-800 text-xs sm:text-sm text-white placeholder-purple-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="w-full sm:w-1/2 flex items-center gap-2">
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-full bg-[#160624] border border-purple-800 text-xs text-purple-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="Artisanal Wash & Fold">Wash & Fold ($2.50/lb)</option>
                  <option value="Executive Couture Dry Cleaning">Dry Cleaning ($9.50/item)</option>
                  <option value="Italian Hand Steam Pressing">Steam Pressing ($4.00/pc)</option>
                  <option value="Luxury Duvet & Bedding">Bedding Care ($24.00)</option>
                </select>

                <button
                  type="submit"
                  className="flex-shrink-0 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-amber-500 text-purple-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-amber-400/20 hover:scale-105"
                >
                  <span>Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-purple-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>100% Satisfaction Re-wash Pledge</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Free 24h Doorstep Pickup & Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Zero Toxic Perc Chemicals</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
