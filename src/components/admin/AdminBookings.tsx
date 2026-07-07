"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { BOOKING_STATUS_COLORS } from "@/constants";

interface Booking {
  id: string; bookingId: string; name: string; email: string; phone: string;
  date: string; startTime: string; endTime: string; duration: number;
  totalAmount: number; status: string; game: { name: string; category: string };
}

const STATUSES = ["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"];

export function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "50" });
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    const res = await fetch(`/api/bookings?${params}`);
    const json = await res.json();
    if (json.success) setBookings(json.data);
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch(`/api/bookings/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    await fetchBookings();
    setUpdating(null);
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white">Bookings</h1>
            <p className="text-white/50 mt-1">Manage all customer bookings</p>
          </div>
        </div>
        <div className="flex gap-2 mb-6 flex-wrap">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${statusFilter === s ? "bg-purple-600 text-white" : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-white/40">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center text-white/40">No bookings found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {["ID", "Customer", "Game", "Date & Time", "Amount", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-white/[0.05] hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-purple-400 font-mono text-xs">#{b.bookingId.slice(0, 8).toUpperCase()}</td>
                      <td className="px-4 py-3">
                        <p className="text-white font-medium">{b.name}</p>
                        <p className="text-white/40 text-xs">{b.email}</p>
                      </td>
                      <td className="px-4 py-3 text-white/70">{b.game?.name}</td>
                      <td className="px-4 py-3 text-white/70 whitespace-nowrap">
                        <p>{new Date(b.date).toLocaleDateString()}</p>
                        <p className="text-white/40 text-xs">{b.startTime} – {b.endTime}</p>
                      </td>
                      <td className="px-4 py-3 text-white font-semibold">Rs {Number(b.totalAmount).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${BOOKING_STATUS_COLORS[b.status] ?? ""}`}>{b.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          disabled={updating === b.id}
                          className="text-xs bg-white/5 border border-white/10 text-white rounded-lg px-2 py-1 [&>option]:bg-[#14141f]"
                        >
                          {["PENDING","CONFIRMED","COMPLETED","CANCELLED","NO_SHOW"].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
