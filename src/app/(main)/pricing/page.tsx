import type { Metadata } from "next";
import { PricingContent } from "@/components/pricing/PricingContent";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Flexible pricing plans for every gamer — hourly rates, monthly memberships, weekend deals, and student discounts.",
};

export default function PricingPage() {
  return <PricingContent />;
}
