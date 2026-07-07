import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with NexusPlay Gaming Cafe. We're here for bookings, corporate inquiries, feedback, and more.",
};

export default function ContactPage() {
  return <ContactContent />;
}
