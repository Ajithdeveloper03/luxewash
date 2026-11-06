"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Truck,
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  preSelectedService = "Artisanal Wash & Fold",
}: BookingModalProps) {
  const [service, setService] = useState(preSelectedService);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [timeSlot, setTimeSlot] = useState("09:00 AM - 11:00 AM");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = "LW-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refCode);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-950 via-[#260830] to-purple-900 text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-purple-950 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Schedule Doorstep Pickup</h3>
              <p className="text-xs text-amber-300 font-medium">Free collection & 24hr delivery across the city</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Booking Confirmed</span>
                <h4 className="text-2xl font-black text-slate-900 mt-1">Valet Scheduled Successfully!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Reference Code: <strong className="text-purple-900 font-mono text-sm">{bookingRef}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf7fd] border border-purple-100 text-left text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">Client:</span>
                  <strong className="text-slate-900">{name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <strong className="text-purple-900">{service}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pickup Date:</span>
                  <strong className="text-slate-900">{date} ({timeSlot})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Address:</span>
                  <strong className="text-slate-900 truncate max-w-[180px]">{address}</strong>
                </div>
                <div className="flex justify-between pt-2 border-t border-purple-100">
                  <span className="text-slate-500">Promo Discount:</span>
                  <strong className="text-emerald-600">20% Applied (LUXE20)</strong>
                </div>
              </div>

              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                A confirmation SMS with live valet tracking link has been dispatched to <strong>{phone}</strong>.
              </p>

              <button
                onClick={handleReset}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-purple-900 to-purple-800 text-amber-300 font-bold text-xs uppercase tracking-wider hover:from-purple-800 hover:to-amber-500 transition-all shadow-md"
              >
                Done & Return to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Select Laundry Care Service
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-200 text-xs sm:text-sm bg-purple-50/40 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-700 font-medium"
                >
                  <option value="Artisanal Wash & Fold">Artisanal Wash & Fold ($2.50/lb)</option>
                  <option value="Executive Couture Dry Cleaning">Executive Couture Dry Cleaning ($9.50/item)</option>
                  <option value="Italian Hand Steam Pressing">Italian Hand Steam Pressing ($4.00/pc)</option>
                  <option value="Luxury Duvet, Linen & Curtains">Luxury Duvet & Bedding Care ($24.00/set)</option>
                  <option value="Wedding Gown & Evening Couture">Wedding Gown & Evening Couture ($85.00+)</option>
                  <option value="Leather, Suede & Shoe Spa">Leather, Suede & Shoe Spa ($35.00+)</option>
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alexander Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Phone Number (SMS Updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-700"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Doorstep Pickup Address & Apt/Suite # *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, building, floor or gate instructions..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-700"
                />
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    2-Hour Valet Window *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-700"
                  >
                    <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM (Morning)</option>
                    <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM (Midday)</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM (Afternoon)</option>
                    <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM (Evening)</option>
                    <option value="07:00 PM - 09:00 PM">07:00 PM - 09:00 PM (Night Express)</option>
                  </select>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Fabric Preferences or Stain Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Light starch on collar, allergy to lavender, red wine stain on blazer lapel..."
                  className="w-full px-3.5 py-2 rounded-xl border border-purple-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-700"
                />
              </div>

              {/* Guarantee Pill */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-2 text-xs text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Zero charge until garments are weighed & verified at facility.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-purple-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01]"
              >
                Confirm Pickup with 20% Discount
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
