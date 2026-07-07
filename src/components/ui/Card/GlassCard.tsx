"use client";

import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import type { GlassCardProps } from "./types";

// ─────────────────────────────────────────────
// Padding presets (8px scale)
// ─────────────────────────────────────────────
const paddingMap = {
  none: "",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
} as const;

// ─────────────────────────────────────────────
// Glow border map
// ─────────────────────────────────────────────
const glowMap = {
  purple: "hover:border-purple-500/50 hover:shadow-[0_0_32px_rgba(139,92,246,0.2)]",
  blue:   "hover:border-[#00d4ff]/40   hover:shadow-[0_0_32px_rgba(0,212,255,0.15)]",
  none:   "",
} as const;

/**
 * GlassCard — the foundation card used across the entire site.
 * Glassmorphism surface with configurable glow, hover lift, accent line.
 *
 * @example
 * <GlassCard glow="purple" hover padding="md">
 *   <p>Content here</p>
 * </GlassCard>
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      glow = "none",
      hover = false,
      accent = false,
      padding = "md",
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // ── Base glass surface ──
          "relative rounded-[16px] overflow-hidden",
          "bg-white/[0.04] border border-white/[0.08]",
          "backdrop-blur-md",
          // ── Transition ──
          "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          // ── Hover lift ──
          hover && "hover:-translate-y-1 hover:bg-white/[0.07]",
          // ── Glow on hover ──
          glow !== "none" && glowMap[glow],
          // ── Padding ──
          paddingMap[padding],
          className
        )}
        {...rest}
      >
        {/* ── Top accent line ── */}
        {accent && (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,#8b5cf6,#00d4ff)] rounded-t-[16px]"
          />
        )}

        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
