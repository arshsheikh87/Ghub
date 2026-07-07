import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for NexusPlay Gaming Cafe.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-gaming max-w-3xl">
        <h1 className="text-4xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-10">Last updated: January 2025</p>
        <div className="prose prose-invert prose-purple max-w-none space-y-8 text-white/70 leading-relaxed">
          {[
            { title: "1. Information We Collect", body: "We collect information you provide when making a booking (name, email, phone number), submitting a contact form, or subscribing to our newsletter. We also collect usage data through analytics to improve our services." },
            { title: "2. How We Use Your Information", body: "Your information is used to confirm bookings, send confirmation emails, respond to inquiries, improve our services, and send promotional offers (only if you opt in). We do not sell or share your personal data with third parties for marketing purposes." },
            { title: "3. Data Storage & Security", body: "All data is stored on secure servers with encryption at rest and in transit. Booking data is retained for 12 months. You may request deletion of your data at any time by contacting hello@nexusplay.com." },
            { title: "4. Cookies", body: "We use essential cookies to maintain session state and improve user experience. No third-party tracking cookies are used without your consent." },
            { title: "5. Your Rights", body: "Under applicable data protection laws, you have the right to access, correct, or delete your personal data. Contact us at hello@nexusplay.com to exercise these rights." },
            { title: "6. Contact", body: "If you have questions about this Privacy Policy, please contact us at hello@nexusplay.com or +92 300 1234567." },
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
