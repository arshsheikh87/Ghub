"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Clock, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";

interface BookingData {
  bookingId: string;
  name: string;
  game: { name: string };
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalAmount: string | number;
  status: string;
}

export function BookingSuccess() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(!!bookingId);

  useEffect(() => {
    if (!bookingId) return;
    fetch(`/api/bookings/${bookingId}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setBooking(j.data);
      })
      .finally(() => setLoading(false));
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-pulse text-white/50">Loading your booking...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-gaming max-w-2xl text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.4 }}
          className="w-24 h-24 rounded-full bg-[linear-gradient(135deg,#22c55e,#16a34a)] flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 className="text-5xl font-black text-white mb-4">
            Booking <span className="gradient-text">Confirmed!</span>
          </h1>
          <p className="text-white/60 text-lg mb-10">
            Your session is locked in. A confirmation email has been sent to your inbox.
          </p>

          {booking && (
            <GlassCard padding="lg" className="text-left mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-lg">Booking Details</h2>
                <span className="px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-bold uppercase">
                  {booking.status}
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">Booking ID</span>
                  <span className="text-white font-bold tracking-wider">#{booking.bookingId.slice(0, 8).toUpperCase()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">Name</span>
                  <span className="text-white font-medium">{booking.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">Station</span>
                  <span className="text-white font-medium">{booking.game?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Date</span>
                  <span className="text-white font-medium">{new Date(booking.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm flex items-center gap-1.5"><Clock className="w-4 h-4" /> Time</span>
                  <span className="text-white font-medium">{booking.startTime} – {booking.endTime}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-white font-bold">Total Amount</span>
                  <span className="text-xl font-black gradient-text">Rs {Number(booking.totalAmount).toLocaleString()}</span>
                </div>
              </div>
            </GlassCard>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all">
              Back to Home
            </Link>
            <Link href="/booking" className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] text-white font-bold hover:brightness-110 transition-all">
              Book Another Session <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <p className="text-white/70 text-sm">
              📍 <strong className="text-white">123 Gaming Street, Sector F-7, Islamabad</strong><br />
              Please arrive 10 minutes early. Show your booking ID at the reception.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
