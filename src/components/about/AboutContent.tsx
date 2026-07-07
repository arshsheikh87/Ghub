"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Target, Heart, Zap, Users, ArrowRight, CheckCircle } from "lucide-react";
import { GlassCard, FeatureCard } from "@/components/ui/Card";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const TEAM = [
  { name: "Hamza Sheikh", role: "Founder & CEO", avatar: "HS" },
  { name: "Nadia Rauf", role: "Operations Manager", avatar: "NR" },
  { name: "Zain Akhtar", role: "Head Technician", avatar: "ZA" },
  { name: "Ayesha Butt", role: "Community Manager", avatar: "AB" },
];

const VALUES = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Performance First",
    description: "We invest in the best hardware so every session is lag-free and buttery smooth.",
    iconGlow: true,
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Driven",
    description: "NexusPlay is more than a cafe — it's a community of gamers who share a passion.",
    iconGlow: true,
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Passion for Gaming",
    description: "We are gamers ourselves. Every decision is made with the gamer's experience in mind.",
    iconGlow: true,
  },
];

const MILESTONES = [
  { year: "2021", event: "NexusPlay founded with 5 PC stations in F-7 Islamabad" },
  { year: "2022", event: "Expanded to 20 stations, added PS5 and Xbox setups" },
  { year: "2023", event: "Launched VR & Racing simulators, 500+ registered members" },
  { year: "2024", event: "Upgraded all PCs to RTX 4090, introduced online booking" },
  { year: "2025", event: "Reached 5,000+ satisfied customers, expanding to second location" },
];

export function AboutContent() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 bg-hero-gradient">
        <div className="container-gaming text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeInUp} className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
              Our Story
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl font-black text-white mb-6">
              About <span className="gradient-text">NexusPlay</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white/60 text-xl max-w-2xl mx-auto">
              Born from a passion for gaming, built for the community.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-section-gradient">
        <div className="container-gaming">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Our Mission</span>
              <h2 className="text-4xl font-black text-white mb-6">
                Making <span className="gradient-text">Premium Gaming</span> Accessible to Everyone
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                We started NexusPlay in 2021 with a simple idea: every gamer deserves access to top-tier hardware without the massive upfront cost. Not everyone can afford an RTX 4090 setup at home — but everyone deserves to experience it.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Today, NexusPlay is Islamabad&apos;s most trusted gaming cafe, with over 50 premium stations, a thriving community, and a team that lives and breathes gaming.
              </p>
              <div className="space-y-3">
                {["RTX 4090 powered gaming PCs", "Latest PS5 & Xbox Series X consoles", "Full VR & Racing simulator setups", "Comfortable ergonomic environment"].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400 shrink-0" />
                    <span className="text-white/70">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <GlassCard glow="purple" accent padding="lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-purple-500/15 border border-purple-500/25">
                    <Target className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg">Our Vision</h3>
                </div>
                <p className="text-white/60 leading-relaxed mb-6">
                  To become South Asia&apos;s leading gaming cafe brand — known for uncompromising quality, exceptional service, and a community that grows together.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "5,000+", label: "Gamers Served" },
                    { value: "50+", label: "Stations" },
                    { value: "100+", label: "Game Titles" },
                    { value: "4.9★", label: "Average Rating" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 rounded-xl bg-white/5 text-center">
                      <p className="text-2xl font-black gradient-text">{stat.value}</p>
                      <p className="text-white/50 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container-gaming">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-black text-white">Our <span className="gradient-text">Core Values</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <FeatureCard {...v} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-section-gradient">
        <div className="container-gaming">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-black text-white">Our <span className="gradient-text">Journey</span></h2>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            {MILESTONES.map((m, i) => (
              <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {m.year.slice(2)}
                  </div>
                  {i < MILESTONES.length - 1 && <div className="w-px flex-1 bg-white/10 mt-2" />}
                </div>
                <GlassCard padding="md" className="flex-1 mb-4">
                  <p className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">{m.year}</p>
                  <p className="text-white/80 text-sm">{m.event}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container-gaming">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-black text-white">Meet the <span className="gradient-text">Team</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GlassCard glow="purple" hover padding="lg" className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <h3 className="text-white font-bold">{member.name}</h3>
                  <p className="text-white/50 text-sm mt-1">{member.role}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-section-gradient">
        <div className="container-gaming text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to join the <span className="gradient-text">NexusPlay family?</span></h2>
          <p className="text-white/60 mb-8">Book your first session today and experience the difference.</p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 h-14 px-10 text-base font-bold rounded-xl bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] text-white hover:brightness-110 transition-all duration-300"
          >
            Book Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
