"use client";

import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { labelBase, labelRequired, labelDisabled } from "./fieldStyles";
import type { LabelProps } from "./types";

/**
 * Label — consistent form label with optional required asterisk.
 *
 * @example
 * <Label htmlFor="email" required>Email Address</Label>
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, disabled, className, children, ...rest }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          labelBase,
          required && labelRequired,
          disabled && labelDisabled,
          className
        )}
        {...rest}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";
