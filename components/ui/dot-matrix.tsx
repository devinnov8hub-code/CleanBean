"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/app/utils/cn";

export interface DotMatrixProps {
  color?: string;
  background?: string;
  dotSize?: number;
  gap?: number;
  opacity?: number;
  fade?: boolean;
  activeColor?: string;
  activeDotSize?: number;
  radius?: number;
  restOpacity?: number;
  className?: string;
}

type RGB = { r: number; g: number; b: number };

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function parseColor(context: CanvasRenderingContext2D, color: string): RGB {
  if (typeof CSS !== "undefined" && !CSS.supports("color", color)) {
    throw new Error(`Unsupported DotMatrix color: "${color}"`);
  }

  const previousFillStyle = context.fillStyle;
  context.fillStyle = color;
  const normalized = String(context.fillStyle);
  context.fillStyle = previousFillStyle;

  const hex = normalized.match(/^#([0-9a-f]{3,8})$/i)?.[1];
  if (hex) {
    const expanded =
      hex.length === 3 || hex.length === 4
        ? hex
            .slice(0, 3)
            .split("")
            .map((channel) => channel + channel)
            .join("")
        : hex.slice(0, 6);
    return {
      r: Number.parseInt(expanded.slice(0, 2), 16),
      g: Number.parseInt(expanded.slice(2, 4), 16),
      b: Number.parseInt(expanded.slice(4, 6), 16),
    };
  }

  const channels = normalized.match(
    /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i,
  );
  if (channels) {
    return {
      r: Number(channels[1]),
      g: Number(channels[2]),
      b: Number(channels[3]),
    };
  }

  throw new Error(`Unable to parse DotMatrix color: "${color}"`);
}

function makeColorPalette(
  context: CanvasRenderingContext2D,
  color: string,
  activeColor: string,
) {
  const resting = parseColor(context, color);
  const active = parseColor(context, activeColor);
  const paletteSteps = 64;

  return Array.from({ length: paletteSteps + 1 }, (_, index) => {
    const mix = index / paletteSteps;
    const r = Math.round(resting.r + (active.r - resting.r) * mix);
    const g = Math.round(resting.g + (active.g - resting.g) * mix);
    const b = Math.round(resting.b + (active.b - resting.b) * mix);
    return `rgb(${r}, ${g}, ${b})`;
  });
}

export function DotMatrix({
  color = "#d1d5db",
  background = "transparent",
  dotSize = 1.5,
  gap = 20,
  opacity = 1,
  fade = true,
  activeColor = "#16a34a",
  activeDotSize = 4.5,
  radius = 120,
  restOpacity = 0.25,
  className,
}: DotMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !parent || !context) return;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let pointerX = 0;
    let pointerY = 0;
    let pointerClientX = 0;
    let pointerClientY = 0;
    let pointerInside = false;
    let prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frameId: number | null = null;
    let dotX = new Float32Array(0);
    let dotY = new Float32Array(0);
    let edgeOpacity = new Float32Array(0);
    let influence = new Float32Array(0);

    const safeGap = Math.max(1, gap);
    const baseSize = Math.max(0, dotSize);
    const enlargedSize = Math.max(0, activeDotSize);
    const interactionRadius = Math.max(0, radius);
    const maxOpacity = Math.max(0, Math.min(1, opacity));
    const idleOpacity = Math.max(0, Math.min(1, restOpacity));
    const colorPalette = makeColorPalette(context, color, activeColor);
    const paletteSteps = colorPalette.length - 1;

    const draw = (animate: boolean) => {
      if (background.trim().toLowerCase() === "transparent") {
        context.clearRect(0, 0, width, height);
      } else {
        context.fillStyle = background;
        context.fillRect(0, 0, width, height);
      }

      let isAnimating = false;
      const radiusSquared = interactionRadius * interactionRadius;

      for (let index = 0; index < dotX.length; index += 1) {
        let currentInfluence = influence[index];
        let targetInfluence = 0;

        if (
          !prefersReducedMotion &&
          pointerInside &&
          interactionRadius > 0
        ) {
          const dx = dotX[index] - pointerX;
          const dy = dotY[index] - pointerY;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared < radiusSquared) {
            const distance = Math.sqrt(distanceSquared);
            targetInfluence = 1 - smoothstep(0, 1, distance / interactionRadius);
          }
        }

        if (animate) {
          const difference = targetInfluence - currentInfluence;
          if (Math.abs(difference) > 0.001) {
            currentInfluence += difference * 0.15;
            if (Math.abs(targetInfluence - currentInfluence) <= 0.001) {
              currentInfluence = targetInfluence;
            } else {
              isAnimating = true;
            }
          } else {
            currentInfluence = targetInfluence;
          }
        } else {
          currentInfluence = 0;
        }
        influence[index] = currentInfluence;

        const size = baseSize + (enlargedSize - baseSize) * currentInfluence;
        if (size <= 0) continue;

        const alpha =
          maxOpacity *
          (idleOpacity + (1 - idleOpacity) * currentInfluence) *
          edgeOpacity[index];
        if (alpha <= 0) continue;

        context.globalAlpha = alpha;
        context.fillStyle =
          colorPalette[Math.round(currentInfluence * paletteSteps)];
        context.beginPath();
        context.arc(dotX[index], dotY[index], size, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      return isAnimating;
    };

    const requestFrame = () => {
      if (!prefersReducedMotion && frameId === null) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      frameId = null;
      if (draw(true)) requestFrame();
    };

    const resizeCanvas = () => {
      const bounds = parent.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const columns = width > 0 ? Math.ceil(width / safeGap) : 0;
      const rows = height > 0 ? Math.ceil(height / safeGap) : 0;
      const dotCount = columns * rows;
      dotX = new Float32Array(dotCount);
      dotY = new Float32Array(dotCount);
      edgeOpacity = new Float32Array(dotCount);
      influence = new Float32Array(dotCount);

      const halfWidth = width / 2;
      const halfHeight = height / 2;
      let index = 0;
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = safeGap / 2 + column * safeGap;
          const y = safeGap / 2 + row * safeGap;
          dotX[index] = x;
          dotY[index] = y;

          if (fade && halfWidth > 0 && halfHeight > 0) {
            const normalizedX = (x - halfWidth) / halfWidth;
            const normalizedY = (y - halfHeight) / halfHeight;
            const distanceFromCenter = Math.sqrt(
              normalizedX * normalizedX + normalizedY * normalizedY,
            );
            edgeOpacity[index] =
              1 - smoothstep(0.55, 1.4, distanceFromCenter);
          } else {
            edgeOpacity[index] = 1;
          }
          index += 1;
        }
      }

      const boundsAfterResize = parent.getBoundingClientRect();
      if (pointerInside) {
        pointerX = pointerClientX - boundsAfterResize.left;
        pointerY = pointerClientY - boundsAfterResize.top;
      }

      draw(false);
      if (pointerInside) requestFrame();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (prefersReducedMotion) return;
      const bounds = parent.getBoundingClientRect();
      pointerClientX = event.clientX;
      pointerClientY = event.clientY;
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      pointerInside = true;
      requestFrame();
    };

    const handlePointerLeave = () => {
      pointerInside = false;
      requestFrame();
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
      if (prefersReducedMotion) {
        pointerInside = false;
        if (frameId !== null) {
          window.cancelAnimationFrame(frameId);
          frameId = null;
        }
        influence.fill(0);
        draw(false);
      }
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    parent.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    parent.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });
    motionPreference.addEventListener("change", handleMotionPreferenceChange);
    resizeObserver.observe(parent);
    resizeCanvas();

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      parent.removeEventListener("pointermove", handlePointerMove);
      parent.removeEventListener("pointerleave", handlePointerLeave);
      motionPreference.removeEventListener(
        "change",
        handleMotionPreferenceChange,
      );
    };
  }, [
    activeColor,
    activeDotSize,
    background,
    color,
    dotSize,
    fade,
    gap,
    opacity,
    radius,
    restOpacity,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none h-full w-full", className)}
    />
  );
}

export default DotMatrix;
