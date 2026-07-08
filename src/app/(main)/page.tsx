import type { Metadata } from "next";
import {
  HeroSection,
  ImageShowcaseSection,
  FeaturesSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
} from "@/components/home";

export const metadata: Metadata = {
  title: "NexusPlay Gaming Cafe — Where Gaming Meets Excellence",
  description:
    "Premium gaming cafe in Badarpur with RTX 4090 PCs, PS5, Xbox, VR & Racing simulators. Book your session online.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ImageShowcaseSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      {/* <CTASection /> */}
    </>
  );
}
