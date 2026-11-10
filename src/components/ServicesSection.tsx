"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Crown, Shirt, ArrowRight } from "lucide-react";

const SERVICES_CARDS = [
  {
    tag: "24h Delivery",
    title: "Wash & Fold",
    description: "Fresh organic wash, gentle dry, and crisp folding for daily wear.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=700&q=80",
  },
  {
    tag: "48h Delivery",
    title: "Dry Cleaning",
    description: "Gentle non-toxic cleaning for suits, silks, and designer wear.",
    icon: Crown,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80",
  },
  {
    tag: "Same Day",
    title: "Steam Press & Linens",
    description: "Wrinkle-free hand steam finish for shirts, bedding, and curtains.",
    icon: Shirt,
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=700&q=80",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full min-h-screen bg-[#140722] text-white overflow-hidden flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-14 sm:py-16 lg:py-12 not-italic select-none"
    >
      <div className="max-w-7xl w-full mx-auto space-y-6 sm:space-y-8">
        {/* Minimal Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/70 border border-purple-400/30 text-amber-300 font-bold text-base">
            <Sparkles className="size-4 text-amber-400 shrink-0" />
            <span>Our Services</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Tailored care for{" "}
            <span className="text-amber-400">every garment</span>
          </h2>
        </div>

        {/* 3 Minimal Service Cards: 1 col on mobile, 2 cols on sm/md tablets, 3 cols on lg desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`group rounded-2xl sm:rounded-3xl bg-purple-950/80 border border-purple-500/30 hover:border-amber-400/60 shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
                  idx === 2 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="relative w-full h-44 sm:h-48 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-950/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3.5 py-1 rounded-full bg-purple-950/90 border border-purple-400/40 text-amber-300 text-base font-bold">
                      {card.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 size-11 rounded-xl bg-amber-400 text-purple-950 flex items-center justify-center shadow-lg">
                    <Icon className="size-6" />
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4 text-left flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-black text-white">{card.title}</h3>
                    <p className="text-purple-100 text-base leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <a
                    href="tel:+18005893927"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-purple-950 text-base font-black transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Call for Pickup</span>
                    <ArrowRight className="size-5 stroke-[2.5]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
