"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Hook that returns a ref and whether the element is in view.
 * Useful for triggering scroll-based animations.
 */
export function useScrollAnimation(options?: {
  once?: boolean;
  amount?: number | "some" | "all";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    amount: options?.amount ?? 0.15,
  });

  return { ref, isInView };
}
