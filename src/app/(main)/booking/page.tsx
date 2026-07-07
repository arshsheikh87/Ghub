import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingForm } from "@/components/booking/BookingForm";

export const metadata: Metadata = {
  title: "Book a Session",
  description: "Book your premium gaming session at NexusPlay.",
};

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center"><div className="text-white/50">Loading...</div></div>}>
      <BookingForm />
    </Suspense>
  );
}
