import type { Metadata } from "next";
import { GamesContent } from "@/components/games/GamesContent";

export const metadata: Metadata = {
  title: "Games",
  description: "Browse all gaming stations — PC, PS5, Xbox, VR, and Racing Simulators. Check availability and book your session.",
};

export default function GamesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  return <GamesContent searchParams={searchParams} />;
}
