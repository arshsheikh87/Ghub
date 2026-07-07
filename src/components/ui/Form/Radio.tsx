"use client";

import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { FieldFeedback } from "./FieldFeedback";
import type { RadioProps, RadioGroupProps } from "./types";

// ─────────────────────────────────────────────
// Single Radio
// ─────────────────────────────────────────────

/**
 * Radio — single radio option.
 * Compose inside RadioGroup for full group behavior.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, error, disabled, className, id, ...rest }, ref) => {
    const inputId = id ?? `radio-${Math.random().toString(36).slice(2, 8)}`;

    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <label
          htmlFor={inputId}
          className={cn(
            "group inline-flex items-start gap-3 cursor-pointer select-none",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {/* ── Custom radio circle ── */}
          <div className="relative mt-0.5 shrink-0">
            <input
              ref={ref}
              id={inputId}
              type="radio"
              disabled={disabled}
              aria-invalid={!!error}
              className="sr-only peer"
              {...rest}
            />

            {/* Outer ring */}
            <div
              aria-hidden="true"
              className={cn(
                "w-5 h-5 rounded-full border flex items-center justify-center",
                "transition-all duration-200",
                "border-white/25 bg-white/[0.05]",
                "peer-checked:border-purple-500",
                "group-hover:border-purple-400/60",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-purple-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#0a0a0f]",
                error && "border-red-500/70"
              )}
            >
              {/* Inner dot */}
              <div
                aria-hidden="true"
                className={cn(
                  "w-2.5 h-2.5 rounded-full bg-purple-500",
                  "transition-all duration-200",
                  "scale-0 peer-checked:scale-100 opacity-0 peer-checked:opacity-100"
                )}
              />
            </div>
          </div>

          {/* ── Label + description ── */}
          <div className="flex flex-col gap-0.5">
            {label && (
              <span className="text-sm text-white/75 leading-snug">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-white/40 leading-relaxed">
                {description}
              </span>
            )}
          </div>
        </label>

        <FieldFeedback error={error} />
      </div>
    );
  }
);

Radio.displayName = "Radio";

// ─────────────────────────────────────────────
// RadioGroup — renders a labelled list of radios
// ─────────────────────────────────────────────

/**
 * RadioGroup — convenience wrapper that renders multiple Radio options
 * from a data array.
 *
 * @example
 * <RadioGroup
 *   name="duration"
 *   value={selected}
 *   onChange={setSelected}
 *   options={DURATION_OPTIONS.map(d => ({ value: String(d.value), label: d.label }))}
 * />
 */
export function RadioGroup({
  name,
  value,
  onChange,
  options,
  error,
  className,
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      className={cn("flex flex-col gap-3", className)}
      aria-invalid={!!error}
    >
      {options.map((opt) => (
        <Radio
          key={opt.value}
          id={`${name}-${opt.value}`}
          name={name}
          value={opt.value}
          label={opt.label}
          description={opt.description}
          disabled={opt.disabled}
          checked={value === opt.value}
          onChange={() => onChange?.(opt.value)}
        />
      ))}

      {error && <FieldFeedback error={error} />}
    </div>
  );
}
