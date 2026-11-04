"use client";

import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/site";

interface NavbarProps {
  onOpenPlanCare: (industry?: string) => void;
}

export default function Navbar({ onOpenPlanCare }: NavbarProps) {
  return (
    <header className="absolute left-0 right-0 top-0 z-50 bg-gradient-to-b from-white/95 via-white/70 to-transparent py-3 sm:py-5">
      <div className="relative mx-auto flex min-h-12 max-w-[1380px] items-center justify-between px-4 sm:min-h-14 sm:px-8">
        <nav className="hidden items-center gap-14 text-lg font-semibold text-[#240a3e] lg:flex">
          <Link href="#facility">Home</Link>
          <Link href="#hospitality">Hospitality</Link>
          <Link href="#industries">Industries</Link>
        </nav>
        <Link href="#facility" className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Image src={assetPath("/images/logo-2.png")} alt="Luxewash" width={210} height={68} className="h-12 w-auto object-contain sm:h-16" priority />
        </Link>
        <nav className="hidden items-center gap-14 text-lg font-semibold text-[#240a3e] lg:flex">
          <Link href="#services">Services</Link>
          <Link href="#testimonials">Testimonials</Link>
          <button type="button" onClick={() => onOpenPlanCare()} className="rounded bg-[#240a3e] px-5 py-3 text-base text-white">
            Plan Your Care
          </button>
        </nav>
        <button type="button" onClick={() => onOpenPlanCare()} className="absolute right-4 top-1/2 z-20 -translate-y-1/2 whitespace-nowrap rounded bg-[#240a3e] px-2.5 py-2 text-[10px] font-semibold text-white sm:right-8 sm:px-4 sm:py-3 sm:text-sm lg:hidden">
          Plan Your Care
        </button>
      </div>
    </header>
  );
}
