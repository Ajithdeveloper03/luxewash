"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAssetPath } from "@/lib/basePath";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseFrameCanvasOptions {
  folder: string;
  totalFrames: number;
  triggerRef: React.RefObject<HTMLElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  scrubSpeed?: number;
  scrollDistance?: string;
  scaleMultiplier?: number;
  fitMode?: "cover" | "contain";
  backgroundColor?: string;
  onProgress?: (progress: number, frameIndex: number) => void;
}

export function useFrameCanvas({
  folder,
  totalFrames,
  triggerRef,
  canvasRef,
  scrubSpeed = 1.2,
  scrollDistance = "+=420%",
  scaleMultiplier = 1.0,
  fitMode = "cover",
  backgroundColor = "transparent",
  onProgress,
}: UseFrameCanvasOptions) {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastRenderedIndexRef = useRef<number>(-1);
  const currentFrameRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const onProgressRef = useRef(onProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  const getFrameUrl = useCallback(
    (index: number) => {
      const frameNum = Math.min(totalFrames, Math.max(1, index + 1));
      const padded = String(frameNum).padStart(3, "0");
      return getAssetPath(`/${folder}/ezgif-frame-${padded}.jpg`);
    },
    [folder, totalFrames]
  );

  const renderFrame = useCallback(
    (targetIdx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const images = imagesRef.current;
      if (!images || images.length === 0) return;

      // 1. Target frame
      let img = images[targetIdx];

      // 2. Nearest-frame fallback so canvas never flashes blank
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < totalFrames; offset++) {
          const prev = images[targetIdx - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = images[targetIdx + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }

      // 3. Fallback to frame 0
      if (!img || !img.complete || img.naturalWidth === 0) {
        img = images[0];
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.parentElement?.clientWidth || window.innerWidth;
      const ch = canvas.parentElement?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const targetW = Math.floor(cw * dpr);
      const targetH = Math.floor(ch * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clear / fill backdrop
      if (backgroundColor && backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, cw, ch);
      } else {
        ctx.clearRect(0, 0, cw, ch);
      }

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;

      let renderW = cw;
      let renderH = ch;

      const responsiveContainScale =
        cw < 640
          ? Math.min(0.92, scaleMultiplier * 1.18)
          : cw < 1024
          ? Math.min(0.86, scaleMultiplier * 1.1)
          : scaleMultiplier;

      if (fitMode === "contain") {
        if (canvasRatio > imgRatio) {
          renderH = ch * responsiveContainScale;
          renderW = renderH * imgRatio;
        } else {
          renderW = cw * responsiveContainScale;
          renderH = renderW / imgRatio;
        }
      } else {
        if (canvasRatio > imgRatio) {
          renderW = cw * scaleMultiplier;
          renderH = (cw / imgRatio) * scaleMultiplier;
        } else {
          renderH = ch * scaleMultiplier;
          renderW = ch * imgRatio * scaleMultiplier;
        }
      }

      const offsetX = (cw - renderW) / 2;
      const offsetY = (ch - renderH) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

      ctx.restore();
      lastRenderedIndexRef.current = targetIdx;
    },
    [backgroundColor, canvasRef, fitMode, scaleMultiplier, totalFrames]
  );

  // Preload all frames progressively
  useEffect(() => {
    if (typeof window === "undefined") return;

    const images: HTMLImageElement[] = new Array(totalFrames);
    imagesRef.current = images;

    const frame0 = new Image();
    frame0.src = getFrameUrl(0);
    frame0.onload = () => {
      images[0] = frame0;
      setIsLoaded(true);
      renderFrame(0);
    };
    images[0] = frame0;

    // Priority batch
    const priorityLimit = Math.min(35, totalFrames);
    for (let i = 1; i < priorityLimit; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (currentFrameRef.current === i) {
          renderFrame(i);
        }
      };
      images[i] = img;
    }

    // Remaining frames
    const timer = setTimeout(() => {
      for (let i = priorityLimit; i < totalFrames; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (currentFrameRef.current === i) {
            renderFrame(i);
          }
        };
        images[i] = img;
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      images.forEach((img) => {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      });
    };
  }, [getFrameUrl, renderFrame, totalFrames]);

  // Slow, Steady, Smooth Pinned GSAP ScrollTrigger Playhead
  useEffect(() => {
    if (typeof window === "undefined") return;
    const triggerEl = triggerRef.current;
    if (!triggerEl) return;

    gsap.registerPlugin(ScrollTrigger);

    const playhead = { frame: 0 };

    const ctx = gsap.context(() => {
      gsap.to(playhead, {
        frame: totalFrames - 1,
        ease: "none",
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: scrollDistance,
          pin: true,
          pinSpacing: true,
          scrub: scrubSpeed,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const targetIdx = Math.min(
              totalFrames - 1,
              Math.max(0, Math.round(playhead.frame))
            );

            currentFrameRef.current = targetIdx;

            if (targetIdx !== lastRenderedIndexRef.current) {
              if (animFrameIdRef.current) {
                cancelAnimationFrame(animFrameIdRef.current);
              }
              animFrameIdRef.current = requestAnimationFrame(() => {
                renderFrame(targetIdx);
              });
            }

            if (onProgressRef.current) {
              onProgressRef.current(self.progress, targetIdx);
            }
          },
        },
      });
    }, triggerEl);

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    const handleResize = () => {
      renderFrame(currentFrameRef.current);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      ctx.revert();
    };
  }, [renderFrame, scrubSpeed, scrollDistance, totalFrames, triggerRef]);

  return {
    isLoaded,
    renderFrame,
    currentFrameRef,
  };
}
