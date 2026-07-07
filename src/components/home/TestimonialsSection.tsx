"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";

const TESTIMONIALS = [
  {
    name: "Ahmed Raza",
    role: "Competitive Gamer",
    rating: 5,
    text: "Best gaming cafe in Islamabad by far. The RTX 4090 PCs are insane — butter smooth 360fps. The staff is super friendly and the food is great too!",
    avatar: "AR",
  },
  {
    name: "Sara Khan",
    role: "Weekend Gamer",
    rating: 5,
    text: "Came for the VR experience and was blown away. The booking system is so easy to use and the confirmation email arrived instantly. Highly recommended!",
    avatar: "SK",
  },
  {
    name: "Usman Ali",
    role: "PS5 Enthusiast",
    rating: 5,
    text: "Perfect place to play with friends. PS5 setups are premium, the chairs are super comfortable, and the AC keeps it cool even during long sessions.",
    avatar: "UA",
  },
  {
    name: "Fatima Malik",
    role: "College Student",
    rating: 5,
    text: "The student discount membership is amazing value. I've tried gaming cafes all over the city and this is the cleanest and most professional one.",
    avatar: "FM",
  },
  {
    name: "Bilal Hassan",
    role: "Racing Sim Fan",
    rating: 5,
    text: "The racing simulator is unlike anything I've experienced. Full force feedback wheel, real seat — feels like you're actually on a track. 10/10!",
    avatar: "BH",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  const t = TESTIMONIALS[current];

  return (
    <section className="py-24 bg-section-gradient">
      <div className="container-gaming">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Testimonials</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            What Gamers <span className="gradient-text">Say About Us</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard glow="purple" padding="lg" accent className="text-center">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white/85 text-lg leading-relaxed mb-8 italic">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] flex items-center justify-center text-white font-bold text-base">
                    {t.avatar}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">{t.name}</p>
                    <p className="text-white/50 text-sm">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-purple-500 w-6" : "bg-white/20"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
