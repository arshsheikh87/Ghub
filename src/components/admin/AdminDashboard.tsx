"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, DollarSign, MessageSquare, Clock } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";
import { StatsCard } from "@/components/ui/Card";
import { staggerContainer, fadeInUp } from "@/lib/animations";

interface Stats {
  totalBookings: number;
  todayBookings: number;
  pendingBookings: number;
  totalGames: number;
  unreadMessages: number;
  totalRevenue: number;
  monthRevenue: number;
  upcomingBookings: Array<{
    id: string;
    bookingId: string;
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    game: { name: string; category: string };
  }>;
}

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: "text-green-400 bg-green-400/10",
  PENDING: "text-yellow-400 bg-yellow-400/10",
  CANCELLED: "text-red-400 bg-red-400/10",
  COMPLETED: "text-blue-400 bg-blue-400/10",
};

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((j) => { if (j.success) setStats(j.data); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">Dashboard</h1>
          <p className="text-white/50 mt-1">Overview of your gaming cafe.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : stats ? (
          <>
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <motion.div variants={fadeInUp}>
                <StatsCard label="Total Bookings" value={stats.totalBookings.toLocaleString()} icon={<CalendarCheck />} iconColor="purple" trend={`${stats.todayBookings} today`} trendDirection="up" />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <StatsCard label="Month Revenue" value={`Rs ${stats.monthRevenue.toLocaleString()}`} icon={<DollarSign />} iconColor="green" trend="This month" />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <StatsCard label="Pending Bookings" value={stats.pendingBookings} icon={<Clock />} iconColor="orange" trendDirection={stats.pendingBookings > 0 ? "up" : "neutral"} trend="Need action" />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <StatsCard label="Unread Messages" value={stats.unreadMessages} icon={<MessageSquare />} iconColor="blue" trendDirection={stats.unreadMessages > 0 ? "up" : "neutral"} />
              </motion.div>
            </motion.div>

            {/* Upcoming bookings */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-white font-bold text-lg">Upcoming Bookings</h2>
                <a href="/admin/bookings" className="text-purple-400 text-sm hover:text-purple-300 transition-colors">View all →</a>
              </div>
              {stats.upcomingBookings.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarCheck className="w-10 h-10 text-white/20 mx-auto mb-3" />
                  <p className="text-white/40">No upcoming bookings</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        {["ID", "Name", "Game", "Date", "Time", "Status"].map((h) => (
                          <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {stats.upcomingBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-white/[0.05] hover:bg-white/[0.02]">
                          <td className="px-6 py-4 text-purple-400 text-sm font-mono">#{booking.bookingId.slice(0, 8).toUpperCase()}</td>
                          <td className="px-6 py-4 text-white text-sm">{booking.name}</td>
                          <td className="px-6 py-4 text-white/70 text-sm">{booking.game.name}</td>
                          <td className="px-6 py-4 text-white/70 text-sm">{new Date(booking.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-white/70 text-sm">{booking.startTime} – {booking.endTime}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[booking.status] ?? "text-white/50"}`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <p className="text-white/50">Failed to load dashboard. Please make sure the database is connected.</p>
            <a href="/admin/login" className="text-purple-400 mt-4 inline-block hover:underline">Back to Login</a>
          </div>
        )}
      </main>
    </div>
  );
}
