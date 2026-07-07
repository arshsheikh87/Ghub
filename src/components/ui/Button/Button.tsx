"use client";

import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { buttonVariants, iconSizeClasses } from "./variants";
import { Spinner } from "./Spinner";
import type { ButtonProps } from "./types";

// ─────────────────────────────────────────────
// Button
// ─────────────────────────────────────────────

/**
 * The single reusable Button component for the entire application.
 *
 * @example
 * <Button variant="gradient" size="lg" leftIcon={<Zap />}>
 *   Book Now
 * </Button>
 *
 * @example
 * <Button variant="danger" loading loadingText="Deleting…">
 *   Delete
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      loadingText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      type = "button",
      ...rest
    },
    ref
  ) => {
    // Spinner size mirrors button size
    const spinnerSize = iconSizeClasses[size] ?? iconSizeClasses.md;

    // Disabled when explicitly disabled OR while loading
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          // Subtle text opacity shift while loading
          loading && "cursor-wait",
          className
        )}
        {...rest}
      >
        {/* ── Left area: spinner (loading) or left icon ── */}
        {loading ? (
          <Spinner sizeClass={spinnerSize} />
        ) : (
          leftIcon && (
            <span className={cn("shrink-0", spinnerSize)} aria-hidden="true">
              {leftIcon}
            </span>
          )
        )}

        {/* ── Label ── */}
        {children !== undefined && (
          <span className={loading ? "opacity-70" : undefined}>
            {loading && loadingText ? loadingText : children}
          </span>
        )}

        {/* ── Right icon (hidden while loading to avoid layout shift) ── */}
        {!loading && rightIcon && (
          <span className={cn("shrink-0", spinnerSize)} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
