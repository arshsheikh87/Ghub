import type { Metadata } from "next";
import { FoodContent } from "@/components/food/FoodContent";

export const metadata: Metadata = {
  title: "Food & Cafe",
  description: "Fuel your gaming session with our full cafe menu — snacks, cold drinks, energy drinks, hot food, and combo meals.",
};

export default function FoodPage() {
  return <FoodContent />;
}
