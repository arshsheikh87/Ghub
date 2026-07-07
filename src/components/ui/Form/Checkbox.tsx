"use client";

import { forwardRef, useEffect, useRef } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/utils/cn";
import { FieldFeedback } from "./FieldFeedback";
import type { CheckboxProps } from "./types";

/**
 * Checkbox — fully styled checkbox with label, indeterminate,
 * error, and disabled states.
 *
 * @example
 * <Checkbox
 *   label="I agree to the Terms & Conditions"
 *   checked={agreed}
 *   onChange={(e) => setAgreed(e.target.checked)}
 *   required
 * />
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      indeterminate = false,
      disabled,
      className,
      id,
      checked,
      ...rest
    },
    ref
  ) => {
    // Handle indeterminate via imperative DOM (not a React prop)
    const innerRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) ?? innerRef;

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, inputRef]);

    const inputId = id ?? `checkbox-${Math.random().toString(36).slice(2, 8)}`;

    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <label
          htmlFor={inputId}
          className={cn(
            "group inline-flex items-start gap-3 cursor-pointer select-none",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {/* ── Custom checkbox box ── */}
          <div className="relative mt-0.5 shrink-0">
            <input
              ref={inputRef}
              id={inputId}
              type="checkbox"
              disabled={disabled}
              checked={checked}
              aria-invalid={!!error}
              aria-checked={indeterminate ? "mixed" : checked}
              className="sr-only peer"
              {...rest}
            />

            {/* Visual box */}
            <div
              aria-hidden="true"
              className={cn(
                "w-5 h-5 rounded-[6px] border flex items-center justify-center",
                "transition-all duration-200",
                // Unchecked
                "border-white/25 bg-white/[0.05]",
                // Checked state (via peer)
                "peer-checked:bg-purple-600 peer-checked:border-purple-600",
                // Indeterminate
                indeterminate && "bg-purple-600/50 border-purple-500",
                // Hover
                "group-hover:border-purple-400/60",
                // Focus
                "peer-focus-visible:ring-2 peer-focus-visible:ring-purple-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#0a0a0f]",
                // Error
                error && "border-red-500/70 peer-checked:bg-red-600 peer-checked:border-red-600"
              )}
            >
              {indeterminate ? (
                <Minus className="w-3 h-3 text-white" strokeWidth={3} />
              ) : (
                <Check
                  className={cn(
                    "w-3 h-3 text-white transition-all duration-150",
                    checked ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  )}
                  strokeWidth={3}
                />
              )}
            </div>
          </div>

          {/* ── Label text ── */}
          {label && (
            <span className="text-sm text-white/70 leading-snug pt-[1px]">
              {label}
            </span>
          )}
        </label>

        <FieldFeedback error={error} />
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
