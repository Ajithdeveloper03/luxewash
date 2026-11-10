"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Phone, Clock, ShieldCheck, Truck } from "lucide-react";
import { getAssetPath } from "@/lib/basePath";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Waypoint {
  x: number;
  y: number;
  s: number;
}

function catmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
  );
}

function sampleWindPath(points: Waypoint[], progress: number): Waypoint {
  const clamped = Math.min(1, Math.max(0, progress));
  const eased =
    clamped < 0.5
      ? 2 * clamped * clamped
      : 1 - Math.pow(-2 * clamped + 2, 2) / 2;

  const segments = points.length - 1;
  const scaled = eased * segments;
  const idx = Math.min(segments - 1, Math.floor(scaled));
  const localT = scaled - idx;

  const p0 = points[Math.max(0, idx - 1)];
  const p1 = points[idx];
  const p2 = points[Math.min(segments, idx + 1)];
  const p3 = points[Math.min(segments, idx + 2)];

  return {
    x: catmullRom(p0.x, p1.x, p2.x, p3.x, localT),
    y: catmullRom(p0.y, p1.y, p2.y, p3.y, localT),
    s: catmullRom(p0.s, p1.s, p2.s, p3.s, localT),
  };
}

const SKY_CLOUDS = [
  { top: "14%", left: "10%", width: 220, opacity: 0.13, scale: 0.9 },
  { top: "18%", left: "62%", width: 250, opacity: 0.11, scale: 0.95 },
];

const WHITE_BIRDS = [
  { top: "16%", left: "12%", size: 42, scale: 1.0, opacity: 0.9, flapDur: 0.55, glideX: 180, glideY: -24, glideDur: 9 },
  { top: "21%", left: "7%", size: 32, scale: 0.8, opacity: 0.75, flapDur: 0.48, glideX: 165, glideY: -18, glideDur: 9.5 },
  { top: "13%", left: "54%", size: 38, scale: 0.9, opacity: 0.85, flapDur: 0.52, glideX: 150, glideY: -20, glideDur: 10 },
  { top: "30%", left: "76%", size: 36, scale: 0.85, opacity: 0.8, flapDur: 0.5, glideX: -160, glideY: -15, glideDur: 11 },
  { top: "35%", left: "82%", size: 28, scale: 0.7, opacity: 0.7, flapDur: 0.45, glideX: -145, glideY: -12, glideDur: 11.4 },
];

function CloudShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M68 128H296C324.719 128 348 104.719 348 76C348 49.442 328.097 27.542 302.382 24.385C292.192 9.619 275.158 0 255.8 0C229.974 0 208.165 17.246 201.347 40.844C192.416 35.249 181.835 32 170.5 32C141.933 32 118.545 52.616 113.842 79.776C106.03 75.468 97.049 73 87.5 73C57.953 73 34 96.953 34 126.5C34 127.003 34.007 127.503 34.021 128H68Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WhiteBirdShape({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.6)}
      viewBox="0 0 64 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="bird-wings block overflow-visible"
    >
      <path
        d="M2 16 C 14 2, 24 6, 32 20 C 40 6, 50 2, 62 16 C 50 11, 40 15, 32 27 C 24 15, 14 11, 2 16 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

export default function FloatingUmbrellaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const umbrellaFlightRef = useRef<HTMLDivElement>(null);
  const windDriftRef = useRef<HTMLDivElement>(null);
  const pendulumSwingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sectionEl = sectionRef.current;
    const umbrellaEl = umbrellaFlightRef.current;
    const driftEl = windDriftRef.current;
    const swingEl = pendulumSwingRef.current;
    const contentEl = contentRef.current;
    if (!sectionEl || !umbrellaEl || !contentEl) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Subtle Drifting Sky Clouds (2 minimal clouds only)
      const cloudEls = sectionEl.querySelectorAll(".sky-cloud");
      cloudEls.forEach((cloud, idx) => {
        const dir = idx % 2 === 0 ? 1 : -1;
        gsap.to(cloud, {
          x: dir * 55,
          y: idx % 2 === 0 ? -8 : 8,
          duration: 16 + idx * 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      // 2. Natural Flying White Birds (Wing Flapping + Sky Gliding)
      const birdEls = sectionEl.querySelectorAll(".sky-bird");
      birdEls.forEach((bird, idx) => {
        const cfg = WHITE_BIRDS[idx] || WHITE_BIRDS[0];
        const wings = bird.querySelector(".bird-wings");

        if (wings) {
          gsap.fromTo(
            wings,
            { scaleY: 1, y: -2 },
            {
              scaleY: -0.35,
              y: 3,
              duration: cfg.flapDur,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              transformOrigin: "50% 60%",
            }
          );
        }

        gsap.to(bird, {
          x: cfg.glideX,
          y: cfg.glideY,
          duration: cfg.glideDur,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      // 3. Flowing Breeze Streamlines
      const breezePaths = sectionEl.querySelectorAll(".breeze-line");
      breezePaths.forEach((line, idx) => {
        gsap.fromTo(
          line,
          { strokeDashoffset: 700, opacity: 0.14 },
          {
            strokeDashoffset: -700,
            opacity: 0.55,
            duration: 4.8 + idx * 0.6,
            ease: "none",
            repeat: -1,
            delay: idx * 0.5,
          }
        );
      });

      // 4. Natural Multi-Frequency Wind Currents on the Umbrella
      if (driftEl) {
        gsap.to(driftEl, {
          y: -16,
          duration: 3.1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(driftEl, {
          x: 12,
          duration: 4.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      if (swingEl) {
        gsap.fromTo(
          swingEl,
          {
            rotation: -3.2,
            rotationY: -6,
            rotationX: 2.5,
          },
          {
            rotation: 3.2,
            rotationY: 6,
            rotationX: -2.5,
            duration: 3.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }
        );
      }

      // 5. Continuous Spline Wind Flight Path via Pinned ScrollTrigger
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktopOrTablet: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          const waypoints: Waypoint[] = isMobile
            ? [
                { x: 22, y: 78, s: 0.7 },
                { x: 24, y: 24, s: 0.8 },
                { x: 50, y: 20, s: 0.86 },
                { x: 52, y: 44, s: 0.9 },
                { x: 70, y: 22, s: 0.74 },
              ]
            : [
                { x: 18, y: 78, s: 0.78 },
                { x: 22, y: 25, s: 0.88 },
                { x: 50, y: 20, s: 0.95 },
                { x: 52, y: 50, s: 1.04 },
                { x: 74, y: 50, s: 1.0 },
              ];

          gsap.set(contentEl, {
            autoAlpha: 0,
            x: isMobile ? 0 : -36,
            y: isMobile ? 20 : 12,
            pointerEvents: "none",
          });

          gsap.set(umbrellaEl, {
            left: `${waypoints[0].x}%`,
            top: `${waypoints[0].y}%`,
            xPercent: -50,
            yPercent: -50,
            scale: waypoints[0].s,
            rotation: -6,
            force3D: true,
          });

          const flightPhaseRatio = 0.78;
          const driver = { p: 0 };

          gsap.to(driver, {
            p: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top top",
              end: "+=420%",
              pin: true,
              pinSpacing: true,
              scrub: 1.5,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: () => {
                const rawP = driver.p;
                const flightP = Math.min(1, Math.max(0, rawP / flightPhaseRatio));
                const contentP =
                  rawP <= flightPhaseRatio
                    ? 0
                    : Math.min(
                        1,
                        Math.max(0, (rawP - flightPhaseRatio) / (1 - flightPhaseRatio))
                      );

                const pos = sampleWindPath(waypoints, flightP);
                const nextPos = sampleWindPath(
                  waypoints,
                  Math.min(1, flightP + 0.015)
                );

                const dx = nextPos.x - pos.x;
                const dy = nextPos.y - pos.y;

                const settleEnvelope = Math.sin(flightP * Math.PI);
                const rawBank = (dx * 5.2 - dy * 1.4) * settleEnvelope;
                const bankAngle = Math.max(-11, Math.min(11, rawBank));

                umbrellaEl.style.left = `${pos.x}%`;
                umbrellaEl.style.top = `${pos.y}%`;
                umbrellaEl.style.transform = `translate3d(-50%, -50%, 0) scale(${pos.s}) rotate(${bankAngle}deg)`;

                const easedContent =
                  contentP * contentP * (3 - 2 * contentP);
                contentEl.style.opacity = String(easedContent);
                contentEl.style.visibility =
                  easedContent > 0.01 ? "visible" : "hidden";
                contentEl.style.pointerEvents =
                  easedContent > 0.5 ? "auto" : "none";
                const offsetX = isMobile ? 0 : (1 - easedContent) * -36;
                const offsetY = (1 - easedContent) * (isMobile ? 20 : 12);
                contentEl.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
              },
            },
          });
        }
      );
    }, sectionEl);

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  const deliveryPerks = [
    {
      icon: Truck,
      title: "Free doorstep pickup",
      desc: "We collect and return your laundry right to your door.",
    },
    {
      icon: Clock,
      title: "24-hour fresh return",
      desc: "Washed, steam-pressed, and neatly ribbon-packed.",
    },
    {
      icon: ShieldCheck,
      title: "Hygienic single-load wash",
      desc: "Your garments are never mixed with any other order.",
    },
  ];

  return (
    <div className="relative w-full overflow-x-hidden">
      <section
        id="umbrella"
        ref={sectionRef}
        style={{ perspective: "1200px" }}
        className="relative w-full h-screen bg-[#140722] text-white overflow-hidden flex items-end md:items-center px-4 sm:px-8 md:px-10 lg:px-16 pb-6 md:pb-0 not-italic select-none"
      >
        {/* MINIMAL 2 SKY CLOUDS ONLY */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
          {SKY_CLOUDS.map((cloud, idx) => (
            <div
              key={idx}
              style={{
                top: cloud.top,
                left: cloud.left,
                width: `${cloud.width}px`,
                opacity: cloud.opacity,
                transform: `scale(${cloud.scale})`,
              }}
              className="sky-cloud absolute text-purple-100/80 will-change-transform max-w-[45vw]"
            >
              <CloudShape className="w-full h-auto" />
            </div>
          ))}
        </div>

        {/* NATURAL WHITE BIRDS FLYING IN THE SKY */}
        <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden" aria-hidden="true">
          {WHITE_BIRDS.map((bird, idx) => (
            <div
              key={idx}
              style={{
                top: bird.top,
                left: bird.left,
                opacity: bird.opacity,
                transform: `scale(${bird.scale})`,
              }}
              className="sky-bird absolute drop-shadow-[0_4px_10px_rgba(255,255,255,0.35)] will-change-transform"
            >
              <WhiteBirdShape size={bird.size} />
            </div>
          ))}
        </div>

        {/* CONTINUOUS FLOWING BREEZE STREAMLINES */}
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-15"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="breezeStrokePurple" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="50%" stopColor="rgba(233, 213, 255, 0.45)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
            <linearGradient id="breezeStrokeGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0)" />
              <stop offset="50%" stopColor="rgba(251, 191, 36, 0.38)" />
              <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" />
            </linearGradient>
          </defs>

          <path
            d="M 240 720 C 180 460, 260 210, 720 180 C 920 170, 700 450, 1065 450"
            stroke="url(#breezeStrokePurple)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="260 460"
            className="breeze-line"
          />

          <path
            d="M 120 260 C 380 140, 640 260, 920 190 C 1120 130, 1280 220, 1420 190"
            stroke="url(#breezeStrokeGold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="280 420"
            className="breeze-line"
          />

          <path
            d="M -40 480 C 260 360, 540 540, 820 430 C 1020 350, 1180 470, 1480 410"
            stroke="url(#breezeStrokePurple)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="260 440"
            className="breeze-line"
          />
        </svg>

        {/* LEFT SIDE CONTENT: Hidden by default, displays ONLY after Umbrella is placed at Right Center */}
        <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 items-center pointer-events-none">
          <div
            ref={contentRef}
            style={{ opacity: 0, visibility: "hidden" }}
            className="md:col-span-6 space-y-2.5 sm:space-y-4 lg:space-y-5 text-left bg-[#140722]/92 md:bg-transparent p-4 sm:p-6 md:p-0 rounded-2xl sm:rounded-3xl border border-purple-800/50 md:border-none shadow-2xl md:shadow-none will-change-transform"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:py-1.5 rounded-full bg-purple-900/90 border border-amber-400/40 text-amber-300 font-bold text-base shadow-md">
              <Sparkles className="size-4 text-amber-400 shrink-0" />
              <span>Carefree Doorstep Delivery</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Freshly folded laundry{" "}
              <span className="text-amber-400">floated to your door</span>
            </h2>

            <p className="text-purple-100 text-base sm:text-lg font-medium leading-relaxed max-w-xl">
              Every LuxeWash basket arrives crisp, fragrant, and wrapped with care so laundry day feels effortless.
            </p>

            {/* Delivery Perks */}
            <div className="space-y-2 sm:space-y-3 pt-0.5">
              {deliveryPerks.map((perk, idx) => {
                const IconComponent = perk.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-purple-950/90 border border-purple-800/50 shadow-lg"
                  >
                    <div className="size-9 sm:size-11 rounded-xl sm:rounded-2xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                      <IconComponent className="size-4 sm:size-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-white">
                        {perk.title}
                      </h3>
                      <p className="text-purple-200 text-base font-medium leading-snug">
                        {perk.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-1 sm:pt-2">
              <a
                href="tel:+18005893927"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-base shadow-xl transition-transform hover:scale-105"
              >
                <Phone className="size-5 text-purple-950 shrink-0" />
                <span>Call for Free Pickup</span>
              </a>
            </div>
          </div>
        </div>

        {/* REALISTIC CONTINUOUS SPLINE WIND-FLOATING UMBRELLA CONTAINER */}
        <div
          ref={umbrellaFlightRef}
          style={{
            left: "18%",
            top: "78%",
            transform: "translate3d(-50%, -50%, 0) scale(0.78) rotate(-6deg)",
          }}
          className="absolute z-30 flex flex-col items-center justify-center pointer-events-none will-change-transform"
        >
          <div ref={windDriftRef} className="will-change-transform">
            <div
              ref={pendulumSwingRef}
              style={{
                transformOrigin: "50% 12%",
                transformStyle: "preserve-3d",
              }}
              className="relative flex items-center justify-center will-change-transform"
            >
              <img
                src={getAssetPath("/images/luxewash-umbrella.png")}
                alt="LuxeWash Floating Umbrella and Laundry Basket"
                className="w-[170px] sm:w-[240px] md:w-[290px] lg:w-[370px] h-auto object-contain drop-shadow-[0_28px_38px_rgba(0,0,0,0.75)] select-none"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
