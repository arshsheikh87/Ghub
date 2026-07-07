"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { GameCard } from "@/components/ui/Card";
import { Input } from "@/components/ui/Form";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { GAME_CATEGORIES } from "@/constants";
import type { Game } from "@/types";
import { cn } from "@/utils/cn";

interface Props {
  searchParams: Promise<{ category?: string; search?: string }>;
}

function SkeletonCard() {
  return (
    <div className="rounded-[16px] overflow-hidden bg-white/[0.04] border border-white/[0.08] animate-pulse">
      <div className="aspect-[16/9] bg-white/10" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/5 rounded w-full" />
        <div className="h-3 bg-white/5 rounded w-2/3" />
        <div className="h-9 bg-white/10 rounded-lg mt-2" />
      </div>
    </div>
  );
}

export function GamesContent({ searchParams }: Props) {
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const fetchGames = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== "ALL") params.set("category", activeCategory);
      if (search.trim()) params.set("search", search.trim());
      const res = await fetch(`/api/games?${params}`);
      const json = await res.json();
      if (json.success) setGames(json.data);
    } catch (err) {
      console.error("Failed to fetch games:", err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, search]);

  useEffect(() => {
    searchParams.then(({ category, search: s }) => {
      if (category) setActiveCategory(category);
      if (s) setSearch(s);
    });
  }, [searchParams]);

  useEffect(() => {
    const t = setTimeout(fetchGames, 300);
    return () => clearTimeout(t);
  }, [fetchGames]);

  const handleBook = (game: Game) => {
    router.push(`/booking?gameId=${game.id}`);
  };

  const categories = [{ value: "ALL", label: "All Stations", icon: "🎮" }, ...GAME_CATEGORIES];

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-12 bg-hero-gradient">
        <div className="container-gaming text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeInUp} className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
              Our Fleet
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl font-black text-white mb-4">
              Gaming <span className="gradient-text">Stations</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white/60 text-lg max-w-xl mx-auto">
              50+ stations across 6 categories. Find the perfect setup for your game.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-20 z-30">
        <div className="container-gaming">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search */}
            <div className="w-full sm:max-w-xs">
              <Input
                placeholder="Search games..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>

            {/* Category filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200",
                    activeCategory === cat.value
                      ? "bg-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.4)]"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                  )}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-white/50 text-sm shrink-0">
              <SlidersHorizontal className="w-4 h-4" />
              {loading ? "Loading..." : `${games.length} station${games.length !== 1 ? "s" : ""}`}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="container-gaming">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : games.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-white font-bold text-2xl mb-2">No stations found</h3>
              <p className="text-white/50">Try a different category or search term.</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {games.map((game) => (
                <motion.div key={game.id} variants={fadeInUp}>
                  <GameCard
                    game={game}
                    onBook={handleBook}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
