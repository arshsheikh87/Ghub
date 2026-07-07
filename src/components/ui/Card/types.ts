import type { HTMLAttributes, ReactNode } from "react";
import type { Game, FoodItem, PricingPlan } from "@/types";

// ─────────────────────────────────────────────
// Shared base for all card wrappers
// ─────────────────────────────────────────────

export interface BaseCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

// ─────────────────────────────────────────────
// GlassCard
// ─────────────────────────────────────────────

export interface GlassCardProps extends BaseCardProps {
  /** Adds a colored glow border on hover */
  glow?: "purple" | "blue" | "none";
  /** Adds a subtle lift transform on hover */
  hover?: boolean;
  /** Renders a colored top border accent line */
  accent?: boolean;
  /** Adds inner padding preset */
  padding?: "none" | "sm" | "md" | "lg";
}

// ─────────────────────────────────────────────
// FeatureCard
// ─────────────────────────────────────────────

export interface FeatureCardProps extends BaseCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  /** Optional badge label */
  badge?: string;
  /** Gradient highlight under icon */
  iconGlow?: boolean;
}

// ─────────────────────────────────────────────
// PricingCard
// ─────────────────────────────────────────────

export interface PricingCardProps extends BaseCardProps {
  plan: PricingPlan;
  /** Called when CTA is clicked */
  onPlanSelect?: (plan: PricingPlan) => void;
  /** Override CTA label */
  ctaLabel?: string;
}

// ─────────────────────────────────────────────
// GameCard
// ─────────────────────────────────────────────

export interface GameCardProps extends BaseCardProps {
  game: Game;
  onBook?: (game: Game) => void;
  /** Show compact version (no description) */
  compact?: boolean;
}

// ─────────────────────────────────────────────
// FoodCard
// ─────────────────────────────────────────────

export interface FoodCardProps extends BaseCardProps {
  item: FoodItem;
  onAdd?: (item: FoodItem) => void;
  /** Current cart quantity for this item */
  quantity?: number;
}

// ─────────────────────────────────────────────
// DashboardCard
// ─────────────────────────────────────────────

export interface DashboardCardProps extends BaseCardProps {
  title: string;
  /** Optional action element (button, link, etc.) */
  action?: ReactNode;
  /** Removes inner padding for full-bleed content */
  noPadding?: boolean;
}

// ─────────────────────────────────────────────
// StatsCard
// ─────────────────────────────────────────────

export type StatsTrend = "up" | "down" | "neutral";

export interface StatsCardProps extends BaseCardProps {
  label: string;
  value: string | number;
  /** e.g. "+12%" or "vs last week" */
  trend?: string;
  trendDirection?: StatsTrend;
  icon?: ReactNode;
  /** Color accent for icon background */
  iconColor?: "purple" | "blue" | "green" | "orange" | "red";
}

// ─────────────────────────────────────────────
// HoverCard
// ─────────────────────────────────────────────

export interface HoverCardProps extends BaseCardProps {
  /** Content visible without interaction */
  trigger: ReactNode;
  /** Content revealed on hover */
  reveal: ReactNode;
  /** Direction the reveal slides in from */
  direction?: "up" | "down";
}
