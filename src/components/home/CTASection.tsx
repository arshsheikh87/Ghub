"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/constants";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="container-gaming relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-6">
            Ready to <span className="gradient-text">Play?</span>
          </h2>
          <p className="text-white/60 text-xl max-w-xl mx-auto mb-10">
            Book your session now and experience gaming like never before.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 h-14 px-10 text-base font-bold rounded-xl bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] text-white hover:brightness-110 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all duration-300"
            >
              Book Now <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-14 px-8 text-base font-bold rounded-xl bg-white/5 border border-white/15 text-white hover:bg-white/10 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
