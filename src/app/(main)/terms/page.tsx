import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for NexusPlay Gaming Cafe.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-gaming max-w-3xl">
        <h1 className="text-4xl font-black text-white mb-2">Terms & Conditions</h1>
        <p className="text-white/40 text-sm mb-10">Last updated: January 2025</p>
        <div className="space-y-8 text-white/70 leading-relaxed">
          {[
            { title: "1. Booking & Reservations", body: "Bookings are confirmed upon receipt of the confirmation email. Walk-ins are welcome subject to availability. Reservations are for the gaming station only and do not include food unless specifically added." },
            { title: "2. Payment", body: "Payment is due at the venue before your session begins. We accept cash and major credit/debit cards. Prices are displayed in Pakistani Rupees (PKR) and are inclusive of all applicable taxes." },
            { title: "3. Cancellations & Rescheduling", body: "You may cancel or reschedule your booking up to 2 hours before the session start time without penalty. Cancellations within 2 hours may be subject to a 50% cancellation fee at management's discretion." },
            { title: "4. Code of Conduct", body: "All customers are expected to behave respectfully toward staff and other customers. Harassment, threats, or damage to equipment will result in immediate removal from the premises and a permanent ban." },
            { title: "5. Equipment Usage", body: "Customers are responsible for any damage caused to gaming equipment through negligence or misuse. Normal wear and tear is covered by NexusPlay. Do not eat or drink directly over keyboards or controllers." },
            { title: "6. Age Policy", body: "Customers under 13 years of age must be accompanied by an adult. Some game titles may have age restrictions which staff are required to enforce." },
            { title: "7. Liability", body: "NexusPlay is not liable for loss or damage to personal belongings. We recommend using the provided lockers for valuables." },
            { title: "8. Changes to Terms", body: "We reserve the right to update these terms at any time. Continued use of our services constitutes acceptance of the updated terms." },
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
