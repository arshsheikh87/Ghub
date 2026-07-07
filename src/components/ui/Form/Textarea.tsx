"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/utils/cn";
import { Spinner } from "../Button/Spinner";
import { FieldFeedback } from "./FieldFeedback";
import { baseField, fieldStateClasses } from "./fieldStyles";
import type { TextareaProps } from "./types";

/**
 * Textarea — multiline input with optional character counter,
 * loading spinner, and error/success states.
 *
 * @example
 * <Textarea
 *   placeholder="Describe your special request…"
 *   rows={4}
 *   maxLength={300}
 *   showCount
 *   error={errors.message}
 * />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      error,
      success,
      loading = false,
      showCount = false,
      disabled,
      maxLength,
      value,
      defaultValue,
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const uid = useId();
    const textareaId = id ?? uid;
    const feedbackId = `${textareaId}-feedback`;

    const state = disabled
      ? "disabled"
      : error
      ? "error"
      : success
      ? "success"
      : loading
      ? "loading"
      : "default";

    // Character count (controlled value takes priority)
    const currentLength =
      typeof value === "string"
        ? value.length
        : typeof defaultValue === "string"
        ? defaultValue.length
        : 0;

    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled || loading}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={!!error}
          aria-describedby={error || success ? feedbackId : undefined}
          aria-busy={loading}
          className={cn(
            baseField,
            "text-sm py-3 px-4 resize-y min-h-[100px]",
            showCount && "pb-8",
            fieldStateClasses[state],
            loading && "cursor-wait",
            className
          )}
          {...rest}
        />

        {/* ── Loading spinner — bottom right inside field ── */}
        {loading && (
          <span className="pointer-events-none absolute right-3 bottom-3 text-purple-400">
            <Spinner sizeClass="w-4 h-4" />
          </span>
        )}

        {/* ── Character counter ── */}
        {showCount && maxLength && (
          <span
            aria-live="polite"
            aria-label={`${currentLength} of ${maxLength} characters used`}
            className={cn(
              "absolute right-3 bottom-2.5 text-[11px] tabular-nums pointer-events-none",
              currentLength >= maxLength
                ? "text-red-400"
                : currentLength >= maxLength * 0.85
                ? "text-yellow-400"
                : "text-white/30"
            )}
          >
            {currentLength}/{maxLength}
          </span>
        )}

        <FieldFeedback id={feedbackId} error={error} success={success} />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
