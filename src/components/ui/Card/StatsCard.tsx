"use client";

import { forwardRef } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/utils/cn";
import type { StatsCardProps, StatsTrend } from "./types";

// ─────────────────────────────────────────────
// Icon accent colour map
// ─────────────────────────────────────────────
const iconColorMap: Record<string, string> = {
  purple: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  blue:   "bg-[#00d4ff]/10  text-[#00d4ff]  border-[#00d4ff]/20",
  green:  "bg-emerald-500/12 text-emerald-400 border-emerald-500/20",
  orange: "bg-orange-500/12  text-orange-400  border-orange-500/20",
  red:    "bg-red-500/12     text-red-400     border-red-500/20",
};

// ─────────────────────────────────────────────
// Trend helpers
// ─────────────────────────────────────────────
const trendConfig: Record<StatsTrend, { icon: typeof TrendingUp; color: string }> = {
  up:      { icon: TrendingUp,   color: "text-emerald-400" },
  down:    { icon: TrendingDown, color: "text-red-400" },
  neutral: { icon: Minus,        color: "text-white/40" },
};

/**
 * StatsCard — KPI tile used in the Admin Dashboard.
 * Shows a large value, label, optional icon, and trend indicator.
 *
 * @example
 * <StatsCard
 *   label="Total Bookings"
 *   value="1,248"
 *   trend="+12%"
 *   trendDirection="up"
 *   icon={<CalendarCheck />}
 *   iconColor="purple"
 * />
 */
export const StatsCard = forwardRef<HTMLDivElement, StatsCardProps>(
  (
    {
      label,
      value,
      trend,
      trendDirection = "neutral",
      icon,
      iconColor = "purple",
      className,
      ...rest
    },
    ref
  ) => {
    const { icon: TrendIcon, color: trendColor } = trendConfig[trendDirection];
    const iconStyle = iconColorMap[iconColor] ?? iconColorMap.purple;

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-[16px] overflow-hidden p-6",
          "bg-white/[0.04] border border-white/[0.08]",
          "transition-all duration-300",
          "hover:bg-white/[0.06] hover:border-white/[0.14]",
          className
        )}
        {...rest}
      >
        {/* Subtle corner glow */}
        <div
          aria-hidden="true"
          className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-purple-600/10 blur-2xl pointer-events-none"
        />

        <div className="relative flex items-start justify-between gap-4">
          {/* ── Left: value + label + trend ── */}
          <div className="flex flex-col gap-3 min-w-0">
            <span className="text-white/50 text-sm font-medium leading-none">
              {label}
            </span>

            <span className="text-white font-black text-3xl leading-none tabular-nums tracking-tight">
              {value}
            </span>

            {trend && (
              <span className={cn("flex items-center gap-1.5 text-xs font-semibold", trendColor)}>
                <TrendIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                {trend}
              </span>
            )}
          </div>

          {/* ── Right: icon ── */}
          {icon && (
            <div
              className={cn(
                "shrink-0 w-12 h-12 rounded-[14px] flex items-center justify-center border",
                iconStyle
              )}
              aria-hidden="true"
            >
              <span className="w-5 h-5">{icon}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

StatsCard.displayName = "StatsCard";
