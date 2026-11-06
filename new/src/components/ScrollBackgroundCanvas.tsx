"use client";

import React, { useEffect, useRef, useState } from "react";
import { getAssetPath } from "@/lib/basePath";

const TOTAL_FRAMES = 240;

const padZero = (num: number, size = 4) => {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

const getFramePath = (index: number) => {
  const frameNum = Math.min(TOTAL_FRAMES, Math.max(1, index + 1));
  return getAssetPath(`/frames/${padZero(frameNum, 4)}.jpg`);
};

export default function ScrollBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef<{ index: number }>({ index: 0 });
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  const renderFrame = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[idx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = imagesRef.current[0];
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = window.innerWidth;
    const ch = window.innerHeight;

    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
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

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    ctx.restore();
  };

  // Preload frames
  useEffect(() => {
    if (typeof window === "undefined") return;

    const images: HTMLImageElement[] = [];

    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      setFirstFrameLoaded(true);
      renderFrame(0);
      window.dispatchEvent(
        new CustomEvent("luxewash:frame", {
          detail: { frameNumber: 1, frameIndex: 0, progress: 0 },
        })
      );
    };
    images.push(firstImg);

    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  // GSAP ScrollTrigger Integration with slower, heavier inertia scrub (6.0s)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let triggerInstance: any = null;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        triggerInstance = ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 14.0,
          onUpdate: (self) => {
            const progress = self.progress;
            const targetIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
            );
            frameRef.current.index = targetIndex;
            renderFrame(targetIndex);

            // Broadcast current frame number to all components
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
      renderFrame(frameRef.current.index);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (triggerInstance) {
        triggerInstance.kill();
      }
    };
  }, [firstFrameLoaded]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
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
    </div>
  );
}
