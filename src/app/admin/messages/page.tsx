import type { Metadata } from "next";
import { AdminMessages } from "@/components/admin/AdminMessages";

export const metadata: Metadata = { title: "Messages" };

export default function AdminMessagesPage() {
  return <AdminMessages />;
}
