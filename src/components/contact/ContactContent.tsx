"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";
import { Input, Textarea, FieldWrapper } from "@/components/ui/Form";
import { GlassCard } from "@/components/ui/Card";
import { SITE_CONFIG } from "@/constants";
import { staggerContainer, fadeInUp } from "@/lib/animations";

interface FormState { name: string; email: string; phone: string; subject: string; message: string; }
interface Errors { [k: string]: string; }

const SUBJECTS = [
  { value: "General Inquiry", label: "General Inquiry" },
  { value: "Booking Help", label: "Booking Help" },
  { value: "Corporate / Group Booking", label: "Corporate / Group Booking" },
  { value: "Technical Issue", label: "Technical Issue" },
  { value: "Feedback", label: "Feedback" },
  { value: "Partnership", label: "Partnership" },
];

export function ContactContent() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  const validate = () => {
    const e: Errors = {};
    if (!form.name.trim() || form.name.length < 2) e.name = "Name is required";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim() || form.message.length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        setSuccess(true);
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setErrors({ submit: json.error ?? "Failed to send message. Please try again." });
      }
    } catch {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-16 bg-hero-gradient">
        <div className="container-gaming text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeInUp} className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Get In Touch</motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl font-black text-white mb-4">Contact <span className="gradient-text">Us</span></motion.h1>
            <motion.p variants={fadeInUp} className="text-white/60 text-lg max-w-xl mx-auto">Questions, feedback, or corporate inquiries — we&apos;re here to help.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-gaming">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left — Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-6">Find Us</h2>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: "Address", value: SITE_CONFIG.address, href: SITE_CONFIG.mapUrl },
                    { icon: Phone, label: "Phone", value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
                    { icon: Mail, label: "Email", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition-all group">
                      <div className="p-2.5 rounded-lg bg-purple-500/15 border border-purple-500/20 shrink-0">
                        <Icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{label}</p>
                        <p className="text-white group-hover:text-purple-300 transition-colors text-sm">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <GlassCard padding="md">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <h3 className="text-white font-bold">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Mon – Fri</span>
                    <span className="text-white font-medium">{SITE_CONFIG.openingHours.weekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Sat – Sun</span>
                    <span className="text-white font-medium">{SITE_CONFIG.openingHours.weekends}</span>
                  </div>
                </div>
              </GlassCard>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi! I have a question about NexusPlay Gaming Cafe.`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/25 hover:bg-green-500/15 transition-all"
              >
                <div className="p-2.5 rounded-lg bg-green-500/20">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Chat on WhatsApp</p>
                  <p className="text-white/50 text-sm">Fastest response — usually within minutes</p>
                </div>
              </a>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-white/10 h-48">
                <iframe
                  title="NexusPlay Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13280.123456789!2d73.08!3d33.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6789012345678901!2sF-7%20Markaz%2C+Islamabad!5e0!3m2!1sen!2spk!4v1234567890"
                  width="100%" height="100%" style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {success ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">Message Sent!</h3>
                  <p className="text-white/60 mb-8">We&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => setSuccess(false)} className="px-8 py-3 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <GlassCard padding="lg">
                  <h2 className="text-2xl font-black text-white mb-6">Send a Message</h2>
                  {errors.submit && <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">{errors.submit}</div>}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <FieldWrapper label="Full Name" required error={errors.name}>
                        <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Ali Hassan" error={errors.name} />
                      </FieldWrapper>
                      <FieldWrapper label="Email" required error={errors.email}>
                        <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" error={errors.email} />
                      </FieldWrapper>
                    </div>
                    <FieldWrapper label="Phone (optional)">
                      <Input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+92 300 1234567" />
                    </FieldWrapper>
                    <FieldWrapper label="Subject" required error={errors.subject}>
                      <select value={form.subject} onChange={(e) => update("subject", e.target.value)}
                        className="w-full h-11 px-4 text-sm rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-purple-500 [&>option]:bg-[#14141f]">
                        <option value="">Select a subject</option>
                        {SUBJECTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                      {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                    </FieldWrapper>
                    <FieldWrapper label="Message" required error={errors.message}>
                      <Textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="How can we help you?" rows={5} maxLength={1000} showCount error={errors.message} />
                    </FieldWrapper>
                    <button type="submit" disabled={submitting}
                      className="w-full h-12 rounded-xl text-sm font-bold text-white bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] hover:brightness-110 hover:shadow-[0_0_24px_rgba(139,92,246,0.4)] disabled:opacity-60 disabled:cursor-wait transition-all flex items-center justify-center gap-2">
                      {submitting ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
                    </button>
                  </form>
                </GlassCard>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
