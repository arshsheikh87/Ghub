"use client";

import { motion } from "framer-motion";
import { Monitor, Headphones, Zap, Coffee, Shield, Clock } from "lucide-react";
import { FeatureCard } from "@/components/ui/Card";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const FEATURES = [
  {
    icon: <Monitor className="w-7 h-7" />,
    title: "RTX 4090 Gaming PCs",
    description: "Ultra-high-performance rigs with 360Hz displays, mechanical keyboards, and premium peripherals.",
    badge: "Premium",
    iconGlow: true,
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "PS5 & Xbox Series X",
    description: "Latest-gen consoles with 4K TVs, full game library, and comfortable gaming chairs.",
    badge: "Next-Gen",
    iconGlow: true,
  },
  {
    icon: <Headphones className="w-7 h-7" />,
    title: "VR Experience",
    description: "Full-room VR setups with Meta Quest 3 and PlayStation VR2. Truly immersive gameplay.",
    badge: "Immersive",
    iconGlow: true,
  },
  {
    icon: <Coffee className="w-7 h-7" />,
    title: "Cafe & Refreshments",
    description: "Delicious food, cold drinks, energy drinks, and combo meals to fuel your gaming sessions.",
    iconGlow: false,
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Safe & Comfortable",
    description: "Air-conditioned lounge with ergonomic chairs, clean environment, and security cameras.",
    iconGlow: false,
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: "Flexible Booking",
    description: "Book online anytime. Hourly, daily, and monthly memberships. No hidden fees.",
    iconGlow: false,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-section-gradient">
      <div className="container-gaming">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Why NexusPlay</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Everything You Need to <span className="gradient-text">Game Better</span>
            </h2>
            <p className="text-white/55 text-lg max-w-2xl mx-auto">
              We obsess over every detail so you can focus on what matters — winning.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div key={feature.title} variants={fadeInUp} custom={i}>
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
