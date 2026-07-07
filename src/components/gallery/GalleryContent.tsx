"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { GALLERY_CATEGORIES } from "@/constants";
import type { GalleryImage } from "@/types";
import { cn } from "@/utils/cn";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const FALLBACK_IMAGES: GalleryImage[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  title: `Gaming Station ${i + 1}`,
  url: `https://picsum.photos/seed/nexusplay${i + 1}/800/600`,
  thumbnail: `https://picsum.photos/seed/nexusplay${i + 1}/400/300`,
  category: (["GAMING", "INTERIOR", "EVENTS", "FOOD", "GENERAL"])[i % 5] as GalleryImage["category"],
  alt: `NexusPlay Gaming Cafe — Image ${i + 1}`,
  order: i,
  isActive: true,
}));

export function GalleryContent() {
  const [images, setImages] = useState<GalleryImage[]>(FALLBACK_IMAGES);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const fetchImages = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (activeCategory !== "ALL") params.set("category", activeCategory);
      const res = await fetch(`/api/gallery?${params}`);
      const json = await res.json();
      if (json.success && json.data.length > 0) setImages(json.data);
      else setImages(FALLBACK_IMAGES.filter((img) => activeCategory === "ALL" || img.category === activeCategory));
    } catch {
      setImages(FALLBACK_IMAGES.filter((img) => activeCategory === "ALL" || img.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i === null ? null : i === 0 ? images.length - 1 : i - 1));
  const nextImage = () => setLightboxIndex((i) => (i === null ? null : i === images.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-16 bg-hero-gradient">
        <div className="container-gaming text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeInUp} className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Gallery</motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl font-black text-white mb-4">
              Life at <span className="gradient-text">NexusPlay</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white/60 text-lg">
              A peek inside our world-class gaming cafe.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <section className="py-6 border-b border-white/10 sticky top-20 z-30 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="container-gaming flex justify-center gap-2 flex-wrap">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all",
                activeCategory === cat.value
                  ? "bg-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.4)]"
                  : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry grid */}
      <section className="py-12">
        <div className="container-gaming">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            {images.map((img, index) => (
              <motion.div
                key={img.id}
                variants={fadeInUp}
                className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative w-full" style={{ paddingBottom: `${(index % 3 === 0 ? 75 : 60)}%` }}>
                  <Image
                    src={img.thumbnail ?? img.url}
                    alt={img.alt ?? img.title ?? "Gallery image"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 w-10 h-10 transition-all duration-300 scale-75 group-hover:scale-100" />
                  </div>
                </div>
                {img.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-[linear-gradient(to_top,rgba(0,0,0,0.7),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">{img.title}</p>
                    <p className="text-white/60 text-xs">{img.category}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button onClick={closeLightbox} className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10" aria-label="Close lightbox">
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Prev / Next */}
            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="Previous image">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="Next image">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] w-full"
            >
              <Image
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].alt ?? "Gallery image"}
                width={1200}
                height={900}
                className="object-contain max-h-[85vh] w-auto mx-auto rounded-xl"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
