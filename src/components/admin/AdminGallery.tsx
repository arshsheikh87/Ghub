"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AdminSidebar } from "./AdminSidebar";
import { Plus, Trash2 } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";
import { Input, FieldWrapper } from "@/components/ui/Form";
import { GALLERY_CATEGORIES } from "@/constants";
import type { GalleryImage } from "@/types";

export function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ url: "", title: "", alt: "", category: "GENERAL" as GalleryImage["category"] });
  const [saving, setSaving] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    const res = await fetch("/api/gallery");
    const json = await res.json();
    if (json.success) setImages(json.data);
    setLoading(false);
  };

  useEffect(() => { fetchImages(); }, []);

  const handleAdd = async () => {
    if (!form.url.trim()) return;
    setSaving(true);
    await fetch("/api/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    await fetchImages();
    setForm({ url: "", title: "", alt: "", category: "GENERAL" });
    setShowForm(false);
    setSaving(false);
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    setImages((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black text-white">Gallery</h1>
          <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-all">
            <Plus className="w-4 h-4" /> Add Image
          </button>
        </div>

        {showForm && (
          <GlassCard padding="lg" className="mb-6">
            <h2 className="text-white font-bold mb-5">Add Gallery Image</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2"><FieldWrapper label="Image URL" required><Input value={form.url} onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))} placeholder="https://..." /></FieldWrapper></div>
              <FieldWrapper label="Title"><Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} /></FieldWrapper>
              <FieldWrapper label="Alt Text"><Input value={form.alt} onChange={(e) => setForm((p) => ({ ...p, alt: e.target.value }))} /></FieldWrapper>
              <FieldWrapper label="Category">
                <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as GalleryImage["category"] }))}
                  className="w-full h-11 px-4 text-sm rounded-xl bg-white/5 border border-white/15 text-white [&>option]:bg-[#14141f]">
                  {GALLERY_CATEGORIES.filter((c) => c.value !== "ALL").map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </FieldWrapper>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleAdd} disabled={saving} className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-60 transition-all">{saving ? "Saving..." : "Add Image"}</button>
              <button onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl text-sm text-white/60 hover:text-white bg-white/5 transition-all">Cancel</button>
            </div>
          </GlassCard>
        )}

        {loading ? (
          <div className="text-center py-12 text-white/40">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square">
                <Image src={img.url} alt={img.alt ?? img.title ?? "Gallery"} fill sizes="25vw" className="object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2">
                  <p className="text-white text-xs font-medium px-3 text-center truncate w-full">{img.title}</p>
                  <button onClick={() => deleteImage(img.id)} className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-all"><Trash2 className="w-4 h-4" /></button>
                </div>
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-white/70 text-[10px]">{img.category}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
