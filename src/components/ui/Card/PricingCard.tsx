"use client";

import { forwardRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "../Button";
import type { PricingCardProps } from "./types";

/**
 * PricingCard — renders a full pricing tier with feature list.
 * Popular plans get a gradient border and "Most Popular" badge.
 *
 * @example
 * <PricingCard plan={plan} onSelect={(p) => router.push('/booking')} />
 */
export const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(
  ({ plan, onPlanSelect, ctaLabel = "Get Started", className, ...rest }, ref) => {
    const { name, price, duration, description, features, isPopular } = plan;

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-[18px] overflow-hidden",
          "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          // Popular card gets gradient border via p-[1px] wrapper trick
          isPopular
            ? "p-[1px] bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] hover:shadow-[0_0_48px_rgba(139,92,246,0.35)]"
            : "bg-white/[0.04] border border-white/[0.08] hover:-translate-y-1 hover:border-white/[0.15]",
          className
        )}
        {...rest}
      >
        {/* Inner surface (needed for gradient border trick) */}
        <div
          className={cn(
            "flex flex-col gap-6 p-7 h-full",
            isPopular
              ? "rounded-[17px] bg-[#0f0f1a]"
              : "rounded-[18px] bg-transparent"
          )}
        >
          {/* ── Header ── */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-white/50 text-xs font-medium tracking-widest uppercase">
                {plan.type.replace("_", " ")}
              </span>
              <h3 className="text-white font-bold text-xl leading-tight">
                {name}
              </h3>
            </div>

            {isPopular && (
              <span className="shrink-0 inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] text-white">
                Most Popular
              </span>
            )}
          </div>

          {/* ── Price ── */}
          <div className="flex items-end gap-1.5 border-b border-white/[0.07] pb-6">
            <span className="text-white/60 text-lg font-medium">Rs</span>
            <span
              className={cn(
                "text-5xl font-black leading-none",
                isPopular
                  ? "bg-[linear-gradient(135deg,#a78bfa,#00d4ff)] bg-clip-text text-transparent"
                  : "text-white"
              )}
            >
              {price.toLocaleString()}
            </span>
            <span className="text-white/40 text-sm mb-1.5">/ {duration}</span>
          </div>

          {/* ── Description ── */}
          {description && (
            <p className="text-white/50 text-sm leading-relaxed -mt-2">
              {description}
            </p>
          )}

          {/* ── Features ── */}
          <ul className="flex flex-col gap-3 flex-1" role="list">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span
                  className={cn(
                    "shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-[1px]",
                    isPopular
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-white/8 text-white/50"
                  )}
                  aria-hidden="true"
                >
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                <span className="text-white/70">{feature}</span>
              </li>
            ))}
          </ul>

          {/* ── CTA ── */}
          <Button
            variant={isPopular ? "gradient" : "outline"}
            fullWidth
            size="lg"
            onClick={() => onPlanSelect?.(plan)}
            aria-label={`Select ${name} plan`}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    );
  }
);

PricingCard.displayName = "PricingCard";
