import type { Metadata } from "next";
import { AdminFood } from "@/components/admin/AdminFood";
export const metadata: Metadata = { title: "Food" };
export default function AdminFoodPage() { return <AdminFood />; }
