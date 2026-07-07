import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingSuccess } from "@/components/booking/BookingSuccess";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description: "Your gaming session at NexusPlay has been confirmed.",
};

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-white/50">Loading...</p></div>}>
      <BookingSuccess />
    </Suspense>
  );
}
