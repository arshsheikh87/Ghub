"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

const FAQS = [
  {
    q: "How do I book a gaming session?",
    a: "Click 'Book Now' on our website, choose your game station, select date, time, and duration, fill in your details, and submit. You'll receive a confirmation email instantly.",
  },
  {
    q: "What are your opening hours?",
    a: "We're open Monday–Friday 12:00 PM to 12:00 AM, and Saturday–Sunday 10:00 AM to 2:00 AM.",
  },
  {
    q: "Can I walk in without a booking?",
    a: "Yes, walk-ins are welcome subject to availability. However, we recommend booking online to guarantee your preferred station and time slot.",
  },
  {
    q: "Is there a membership plan?",
    a: "Yes! We offer monthly memberships with discounted hourly rates, priority booking, and exclusive member perks. Check our Pricing page for details.",
  },
  {
    q: "Do you offer student discounts?",
    a: "Absolutely. Students with a valid ID get special discounted rates on all stations. Show your student card at the reception.",
  },
  {
    q: "What food and drinks are available?",
    a: "We have a full cafe menu including snacks, cold drinks, energy drinks, hot food, and combo meals. You can also pre-order food with your booking.",
  },
  {
    q: "Can I cancel or reschedule my booking?",
    a: "Yes, you can cancel up to 2 hours before your session. Contact us via WhatsApp or email and we'll reschedule you at no extra charge.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-section-gradient">
      <div className="container-gaming">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3 block">FAQ</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/[0.03] transition-colors"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-white font-medium text-base">{faq.q}</span>
                  <ChevronDown
                    className={cn("w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300", openIndex === i && "rotate-180")}
                  />
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-5 pb-5 text-white/60 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
