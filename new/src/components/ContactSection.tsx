"use client";

import React, { useState, useEffect, FormEvent } from "react";
import {
  Clock,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Send,
  Building,
} from "lucide-react";

interface ContactSectionProps {
  initialService?: string;
}

export default function ContactSection({ initialService = "Wardrobe Elite" }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: initialService,
    address: "",
    timeSlot: "Morning (08:00 - 12:00)",
    notes: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [bookingRef, setBookingRef] = useState<string>("");

  // Update initialService when prop changes
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  // Live countdown to next express courier dispatch (e.g. resets every 3 hours)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 59, seconds: 59 }; // loop
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    // Simulate instant reservation submission
    setTimeout(() => {
      const randomRef = `LW-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(randomRef);
      setStatus("success");
    }, 900);
  };

  return (
    <section
      id="contact"
      className="relative py-28 bg-[#07090e] border-t border-white/10 overflow-hidden"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-1/4 size-[600px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 size-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Ticking Countdown Window (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-[0.2em] bg-white/[0.03] border border-cyan-500/20 px-3.5 py-1 rounded-full mb-3">
                <Sparkles className="size-3.5" />
                <span>DISPATCH & MANIFEST</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-[1.1]">
                SCHEDULE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">COLLECTION.</span>
              </h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                Our climate-controlled electric vehicle fleet operates continuous daily routes. Reserve your collection window or speak with our commercial linen concierge.
              </p>
            </div>

            {/* Countdown Box: Next Dispatch Window (Selene Style) */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-cyan-500/30">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block mb-1">
                NEXT ON-DEMAND COURIER DISPATCH
              </span>
              <p className="text-xs text-cyan-400 font-mono mb-4">
                Locks in 24h guaranteed turnaround:
              </p>

              <div className="flex items-center gap-3">
                <div className="hud-brackets px-4 py-3 bg-black/60 rounded border border-white/10 text-center min-w-[70px]">
                  <span className="font-display text-2xl text-white font-bold tabular-nums">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="block font-mono text-[9px] text-slate-400 uppercase mt-0.5">
                    HOURS
                  </span>
                </div>
                <span className="font-display text-xl text-cyan-400 font-bold">:</span>
                <div className="hud-brackets px-4 py-3 bg-black/60 rounded border border-white/10 text-center min-w-[70px]">
                  <span className="font-display text-2xl text-white font-bold tabular-nums">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="block font-mono text-[9px] text-slate-400 uppercase mt-0.5">
                    MINS
                  </span>
                </div>
                <span className="font-display text-xl text-cyan-400 font-bold">:</span>
                <div className="hud-brackets px-4 py-3 bg-black/60 rounded border border-white/10 text-center min-w-[70px]">
                  <span className="font-display text-2xl text-cyan-300 font-bold tabular-nums">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="block font-mono text-[9px] text-cyan-400 uppercase mt-0.5">
                    SECS
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Contact Channels */}
            <div className="space-y-4 pt-2 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="size-9 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Phone className="size-4" />
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">
                    Direct Client Concierge
                  </span>
                  <a href="tel:+18005893927" className="text-white hover:text-cyan-400 font-bold">
                    +1 (800) 589-3927 (LUXEWASH)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="size-9 rounded-lg bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Mail className="size-4" />
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">
                    Commercial Inquiries & Manifests
                  </span>
                  <a href="mailto:concierge@luxewash.com" className="text-white hover:text-purple-400 font-bold">
                    concierge@luxewash.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="size-9 rounded-lg bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">
                    Central Facility Headquarters
                  </span>
                  <span className="text-white">
                    4200 Precision Way, Molecular District, Tech City
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Manifest Booking Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0f172a] via-[#0b101c] to-[#07090e] border border-white/10 shadow-2xl">
              {status === "success" ? (
                <div className="text-center py-12 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="size-20 rounded-full bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                    <CheckCircle2 className="size-10" />
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
                      COLLECTION LOGGED // DISPATCH CONFIRMED
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-white font-bold uppercase">
                      Reservation Received
                    </h3>
                    <p className="text-slate-300 text-sm max-w-md mx-auto">
                      Your booking manifest has been recorded. Our courier team will arrive during your selected window with moisture-barrier collection hampers.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 max-w-sm mx-auto font-mono text-xs space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>Manifest Reference:</span>
                      <span className="text-cyan-400 font-bold">{bookingRef}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Client Name:</span>
                      <span className="text-white">{formData.name}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Service Tier:</span>
                      <span className="text-white">{formData.service}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        service: "Wardrobe Elite",
                        address: "",
                        timeSlot: "Morning (08:00 - 12:00)",
                        notes: "",
                      });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs uppercase tracking-wider font-bold transition-all"
                  >
                    <span>Schedule Another Pickup</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-2">
                    <span className="font-display text-lg text-white font-bold uppercase">
                      Manifest Reservation
                    </span>
                    <span className="font-mono text-xs text-cyan-400">
                      // STEP 01 OF 01
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-1.5">
                        Full Name / Company *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Victoria Sterling"
                        className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="v.sterling@domain.com"
                        className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-1.5">
                        Service Tier Program
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#0c1424] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 font-sans cursor-pointer"
                      >
                        <option value="Wardrobe Elite">Wardrobe Elite (24h Standard)</option>
                        <option value="Couture & Atelier">Couture & Atelier (Designer Silks)</option>
                        <option value="Hospitality & Linens">Hospitality & Linens (Bulk Commercial)</option>
                        <option value="Express 4-Hour">Express 4-Hour (Priority VIP)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-1.5">
                        Pickup Address / Hotel Suite
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="742 Evergreen Terrace, Penthouse 4"
                        className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-1.5">
                        Preferred Window
                      </label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#0c1424] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 font-sans cursor-pointer"
                      >
                        <option value="Morning (08:00 - 12:00)">Morning (08:00 - 12:00)</option>
                        <option value="Afternoon (12:00 - 16:00)">Afternoon (12:00 - 16:00)</option>
                        <option value="Evening (16:00 - 20:00)">Evening (16:00 - 20:00)</option>
                        <option value="Immediate Express Window">Immediate Express Window (&lt; 60 mins)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-1.5">
                      Special Garment Instructions / Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Please treat delicate cashmere sweater on cold cycle; extra starch on dress shirts."
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 font-sans resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="font-mono text-xs text-rose-400">
                      * Please fill in your name, email, and contact number.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-mono text-xs uppercase tracking-wider font-extrabold shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <span>Transmitting Manifest...</span>
                    ) : (
                      <>
                        <Send className="size-4" />
                        <span>Confirm Collection Manifest</span>
                      </>
                    )}
                  </button>

                  <p className="font-mono text-[10px] text-slate-500 text-center uppercase tracking-wider pt-2">
                    Zero cancellation fees · Contactless doorstep collection · 100% garment insurance
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
