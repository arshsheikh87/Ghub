"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Gamepad2, Pizza, Sword, Trophy, Users } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const SHOWCASE_IMAGES = [
  {
    title: "Gaming Stations",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    alt: "Rows of gaming PCs with glowing lights in a gaming cafe",
    icon: Gamepad2,
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "PS5 Lounge",
    image:
      "https://images.unsplash.com/photo-1605901309584-818e25960a8b?auto=format&fit=crop&w=900&q=80",
    alt: "Console gaming lounge with large screens",
    icon: Trophy,
    span: "",
  },
  {
    title: "Food & Drinks",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    alt: "Burger meal served with fries and drinks",
    icon: Pizza,
    span: "",
  },
  {
    title: "Party Nights",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80",
    alt: "Group of friends enjoying a gaming party",
    icon: Users,
    span: "md:col-span-2",
  },
  {
    title: "VR Experience",
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=900&q=80",
    alt: "Virtual reality gaming setup with headset",
    icon: Sword,
    span: "",
  },
  {
    title: "Cafe Atmosphere",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    alt: "Warm interior seating area in a modern cafe",
    icon: Camera,
    span: "",
  },
];

export function ImageShowcaseSection() {
  return (
    <section className="py-24 bg-section-gradient">
      <div className="container-gaming">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
              Inside G Hub
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              More of the <span className="gradient-text">experience</span> you can see
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              A closer look at the gaming stations, lounge areas, food, and party spaces that make the cafe feel alive.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-45"
          >
            {SHOWCASE_IMAGES.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.3)] ${item.span}`}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,15,0.88)_0%,rgba(10,10,15,0.12)_55%,transparent_100%)]" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-between">
                    <div className="flex justify-end">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm">
                        <Icon className="w-3.5 h-3.5" />
                        Highlight
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-xl font-bold leading-tight mb-1">{item.title}</p>
                      <p className="text-white/60 text-sm max-w-[18rem]">
                        Curated to show the vibe, not just tell the story.
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}