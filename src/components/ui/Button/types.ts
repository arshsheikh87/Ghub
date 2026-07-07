import type { ButtonHTMLAttributes, ReactNode } from "react";

// ─────────────────────────────────────────────
// Button Variant & Size Tokens
// ─────────────────────────────────────────────

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "glass"
  | "gradient"
  | "danger"
  | "success";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

// ─────────────────────────────────────────────
// Base Button Props
// ─────────────────────────────────────────────

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Custom loading text (replaces children while loading) */
  loadingText?: string;
  /** Stretch to full container width */
  fullWidth?: boolean;
  /** Icon rendered before children */
  leftIcon?: ReactNode;
  /** Icon rendered after children */
  rightIcon?: ReactNode;
  /** Accessible label (required when rendering icon-only) */
  "aria-label"?: string;
  /** Children — optional for icon-only buttons */
  children?: ReactNode;
}

// ─────────────────────────────────────────────
// Icon Button Props
// ─────────────────────────────────────────────

export interface IconButtonProps
  extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "loadingText" | "fullWidth"> {
  /** The icon to render */
  icon: ReactNode;
  /** Required for accessibility */
  "aria-label": string;
}
