"use client";

import { cn } from "@/utils/cn";
import { Label } from "./Label";
import { FieldFeedback } from "./FieldFeedback";
import type { FieldWrapperProps } from "./types";

/**
 * FieldWrapper — wraps any form control with a label, feedback,
 * and consistent vertical rhythm.
 *
 * @example
 * <FieldWrapper label="Email" htmlFor="email" error={errors.email} required>
 *   <Input id="email" type="email" />
 * </FieldWrapper>
 */
export function FieldWrapper({
  children,
  label,
  htmlFor,
  error,
  success,
  hint,
  required,
  disabled,
  className,
}: FieldWrapperProps) {
  // Shared id for aria-describedby
  const feedbackId = htmlFor ? `${htmlFor}-feedback` : undefined;

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {label && (
        <Label htmlFor={htmlFor} required={required} disabled={disabled}>
          {label}
        </Label>
      )}

      {children}

      <FieldFeedback
        id={feedbackId}
        error={error}
        success={success}
        hint={hint}
      />
    </div>
  );
}
