"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";
import { Input, FieldWrapper } from "@/components/ui/Form";
import type { PricingPlan } from "@/types";
import { PLAN_TYPES } from "@/constants";

const EMPTY: Partial<PricingPlan> = { name: "", type: "HOURLY", price: 0, duration: "hour", description: "", features: [], isPopular: false, isActive: true, order: 0 };

export function AdminPricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<PricingPlan>>(EMPTY);
  const [featuresText, setFeaturesText] = useState("");
  const [saving, setSaving] = useState(false);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    const r = await fetch("/api/pricing?all=true");
    const j = await r.json();
    if (j.success) setPlans(j.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  const openCreate = () => { setForm(EMPTY); setFeaturesText(""); setEditingId(null); setShowForm(true); };
  const openEdit = (p: PricingPlan) => { setForm(p); setFeaturesText(p.features.join("\n")); setEditingId(p.id); setShowForm(true); };

  const handleSave = async () => {
    setSaving(true);
    const features = featuresText.split("\n").map((f) => f.trim()).filter(Boolean);
    const url = editingId ? `/api/pricing/${editingId}` : "/api/pricing";
    const method = editingId ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, features, price: Number(form.price), order: Number(form.order ?? 0) }) });
    await fetch_();
    setShowForm(false);
    setSaving(false);
  };

  const deletePlan = async (id: string) => {
    if (!confirm("Delete this plan?")) return;
    await fetch(`/api/pricing/${id}`, { method: "DELETE" });
    setPlans((p) => p.filter((x) => x.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black text-white">Pricing Plans</h1>
          <button onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-all">
            <Plus className="w-4 h-4" /> Add Plan
          </button>
        </div>

        {showForm && (
          <GlassCard padding="lg" className="mb-6">
            <h2 className="text-white font-bold text-lg mb-5">{editingId ? "Edit Plan" : "New Plan"}</h2>
            <div className="grid grid-cols-2 gap-4">
              <FieldWrapper label="Name"><Input value={form.name ?? ""} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></FieldWrapper>
              <FieldWrapper label="Type">
                <select value={form.type ?? "HOURLY"} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as PricingPlan["type"] }))}
                  className="w-full h-11 px-4 text-sm rounded-xl bg-white/5 border border-white/15 text-white [&>option]:bg-[#14141f]">
                  {PLAN_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </FieldWrapper>
              <FieldWrapper label="Price (Rs)"><Input type="number" value={form.price ?? 0} onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))} /></FieldWrapper>
              <FieldWrapper label="Duration (e.g. hour, month)"><Input value={form.duration ?? ""} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} /></FieldWrapper>
              <div className="col-span-2">
                <FieldWrapper label="Description"><Input value={form.description ?? ""} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} /></FieldWrapper>
              </div>
              <div className="col-span-2">
                <FieldWrapper label="Features (one per line)">
                  <textarea value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} rows={5}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-purple-500 resize-none" />
                </FieldWrapper>
              </div>
              <div className="flex gap-6 col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isPopular ?? false} onChange={(e) => setForm((p) => ({ ...p, isPopular: e.target.checked }))} className="accent-purple-500" />
                  <span className="text-white text-sm">Most Popular</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isActive ?? true} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} className="accent-purple-500" />
                  <span className="text-white text-sm">Active</span>
                </label>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <GlassCard key={plan.id} padding="md" className="relative">
                {plan.isPopular && <Star className="absolute top-3 right-3 w-4 h-4 text-yellow-400 fill-yellow-400" />}
                <p className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">{plan.type}</p>
                <p className="text-white font-bold text-lg mb-0.5">{plan.name}</p>
                <p className="text-white/50 text-sm mb-3">Rs {Number(plan.price).toLocaleString()} / {plan.duration}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => openEdit(plan)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => deletePlan(plan.id)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all">
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
