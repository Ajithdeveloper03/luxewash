"use client";

import React from "react";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { getAssetPath } from "@/lib/basePath";

export default function ReplicaFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-8 px-4 sm:px-8 lg:px-16 border-t-2 border-purple-200/80 z-10 text-base text-slate-950 font-sans bg-white/85 backdrop-blur-[2px] w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <Image
            src={getAssetPath("/luxewash-logo.png")}
            alt="Luxewash"
            width={140}
            height={42}
            className="h-9 w-auto object-contain"
          />
          <span className="hidden sm:inline text-purple-400 font-bold">|</span>
          <span className="font-bold text-slate-950 text-base">
            © {new Date().getFullYear()} Luxewash Premium Laundry & Garment Atelier
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 font-extrabold text-base flex-wrap justify-center">
          <a href="#home" className="text-slate-950 hover:text-purple-900 transition-colors">Home</a>
          <a href="#about" className="text-slate-950 hover:text-purple-900 transition-colors">About</a>
          <a href="#services" className="text-slate-950 hover:text-purple-900 transition-colors">Services</a>
          <a href="#industries" className="text-slate-950 hover:text-purple-900 transition-colors">Industries</a>
          <a href="#fiber-restoration" className="text-slate-950 hover:text-purple-900 transition-colors">Fiber Atelier</a>
          <a href="#contact" className="text-slate-950 hover:text-purple-900 transition-colors">Contact</a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-purple-950 hover:text-purple-800 ml-1 sm:ml-3 font-extrabold px-4 py-1.5 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors border border-purple-200"
          >
            <span>Top</span>
            <ArrowUp className="size-4 text-amber-600 stroke-[3]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
