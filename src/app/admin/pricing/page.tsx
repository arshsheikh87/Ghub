import type { Metadata } from "next";
import { AdminPricing } from "@/components/admin/AdminPricing";
export const metadata: Metadata = { title: "Pricing" };
export default function AdminPricingPage() { return <AdminPricing />; }
