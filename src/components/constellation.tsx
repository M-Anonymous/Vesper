"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; vx: number; vy: number };

function readColor() {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--constellation")
    .trim();
  return value || "rgba(36, 94, 88, 0.5)";
}

export function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = media.matches;
    let frame = 0;
    let running = true;
    let color = readColor();
    const points: Point[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const seed = () => {
      points.length = 0;
      const count = window.innerWidth < 640 ? 16 : 28;
      for (let index = 0; index < count; index += 1) {
        points.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
        });
      }
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);

      if (!reduce) {
        for (const point of points) {
          point.x += point.vx;
          point.y += point.vy;
          if (point.x < 0 || point.x > width) point.vx *= -1;
          if (point.y < 0 || point.y > height) point.vy *= -1;
        }
      }

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i];
          const b = points[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 128) {
            context.strokeStyle = color;
            context.globalAlpha = (1 - distance / 128) * 0.42;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      context.globalAlpha = 0.85;
      context.fillStyle = color;
      for (const point of points) {
        context.beginPath();
        context.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;

      if (running && !reduce && !document.hidden) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    const start = () => {
      window.cancelAnimationFrame(frame);
      if (!document.hidden) draw();
    };

    const onResize = () => {
      resize();
      seed();
      start();
    };

    const onMotion = () => {
      reduce = media.matches;
      start();
    };

    const observer = new MutationObserver(() => {
      color = readColor();
      if (reduce || document.hidden) draw();
    });

    resize();
    seed();
    start();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", start);
    media.addEventListener("change", onMotion);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", start);
      media.removeEventListener("change", onMotion);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
