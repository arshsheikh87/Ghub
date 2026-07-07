import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund Policy for NexusPlay Gaming Cafe.",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-gaming max-w-3xl">
        <h1 className="text-4xl font-black text-white mb-2">Refund Policy</h1>
        <p className="text-white/40 text-sm mb-10">Last updated: January 2025</p>
        <div className="space-y-8 text-white/70 leading-relaxed">
          {[
            { title: "Full Refund", body: "You are entitled to a full refund if you cancel your booking more than 2 hours before the session start time, or if NexusPlay cancels your booking due to technical issues or unforeseen circumstances." },
            { title: "Partial Refund", body: "If you cancel within 2 hours of the session start time, a 50% refund may be issued at management's discretion. If a gaming session is interrupted due to an equipment failure on our end, a proportional refund will be issued for unused time." },
            { title: "No Refund", body: "No refund is provided for late arrivals, no-shows, or early departure from a session. Membership fees are non-refundable once the membership period has begun." },
            { title: "How to Request a Refund", body: "Contact us at hello@nexusplay.com or WhatsApp +92 300 1234567 with your booking ID and reason for the refund request. Refunds are processed within 5–7 business days." },
          ].map(({ title, body }) => (
            <section key={title}>
              <h2 className="text-white font-bold text-xl mb-3">{title}</h2>
              <p>{body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
