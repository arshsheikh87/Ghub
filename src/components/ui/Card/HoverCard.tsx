"use client";

import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/utils/cn";
import type { HoverCardProps } from "./types";

/**
 * HoverCard — a card that reveals secondary content on hover.
 * The trigger content is always visible; reveal content slides in/out.
 * Works as a gallery teaser, game preview, etc.
 *
 * @example
 * <HoverCard
 *   trigger={<img src="..." alt="..." />}
 *   reveal={<div>Extra details</div>}
 *   direction="up"
 * />
 */
export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  ({ trigger, reveal, direction = "up", className, ...rest }, ref) => {
    const [hovered, setHovered] = useState(false);

    // Slide direction config
    const initial  = direction === "up" ? { y: "100%" } : { y: "-100%" };
    const animate  = { y: "0%" };
    const exit     = direction === "up" ? { y: "100%" } : { y: "-100%" };

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "relative rounded-[16px] overflow-hidden cursor-pointer select-none",
          "bg-white/[0.04] border border-white/[0.08]",
          "transition-all duration-300",
          hovered && "border-purple-500/30 shadow-[0_8px_40px_rgba(139,92,246,0.2)]",
          className
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        tabIndex={0}
        aria-expanded={hovered}
        {...rest}
      >
        {/* ── Always-visible trigger content ── */}
        <div className={cn("transition-all duration-300", hovered && "scale-[1.02] brightness-75")}>
          {trigger}
        </div>

        {/* ── Reveal overlay ── */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="reveal"
              initial={{ ...initial, opacity: 0 }}
              animate={{ ...animate, opacity: 1 }}
              exit={{ ...exit, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 bottom-0 p-5 bg-[linear-gradient(to_top,rgba(10,10,15,0.97)_0%,rgba(10,10,15,0.88)_100%)] backdrop-blur-sm"
              aria-live="polite"
            >
              {reveal}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

HoverCard.displayName = "HoverCard";
