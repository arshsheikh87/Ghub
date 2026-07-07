"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { FoodCard } from "@/components/ui/Card";
import { Input } from "@/components/ui/Form";
import { FOOD_CATEGORIES } from "@/constants";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { FoodItem } from "@/types";
import { cn } from "@/utils/cn";

const FOOD_EMOJIS: Record<string, string> = {
  SNACKS: "🍟",
  COLD_DRINKS: "🥤",
  ENERGY_DRINKS: "⚡",
  COMBOS: "🍱",
  HOT_FOOD: "🌮",
};

function SkeletonCard() {
  return (
    <div className="rounded-[16px] overflow-hidden bg-white/[0.04] border border-white/[0.08] animate-pulse">
      <div className="aspect-[4/3] bg-white/10" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-white/10 rounded w-1/4" />
        <div className="h-5 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/5 rounded w-full" />
        <div className="h-8 bg-white/10 rounded-lg mt-2 w-24" />
      </div>
    </div>
  );
}

export function FoodContent() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== "ALL") params.set("category", activeCategory);
      const res = await fetch(`/api/food?${params}`);
      const json = await res.json();
      if (json.success) {
        const data: FoodItem[] = json.data;
        setItems(search ? data.filter((i) => i.name.toLowerCase().includes(search.toLowerCase())) : data);
      }
    } catch (err) {
      console.error("Failed to fetch food:", err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, search]);

  useEffect(() => {
    const t = setTimeout(fetchItems, 300);
    return () => clearTimeout(t);
  }, [fetchItems]);

  const categories = [{ value: "ALL", label: "All Items", emoji: "🍽️" }, ...FOOD_CATEGORIES.map((c) => ({ ...c, emoji: FOOD_EMOJIS[c.value] ?? "🍴" }))];

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-16 bg-hero-gradient">
        <div className="container-gaming text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeInUp} className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Cafe Menu</motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl font-black text-white mb-4">
              Food & <span className="gradient-text">Refreshments</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white/60 text-lg max-w-xl mx-auto">
              Fuel your game with our delicious menu. Order at the counter or add items when booking.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-white/10 sticky top-20 z-30 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="container-gaming">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:max-w-xs">
              <Input
                placeholder="Search menu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200",
                    activeCategory === cat.value
                      ? "bg-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.4)]"
                      : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                  )}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="container-gaming">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-white font-bold text-2xl mb-2">Nothing found</h3>
              <p className="text-white/50">Try a different category or search term.</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {items.map((item) => (
                <motion.div key={item.id} variants={fadeInUp}>
                  <FoodCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
