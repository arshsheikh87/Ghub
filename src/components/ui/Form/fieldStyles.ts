/**
 * Shared style constants for all form fields.
 * Single source of truth — change here, changes everywhere.
 */

// ─────────────────────────────────────────────
// Base interactive field classes
// ─────────────────────────────────────────────

export const baseField = [
  "w-full rounded-[12px]",
  "bg-white/[0.05] border border-white/[0.10]",
  "text-white placeholder:text-white/30",
  "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
  // Hover
  "hover:border-white/[0.20] hover:bg-white/[0.07]",
  // Focus
  "focus:outline-none focus:border-purple-500/70 focus:bg-white/[0.07]",
  "focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]",
  // Disabled
  "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
].join(" ");

// ─────────────────────────────────────────────
// State overrides (applied on top of base)
// ─────────────────────────────────────────────

export const fieldStateClasses = {
  default: "",
  error: [
    "border-red-500/60 bg-red-500/[0.04]",
    "hover:border-red-500/80",
    "focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]",
  ].join(" "),
  success: [
    "border-emerald-500/60 bg-emerald-500/[0.04]",
    "hover:border-emerald-500/80",
    "focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]",
  ].join(" "),
  loading: "border-purple-500/40 cursor-wait",
  disabled: "",
} as const;

// ─────────────────────────────────────────────
// Standard padding presets
// ─────────────────────────────────────────────

export const fieldPadding = {
  /** Standard input — py-3 px-4 */
  base: "py-3 px-4",
  /** Input with left icon */
  withLeft: "py-3 pl-11 pr-4",
  /** Input with right icon / button */
  withRight: "py-3 pl-4 pr-11",
  /** Input with both icons */
  withBoth: "py-3 pl-11 pr-11",
} as const;

// ─────────────────────────────────────────────
// Label classes
// ─────────────────────────────────────────────

export const labelBase = "block text-sm font-medium text-white/70 mb-1.5";
export const labelRequired = "after:content-['*'] after:ml-1 after:text-red-400";
export const labelDisabled = "opacity-50";

// ─────────────────────────────────────────────
// Feedback text classes
// ─────────────────────────────────────────────

export const feedbackBase = "flex items-center gap-1.5 text-xs mt-1.5";
export const feedbackError   = "text-red-400";
export const feedbackSuccess = "text-emerald-400";
export const feedbackHint    = "text-white/40";
