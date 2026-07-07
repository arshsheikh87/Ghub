"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Zap } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient bg-grid">
      {/* Ambient glows */}
      <div aria-hidden className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container-gaming relative z-10 pt-24 pb-16 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-sm font-medium">
              <Zap className="w-4 h-4" />
              Pakistan&apos;s Premier Gaming Experience
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            <span className="text-white">Level Up Your</span>
            <br />
            <span className="gradient-text">Gaming Life</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p variants={fadeInUp} className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium gaming stations with RTX 4090 PCs, PS5, Xbox Series X, VR headsets &amp; Racing simulators. Book your session and play like a pro.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 h-14 px-8 text-base font-bold rounded-xl bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] text-white hover:brightness-110 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all duration-300"
            >
              Book Your Session
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/games"
              className="inline-flex items-center gap-2 h-14 px-8 text-base font-bold rounded-xl bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              Explore Games
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { value: "500+", label: "Happy Gamers" },
              { value: "50+", label: "Gaming Stations" },
              { value: "100+", label: "Game Titles" },
              { value: "3yr", label: "In Business" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black gradient-text">{s.value}</p>
                <p className="text-white/50 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
