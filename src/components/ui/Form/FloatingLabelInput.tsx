"use client";

import { forwardRef, useId, useState } from "react";
import { cn } from "@/utils/cn";
import { FieldFeedback } from "./FieldFeedback";
import { fieldStateClasses } from "./fieldStyles";
import type { FloatingLabelInputProps } from "./types";

/**
 * FloatingLabelInput — input where the label floats above the field
 * when focused or filled.
 *
 * The label starts centered inside the input and transitions to
 * a smaller floating label above on focus/fill.
 *
 * @example
 * <FloatingLabelInput
 *   label="Email Address"
 *   type="email"
 *   error={errors.email}
 * />
 */
export const FloatingLabelInput = forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(
  (
    {
      label,
      error,
      success,
      disabled,
      loading,
      className,
      id,
      value,
      defaultValue,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const uid = useId();
    const inputId = id ?? uid;
    const feedbackId = `${inputId}-feedback`;

    const [focused, setFocused] = useState(false);

    // Float label when focused OR has a value
    const hasValue =
      typeof value === "string"
        ? value.length > 0
        : typeof defaultValue === "string"
        ? defaultValue.length > 0
        : false;

    const floated = focused || hasValue;

    const state = disabled
      ? "disabled"
      : error
      ? "error"
      : success
      ? "success"
      : "default";

    return (
      <div className={cn("relative w-full", className)}>
        {/* ── Input ── */}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={!!error}
          aria-describedby={error || success ? feedbackId : undefined}
          aria-placeholder={label}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            "w-full rounded-[12px] h-14 pt-5 pb-2 px-4 text-sm text-white",
            "bg-white/[0.05] border border-white/[0.10]",
            "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            "hover:border-white/[0.20] hover:bg-white/[0.07]",
            "focus:outline-none focus:border-purple-500/70 focus:bg-white/[0.07]",
            "focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
            "placeholder:text-transparent", // hide native placeholder
            fieldStateClasses[state]
          )}
          {...rest}
        />

        {/* ── Floating label ── */}
        <label
          htmlFor={inputId}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-4 select-none",
            "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
            floated
              ? "top-2 text-[11px] font-medium tracking-wide text-purple-400"
              : "top-1/2 -translate-y-1/2 text-sm text-white/35"
          )}
        >
          {label}
        </label>

        <FieldFeedback id={feedbackId} error={error} success={success} />
      </div>
    );
  }
);

FloatingLabelInput.displayName = "FloatingLabelInput";
