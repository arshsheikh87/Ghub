"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/utils/cn";
import { FieldFeedback } from "./FieldFeedback";
import {
  baseField,
  fieldStateClasses,
  fieldPadding,
} from "./fieldStyles";
import type { PasswordInputProps } from "./types";

/**
 * PasswordInput — password field with visibility toggle button.
 * Lock icon on the left, eye toggle on the right.
 *
 * @example
 * <PasswordInput
 *   placeholder="Enter your password"
 *   error={errors.password}
 * />
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, success, disabled, loading, className, id, ...rest }, ref) => {
    const [visible, setVisible] = useState(false);

    const inputId = id ?? "password-input";
    const feedbackId = `${inputId}-feedback`;

    const state = disabled
      ? "disabled"
      : error
      ? "error"
      : success
      ? "success"
      : "default";

    return (
      <div className="relative w-full">
        {/* Lock icon — left */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 w-4 h-4 flex items-center justify-center"
        >
          <Lock className="w-4 h-4" />
        </span>

        <input
          ref={ref}
          id={inputId}
          type={visible ? "text" : "password"}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error || success ? feedbackId : undefined}
          className={cn(
            baseField,
            "text-sm h-11",
            fieldPadding.withBoth,
            fieldStateClasses[state],
            className
          )}
          {...rest}
        />

        {/* Visibility toggle — right */}
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          disabled={disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            "w-7 h-7 flex items-center justify-center rounded-[8px]",
            "text-white/35 hover:text-white/70",
            "transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
            "disabled:pointer-events-none"
          )}
        >
          {visible ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>

        <FieldFeedback id={feedbackId} error={error} success={success} />
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
