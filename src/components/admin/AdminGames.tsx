"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { Pencil, Trash2, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";
import { Input, FieldWrapper } from "@/components/ui/Form";
import type { Game } from "@/types";
import { GAME_CATEGORIES } from "@/constants";

const EMPTY: Partial<Game> = { name: "", description: "", category: "PC", pricePerHour: 0, totalSeats: 1, image: "", isAvailable: true, isFeatured: false, order: 0 };

export function AdminGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Game>>(EMPTY);
  const [saving, setSaving] = useState(false);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/games");
    const json = await res.json();
    if (json.success) setGames(json.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchGames(); }, [fetchGames]);

  const openCreate = () => { setForm(EMPTY); setEditingId(null); setShowForm(true); };
  const openEdit = (game: Game) => { setForm(game); setEditingId(game.id); setShowForm(true); };

  const handleSave = async () => {
    setSaving(true);
    const url = editingId ? `/api/games/${editingId}` : "/api/games";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, pricePerHour: Number(form.pricePerHour), totalSeats: Number(form.totalSeats), order: Number(form.order ?? 0) }) });
    if (res.ok) { await fetchGames(); setShowForm(false); }
    setSaving(false);
  };

  const toggleAvailability = async (game: Game) => {
    await fetch(`/api/games/${game.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isAvailable: !game.isAvailable }) });
    setGames((prev) => prev.map((g) => g.id === game.id ? { ...g, isAvailable: !g.isAvailable } : g));
  };

  const deleteGame = async (id: string) => {
    if (!confirm("Delete this game? This cannot be undone.")) return;
    await fetch(`/api/games/${id}`, { method: "DELETE" });
    setGames((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-3xl font-black text-white">Games</h1><p className="text-white/50 mt-1">{games.length} stations total</p></div>
          <button onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-all">
            <Plus className="w-4 h-4" /> Add Game
          </button>
        </div>

        {showForm && (
          <GlassCard padding="lg" className="mb-6">
            <h2 className="text-white font-bold text-lg mb-5">{editingId ? "Edit Game" : "Add New Game"}</h2>
            <div className="grid grid-cols-2 gap-4">
              <FieldWrapper label="Name" required><Input value={form.name ?? ""} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="e.g. RTX 4090 PC Station" /></FieldWrapper>
              <FieldWrapper label="Category">
                <select value={form.category ?? "PC"} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as Game["category"] }))}
                  className="w-full h-11 px-4 text-sm rounded-xl bg-white/5 border border-white/15 text-white [&>option]:bg-[#14141f]">
                  {GAME_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </FieldWrapper>
              <FieldWrapper label="Price per Hour (Rs)"><Input type="number" value={form.pricePerHour ?? 0} onChange={(e) => setForm((p) => ({ ...p, pricePerHour: Number(e.target.value) }))} /></FieldWrapper>
              <FieldWrapper label="Total Seats"><Input type="number" value={form.totalSeats ?? 1} onChange={(e) => setForm((p) => ({ ...p, totalSeats: Number(e.target.value) }))} /></FieldWrapper>
              <FieldWrapper label="Image URL"><Input value={form.image ?? ""} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} placeholder="https://..." /></FieldWrapper>
              <FieldWrapper label="Order"><Input type="number" value={form.order ?? 0} onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))} /></FieldWrapper>
              <div className="col-span-2">
                <FieldWrapper label="Description">
                  <textarea value={form.description ?? ""} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={3}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-purple-500 resize-none" />
                </FieldWrapper>
              </div>
              <div className="flex items-center gap-6 col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isAvailable ?? true} onChange={(e) => setForm((p) => ({ ...p, isAvailable: e.target.checked }))} className="accent-purple-500" />
                  <span className="text-white text-sm">Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isFeatured ?? false} onChange={(e) => setForm((p) => ({ ...p, isFeatured: e.target.checked }))} className="accent-purple-500" />
                  <span className="text-white text-sm">Featured</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-60 transition-all">{saving ? "Saving..." : "Save"}</button>
              <button onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-all">Cancel</button>
            </div>
          </GlassCard>
        )}

        {loading ? (
          <div className="text-center py-12 text-white/40">Loading...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => (
              <GlassCard key={game.id} padding="md" className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-semibold truncate">{game.name}</p>
                    <p className="text-white/50 text-xs mt-0.5">{game.category} · Rs {Number(game.pricePerHour).toLocaleString()}/hr</p>
                  </div>
                  <button onClick={() => toggleAvailability(game)} className="ml-2 shrink-0" title="Toggle availability">
                    {game.isAvailable ? <ToggleRight className="w-6 h-6 text-green-400" /> : <ToggleLeft className="w-6 h-6 text-white/30" />}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(game)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => deleteGame(game.id)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
