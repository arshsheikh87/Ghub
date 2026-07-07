"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { cn } from "@/utils/cn";
import { IconButton } from "../Button";
import type { FoodCardProps } from "./types";

// ─────────────────────────────────────────────
// Category → accent colour map
// ─────────────────────────────────────────────
const categoryColors: Record<string, string> = {
  SNACKS:        "text-orange-400  bg-orange-400/10",
  COLD_DRINKS:   "text-blue-400    bg-blue-400/10",
  ENERGY_DRINKS: "text-yellow-400  bg-yellow-400/10",
  COMBOS:        "text-purple-400  bg-purple-400/10",
  HOT_FOOD:      "text-red-400     bg-red-400/10",
};

const categoryLabels: Record<string, string> = {
  SNACKS:        "Snacks",
  COLD_DRINKS:   "Cold Drinks",
  ENERGY_DRINKS: "Energy Drinks",
  COMBOS:        "Combos",
  HOT_FOOD:      "Hot Food",
};

/**
 * FoodCard — menu item card for the Food page and booking form.
 * Shows image, category pill, price, availability, and an add/remove counter.
 *
 * @example
 * <FoodCard
 *   item={foodItem}
 *   quantity={cartQty}
 *   onAdd={(item) => addToCart(item)}
 * />
 */
export const FoodCard = forwardRef<HTMLDivElement, FoodCardProps>(
  ({ item, onAdd, quantity = 0, className, ...rest }, ref) => {
    const { name, description, category, price, image, isAvailable, isFeatured } = item;

    const catStyle = categoryColors[category] ?? categoryColors.SNACKS;
    const catLabel = categoryLabels[category] ?? category;

    return (
      <div
        ref={ref}
        className={cn(
          "group relative rounded-[16px] overflow-hidden",
          "bg-white/[0.04] border border-white/[0.08]",
          "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isAvailable
            ? "hover:-translate-y-1 hover:border-white/[0.18] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            : "opacity-60 cursor-not-allowed",
          className
        )}
        {...rest}
      >
        {/* ── Image ── */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-dark-300">
          <Image
            src={image || "/images/food/placeholder.jpg"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,15,0.75)_0%,transparent_55%)]"
          />

          {/* ── Featured pill ── */}
          {isFeatured && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] text-white">
              Chef&apos;s Pick
            </span>
          )}

          {/* ── Unavailable ribbon ── */}
          {!isAvailable && (
            <div
              aria-label="Item unavailable"
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 text-white/60 text-xs font-semibold tracking-wide">
                Unavailable
              </span>
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="p-4 flex flex-col gap-3">
          {/* Category pill */}
          <span
            className={cn(
              "self-start inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold",
              catStyle
            )}
          >
            {catLabel}
          </span>

          {/* Name + price row */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-white font-semibold text-base leading-snug line-clamp-2 flex-1">
              {name}
            </h3>
            <span className="shrink-0 text-purple-300 font-bold text-base">
              Rs {price.toLocaleString()}
            </span>
          </div>

          {/* Description */}
          {description && (
            <p className="text-white/45 text-xs leading-relaxed line-clamp-2">
              {description}
            </p>
          )}

          {/* ── Add to cart control ── */}
          {isAvailable && (
            <div className="flex items-center gap-3 mt-1">
              {quantity > 0 ? (
                /* Counter when item already in cart */
                <div className="flex items-center gap-2">
                  <IconButton
                    icon={<Minus className="w-3.5 h-3.5" />}
                    aria-label={`Remove one ${name}`}
                    variant="secondary"
                    size="xs"
                    onClick={() => onAdd?.(item)}
                  />
                  <span className="w-6 text-center text-white font-bold text-sm tabular-nums">
                    {quantity}
                  </span>
                  <IconButton
                    icon={<Plus className="w-3.5 h-3.5" />}
                    aria-label={`Add another ${name}`}
                    variant="primary"
                    size="xs"
                    onClick={() => onAdd?.(item)}
                  />
                </div>
              ) : (
                /* Add button */
                <button
                  type="button"
                  onClick={() => onAdd?.(item)}
                  aria-label={`Add ${name} to order`}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-[12px]",
                    "text-sm font-semibold text-white",
                    "bg-purple-600/20 border border-purple-500/25",
                    "transition-all duration-300",
                    "hover:bg-purple-600 hover:border-purple-600",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
                  )}
                >
                  <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
                  Add
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

FoodCard.displayName = "FoodCard";
