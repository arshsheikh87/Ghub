"use client";

import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { GlassCard } from "./GlassCard";
import type { FeatureCardProps } from "./types";

/**
 * FeatureCard — used in About / Why Choose Us sections.
 * Displays an icon, title, description and optional badge.
 *
 * @example
 * <FeatureCard
 *   icon={<Zap className="w-6 h-6" />}
 *   title="Ultra-Fast PCs"
 *   description="RTX 4090 powered rigs with 360Hz displays."
 *   badge="Premium"
 *   iconGlow
 * />
 */
export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      icon,
      title,
      description,
      badge,
      iconGlow = false,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <GlassCard
        ref={ref}
        glow="purple"
        hover
        accent
        padding="lg"
        className={cn("group flex flex-col gap-5", className)}
        {...rest}
      >
        {/* ── Icon ── */}
        <div
          className={cn(
            "w-14 h-14 rounded-[14px] flex items-center justify-center shrink-0",
            "bg-purple-500/10 border border-purple-500/20",
            "text-purple-400",
            "transition-all duration-300",
            "group-hover:bg-purple-500/20 group-hover:border-purple-500/40",
            iconGlow && "group-hover:shadow-[0_0_24px_rgba(139,92,246,0.4)]"
          )}
          aria-hidden="true"
        >
          {icon}
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col gap-2">
          {/* Title row with optional badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-white font-semibold text-lg leading-snug">
              {title}
            </h3>
            {badge && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-purple-500/15 text-purple-300 border border-purple-500/25">
                {badge}
              </span>
            )}
          </div>

          <p className="text-white/55 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </GlassCard>
    );
  }
);

FeatureCard.displayName = "FeatureCard";
