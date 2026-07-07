"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";
import { Input, FieldWrapper } from "@/components/ui/Form";
import type { FoodItem } from "@/types";
import { FOOD_CATEGORIES } from "@/constants";

const EMPTY: Partial<FoodItem> = { name: "", description: "", category: "SNACKS", price: 0, image: "", isAvailable: true, isFeatured: false, order: 0 };

export function AdminFood() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<FoodItem>>(EMPTY);
  const [saving, setSaving] = useState(false);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    const r = await fetch("/api/food");
    const j = await r.json();
    if (j.success) setItems(j.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  const openCreate = () => { setForm(EMPTY); setEditingId(null); setShowForm(true); };
  const openEdit = (item: FoodItem) => { setForm(item); setEditingId(item.id); setShowForm(true); };

  const handleSave = async () => {
    setSaving(true);
    const url = editingId ? `/api/food/${editingId}` : "/api/food";
    const method = editingId ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, price: Number(form.price), order: Number(form.order ?? 0) }) });
    await fetch_();
    setShowForm(false);
    setSaving(false);
  };

  const toggleAvailability = async (item: FoodItem) => {
    await fetch(`/api/food/${item.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isAvailable: !item.isAvailable }) });
    setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, isAvailable: !i.isAvailable } : i));
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this food item?")) return;
    await fetch(`/api/food/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black text-white">Food & Drinks</h1>
          <button onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-all">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>

        {showForm && (
          <GlassCard padding="lg" className="mb-6">
            <h2 className="text-white font-bold mb-5">{editingId ? "Edit Item" : "Add Item"}</h2>
            <div className="grid grid-cols-2 gap-4">
              <FieldWrapper label="Name"><Input value={form.name ?? ""} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></FieldWrapper>
              <FieldWrapper label="Category">
                <select value={form.category ?? "SNACKS"} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as FoodItem["category"] }))}
                  className="w-full h-11 px-4 text-sm rounded-xl bg-white/5 border border-white/15 text-white [&>option]:bg-[#14141f]">
                  {FOOD_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </FieldWrapper>
              <FieldWrapper label="Price (Rs)"><Input type="number" value={form.price ?? 0} onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))} /></FieldWrapper>
              <FieldWrapper label="Image URL"><Input value={form.image ?? ""} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} /></FieldWrapper>
              <div className="col-span-2">
                <FieldWrapper label="Description"><Input value={form.description ?? ""} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} /></FieldWrapper>
              </div>
              <div className="flex gap-6 col-span-2">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isAvailable ?? true} onChange={(e) => setForm((p) => ({ ...p, isAvailable: e.target.checked }))} className="accent-purple-500" /><span className="text-white text-sm">Available</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isFeatured ?? false} onChange={(e) => setForm((p) => ({ ...p, isFeatured: e.target.checked }))} className="accent-purple-500" /><span className="text-white text-sm">Featured</span></label>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-60 transition-all">{saving ? "Saving..." : "Save"}</button>
              <button onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-all">Cancel</button>
            </div>
          </GlassCard>
        )}

        {loading ? (
          <div className="text-center py-12 text-white/40">Loading...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => (
              <GlassCard key={item.id} padding="md">
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-semibold truncate">{item.name}</p>
                    <p className="text-purple-400 text-sm font-bold">Rs {Number(item.price).toLocaleString()}</p>
                  </div>
                  <button onClick={() => toggleAvailability(item)} className="ml-2 shrink-0">
                    {item.isAvailable ? <ToggleRight className="w-6 h-6 text-green-400" /> : <ToggleLeft className="w-6 h-6 text-white/30" />}
                  </button>
                </div>
                <p className="text-white/40 text-xs mb-4">{item.category}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-xs text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"><Pencil className="w-3 h-3" /> Edit</button>
                  <button onClick={() => deleteItem(item.id)} className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all"><Trash2 className="w-3 h-3" /> Delete</button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
