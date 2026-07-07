"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PricingCard } from "@/components/ui/Card";
import { PLAN_TYPES } from "@/constants";
import type { PricingPlan } from "@/types";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { cn } from "@/utils/cn";

const FALLBACK_PLANS: PricingPlan[] = [
  { id: "1", name: "Casual Hour", type: "HOURLY", price: 150, duration: "hour", description: "Perfect for a quick session", features: ["Any gaming station", "Snack menu access", "HD display", "Comfortable seating"], isPopular: false, isActive: true, order: 1 },
  { id: "2", name: "Pro Hour", type: "HOURLY", price: 250, duration: "hour", description: "RTX 4090 PC stations", features: ["RTX 4090 Gaming PC", "360Hz display", "Mechanical keyboard", "Premium headset", "Snack menu access"], isPopular: true, isActive: true, order: 2 },
  { id: "3", name: "Weekend Warrior", type: "WEEKEND", price: 999, duration: "weekend day", description: "8 hours of gaming any day", features: ["8 hours on any station", "Free energy drink", "Priority booking", "Locker storage"], isPopular: false, isActive: true, order: 3 },
  { id: "4", name: "Student Plan", type: "SPECIAL", price: 1499, duration: "month", description: "20 hours monthly — student verified", features: ["20 hours/month", "Valid student ID required", "Free 1 combo meal", "Study lounge access", "10% off extra hours"], isPopular: false, isActive: true, order: 4 },
  { id: "5", name: "Pro Membership", type: "MEMBERSHIP", price: 2999, duration: "month", description: "40 hours for serious gamers", features: ["40 hours/month", "Priority booking", "Guest pass × 2", "Free snacks every session", "Exclusive member events", "5% revenue share on tournaments"], isPopular: true, isActive: true, order: 5 },
  { id: "6", name: "Elite Annual", type: "MEMBERSHIP", price: 24999, duration: "year", description: "Unlimited gaming all year", features: ["Unlimited hours", "VIP lounge access", "Free food every visit", "10 guest passes/month", "Priority support", "Private event bookings", "Custom gaming setup"], isPopular: false, isActive: true, order: 6 },
];

export function PricingContent() {
  const router = useRouter();
  const [plans, setPlans] = useState<PricingPlan[]>(FALLBACK_PLANS);
  const [activeType, setActiveType] = useState("ALL");

  useEffect(() => {
    fetch("/api/pricing")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.length > 0) setPlans(json.data);
      })
      .catch(() => {/* use fallback */});
  }, []);

  const types = [{ value: "ALL", label: "All Plans" }, ...PLAN_TYPES];
  const filtered = activeType === "ALL" ? plans : plans.filter((p) => p.type === activeType);

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-16 bg-hero-gradient">
        <div className="container-gaming text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeInUp} className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Pricing</motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl font-black text-white mb-6">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white/60 text-xl max-w-xl mx-auto">
              No hidden fees. Choose a plan that works for you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Type Filter */}
      <section className="py-6 border-b border-white/10 sticky top-20 z-30 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="container-gaming flex justify-center gap-2 flex-wrap">
          {types.map((t) => (
            <button
              key={t.value}
              onClick={() => setActiveType(t.value)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                activeType === t.value
                  ? "bg-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.4)]"
                  : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section className="py-16">
        <div className="container-gaming">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((plan, i) => (
              <motion.div key={plan.id} variants={fadeInUp} custom={i}>
                <PricingCard
                  plan={plan}
                  onPlanSelect={() => router.push("/booking")}
                  ctaLabel="Book Now"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison note */}
      <section className="py-12 border-t border-white/10">
        <div className="container-gaming text-center">
          <p className="text-white/50 text-sm max-w-xl mx-auto">
            All prices are in Pakistani Rupees (PKR). Memberships auto-renew monthly. Student discount requires valid university ID. For group bookings or corporate inquiries, <a href="/contact" className="text-purple-400 hover:underline">contact us</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
