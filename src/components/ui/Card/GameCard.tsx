"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { Monitor, Clock, Users, Zap } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "../Button";
import type { GameCardProps } from "./types";

// ─────────────────────────────────────────────
// Category → accent colour map
// ─────────────────────────────────────────────
const categoryColors: Record<string, string> = {
  PC:     "text-blue-400    bg-blue-400/10    border-blue-400/20",
  PS5:    "text-purple-400  bg-purple-400/10  border-purple-400/20",
  XBOX:   "text-green-400   bg-green-400/10   border-green-400/20",
  VR:     "text-cyan-400    bg-cyan-400/10    border-cyan-400/20",
  RACING: "text-orange-400  bg-orange-400/10  border-orange-400/20",
  MOBILE: "text-pink-400    bg-pink-400/10    border-pink-400/20",
};

/**
 * GameCard — rich card showing a single gaming station.
 * Includes image with overlay, availability badge, price, specs,
 * and a Book Now CTA.
 *
 * @example
 * <GameCard game={game} onBook={(g) => openBookingModal(g)} />
 */
export const GameCard = forwardRef<HTMLDivElement, GameCardProps>(
  ({ game, onBook, compact = false, className, ...rest }, ref) => {
    const {
      name,
      category,
      description,
      pricePerHour,
      totalSeats,
      isAvailable,
      isFeatured,
      image,
      specs,
    } = game;

    const categoryStyle = categoryColors[category] ?? categoryColors.PC;

    return (
      <div
        ref={ref}
        className={cn(
          "group relative rounded-[16px] overflow-hidden",
          "bg-white/[0.04] border border-white/[0.08]",
          "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "hover:-translate-y-1.5 hover:border-purple-500/30",
          "hover:shadow-[0_8px_40px_rgba(139,92,246,0.18)]",
          className
        )}
        {...rest}
      >
        {/* ── Image area ── */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-dark-300">
          <Image
            src={image || "/images/games/placeholder.jpg"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Dark gradient overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,15,0.9)_0%,transparent_60%)]"
          />

          {/* ── Badges (top row) ── */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            {/* Category badge */}
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
                "text-[11px] font-bold tracking-wider uppercase border",
                categoryStyle
              )}
            >
              <Monitor className="w-3 h-3" aria-hidden="true" />
              {category}
            </span>

            <div className="flex gap-2">
              {/* Featured badge */}
              {isFeatured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] text-white">
                  <Zap className="w-2.5 h-2.5" aria-hidden="true" />
                  Featured
                </span>
              )}

              {/* Availability dot */}
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
                  "text-[11px] font-semibold border",
                  isAvailable
                    ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/25"
                    : "text-red-400 bg-red-400/10 border-red-400/25"
                )}
                aria-label={isAvailable ? "Available" : "Fully booked"}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    isAvailable ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                  )}
                  aria-hidden="true"
                />
                {isAvailable ? "Available" : "Booked"}
              </span>
            </div>
          </div>

          {/* Price overlay on image bottom */}
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-baseline gap-1 px-3 py-1.5 rounded-[10px] bg-black/60 backdrop-blur-sm border border-white/10">
              <span className="text-white/50 text-xs">Rs</span>
              <span className="text-white font-bold text-base">
                {pricePerHour.toLocaleString()}
              </span>
              <span className="text-white/40 text-xs">/hr</span>
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-5 flex flex-col gap-4">
          {/* Title */}
          <h3 className="text-white font-bold text-lg leading-snug line-clamp-1">
            {name}
          </h3>

          {/* Description — hidden in compact mode */}
          {!compact && description && (
            <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          )}

          {/* ── Quick specs row ── */}
          <div className="flex items-center gap-4 text-xs text-white/45">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {totalSeats} {totalSeats === 1 ? "Seat" : "Seats"}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              Min 1 hr
            </span>
            {specs?.processor && (
              <span className="flex items-center gap-1.5 truncate">
                <Monitor className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{specs.processor}</span>
              </span>
            )}
          </div>

          {/* ── CTA ── */}
          <Button
            variant={isAvailable ? "gradient" : "ghost"}
            fullWidth
            size="sm"
            disabled={!isAvailable}
            onClick={() => isAvailable && onBook?.(game)}
            aria-label={`Book ${name}`}
          >
            {isAvailable ? "Book Now" : "Fully Booked"}
          </Button>
        </div>
      </div>
    );
  }
);

GameCard.displayName = "GameCard";
