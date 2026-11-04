"use client";

import React, { useState } from "react";
import { X, Plus, Minus, Calculator, Sparkles, Check, ArrowRight } from "lucide-react";

interface PriceCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookWithEstimate: (details: string) => void;
}

export default function PriceCalculatorModal({
  isOpen,
  onClose,
  onBookWithEstimate,
}: PriceCalculatorModalProps) {
  const [items, setItems] = useState<{ [key: string]: number }>({
    shirts: 5,
    trousers: 2,
    suits: 1,
    dresses: 0,
    washFoldLbs: 10,
    bedding: 0,
    shoes: 0,
  });

  if (!isOpen) return null;

  const catalog = [
    { id: "washFoldLbs", name: "Wash & Fold Laundry", rate: 2.5, unit: "lb", desc: "Everyday casuals, towels & tees" },
    { id: "shirts", name: "Executive Dress Shirts", rate: 4.5, unit: "pc", desc: "Hand-steamed & hung on wood hangers" },
    { id: "trousers", name: "Trousers & Slacks", rate: 6.0, unit: "pc", desc: "Crease-set steam pressing" },
    { id: "suits", name: "Tailored Suits & Blazers", rate: 14.0, unit: "pc", desc: "Couture dry clean & shoulder-guard" },
    { id: "dresses", name: "Silk / Evening Dresses", rate: 16.0, unit: "pc", desc: "Delicate trim inspection & steam" },
    { id: "bedding", name: "King / Queen Comforter", rate: 25.0, unit: "set", desc: "Down fluffing & ozone sanitized" },
    { id: "shoes", name: "Designer Shoe Spa", rate: 30.0, unit: "pair", desc: "Conditioning & sole restoration" },
  ];

  const updateCount = (id: string, delta: number) => {
    setItems((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const rawSubtotal = catalog.reduce((acc, item) => {
    return acc + (items[item.id] || 0) * item.rate;
  }, 0);

  const discount = rawSubtotal * 0.2; // 20% discount
  const finalTotal = Math.max(0, rawSubtotal - discount);

  const handleBook = () => {
    const summary = `Estimated total: $${finalTotal.toFixed(2)} (${Object.entries(items)
      .filter(([_, qty]) => qty > 0)
      .map(([k, qty]) => `${qty} ${k}`)
      .join(", ")})`;
    onBookWithEstimate(summary);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-950 via-[#260830] to-purple-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-purple-950 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Interactive Price Estimator</h3>
              <p className="text-xs text-amber-300">Transparent pricing • 20% First Order Promo Automatically Applied</p>
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

        {/* Item Selector List */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1 text-slate-800">
          <div className="space-y-2">
            {catalog.map((item) => {
              const qty = items[item.id] || 0;
              const lineTotal = qty * item.rate;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#faf7fd] hover:bg-purple-50/50 border border-purple-100/80 transition-colors"
                >
                  <div className="pr-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-slate-900">{item.name}</span>
                      <span className="text-[11px] font-semibold text-purple-800">
                        ${item.rate.toFixed(2)} / {item.unit}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">{item.desc}</div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-purple-200 shadow-sm">
                      <button
                        onClick={() => updateCount(item.id, -1)}
                        disabled={qty <= 0}
                        className="w-6 h-6 rounded-lg bg-purple-100 disabled:opacity-30 hover:bg-purple-200 text-purple-900 flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-sm font-mono text-purple-950">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateCount(item.id, 1)}
                        className="w-6 h-6 rounded-lg bg-purple-900 hover:bg-purple-800 text-amber-300 flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="w-16 text-right font-bold text-xs text-slate-900 font-mono">
                      ${lineTotal.toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calculation Summary Footer */}
        <div className="p-6 bg-purple-50 border-t border-purple-100 space-y-3">
          <div className="flex justify-between text-xs text-slate-600">
            <span>Standard Subtotal:</span>
            <span className="font-mono font-semibold">${rawSubtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-emerald-700 font-semibold">
            <span>First-Order Promo (20% Off):</span>
            <span className="font-mono">-${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-black text-purple-950 pt-2 border-t border-purple-200">
            <span>Estimated Total:</span>
            <span className="text-xl text-purple-900 font-mono font-black">${finalTotal.toFixed(2)}</span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="w-1/3 py-3 rounded-full border border-purple-200 text-xs font-bold text-slate-600 hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleBook}
              className="w-2/3 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-amber-500 text-purple-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
            >
              <span>Schedule Pickup With This Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
