"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, Clock, Phone } from "lucide-react";

export default function ReplicaContact() {
  const [selectedService, setSelectedService] = useState("Wardrobe Elite");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  const services = [
    "Wardrobe Elite (24h)",
    "Couture & Atelier (48h)",
    "Hospitality Linens",
    "Express (4-Hour)",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-[100vh] h-auto lg:h-screen lg:max-h-screen w-full flex flex-col justify-center items-center py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-16 z-10 box-border overflow-y-auto lg:overflow-hidden"
    >
      {/* Main 2-Column Layout: Left Editorial, Right Booking Form */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center z-10 my-auto">
        {/* Left Column: Large Editorial & Dispatch Telemetry */}
        <div className="lg:col-span-5 text-left space-y-3.5 sm:space-y-4">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.08] [text-shadow:0_1px_10px_rgb(255_255_255/0.95)]">
            Schedule Your <br />
            <span className="text-purple-950">White-Glove Laundry Pickup</span>
          </h2>

          <p className="text-slate-950 text-base sm:text-lg font-bold leading-relaxed max-w-md">
            Our couriers arrive with sterile hampers and RFID garment bags. Same-day on-demand laundry collection and return across luxury residences, hotel suites, and private aviation terminals.
          </p>

          <div className="space-y-2.5 pt-1">
            {/* <div className="p-3.5 sm:p-4 rounded-2xl bg-white/50 hover:bg-white/65 border border-white/60 backdrop-blur-md shadow-sm flex items-center justify-between transition-all"> */}
              {/* <div className="flex items-center gap-2.5 text-base text-purple-950 font-black">
                <Clock className="size-5 text-amber-600" />
                <span>Next Laundry Courier: Within 18 Minutes</span>
              </div> */}
              {/* <span className="inline-flex items-center gap-1.5 text-base font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                <span className="size-2.5 rounded-full bg-emerald-600 animate-pulse" />
                Active
              </span> */}
            {/* </div> */}

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/50 hover:bg-white/65 border border-white/60 backdrop-blur-md shadow-sm flex items-center justify-between transition-all">
              <div className="flex items-center gap-2.5 text-base text-purple-950 font-black">
                <Phone className="size-5 text-purple-700" />
                <span>VIP Laundry Concierge</span>
              </div>
              <span className="text-base md:text-lg font-black text-slate-950">
                +1 (800) LUXE-WASH
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Glassmorphic Booking Form with increased opacity & blur */}
        <div className="lg:col-span-7">
          <div className="bg-white/60 border border-white/70 rounded-3xl p-5 sm:p-7 backdrop-blur-md shadow-2xl shadow-purple-950/10 space-y-4">
            {submitted ? (
              <div className="py-8 text-center space-y-2.5 animate-in fade-in duration-300">
                <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="size-7" />
                </div>
                <h3 className="text-xl font-black text-slate-950">Laundry Pickup Scheduled</h3>
                <p className="text-slate-950 font-bold text-base max-w-sm mx-auto">
                  Our white-glove courier is en route with sterile hampers for your garments.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Service Selection Pills */}
                <div>
                  <label className="block text-base font-black text-slate-950 uppercase tracking-wider mb-2">
                    Select Laundry Service
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {services.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={`px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-base font-extrabold text-center transition-all leading-snug ${
                          selectedService === service
                            ? "bg-purple-950 text-amber-300 border-2 border-amber-400/50 shadow-md"
                            : "bg-purple-50/80 text-slate-950 border border-purple-200 hover:bg-purple-100"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2-column input fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-base font-black text-slate-950 uppercase tracking-wider mb-1">
                      Name / Company
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Julian Moreau / Suite 402"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-purple-200 text-slate-950 font-bold text-base focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-base font-black text-slate-950 uppercase tracking-wider mb-1">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="142 Ocean Promenade, Suite 4"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-purple-200 text-slate-950 font-bold text-base focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white font-black text-base sm:text-lg tracking-wide shadow-xl shadow-purple-950/25 border-2 border-amber-400/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 pt-1"
                >
                  <span>Confirm Laundry Pickup</span>
                  <ArrowUpRight className="size-5 text-amber-300 stroke-[3]" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
