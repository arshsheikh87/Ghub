"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated counter hook.
 * Counts from 0 to target when triggered.
 */
export function useCounter(
  target: number,
  options?: {
    duration?: number;
    start?: boolean;
    easing?: (t: number) => number;
  }
) {
  const {
    duration = 2000,
    start = true,
    easing = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  } = options ?? {};

  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easing(progress);

      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      startTimeRef.current = null;
    };
  }, [target, duration, start, easing]);

  return count;
}
