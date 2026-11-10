"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { getAssetPath, getRuntimeBasePath } from "@/lib/basePath";

const TOTAL_FRAMES = 300;

const padZero = (num: number, size = 4) => {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

export default function ScrollBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef<{ index: number }>({ index: 0 });
  const lastRenderedIndexRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const workingPrefixRef = useRef<string | null>(null);

  // Helper to construct frame URL with verified prefix or dynamic fallback
  const constructFrameUrl = useCallback((index: number, prefix?: string | null) => {
    const frameNum = Math.min(TOTAL_FRAMES, Math.max(1, index + 1));
    const filename = `${padZero(frameNum, 4)}.jpg`;

    if (prefix !== undefined && prefix !== null) {
      const clean = prefix.replace(/\/+$/, "");
      return `${clean}/frames/${filename}`;
    }

    if (workingPrefixRef.current !== null) {
      const clean = workingPrefixRef.current.replace(/\/+$/, "");
      return `${clean}/frames/${filename}`;
    }

    return getAssetPath(`/frames/${filename}`);
  }, []);

  // High performance render with nearest-frame fallback (zero blank flash)
  const renderFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Try target frame
    let img = imagesRef.current[idx];

    // 2. If target frame isn't loaded yet, find the closest available loaded frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[idx - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[idx + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    // 3. Fallback to frame 0
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = imagesRef.current[0];
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = window.innerWidth;
    const ch = window.innerHeight;

    const targetW = Math.floor(cw * dpr);
    const targetH = Math.floor(ch * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let renderW = cw;
    let renderH = ch;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderW = cw;
      renderH = cw / imgRatio;
      offsetY = (ch - renderH) / 2;
    } else {
      renderH = ch;
      renderW = ch * imgRatio;
      offsetX = (cw - renderW) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    ctx.restore();
    lastRenderedIndexRef.current = idx;
  }, []);

  // Frame initialization and progressive loading
  useEffect(() => {
    if (typeof window === "undefined") return;

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    // Detect working prefix by probing candidates
    const candidatePrefixes = [
      getRuntimeBasePath(),
      "/laundry",
      "",
      ".",
    ];

    let candidateIndex = 0;

    const tryLoadFirstFrame = (prefix: string) => {
      const probeImg = new Image();
      probeImg.src = constructFrameUrl(0, prefix);

      probeImg.onload = () => {
        workingPrefixRef.current = prefix;
        images[0] = probeImg;
        setFirstFrameLoaded(true);
        renderFrame(0);

        window.dispatchEvent(
          new CustomEvent("luxewash:frame", {
            detail: { frameNumber: 1, frameIndex: 0, progress: 0 },
          })
        );

        // Progressively preload the remaining 299 frames
        for (let i = 1; i < TOTAL_FRAMES; i++) {
          const img = new Image();
          img.src = constructFrameUrl(i, prefix);
          img.onload = () => {
            // If the user is currently paused at this frame, sharpen it
            if (frameRef.current.index === i) {
              renderFrame(i);
            }
          };
          images[i] = img;
        }
      };

      probeImg.onerror = () => {
        candidateIndex++;
        if (candidateIndex < candidatePrefixes.length) {
          tryLoadFirstFrame(candidatePrefixes[candidateIndex]);
        }
      };
    };

    tryLoadFirstFrame(candidatePrefixes[0]);

    return () => {
      if (imagesRef.current) {
        imagesRef.current.forEach((img) => {
          if (img) {
            img.onload = null;
            img.onerror = null;
          }
        });
      }
    };
  }, [constructFrameUrl, renderFrame]);

  // Silky Smooth GSAP ScrollTrigger Integration (steady 1.0s scrub)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let isMounted = true;
    let triggerInstance: any = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!isMounted) return;
        gsap.registerPlugin(ScrollTrigger);

        triggerInstance = ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.0, // Buttery smooth, responsive scrub with natural momentum
          onUpdate: (self) => {
            if (!isMounted) return;
            const progress = self.progress;
            const targetIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
            );

            frameRef.current.index = targetIndex;

            // Only redraw if frame index changed to prevent thrashing
            if (targetIndex !== lastRenderedIndexRef.current) {
              if (animFrameIdRef.current) {
                cancelAnimationFrame(animFrameIdRef.current);
              }
              animFrameIdRef.current = requestAnimationFrame(() => {
                if (isMounted) {
                  renderFrame(targetIndex);
                }
              });
            }

            // Broadcast current frame number to syncing components
            window.dispatchEvent(
              new CustomEvent("luxewash:frame", {
                detail: {
                  frameNumber: targetIndex + 1,
                  frameIndex: targetIndex,
                  progress,
                },
              })
            );
          },
        });
      }
    );

    const handleResize = () => {
      if (isMounted) {
        renderFrame(frameRef.current.index);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (triggerInstance) {
        triggerInstance.kill();
      }
    };
  }, [renderFrame]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      {/* Subtle tint overlay for mobile and tablet (till medium screens) to enhance text contrast */}
      <div className="absolute inset-0 bg-slate-950/25 sm:bg-slate-950/20 lg:bg-transparent pointer-events-none transition-colors duration-300" />
    </div>
  );
}
