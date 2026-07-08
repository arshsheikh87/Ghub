"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Gamepad2, MessageCircle, Star, Zap } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=2000&q=80"
          alt="Dark gaming cafe interior with neon lighting and multiple stations"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.68)_45%,rgba(0,0,0,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.62)_42%,rgba(0,0,0,0.22)_100%)]" />
      </div>

      <div aria-hidden className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div aria-hidden className="absolute top-20 left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container-gaming relative z-10 pt-28 pb-16 min-h-screen flex items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="w-full grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="max-w-3xl text-left">
            {/* Badge */}
            {/* <motion.div variants={fadeInUp} className="flex justify-start mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/90 text-sm font-medium backdrop-blur-md">
                <Zap className="w-4 h-4 text-purple-300" />
                Pakistan&apos;s Premier Gaming Experience
              </span>
            </motion.div> */}

            {/* Headline */}
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.92] tracking-tight mb-6">
              <span className="text-white">Gaming</span>
              <br />
              <span className="text-white">Cafe</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p variants={fadeInUp} className="text-white/80 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
              Elevate your gaming experience with premium PCs, PS5 setups, food, and party bookings in one place.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start gap-4 mb-10">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 h-14 px-8 text-base font-bold rounded-full bg-white text-black hover:bg-white/90 hover:shadow-[0_20px_50px_rgba(255,255,255,0.18)] transition-all duration-300"
              >
                Book Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-14 px-8 text-base font-bold rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md hover:bg-white/15 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Us
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-2xl">
              {[
                { value: "500+", label: "Happy Gamers" },
                { value: "50+", label: "Gaming Stations" },
                { value: "100+", label: "Game Titles" },
                { value: "3yr", label: "In Business" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl backdrop-blur-md px-2 py-2">
                  <p className="text-xl font-black text-white/80">{s.value}</p>
                  <p className="text-white/40 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="hidden lg:block relative">
            <div className="relative h-170 w-full">
              <div className="absolute inset-0 rounded-[36px] border border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                <div className="absolute inset-0 grid grid-cols-2 gap-4 p-6 opacity-95">
                  {[
                    {
                      title: "VALORANT",
                      subtitle: "5v5 tactical play",
                      tone: "from-red-500/80 to-orange-500/80",
                    },
                    {
                      title: "WARZONE",
                      subtitle: "Battle royale nights",
                      tone: "from-slate-300/80 to-slate-600/80",
                    },
                    {
                      title: "DOTA 2",
                      subtitle: "MOBA squad sessions",
                      tone: "from-emerald-500/80 to-cyan-500/80",
                    },
                    {
                      title: "CS2",
                      subtitle: "Competitive matches",
                      tone: "from-amber-400/80 to-yellow-600/80",
                    },
                  ].map((poster, index) => (
                    <motion.div
                      key={poster.title}
                      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-br ${poster.tone} shadow-[0_18px_50px_rgba(0,0,0,0.35)] ${index % 2 === 0 ? "rotate-[-8deg]" : "rotate-[8deg]"}`}
                      animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
                      transition={{ duration: 4.5 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),transparent_45%)]" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.58)_100%)]" />
                      <div className="relative h-full w-full p-5 flex flex-col justify-end">
                        <div className="mb-auto flex justify-end">
                          <Gamepad2 className="w-6 h-6 text-white/85" />
                        </div>
                        <p className="text-white text-3xl font-black leading-none tracking-tight">{poster.title}</p>
                        <p className="text-white/80 text-sm mt-2">{poster.subtitle}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* <div className="absolute left-8 bottom-8 rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md px-4 py-3 text-white shadow-[0_18px_50px_rgba(0,0,0,0.3)]">
                  <div className="flex items-center gap-2 text-yellow-300 mb-1">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-sm text-white/80">Rated 5 stars by gamers</p>
                </div> */}
              </div>
            </div>
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
