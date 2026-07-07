import type { Metadata } from "next";
import { AdminBookings } from "@/components/admin/AdminBookings";

export const metadata: Metadata = { title: "Bookings" };

export default function AdminBookingsPage() {
  return <AdminBookings />;
}
