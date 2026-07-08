"use client";

// Suppress TS error when react types are not found in some environments
// @ts-ignore: Could not find module 'react' or its corresponding type declarations.
import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { buttonVariants, iconButtonSizeClasses, iconSizeClasses } from "./variants";
import { Spinner } from "./Spinner";
import type { IconButtonProps } from "./types";

// ─────────────────────────────────────────────
// IconButton
// A square button that renders a single icon.
// aria-label is required for screen readers.
// ─────────────────────────────────────────────

/**
 * @example
 * <IconButton
 *   icon={<Search />}
 *   aria-label="Search games"
 *   variant="ghost"
 *   size="md"
 * />
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = "ghost",
      size = "md",
      loading = false,
      disabled,
      className,
      type = "button",
      "aria-label": ariaLabel,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const spinnerSize = iconSizeClasses[size] ?? iconSizeClasses.md;
    const squareSize = iconButtonSizeClasses[size] ?? iconButtonSizeClasses.md;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        aria-label={ariaLabel}
        title={ariaLabel}
        className={cn(
          // Strip padding from base — square buttons use w/h instead
          buttonVariants({ variant, size }),
          squareSize,
          "p-0", // override padding to keep square
          loading && "cursor-wait",
          className
        )}
        {...rest}
      >
        {loading ? (
          <Spinner sizeClass={spinnerSize} />
        ) : (
          <span className={cn("shrink-0", spinnerSize)} aria-hidden="true">
            {icon}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
