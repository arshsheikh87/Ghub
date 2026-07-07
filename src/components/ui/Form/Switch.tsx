"use client";

import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import type { SwitchProps } from "./types";

// ─────────────────────────────────────────────
// Size presets
// ─────────────────────────────────────────────

const sizeConfig = {
  sm: {
    track:  "w-8 h-4",
    thumb:  "w-3 h-3",
    translate: "translate-x-4",
  },
  md: {
    track:  "w-11 h-6",
    thumb:  "w-5 h-5",
    translate: "translate-x-5",
  },
  lg: {
    track:  "w-14 h-7",
    thumb:  "w-6 h-6",
    translate: "translate-x-7",
  },
} as const;

/**
 * Switch — toggle control (on/off).
 * Renders an accessible checkbox underneath with a custom pill UI.
 *
 * @example
 * <Switch
 *   label="Email notifications"
 *   description="Receive booking confirmations by email"
 *   checked={emailEnabled}
 *   onChange={(e) => setEmailEnabled(e.target.checked)}
 * />
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      description,
      size = "md",
      disabled,
      checked,
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const { track, thumb, translate } = sizeConfig[size];
    const inputId = id ?? `switch-${Math.random().toString(36).slice(2, 8)}`;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "group inline-flex items-start gap-3 cursor-pointer select-none",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {/* ── Hidden native checkbox ── */}
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          disabled={disabled}
          checked={checked}
          aria-checked={checked}
          className="sr-only peer"
          {...rest}
        />

        {/* ── Track ── */}
        <div
          aria-hidden="true"
          className={cn(
            "relative shrink-0 mt-0.5 rounded-full",
            "bg-white/10 border border-white/15",
            "transition-all duration-300",
            // Checked
            "peer-checked:bg-purple-600 peer-checked:border-purple-600",
            // Hover
            "group-hover:border-white/30",
            // Focus
            "peer-focus-visible:ring-2 peer-focus-visible:ring-purple-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#0a0a0f]",
            track
          )}
        >
          {/* Thumb */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 left-[2px] -translate-y-1/2 rounded-full",
              "bg-white/50 shadow-sm",
              "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              // Slide right when checked
              "peer-checked:left-auto peer-checked:right-[2px] peer-checked:bg-white",
              // We simulate this via translate via group peer trick below
              thumb
            )}
          />
        </div>

        {/* ── Label + description ── */}
        {(label || description) && (
          <div className="flex flex-col gap-0.5 pt-[1px]">
            {label && (
              <span className="text-sm text-white/75 leading-snug">{label}</span>
            )}
            {description && (
              <span className="text-xs text-white/40 leading-relaxed">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Switch.displayName = "Switch";
