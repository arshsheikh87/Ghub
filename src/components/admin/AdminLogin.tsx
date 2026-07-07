"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Zap, Eye, EyeOff } from "lucide-react";
import { Input, FieldWrapper } from "@/components/ui/Form";
import { GlassCard } from "@/components/ui/Card";

export function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(json.error ?? "Invalid credentials");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-hero-gradient">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2.5 rounded-xl bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)]">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xl font-black gradient-text">NexusPlay</p>
              <p className="text-white/40 text-xs uppercase tracking-wider">Admin Panel</p>
            </div>
          </div>
          <h1 className="text-3xl font-black text-white">Welcome Back</h1>
          <p className="text-white/50 mt-2 text-sm">Sign in to manage your gaming cafe</p>
        </div>

        <GlassCard padding="lg">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <FieldWrapper label="Email Address" required>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="admin@nexusplay.com"
                leftIcon={<Mail className="w-4 h-4" />}
                required
                autoComplete="email"
              />
            </FieldWrapper>
            <FieldWrapper label="Password" required>
              <div className="relative">
                <Input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  leftIcon={<Lock className="w-4 h-4" />}
                  required
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}>
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </FieldWrapper>
            <button type="submit" disabled={loading}
              className="w-full h-12 rounded-xl text-sm font-bold text-white bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] hover:brightness-110 disabled:opacity-60 disabled:cursor-wait transition-all">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}
