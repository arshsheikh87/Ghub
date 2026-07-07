"use client";

import { forwardRef, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { Spinner } from "../Button/Spinner";
import { FieldFeedback } from "./FieldFeedback";
import { baseField, fieldStateClasses, fieldPadding } from "./fieldStyles";
import type { SelectProps } from "./types";

/**
 * Select — styled native select with custom chevron arrow,
 * placeholder option, loading state, and feedback.
 *
 * @example
 * <Select
 *   options={GAME_CATEGORIES.map(c => ({ value: c.value, label: c.label }))}
 *   placeholder="Choose a game type"
 *   error={errors.category}
 * />
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder,
      error,
      success,
      loading = false,
      disabled,
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const uid = useId();
    const selectId = id ?? uid;
    const feedbackId = `${selectId}-feedback`;

    const state = disabled
      ? "disabled"
      : error
      ? "error"
      : success
      ? "success"
      : loading
      ? "loading"
      : "default";

    return (
      <div className="relative w-full">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled || loading}
          aria-invalid={!!error}
          aria-describedby={error || success ? feedbackId : undefined}
          aria-busy={loading}
          className={cn(
            baseField,
            "text-sm h-11 appearance-none cursor-pointer",
            fieldPadding.withRight, // leave space for chevron
            fieldStateClasses[state],
            loading && "cursor-wait",
            // Ensure option text is readable in browsers
            "[&>option]:bg-[#14141f] [&>option]:text-white",
            className
          )}
          {...rest}
        >
          {/* Placeholder option */}
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* ── Right decorator: spinner or chevron ── */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40"
        >
          {loading ? (
            <Spinner sizeClass="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </span>

        <FieldFeedback id={feedbackId} error={error} success={success} />
      </div>
    );
  }
);

Select.displayName = "Select";
