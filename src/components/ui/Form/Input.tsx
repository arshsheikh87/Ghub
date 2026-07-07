"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/utils/cn";
import { Spinner } from "../Button/Spinner";
import { FieldFeedback } from "./FieldFeedback";
import {
  baseField,
  fieldStateClasses,
  fieldPadding,
} from "./fieldStyles";
import type { InputProps } from "./types";

/**
 * Input — single-line text input with icon slots, loading,
 * error, success, and disabled states.
 *
 * @example
 * <Input
 *   placeholder="Search games…"
 *   leftIcon={<Search className="w-4 h-4" />}
 *   error="Required field"
 * />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      leftIcon,
      rightIcon,
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
    const inputId = id ?? uid;
    const feedbackId = `${inputId}-feedback`;

    // Determine state for styling
    const state = disabled || rest.readOnly
      ? "disabled"
      : error
      ? "error"
      : success
      ? "success"
      : loading
      ? "loading"
      : "default";

    // Padding variant based on icon presence
    const hasLeft  = !!leftIcon;
    const hasRight = !!rightIcon || loading;
    const padding  = hasLeft && hasRight
      ? fieldPadding.withBoth
      : hasLeft
      ? fieldPadding.withLeft
      : hasRight
      ? fieldPadding.withRight
      : fieldPadding.base;

    return (
      <div className="relative w-full">
        {/* ── Left icon ── */}
        {leftIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 w-4 h-4 flex items-center justify-center"
          >
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled || loading}
          aria-invalid={!!error}
          aria-describedby={error || success ? feedbackId : undefined}
          aria-busy={loading}
          className={cn(
            baseField,
            "text-sm h-11",
            padding,
            fieldStateClasses[state],
            loading && "cursor-wait",
            className
          )}
          {...rest}
        />

        {/* ── Right: spinner or icon ── */}
        {loading ? (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400">
            <Spinner sizeClass="w-4 h-4" />
          </span>
        ) : rightIcon ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 w-4 h-4 flex items-center justify-center"
          >
            {rightIcon}
          </span>
        ) : null}

        <FieldFeedback id={feedbackId} error={error} success={success} />
      </div>
    );
  }
);

Input.displayName = "Input";
