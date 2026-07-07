import type { Metadata } from "next";
import { GalleryContent } from "@/components/gallery/GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse photos of NexusPlay Gaming Cafe — our stations, events, interior, food, and more.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
