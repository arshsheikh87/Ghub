"use client";

import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { GlassCard } from "./GlassCard";
import type { DashboardCardProps } from "./types";

/**
 * DashboardCard — container card for admin panel sections.
 * Provides a consistent title bar with optional action slot.
 *
 * @example
 * <DashboardCard title="Recent Bookings" action={<Button size="sm">View All</Button>}>
 *   <BookingsTable />
 * </DashboardCard>
 */
export const DashboardCard = forwardRef<HTMLDivElement, DashboardCardProps>(
  ({ title, action, noPadding = false, className, children, ...rest }, ref) => {
    return (
      <GlassCard
        ref={ref}
        padding="none"
        className={cn("flex flex-col", className)}
        {...rest}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/[0.07]">
          <h2 className="text-white font-semibold text-base leading-tight">
            {title}
          </h2>
          {action && (
            <div className="shrink-0 flex items-center">
              {action}
            </div>
          )}
        </div>

        {/* ── Content ── */}
        <div className={cn("flex-1", !noPadding && "p-6")}>
          {children}
        </div>
      </GlassCard>
    );
  }
);

DashboardCard.displayName = "DashboardCard";
