import { cva } from "class-variance-authority";

// ─────────────────────────────────────────────
// Button CVA Config
// Every visual property is encoded here.
// No ad-hoc classes in the component JSX.
// ─────────────────────────────────────────────

export const buttonVariants = cva(
  // ── Base styles applied to every button ──
  [
    "inline-flex items-center justify-center gap-2",
    "font-semibold tracking-wide",
    "rounded-[16px]",
    "border border-transparent",
    "cursor-pointer select-none",
    "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
    "outline-none",
    // Focus visible ring (keyboard navigation)
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]",
    // Disabled state
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
    // Active press feedback
    "active:scale-[0.97]",
    // Whitespace
    "whitespace-nowrap",
  ],
  {
    variants: {
      // ── Visual variants ──
      variant: {
        /**
         * Primary — solid purple, the main CTA
         */
        primary: [
          "bg-purple-600 text-white border-purple-600",
          "hover:bg-purple-500 hover:border-purple-500",
          "hover:shadow-[0_0_24px_rgba(139,92,246,0.5)]",
          "focus-visible:ring-purple-500",
        ],

        /**
         * Secondary — muted dark surface with purple text
         */
        secondary: [
          "bg-[rgba(139,92,246,0.12)] text-purple-300 border-[rgba(139,92,246,0.25)]",
          "hover:bg-[rgba(139,92,246,0.22)] hover:border-[rgba(139,92,246,0.45)] hover:text-purple-200",
          "focus-visible:ring-purple-500",
        ],

        /**
         * Outline — transparent with purple border
         */
        outline: [
          "bg-transparent text-purple-400 border-purple-500",
          "hover:bg-purple-600 hover:text-white hover:border-purple-600",
          "hover:shadow-[0_0_18px_rgba(139,92,246,0.4)]",
          "focus-visible:ring-purple-500",
        ],

        /**
         * Ghost — no border, no background
         */
        ghost: [
          "bg-transparent text-white/70 border-transparent",
          "hover:bg-white/10 hover:text-white",
          "focus-visible:ring-white/40",
        ],

        /**
         * Glass — glassmorphism card style
         */
        glass: [
          "bg-white/5 text-white border-white/10",
          "backdrop-blur-md",
          "hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
          "focus-visible:ring-white/30",
        ],

        /**
         * Gradient — purple → neon blue gradient CTA
         */
        gradient: [
          "bg-[linear-gradient(135deg,#8b5cf6_0%,#00d4ff_100%)]",
          "text-white border-transparent",
          "hover:shadow-[0_0_32px_rgba(139,92,246,0.6),0_0_32px_rgba(0,212,255,0.3)]",
          "hover:brightness-110",
          "focus-visible:ring-purple-400",
        ],

        /**
         * Danger — red destructive action
         */
        danger: [
          "bg-red-600 text-white border-red-600",
          "hover:bg-red-500 hover:border-red-500",
          "hover:shadow-[0_0_20px_rgba(239,68,68,0.45)]",
          "focus-visible:ring-red-500",
        ],

        /**
         * Success — green confirmation action
         */
        success: [
          "bg-emerald-600 text-white border-emerald-600",
          "hover:bg-emerald-500 hover:border-emerald-500",
          "hover:shadow-[0_0_20px_rgba(16,185,129,0.45)]",
          "focus-visible:ring-emerald-500",
        ],
      },

      // ── Size presets (8px scale) ──
      size: {
        xs:  "h-7  px-3   text-xs   gap-1.5",
        sm:  "h-9  px-4   text-sm   gap-2",
        md:  "h-11 px-5   text-sm   gap-2",
        lg:  "h-12 px-6   text-base gap-2.5",
        xl:  "h-14 px-8   text-lg   gap-3",
      },

      // ── Full width ──
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },

    // ── Defaults ──
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

// ─────────────────────────────────────────────
// Icon-only size map (square proportions)
// ─────────────────────────────────────────────
export const iconButtonSizeClasses: Record<string, string> = {
  xs: "h-7  w-7  rounded-[10px]",
  sm: "h-9  w-9  rounded-[12px]",
  md: "h-11 w-11 rounded-[14px]",
  lg: "h-12 w-12 rounded-[14px]",
  xl: "h-14 w-14 rounded-[16px]",
};

// ─────────────────────────────────────────────
// Icon size inside buttons
// ─────────────────────────────────────────────
export const iconSizeClasses: Record<string, string> = {
  xs: "w-3 h-3",
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
  xl: "w-6 h-6",
};
