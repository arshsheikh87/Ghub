import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about NexusPlay Gaming Cafe — our story, mission, and the team behind Pakistan's premier gaming experience.",
};

export default function AboutPage() {
  return <AboutContent />;
}
