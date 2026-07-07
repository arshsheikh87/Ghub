"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/utils/cn";

// ─────────────────────────────────────────────
// Back To Top Button
// Appears after scrolling down
// ─────────────────────────────────────────────

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 right-6 z-40",
            "p-3 rounded-full",
            "bg-linear-to-br from-purple-600 to-blue-600",
            "border border-white/20",
            "shadow-[0_8px_32px_rgba(139,92,246,0.4)]",
            "hover:shadow-[0_12px_48px_rgba(139,92,246,0.6)]",
            "hover:scale-110",
            "transition-all duration-300",
            "group"
          )}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-white group-hover:translate-y-[-2px] transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
